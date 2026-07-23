"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

type Articulo = {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  pilar: string;
  tipo: string;
  created_at: string;
};

const PILARES: Record<string, string> = {
  salud_activa: "Salud activa",
  bienestar_energia: "Bienestar y energía",
  vida_social: "Vida social",
  tecnologia_simple: "Tecnología simple",
  finanzas_prevision: "Finanzas y previsión",
};

const PILAR_COLOR: Record<string, string> = {
  salud_activa: "#1B5E3B",
  bienestar_energia: "#2D8A5F",
  vida_social: "#C9973A",
  tecnologia_simple: "#52B788",
  finanzas_prevision: "#8B6220",
};

export default function ArticulosPage() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase
        .from("articulos")
        .select("id, slug, titulo, resumen, pilar, tipo, created_at")
        .eq("publicado", true)
        .order("created_at", { ascending: false });
      if (data) setArticulos(data);
      setLoading(false);
    }
    cargar();
  }, []);

  const filtrados = filtro === "todos"
    ? articulos
    : articulos.filter((a) => a.pilar === filtro);

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
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

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 96px" }}>
        <p style={{ fontSize: 13, color: "var(--gris)", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Lecturas para tu prime</p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
          Artículos
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", marginBottom: 40, lineHeight: 1.7 }}>
          Contenido pensado para vivir con más vitalidad, plenitud y protagonismo.
        </p>

        {/* Filtros por pilar */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          <FiltroBtn activo={filtro === "todos"} onClick={() => setFiltro("todos")}>Todos</FiltroBtn>
          {Object.entries(PILARES).map(([key, label]) => (
            <FiltroBtn key={key} activo={filtro === key} onClick={() => setFiltro(key)}>{label}</FiltroBtn>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "var(--gris)", fontSize: 16 }}>
            Cargando artículos...
          </div>
        ) : filtrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "var(--gris)", fontSize: 16 }}>
            No hay artículos en esta categoría aún.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {filtrados.map((a) => (
              <Link key={a.id} href={`/articulos/${a.slug}`} style={{ textDecoration: "none" }}>
                <article style={{
                  background: "white", borderRadius: 20, padding: "28px 26px",
                  border: "1.5px solid #E8EDE9",
                  boxShadow: "0 2px 8px rgba(27,94,59,.05)",
                  transition: "transform .2s, box-shadow .2s",
                  cursor: "pointer", height: "100%", boxSizing: "border-box",
                  display: "flex", flexDirection: "column", gap: 12,
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(27,94,59,.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(27,94,59,.05)";
                  }}
                >
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
                      background: PILAR_COLOR[a.pilar] + "18",
                      color: PILAR_COLOR[a.pilar],
                      border: `1px solid ${PILAR_COLOR[a.pilar]}30`,
                      borderRadius: 20, padding: "3px 10px",
                    }}>
                      {PILARES[a.pilar] ?? a.pilar}
                    </span>
                    {a.tipo === "curado" && (
                      <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
                        background: "var(--d4)", color: "var(--d1)", border: "1px solid var(--d3)",
                        borderRadius: 20, padding: "3px 10px",
                      }}>
                        Selección de la semana
                      </span>
                    )}
                  </div>
                  <h2 style={{
                    fontFamily: "Cormorant Garamond, serif", fontSize: 21, fontWeight: 600,
                    color: "var(--n2)", lineHeight: 1.25, margin: 0,
                  }}>
                    {a.titulo}
                  </h2>
                  <p style={{ fontSize: 15, color: "var(--gris)", lineHeight: 1.65, margin: 0, flex: 1 }}>
                    {a.resumen}
                  </p>
                  <span style={{ fontSize: 14, color: "var(--v3)", fontWeight: 600 }}>Leer →</span>
                </article>
              </Link>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--v5)" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al panel
          </Link>
        </div>
      </main>
    </div>
  );
}

function FiltroBtn({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px", borderRadius: 50, fontSize: 14, fontWeight: 600,
        cursor: "pointer", border: "1.5px solid",
        background: activo ? "var(--v2)" : "white",
        color: activo ? "white" : "var(--v2)",
        borderColor: activo ? "var(--v2)" : "var(--v5)",
        transition: "all .18s",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {children}
    </button>
  );
}
