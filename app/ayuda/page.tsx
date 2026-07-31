"use client";

import { useState } from "react";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import { createClient } from "@/lib/supabase-browser";

// ── FAQ ───────────────────────────────────────────────────────
const FAQS = [
  {
    q: "¿Es realmente gratis?",
    a: "Sí, completamente. LongVivIA es gratuita para todos los usuarios — sin planes de pago, sin tarjeta, sin letra chica. El modelo es que las instituciones y proveedores pagan por estar en nuestra red, no tú.",
  },
  {
    q: "¿Por qué me piden mi nombre y correo al registrarme?",
    a: "El nombre es para que VIVIAN te llame por tu nombre — nada más. El correo es tu llave de acceso: en vez de contraseña, te enviamos un enlace al email cada vez que quieras entrar. Es más seguro y más simple que recordar una clave.",
  },
  {
    q: "¿Qué pasa con mis datos personales?",
    a: "Tus datos son tuyos. No los vendemos ni los compartimos con terceros sin tu consentimiento. Los datos de salud (previsión, medicamentos, agenda) solo los ves tú — están protegidos individualmente en nuestra base de datos. Puedes leer más en nuestra Política de Privacidad.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "No. LongVivIA funciona directamente en el navegador de tu teléfono, tablet o computador — sin descargas. Si quieres tenerla como ícono en tu pantalla de inicio, puedes instalarla como app desde el navegador (se llama PWA), pero es opcional.",
  },
  {
    q: "¿Qué hago si el enlace de acceso no me llega?",
    a: "Primero revisa la carpeta de spam o correo no deseado — a veces llega ahí. El enlace es válido por 1 hora. Si no lo encuentras, vuelve a longvivia.cl, ingresa tu correo y pide uno nuevo. Si el problema persiste, escríbenos a hola@longvivia.cl.",
  },
  {
    q: "¿Puedo usarlo por WhatsApp?",
    a: "Por ahora VIVIAN está disponible en la web. Estamos trabajando para sumar WhatsApp como otro canal — te avisaremos cuando esté listo.",
  },
  {
    q: "¿VIVIAN guarda lo que le cuento?",
    a: "VIVIAN recuerda el historial de tus conversaciones para poder retomarlo la próxima vez. Si mencionas datos de salud como tu previsión o medicamentos, primero te pide permiso antes de guardarlos. Puedes ver y eliminar tu historial en cualquier momento desde el panel.",
  },
  {
    q: "¿Cómo agrego un medicamento o una cita médica?",
    a: "Desde tu panel, entra a \"Medicamentos\" o \"Agenda\" — hay un botón \"+ Agregar\" en cada sección. También puedes pedirle a VIVIAN que te guíe paso a paso: escríbele \"cómo agrego un medicamento\" y te lleva de la mano.",
  },
];

// ── Paso a paso ───────────────────────────────────────────────
const PASOS = [
  {
    num: "01",
    titulo: "Entra sin clave",
    desc: "Ve a longvivia.cl → \"Comenzar gratis\" → escribe tu correo → llega un enlace al instante → haz clic y ya estás adentro. Sin contraseña.",
  },
  {
    num: "02",
    titulo: "Habla con VIVIAN",
    desc: "Desde tu panel, entra a VIVIAN y cuéntale lo que necesitas en tus propias palabras. Ella te orienta, recuerda lo que conversaron y te lleva a donde corresponde.",
  },
  {
    num: "03",
    titulo: "Tu panel",
    desc: "Agenda de citas, Medicamentos con recordatorios, Artículos, Juegos cognitivos, Comunidad, Telemedicina, Bienestar, Ocio y más — todo desde un solo lugar.",
  },
  {
    num: "04",
    titulo: "¿Te trabaste?",
    desc: "Pregúntale a VIVIAN directamente: \"¿cómo agrego un medicamento?\", \"¿dónde veo mis citas?\". O escríbenos a hola@longvivia.cl — respondemos en el día.",
  },
];

// ── Componente FAQ item ────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--v5)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left", background: "none", border: "none",
          padding: "20px 0", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 600, color: "var(--n2)", lineHeight: 1.4 }}>{q}</span>
        <span style={{
          fontSize: 22, color: "var(--v2)", fontWeight: 300, lineHeight: 1,
          transform: open ? "rotate(45deg)" : "none", transition: "transform .2s", flexShrink: 0,
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.75, margin: "0 0 20px", paddingRight: 32 }}>
          {a}
        </p>
      )}
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────
export default function AyudaPage() {
  const supabase = createClient();

  const [form, setForm] = useState({ nombre: "", que_hacias: "", que_fue_dificil: "", comentario: "" });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  async function enviarFeedback() {
    if (!form.que_hacias && !form.que_fue_dificil && !form.comentario) {
      setError("Completa al menos un campo antes de enviar.");
      return;
    }
    setEnviando(true);
    setError("");
    const { data: { user } } = await supabase.auth.getUser();
    const { error: dbError } = await supabase.from("feedback").insert({
      nombre: form.nombre || null,
      que_hacias: form.que_hacias || null,
      que_fue_dificil: form.que_fue_dificil || null,
      comentario: form.comentario || null,
      user_id: user?.id ?? null,
    });
    setEnviando(false);
    if (dbError) {
      setError("Hubo un problema al enviar. Intenta de nuevo o escríbenos a hola@longvivia.cl.");
    } else {
      setEnviado(true);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <header style={{ background: "var(--v2)", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
        <Link href="/dashboard" style={{ marginLeft: "auto", color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 15 }}>
          ← Mi panel
        </Link>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 96px" }}>

        {/* Hero */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--v2)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
          Centro de ayuda
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 48px)", color: "var(--n2)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 16px" }}>
          ¿Cómo podemos ayudarte?
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, margin: "0 0 56px" }}>
          Aquí encuentras todo lo que necesitas para usar LongVivIA con confianza. Si no encuentras lo que buscas, VIVIAN o nuestro equipo están a un mensaje de distancia.
        </p>

        {/* Paso a paso */}
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, fontWeight: 700, color: "var(--n2)", margin: "0 0 24px" }}>
          Cómo funciona LongVivIA
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 56 }}>
          {PASOS.map(p => (
            <div key={p.num} style={{
              background: "white", borderRadius: 20, padding: "24px 28px",
              border: "1.5px solid var(--v5)", display: "flex", gap: 20, alignItems: "flex-start",
            }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: "var(--v4)", letterSpacing: 2,
                minWidth: 32, paddingTop: 3,
              }}>{p.num}</div>
              <div>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: "0 0 8px" }}>
                  {p.titulo}
                </h3>
                <p style={{ fontSize: 15, color: "var(--gris)", lineHeight: 1.7, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, fontWeight: 700, color: "var(--n2)", margin: "0 0 8px" }}>
          Preguntas frecuentes
        </h2>
        <p style={{ fontSize: 15, color: "var(--gris)", margin: "0 0 24px" }}>
          Las dudas más comunes — respuestas directas, sin tecnicismos.
        </p>
        <div style={{ background: "white", borderRadius: 20, padding: "8px 28px", border: "1.5px solid var(--v5)", marginBottom: 56 }}>
          {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>

        {/* CTA VIVIAN */}
        <div style={{ background: "var(--v2)", borderRadius: 20, padding: "32px 28px", marginBottom: 56, textAlign: "center" }}>
          <p style={{ fontSize: 18, color: "white", fontWeight: 600, margin: "0 0 8px" }}>
            ¿Prefieres preguntar conversando?
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", margin: "0 0 24px", lineHeight: 1.65 }}>
            VIVIAN puede guiarte paso a paso en cualquier parte de la plataforma — solo cuéntale qué necesitas.
          </p>
          <Link href="/vivian" style={{
            display: "inline-block", background: "white", color: "var(--v2)",
            padding: "13px 32px", borderRadius: 50, fontSize: 15, fontWeight: 700, textDecoration: "none",
          }}>
            Preguntarle a VIVIAN →
          </Link>
        </div>

        {/* Formulario de feedback */}
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, fontWeight: 700, color: "var(--n2)", margin: "0 0 8px" }}>
          Ayúdanos a mejorar tu experiencia
        </h2>
        <p style={{ fontSize: 15, color: "var(--gris)", margin: "0 0 24px", lineHeight: 1.65 }}>
          Dos preguntas rápidas — sin campos obligatorios. Tu opinión nos ayuda a hacer LongVivIA mejor para ti.
        </p>

        {enviado ? (
          <div style={{ background: "var(--v6)", borderRadius: 20, padding: "32px 28px", border: "1.5px solid var(--v5)", textAlign: "center" }}>
            <p style={{ fontSize: 22, fontFamily: "Cormorant Garamond, serif", fontWeight: 700, color: "var(--n2)", margin: "0 0 8px" }}>
              ¡Gracias por tu mensaje!
            </p>
            <p style={{ fontSize: 15, color: "var(--gris)", margin: 0 }}>
              Lo leemos con atención. Si dejaste tu nombre, te podemos responder si corresponde.
            </p>
          </div>
        ) : (
          <div style={{ background: "white", borderRadius: 20, padding: "32px 28px", border: "1.5px solid var(--v5)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
                  Tu nombre <span style={{ fontWeight: 400, color: "var(--gris)" }}>(opcional)</span>
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                  placeholder="¿Cómo te llamamos?"
                  style={{
                    width: "100%", padding: "13px 16px", borderRadius: 12,
                    border: "1.5px solid var(--v5)", fontSize: 16,
                    fontFamily: "DM Sans, sans-serif", boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
                  ¿Qué estabas tratando de hacer?
                </label>
                <input
                  type="text"
                  value={form.que_hacias}
                  onChange={e => setForm(f => ({ ...f, que_hacias: e.target.value }))}
                  placeholder="Ej: buscar un médico, ver mis medicamentos, hablar con VIVIAN..."
                  style={{
                    width: "100%", padding: "13px 16px", borderRadius: 12,
                    border: "1.5px solid var(--v5)", fontSize: 16,
                    fontFamily: "DM Sans, sans-serif", boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
                  ¿Qué encontraste difícil o confuso?
                </label>
                <input
                  type="text"
                  value={form.que_fue_dificil}
                  onChange={e => setForm(f => ({ ...f, que_fue_dificil: e.target.value }))}
                  placeholder="Ej: no encontré el botón, el enlace no llegó, no entendí para qué sirve..."
                  style={{
                    width: "100%", padding: "13px 16px", borderRadius: 12,
                    border: "1.5px solid var(--v5)", fontSize: 16,
                    fontFamily: "DM Sans, sans-serif", boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
                  Comentario libre <span style={{ fontWeight: 400, color: "var(--gris)" }}>(opcional)</span>
                </label>
                <textarea
                  value={form.comentario}
                  onChange={e => setForm(f => ({ ...f, comentario: e.target.value }))}
                  placeholder="Lo que quieras contarnos — sugerencias, lo que te gustó, lo que cambiarías..."
                  rows={4}
                  style={{
                    width: "100%", padding: "13px 16px", borderRadius: 12,
                    border: "1.5px solid var(--v5)", fontSize: 16,
                    fontFamily: "DM Sans, sans-serif", boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </div>

              {error && (
                <p style={{ fontSize: 14, color: "#C0392B", margin: 0 }}>{error}</p>
              )}

              <button
                onClick={enviarFeedback}
                disabled={enviando}
                style={{
                  background: enviando ? "var(--v4)" : "var(--v2)",
                  color: "white", border: "none", borderRadius: 50,
                  padding: "15px 32px", fontSize: 16, fontWeight: 700,
                  cursor: enviando ? "not-allowed" : "pointer",
                  alignSelf: "flex-start",
                }}
              >
                {enviando ? "Enviando..." : "Enviar comentario →"}
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--v5)" }}>
          <p style={{ fontSize: 15, color: "var(--gris)", margin: "0 0 8px" }}>
            ¿Necesitas hablar con alguien?
          </p>
          <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v2)", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            hola@longvivia.cl
          </a>
        </div>

      </main>
    </div>
  );
}
