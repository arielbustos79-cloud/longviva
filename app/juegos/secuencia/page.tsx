"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import { createClient } from "@/lib/supabase-browser";
import { logEvento } from "@/lib/logEvento";

const COLORES = [
  { id: 0, nombre: "Rojo",     bright: "#EF4444", dim: "#450a0a" },
  { id: 1, nombre: "Azul",     bright: "#3B82F6", dim: "#0d1b4b" },
  { id: 2, nombre: "Verde",    bright: "#22C55E", dim: "#052e16" },
  { id: 3, nombre: "Amarillo", bright: "#EAB308", dim: "#3b2a00" },
];

type Fase = "idle" | "show" | "input" | "error" | "win" | "gameover";

function rand4() { return Math.floor(Math.random() * 4); }

async function cargarRecord(juego: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;
  const { data } = await supabase
    .from("puntajes_juegos")
    .select("puntaje")
    .eq("user_id", user.id)
    .eq("juego", juego)
    .single();
  return data?.puntaje ?? 0;
}

async function guardarRecord(juego: string, puntaje: number, nivel: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("puntajes_juegos").upsert(
    { user_id: user.id, juego, puntaje, nivel, updated_at: new Date().toISOString() },
    { onConflict: "user_id,juego" }
  );
}

export default function SecuenciaPage() {
  const [secuencia, setSecuencia] = useState<number[]>([]);
  const [userSeq, setUserSeq]     = useState<number[]>([]);
  const [fase, setFase]           = useState<Fase>("idle");
  const [lit, setLit]             = useState<number | null>(null);
  const [record, setRecord]       = useState(0);
  const [flashError, setFlashError] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const nivel = secuencia.length;

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  useEffect(() => {
    cargarRecord("secuencia").then(setRecord);
    return clearTimers;
  }, []);

  const velocidad = Math.max(280, 750 - (nivel - 3) * 35);

  const reproducir = useCallback((seq: number[]) => {
    setFase("show");
    setUserSeq([]);
    clearTimers();
    seq.forEach((col, i) => {
      const t1 = setTimeout(() => setLit(col), i * (velocidad + 180));
      const t2 = setTimeout(() => setLit(null), i * (velocidad + 180) + velocidad);
      timers.current.push(t1, t2);
    });
    const fin = setTimeout(() => setFase("input"), seq.length * (velocidad + 180) + 200);
    timers.current.push(fin);
  }, [velocidad]);

  function iniciar() {
    const seq = [rand4(), rand4(), rand4()];
    setSecuencia(seq);
    reproducir(seq);
  }

  function manejarTap(id: number) {
    if (fase !== "input") return;
    const pos = userSeq.length;
    const esperado = secuencia[pos];
    const nueva = [...userSeq, id];

    if (id !== esperado) {
      setFlashError(id);
      setFase("error");
      clearTimers();
      setTimeout(() => {
        setFlashError(null);
        setFase("gameover");
        if (nivel > record) {
          setRecord(nivel);
          guardarRecord("secuencia", nivel, nivel);
        }
        logEvento("juego_completado", { juego: "secuencia", nivel });
      }, 700);
      return;
    }

    setUserSeq(nueva);
    if (nueva.length === secuencia.length) {
      setFase("win");
      clearTimers();
      setTimeout(() => {
        const sig = [...secuencia, rand4()];
        setSecuencia(sig);
        reproducir(sig);
      }, 900);
    }
  }

  const bgTile = (id: number) => {
    if (flashError === id) return "#FF0000";
    if (lit === id) return COLORES[id].bright;
    if (fase === "input" && lit === null) return COLORES[id].bright + "99";
    return COLORES[id].dim;
  };

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

      <main style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px 80px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
          Memoria
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
          Secuencia
        </h1>

        {record > 0 && (
          <p style={{ fontSize: 14, color: "var(--gris)", marginBottom: 4 }}>
            Tu mejor secuencia: <strong style={{ color: "var(--v2)" }}>{record} pasos</strong>
          </p>
        )}

        {fase === "idle" && (
          <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.6, marginBottom: 32, marginTop: 16 }}>
            Observa la secuencia de colores y repítela en el mismo orden. Empieza con 3 pasos — sin techo.
          </p>
        )}

        {/* Nivel badge */}
        {fase !== "idle" && (
          <div style={{ display: "inline-flex", gap: 20, marginBottom: 24, marginTop: 16 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "var(--v2)", fontFamily: "Cormorant Garamond, serif" }}>{nivel}</div>
              <div style={{ fontSize: 12, color: "var(--gris)", textTransform: "uppercase", letterSpacing: 1 }}>pasos</div>
            </div>
          </div>
        )}

        {/* Instrucción de fase */}
        <div style={{ fontSize: 14, color: "var(--gris)", minHeight: 24, marginBottom: 20 }}>
          {fase === "show"    && "Observa la secuencia..."}
          {fase === "input"   && "¡Ahora tú! Repite el orden"}
          {fase === "win"     && "✓ ¡Correcto! Sigue así..."}
          {fase === "error"   && "✗ Equivocado"}
          {fase === "gameover" && `Llegaste a ${nivel} pasos`}
        </div>

        {/* Grilla 2×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 340, margin: "0 auto 32px" }}>
          {COLORES.map((c) => (
            <button
              key={c.id}
              onClick={() => manejarTap(c.id)}
              disabled={fase !== "input"}
              style={{
                height: 120,
                borderRadius: 20,
                background: bgTile(c.id),
                border: "none",
                cursor: fase === "input" ? "pointer" : "default",
                transition: "background .12s",
                boxShadow: lit === c.id ? `0 0 32px ${COLORES[c.id].bright}88` : "0 4px 12px rgba(0,0,0,.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: "rgba(255,255,255,.85)",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        {/* Botones de acción */}
        {fase === "idle" && (
          <button onClick={iniciar} style={{
            background: "var(--v2)", color: "white", border: "none",
            padding: "16px 48px", borderRadius: 50, fontSize: 17, fontWeight: 700,
            cursor: "pointer", fontFamily: "DM Sans, sans-serif",
          }}>
            Comenzar →
          </button>
        )}

        {fase === "gameover" && (
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={iniciar} style={{
              background: "var(--v2)", color: "white", border: "none",
              padding: "14px 36px", borderRadius: 50, fontSize: 16, fontWeight: 700,
              cursor: "pointer", fontFamily: "DM Sans, sans-serif",
            }}>
              Jugar de nuevo
            </button>
          </div>
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
