"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import OliveBranch from "@/components/OliveBranch";

type EventoOcio = {
  id: string;
  nombre: string;
  lugar: string | null;
  descripcion: string | null;
  fecha_texto: string | null;
  url: string | null;
};

// ── Datos estáticos por sección ──────────────────────────────

const TURISMO = [
  {
    nombre: "Vacaciones Tercera Edad — Sernatur",
    url: "https://www.vacacionesterceraedad.cl",
    desc: "Programa estatal con subsidio real. Grupos pequeños, destinos variados, pensado para tu ritmo.",
    badge: "Programa estatal",
    destacado: true,
  },
  {
    nombre: "Turismo Senior",
    url: "https://www.turismosenior.cl",
    desc: "Agencia especializada en viajes para personas en su prime. Tours con ritmo adaptado.",
    badge: null, destacado: false,
  },
  {
    nombre: "Despegar.com",
    url: "https://www.despegar.cl",
    desc: "Vuelos, hoteles y paquetes con comparador de precios. Una de las agencias online más grandes de Latinoamérica.",
    badge: null, destacado: false,
  },
  {
    nombre: "Viajes Falabella",
    url: "https://www.viajesfalabella.cl",
    desc: "Paquetes y vuelos con cuotas CMR. Conveniente si ya usas la tarjeta Falabella.",
    badge: null, destacado: false,
  },
];

const RADIOS = [
  { nombre: "Radio Cooperativa", url: "https://www.cooperativa.cl", desc: "Noticias, análisis y música. Una de las radios más escuchadas de Chile." },
  { nombre: "Radio BioBío", url: "https://www.biobiochile.cl", desc: "Información regional y nacional en tiempo real." },
  { nombre: "Infinita", url: "https://www.infinita.cl", desc: "Música variada: pop, rock y clásicos. Sin noticias, puro entretenimiento." },
  { nombre: "La Clave", url: "https://www.laclave.cl", desc: "Rock clásico y música de los 70, 80 y 90. Para los que saben de buena música." },
];

// ── Helpers de UI ─────────────────────────────────────────────

function SeccionHeader({ titulo, subtitulo }: { titulo: string; subtitulo?: string }) {
  return (
    <div style={{ marginBottom: 20, paddingTop: 40, borderTop: "1px solid var(--v5)" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--v3)", letterSpacing: 1.2, textTransform: "uppercase", margin: "0 0 4px" }}>
        {subtitulo ?? "Ocio y experiencias"}
      </p>
      <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "var(--n2)", margin: 0 }}>
        {titulo}
      </h2>
    </div>
  );
}

function CardStandard({ nombre, url, desc, badge, destacado }: {
  nombre: string; url: string; desc: string; badge?: string | null; destacado?: boolean;
}) {
  return (
    <div style={{
      background: destacado ? "var(--v2)" : "white",
      borderRadius: 20, padding: "24px 28px",
      border: destacado ? "none" : "1.5px solid var(--v5)",
      boxShadow: destacado ? "0 8px 32px rgba(27,94,59,.2)" : "0 2px 8px rgba(27,94,59,.06)",
    }}>
      {badge && (
        <span style={{
          fontSize: 11, fontWeight: 700,
          background: destacado ? "rgba(255,255,255,.15)" : "var(--v6)",
          color: destacado ? "white" : "var(--v2)",
          borderRadius: 20, padding: "3px 12px", letterSpacing: .5,
          textTransform: "uppercase", display: "inline-block", marginBottom: 12,
        }}>
          {badge}
        </span>
      )}
      <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: destacado ? "white" : "var(--n2)", margin: "0 0 8px" }}>
        {nombre}
      </h3>
      <p style={{ fontSize: 14, color: destacado ? "rgba(255,255,255,.8)" : "var(--gris)", margin: "0 0 18px", lineHeight: 1.65 }}>
        {desc}
      </p>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-block",
        background: destacado ? "white" : "var(--v2)",
        color: destacado ? "var(--v2)" : "white",
        borderRadius: 50, padding: "9px 22px", fontSize: 14, fontWeight: 700, textDecoration: "none",
      }}>
        Ver opciones →
      </a>
    </div>
  );
}

// ── Página principal ─────────────────────────────────────────

export default function OcioPage() {
  const router = useRouter();
  const supabase = createClient();
  const [eventos, setEventos] = useState<EventoOcio[]>([]);

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data } = await supabase
        .from("eventos_ocio")
        .select("id, nombre, lugar, descripcion, fecha_texto, url")
        .order("orden", { ascending: true });

      setEventos(data ?? []);
    }
    cargar();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <header style={{ background: "var(--v2)", padding: "16px 32px", display: "flex", alignItems: "center", gap: 12 }}>
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
        <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Experiencias</p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--n2)", margin: "0 0 12px" }}>
          Ocio y experiencias
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, marginBottom: 40 }}>
          Viajes, cultura, música, libros y buena compañía — todo lo que vale la pena disfrutar en tu prime. LongVivIA te orienta a las fuentes más confiables.
        </p>

        {/* ── 1. Turismo ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {TURISMO.map(op => (
            <CardStandard key={op.nombre} {...op} />
          ))}
        </div>

        {/* ── 2. Cultura ── */}
        <SeccionHeader titulo="Cartelera cultural" />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <CardStandard
            nombre="Chile Cultura"
            url="https://www.chilecultura.gob.cl"
            desc="Cartelera oficial del Ministerio de las Culturas. Teatro, cine, música y festivales en las 16 regiones — gratis o con valor. El punto de partida para saber qué pasa cerca tuyo."
            badge="Ministerio de las Culturas"
            destacado={false}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { nombre: "PuntoTicket", url: "https://www.puntoticket.com", desc: "Compra entradas para espectáculos y eventos en línea." },
              { nombre: "TelonTicket", url: "https://www.telonticket.cl", desc: "Venta de entradas para teatro, conciertos y shows." },
            ].map(t => (
              <div key={t.nombre} style={{ background: "white", borderRadius: 16, padding: "18px 20px", border: "1.5px solid var(--v5)" }}>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 700, color: "var(--n2)", margin: "0 0 6px" }}>{t.nombre}</h3>
                <p style={{ fontSize: 13, color: "var(--gris)", margin: "0 0 14px", lineHeight: 1.55 }}>{t.desc}</p>
                <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--v2)", fontWeight: 700, textDecoration: "none" }}>
                  Ver entradas →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Libros gratis ── */}
        <SeccionHeader titulo="Libros gratis" />
        <div style={{ background: "white", borderRadius: 20, padding: "24px 28px", border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)" }}>
          <span style={{ fontSize: 11, fontWeight: 700, background: "var(--v6)", color: "var(--v2)", borderRadius: 20, padding: "3px 12px", letterSpacing: .5, textTransform: "uppercase", display: "inline-block", marginBottom: 12 }}>
            Servicio estatal gratuito
          </span>
          <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: "0 0 8px" }}>
            Biblioteca Pública Digital
          </h3>
          <p style={{ fontSize: 14, color: "var(--gris)", margin: "0 0 8px", lineHeight: 1.65 }}>
            Más de 80.000 libros y audiolibros completamente gratis — ePub, PDF y MP3. Sistema Nacional de Bibliotecas Públicas de Chile.
          </p>
          <p style={{ fontSize: 13, color: "var(--gris)", margin: "0 0 18px", lineHeight: 1.55 }}>
            <strong>Acceso:</strong> con tu RUT o pasaporte. Sin costo, sin suscripción.
          </p>
          <a href="https://www.bpdigital.cl" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "var(--v2)", color: "white", borderRadius: 50, padding: "9px 22px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            Ir a bpdigital.cl →
          </a>
        </div>

        {/* ── 4. Radios ── */}
        <SeccionHeader titulo="Radios en línea" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {RADIOS.map(r => (
            <div key={r.nombre} style={{ background: "white", borderRadius: 16, padding: "18px 20px", border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.04)" }}>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 700, color: "var(--n2)", margin: "0 0 6px" }}>{r.nombre}</h3>
              <p style={{ fontSize: 13, color: "var(--gris)", margin: "0 0 14px", lineHeight: 1.55 }}>{r.desc}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--v2)", fontWeight: 700, textDecoration: "none" }}>
                Escuchar →
              </a>
            </div>
          ))}
        </div>

        {/* ── 5. Fiestas y eventos ── */}
        <SeccionHeader titulo="Fiestas y eventos" subtitulo="Actualizado periódicamente" />
        {eventos.length === 0 ? (
          <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1.5px solid var(--v5)", textAlign: "center" }}>
            <p style={{ color: "var(--gris)", fontSize: 15, margin: 0 }}>Pronto agregamos eventos cerca tuyo. ¿Conoces alguno? Cuéntale a VIVIAN.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {eventos.map(ev => (
              <div key={ev.id} style={{ background: "white", borderRadius: 20, padding: "24px 28px", border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: 0 }}>
                    {ev.nombre}
                  </h3>
                  {ev.fecha_texto && (
                    <span style={{ fontSize: 12, fontWeight: 700, background: "var(--d4)", color: "var(--d1)", border: "1px solid var(--d3)", borderRadius: 20, padding: "3px 12px", whiteSpace: "nowrap" }}>
                      {ev.fecha_texto}
                    </span>
                  )}
                </div>
                {ev.lugar && (
                  <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 600, margin: "0 0 8px" }}>📍 {ev.lugar}</p>
                )}
                {ev.descripcion && (
                  <p style={{ fontSize: 14, color: "var(--gris)", margin: "0 0 16px", lineHeight: 1.65 }}>{ev.descripcion}</p>
                )}
                {ev.url && (
                  <a href={ev.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "var(--v2)", color: "white", borderRadius: 50, padding: "9px 22px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                    Más info →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VIVIAN tip */}
        <div style={{ background: "var(--v6)", borderRadius: 16, padding: "20px 24px", border: "1px solid var(--v5)", marginTop: 40 }}>
          <p style={{ fontSize: 14, color: "var(--gris)", margin: 0, lineHeight: 1.7 }}>
            💡 ¿No sabes por dónde partir? Cuéntale a <Link href="/vivian" style={{ color: "var(--v2)", fontWeight: 700 }}>VIVIAN</Link> qué tipo de salida te llama — ella te ayuda a decidir según tus gustos.
          </p>
        </div>

      </main>
    </div>
  );
}
