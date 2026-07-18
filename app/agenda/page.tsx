"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import OliveBranch from "@/components/OliveBranch";
import { exportarCita } from "@/lib/generarIcs";

type Cita = {
  id: string;
  titulo: string;
  tipo: string;
  fecha: string;
  proveedor: string | null;
  notas: string | null;
  confirmado: boolean;
};

const TIPOS = [
  { value: "medica",        label: "Médica",        activo: true },
  { value: "otro",          label: "Otro",           activo: true },
  { value: "telemedicina",  label: "Telemedicina",   activo: false },
  { value: "tour",          label: "Tour",           activo: false },
];

const TIPO_LABEL: Record<string, string> = {
  medica: "Médica", otro: "Otro", telemedicina: "Telemedicina", tour: "Tour",
};

const TIPO_COLOR: Record<string, string> = {
  medica: "var(--v2)", otro: "var(--gris)", telemedicina: "var(--v3)", tour: "var(--d2)",
};

function formatFecha(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) +
    " a las " + d.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
}

function esPasada(iso: string) {
  return new Date(iso) < new Date();
}

export default function AgendaPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Cita | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState<string | null>(null);
  const [form, setForm] = useState({ titulo: "", tipo: "medica", fecha: "", hora: "", proveedor: "", notas: "" });
  const router = useRouter();
  const supabase = createClient();

  const cargar = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { data } = await supabase
      .from("agenda")
      .select("*")
      .eq("user_id", user.id)
      .order("fecha", { ascending: true });
    setCitas((data as Cita[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  function abrirNueva() {
    setEditando(null);
    setForm({ titulo: "", tipo: "medica", fecha: "", hora: "", proveedor: "", notas: "" });
    setMostrarForm(true);
    setTimeout(() => document.getElementById("campo-titulo")?.focus(), 100);
  }

  function abrirEditar(cita: Cita) {
    const d = new Date(cita.fecha);
    const fechaLocal = d.toISOString().slice(0, 10);
    const horaLocal = d.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false });
    setEditando(cita);
    setForm({ titulo: cita.titulo, tipo: cita.tipo, fecha: fechaLocal, hora: horaLocal, proveedor: cita.proveedor ?? "", notas: cita.notas ?? "" });
    setMostrarForm(true);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titulo || !form.fecha || !form.hora) return;
    setGuardando(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const fechaISO = new Date(`${form.fecha}T${form.hora}:00`).toISOString();
    const payload = { titulo: form.titulo, tipo: form.tipo, fecha: fechaISO, proveedor: form.proveedor || null, notas: form.notas || null };

    if (editando) {
      const { error } = await supabase.from("agenda").update(payload).eq("id", editando.id);
      if (error) { setGuardando(false); return; }
    } else {
      const { error } = await supabase.from("agenda").insert({ ...payload, user_id: user.id, confirmado: false });
      if (error) { setGuardando(false); return; }
    }
    setGuardando(false);
    setMostrarForm(false);
    cargar();
  }

  async function toggleConfirmado(cita: Cita) {
    await supabase.from("agenda").update({ confirmado: !cita.confirmado }).eq("id", cita.id);
    cargar();
  }

  async function eliminar(id: string) {
    setEliminando(id);
    await supabase.from("agenda").delete().eq("id", id);
    setEliminando(null);
    cargar();
  }

  const proximas = citas.filter(c => !esPasada(c.fecha));
  const pasadas  = citas.filter(c => esPasada(c.fecha));

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <p style={{ color: "var(--gris)", fontSize: 18 }}>Cargando agenda...</p>
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
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: 13, color: "var(--v3)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Gestión de salud</p>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "var(--n2)", margin: 0 }}>
              Mi agenda
            </h1>
          </div>
          <button
            onClick={abrirNueva}
            style={{ background: "var(--v2)", color: "white", border: "none", borderRadius: 50, padding: "14px 28px", fontSize: 17, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            + Nueva cita
          </button>
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div style={{ background: "white", borderRadius: 24, padding: "32px 28px", marginBottom: 32, boxShadow: "0 8px 32px rgba(27,94,59,.12)", border: "1.5px solid var(--v5)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 700, color: "var(--n2)", marginBottom: 24 }}>
              {editando ? "Editar cita" : "Nueva cita"}
            </h2>
            <form onSubmit={guardar} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={labelStyle}>Título *</label>
                <input id="campo-titulo" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} required placeholder="Ej: Control con cardiólogo" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Tipo</label>
                <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} style={inputStyle}>
                  {TIPOS.map(t => (
                    <option key={t.value} value={t.value} disabled={!t.activo}>
                      {t.label}{!t.activo ? " (Próximamente)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Fecha *</label>
                  <input type="date" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Hora *</label>
                  <input type="time" value={form.hora} onChange={e => setForm(f => ({ ...f, hora: e.target.value }))} required style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Lugar / Proveedor</label>
                <input value={form.proveedor} onChange={e => setForm(f => ({ ...f, proveedor: e.target.value }))} placeholder="Ej: Clínica Las Condes, Dr. Soto" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Notas (opcional)</label>
                <textarea value={form.notas} onChange={e => setForm(f => ({ ...f, notas: e.target.value }))} placeholder="Ej: Llevar exámenes previos" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="submit" disabled={guardando} style={{ background: "var(--v2)", color: "white", border: "none", borderRadius: 50, padding: "14px 32px", fontSize: 17, fontWeight: 700, cursor: "pointer", flex: 1 }}>
                  {guardando ? "Guardando..." : editando ? "Guardar cambios" : "Agregar cita"}
                </button>
                <button type="button" onClick={() => setMostrarForm(false)} style={{ background: "transparent", color: "var(--gris)", border: "1.5px solid #D4DED6", borderRadius: 50, padding: "14px 24px", fontSize: 17, cursor: "pointer" }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sin citas */}
        {citas.length === 0 && !mostrarForm && (
          <div style={{ textAlign: "center", padding: "64px 24px", background: "white", borderRadius: 24, border: "1.5px solid var(--v5)" }}>
            <OliveBranch size={48} />
            <p style={{ fontSize: 20, color: "var(--gris)", marginTop: 20 }}>Aún no tienes citas registradas.</p>
            <button onClick={abrirNueva} style={{ marginTop: 24, background: "var(--v2)", color: "white", border: "none", borderRadius: 50, padding: "14px 32px", fontSize: 17, fontWeight: 700, cursor: "pointer" }}>
              + Agregar tu primera cita
            </button>
          </div>
        )}

        {/* Nota exportación */}
        {citas.length > 0 && (
          <p style={{ fontSize: 13, color: "var(--gris)", marginBottom: 24, lineHeight: 1.6 }}>
            💡 Usa "Agregar a mi calendario" para recibir la alarma nativa de tu teléfono (Google Calendar, iPhone, Outlook). Si editas o eliminas una cita después de exportarla, el evento en tu calendario no se actualiza automáticamente.
          </p>
        )}

        {/* Próximas */}
        {proximas.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Próximas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {proximas.map(c => <CitaCard key={c.id} cita={c} onEdit={abrirEditar} onDelete={eliminar} onToggle={toggleConfirmado} eliminando={eliminando} />)}
            </div>
          </div>
        )}

        {/* Pasadas */}
        {pasadas.length > 0 && (
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Anteriores</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity: 0.65 }}>
              {pasadas.map(c => <CitaCard key={c.id} cita={c} onEdit={abrirEditar} onDelete={eliminar} onToggle={toggleConfirmado} eliminando={eliminando} />)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function CitaCard({ cita, onEdit, onDelete, onToggle, eliminando }: {
  cita: Cita;
  onEdit: (c: Cita) => void;
  onDelete: (id: string) => void;
  onToggle: (c: Cita) => void;
  eliminando: string | null;
}) {
  const [confirmarElim, setConfirmarElim] = useState(false);

  return (
    <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1.5px solid ${cita.confirmado ? "var(--v5)" : "#E8EDE9"}`, boxShadow: "0 2px 8px rgba(27,94,59,.06)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, background: TIPO_COLOR[cita.tipo] ?? "var(--gris)", color: "white", borderRadius: 20, padding: "2px 10px", letterSpacing: .5, textTransform: "uppercase" }}>
              {TIPO_LABEL[cita.tipo] ?? cita.tipo}
            </span>
            {cita.confirmado && (
              <span style={{ fontSize: 11, fontWeight: 700, background: "var(--v6)", color: "var(--v3)", borderRadius: 20, padding: "2px 10px", border: "1px solid var(--v5)" }}>✓ Confirmada</span>
            )}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--n2)", margin: "0 0 4px", fontFamily: "Cormorant Garamond, serif" }}>{cita.titulo}</h3>
          <p style={{ fontSize: 15, color: "var(--gris)", margin: "0 0 4px" }}>{formatFecha(cita.fecha)}</p>
          {cita.proveedor && <p style={{ fontSize: 14, color: "var(--v3)", margin: 0 }}>📍 {cita.proveedor}</p>}
          {cita.notas && <p style={{ fontSize: 14, color: "var(--gris)", marginTop: 6, fontStyle: "italic" }}>{cita.notas}</p>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
        <button onClick={() => onToggle(cita)} style={{ fontSize: 14, fontWeight: 600, background: cita.confirmado ? "var(--v6)" : "transparent", color: cita.confirmado ? "var(--v3)" : "var(--gris)", border: `1.5px solid ${cita.confirmado ? "var(--v5)" : "#D4DED6"}`, borderRadius: 50, padding: "8px 18px", cursor: "pointer" }}>
          {cita.confirmado ? "✓ Confirmada" : "Marcar confirmada"}
        </button>
        <button onClick={() => exportarCita(cita)} style={{ fontSize: 14, fontWeight: 600, background: "transparent", color: "var(--v2)", border: "1.5px solid var(--v5)", borderRadius: 50, padding: "8px 18px", cursor: "pointer" }}>
          📅 Agregar a mi calendario
        </button>
        <button onClick={() => onEdit(cita)} style={{ fontSize: 14, fontWeight: 600, background: "transparent", color: "var(--v2)", border: "1.5px solid var(--v5)", borderRadius: 50, padding: "8px 18px", cursor: "pointer" }}>
          Editar
        </button>
        {!confirmarElim ? (
          <button onClick={() => setConfirmarElim(true)} style={{ fontSize: 14, fontWeight: 600, background: "transparent", color: "#C0392B", border: "1.5px solid #FDECEA", borderRadius: 50, padding: "8px 18px", cursor: "pointer" }}>
            Eliminar
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "var(--gris)" }}>¿Confirmar?</span>
            <button onClick={() => onDelete(cita.id)} disabled={eliminando === cita.id} style={{ fontSize: 14, fontWeight: 700, background: "#C0392B", color: "white", border: "none", borderRadius: 50, padding: "8px 16px", cursor: "pointer" }}>
              {eliminando === cita.id ? "..." : "Sí, eliminar"}
            </button>
            <button onClick={() => setConfirmarElim(false)} style={{ fontSize: 14, background: "transparent", color: "var(--gris)", border: "1.5px solid #D4DED6", borderRadius: 50, padding: "8px 14px", cursor: "pointer" }}>
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: 15, fontWeight: 600, color: "var(--n2)", marginBottom: 8 };
const inputStyle: React.CSSProperties = { width: "100%", padding: "14px 16px", borderRadius: 14, border: "1.5px solid var(--v5)", fontSize: 17, fontFamily: "DM Sans, sans-serif", outline: "none", background: "var(--v6)", color: "var(--n2)", boxSizing: "border-box" };
