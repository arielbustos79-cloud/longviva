"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import { logEvento } from "@/lib/logEvento";

type Message = { role: "user" | "assistant"; content: string };
type MsgConFecha = Message & { id: string; created_at: string };

function renderConLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const partes = text.split(urlRegex);
  return partes.map((parte, i) =>
    urlRegex.test(parte) ? (
      <a key={i} href={parte} target="_blank" rel="noopener noreferrer"
        style={{ color: "#2D8A5F", textDecoration: "underline", wordBreak: "break-all" }}>
        {parte.includes("youtube.com") || parte.includes("youtu.be") ? "▶ Ver video en YouTube" : parte}
      </a>
    ) : (
      <span key={i}>{parte}</span>
    )
  );
}

export default function VivianPage() {
  const [sessionMessages, setSessionMessages] = useState<Message[]>([]);
  // hiddenHistory: solo role+content para contexto de VIVIAN
  const [hiddenHistory, setHiddenHistory] = useState<Message[]>([]);
  // historialVisible: mensajes completos con id+fecha para el panel
  const [historialVisible, setHistorialVisible] = useState<MsgConFecha[]>([]);
  const [historialCargando, setHistorialCargando] = useState(false);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [lupaOpen, setLupaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [historialOpen, setHistorialOpen] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [grupoExpandido, setGrupoExpandido] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
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

      // hiddenHistory: últimos 60 mensajes para contexto de VIVIAN
      const { data: historial } = await supabase
        .from("chat_messages")
        .select("role, content, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(60);

      if (historial && historial.length > 0) {
        setHiddenHistory([...historial].reverse() as Message[]);
      }

      setSessionMessages([
        { role: "assistant", content: `¡Hola${profile?.nombre ? ", " + profile.nombre : ""}! Soy VIVIAN, tu asistente personal. ¿En qué puedo ayudarte hoy? 🌿` },
      ]);
    }
    init();
  }, []);

  // Cargar historial visible cada vez que se abre el panel
  const cargarHistorialVisible = useCallback(async () => {
    if (!userId) return;
    setHistorialCargando(true);
    const { data } = await supabase
      .from("chat_messages")
      .select("id, role, content, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(500);
    setHistorialVisible((data ?? []) as MsgConFecha[]);
    setHistorialCargando(false);
  }, [userId]);

  useEffect(() => {
    if (historialOpen) {
      setConfirmDelete(null);
      setConfirmDeleteAll(false);
      cargarHistorialVisible();
    }
  }, [historialOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessionMessages]);

  useEffect(() => {
    if (lupaOpen) searchRef.current?.focus();
  }, [lupaOpen]);

  async function eliminarGrupo(fechaISO: string) {
    if (!userId) return;
    const inicio = new Date(fechaISO);
    inicio.setHours(0, 0, 0, 0);
    const fin = new Date(fechaISO);
    fin.setHours(23, 59, 59, 999);
    await supabase
      .from("chat_messages")
      .delete()
      .eq("user_id", userId)
      .gte("created_at", inicio.toISOString())
      .lte("created_at", fin.toISOString());
    setConfirmDelete(null);
    await cargarHistorialVisible();
  }

  async function eliminarTodo() {
    if (!userId) return;
    await supabase
      .from("chat_messages")
      .delete()
      .eq("user_id", userId);
    setConfirmDeleteAll(false);
    setHistorialVisible([]);
    setHiddenHistory([]);
  }

  function toggleMic() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
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

    logEvento("vivian_mensaje", { canal: "web" });

    try {
      const res = await fetch("/api/vivian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          userId,
          history: sessionMessages,
          hiddenHistory: hiddenHistory.slice(-30),
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

  // Agrupar historial visible por fecha (descendente)
  function agruparPorFecha(msgs: MsgConFecha[]) {
    const grupos: { fechaLabel: string; fechaISO: string; mensajes: MsgConFecha[] }[] = [];
    let fechaActual = "";
    // msgs ya viene ordenado desc — agrupamos y mostramos más reciente primero
    msgs.forEach(m => {
      const d = new Date(m.created_at);
      const fechaISO = d.toISOString().split("T")[0];
      const fechaLabel = d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      if (fechaISO !== fechaActual) {
        fechaActual = fechaISO;
        grupos.push({ fechaLabel, fechaISO, mensajes: [m] });
      } else {
        grupos[grupos.length - 1].mensajes.push(m);
      }
    });
    return grupos;
  }

  const grupos = agruparPorFecha(historialVisible);

  // Búsqueda en historial
  const resultados = searchQuery.trim().length > 1
    ? historialVisible.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", display: "flex", flexDirection: "column", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#1B5E3B", padding: "0.75rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <a href={userId ? "/dashboard" : "/"} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.82rem", whiteSpace: "nowrap", flexShrink: 0 }}>
          {new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long" })} · ← Volver
        </a>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ color: "white", fontWeight: 700, fontSize: "1.05rem", fontFamily: "Cormorant Garamond, serif", lineHeight: 1.2 }}>VIVIAN</div>
          <div style={{ color: "#B7E4C7", fontSize: "0.75rem" }}>● En línea</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => { setHistorialOpen(!historialOpen); setLupaOpen(false); }}
            title="Ver historial de conversaciones"
            style={{
              background: historialOpen ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white", borderRadius: "50%",
              width: 36, height: 36, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", transition: "background .2s",
            }}
          >
            🕐
          </button>
          <button
            onClick={() => { setLupaOpen(!lupaOpen); setHistorialOpen(false); }}
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
        </div>
      </div>

      {/* Panel de historial */}
      {historialOpen && (
        <div style={{
          background: "white", borderBottom: "2px solid var(--v5)",
          padding: "16px 24px", maxWidth: 700, width: "100%", margin: "0 auto",
          boxShadow: "0 4px 16px rgba(27,94,59,.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--v3)", textTransform: "uppercase", letterSpacing: 0.8 }}>
              Conversaciones anteriores
            </div>
            {historialVisible.length > 0 && !confirmDeleteAll && (
              <button
                onClick={() => setConfirmDeleteAll(true)}
                style={{ fontSize: 12, color: "#c0392b", background: "transparent", border: "1px solid #c0392b", borderRadius: 50, padding: "4px 12px", cursor: "pointer", fontWeight: 600 }}
              >
                Borrar todo
              </button>
            )}
          </div>

          {/* Confirmación borrar todo */}
          {confirmDeleteAll && (
            <div style={{ background: "#FFF5F5", border: "1.5px solid #c0392b", borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
              <p style={{ fontSize: 14, color: "#c0392b", fontWeight: 600, margin: "0 0 10px" }}>
                ¿Eliminar todo el historial? Esta acción no se puede deshacer.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={eliminarTodo} style={{ fontSize: 13, fontWeight: 700, color: "white", background: "#c0392b", border: "none", borderRadius: 50, padding: "6px 16px", cursor: "pointer" }}>
                  Sí, borrar todo
                </button>
                <button onClick={() => setConfirmDeleteAll(false)} style={{ fontSize: 13, color: "var(--gris)", background: "transparent", border: "1px solid #D4DED6", borderRadius: 50, padding: "6px 14px", cursor: "pointer" }}>
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {historialCargando ? (
            <p style={{ fontSize: 14, color: "var(--gris)", padding: "4px 0" }}>Cargando...</p>
          ) : grupos.length === 0 ? (
            <p style={{ fontSize: 14, color: "var(--gris)", padding: "4px 0" }}>Aún no tienes conversaciones guardadas.</p>
          ) : (
            <div style={{ maxHeight: 360, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              {grupos.map((g) => {
                const expandido = grupoExpandido === g.fechaISO;
                return (
                  <div key={g.fechaISO} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--v5)" }}>
                    {/* Header del grupo — clic para expandir */}
                    <div
                      style={{ background: "var(--v6)", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
                      onClick={() => setGrupoExpandido(expandido ? null : g.fechaISO)}
                    >
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--v3)", letterSpacing: 0.5, textTransform: "capitalize" }}>
                        {expandido ? "▾" : "▸"} {g.fechaLabel}
                      </span>
                      {confirmDelete === g.fechaISO ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={e => e.stopPropagation()}>
                          <span style={{ fontSize: 12, color: "#c0392b" }}>¿Eliminar? No se puede deshacer.</span>
                          <button onClick={() => eliminarGrupo(g.fechaISO)} style={{ fontSize: 11, fontWeight: 700, color: "white", background: "#c0392b", border: "none", borderRadius: 50, padding: "3px 10px", cursor: "pointer" }}>Sí</button>
                          <button onClick={() => setConfirmDelete(null)} style={{ fontSize: 11, color: "var(--gris)", background: "transparent", border: "1px solid #D4DED6", borderRadius: 50, padding: "3px 8px", cursor: "pointer" }}>No</button>
                        </div>
                      ) : (
                        <button
                          onClick={e => { e.stopPropagation(); setConfirmDelete(g.fechaISO); }}
                          title="Eliminar esta conversación"
                          style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 14, color: "var(--gris)", padding: "2px 6px", borderRadius: 6 }}
                        >
                          🗑
                        </button>
                      )}
                    </div>

                    {/* Mensajes expandidos */}
                    {expandido && g.mensajes.map((m, j) => (
                      <div key={j} style={{
                        padding: "10px 14px", fontSize: 14, lineHeight: 1.6,
                        borderTop: "1px solid var(--v5)",
                        background: m.role === "assistant" ? "#F9FDFB" : "white",
                        display: "flex", gap: 8, alignItems: "flex-start",
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: m.role === "user" ? "var(--v3)" : "var(--gris)", flexShrink: 0, paddingTop: 2, minWidth: 44 }}>
                          {m.role === "user" ? "Tú" : "VIVIAN"}
                        </span>
                        <span style={{ color: "var(--n2)" }}>{m.content}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

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
                  Sin resultados para &quot;{searchQuery}&quot;
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
                    <div style={{ fontSize: 14, color: "var(--n2)", lineHeight: 1.5 }}>{m.content}</div>
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
              {renderConLinks(msg.content)}
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
      <div style={{ padding: "0.875rem 1rem", background: "white", borderTop: "1px solid #EAFAF0", maxWidth: 700, width: "100%", margin: "0 auto", display: "flex", gap: "0.5rem", alignItems: "center", boxSizing: "border-box" }}>
        <button
          onClick={toggleMic}
          title={escuchando ? "Detener" : "Hablarle a VIVIAN"}
          style={{
            width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
            background: escuchando ? "#c0392b" : "#EAFAF0",
            border: escuchando ? "2px solid #c0392b" : "2px solid #B7E4C7",
            cursor: "pointer", fontSize: "1.1rem",
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
          placeholder={escuchando ? "Escuchando..." : "Escribe o Habla"}
          style={{ flex: 1, minWidth: 0, padding: "0.85rem 1rem", borderRadius: "50px", border: `1.5px solid ${escuchando ? "#c0392b" : "#B7E4C7"}`, fontSize: "1rem", fontFamily: "DM Sans, sans-serif", outline: "none", background: escuchando ? "#fff5f5" : "#EAFAF0", transition: "all .2s" }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{ background: loading || !input.trim() ? "#B7E4C7" : "#1B5E3B", color: "white", border: "none", borderRadius: "50px", padding: "0.85rem 1.25rem", fontWeight: 600, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
