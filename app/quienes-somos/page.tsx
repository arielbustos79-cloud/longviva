"use client";

import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

export default function QuienesSomosPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>

      <header style={{ background: "var(--v2)", padding: "16px 40px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>

        <p style={{ fontSize: 13, color: "var(--gris)", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Nuestra historia</p>
        <h1 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 700, color: "var(--n2)",
          lineHeight: 1.1, marginBottom: 16,
        }}>
          Quiénes somos
        </h1>
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(20px, 2.5vw, 26px)",
          fontStyle: "italic", color: "var(--v2)",
          marginBottom: 56, lineHeight: 1.4,
        }}>
          Tu prime, tu plataforma.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>

          <p style={{ fontSize: 18, color: "var(--n2)", lineHeight: 1.85, margin: 0 }}>
            LongVivIA nació de una convicción simple: los años de experiencia no son el final de nada — son el comienzo de la etapa más libre de la vida. Creemos que el protagonismo no tiene fecha de vencimiento, y que la tecnología debería estar al servicio de eso, no en contra.
          </p>

          <Bloque titulo="Por qué existe LongVivIA">
            La mayoría de las plataformas digitales en Chile están pensadas para generaciones más jóvenes: interfaces pequeñas, procesos complicados, lenguaje que no conecta. LongVivIA se construyó al revés — desde el primer día, para las personas en su prime. Letra grande, procesos simples, y una asistente que realmente entiende lo que necesitas, sin tecnicismos.
          </Bloque>

          <Bloque titulo="Lo que ofrecemos">
            VIVIAN, nuestra asistente conversacional, está disponible hoy en la web y por WhatsApp — cálida, directa y disponible cuando la necesites, para acompañarte en salud, bienestar y las decisiones del día a día.
            {"\n\n"}
            Estamos construyendo también agenda de citas, recordatorios de medicamentos, telemedicina, planes de bienestar y experiencias como tours y clases — todo pensado para que vivas tu prime con más movimiento y menos fricción. Estas funciones llegan pronto.
          </Bloque>

          <Bloque titulo="Cómo nos financiamos">
            LongVivIA es y será siempre 100% gratuita para quienes la usan. Nos financiamos con publicidad segmentada y alianzas con instituciones como AFP, Isapres, Cajas de Compensación y farmacias — nunca con cuotas ni cobros a nuestros usuarios.
          </Bloque>

          <div style={{
            background: "var(--v2)",
            borderRadius: 24,
            padding: "40px 44px",
            marginTop: 8,
          }}>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 26, fontWeight: 600,
              color: "var(--v4)", marginBottom: 16,
            }}>
              Nuestro compromiso
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,.88)", lineHeight: 1.85, margin: 0 }}>
              Vitalidad, plenitud y libertad no son solo palabras para nosotros — son el filtro con el que tomamos cada decisión de producto. Si algo no te hace sentir en tu prime, no tiene lugar en LongVivIA.
            </p>
          </div>

        </div>

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid #E0EAE3", display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/" style={{ color: "var(--gris)", textDecoration: "none", fontSize: 15 }}>
            ← Volver al inicio
          </Link>
          <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v2)", textDecoration: "underline", fontSize: 15 }}>
            hola@longvivia.cl
          </a>
        </div>
      </main>
    </div>
  );
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "3px solid var(--v4)", paddingLeft: 28 }}>
      <h2 style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 24, fontWeight: 600,
        color: "var(--v2)", marginBottom: 12,
      }}>
        {titulo}
      </h2>
      <p style={{ fontSize: 17, color: "var(--n2)", lineHeight: 1.85, margin: 0, whiteSpace: "pre-line" }}>
        {children}
      </p>
    </div>
  );
}
