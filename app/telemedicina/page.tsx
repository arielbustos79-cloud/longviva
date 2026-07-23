"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import OliveBranch from "@/components/OliveBranch";
import { getProveedoresTelemed, PREVISION_LABELS, type Prevision } from "@/lib/prevision";

export default function TelemedicinaPage() {
  const [prevision, setPrevision] = useState<Prevision>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase.from("profiles").select("prevision").eq("id", user.id).single();
      setPrevision((data?.prevision as Prevision) ?? null);
      setLoading(false);
    }
    cargar();
  }, []);

  const proveedores = getProveedoresTelemed(prevision);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--crema)" }}>
      <p style={{ color: "var(--gris)", fontSize: 18 }}>Cargando...</p>
    </div>
  );

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
        <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Gestión de salud</p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--n2)", margin: "0 0 12px" }}>
          Telemedicina
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, marginBottom: 40 }}>
          Consultas médicas online sin salir de casa. LongVivIA te orienta hacia los proveedores que mejor calzan con tu previsión — siempre verifica con ellos qué cubre tu plan antes de agendar.
        </p>

        {/* Sin previsión registrada */}
        {!prevision && (
          <div style={{ background: "white", borderRadius: 20, padding: "32px 28px", border: "1.5px solid var(--v5)", marginBottom: 32, textAlign: "center" }}>
            <p style={{ fontSize: 18, color: "var(--n2)", marginBottom: 16 }}>
              Para orientarte mejor, registra tu previsión de salud en tu panel.
            </p>
            <Link href="/dashboard" style={{ display: "inline-block", background: "var(--v2)", color: "white", borderRadius: 50, padding: "12px 28px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Ir a Mi panel →
            </Link>
            <p style={{ fontSize: 13, color: "var(--gris)", marginTop: 20, marginBottom: 0 }}>
              Mientras tanto, estas opciones funcionan con distintas previsiones:
            </p>
          </div>
        )}

        {/* Previsión registrada */}
        {prevision && (
          <div style={{ background: "var(--v6)", borderRadius: 14, padding: "14px 20px", border: "1px solid var(--v5)", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 15, color: "var(--n2)" }}>
              Mostrando opciones para <strong>{PREVISION_LABELS[prevision]}</strong>
            </span>
            <Link href="/dashboard" style={{ fontSize: 13, color: "var(--v2)", textDecoration: "underline" }}>
              Cambiar en Mi panel
            </Link>
          </div>
        )}

        {/* Proveedores */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {(proveedores.length > 0 ? proveedores : [
            { nombre: "Mediglobal", url: "https://www.mediglobal.cl", nota: "Consulta con tu previsión qué prestaciones están cubiertas antes de reservar." },
            { nombre: "RedSalud Telemedicina", url: "https://www.redsalud.cl", nota: "Verifica disponibilidad según tu plan de salud." },
          ]).map(p => (
            <div key={p.nombre} style={{ background: "white", borderRadius: 20, padding: "24px 28px", border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)" }}>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 700, color: "var(--n2)", margin: "0 0 8px" }}>
                {p.nombre}
              </h2>
              <p style={{ fontSize: 14, color: "var(--gris)", margin: "0 0 16px", lineHeight: 1.6 }}>
                ⚠️ {p.nota}
              </p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", background: "var(--v2)", color: "white", borderRadius: 50, padding: "10px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}
              >
                Ir al sitio →
              </a>
            </div>
          ))}
        </div>

        <div style={{ background: "#FEF9EC", borderRadius: 16, padding: "20px 24px", border: "1px solid #F5D48A" }}>
          <p style={{ fontSize: 14, color: "#92600A", margin: 0, lineHeight: 1.7 }}>
            <strong>Importante:</strong> LongVivIA no opera ni gestiona estas consultas directamente — te orientamos hacia proveedores de confianza. El costo real depende de tu convenio con tu previsión. Ante una urgencia médica, llama al <strong>131 (SAMU)</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
