"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

type Message = { role: "user" | "assistant"; content: string };

export default function VivianPage() {
  const [sessionMessages, setSessionMessages] = useState<Message[]>([]);
  const [hiddenHistory, setHiddenHistory] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [lupaOpen, setLupaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [escuchando, setEscuchando] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<InstanceType<typeof window.SpeechRecognition> | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const user = session.user;
      setUserId(user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("nombre")
        .eq("id", user.id)
        .single();
      if (profile?.nombre) setNombre(profile.nombre);

      // Cargar historial completo — oculto, solo para contexto
      const { data: historial } = await supabase
        .from("chat_messages")
        .select("role, content, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(60);

      if (historial && historial.length > 0) {
        setHiddenHistory(historial as Message[]);
      }

      // Siempre arranca con saludo fresco
      setSessionMessages([
        { role: "assistant", content: `¡Hola${nombre ? ", " + nombre : ""}! Soy VIVIAN, tu asistente personal. ¿En qué puedo ayudarte hoy? 🌿` },
      ]);
    }
    init();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessionMessages]);

  useEffect(() => {
    if (lupaOpen) searchRef.current?.focus();
  }, [lupaOpen]);

  function toggleMic() {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta el micrófono. Usa Chrome o Edge.");
      return;
    }

    if (escuchando) {
      recognitionRef.current?.stop();
      setEscuchando(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "es-CL";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => setEscuchando(true);

    rec.onresult = (e) => {
      const texto = e.results[0][0].transcript;
      setInput(texto);
      setEscuchando(false);
    };

    rec.onerror = () => setEscuchando(false);
    rec.onend = () => setEscuchando(false);

    recognitionRef.current = rec;
    rec.start();
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...sessionMessages, userMsg];
    setSessionMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/vivian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          userId,
          history: sessionMessages, // solo mensajes de esta sesión
          hiddenHistory: hiddenHistory.slice(-30), // memoria anterior, va al system prompt
        }),
      });
      const data = await res.json();
      setSessionMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setSessionMessages([...newMessages, { role: "assistant", content: "Lo siento, hubo un error. ¿Intentamos de nuevo? 🙏" }]);
    } finally {
      setLoading(false);
    }
  }

  // Búsqueda en historial
  const resultados = searchQuery.trim().length > 1
    ? hiddenHistory.filter(m =>
        m.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
        {nombre && (
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", marginLeft: 8 }}>
            Hola, {nombre}
          </div>
        )}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          {/* Lupa */}
          <button
            onClick={() => setLupaOpen(!lupaOpen)}
            title="Buscar en historial"
            style={{
              background: lupaOpen ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white", borderRadius: "50%",
              width: 36, height: 36, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", transition: "background .2s",
            }}
          >
            🔍
          </button>
          <a href="/dashboard" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Dashboard
          </a>
        </div>
      </div>

      {/* Panel de búsqueda */}
      {lupaOpen && (
        <div style={{
          background: "white", borderBottom: "2px solid var(--v5)",
          padding: "16px 24px", maxWidth: 700, width: "100%", margin: "0 auto",
          boxShadow: "0 4px 16px rgba(27,94,59,.08)",
        }}>
          <input
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en conversaciones anteriores..."
            style={{
              width: "100%", padding: "10px 16px", borderRadius: 50,
              border: "1.5px solid var(--v5)", fontSize: "0.95rem",
              fontFamily: "DM Sans, sans-serif", outline: "none",
              background: "var(--v6)", color: "var(--n2)", boxSizing: "border-box",
            }}
          />
          {searchQuery.trim().length > 1 && (
            <div style={{ marginTop: 12, maxHeight: 260, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              {resultados.length === 0 ? (
                <p style={{ fontSize: 14, color: "var(--gris)", padding: "8px 4px" }}>
                  Sin resultados para "{searchQuery}"
                </p>
              ) : (
                resultados.map((m, i) => (
                  <div key={i} style={{
                    background: m.role === "user" ? "var(--v6)" : "var(--d4)",
                    border: `1px solid ${m.role === "user" ? "var(--v5)" : "var(--d3)"}`,
                    borderRadius: 12, padding: "10px 14px",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: m.role === "user" ? "var(--v3)" : "var(--d2)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.8 }}>
                      {m.role === "user" ? "Tú" : "VIVIAN"}
                    </div>
                    <div style={{ fontSize: 14, color: "var(--n2)", lineHeight: 1.5 }}>
                      {m.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Mensajes de sesión actual */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 700, width: "100%", margin: "0 auto" }}>
        {sessionMessages.map((msg, i) => (
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
              maxWidth: "75%", fontSize: "0.97rem", lineHeight: 1.6,
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
        {/* Botón micrófono */}
        <button
          onClick={toggleMic}
          title={escuchando ? "Detener" : "Hablarle a VIVIAN"}
          style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
            background: escuchando ? "#c0392b" : "#EAFAF0",
            border: escuchando ? "2px solid #c0392b" : "2px solid #B7E4C7",
            cursor: "pointer", fontSize: "1.2rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all .2s",
            boxShadow: escuchando ? "0 0 0 6px rgba(192,57,43,.15)" : "none",
          }}
        >
          {escuchando ? "⏹" : "🎤"}
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={escuchando ? "Escuchando... habla ahora" : "Escríbele o háblale a VIVIAN..."}
          style={{ flex: 1, padding: "0.85rem 1.25rem", borderRadius: "50px", border: `1.5px solid ${escuchando ? "#c0392b" : "#B7E4C7"}`, fontSize: "1rem", fontFamily: "DM Sans, sans-serif", outline: "none", background: escuchando ? "#fff5f5" : "#EAFAF0", transition: "all .2s" }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{ background: loading || !input.trim() ? "#B7E4C7" : "#1B5E3B", color: "white", border: "none", borderRadius: "50px", padding: "0.85rem 1.5rem", fontWeight: 600, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s", whiteSpace: "nowrap" }}
        >
          Enviar →
        </button>
      </div>
    </div>
  );
}
