"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function VivianPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! Soy VIVIAN, tu asistente personal. ¿En qué puedo ayudarte hoy? 🌿" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/vivian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Lo siento, hubo un error. ¿Intentamos de nuevo? 🙏" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", display: "flex", flexDirection: "column", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#1B5E3B", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
          🌿
        </div>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: "1.1rem", fontFamily: "Cormorant Garamond, serif" }}>VIVIAN</div>
          <div style={{ color: "#B7E4C7", fontSize: "0.8rem" }}>● En línea · Tu asistente LongVivIA</div>
        </div>
        <a href="/" style={{ marginLeft: "auto", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem" }}>← Inicio</a>
      </div>

      {/* Mensajes */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 700, width: "100%", margin: "0 auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1B5E3B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
                🌿
              </div>
            )}
            <div style={{
              background: msg.role === "user" ? "#1B5E3B" : "white",
              color: msg.role === "user" ? "white" : "#1A2E22",
              padding: "0.75rem 1rem",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              maxWidth: "75%",
              fontSize: "0.97rem",
              lineHeight: 1.6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1B5E3B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>🌿</div>
            <div style={{ background: "white", padding: "0.75rem 1rem", borderRadius: "18px 18px 18px 4px", color: "#7A8A82", fontSize: "0.9rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
              Escribiendo...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "1rem 1.5rem", background: "white", borderTop: "1px solid #EAFAF0", maxWidth: 700, width: "100%", margin: "0 auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escríbele a VIVIAN..."
          style={{ flex: 1, padding: "0.85rem 1.25rem", borderRadius: "50px", border: "1.5px solid #B7E4C7", fontSize: "1rem", fontFamily: "DM Sans, sans-serif", outline: "none", background: "#EAFAF0" }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{ background: loading || !input.trim() ? "#B7E4C7" : "#1B5E3B", color: "white", border: "none", borderRadius: "50px", padding: "0.85rem 1.5rem", fontWeight: 600, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
        >
          Enviar →
        </button>
      </div>
    </div>
  );
}
