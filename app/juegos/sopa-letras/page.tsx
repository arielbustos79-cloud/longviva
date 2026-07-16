"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import { logEvento } from "@/lib/logEvento";

const PALABRAS = ["PRIME", "ENERGIA", "VITAL", "CALMA", "SALUD", "MOVER", "VIVIAN", "PLENO"];
const FILAS = 12;
const COLS = 12;
const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Celda = { letra: string; palabraId: number | null };
type Pos = { f: number; c: number };

function generarGrilla(): Celda[][] {
  const grid: Celda[][] = Array.from({ length: FILAS }, () =>
    Array.from({ length: COLS }, () => ({ letra: "", palabraId: null }))
  );

  const dirs = [
    [0, 1],   // →
    [1, 0],   // ↓
    [0, -1],  // ←
    [-1, 0],  // ↑
  ];

  PALABRAS.forEach((palabra, pid) => {
    let colocada = false;
    let intentos = 0;
    while (!colocada && intentos < 200) {
      intentos++;
      const [df, dc] = dirs[Math.floor(Math.random() * dirs.length)];
      const f0 = Math.floor(Math.random() * FILAS);
      const c0 = Math.floor(Math.random() * COLS);
      const fFin = f0 + df * (palabra.length - 1);
      const cFin = c0 + dc * (palabra.length - 1);
      if (fFin < 0 || fFin >= FILAS || cFin < 0 || cFin >= COLS) continue;

      let cabe = true;
      for (let i = 0; i < palabra.length; i++) {
        const f = f0 + df * i;
        const c = c0 + dc * i;
        if (grid[f][c].letra !== "" && grid[f][c].letra !== palabra[i]) {
          cabe = false; break;
        }
      }
      if (!cabe) continue;

      for (let i = 0; i < palabra.length; i++) {
        const f = f0 + df * i;
        const c = c0 + dc * i;
        grid[f][c] = { letra: palabra[i], palabraId: pid };
      }
      colocada = true;
    }
  });

  // Rellenar vacíos con letras aleatorias
  for (let f = 0; f < FILAS; f++)
    for (let c = 0; c < COLS; c++)
      if (grid[f][c].letra === "")
        grid[f][c] = { letra: LETRAS[Math.floor(Math.random() * LETRAS.length)], palabraId: null };

  return grid;
}

// Obtiene todas las posiciones entre inicio y fin (misma fila o columna)
function rangoPosiciones(inicio: Pos, fin: Pos): Pos[] | null {
  if (inicio.f === fin.f) {
    const minC = Math.min(inicio.c, fin.c);
    const maxC = Math.max(inicio.c, fin.c);
    return Array.from({ length: maxC - minC + 1 }, (_, i) => ({ f: inicio.f, c: minC + i }));
  }
  if (inicio.c === fin.c) {
    const minF = Math.min(inicio.f, fin.f);
    const maxF = Math.max(inicio.f, fin.f);
    return Array.from({ length: maxF - minF + 1 }, (_, i) => ({ f: minF + i, c: inicio.c }));
  }
  return null; // diagonal no soportada
}

function posKey(p: Pos) { return `${p.f}-${p.c}`; }

export default function SopaLetrasPage() {
  const [grilla, setGrilla] = useState<Celda[][]>([]);
  const [encontradas, setEncontradas] = useState<number[]>([]); // índices de PALABRAS
  const [selStart, setSelStart] = useState<Pos | null>(null);
  const [selActual, setSelActual] = useState<Set<string>>(new Set());
  const [error, setError] = useState(false);
  const [ganado, setGanado] = useState(false);

  const reiniciar = useCallback(() => {
    setGrilla(generarGrilla());
    setEncontradas([]);
    setSelStart(null);
    setSelActual(new Set());
    setError(false);
    setGanado(false);
  }, []);

  useEffect(() => { reiniciar(); }, [reiniciar]);

  useEffect(() => {
    if (encontradas.length === PALABRAS.length && PALABRAS.length > 0) {
      setGanado(true);
      logEvento("juego_completado", { juego: "sopa_letras" });
    }
  }, [encontradas]);

  function tocarCelda(pos: Pos) {
    if (error) { setError(false); setSelStart(null); setSelActual(new Set()); return; }

    if (!selStart) {
      setSelStart(pos);
      setSelActual(new Set([posKey(pos)]));
      return;
    }

    // Segunda celda — validar rango
    const rango = rangoPosiciones(selStart, pos);
    if (!rango) {
      // No es misma fila/columna — reinicia desde esta celda
      setSelStart(pos);
      setSelActual(new Set([posKey(pos)]));
      return;
    }

    const letrasRango = rango.map(p => grilla[p.f][p.c].letra).join("");
    const letrasInv = [...letrasRango].reverse().join("");

    const idxFound = PALABRAS.findIndex(
      (p, i) => !encontradas.includes(i) && (p === letrasRango || p === letrasInv)
    );

    if (idxFound >= 0) {
      setEncontradas(prev => [...prev, idxFound]);
      setSelStart(null);
      setSelActual(new Set());
    } else {
      setError(true);
      setSelActual(new Set(rango.map(posKey)));
      setTimeout(() => {
        setError(false);
        setSelStart(null);
        setSelActual(new Set());
      }, 700);
    }
  }

  // Determinar qué celdas pertenecen a palabras encontradas
  const celdasEncontradas = new Set<string>();
  if (grilla.length > 0) {
    for (let f = 0; f < FILAS; f++)
      for (let c = 0; c < COLS; c++)
        if (grilla[f][c].palabraId !== null && encontradas.includes(grilla[f][c].palabraId!))
          celdasEncontradas.add(posKey({ f, c }));
  }

  const celSz = "clamp(28px, 7vw, 42px)";

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <header style={{ background: "var(--v2)", padding: "16px 40px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
        <Link href="/juegos" style={{ marginLeft: "auto", color: "rgba(255,255,255,.6)", textDecoration: "none", fontSize: 15 }}>
          ← Juegos
        </Link>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 16px 96px" }}>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
          Sopa de letras
        </h1>
        <p style={{ fontSize: 17, color: "var(--gris)", marginBottom: 32 }}>
          Toca la primera letra de una palabra y luego la última para seleccionarla.
        </p>

        {ganado ? (
          <div style={{
            background: "var(--v2)", borderRadius: 28, padding: "48px 36px", textAlign: "center",
            boxShadow: "0 16px 48px rgba(27,94,59,.25)",
          }}>
            <OliveBranch size={56} variant="light" />
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "white", margin: "20px 0 12px" }}>
              ¡Encontraste todo!
            </h2>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,.85)", marginBottom: 32 }}>
              Encontraste las {PALABRAS.length} palabras. ¡Mente activa y despierta!
            </p>
            <button onClick={reiniciar} style={{
              background: "white", color: "var(--v2)", border: "none",
              borderRadius: 50, padding: "16px 36px", fontSize: 17, fontWeight: 700, cursor: "pointer",
            }}>
              Jugar de nuevo →
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
            {/* Grilla */}
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${COLS}, ${celSz})`,
                gap: 4,
                width: "fit-content",
                margin: "0 auto",
              }}>
                {grilla.map((fila, f) =>
                  fila.map((celda, c) => {
                    const key = posKey({ f, c });
                    const esInicio = selStart && posKey(selStart) === key;
                    const enSel = selActual.has(key);
                    const encontrada = celdasEncontradas.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => tocarCelda({ f, c })}
                        style={{
                          width: celSz, height: celSz,
                          borderRadius: 8,
                          border: "none",
                          cursor: "pointer",
                          fontSize: "clamp(13px, 3.5vw, 18px)",
                          fontWeight: 700,
                          fontFamily: "DM Sans, sans-serif",
                          letterSpacing: 0,
                          background: encontrada
                            ? "var(--v2)"
                            : error && enSel
                              ? "#FDECEA"
                              : esInicio || enSel
                                ? "var(--v5)"
                                : "white",
                          color: encontrada
                            ? "white"
                            : error && enSel
                              ? "#C0392B"
                              : "var(--n2)",
                          boxShadow: encontrada ? "none" : "0 1px 4px rgba(0,0,0,.06)",
                          transition: "background .15s, color .15s",
                        } as React.CSSProperties}
                      >
                        {celda.letra}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Lista de palabras */}
            <div style={{
              background: "white", borderRadius: 20, padding: "24px 28px",
              border: "1.5px solid #E8EDE9", width: "100%", boxSizing: "border-box",
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
                Palabras a encontrar — {encontradas.length}/{PALABRAS.length}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {PALABRAS.map((p, i) => (
                  <span key={p} style={{
                    fontSize: 17, fontWeight: 700,
                    color: encontradas.includes(i) ? "var(--v3)" : "var(--n2)",
                    textDecoration: encontradas.includes(i) ? "line-through" : "none",
                    opacity: encontradas.includes(i) ? 0.5 : 1,
                    transition: "all .3s",
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <button onClick={reiniciar} style={{
              background: "transparent", color: "var(--gris)", border: "1.5px solid #D4DED6",
              borderRadius: 50, padding: "10px 24px", fontSize: 15, cursor: "pointer",
            }}>
              Nueva sopa
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
