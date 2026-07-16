"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import { logEvento } from "@/lib/logEvento";

// 6 pares de símbolos — naturaleza y bienestar
const SIMBOLOS = [
  { id: "sol",      label: "Sol",      svg: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> },
  { id: "hoja",     label: "Hoja",     svg: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 22c0 0 4-2 8-6s7-10 7-10-6 3-10 7S2 22 2 22z"/><path d="M2 22l8-8"/></svg> },
  { id: "ola",      label: "Mar",      svg: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/><path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/></svg> },
  { id: "montana",  label: "Montaña",  svg: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="3,20 12,4 21,20"/><polyline points="3,20 8,13 12,16 16,11 21,20"/></svg> },
  { id: "flor",     label: "Flor",     svg: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 000 6 3 3 0 000-6z"/><path d="M12 16a3 3 0 000 6 3 3 0 000-6z"/><path d="M2 12a3 3 0 006 0 3 3 0 00-6 0z"/><path d="M16 12a3 3 0 006 0 3 3 0 00-6 0z"/></svg> },
  { id: "pajarito", label: "Pájaro",   svg: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 6c0 0-3 1-5 3-1-3-4-5-7-4S4 9 5 12s5 5 8 4c1 3 4 5 7 4"/><path d="M6 10l-4 2"/></svg> },
];

type Carta = { id: string; simboloId: string; label: string; svg: React.ReactNode };

function crearTablero(): Carta[] {
  const cartas: Carta[] = [];
  SIMBOLOS.forEach((s, idx) => {
    cartas.push({ id: `${s.id}-a`, simboloId: s.id, label: s.label, svg: s.svg });
    cartas.push({ id: `${s.id}-b`, simboloId: s.id, label: s.label, svg: s.svg });
    void idx;
  });
  // Fisher-Yates shuffle
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
}

export default function MemoriaPage() {
  const [tablero, setTablero] = useState<Carta[]>([]);
  const [boca, setBoca] = useState<string[]>([]);       // ids volteadas esta vuelta
  const [parejas, setParejas] = useState<string[]>([]);  // simboloIds encontrados
  const [intentos, setIntentos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [ganado, setGanado] = useState(false);

  const reiniciar = useCallback(() => {
    setTablero(crearTablero());
    setBoca([]);
    setParejas([]);
    setIntentos(0);
    setBloqueado(false);
    setGanado(false);
  }, []);

  useEffect(() => { reiniciar(); }, [reiniciar]);

  useEffect(() => {
    if (parejas.length === SIMBOLOS.length && SIMBOLOS.length > 0) {
      setGanado(true);
      logEvento("juego_completado", { juego: "memoria", intentos });
    }
  }, [parejas, intentos]);

  function voltear(carta: Carta) {
    if (bloqueado) return;
    if (boca.includes(carta.id)) return;
    if (parejas.includes(carta.simboloId)) return;

    const nuevasBoca = [...boca, carta.id];
    setBoca(nuevasBoca);

    if (nuevasBoca.length === 2) {
      const [idA, idB] = nuevasBoca;
      const cartaA = tablero.find(c => c.id === idA)!;
      const cartaB = tablero.find(c => c.id === idB)!;
      setIntentos(i => i + 1);
      setBloqueado(true);

      if (cartaA.simboloId === cartaB.simboloId) {
        setParejas(p => [...p, cartaA.simboloId]);
        setBoca([]);
        setBloqueado(false);
      } else {
        setTimeout(() => { setBoca([]); setBloqueado(false); }, 1000);
      }
    }
  }

  function estaVisible(carta: Carta) {
    return boca.includes(carta.id) || parejas.includes(carta.simboloId);
  }

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

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 96px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, fontWeight: 700, color: "var(--n2)", margin: 0 }}>
            Memoria
          </h1>
          <span style={{ fontSize: 17, color: "var(--gris)" }}>
            Intentos: <strong style={{ color: "var(--v2)" }}>{intentos}</strong>
          </span>
        </div>
        <p style={{ fontSize: 17, color: "var(--gris)", marginBottom: 36 }}>
          Encuentra las 6 parejas. Toca dos cartas — si coinciden, quedan descubiertas.
        </p>

        {ganado ? (
          <div style={{
            background: "var(--v2)", borderRadius: 28, padding: "48px 36px", textAlign: "center",
            boxShadow: "0 16px 48px rgba(27,94,59,.25)",
          }}>
            <OliveBranch size={56} variant="light" />
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "white", margin: "20px 0 12px" }}>
              ¡Lo lograste!
            </h2>
            <p style={{ fontSize: 19, color: "rgba(255,255,255,.85)", marginBottom: 32 }}>
              Encontraste todas las parejas en <strong>{intentos}</strong> {intentos === 1 ? "intento" : "intentos"}. ¡Excelente memoria!
            </p>
            <button
              onClick={reiniciar}
              style={{
                background: "white", color: "var(--v2)", border: "none",
                borderRadius: 50, padding: "16px 36px", fontSize: 17, fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Jugar de nuevo →
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}>
            {tablero.map((carta) => {
              const visible = estaVisible(carta);
              const encontrada = parejas.includes(carta.simboloId);
              return (
                <button
                  key={carta.id}
                  onClick={() => voltear(carta)}
                  aria-label={visible ? carta.label : "Carta boca abajo"}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 18,
                    cursor: visible ? "default" : "pointer",
                    background: encontrada
                      ? "var(--v6)"
                      : visible
                        ? "white"
                        : "var(--v2)",
                    boxShadow: encontrada
                      ? "none"
                      : visible
                        ? "0 4px 16px rgba(27,94,59,.12)"
                        : "0 4px 12px rgba(27,94,59,.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background .25s, box-shadow .25s",
                    color: encontrada ? "var(--v3)" : visible ? "var(--v2)" : "rgba(255,255,255,.3)",
                    border: encontrada ? "2px solid var(--v5)" : visible ? "2px solid var(--v5)" : "2px solid transparent",
                  } as React.CSSProperties}
                >
                  {visible ? carta.svg : (
                    <OliveBranch size={22} variant="light" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {!ganado && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              onClick={reiniciar}
              style={{
                background: "transparent", color: "var(--gris)", border: "1.5px solid #D4DED6",
                borderRadius: 50, padding: "10px 24px", fontSize: 15, cursor: "pointer",
              }}
            >
              Reiniciar
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
