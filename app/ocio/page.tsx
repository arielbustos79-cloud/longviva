"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import OliveBranch from "@/components/OliveBranch";

const OPCIONES = [
  {
    nombre: "Vacaciones Tercera Edad — Sernatur",
    url: "https://www.vacacionesterceraedad.cl",
    descripcion: "Programa estatal con respaldo de Sernatur y subsidio real. Grupos pequeños, destinos variados, pensado para tu ritmo.",
    destacado: true,
    badge: "Programa estatal",
  },
  {
    nombre: "Turismo Senior",
    url: "https://www.turismosenior.cl",
    descripcion: "Agencia especializada en viajes para personas en su prime. Tours con grupos pequeños y ritmo adaptado.",
    destacado: false,
    badge: null,
  },
];

export default function OcioPage() {
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
        <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Experiencias</p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--n2)", margin: "0 0 12px" }}>
          Ocio y experiencias
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, marginBottom: 40 }}>
          Grupos pequeños, itinerarios pensados para tu ritmo y compañía que comparte tus ganas de seguir descubriendo. LongVivIA te orienta hacia las opciones más confiables del mercado.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {OPCIONES.map(op => (
            <div key={op.nombre} style={{
              background: op.destacado ? "var(--v2)" : "white",
              borderRadius: 20, padding: "28px 28px",
              border: op.destacado ? "none" : "1.5px solid var(--v5)",
              boxShadow: op.destacado ? "0 8px 32px rgba(27,94,59,.2)" : "0 2px 8px rgba(27,94,59,.06)",
            }}>
              {op.badge && (
                <span style={{ fontSize: 11, fontWeight: 700, background: op.destacado ? "rgba(255,255,255,.15)" : "var(--v6)", color: op.destacado ? "white" : "var(--v2)", borderRadius: 20, padding: "3px 12px", letterSpacing: .5, textTransform: "uppercase", display: "inline-block", marginBottom: 12 }}>
                  {op.badge}
                </span>
              )}
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 700, color: op.destacado ? "white" : "var(--n2)", margin: "0 0 8px" }}>
                {op.nombre}
              </h2>
              <p style={{ fontSize: 15, color: op.destacado ? "rgba(255,255,255,.8)" : "var(--gris)", margin: "0 0 20px", lineHeight: 1.7 }}>
                {op.descripcion}
              </p>
              <a
                href={op.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", background: op.destacado ? "white" : "var(--v2)", color: op.destacado ? "var(--v2)" : "white", borderRadius: 50, padding: "10px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}
              >
                Ver opciones →
              </a>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--v6)", borderRadius: 16, padding: "20px 24px", border: "1px solid var(--v5)" }}>
          <p style={{ fontSize: 14, color: "var(--gris)", margin: 0, lineHeight: 1.7 }}>
            💡 ¿No sabes por dónde partir? Cuéntale a <Link href="/vivian" style={{ color: "var(--v2)", fontWeight: 700 }}>VIVIAN</Link> qué tipo de salida te llama — ella te ayuda a decidir según tus gustos, sin abrumarte con opciones.
          </p>
        </div>
      </main>
    </div>
  );
}
