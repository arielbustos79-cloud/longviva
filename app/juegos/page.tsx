"use client";

import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

const JUEGOS = [
  {
    href: "/juegos/caza-objetos",
    categoria: "Atención",
    title: "Caza objetos",
    desc: "Encuentra todas las apariciones de un ícono en la grilla. La cuadrícula crece y los distractores se vuelven más parecidos con cada nivel.",
    color: "var(--v2)",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <circle cx="11" cy="11" r="3" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    href: "/juegos/secuencia",
    categoria: "Memoria",
    title: "Secuencia",
    desc: "Observa la secuencia de colores y repítela en el mismo orden. Empieza con 3 pasos — sigue creciendo mientras aciertes.",
    color: "#2D6A4F",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="9" height="9" rx="2"/>
        <rect x="13" y="2" width="9" height="9" rx="2"/>
        <rect x="2" y="13" width="9" height="9" rx="2"/>
        <rect x="13" y="13" width="9" height="9" rx="2"/>
      </svg>
    ),
  },
  {
    href: "/juegos/diferencias",
    categoria: "Percepción",
    title: "Encuentra las diferencias",
    desc: "Compara dos ilustraciones y toca donde veas una diferencia. Cada nivel agrega más diferencias y más sutiles que el anterior.",
    color: "#1B5E3B",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="6"/>
        <circle cx="15" cy="15" r="6"/>
        <path d="M9 3h12v12"/>
      </svg>
    ),
  },
  {
    href: "/juegos/test-colores",
    categoria: "Ejecución",
    title: "Test de colores",
    desc: "Aparece una palabra de color escrita en otro color. Toca el botón del color de la tinta — no lo que dice la palabra. 60 segundos.",
    color: "#C9973A",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8M12 8v8"/>
        <circle cx="12" cy="12" r="3" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

export default function JuegosPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <header style={{ background: "var(--v2)", padding: "16px 40px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
        <Link href="/dashboard" style={{ marginLeft: "auto", color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 15 }}>
          ← Mi panel
        </Link>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "56px 24px 96px" }}>
        <p style={{ fontSize: 13, color: "var(--v3)", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>
          Ejercicio cognitivo
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "var(--n2)", marginBottom: 12 }}>
          Entrena tu mente
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", marginBottom: 48, lineHeight: 1.7, maxWidth: 540 }}>
          Cuatro juegos organizados en las categorías cognitivas de Unobrain: Atención, Memoria, Percepción y Ejecución. Sin presión de tiempo — el desafío viene del nivel.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {JUEGOS.map(j => (
            <Link key={j.href} href={j.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "white", borderRadius: 24, padding: "36px 28px",
                  border: "1.5px solid #E8EDE9", boxShadow: "0 4px 16px rgba(27,94,59,.06)",
                  transition: "transform .2s, box-shadow .2s", cursor: "pointer",
                  display: "flex", flexDirection: "column", gap: 14, height: "100%", boxSizing: "border-box",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(27,94,59,.14)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(27,94,59,.06)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 76, height: 76, borderRadius: 18, background: j.color,
                    flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {j.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: j.color, marginBottom: 3 }}>
                      {j.categoria}
                    </div>
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: 0, lineHeight: 1.2 }}>
                      {j.title}
                    </h2>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: "var(--gris)", lineHeight: 1.65, margin: 0 }}>{j.desc}</p>
                <span style={{ fontSize: 14, color: j.color, fontWeight: 700 }}>Jugar →</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56, paddingTop: 32, borderTop: "1px solid var(--v5)" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al panel
          </Link>
        </div>
      </main>
    </div>
  );
}
