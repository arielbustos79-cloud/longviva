import Anthropic from "@anthropic-ai/sdk";
import { VIVIAN_SYSTEM_PROMPT } from "@/lib/vivian-prompt";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, userId, history, hiddenHistory } = await request.json();

    const supabase = createClient(
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
      console.log("[VIVIAN] perfil cargado:", JSON.stringify(perfil));
      if (perfil?.prevision) {
        perfilCtx += `\n\nPREVISIÓN DE SALUD DEL USUARIO: ${perfil.prevision} — usa este dato para derivar al proveedor de telemedicina o nutrición que corresponde a su previsión.`;
      }
      if (perfil?.prevision_afp) {
        perfilCtx += `\n\nAFP DEL USUARIO: ${perfil.prevision_afp} — cuando el usuario pregunte sobre trámites AFP, derívalo directamente al sitio oficial de su AFP sin preguntarle cuál es.`;
      }
      console.log("[VIVIAN] perfilCtx:", perfilCtx);
    }

    // hiddenHistory = memoria de sesiones pasadas → va en system prompt, no en messages[]
    const memoriaAnterior = hiddenHistory && hiddenHistory.length > 0
      ? `\n\nFECHA DE HOY: ${hoy}\n\nTU MEMORIA (conversaciones reales anteriores con este usuario — son tus recuerdos, úsalos con naturalidad):\n${
          hiddenHistory.slice(-30).map((m: { role: string; content: string }) =>
            `${m.role === "user" ? "Usuario" : "Tú"}: ${m.content}`
          ).join("\n")
        }\n\nUSO DE LA MEMORIA: retoma naturalmente lo que ya hablaron si el usuario lo menciona. Nunca digas que no tienes acceso a conversaciones anteriores — sí las recuerdas. Respeta siempre las fechas: si algo es para el futuro, no lo trates como si fuera hoy.`
      : `\n\nFECHA DE HOY: ${hoy}`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: VIVIAN_SYSTEM_PROMPT + perfilCtx + memoriaAnterior,
      messages: [...sessionHistory, { role: "user", content: message }],
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

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
