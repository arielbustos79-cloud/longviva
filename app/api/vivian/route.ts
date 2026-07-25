import Anthropic from "@anthropic-ai/sdk";
import { VIVIAN_SYSTEM_PROMPT } from "@/lib/vivian-prompt";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase-server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Rate limiting in-process: 20 requests/minuto por user_id.
// LIMITACIÓN CONOCIDA: en Vercel serverless cada invocación puede correr en una
// instancia distinta — el Map no comparte estado entre instancias. Frena loops
// accidentales y abuso leve, pero no es defensa confiable contra abuso deliberado.
// Para protección real se requiere Redis/Upstash (fuera del plan actual).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const { message, history, hiddenHistory } = await request.json();

    // userId se obtiene del JWT de sesión del lado servidor — nunca del body.
    // Esto previene IDOR: un cliente no puede suplantar el userId de otro usuario.
    const authClient = await createServerClient();
    const { data: { user } } = await authClient.auth.getUser();
    const userId = user?.id ?? null;

    const rateLimitKey = userId || request.headers.get("x-forwarded-for") || "anon";
    if (!checkRateLimit(rateLimitKey)) {
      return Response.json(
        { error: "Demasiadas solicitudes. Espera un momento antes de continuar." },
        { status: 429 }
      );
    }

    const supabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // history = solo mensajes de la sesión actual (van en messages[])
    const sessionHistory = history || [];

    // Fecha actual
    const hoy = new Date().toLocaleDateString("es-CL", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    // Perfil del usuario (previsión y AFP) para personalizar derivaciones
    let perfilCtx = "";
    if (userId) {
      const { data: perfil } = await supabase
        .from("profiles")
        .select("prevision, prevision_afp")
        .eq("id", userId)
        .single();
      if (perfil?.prevision) {
        perfilCtx += `\n\nPREVISIÓN DE SALUD DEL USUARIO: ${perfil.prevision} — usa este dato para derivar al proveedor de telemedicina o nutrición que corresponde a su previsión.`;
      }
      if (perfil?.prevision_afp) {
        perfilCtx += `\n\nAFP DEL USUARIO: ${perfil.prevision_afp} — cuando el usuario pregunte sobre trámites AFP, derívalo directamente al sitio oficial de su AFP sin preguntarle cuál es.`;
      }
    }

    // hiddenHistory = memoria de sesiones pasadas → va en system prompt, no en messages[]
    const memoriaAnterior = hiddenHistory && hiddenHistory.length > 0
      ? `\n\nFECHA DE HOY: ${hoy}\n\nHISTORIAL PREVIO (mensajes reales de conversaciones anteriores con este usuario):\n${
          hiddenHistory.slice(-30).map((m: { role: string; content: string }) =>
            `${m.role === "user" ? "Usuario" : "VIVIAN"}: ${m.content}`
          ).join("\n")
        }\n\nREGLA DE MEMORIA: usa este historial solo si el usuario menciona algo que aparece textualmente aquí. NUNCA inventes ni infiereas conversaciones, búsquedas o respuestas que no estén en este listado. Si no encuentras el dato en el historial, di "no lo tengo registrado" — es mejor admitirlo que fabricarlo. Respeta siempre las fechas.`
      : `\n\nFECHA DE HOY: ${hoy}`;

    // web_search habilitado solo para AFP/previsión y ocio/cartelera — VIVIAN lo regula por system prompt
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WEB_SEARCH_TOOL = { type: "web_search_20250305", name: "web_search" } as any;

    let msgs: Anthropic.MessageParam[] = [
      ...sessionHistory,
      { role: "user", content: message },
    ];

    let resp = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: VIVIAN_SYSTEM_PROMPT + perfilCtx + memoriaAnterior,
      tools: [WEB_SEARCH_TOOL],
      messages: msgs,
    });

    // Agentic loop — hasta 2 búsquedas por respuesta
    let iterations = 0;
    while (resp.stop_reason === "tool_use" && iterations < 2) {
      iterations++;
      msgs = [...msgs, { role: "assistant", content: resp.content }];
      const toolResults = resp.content
        .filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use")
        .map((b) => ({
          type: "tool_result" as const,
          tool_use_id: b.id,
          content: "",
        }));
      msgs = [...msgs, { role: "user", content: toolResults }];
      resp = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: VIVIAN_SYSTEM_PROMPT + perfilCtx + memoriaAnterior,
        tools: [WEB_SEARCH_TOOL],
        messages: msgs,
      });
    }

    const reply = resp.content
      .filter(b => b.type === "text")
      .map(b => (b as Anthropic.TextBlock).text)
      .join("") || "";

    // Guardar en Supabase
    if (userId) {
      await supabase.from("chat_messages").insert([
        { user_id: userId, role: "user", content: message, canal: "web" },
        { user_id: userId, role: "assistant", content: reply, canal: "web" },
      ]);
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Error VIVIAN:", error);
    return Response.json({ error: "Error al conectar con VIVIAN" }, { status: 500 });
  }
}
