import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { VIVIAN_SYSTEM_PROMPT } from "@/lib/vivian-prompt";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Twilio firma cada webhook — verificamos para evitar spam
async function verificarFirmaTwilio(request: Request): Promise<{ body: URLSearchParams; ok: boolean }> {
  const body = await request.text();
  const params = new URLSearchParams(body);

  if (process.env.NODE_ENV !== "production") {
    return { body: params, ok: true };
  }

  const twilioSignature = request.headers.get("X-Twilio-Signature") || "";

  // Usar la URL real del request para que coincida exactamente con lo que Twilio firmó
  const requestUrl = request.url;

  const crypto = await import("crypto");
  const authToken = process.env.TWILIO_AUTH_TOKEN || "";

  const sortedParams = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((acc, [k, v]) => acc + k + v, requestUrl);

  const expected = crypto
    .createHmac("sha1", authToken)
    .update(sortedParams)
    .digest("base64");

  return { body: params, ok: expected === twilioSignature };
}

export async function POST(request: Request) {
  const { body: params, ok } = await verificarFirmaTwilio(request);

  if (!ok) {
    return new Response("Unauthorized", { status: 403 });
  }

  const from = params.get("From") || ""; // ej: "whatsapp:+56912345678"
  const messageBody = params.get("Body")?.trim() || "";

  if (!messageBody || !from) {
    return twimlResponse("");
  }

  // Extraer número limpio sin prefijo "whatsapp:"
  const telefono = from.replace("whatsapp:", "");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Buscar usuario por teléfono en profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, nombre")
    .eq("telefono", telefono)
    .single();

  const userId = profile?.id || null;
  const nombre = profile?.nombre || "";

  // Cargar historial reciente si hay usuario registrado
  let hiddenHistory: { role: string; content: string }[] = [];
  if (userId) {
    const { data: historial } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("user_id", userId)
      .eq("canal", "whatsapp")
      .order("created_at", { ascending: false })
      .limit(30);

    if (historial) {
      hiddenHistory = historial.reverse();
    }
  }

  const hoy = new Date().toLocaleDateString("es-CL", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const memoriaAnterior = hiddenHistory.length > 0
    ? `\n\nFECHA DE HOY: ${hoy}${nombre ? `\nESTÁS HABLANDO CON: ${nombre} (por WhatsApp)` : ""}\n\nTU MEMORIA (conversaciones anteriores por WhatsApp):\n${
        hiddenHistory.map(m => `${m.role === "user" ? "Usuario" : "Tú"}: ${m.content}`).join("\n")
      }\n\nUSO DE LA MEMORIA: retoma naturalmente lo que ya hablaron. Nunca digas que no tienes acceso a conversaciones anteriores.`
    : `\n\nFECHA DE HOY: ${hoy}${nombre ? `\nESTÁS HABLANDO CON: ${nombre} (por WhatsApp)` : ""}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 400, // WhatsApp mensajes más cortos
      system: VIVIAN_SYSTEM_PROMPT + memoriaAnterior,
      messages: [{ role: "user", content: messageBody }],
    });

    const reply = response.content[0].type === "text" ? response.content[0].text : "";

    // Guardar historial si hay usuario registrado
    if (userId) {
      await supabase.from("chat_messages").insert([
        { user_id: userId, role: "user", content: messageBody, canal: "whatsapp" },
        { user_id: userId, role: "assistant", content: reply, canal: "whatsapp" },
      ]);
    }

    // Evento de analítica — fire and forget, nunca bloquea la respuesta
    void supabase.from("eventos").insert({
      tipo: "vivian_mensaje",
      user_id: userId,
      metadata: { canal: "whatsapp" },
    });

    return twimlResponse(reply);
  } catch (error) {
    console.error("Error WhatsApp VIVIAN:", error);
    return twimlResponse("Lo siento, tuve un problema. ¿Puedes intentar de nuevo en un momento? 🙏");
  }
}

function twimlResponse(message: string): Response {
  const twiml = message
    ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`
    : `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;

  return new Response(twiml, {
    headers: { "Content-Type": "text/xml" },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
