"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import { createClient } from "@/lib/supabase-browser";
import { logEvento } from "@/lib/logEvento";

const COLORES = [
  { id: 0, nombre: "ROJO",     hex: "#EF4444" },
  { id: 1, nombre: "AZUL",     hex: "#3B82F6" },
  { id: 2, nombre: "VERDE",    hex: "#22C55E" },
  { id: 3, nombre: "AMARILLO", hex: "#EAB308" },
];

type Carta = { palabraIdx: number; tintaIdx: number };
type Fase  = "idle" | "jugando" | "fin";
type Feed  = "correcto" | "incorrecto" | null;

function cartaAleatoria(): Carta {
  const palabraIdx = Math.floor(Math.random() * 4);
  let tintaIdx;
  do { tintaIdx = Math.floor(Math.random() * 4); } while (tintaIdx === palabraIdx);
  return { palabraIdx, tintaIdx };
}

async function cargarRecord() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;
  const { data } = await supabase
    .from("puntajes_juegos")
    .select("puntaje")
    .eq("user_id", user.id)
    .eq("juego", "test_colores")
    .single();
  return data?.puntaje ?? 0;
}

async function guardarRecord(puntaje: number, nivel: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("puntajes_juegos").upsert(
    { user_id: user.id, juego: "test_colores", puntaje, nivel, updated_at: new Date().toISOString() },
    { onConflict: "user_id,juego" }
  );
}

export default function TestColoresPage() {
  const [fase, setFase]         = useState<Fase>("idle");
  const [carta, setCarta]       = useState<Carta>(cartaAleatoria());
  const [tiempo, setTiempo]     = useState(60);
  const [puntaje, setPuntaje]   = useState(0);
  const [nivel, setNivel]       = useState(1);
  const [racha, setRacha]       = useState(0);
  const [feed, setFeed]         = useState<Feed>(null);
  const [record, setRecord]     = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    cargarRecord().then(setRecord);
  }, []);

  const terminar = useCallback((pts: number, niv: number) => {
    setFase("fin");
    if (timerRef.current) clearInterval(timerRef.current);
    logEvento("juego_completado", { juego: "test_colores", puntaje: pts, nivel: niv });
    if (pts > record) {
      setRecord(pts);
      guardarRecord(pts, niv);
    }
  }, [record]);

  function iniciar() {
    setPuntaje(0); setNivel(1); setRacha(0); setTiempo(60);
    setCarta(cartaAleatoria());
    setFeed(null);
    setFase("jugando");
    timerRef.current = setInterval(() => {
      setTiempo(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setFase("fin");
          setPuntaje(prev => {
            setNivel(niv => {
              logEvento("juego_completado", { juego: "test_colores", puntaje: prev, nivel: niv });
              if (prev > record) {
                setRecord(prev);
                guardarRecord(prev, niv);
              }
              return niv;
            });
            return prev;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  function responder(colorIdx: number) {
    if (fase !== "jugando") return;
    const correcto = colorIdx === carta.tintaIdx;

    if (correcto) {
      const nuevaRacha = racha + 1;
      const nuevoNivel = nuevaRacha >= 10 ? nivel + 1 : nivel;
      const bonus      = nuevaRacha >= 10 ? 1 : 0;
      setPuntaje(p => p + 1 + bonus);
      setRacha(nuevaRacha >= 10 ? 0 : nuevaRacha);
      setNivel(nuevoNivel);
      setFeed("correcto");
    } else {
      setRacha(0);
      setFeed("incorrecto");
    }

    setCarta(cartaAleatoria());
    setTimeout(() => setFeed(null), 200);
  }

  const colorBarra = tiempo > 30 ? "var(--v3)" : tiempo > 15 ? "#EAB308" : "#EF4444";

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

      <main style={{ maxWidth: 440, margin: "0 auto", padding: "40px 20px 80px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
          Ejecución · Efecto Stroop
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
          Test de colores
        </h1>

        {record > 0 && (
          <p style={{ fontSize: 14, color: "var(--gris)", marginBottom: 4 }}>
            Tu mejor puntaje: <strong style={{ color: "var(--v2)" }}>{record} puntos</strong>
          </p>
        )}

        {fase === "idle" && (
          <>
            <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.65, marginTop: 16, marginBottom: 32 }}>
              Aparece una palabra de color escrita en tinta de otro color.<br />
              Toca el botón del color de la <strong>tinta</strong> — no lo que dice la palabra.<br />
              60 segundos. ¿Cuántas puedes?
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

        {fase === "jugando" && (
          <>
            {/* Stats bar */}
            <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 20, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: colorBarra, fontFamily: "Cormorant Garamond, serif" }}>
                  {tiempo}s
                </div>
                <div style={{ fontSize: 11, color: "var(--gris)", textTransform: "uppercase", letterSpacing: 1 }}>tiempo</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: "var(--v2)", fontFamily: "Cormorant Garamond, serif" }}>
                  {puntaje}
                </div>
                <div style={{ fontSize: 11, color: "var(--gris)", textTransform: "uppercase", letterSpacing: 1 }}>puntos</div>
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: "var(--d2)", fontFamily: "Cormorant Garamond, serif" }}>
                  Nv {nivel}
                </div>
                <div style={{ fontSize: 11, color: "var(--gris)", textTransform: "uppercase", letterSpacing: 1 }}>nivel</div>
              </div>
            </div>

            {/* Barra de tiempo */}
            <div style={{ width: "100%", height: 6, background: "#E0EAE3", borderRadius: 3, marginBottom: 32, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3,
                background: colorBarra,
                width: `${(tiempo / 60) * 100}%`,
                transition: "width 1s linear, background .3s",
              }} />
            </div>

            {/* Palabra */}
            <div style={{
              fontSize: 56, fontWeight: 900,
              color: COLORES[carta.tintaIdx].hex,
              letterSpacing: 3, marginBottom: 12,
              textShadow: "0 2px 8px rgba(0,0,0,.15)",
              minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {COLORES[carta.palabraIdx].nombre}
            </div>

            {/* Feedback */}
            <div style={{ fontSize: 22, minHeight: 32, marginBottom: 24 }}>
              {feed === "correcto"   && <span style={{ color: "var(--v3)" }}>✓</span>}
              {feed === "incorrecto" && <span style={{ color: "#EF4444" }}>✗</span>}
            </div>

            {/* Botones de color */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {COLORES.map(c => (
                <button
                  key={c.id}
                  onClick={() => responder(c.id)}
                  style={{
                    height: 72,
                    borderRadius: 16,
                    background: c.hex,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "white",
                    textShadow: "0 1px 3px rgba(0,0,0,.3)",
                    fontFamily: "DM Sans, sans-serif",
                    transition: "transform .08s",
                    boxShadow: "0 4px 12px rgba(0,0,0,.18)",
                  }}
                  onMouseDown={e => (e.currentTarget.style.transform = "scale(.95)")}
                  onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
          </>
        )}

        {fase === "fin" && (
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 72, fontWeight: 700, color: "var(--v2)", fontFamily: "Cormorant Garamond, serif", lineHeight: 1 }}>
              {puntaje}
            </div>
            <div style={{ fontSize: 16, color: "var(--gris)", marginBottom: 8 }}>puntos en 60 segundos</div>
            {puntaje >= record && puntaje > 0 && (
              <div style={{ fontSize: 15, color: "var(--d2)", fontWeight: 700, marginBottom: 20 }}>
                ¡Nuevo récord personal! 🎉
              </div>
            )}
            <p style={{ fontSize: 15, color: "var(--gris)", marginBottom: 28 }}>
              Nivel alcanzado: {nivel}
            </p>
            <button onClick={iniciar} style={{
              background: "var(--v2)", color: "white", border: "none",
              padding: "14px 40px", borderRadius: 50, fontSize: 16, fontWeight: 700,
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
