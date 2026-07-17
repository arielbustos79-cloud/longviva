"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import OliveBranch from "@/components/OliveBranch";

type Medicamento = {
  id: string;
  nombre: string;
  dosis: string;
  horarios: string[];
  activo: boolean;
};

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Medicamento | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState<string | null>(null);
  const [form, setForm] = useState({ nombre: "", dosis: "", horarios: ["08:00"] });
  const router = useRouter();
  const supabase = createClient();

  const cargar = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { data } = await supabase
      .from("medicamentos")
      .select("*")
      .eq("user_id", user.id)
      .order("nombre", { ascending: true });
    setMedicamentos((data as Medicamento[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  function abrirNuevo() {
    setEditando(null);
    setForm({ nombre: "", dosis: "", horarios: ["08:00"] });
    setMostrarForm(true);
    setTimeout(() => document.getElementById("campo-nombre")?.focus(), 100);
  }

  function abrirEditar(m: Medicamento) {
    setEditando(m);
    setForm({ nombre: m.nombre, dosis: m.dosis, horarios: m.horarios.length > 0 ? m.horarios : ["08:00"] });
    setMostrarForm(true);
  }

  function agregarHorario() {
    setForm(f => ({ ...f, horarios: [...f.horarios, "12:00"] }));
  }

  function quitarHorario(i: number) {
    if (form.horarios.length === 1) return;
    setForm(f => ({ ...f, horarios: f.horarios.filter((_, idx) => idx !== i) }));
  }

  function cambiarHorario(i: number, val: string) {
    setForm(f => ({ ...f, horarios: f.horarios.map((h, idx) => idx === i ? val : h) }));
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.dosis || form.horarios.length === 0) return;
    setGuardando(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const horariosSorted = [...form.horarios].sort();
    const payload = { nombre: form.nombre, dosis: form.dosis, horarios: horariosSorted };

    if (editando) {
      await supabase.from("medicamentos").update(payload).eq("id", editando.id);
    } else {
      await supabase.from("medicamentos").insert({ ...payload, user_id: user.id, activo: true });
    }
    setGuardando(false);
    setMostrarForm(false);
    cargar();
  }

  async function toggleActivo(m: Medicamento) {
    await supabase.from("medicamentos").update({ activo: !m.activo }).eq("id", m.id);
    cargar();
  }

  async function eliminar(id: string) {
    setEliminando(id);
    await supabase.from("medicamentos").delete().eq("id", id);
    setEliminando(null);
    cargar();
  }

  const activos  = medicamentos.filter(m => m.activo);
  const inactivos = medicamentos.filter(m => !m.activo);

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <p style={{ color: "var(--gris)", fontSize: 18 }}>Cargando medicamentos...</p>
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
              Mis medicamentos
            </h1>
          </div>
          <button
            onClick={abrirNuevo}
            style={{ background: "var(--v2)", color: "white", border: "none", borderRadius: 50, padding: "14px 28px", fontSize: 17, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            + Agregar
          </button>
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div style={{ background: "white", borderRadius: 24, padding: "32px 28px", marginBottom: 32, boxShadow: "0 8px 32px rgba(27,94,59,.12)", border: "1.5px solid var(--v5)" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 700, color: "var(--n2)", marginBottom: 24 }}>
              {editando ? "Editar medicamento" : "Nuevo medicamento"}
            </h2>
            <form onSubmit={guardar} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={labelStyle}>Nombre del medicamento *</label>
                <input id="campo-nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} required placeholder="Ej: Enalapril" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Dosis *</label>
                <input value={form.dosis} onChange={e => setForm(f => ({ ...f, dosis: e.target.value }))} required placeholder="Ej: 10mg — 1 comprimido" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Horarios de toma *</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {form.horarios.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input
                        type="time"
                        value={h}
                        onChange={e => cambiarHorario(i, e.target.value)}
                        style={{ ...inputStyle, maxWidth: 160 }}
                      />
                      {form.horarios.length > 1 && (
                        <button type="button" onClick={() => quitarHorario(i)} style={{ background: "transparent", border: "1.5px solid #FDECEA", color: "#C0392B", borderRadius: 50, padding: "8px 14px", fontSize: 14, cursor: "pointer" }}>
                          Quitar
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={agregarHorario} style={{ alignSelf: "flex-start", background: "var(--v6)", color: "var(--v2)", border: "1.5px solid var(--v5)", borderRadius: 50, padding: "10px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    + Agregar horario
                  </button>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--gris)", background: "var(--d4)", border: "1px solid var(--d3)", borderRadius: 12, padding: "12px 16px", margin: 0 }}>
                💊 Recibirás un recordatorio por WhatsApp en cada horario configurado.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="submit" disabled={guardando} style={{ background: "var(--v2)", color: "white", border: "none", borderRadius: 50, padding: "14px 32px", fontSize: 17, fontWeight: 700, cursor: "pointer", flex: 1 }}>
                  {guardando ? "Guardando..." : editando ? "Guardar cambios" : "Agregar medicamento"}
                </button>
                <button type="button" onClick={() => setMostrarForm(false)} style={{ background: "transparent", color: "var(--gris)", border: "1.5px solid #D4DED6", borderRadius: 50, padding: "14px 24px", fontSize: 17, cursor: "pointer" }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sin medicamentos */}
        {medicamentos.length === 0 && !mostrarForm && (
          <div style={{ textAlign: "center", padding: "64px 24px", background: "white", borderRadius: 24, border: "1.5px solid var(--v5)" }}>
            <OliveBranch size={48} />
            <p style={{ fontSize: 20, color: "var(--gris)", marginTop: 20 }}>Aún no tienes medicamentos registrados.</p>
            <button onClick={abrirNuevo} style={{ marginTop: 24, background: "var(--v2)", color: "white", border: "none", borderRadius: 50, padding: "14px 32px", fontSize: 17, fontWeight: 700, cursor: "pointer" }}>
              + Agregar tu primer medicamento
            </button>
          </div>
        )}

        {/* Activos */}
        {activos.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--v3)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Activos</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {activos.map(m => <MedCard key={m.id} med={m} onEdit={abrirEditar} onDelete={eliminar} onToggle={toggleActivo} eliminando={eliminando} />)}
            </div>
          </div>
        )}

        {/* Inactivos */}
        {inactivos.length > 0 && (
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--gris)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Inactivos</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity: 0.6 }}>
              {inactivos.map(m => <MedCard key={m.id} med={m} onEdit={abrirEditar} onDelete={eliminar} onToggle={toggleActivo} eliminando={eliminando} />)}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function MedCard({ med, onEdit, onDelete, onToggle, eliminando }: {
  med: Medicamento;
  onEdit: (m: Medicamento) => void;
  onDelete: (id: string) => void;
  onToggle: (m: Medicamento) => void;
  eliminando: string | null;
}) {
  const [confirmarElim, setConfirmarElim] = useState(false);

  return (
    <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", border: `1.5px solid ${med.activo ? "var(--v5)" : "#E8EDE9"}`, boxShadow: "0 2px 8px rgba(27,94,59,.06)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: "0 0 4px", fontFamily: "Cormorant Garamond, serif" }}>
            💊 {med.nombre}
          </h3>
          <p style={{ fontSize: 16, color: "var(--gris)", margin: "0 0 10px" }}>{med.dosis}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {med.horarios.map(h => (
              <span key={h} style={{ fontSize: 14, fontWeight: 700, background: "var(--v6)", color: "var(--v2)", borderRadius: 20, padding: "4px 14px", border: "1px solid var(--v5)" }}>
                🕐 {h}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
        <button onClick={() => onToggle(med)} style={{ fontSize: 14, fontWeight: 600, background: med.activo ? "var(--v6)" : "transparent", color: med.activo ? "var(--v3)" : "var(--gris)", border: `1.5px solid ${med.activo ? "var(--v5)" : "#D4DED6"}`, borderRadius: 50, padding: "8px 18px", cursor: "pointer" }}>
          {med.activo ? "✓ Activo" : "Reactivar"}
        </button>
        <button onClick={() => onEdit(med)} style={{ fontSize: 14, fontWeight: 600, background: "transparent", color: "var(--v2)", border: "1.5px solid var(--v5)", borderRadius: 50, padding: "8px 18px", cursor: "pointer" }}>
          Editar
        </button>
        {!confirmarElim ? (
          <button onClick={() => setConfirmarElim(true)} style={{ fontSize: 14, fontWeight: 600, background: "transparent", color: "#C0392B", border: "1.5px solid #FDECEA", borderRadius: 50, padding: "8px 18px", cursor: "pointer" }}>
            Eliminar
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "var(--gris)" }}>¿Confirmar?</span>
            <button onClick={() => onDelete(med.id)} disabled={eliminando === med.id} style={{ fontSize: 14, fontWeight: 700, background: "#C0392B", color: "white", border: "none", borderRadius: 50, padding: "8px 16px", cursor: "pointer" }}>
              {eliminando === med.id ? "..." : "Sí, eliminar"}
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
