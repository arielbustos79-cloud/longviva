import React from "react";
import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import ArticuloTracker from "./ArticuloTracker";

// Renderiza **texto** como <strong>
function renderNegrita(texto: string): React.ReactNode {
  const partes = texto.split(/(\*\*[^*]+\*\*)/g);
  return partes.map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <strong key={i} style={{ fontWeight: 700, color: "var(--n1)" }}>{p.slice(2, -2)}</strong>
      : p
  );
}

const PILARES: Record<string, string> = {
  salud_activa: "Salud activa",
  bienestar_energia: "Bienestar y energía",
  vida_social: "Vida social",
  tecnologia_simple: "Tecnología simple",
  finanzas_prevision: "Finanzas y previsión",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("articulos")
    .select("titulo, resumen")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();

  if (!data) return { title: "Artículo — LongVivIA" };
  return {
    title: `${data.titulo} — LongVivIA`,
    description: data.resumen,
  };
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: articulo } = await supabase
    .from("articulos")
    .select("*")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();

  if (!articulo) notFound();

  const fechaLegible = new Date(articulo.created_at).toLocaleDateString("es-CL", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <ArticuloTracker slug={articulo.slug} pilar={articulo.pilar} />

      {/* Header */}
      <header style={{ background: "var(--v2)", padding: "16px 40px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
        <Link href="/articulos" style={{ marginLeft: "auto", color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 15 }}>
          ← Artículos
        </Link>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 96px" }}>

        {/* Pilar badge */}
        <div style={{ marginBottom: 20 }}>
          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
            background: "var(--v6)", color: "var(--v2)", border: "1px solid var(--v5)",
            borderRadius: 20, padding: "4px 14px",
          }}>
            {PILARES[articulo.pilar] ?? articulo.pilar}
          </span>
          {articulo.tipo === "curado" && (
            <span style={{
              marginLeft: 8, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
              background: "var(--d4)", color: "var(--d1)", border: "1px solid var(--d3)",
              borderRadius: 20, padding: "4px 14px",
            }}>
              Selección de la semana
            </span>
          )}
        </div>

        <h1 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(28px, 4vw, 46px)",
          fontWeight: 700, color: "var(--n2)", lineHeight: 1.15, marginBottom: 16,
        }}>
          {articulo.titulo}
        </h1>

        <p style={{ fontSize: 18, color: "var(--gris)", lineHeight: 1.7, marginBottom: 32, fontStyle: "italic" }}>
          {articulo.resumen}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid #E0EAE3" }}>
          <span style={{ fontSize: 14, color: "var(--gris)" }}>LongVivIA · {fechaLegible}</span>
          {articulo.fuente_nombre && articulo.fuente_url && (
            <span style={{ fontSize: 14, color: "var(--gris)" }}>
              · Fuente:{" "}
              <a href={articulo.fuente_url} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--v2)", textDecoration: "underline" }}>
                {articulo.fuente_nombre}
              </a>
            </span>
          )}
        </div>

        {/* Contenido */}
        <div style={{
          fontSize: 18, color: "var(--n2)", lineHeight: 1.85,
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {articulo.contenido.split("\n\n").map((bloque: string, i: number) => {
            const b = bloque.trim();
            if (!b) return null;

            // Título de sección
            if (b.startsWith("## ")) {
              return (
                <h2 key={i} style={{
                  fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 600,
                  color: "var(--v2)", marginTop: 8, marginBottom: 0,
                }}>
                  {b.replace(/^## /, "")}
                </h2>
              );
            }

            // Lista de ítems
            if (b.includes("\n- ") || b.startsWith("- ")) {
              const items = b.split("\n").filter(l => l.startsWith("- "));
              return (
                <ul key={i} style={{ paddingLeft: 22, display: "flex", flexDirection: "column", gap: 10, margin: 0 }}>
                  {items.map((item, j) => (
                    <li key={j} style={{ color: "var(--n2)" }}>
                      {renderNegrita(item.replace(/^- /, ""))}
                    </li>
                  ))}
                </ul>
              );
            }

            // Párrafo normal
            return <p key={i} style={{ margin: 0 }}>{renderNegrita(b)}</p>;
          })}
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 56, padding: "20px 24px", borderRadius: 16,
          background: "var(--v6)", border: "1px solid var(--v5)",
        }}>
          <p style={{ fontSize: 14, color: "var(--gris)", margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2)" }}>Nota informativa:</strong> Este artículo tiene carácter educativo y no reemplaza la opinión de un profesional de la salud. Ante cualquier duda sobre tu situación personal, consulta siempre a tu médico o especialista.
          </p>
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 20, flexWrap: "wrap" }}>
          <Link href="/articulos" style={{ color: "var(--v2)", textDecoration: "underline", fontSize: 15 }}>
            ← Ver todos los artículos
          </Link>
          <Link href="/vivian" style={{
            background: "var(--v2)", color: "white", padding: "12px 28px",
            borderRadius: 50, fontSize: 15, fontWeight: 600, textDecoration: "none",
          }}>
            Hablar con VIVIAN →
          </Link>
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
