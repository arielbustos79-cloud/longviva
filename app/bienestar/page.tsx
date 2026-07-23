"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import OliveBranch from "@/components/OliveBranch";

const RUTINAS = [
  {
    titulo: "Moverse 20 minutos al día",
    descripcion: "La rutina que más cambia tu energía — sin gimnasio ni equipamiento.",
    slug: "moverse-20-minutos-al-dia-la-rutina-que-mas-cambia-tu-energia",
  },
  {
    titulo: "Hervir laurel en casa",
    descripcion: "Un hábito simple de bienestar en el hogar con varios beneficios.",
    slug: "hervir-laurel-en-casa-un-habito-simple-con-varios-beneficios",
  },
];

export default function BienestarPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push("/login");
    });
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
        <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Bienestar activo</p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--n2)", margin: "0 0 12px" }}>
          Muévete a tu ritmo
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, marginBottom: 40 }}>
          Rutinas simples, validadas y sin complicaciones — para que el movimiento sea parte natural de tu día, no una obligación.
        </p>

        {/* Rutinas curadas */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>
          Artículos y rutinas
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {RUTINAS.map(r => (
            <Link
              key={r.slug}
              href={`/articulos/${r.slug}`}
              style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)", textDecoration: "none", display: "block" }}
            >
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: "0 0 6px" }}>
                {r.titulo}
              </h2>
              <p style={{ fontSize: 15, color: "var(--gris)", margin: 0, lineHeight: 1.6 }}>{r.descripcion}</p>
              <span style={{ fontSize: 13, color: "var(--v2)", fontWeight: 700, display: "block", marginTop: 12 }}>Leer →</span>
            </Link>
          ))}
          <Link
            href="/articulos"
            style={{ background: "var(--v6)", borderRadius: 20, padding: "18px 24px", border: "1px solid var(--v5)", textDecoration: "none", textAlign: "center", display: "block" }}
          >
            <span style={{ fontSize: 15, color: "var(--v2)", fontWeight: 700 }}>Ver todos los artículos de bienestar →</span>
          </Link>
        </div>

        {/* Clases presenciales — próximamente */}
        <div style={{ background: "white", borderRadius: 20, padding: "28px 28px", border: "1.5px solid var(--v5)", opacity: 0.7 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, background: "var(--d4)", color: "var(--d1)", border: "1px solid var(--d3)", borderRadius: 20, padding: "3px 12px", letterSpacing: .5, textTransform: "uppercase", marginBottom: 14 }}>
            Próximamente
          </div>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 700, color: "var(--n2)", margin: "0 0 8px" }}>
            Clases en vivo — Yoga, Pilates y Funcional
          </h2>
          <p style={{ fontSize: 15, color: "var(--gris)", margin: 0, lineHeight: 1.7 }}>
            Estamos seleccionando instructores especializados para personas en su prime. Sin costo extra, sin desplazamientos.
          </p>
        </div>
      </main>
    </div>
  );
}
