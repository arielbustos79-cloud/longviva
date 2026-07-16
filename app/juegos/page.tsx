"use client";

import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

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

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 96px" }}>
        <p style={{ fontSize: 13, color: "var(--v3)", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>
          Ejercicio cognitivo
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "var(--n2)", marginBottom: 12 }}>
          Entrena tu mente
        </h1>
        <p style={{ fontSize: 18, color: "var(--gris)", lineHeight: 1.7, marginBottom: 48 }}>
          Dos juegos simples para mantener la mente activa. Sin presión, sin puntajes — solo disfruta.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            {
              href: "/juegos/memoria",
              title: "Memoria",
              desc: "Encuentra las parejas dando vuelta las cartas. Entrena tu atención y concentración.",
              color: "var(--v2)",
              icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="9" height="9" rx="2"/>
                  <rect x="13" y="3" width="9" height="9" rx="2"/>
                  <rect x="2" y="13" width="9" height="9" rx="2"/>
                  <rect x="13" y="13" width="9" height="9" rx="2"/>
                </svg>
              ),
            },
            {
              href: "/juegos/sopa-letras",
              title: "Sopa de letras",
              desc: "Encuentra palabras relacionadas con bienestar y vitalidad escondidas en la grilla.",
              color: "#2D6A4F",
              icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 10h16M4 14h10M4 18h6"/>
                  <circle cx="19" cy="16" r="3"/>
                  <path d="M21.5 18.5l1.5 1.5"/>
                </svg>
              ),
            },
          ].map((j) => (
            <Link key={j.href} href={j.href} style={{ textDecoration: "none" }}>
              <div style={{
                background: "white", borderRadius: 24, padding: "36px 28px",
                border: "1.5px solid #E8EDE9", boxShadow: "0 4px 16px rgba(27,94,59,.06)",
                transition: "transform .2s, box-shadow .2s", cursor: "pointer",
                display: "flex", flexDirection: "column", gap: 16,
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(27,94,59,.14)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(27,94,59,.06)";
                }}
              >
                <div style={{ width: 80, height: 80, borderRadius: 20, background: j.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {j.icon}
                </div>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "var(--n2)", margin: 0 }}>
                  {j.title}
                </h2>
                <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.65, margin: 0 }}>{j.desc}</p>
                <span style={{ fontSize: 15, fontWeight: 700, color: "var(--v2)" }}>Jugar →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
