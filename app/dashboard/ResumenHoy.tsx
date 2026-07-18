"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";

type Medicamento = {
  id: string;
  nombre: string;
  dosis: string;
  horarios: string[];
};

type Toma = {
  medicamento_id: string;
  horario: string;
  ingerido: boolean;
  marcado_en: string | null;
};

type Cita = {
  id: string;
  titulo: string;
  fecha: string;
  proveedor: string | null;
  confirmado: boolean;
};

type DosisItem = {
  medicamento_id: string;
  nombre: string;
  dosis: string;
  horario: string;
  ingerido: boolean;
  estado: "ingerido" | "proxima" | "pendiente" | "atrasada";
};

function horaAMinutos(h: string): number {
  const [hh, mm] = h.split(":").map(Number);
  return hh * 60 + mm;
}

function minutosActuales(): number {
  const ahora = new Date();
  return ahora.getHours() * 60 + ahora.getMinutes();
}

function horaDisplay(iso: string) {
  return new Date(iso).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
}

function cuentaRegresiva(horario: string): string {
  const ahoraMin = minutosActuales();
  const citaMin = horaAMinutos(horario);
  const diff = citaMin - ahoraMin;
  if (diff <= 0) return "";
  if (diff < 60) return `en ${diff} min`;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return m > 0 ? `en ${h} h ${m} min` : `en ${h} h`;
}

function estadoDosis(horario: string, ingerido: boolean): DosisItem["estado"] {
  if (ingerido) return "ingerido";
  const ahoraMin = minutosActuales();
  const citaMin = horaAMinutos(horario);
  const diff = ahoraMin - citaMin; // positivo = ya pasó
  if (diff < 0) return "proxima";
  if (diff <= 60) return "pendiente";
  return "atrasada";
}

export default function ResumenHoy() {
  const [dosis, setDosis] = useState<DosisItem[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [marcando, setMarcando] = useState<string | null>(null);
  const supabase = createClient();

  const fechaHoy = new Date().toISOString().slice(0, 10);

  const cargar = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    setUserId(user.id);

    // Medicamentos activos
    const { data: meds } = await supabase
      .from("medicamentos")
      .select("id, nombre, dosis, horarios")
      .eq("user_id", user.id)
      .eq("activo", true);

    // Tomas de hoy
    const { data: tomas } = await supabase
      .from("tomas_medicamento")
      .select("medicamento_id, horario, ingerido, marcado_en")
      .eq("user_id", user.id)
      .eq("fecha", fechaHoy);

    const tomasMap = new Map<string, Toma>();
    for (const t of tomas ?? []) {
      tomasMap.set(`${t.medicamento_id}__${t.horario}`, t);
    }

    const dosisItems: DosisItem[] = [];
    for (const med of meds ?? []) {
      for (const horario of med.horarios) {
        const toma = tomasMap.get(`${med.id}__${horario}`);
        const ingerido = toma?.ingerido ?? false;
        dosisItems.push({
          medicamento_id: med.id,
          nombre: med.nombre,
          dosis: med.dosis,
          horario,
          ingerido,
          estado: estadoDosis(horario, ingerido),
        });
      }
    }
    dosisItems.sort((a, b) => horaAMinutos(a.horario) - horaAMinutos(b.horario));

    // Citas de hoy
    const inicioHoy = `${fechaHoy}T00:00:00`;
    const finHoy    = `${fechaHoy}T23:59:59`;
    const { data: citasHoy } = await supabase
      .from("agenda")
      .select("id, titulo, fecha, proveedor, confirmado")
      .eq("user_id", user.id)
      .gte("fecha", inicioHoy)
      .lte("fecha", finHoy)
      .order("fecha", { ascending: true });

    setDosis(dosisItems);
    setCitas((citasHoy as Cita[]) ?? []);
    setLoading(false);
  }, [fechaHoy]);

  useEffect(() => { cargar(); }, [cargar]);

  // Refrescar estado cada minuto para actualizar estados proxima/pendiente/atrasada
  useEffect(() => {
    const interval = setInterval(() => {
      setDosis(prev => prev.map(d => ({
        ...d,
        estado: estadoDosis(d.horario, d.ingerido),
      })));
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  async function marcarIngerido(d: DosisItem) {
    if (!userId) return;
    const key = `${d.medicamento_id}__${d.horario}`;
    setMarcando(key);
    await supabase.from("tomas_medicamento").upsert({
      medicamento_id: d.medicamento_id,
      user_id: userId,
      fecha: fechaHoy,
      horario: d.horario,
      ingerido: true,
      marcado_en: new Date().toISOString(),
    }, { onConflict: "medicamento_id,fecha,horario" });
    setMarcando(null);
    cargar();
  }

  if (loading) return null;

  const sinPendientes = dosis.length === 0 && citas.length === 0;
  const totalDosis = dosis.length;
  const ingeridos = dosis.filter(d => d.ingerido).length;

  return (
    <div style={{
      background: "white", borderRadius: 24, padding: "28px 28px 24px",
      border: "1.5px solid var(--v5)", boxShadow: "0 4px 20px rgba(27,94,59,.08)",
      marginBottom: 32,
    }}>
      {/* Encabezado */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
            {new Date().toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 700, color: "var(--n2)", margin: 0 }}>
            Resumen de hoy
          </h2>
        </div>
        {totalDosis > 0 && (
          <div style={{ fontSize: 14, fontWeight: 600, color: ingeridos === totalDosis ? "var(--v3)" : "var(--gris)", background: ingeridos === totalDosis ? "var(--v6)" : "#F5F5F5", borderRadius: 20, padding: "6px 14px" }}>
            {ingeridos} de {totalDosis} ingeridos hoy
          </div>
        )}
      </div>

      {/* Sin pendientes */}
      {sinPendientes && (
        <div style={{ textAlign: "center", padding: "24px 0", color: "var(--gris)", fontSize: 17 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--v4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", margin: "0 auto 12px" }}>
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Sin pendientes por hoy
        </div>
      )}

      {/* Medicamentos */}
      {dosis.length > 0 && (
        <div style={{ marginBottom: citas.length > 0 ? 20 : 0 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
            Medicamentos
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {dosis.map(d => (
              <DosisFila
                key={`${d.medicamento_id}__${d.horario}`}
                dosis={d}
                onMarcar={() => marcarIngerido(d)}
                marcando={marcando === `${d.medicamento_id}__${d.horario}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Citas del día */}
      {citas.length > 0 && (
        <div>
          {dosis.length > 0 && <div style={{ height: 1, background: "var(--v5)", margin: "16px 0" }} />}
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
            Citas de hoy
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {citas.map(c => {
              const horaStr = horaDisplay(c.fecha);
              const regresiva = cuentaRegresiva(horaStr.slice(0, 5));
              return (
                <div key={c.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px", borderRadius: 14,
                  background: "var(--v6)", border: "1px solid var(--v5)",
                  flexWrap: "wrap", gap: 8,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "var(--n2)" }}>{c.titulo}</span>
                    {c.proveedor && <span style={{ fontSize: 13, color: "var(--gris)", marginLeft: 8 }}>· {c.proveedor}</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--v2)" }}>{horaStr}</span>
                    {regresiva && <span style={{ fontSize: 12, color: "var(--gris)" }}>{regresiva}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function DosisFila({ dosis: d, onMarcar, marcando }: {
  dosis: DosisItem;
  onMarcar: () => void;
  marcando: boolean;
}) {
  const colores = {
    ingerido:  { bg: "var(--v6)",  border: "var(--v5)",  texto: "var(--v3)" },
    proxima:   { bg: "#F9F9F9",    border: "#E8EDE9",    texto: "var(--gris)" },
    pendiente: { bg: "var(--d4)",  border: "var(--d3)",  texto: "var(--n2)" },
    atrasada:  { bg: "#FEF9EC",    border: "#F5D48A",    texto: "#92600A" },
  };
  const c = colores[d.estado];

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px", borderRadius: 14,
      background: c.bg, border: `1px solid ${c.border}`,
      flexWrap: "wrap", gap: 8,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--n2)" }}>{d.nombre}</span>
          <span style={{ fontSize: 13, color: "var(--gris)" }}>{d.dosis}</span>
        </div>
        <div style={{ fontSize: 13, color: c.texto, marginTop: 2, fontWeight: d.estado === "atrasada" ? 700 : 400 }}>
          {d.horario}
          {d.estado === "ingerido" && " · ingerido"}
          {d.estado === "proxima" && ` · ${cuentaRegresiva(d.horario)}`}
          {d.estado === "atrasada" && " · sin ingerir"}
        </div>
      </div>
      {(d.estado === "pendiente" || d.estado === "atrasada") && (
        <button
          onClick={onMarcar}
          disabled={marcando}
          style={{
            background: d.estado === "atrasada" ? "#F5D48A" : "var(--v2)",
            color: d.estado === "atrasada" ? "#92600A" : "white",
            border: "none", borderRadius: 50,
            padding: "8px 16px", fontSize: 13, fontWeight: 700,
            cursor: marcando ? "not-allowed" : "pointer",
            whiteSpace: "nowrap", flexShrink: 0,
          }}
        >
          {marcando ? "..." : "Marcar ingerido"}
        </button>
      )}
      {d.estado === "ingerido" && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--v3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
    </div>
  );
}
