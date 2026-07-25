"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import OliveBranch from "@/components/OliveBranch";
import { COMUNAS_FARMACIAS, getFarmaciaData } from "@/lib/farmacias";

export default function FarmaciasPage() {
  const [comunaSeleccionada, setComunaSeleccionada] = useState("");
  const [ciudadPerfil, setCiudadPerfil] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase
        .from("profiles")
        .select("ciudad")
        .eq("id", user.id)
        .single();
      if (data?.ciudad) {
        setCiudadPerfil(data.ciudad);
        const match = COMUNAS_FARMACIAS.find(
          c => c.toLowerCase() === data.ciudad.toLowerCase()
        );
        if (match) setComunaSeleccionada(match);
      }
    }
    cargar();
  }, []);

  const farmacia = comunaSeleccionada ? getFarmaciaData(comunaSeleccionada) : null;

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

        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--v2)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
          Salud
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 48px)", color: "var(--n2)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 16px" }}>
          Farmacias comunitarias
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, margin: "0 0 40px" }}>
          Las farmacias populares o comunitarias son administradas por cada municipio y ofrecen medicamentos a precios significativamente menores que las cadenas. Selecciona tu comuna para ver la información de la tuya.
        </p>

        {/* Selector de comuna */}
        <div style={{
          background: "white", borderRadius: 20, padding: "28px",
          border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)", marginBottom: 28,
        }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--n2)", marginBottom: 12 }}>
            ¿En qué comuna vives?
            {ciudadPerfil && !comunaSeleccionada && (
              <span style={{ fontWeight: 400, color: "var(--gris)", marginLeft: 8 }}>
                (tu perfil indica: {ciudadPerfil})
              </span>
            )}
          </label>
          <select
            value={comunaSeleccionada}
            onChange={e => setComunaSeleccionada(e.target.value)}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 12,
              border: "1.5px solid var(--v5)", fontSize: 16,
              fontFamily: "DM Sans, sans-serif", background: "var(--v6)",
              color: comunaSeleccionada ? "var(--n2)" : "var(--gris)",
              boxSizing: "border-box", cursor: "pointer",
            }}
          >
            <option value="">— Selecciona tu comuna —</option>
            {COMUNAS_FARMACIAS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option disabled>──────────────</option>
            <option value="otra">Mi comuna no está en la lista</option>
          </select>
        </div>

        {/* Resultado: comuna en lista */}
        {farmacia && (
          <div style={{
            background: "white", borderRadius: 20, padding: "28px",
            border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)", marginBottom: 28,
          }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--v2)", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
              {comunaSeleccionada}
            </p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 700, color: "var(--n2)", margin: "0 0 20px" }}>
              {farmacia.nombre}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {farmacia.direccion && (
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 14, color: "var(--gris)", minWidth: 20 }}>📍</span>
                  <span style={{ fontSize: 14, color: "var(--gris)" }}>{farmacia.direccion}</span>
                </div>
              )}
              {farmacia.horario && (
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 14, color: "var(--gris)", minWidth: 20 }}>🕐</span>
                  <span style={{ fontSize: 14, color: "var(--gris)" }}>{farmacia.horario}</span>
                </div>
              )}
              {farmacia.requisitos && (
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 14, color: "var(--gris)", minWidth: 20 }}>📋</span>
                  <span style={{ fontSize: 14, color: "var(--gris)" }}>{farmacia.requisitos}</span>
                </div>
              )}
            </div>

            {farmacia.nota && (
              <div style={{ background: "var(--v6)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, borderLeft: "3px solid var(--v3)" }}>
                <p style={{ fontSize: 14, color: "var(--n2)", margin: 0, lineHeight: 1.6 }}>
                  💡 {farmacia.nota}
                </p>
              </div>
            )}

            {farmacia.link && (
              <a href={farmacia.link} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block", background: "var(--v2)", color: "white",
                padding: "12px 24px", borderRadius: 50, fontSize: 14, fontWeight: 700, textDecoration: "none",
              }}>
                Ver sitio municipal →
              </a>
            )}
          </div>
        )}

        {/* Resultado: comuna no en lista */}
        {comunaSeleccionada === "otra" && (
          <div style={{
            background: "white", borderRadius: 20, padding: "28px",
            border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)", marginBottom: 28,
          }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", marginBottom: 12 }}>
              Tu municipio también puede tener farmacia popular
            </h2>
            <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.7, marginBottom: 20 }}>
              Muchas comunas tienen farmacia comunitaria pero la información no siempre está centralizada. Búscala directamente:
            </p>
            <a
              href="https://www.google.com/search?q=farmacia+popular+comunitaria+mi+comuna+Chile"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-block", background: "var(--v2)", color: "white",
                padding: "12px 24px", borderRadius: 50, fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 12,
              }}
            >
              Buscar farmacia comunitaria →
            </a>
            <p style={{ fontSize: 13, color: "var(--gris)", margin: "12px 0 0" }}>
              Tip: busca &quot;farmacia popular + [nombre de tu comuna]&quot; o consulta directamente en la municipalidad.
            </p>
          </div>
        )}

        {/* Nota general */}
        <div style={{ background: "#FEF9EC", borderRadius: 16, padding: "20px 24px", border: "1px solid #F5D48A", marginBottom: 28 }}>
          <p style={{ fontSize: 14, color: "#92600A", margin: 0, lineHeight: 1.7 }}>
            <strong>¿Qué necesitas llevar?</strong> En la mayoría de las farmacias comunitarias se requiere cédula de identidad y receta médica vigente. Algunos municipios piden además certificado de domicilio. Consulta siempre con tu municipio antes de ir.
          </p>
        </div>

        <div style={{ background: "var(--v6)", borderRadius: 16, padding: "20px 24px", border: "1px solid var(--v5)" }}>
          <p style={{ fontSize: 14, color: "var(--gris)", margin: 0, lineHeight: 1.7 }}>
            💡 ¿Tienes dudas sobre tu medicación o quieres saber más opciones? Cuéntale a{" "}
            <Link href="/vivian" style={{ color: "var(--v2)", fontWeight: 700 }}>VIVIAN</Link> — ella te orienta.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--v5)" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al panel
          </Link>
        </div>

      </main>
    </div>
  );
}
