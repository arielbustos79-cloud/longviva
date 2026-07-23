"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import { createClient } from "@/lib/supabase-browser";
import { logEvento } from "@/lib/logEvento";

const CATEGORIAS = [
  { items: ["🍎","🍊","🍋","🍇","🍓","🍑","🍒","🍐","🥝","🍉"] },
  { items: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯"] },
  { items: ["🌸","🌺","🌻","🌹","🌷","🌼","🍀","🌿","🌱","🎋"] },
  { items: ["⭐","🎵","⚽","🎈","📚","🏠","✈️","🎸","🎪","🎯"] },
  { items: ["🍕","🍔","🌮","🍜","🍣","🍰","🍩","🍪","🧁","🍫"] },
  { items: ["🚗","🚕","🚙","🚌","🚎","🚐","🚑","🚒","🚓","🛻"] },
];

function gridSize(nivel: number): number {
  if (nivel <= 2) return 4;
  if (nivel <= 4) return 5;
  if (nivel <= 6) return 6;
  if (nivel <= 8) return 7;
  return 8;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generarGrilla(nivel: number, objetivo: string, catIdx: number): string[] {
  const n = gridSize(nivel) ** 2;
  const numTargets = Math.max(2, Math.floor(n * 0.18));
  const sameCatRatio = nivel <= 2 ? 0 : nivel <= 4 ? 0.3 : nivel <= 7 ? 0.6 : 0.88;
  const sameCat = CATEGORIAS[catIdx].items.filter(e => e !== objetivo);
  const otherCat = CATEGORIAS.filter((_, i) => i !== catIdx).flatMap(c => c.items);

  const distractors: string[] = [];
  for (let i = 0; i < n - numTargets; i++) {
    const useSame = Math.random() < sameCatRatio && sameCat.length > 0;
    const pool = useSame ? sameCat : otherCat;
    distractors.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  return shuffle([...Array(numTargets).fill(objetivo), ...distractors]);
}

async function cargarRecord() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;
  const { data } = await supabase
    .from("puntajes_juegos").select("puntaje")
    .eq("user_id", user.id).eq("juego", "caza_objetos").single();
  return data?.puntaje ?? 0;
}

async function guardarRecord(nivel: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("puntajes_juegos").upsert(
    { user_id: user.id, juego: "caza_objetos", puntaje: nivel, nivel, updated_at: new Date().toISOString() },
    { onConflict: "user_id,juego" }
  );
}

type Fase = "idle" | "jugando" | "success" | "gameover";

export default function CazaObjetosPage() {
  const [nivel, setNivel]     = useState(1);
  const [grilla, setGrilla]   = useState<string[]>([]);
  const [objetivo, setObjetivo] = useState("");
  const [catIdx, setCatIdx]   = useState(0);
  const [found, setFound]     = useState<Set<number>>(new Set());
  const [wrong, setWrong]     = useState<number | null>(null);
  const [fase, setFase]       = useState<Fase>("idle");
  const [record, setRecord]   = useState(0);
  const [errores, setErrores] = useState(0);

  useEffect(() => { cargarRecord().then(setRecord); }, []);

  const numTargets = grilla.filter(e => e === objetivo).length;
  const size       = gridSize(nivel);

  const prepararNivel = useCallback((niv: number) => {
    const ci = Math.floor(Math.random() * CATEGORIAS.length);
    const cat = CATEGORIAS[ci];
    const obj = cat.items[Math.floor(Math.random() * cat.items.length)];
    setCatIdx(ci);
    setObjetivo(obj);
    setGrilla(generarGrilla(niv, obj, ci));
    setFound(new Set());
    setErrores(0);
    setFase("jugando");
  }, []);

  function iniciar() { setNivel(1); prepararNivel(1); }

  function tap(i: number) {
    if (fase !== "jugando" || found.has(i)) return;
    if (grilla[i] === objetivo) {
      const nf = new Set(found); nf.add(i);
      setFound(nf);
      if (nf.size === numTargets) {
        setFase("success");
        const sig = nivel + 1;
        if (nivel >= record) {
          setRecord(nivel);
          guardarRecord(nivel);
        }
        logEvento("juego_completado", { juego: "caza_objetos", nivel });
        setTimeout(() => { setNivel(sig); prepararNivel(sig); }, 1200);
      }
    } else {
      setWrong(i);
      setErrores(e => e + 1);
      setTimeout(() => setWrong(null), 500);
    }
  }

  const cellSize = size <= 4 ? 68 : size <= 5 ? 58 : size <= 6 ? 50 : size <= 7 ? 44 : 38;
  const fontSize = size <= 4 ? 32 : size <= 5 ? 26 : size <= 6 ? 22 : size <= 7 ? 19 : 17;

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

      <main style={{ maxWidth: 560, margin: "0 auto", padding: "36px 16px 80px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
          Atención
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
          Caza objetos
        </h1>

        {record > 0 && (
          <p style={{ fontSize: 14, color: "var(--gris)", marginBottom: 4 }}>
            Tu mejor nivel: <strong style={{ color: "var(--v2)" }}>{record}</strong>
          </p>
        )}

        {fase === "idle" && (
          <>
            <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.65, marginTop: 16, marginBottom: 32 }}>
              Encuentra todas las apariciones del ícono objetivo en la grilla. La grilla crece y los distractores se vuelven más parecidos con cada nivel.
            </p>
            <button onClick={iniciar} style={{
              background: "var(--v2)", color: "white", border: "none",
              padding: "16px 48px", borderRadius: 50, fontSize: 17, fontWeight: 700,
              cursor: "pointer", fontFamily: "DM Sans, sans-serif",
            }}>
              Comenzar →
            </button>
          </>
        )}

        {(fase === "jugando" || fase === "success") && (
          <>
            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 16, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "var(--v2)", fontFamily: "Cormorant Garamond, serif" }}>{nivel}</div>
                <div style={{ fontSize: 11, color: "var(--gris)", textTransform: "uppercase", letterSpacing: 1 }}>nivel</div>
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "var(--v2)", fontFamily: "Cormorant Garamond, serif" }}>{found.size}/{numTargets}</div>
                <div style={{ fontSize: 11, color: "var(--gris)", textTransform: "uppercase", letterSpacing: 1 }}>encontrados</div>
              </div>
              {errores > 0 && (
                <div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#EF4444", fontFamily: "Cormorant Garamond, serif" }}>{errores}</div>
                  <div style={{ fontSize: 11, color: "var(--gris)", textTransform: "uppercase", letterSpacing: 1 }}>errores</div>
                </div>
              )}
            </div>

            {/* Objetivo */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20,
              background: "white", borderRadius: 16, padding: "12px 24px",
              border: "2px solid var(--v4)", boxShadow: "0 4px 16px rgba(27,94,59,.1)",
            }}>
              <span style={{ fontSize: 14, color: "var(--gris)", fontWeight: 600 }}>Busca:</span>
              <span style={{ fontSize: 44 }}>{objetivo}</span>
            </div>

            {fase === "success" && (
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--v3)", marginBottom: 12 }}>
                ✓ ¡Todos encontrados! Siguiente nivel...
              </div>
            )}

            {/* Grilla */}
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
              gap: 4,
              justifyContent: "center",
              margin: "0 auto",
            }}>
              {grilla.map((emoji, i) => {
                const isFound   = found.has(i);
                const isWrong   = wrong === i;
                const isTarget  = emoji === objetivo;
                return (
                  <button
                    key={i}
                    onClick={() => tap(i)}
                    style={{
                      width: cellSize, height: cellSize,
                      borderRadius: 10,
                      fontSize,
                      border: isFound ? "2.5px solid var(--v3)" : "1.5px solid #E0EAE3",
                      background: isFound ? "var(--v6)" : isWrong ? "#FEE2E2" : "white",
                      cursor: "pointer",
                      transition: "all .12s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: isFound ? 0.6 : 1,
                      transform: isWrong ? "scale(.9)" : "scale(1)",
                      boxShadow: isWrong ? "0 0 0 2px #EF4444" : "none",
                    }}
                  >
                    {isFound ? "✓" : emoji}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 28, borderTop: "1px solid var(--v5)" }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al panel
          </Link>
        </div>
      </main>
    </div>
  );
}
