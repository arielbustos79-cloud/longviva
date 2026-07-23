"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import { createClient } from "@/lib/supabase-browser";
import { logEvento } from "@/lib/logEvento";

const VW = 280;
const VH = 180;

type Bbox    = { x: number; y: number; w: number; h: number };
type DiffDef = { desc: string; bbox: Bbox };
type SceneProps = { right: boolean; active: Set<number>; found: Set<number> };

/* ─── Escena 0: Jardín ───────────────────────────────────────────── */
function Jardin({ right, active }: SceneProps) {
  const d = (i: number) => right && active.has(i);
  return (
    <g>
      <rect x="0" y="0" width="280" height="110" fill={d(6) ? "#5B8EC8" : "#87CEEB"} />
      <circle cx="245" cy="38" r="24" fill={d(0) ? "#FF8C00" : "#FFD700"} />
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a}
          x1={245 + 29 * Math.cos(a * Math.PI / 180)} y1={38 + 29 * Math.sin(a * Math.PI / 180)}
          x2={245 + 38 * Math.cos(a * Math.PI / 180)} y2={38 + 38 * Math.sin(a * Math.PI / 180)}
          stroke={d(0) ? "#FF8C00" : "#FFD700"} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {!d(1) && <>
        <ellipse cx="95" cy="30" rx="36" ry="17" fill="white" />
        <ellipse cx="75" cy="35" rx="22" ry="16" fill="white" />
        <ellipse cx="118" cy="35" rx="22" ry="16" fill="white" />
      </>}
      {!d(5) && (
        <g stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M205,58 q4,-7 8,0" />
          <path d="M216,55 q4,-7 8,0" />
        </g>
      )}
      <rect x="0" y="110" width="280" height="70" fill="#5A9E5A" />
      <rect x="18" y="70" width="68" height="42" fill="#E8A87C" />
      <polygon points="14,70 52,44 90,70" fill={d(2) ? "#7B241C" : "#C0392B"} />
      <rect x="28" y="80" width="14" height="14" fill="#ADE8F4" />
      <rect x="48" y="80" width="14" height="14" fill="#ADE8F4" />
      <rect x="54" y="90" width="20" height="22" fill="#8B6914" />
      <rect x="152" y={d(3) ? 55 : 70} width="12" height={d(3) ? 58 : 43} fill="#8B6914" />
      <circle cx="158" cy={d(3) ? 50 : 65} r="26" fill="#2D8A2D" />
      <circle cx="122" cy="136" r="9" fill={d(4) ? "#9B59B6" : "#E74C3C"} />
      <rect x="121" y="142" width="3" height="14" fill="#27AE60" />
      <circle cx="138" cy="138" r="7" fill="#FFD700" />
      <rect x="137" y="143" width="3" height="12" fill="#27AE60" />
      <rect x="185" y="108" width={d(6) ? 57 : 85} height="5" fill={d(6) ? "#BDC3C7" : "#FFFFFF"} />
      <rect x="185" y="118" width={d(6) ? 57 : 85} height="5" fill={d(6) ? "#BDC3C7" : "#FFFFFF"} />
      {[185, 203, 221, 239].filter((_, i) => !(d(6) && i === 3)).map(x => (
        <rect key={x} x={x} y="105" width="7" height="25" fill={d(6) ? "#BDC3C7" : "#FFFFFF"} />
      ))}
    </g>
  );
}
const jardinDiffs: DiffDef[] = [
  { desc: "Color del sol",    bbox: { x: 215, y: 8,   w: 65, h: 62 } },
  { desc: "Nube ausente",     bbox: { x: 52,  y: 10,  w: 90, h: 46 } },
  { desc: "Color del techo",  bbox: { x: 14,  y: 40,  w: 78, h: 32 } },
  { desc: "Altura del árbol", bbox: { x: 128, y: 35,  w: 62, h: 80 } },
  { desc: "Color de la flor", bbox: { x: 108, y: 122, w: 40, h: 30 } },
  { desc: "Pájaros ausentes", bbox: { x: 198, y: 46,  w: 35, h: 25 } },
  { desc: "Cielo y valla",    bbox: { x: 180, y: 100, w: 100, h: 40 } },
];

/* ─── Escena 1: Playa ────────────────────────────────────────────── */
function Playa({ right, active }: SceneProps) {
  const d = (i: number) => right && active.has(i);
  const starPoints = (cx: number, cy: number, r: number) =>
    [0, 72, 144, 216, 288].map(a => [
      cx + r * Math.cos((a - 90) * Math.PI / 180),
      cy + r * Math.sin((a - 90) * Math.PI / 180),
    ]);
  return (
    <g>
      <rect x="0" y="0" width="280" height="100" fill="#87CEEB" />
      <rect x="0" y="100" width="280" height="58" fill="#1A6B8A" />
      <rect x="0" y="158" width="280" height="22" fill="#F4D03F" />
      <circle cx="42" cy="36" r={d(0) ? 30 : 22} fill="#FFD700" />
      {!d(1) && <>
        <ellipse cx="140" cy="32" rx="38" ry="17" fill="white" />
        <ellipse cx="116" cy="37" rx="24" ry="16" fill="white" />
        <ellipse cx="162" cy="38" rx="24" ry="16" fill="white" />
      </>}
      <polygon points="68,108 78,92 148,92 158,108" fill={d(2) ? "#3B82F6" : "#E74C3C"} />
      <rect x="108" y="68" width="4" height="26" fill="#8B6914" />
      <polygon points="112,68 140,78 112,88" fill="white" />
      <path d="M228,165 Q232,120 236,65" stroke="#8B6914" strokeWidth="7" fill="none" />
      <ellipse cx="218" cy="58" rx="20" ry="8" transform="rotate(-30,218,58)" fill={d(3) ? "#1A5C30" : "#27AE60"} />
      <ellipse cx="248" cy="52" rx="22" ry="8" transform="rotate(20,248,52)" fill={d(3) ? "#1A5C30" : "#27AE60"} />
      <ellipse cx="236" cy="44" rx="18" ry="7" transform="rotate(-10,236,44)" fill={d(3) ? "#1A5C30" : "#27AE60"} />
      {starPoints(168, 170, 11).map(([x, y], i) => (
        <line key={i} x1="168" y1="170" x2={x} y2={y}
          stroke={d(4) ? "#FF69B4" : "#FF8C00"} strokeWidth="4" strokeLinecap="round" />
      ))}
      <circle cx="168" cy="170" r="5" fill={d(4) ? "#FF69B4" : "#FF8C00"} />
      <rect x="52" y="128" width="4" height="34" fill="#8B6914" />
      <path d="M32,128 Q54,108 76,128" fill={d(5) ? "#27AE60" : "#E74C3C"} />
      <line x1="32" y1="128" x2="76" y2="128" stroke={d(5) ? "#1A5C30" : "#7B241C"} strokeWidth="2" />
      {!d(6) && <>
        <ellipse cx="205" cy="168" rx="12" ry="7" fill="#E74C3C" />
        <path d="M193,165 Q185,158 182,162" stroke="#E74C3C" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M217,165 Q225,158 228,162" stroke="#E74C3C" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>}
    </g>
  );
}
const playaDiffs: DiffDef[] = [
  { desc: "Tamaño del sol",        bbox: { x: 6,   y: 4,   w: 72, h: 68 } },
  { desc: "Nube ausente",          bbox: { x: 88,  y: 12,  w: 100, h: 46 } },
  { desc: "Color del bote",        bbox: { x: 62,  y: 85,  w: 102, h: 30 } },
  { desc: "Color de la palmera",   bbox: { x: 204, y: 28,  w: 60,  h: 55 } },
  { desc: "Color de la estrella",  bbox: { x: 150, y: 156, w: 40,  h: 28 } },
  { desc: "Color de la sombrilla", bbox: { x: 28,  y: 104, w: 52,  h: 58 } },
  { desc: "Cangrejo ausente",      bbox: { x: 182, y: 158, w: 52,  h: 28 } },
];

/* ─── Escena 2: Noche ────────────────────────────────────────────── */
function Noche({ right, active }: SceneProps) {
  const d = (i: number) => right && active.has(i);
  const stars = [[120,20],[160,15],[200,28],[100,45],[180,40],[145,55]] as [number,number][];
  return (
    <g>
      <rect x="0" y="0" width="280" height="140" fill={d(6) ? "#0d0d2b" : "#1a1a3e"} />
      <rect x="0" y="140" width="280" height="40" fill="#2d5a27" />
      {d(0)
        ? <circle cx="48" cy="38" r="22" fill="#FFFDE7" />
        : <><circle cx="48" cy="38" r="22" fill="#FFFDE7" /><circle cx="60" cy="30" r="18" fill="#1a1a3e" /></>
      }
      {(d(1) ? stars.slice(0, 4) : stars).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="white" opacity="0.9" />
      ))}
      {!d(5) && <line x1="220" y1="12" x2="265" y2="38" stroke="white" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />}
      <polygon points="0,140 55,80 110,140" fill="#2c3e50" />
      <polygon points="80,140 145,65 210,140" fill="#34495e" />
      {!d(2) && <polygon points="180,140 235,85 280,140" fill="#2c3e50" />}
      <ellipse cx="140" cy="158" rx="68" ry="14" fill={d(3) ? "#2D8A5F" : "#1A6B8A"} />
      <polygon points="18,140 30,105 42,140" fill="#1B5E3B" />
      {!d(4) && <polygon points="40,140 52,112 64,140" fill="#27AE60" />}
    </g>
  );
}
const nocheDiffs: DiffDef[] = [
  { desc: "Luna llena vs creciente", bbox: { x: 22,  y: 12, w: 52,  h: 54 } },
  { desc: "Cantidad de estrellas",   bbox: { x: 88,  y: 8,  w: 125, h: 60 } },
  { desc: "Montaña ausente",         bbox: { x: 175, y: 78, w: 105, h: 65 } },
  { desc: "Color del lago",          bbox: { x: 68,  y: 140, w: 144, h: 32 } },
  { desc: "Árbol ausente",           bbox: { x: 36,  y: 105, w: 34,  h: 40 } },
  { desc: "Estrella fugaz ausente",  bbox: { x: 210, y: 5,   w: 70,  h: 40 } },
  { desc: "Tono del cielo",          bbox: { x: 0,   y: 0,   w: 90,  h: 55 } },
];

/* ─── Escena 3: Ciudad ───────────────────────────────────────────── */
function Ciudad({ right, active }: SceneProps) {
  const d = (i: number) => right && active.has(i);
  const ventanasA = [[22,55],[40,55],[22,78],[40,78],[22,101],[40,101]] as [number,number][];
  return (
    <g>
      <rect x="0" y="0" width="280" height="110" fill="#87CEEB" />
      {!d(5) && <>
        <ellipse cx="215" cy="28" rx="36" ry="16" fill="white" />
        <ellipse cx="192" cy="33" rx="22" ry="14" fill="white" />
        <ellipse cx="238" cy="33" rx="22" ry="14" fill="white" />
      </>}
      <rect x="0" y="148" width="280" height="32" fill="#7f8c8d" />
      <rect x="12" y="42" width="58" height="108" fill={d(0) ? "#6BA3C2" : "#E8A87C"} />
      {ventanasA.filter((_, i) => !(d(1) && i === 2)).map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="13" height="13" fill={d(1) && i === 2 ? "#5a6a70" : "#ADE8F4"} />
      ))}
      <rect x="32" y="126" width="18" height="22" fill="#8B6914" />
      <rect x="85" y={d(2) ? 12 : 25} width="68" height={d(2) ? 136 : 123} fill="#C8D6DC" />
      {[[92,35],[113,35],[134,35],[92,58],[113,58],[134,58],[92,81],[113,81],[134,81]].map(([x,y], i) => (
        <rect key={i} x={x} y={y} width="14" height="14" fill="#ADE8F4" />
      ))}
      <rect x="110" y="128" width="22" height="20" fill={d(3) ? "#E74C3C" : "#8B6914"} />
      <rect x="168" y="55" width="50" height="93" fill="#B0BEC5" />
      {[176, 194, 212].flatMap(x => [63, 85, 107].map(y => ({ x, y }))).map(({ x, y }, i) => (
        <rect key={i} x={x} y={y} width="12" height="12" fill="#ADE8F4" />
      ))}
      {!d(4) && <>
        <rect x="230" y="82" width="5" height="68" fill="#444" />
        <circle cx="232" cy="80" r="8" fill="#FFD700" opacity="0.85" />
      </>}
      {!d(6) && <>
        <ellipse cx="72" cy="40" rx="9" ry="7" fill="#555" />
        <ellipse cx="72" cy="46" rx="6" ry="5" fill="#555" />
        <path d="M63,40 L60,35 M63,38 L60,35" stroke="#555" strokeWidth="2" />
        <path d="M81,40 L84,35 M81,38 L84,35" stroke="#555" strokeWidth="2" />
      </>}
    </g>
  );
}
const ciudadDiffs: DiffDef[] = [
  { desc: "Color edificio A",       bbox: { x: 8,   y: 38,  w: 66,  h: 80 } },
  { desc: "Ventana apagada",        bbox: { x: 16,  y: 72,  w: 45,  h: 24 } },
  { desc: "Altura edificio B",      bbox: { x: 82,  y: 8,   w: 74,  h: 24 } },
  { desc: "Color de la puerta",     bbox: { x: 106, y: 124, w: 30,  h: 28 } },
  { desc: "Farol ausente",          bbox: { x: 222, y: 72,  w: 26,  h: 80 } },
  { desc: "Nube ausente",           bbox: { x: 180, y: 10,  w: 100, h: 40 } },
  { desc: "Gato ausente",           bbox: { x: 56,  y: 28,  w: 36,  h: 26 } },
];

/* ─── Escena 4: Campo ────────────────────────────────────────────── */
function Campo({ right, active }: SceneProps) {
  const d = (i: number) => right && active.has(i);
  return (
    <g>
      <rect x="0" y="0" width="280" height="100" fill="#87CEEB" />
      {!d(6) && <>
        <ellipse cx="128" cy="32" rx="40" ry="18" fill="white" />
        <ellipse cx="105" cy="37" rx="26" ry="17" fill="white" />
        <ellipse cx="152" cy="37" rx="26" ry="17" fill="white" />
      </>}
      <ellipse cx="80" cy="120" rx="120" ry="60" fill="#6aaf6a" />
      <ellipse cx="220" cy="125" rx="100" ry="55" fill="#5a9e5a" />
      <rect x="0" y="128" width="280" height="52" fill="#5A9E5A" />
      <circle cx={d(4) ? 145 : 245} cy="35" r="22" fill="#FFD700" />
      <rect x="16" y="88" width="72" height="52" fill={d(0) ? "#E67E22" : "#C0392B"} />
      <polygon points="12,88 52,64 92,88" fill={d(0) ? "#D35400" : "#962D22"} />
      <rect x="38" y="110" width="20" height="30" fill="#8B6914" />
      <ellipse cx="170" cy="142" rx="24" ry="14" fill={d(1) ? "#333" : "#F5CBA7"} />
      {d(1) && <>
        <ellipse cx="160" cy="140" rx="8" ry="6" fill="white" />
        <ellipse cx="178" cy="144" rx="7" ry="5" fill="white" />
      </>}
      <circle cx="185" cy="132" r="9" fill={d(1) ? "#333" : "#F5CBA7"} />
      {[161, 168, 176, 183].map(x => (
        <rect key={x} x={x} y="154" width="4" height="10" fill={d(1) ? "#555" : "#D5A984"} />
      ))}
      <rect x="100" y="116" width="105" height="5" fill="white" />
      <rect x="100" y="128" width="105" height="5" fill="white" />
      {[100, 125, 150, 175].filter((_, i) => !(d(2) && i === 3)).map(x => (
        <rect key={x} x={x} y="112" width="6" height="24" fill="white" />
      ))}
      <path d="M0,168 Q40,155 80,168 Q120,180 160,168 Q200,155 240,168 Q260,175 280,168"
        stroke={d(3) ? "#2D8A5F" : "#1A6B8A"} strokeWidth="10" fill="none" />
      {[[30,155],[46,158],[62,153]].filter((_, i) => !(d(5) && i === 2)).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill={i % 2 === 0 ? "#E74C3C" : "#FFD700"} />
      ))}
    </g>
  );
}
const campoDiffs: DiffDef[] = [
  { desc: "Color del granero",        bbox: { x: 12,  y: 60,  w: 84,  h: 84 } },
  { desc: "Color de la vaca",         bbox: { x: 140, y: 124, w: 56,  h: 44 } },
  { desc: "Poste de valla ausente",   bbox: { x: 170, y: 108, w: 40,  h: 36 } },
  { desc: "Color del río",            bbox: { x: 0,   y: 156, w: 280, h: 28 } },
  { desc: "Posición del sol",         bbox: { x: 210, y: 8,   w: 70,  h: 60 } },
  { desc: "Flor ausente",             bbox: { x: 50,  y: 144, w: 28,  h: 22 } },
  { desc: "Nube ausente",             bbox: { x: 88,  y: 10,  w: 90,  h: 48 } },
];

/* ─── Escenas ────────────────────────────────────────────────────── */
const ESCENAS = [
  { nombre: "Jardín",  Svg: Jardin, diffs: jardinDiffs },
  { nombre: "Playa",   Svg: Playa,  diffs: playaDiffs  },
  { nombre: "Noche",   Svg: Noche,  diffs: nocheDiffs  },
  { nombre: "Ciudad",  Svg: Ciudad, diffs: ciudadDiffs },
  { nombre: "Campo",   Svg: Campo,  diffs: campoDiffs  },
];

function configNivel(nivel: number) {
  return {
    sceneIdx: (nivel - 1) % 5,
    difCount: Math.min(3 + (nivel - 1), 7),
  };
}

/* ─── Supabase ───────────────────────────────────────────────────── */
async function cargarRecord() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;
  const { data } = await supabase.from("puntajes_juegos").select("puntaje")
    .eq("user_id", user.id).eq("juego", "diferencias").single();
  return data?.puntaje ?? 0;
}

async function guardarRecord(nivel: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("puntajes_juegos").upsert(
    { user_id: user.id, juego: "diferencias", puntaje: nivel, nivel, updated_at: new Date().toISOString() },
    { onConflict: "user_id,juego" }
  );
}

/* ─── Componente principal ───────────────────────────────────────── */
type Fase = "idle" | "jugando" | "win";

export default function DiferenciasPage() {
  const [nivel, setNivel]   = useState(1);
  const [found, setFound]   = useState<Set<number>>(new Set());
  const [wrong, setWrong]   = useState<{ x: number; y: number } | null>(null);
  const [fase, setFase]     = useState<Fase>("idle");
  const [record, setRecord] = useState(0);
  const rightRef            = useRef<SVGSVGElement>(null);

  useEffect(() => { cargarRecord().then(setRecord); }, []);

  const { sceneIdx, difCount } = configNivel(nivel);
  const escena     = ESCENAS[sceneIdx];
  const activeDiffs = new Set(Array.from({ length: difCount }, (_, i) => i));

  function iniciar() { setNivel(1); setFound(new Set()); setFase("jugando"); }

  function handleClickRight(e: React.MouseEvent<SVGSVGElement>) {
    if (fase !== "jugando") return;
    const rect   = e.currentTarget.getBoundingClientRect();
    const cx     = ((e.clientX - rect.left) / rect.width)  * VW;
    const cy     = ((e.clientY - rect.top)  / rect.height) * VH;

    for (let i = 0; i < difCount; i++) {
      if (found.has(i)) continue;
      const { x, y, w, h } = escena.diffs[i].bbox;
      if (cx >= x && cx <= x + w && cy >= y && cy <= y + h) {
        const nf = new Set(found); nf.add(i);
        setFound(nf);
        if (nf.size === difCount) {
          setFase("win");
          if (nivel > record) { setRecord(nivel); guardarRecord(nivel); }
          logEvento("juego_completado", { juego: "diferencias", nivel });
        }
        return;
      }
    }
    setWrong({ x: cx, y: cy });
    setTimeout(() => setWrong(null), 600);
  }

  function siguienteNivel() {
    const sig = nivel + 1;
    setNivel(sig);
    setFound(new Set());
    setFase("jugando");
  }

  const Svg = escena.Svg;

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <header style={{ background: "var(--v2)", padding: "14px 28px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <OliveBranch size={28} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 700, color: "white" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
        <Link href="/juegos" style={{ marginLeft: "auto", color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 15 }}>
          ← Juegos
        </Link>
      </header>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "36px 16px 80px" }}>
        <p style={{ fontSize: 12, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginBottom: 6, textAlign: "center" }}>
          Percepción visual
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: "var(--n2)", marginBottom: 8, textAlign: "center" }}>
          Encuentra las diferencias
        </h1>

        {record > 0 && (
          <p style={{ fontSize: 14, color: "var(--gris)", marginBottom: 4, textAlign: "center" }}>
            Tu mejor nivel: <strong style={{ color: "var(--v2)" }}>{record}</strong>
          </p>
        )}

        {fase === "idle" && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.65, marginBottom: 32 }}>
              Compara las dos imágenes y toca en la imagen de la derecha donde veas una diferencia. Cada nivel agrega más diferencias, cada vez más sutiles.
            </p>
            <button onClick={iniciar} style={{
              background: "var(--v2)", color: "white", border: "none",
              padding: "16px 48px", borderRadius: 50, fontSize: 17, fontWeight: 700,
              cursor: "pointer", fontFamily: "DM Sans, sans-serif",
            }}>
              Comenzar →
            </button>
          </div>
        )}

        {(fase === "jugando" || fase === "win") && (<>
          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 16, marginTop: 8 }}>
            {[
              { label: "nivel",       val: nivel        },
              { label: "diferencias", val: `${found.size}/${difCount}` },
              { label: "escena",      val: escena.nombre },
            ].map(({ label, val }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--v2)", fontFamily: "Cormorant Garamond, serif" }}>{val}</div>
                <div style={{ fontSize: 11, color: "var(--gris)", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>

          {fase === "win" && (
            <div style={{ textAlign: "center", background: "var(--v6)", border: "1px solid var(--v5)", borderRadius: 16, padding: "16px 24px", marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--v2)", marginBottom: 12 }}>
                ✓ ¡Encontraste todas las diferencias!
              </div>
              <button onClick={siguienteNivel} style={{
                background: "var(--v2)", color: "white", border: "none",
                padding: "12px 36px", borderRadius: 50, fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "DM Sans, sans-serif",
              }}>
                Siguiente nivel →
              </button>
            </div>
          )}

          {/* Imágenes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5, textAlign: "center" }}>
                Original
              </p>
              <div style={{ border: "2px solid #E0EAE3", borderRadius: 10, overflow: "hidden" }}>
                <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ display: "block" }}>
                  <Svg right={false} active={activeDiffs} found={found} />
                </svg>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5, textAlign: "center" }}>
                Toca aquí →
              </p>
              <div style={{ border: "2px solid var(--v4)", borderRadius: 10, overflow: "hidden", cursor: "crosshair" }}>
                <svg ref={rightRef} viewBox={`0 0 ${VW} ${VH}`} width="100%"
                  style={{ display: "block" }} onClick={handleClickRight}>
                  <Svg right={true} active={activeDiffs} found={found} />
                  {Array.from(found).map(i => {
                    const bb = escena.diffs[i].bbox;
                    return (
                      <g key={i}>
                        <circle cx={bb.x + bb.w / 2} cy={bb.y + bb.h / 2} r="11" fill="var(--v3)" opacity="0.9" />
                        <text x={bb.x + bb.w / 2} y={bb.y + bb.h / 2 + 5}
                          textAnchor="middle" fontSize="12" fill="white" fontWeight="700">✓</text>
                      </g>
                    );
                  })}
                  {wrong && (
                    <g>
                      <circle cx={wrong.x} cy={wrong.y} r="10" fill="#EF4444" opacity="0.78" />
                      <text x={wrong.x} y={wrong.y + 5} textAnchor="middle" fontSize="12" fill="white" fontWeight="700">✗</text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Indicadores */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
            {Array.from({ length: difCount }, (_, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 5,
                background: found.has(i) ? "var(--v6)" : "white",
                border: `1.5px solid ${found.has(i) ? "var(--v4)" : "#E0EAE3"}`,
                borderRadius: 20, padding: "4px 10px",
                fontSize: 12, color: found.has(i) ? "var(--v2)" : "var(--gris)",
                fontWeight: found.has(i) ? 700 : 400, transition: "all .2s",
              }}>
                {found.has(i) ? `✓ ${escena.diffs[i].desc}` : `${i + 1}. ?`}
              </div>
            ))}
          </div>
        </>)}

        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 28, borderTop: "1px solid var(--v5)" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al panel
          </Link>
        </div>
      </main>
    </div>
  );
}
