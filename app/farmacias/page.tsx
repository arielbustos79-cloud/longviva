"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import { logEvento } from "@/lib/logEvento";

// ── Catálogo de farmacias ─────────────────────────────────────────────────
// Capa 1: link profundo con búsqueda pre-cargada (patrón verificado 27-07-2026)
// Capa 2: fallback clipboard — Salcobrand no expone búsqueda por URL pública
type Farmacia = {
  id: string;
  nombre: string;
  tipo: "cadena" | "independiente";
  capa: 1 | 2;
  base: string;
  deepUrl: (q: string) => string;
  nota?: string;
};

const FARMACIAS: Farmacia[] = [
  // Cadenas grandes
  {
    id: "cruzverde",
    nombre: "Cruz Verde",
    tipo: "cadena",
    capa: 1,
    base: "https://www.cruzverde.cl",
    deepUrl: q => `https://www.cruzverde.cl/buscar?texto=${encodeURIComponent(q)}`,
  },
  {
    id: "salcobrand",
    nombre: "Salcobrand",
    tipo: "cadena",
    capa: 2,
    base: "https://salcobrand.cl",
    deepUrl: () => "https://salcobrand.cl",
    nota: "Te llevamos a Salcobrand — pega el nombre del medicamento en su buscador",
  },
  {
    id: "ahumada",
    nombre: "Farmacias Ahumada",
    tipo: "cadena",
    capa: 1,
    base: "https://www.farmaciasahumada.cl",
    deepUrl: q => `https://www.farmaciasahumada.cl/search?q=${encodeURIComponent(q)}`,
  },
  {
    id: "drsimi",
    nombre: "Dr. Simi",
    tipo: "cadena",
    capa: 1,
    base: "https://www.drsimi.cl",
    deepUrl: q => `https://www.drsimi.cl/search?q=${encodeURIComponent(q)}`,
  },
  // Independientes / online
  {
    id: "farmex",
    nombre: "Farmex",
    tipo: "independiente",
    capa: 1,
    base: "https://farmex.cl",
    deepUrl: q => `https://farmex.cl/search?q=${encodeURIComponent(q)}`,
    nota: "Despacho a todo Chile",
  },
  {
    id: "fraccion",
    nombre: "Fracción",
    tipo: "independiente",
    capa: 1,
    base: "https://www.fraccion.cl",
    deepUrl: q => `https://www.fraccion.cl/search?q=${encodeURIComponent(q)}`,
    nota: "Online + presencial, despacho nacional",
  },
  {
    id: "meki",
    nombre: "Farmacia Meki",
    tipo: "independiente",
    capa: 1,
    base: "https://farmaciameki.cl",
    deepUrl: q => `https://farmaciameki.cl/buscar?q=${encodeURIComponent(q)}`,
    nota: "Despacho Provincia de Santiago",
  },
  {
    id: "elquimico",
    nombre: "El Químico",
    tipo: "independiente",
    capa: 1,
    base: "https://farmaciaelquimico.cl",
    deepUrl: q => `https://farmaciaelquimico.cl/search?q=${encodeURIComponent(q)}`,
    nota: "La Florida · Convenio CENABAST · Despacho RM 24h",
  },
];

// ── Componente card de farmacia ───────────────────────────────────────────
function FarmaciaCard({ f, busqueda }: { f: Farmacia; busqueda: string }) {
  const [copiado, setCopiado] = useState(false);

  const handleClick = useCallback(() => {
    void logEvento("farmacia_click", {
      farmacia: f.id,
      medicamento: busqueda || null,
      capa: f.capa,
    });

    if (f.capa === 2 && busqueda) {
      navigator.clipboard.writeText(busqueda).then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 3000);
      }).catch(() => {});
    }
  }, [f, busqueda]);

  const href = busqueda ? f.deepUrl(busqueda) : f.base;

  return (
    <div style={{
      background: "white", borderRadius: 16, padding: "20px 24px",
      border: "1.5px solid var(--v5)", display: "flex",
      justifyContent: "space-between", alignItems: "center", gap: 16,
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: "var(--n2)", margin: "0 0 2px" }}>
          {f.nombre}
          {f.tipo === "independiente" && (
            <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 600, color: "var(--v3)",
              background: "var(--v6)", padding: "2px 8px", borderRadius: 20, verticalAlign: "middle" }}>
              Online
            </span>
          )}
        </p>
        {f.nota && (
          <p style={{ fontSize: 13, color: "var(--gris)", margin: 0 }}>{f.nota}</p>
        )}
        {f.capa === 2 && busqueda && (
          <p style={{ fontSize: 13, color: "var(--d2)", margin: "4px 0 0", fontWeight: 600 }}>
            {copiado ? "✓ Nombre copiado — pégalo en el buscador" : "Se copiará el nombre al portapapeles"}
          </p>
        )}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        style={{
          display: "inline-block", background: "var(--v2)", color: "white",
          padding: "10px 20px", borderRadius: 50, fontSize: 14, fontWeight: 700,
          textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
        }}
      >
        Ir →
      </a>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────
export default function FarmaciasPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<"todas" | "cadena" | "independiente">("todas");

  const farmaciasVisibles = FARMACIAS.filter(
    f => filtro === "todas" || f.tipo === filtro
  );

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
          Farmacias
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, margin: "0 0 40px" }}>
          Escribe el nombre del medicamento y elige la farmacia de tu preferencia — te llevamos directo a los resultados.
        </p>

        {/* Buscador de medicamento */}
        <div style={{
          background: "white", borderRadius: 20, padding: "24px 28px",
          border: "1.5px solid var(--v5)", marginBottom: 24,
        }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--n2)", marginBottom: 10 }}>
            ¿Qué medicamento buscas?
          </label>
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Ej: Losartán, Metformina, Atorvastatina..."
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 12,
              border: "1.5px solid var(--v5)", fontSize: 17,
              fontFamily: "DM Sans, sans-serif", boxSizing: "border-box",
            }}
          />
          {busqueda && (
            <p style={{ fontSize: 13, color: "var(--gris)", margin: "10px 0 0" }}>
              Al hacer clic en cualquier farmacia, irás directo a los resultados de <strong>"{busqueda}"</strong> en ese sitio.
            </p>
          )}
        </div>

        {/* Filtros */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {(["todas", "cadena", "independiente"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{
                padding: "8px 18px", borderRadius: 50, fontSize: 14, fontWeight: 600,
                border: "1.5px solid",
                borderColor: filtro === f ? "var(--v2)" : "var(--v5)",
                background: filtro === f ? "var(--v2)" : "white",
                color: filtro === f ? "white" : "var(--gris)",
                cursor: "pointer",
              }}
            >
              {f === "todas" ? "Todas" : f === "cadena" ? "Cadenas" : "Online / independientes"}
            </button>
          ))}
        </div>

        {/* Lista de farmacias */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {farmaciasVisibles.map(f => (
            <FarmaciaCard key={f.id} f={f} busqueda={busqueda} />
          ))}
        </div>

        {/* Nota: sin comparación de precios */}
        <div style={{ background: "var(--v6)", borderRadius: 16, padding: "18px 22px", border: "1px solid var(--v5)", marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: "var(--gris)", margin: 0, lineHeight: 1.7 }}>
            LongVivIA no compara precios ni recomienda una farmacia sobre otra — cada una tiene sus propias ofertas y convenios.
            La elección es siempre tuya.
          </p>
        </div>

        {/* Consulta técnica sobre el medicamento */}
        <div style={{ background: "white", borderRadius: 16, padding: "18px 22px", border: "1.5px solid var(--v5)", marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: "var(--n2)", margin: "0 0 6px", fontWeight: 600 }}>
            ¿Tienes dudas sobre el medicamento?
          </p>
          <p style={{ fontSize: 14, color: "var(--gris)", margin: "0 0 12px", lineHeight: 1.6 }}>
            Pregúntale a VIVIAN — puede explicarte para qué sirve, cómo se toma, y qué tener en cuenta.
            Para dosis específicas o interacciones, siempre consulta a tu médico o farmacéutico.
          </p>
          <Link href="/vivian" style={{
            display: "inline-block", background: "var(--v2)", color: "white",
            padding: "10px 22px", borderRadius: 50, fontSize: 14, fontWeight: 700, textDecoration: "none",
          }}>
            Preguntarle a VIVIAN →
          </Link>
        </div>

        <div style={{ textAlign: "center", paddingTop: 24, borderTop: "1px solid var(--v5)" }}>
          <Link href="/dashboard" style={{ color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al panel
          </Link>
        </div>

      </main>
    </div>
  );
}
