import Anthropic from "@anthropic-ai/sdk";
import { VIVIAN_SYSTEM_PROMPT } from "@/lib/vivian-prompt";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: VIVIAN_SYSTEM_PROMPT,
      messages: [
        ...(history || []),
        { role: "user", content: message },
      ],
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ reply });
  } catch (error) {
    console.error("Error VIVIAN:", error);
    return Response.json({ error: "Error al conectar con VIVIAN" }, { status: 500 });
  }
}
