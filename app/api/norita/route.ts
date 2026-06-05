import Anthropic from '@anthropic-ai/sdk'
import { NORITA_SYSTEM_PROMPT } from '@/lib/norita-prompt'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

type Message = { role: 'user' | 'assistant'; content: string }

export async function POST(request: Request) {
  try {
    const { message, history, userName, estadio, ciudad } = await request.json()

    if (!message?.trim()) {
      return Response.json({ error: 'Mensaje vacío' }, { status: 400 })
    }

    // Contexto personalizado del usuario
    const userContext = [
      userName ? `\n\nCONTEXTO DEL USUARIO:` : '',
      userName ? `- Nombre: ${userName}` : '',
      estadio ? `- Estadio Parkinson: ${estadio}` : '',
      ciudad ? `- Ciudad: ${ciudad}` : '',
    ].filter(Boolean).join('\n')

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: NORITA_SYSTEM_PROMPT + userContext,
      messages: [
        ...(history || []).slice(-10) as Message[], // máx 10 mensajes de historial
        { role: 'user', content: message },
      ],
    })

    const reply =
      response.content[0].type === 'text' ? response.content[0].text : ''

    return Response.json({ reply })
  } catch (error) {
    console.error('Error NORITA:', error)
    return Response.json(
      { error: 'Error al conectar con NORITA' },
      { status: 500 }
    )
  }
}
