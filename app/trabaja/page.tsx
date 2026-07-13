"use client";

import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

export default function TrabajaPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif", display: "flex", flexDirection: "column" }}>

      <header style={{ background: "var(--v2)", padding: "16px 40px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>🌿</div>
          <h1 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700, color: "var(--n2)", marginBottom: 16,
          }}>
            Trabaja con nosotros
          </h1>
          <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, marginBottom: 32 }}>
            Estamos construyendo algo nuevo para las personas en su prime en Chile. Si te apasiona el bienestar, la tecnología y el impacto real, nos encantaría conocerte.
          </p>
          <p style={{ fontSize: 15, color: "var(--gris)", marginBottom: 32 }}>
            Cuéntanos quién eres y cómo quieres sumarte —{" "}
            <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v2)", textDecoration: "underline" }}>
              hola@longvivia.cl
            </a>
          </p>
          <Link href="/" style={{
            display: "inline-block",
            background: "var(--v2)", color: "white",
            padding: "14px 32px", borderRadius: 50,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
          }}>
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
