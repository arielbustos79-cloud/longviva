"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import { PREVISION_OPTIONS, PREVISION_LABELS } from "@/lib/prevision";

export default function PerfilSalud() {
  const [previsionActual, setPrevisionActual] = useState<string | null>(null);
  const [seleccion, setSeleccion] = useState<string>("");
  const [consentido, setConsentido] = useState(false);
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data } = await supabase
        .from("profiles")
        .select("prevision")
        .eq("id", user.id)
        .single();
      setPrevisionActual(data?.prevision ?? null);
    }
    cargar();
  }, []);

  function abrirEdicion() {
    setSeleccion(previsionActual ?? "");
    setConsentido(false);
    setEditando(true);
  }

  async function guardar() {
    if (!userId || !consentido) return;
    setGuardando(true);
    await supabase
      .from("profiles")
      .update({ prevision: seleccion || null })
      .eq("id", userId);
    setPrevisionActual(seleccion || null);
    setGuardando(false);
    setEditando(false);
  }

  const label = previsionActual ? PREVISION_LABELS[previsionActual] : null;

  return (
    <div style={{
      background: "white", borderRadius: 20, padding: "20px 24px",
      border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)",
      marginBottom: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
            Mi previsión de salud
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, color: "var(--n2)", margin: 0 }}>
            {label ?? <span style={{ color: "var(--gris)", fontWeight: 400 }}>Sin registrar — te ayuda a encontrar los servicios correctos</span>}
          </p>
        </div>
        <button
          onClick={abrirEdicion}
          style={{ fontSize: 13, fontWeight: 600, background: "transparent", color: "var(--v2)", border: "1.5px solid var(--v5)", borderRadius: 50, padding: "7px 16px", cursor: "pointer" }}
        >
          {previsionActual ? "Cambiar" : "Registrar"}
        </button>
      </div>

      {editando && (
        <div style={{ marginTop: 20, borderTop: "1px solid var(--v5)", paddingTop: 20 }}>
          <p style={{ fontSize: 14, color: "var(--n2)", marginBottom: 14 }}>
            Selecciona tu previsión de salud:
          </p>

          <select
            value={seleccion}
            onChange={e => setSeleccion(e.target.value)}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid var(--v5)", fontSize: 15, fontFamily: "DM Sans, sans-serif", background: "var(--v6)", color: "var(--n2)", marginBottom: 16, boxSizing: "border-box" }}
          >
            <option value="">— Elige una opción —</option>
            {PREVISION_OPTIONS.map(group => (
              <optgroup key={group.group} label={group.group}>
                {group.items.map(item => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </optgroup>
            ))}
            <option value="">Sin previsión registrada</option>
          </select>

          {/* Consentimiento explícito */}
          <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 20 }}>
            <input
              type="checkbox"
              checked={consentido}
              onChange={e => setConsentido(e.target.checked)}
              style={{ marginTop: 2, width: 18, height: 18, accentColor: "var(--v2)", flexShrink: 0 }}
            />
            <span style={{ fontSize: 13, color: "var(--gris)", lineHeight: 1.6 }}>
              Autorizo a LongVivIA a guardar este dato para orientarme hacia los servicios de salud que corresponden a mi previsión. Puedo cambiarlo o eliminarlo en cualquier momento. Este dato se usa solo para personalizar mis recomendaciones, en conformidad con la Ley 19.628.
            </span>
          </label>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={guardar}
              disabled={!consentido || guardando}
              style={{
                background: consentido ? "var(--v2)" : "#D4DED6",
                color: "white", border: "none", borderRadius: 50,
                padding: "10px 24px", fontSize: 14, fontWeight: 700,
                cursor: consentido ? "pointer" : "not-allowed",
              }}
            >
              {guardando ? "Guardando..." : "Guardar con mi consentimiento"}
            </button>
            <button
              onClick={() => setEditando(false)}
              style={{ background: "transparent", color: "var(--gris)", border: "1.5px solid #D4DED6", borderRadius: 50, padding: "10px 18px", fontSize: 14, cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
