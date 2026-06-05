'use client'

import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

export default function NoritaPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hola 💜 Soy NORITA. ¿Con quién estoy hablando hoy — con la persona con Parkinson o con alguien de su familia?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text?: string) {
    const msgText = (text || input).trim()
    if (!msgText || loading) return

    const userMsg: Message = { role: 'user', content: msgText }
    const newMessages: Message[] = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/norita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgText,
          history: messages,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            'Lo siento, hubo un error de conexión. ¿Intentamos de nuevo? 💜',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickSuggestions = [
    '¿Cómo gestionar el temblor?',
    'Quiero saber sobre terapias alternativas',
    'Registrar cómo me siento hoy',
    'Necesito hablar con alguien',
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F9F8FD',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #3A1F82, #5C3BB0)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 2px 20px rgba(30,15,69,0.2)',
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            position: 'relative',
          }}
        >
          🌸
          <span
            style={{
              position: 'absolute',
              bottom: 1,
              right: 1,
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: '#22E08A',
              border: '2px solid #3A1F82',
            }}
          />
        </div>
        <div>
          <div
            style={{
              color: 'white',
              fontWeight: 700,
              fontSize: '1.1rem',
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            NORITA
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>
            <span style={{ color: '#22E08A' }}>●</span> En línea · responde al
            instante
          </div>
        </div>
        <a
          href="/parkinandson"
          style={{
            marginLeft: 'auto',
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            fontSize: '0.875rem',
          }}
        >
          ← Inicio
        </a>
      </div>

      {/* Sugerencias rápidas */}
      <div
        style={{
          padding: '0.75rem 1.25rem',
          background: '#F0ECFC',
          borderBottom: '1px solid #C9B8F0',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          flexShrink: 0,
        }}
      >
        {quickSuggestions.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            style={{
              padding: '6px 14px',
              borderRadius: '50px',
              border: '1.5px solid #C9B8F0',
              background: 'white',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: '#3A1F82',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Mensajes */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          maxWidth: 720,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end',
              gap: 8,
            }}
          >
            {msg.role === 'assistant' && (
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3A1F82, #8B6CD4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}
              >
                🌸
              </div>
            )}
            <div
              style={{
                background:
                  msg.role === 'user'
                    ? 'linear-gradient(135deg, #3A1F82, #5C3BB0)'
                    : 'white',
                color: msg.role === 'user' ? 'white' : '#1C1030',
                padding: '0.85rem 1.1rem',
                borderRadius:
                  msg.role === 'user'
                    ? '18px 18px 4px 18px'
                    : '4px 18px 18px 18px',
                maxWidth: '72%',
                fontSize: '0.97rem',
                lineHeight: 1.65,
                boxShadow:
                  msg.role === 'assistant'
                    ? '0 2px 8px rgba(30,15,69,0.07)'
                    : '0 2px 12px rgba(58,31,130,0.25)',
                border:
                  msg.role === 'assistant'
                    ? '1px solid rgba(92,59,176,0.1)'
                    : 'none',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3A1F82, #8B6CD4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
              }}
            >
              🌸
            </div>
            <div
              style={{
                background: 'white',
                padding: '0.85rem 1.1rem',
                borderRadius: '4px 18px 18px 18px',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(30,15,69,0.07)',
                border: '1px solid rgba(92,59,176,0.1)',
              }}
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <span
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#8B6CD4',
                    display: 'inline-block',
                    animation: `bounce 1.2s ${delay}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '1rem 1.5rem',
          background: 'white',
          borderTop: '1px solid rgba(92,59,176,0.1)',
          maxWidth: 720,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'
            }}
            onKeyDown={handleKey}
            placeholder="Escríbele a NORITA..."
            rows={1}
            style={{
              flex: 1,
              padding: '0.8rem 1.1rem',
              borderRadius: '14px',
              border: '1.5px solid #C9B8F0',
              fontSize: '1rem',
              fontFamily: 'DM Sans, sans-serif',
              outline: 'none',
              background: '#F9F8FD',
              resize: 'none',
              lineHeight: 1.5,
              color: '#1C1030',
              minHeight: 48,
              maxHeight: 140,
              overflow: 'hidden',
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              border: 'none',
              background:
                loading || !input.trim()
                  ? '#C9B8F0'
                  : 'linear-gradient(135deg, #3A1F82, #5C3BB0)',
              color: 'white',
              fontSize: '1.25rem',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                !loading && input.trim()
                  ? '0 4px 14px rgba(58,31,130,0.35)'
                  : 'none',
              transition: 'all 0.2s',
            }}
          >
            ↑
          </button>
        </div>
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.73rem',
            color: '#6B5F80',
            marginTop: '0.6rem',
          }}
        >
          NORITA no reemplaza a tu neurólogo · Todo lo que compartes es
          confidencial
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
