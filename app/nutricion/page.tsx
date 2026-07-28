"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import OliveBranch from "@/components/OliveBranch";
import { getProveedoresNutricion, PREVISION_LABELS, type Prevision } from "@/lib/prevision";
import {
  VIDEOS_NUTRICION,
  CATEGORIA_LABELS,
  CATEGORIA_COLORS,
  type CategoriaNU,
  type VideoNutricion,
} from "@/lib/videos-nutricion";
import { URLS_VERIFICADAS } from "@/lib/external-urls";

// ── Filtros de categoría ──────────────────────────────────────────────────
const FILTROS: { value: "todos" | CategoriaNU; label: string }[] = [
  { value: "todos",        label: "Todos" },
  { value: "alimentacion", label: "Alimentación prime" },
  { value: "hidratacion",  label: "Hidratación" },
  { value: "sarcopenia",   label: "Prevención de sarcopenia" },
];

// ── Fuentes de contenido escrito curadas ─────────────────────────────────
const FUENTES_ESCRITAS = [
  {
    titulo: "Nutrición en el prime — señales a tener en cuenta",
    fuente: "Mayo Clinic",
    descripcion: "Desnutrición en personas activas: señales de alerta y qué hacer. Fuente médica institucional.",
    url: URLS_VERIFICADAS.nutricion_mayoclinic_tercera_edad,
  },
  {
    titulo: "Vitamina D, fibra e hidratación — qué cambia con los años",
    fuente: "Mayo Clinic",
    descripcion: "Actualizado junio 2026. Cubre los ajustes nutricionales más relevantes en la etapa activa.",
    url: URLS_VERIFICADAS.nutricion_mayoclinic_envejecimiento,
  },
  {
    titulo: "Nutrición para personas mayores",
    fuente: "MedlinePlus — Biblioteca Nacional de Medicina de EEUU",
    descripcion: "Recurso gubernamental sin fines comerciales. Guía completa y actualizada de nutrición en la etapa activa.",
    url: URLS_VERIFICADAS.nutricion_medlineplus,
  },
];

// ── VideoCard ─────────────────────────────────────────────────────────────
function VideoCard({ video, onClick }: { video: VideoNutricion; onClick: () => void }) {
  const color = CATEGORIA_COLORS[video.categoria];
  return (
    <button
      onClick={onClick}
      style={{
        background: "white", borderRadius: 20, padding: "22px 24px",
        border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)",
        textAlign: "left", cursor: "pointer", width: "100%",
        transition: "transform .15s, box-shadow .15s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(27,94,59,.14)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(27,94,59,.06)";
      }}
    >
      <div style={{
        width: "100%", aspectRatio: "16/9", borderRadius: 12,
        background: "#1a1a2e", marginBottom: 16, position: "relative", overflow: "hidden",
      }}>
        <img
          src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
          alt={video.titulo}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "rgba(255,255,255,.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,.3)",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
          color, background: color + "18", borderRadius: 20, padding: "3px 10px",
        }}>
          {CATEGORIA_LABELS[video.categoria]}
        </span>
        {video.duracion_min && (
          <span style={{ fontSize: 12, color: "var(--gris)" }}>{video.duracion_min} min</span>
        )}
      </div>

      <h3 style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 20, fontWeight: 700, color: "var(--n2)",
        margin: "0 0 6px", lineHeight: 1.2,
      }}>
        {video.titulo}
      </h3>
      {video.especialista && (
        <p style={{ fontSize: 12, color: "var(--v3)", fontWeight: 600, margin: "0 0 6px" }}>
          {video.especialista}
        </p>
      )}
      <p style={{ fontSize: 14, color: "var(--gris)", margin: 0, lineHeight: 1.6 }}>
        {video.descripcion}
      </p>
      <span style={{ fontSize: 13, color, fontWeight: 700, display: "block", marginTop: 12 }}>
        ▶ Ver video
      </span>
    </button>
  );
}

// ── VideoPlayer ───────────────────────────────────────────────────────────
function VideoPlayer({ video, onClose }: { video: VideoNutricion; onClose: () => void }) {
  const color = CATEGORIA_COLORS[video.categoria];
  return (
    <div style={{
      background: "white", borderRadius: 20, padding: "28px 28px",
      border: "1.5px solid var(--v5)", boxShadow: "0 4px 20px rgba(27,94,59,.12)",
      marginBottom: 24,
    }}>
      <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
        <iframe
          src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
          title={video.titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
              color, background: color + "18", borderRadius: 20, padding: "3px 10px",
            }}>
              {CATEGORIA_LABELS[video.categoria]}
            </span>
          </div>
          <h2 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: "0 0 4px",
          }}>
            {video.titulo}
          </h2>
          {video.especialista && (
            <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 600, margin: 0 }}>
              {video.especialista}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <a
            href={video.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13, fontWeight: 700, color: "var(--gris)",
              border: "1.5px solid #D4DED6", borderRadius: 50,
              padding: "8px 16px", textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            Ver en YouTube ↗
          </a>
          <button
            onClick={onClose}
            style={{
              fontSize: 13, fontWeight: 700, color: "var(--gris)",
              border: "1.5px solid #D4DED6", borderRadius: 50,
              padding: "8px 16px", background: "transparent", cursor: "pointer",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>

      <p style={{ fontSize: 15, color: "var(--gris)", lineHeight: 1.6, margin: "0 0 16px" }}>
        {video.descripcion}
      </p>

      <div style={{
        background: "var(--v6)", borderRadius: 12, padding: "12px 16px",
        borderLeft: "3px solid var(--v3)",
      }}>
        <p style={{ fontSize: 13, color: "var(--gris)", margin: 0, lineHeight: 1.6 }}>
          Este contenido tiene fines informativos. Consulta con tu médico o nutricionista antes de hacer cambios significativos en tu alimentación.
        </p>
      </div>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────
export default function NutricionPage() {
  const [prevision, setPrevision] = useState<Prevision>(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"todos" | CategoriaNU>("todos");
  const [videoActivo, setVideoActivo] = useState<VideoNutricion | null>(null);
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

  const proveedores = getProveedoresNutricion(prevision);
  const videosFiltrados = filtro === "todos"
    ? VIDEOS_NUTRICION
    : VIDEOS_NUTRICION.filter(v => v.categoria === filtro);

  function abrirVideo(video: VideoNutricion) {
    setVideoActivo(video);
    setTimeout(() => {
      document.getElementById("player-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

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

        <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
          Bienestar
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--n2)", margin: "0 0 12px" }}>
          Nutrición
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, marginBottom: 40 }}>
          Alimentación y nutrición pensadas para tu etapa activa — videos con especialistas identificados y fuentes médicas verificadas.
        </p>

        {/* ── Router de nutricionistas ──────────────────────────────────── */}
        {!prevision && (
          <div style={{ background: "white", borderRadius: 20, padding: "28px 24px", border: "1.5px solid var(--v5)", marginBottom: 32, textAlign: "center" }}>
            <p style={{ fontSize: 16, color: "var(--n2)", marginBottom: 16 }}>
              Registra tu previsión para ver las opciones de nutricionistas que mejor calzan contigo.
            </p>
            <Link href="/dashboard" style={{ display: "inline-block", background: "var(--v2)", color: "white", borderRadius: 50, padding: "12px 28px", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
              Ir a Mi panel →
            </Link>
          </div>
        )}

        {prevision && proveedores.length > 0 && (
          <>
            <div style={{ background: "var(--v6)", borderRadius: 14, padding: "14px 20px", border: "1px solid var(--v5)", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 15, color: "var(--n2)" }}>
                Nutricionistas para <strong>{PREVISION_LABELS[prevision]}</strong>
              </span>
              <Link href="/dashboard" style={{ fontSize: 13, color: "var(--v2)", textDecoration: "underline" }}>
                Cambiar en Mi panel
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
              {proveedores.map(p => (
                <div key={p.nombre} style={{ background: "white", borderRadius: 20, padding: "22px 28px", border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)" }}>
                  <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: "0 0 8px" }}>
                    {p.nombre}
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--gris)", margin: "0 0 16px", lineHeight: 1.6 }}>
                    {p.nota}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-block", background: "var(--v2)", color: "white", borderRadius: 50, padding: "10px 24px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}
                  >
                    Ver disponibilidad →
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Videos curados ───────────────────────────────────────────── */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>
          Videos con especialistas
        </p>

        <div id="player-anchor" />
        {videoActivo && (
          <VideoPlayer video={videoActivo} onClose={() => setVideoActivo(null)} />
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {FILTROS.map(f => (
            <button
              key={f.value}
              onClick={() => { setFiltro(f.value); setVideoActivo(null); }}
              style={{
                padding: "8px 18px", borderRadius: 50, fontSize: 14, fontWeight: 600,
                cursor: "pointer", border: "1.5px solid",
                background: filtro === f.value ? "var(--v2)" : "white",
                color: filtro === f.value ? "white" : "var(--n2)",
                borderColor: filtro === f.value ? "var(--v2)" : "var(--v5)",
                transition: "all .15s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
          {videosFiltrados.map(v => (
            <VideoCard key={v.id} video={v} onClick={() => abrirVideo(v)} />
          ))}
        </div>

        {/* ── Fuentes escritas verificadas ─────────────────────────────── */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>
          Lectura curada — fuentes verificadas
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {FUENTES_ESCRITAS.map(f => (
            <a
              key={f.url}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)", textDecoration: "none", display: "block" }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--v3)", letterSpacing: 0.8, textTransform: "uppercase", margin: "0 0 4px" }}>
                {f.fuente}
              </p>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 700, color: "var(--n2)", margin: "0 0 6px", lineHeight: 1.2 }}>
                {f.titulo}
              </h3>
              <p style={{ fontSize: 14, color: "var(--gris)", margin: 0, lineHeight: 1.6 }}>{f.descripcion}</p>
              <span style={{ fontSize: 13, color: "var(--v2)", fontWeight: 700, display: "block", marginTop: 12 }}>Leer →</span>
            </a>
          ))}
        </div>

        {/* ── Disclaimer ───────────────────────────────────────────────── */}
        <div style={{ background: "#FEF9EC", borderRadius: 16, padding: "20px 24px", border: "1px solid #F5D48A", marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: "#92600A", margin: 0, lineHeight: 1.7 }}>
            <strong>Importante:</strong> El contenido de esta sección tiene fines informativos. Para una evaluación personalizada, consulta con tu nutricionista o médico tratante. El costo real de la consulta depende de tu convenio con tu previsión.
          </p>
        </div>

        <div style={{ textAlign: "center", paddingTop: 32, borderTop: "1px solid var(--v5)" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al panel
          </Link>
        </div>
      </main>
    </div>
  );
}
