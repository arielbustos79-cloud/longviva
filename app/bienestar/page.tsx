"use client";

import { useState } from "react";
import Link from "next/link";
import {
  VIDEOS_BIENESTAR,
  DISCIPLINA_LABELS,
  DISCIPLINA_COLORS,
  type Disciplina,
  type VideoBienestar,
} from "@/lib/videos-bienestar";
import OliveBranch from "@/components/OliveBranch";

const FILTROS: { value: "todos" | Disciplina; label: string }[] = [
  { value: "todos",       label: "Todos" },
  { value: "yoga_silla",  label: "Yoga en silla" },
  { value: "tai_chi",     label: "Tai Chi" },
  { value: "musculatura", label: "Musculatura" },
];

const RUTINAS_ARTICULOS = [
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

function VideoCard({ video, onClick }: { video: VideoBienestar; onClick: () => void }) {
  const color = DISCIPLINA_COLORS[video.disciplina];
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
      {/* Thumbnail */}
      <div style={{
        width: "100%", aspectRatio: "16/9", borderRadius: 12,
        background: "#1a1a2e", marginBottom: 16, position: "relative", overflow: "hidden",
      }}>
        <img
          src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
          alt={video.titulo}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
        />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
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

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
          color, background: color + "18", borderRadius: 20, padding: "3px 10px",
        }}>
          {DISCIPLINA_LABELS[video.disciplina]}
        </span>
        {video.duracion_min && (
          <span style={{ fontSize: 12, color: "var(--gris)" }}>{video.duracion_min} min</span>
        )}
        <span style={{ fontSize: 12, color: "var(--gris)", textTransform: "capitalize" }}>
          · {video.nivel}
        </span>
      </div>

      <h3 style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: 20, fontWeight: 700, color: "var(--n2)",
        margin: "0 0 8px", lineHeight: 1.2,
      }}>
        {video.titulo}
      </h3>
      <p style={{ fontSize: 14, color: "var(--gris)", margin: 0, lineHeight: 1.6 }}>
        {video.descripcion}
      </p>
      <span style={{ fontSize: 13, color, fontWeight: 700, display: "block", marginTop: 12 }}>
        ▶ Ver video
      </span>
    </button>
  );
}

function VideoPlayer({ video, onClose }: { video: VideoBienestar; onClose: () => void }) {
  const color = DISCIPLINA_COLORS[video.disciplina];
  return (
    <div style={{
      background: "white", borderRadius: 20, padding: "28px 28px",
      border: "1.5px solid var(--v5)", boxShadow: "0 4px 20px rgba(27,94,59,.12)",
      marginBottom: 24,
    }}>
      {/* Iframe */}
      <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
        <iframe
          src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
          title={video.titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>

      {/* Título y acciones */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
              color, background: color + "18", borderRadius: 20, padding: "3px 10px",
            }}>
              {DISCIPLINA_LABELS[video.disciplina]}
            </span>
            {video.duracion_min && (
              <span style={{ fontSize: 12, color: "var(--gris)" }}>{video.duracion_min} min</span>
            )}
          </div>
          <h2 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: 0,
          }}>
            {video.titulo}
          </h2>
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

      {/* Disclaimer */}
      <div style={{
        background: "var(--v6)", borderRadius: 12, padding: "12px 16px",
        borderLeft: "3px solid var(--v3)",
      }}>
        <p style={{ fontSize: 13, color: "var(--gris)", margin: 0, lineHeight: 1.6 }}>
          ⚠️ Este contenido tiene fines informativos. Consulta con tu médico antes de iniciar una rutina de ejercicio nueva, especialmente si tienes alguna condición cardíaca, de equilibrio o movilidad limitada.
        </p>
      </div>
    </div>
  );
}

export default function BienestarPage() {
  const [filtro, setFiltro] = useState<"todos" | Disciplina>("todos");
  const [videoActivo, setVideoActivo] = useState<VideoBienestar | null>(null);

  const videosFiltrados = filtro === "todos"
    ? VIDEOS_BIENESTAR
    : VIDEOS_BIENESTAR.filter(v => v.disciplina === filtro);

  function abrirVideo(video: VideoBienestar) {
    setVideoActivo(video);
    setTimeout(() => {
      document.getElementById("player-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

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

        {/* Título */}
        <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
          Bienestar activo
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--n2)", margin: "0 0 12px" }}>
          Muévete a tu ritmo
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, marginBottom: 40 }}>
          Videos curados de Yoga en silla, Tai Chi y musculatura suave — seleccionados para que el movimiento sea parte natural de tu día, sin gimnasio ni complicaciones.
        </p>

        {/* Player */}
        <div id="player-anchor" />
        {videoActivo && (
          <VideoPlayer video={videoActivo} onClose={() => setVideoActivo(null)} />
        )}

        {/* Filtros */}
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

        {/* Grid de videos */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
          {videosFiltrados.map(v => (
            <VideoCard key={v.id} video={v} onClick={() => abrirVideo(v)} />
          ))}
        </div>

        {/* Artículos de bienestar */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>
          Artículos y rutinas
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {RUTINAS_ARTICULOS.map(r => (
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

        <div style={{ textAlign: "center", paddingTop: 32, borderTop: "1px solid var(--v5)" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al panel
          </Link>
        </div>
      </main>
    </div>
  );
}
