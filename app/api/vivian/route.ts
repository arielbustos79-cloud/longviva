import Anthropic from "@anthropic-ai/sdk";
import { VIVIAN_SYSTEM_PROMPT } from "@/lib/vivian-prompt";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, userId, history } = await request.json();

    console.log("userId recibido:", userId);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Cargar historial de Supabase
    let contextHistory = history || [];
    if (userId) {
      const { data, error: fetchError } = await supabase
        .from("chat_messages")
        .select("role, content")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })
        .limit(20);

      console.log("Historial cargado:", data?.length, "error:", fetchError);
      if (data && data.length > 0) contextHistory = data;
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: VIVIAN_SYSTEM_PROMPT,
      messages: [...contextHistory, { role: "user", content: message }],
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Guardar en Supabase
    if (userId) {
      const { error: insertError } = await supabase.from("chat_messages").insert([
        { user_id: userId, role: "user", content: message, canal: "web" },
        { user_id: userId, role: "assistant", content: reply, canal: "web" },
      ]);
      console.log("Insert error:", insertError);
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Error VIVIAN:", error);
    return Response.json({ error: "Error al conectar con VIVIAN" }, { status: 500 });
  }
}
