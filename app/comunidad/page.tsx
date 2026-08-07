"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import { COMUNAS_DATA, getComunaData } from "@/lib/comunidad";
import { HOSPITALES_PUBLICOS, CLINICAS_PRIVADAS } from "@/lib/hospitales";

const COMUNAS_LIST = COMUNAS_DATA.map(c => c.comuna).sort();

export default function ComunidadPage() {
  const [comunaSeleccionada, setComunaSeleccionada] = useState("");
  const [ciudadPerfil, setCiudadPerfil] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("ciudad")
        .eq("id", user.id)
        .single();
      if (data?.ciudad) {
        setCiudadPerfil(data.ciudad);
        // Pre-seleccionar si la ciudad del perfil está en la lista
        const match = COMUNAS_LIST.find(
          c => c.toLowerCase() === data.ciudad.toLowerCase()
        );
        if (match) setComunaSeleccionada(match);
      }
    }
    cargar();
  }, []);

  const programa = comunaSeleccionada ? getComunaData(comunaSeleccionada) : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <header style={{
        background: "var(--v2)", padding: "20px 32px",
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <a href="/dashboard" style={{ color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 14 }}>
          ← Volver
        </a>
        <div style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 28, fontWeight: 700, color: "white",
        }}>
          LongViv<span style={{ color: "var(--d2)" }}>IA</span>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>

        {/* Título */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--v2)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
            Comunidad
          </p>
          <h1 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "var(--n2)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 16px",
          }}>
            Talleres y actividades cerca de ti
          </h1>
          <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.7, margin: 0 }}>
            Cada municipio tiene su propia Oficina del Adulto Mayor con talleres gratuitos de arte, actividad física, tecnología, cocina y más. Selecciona tu comuna y te mostramos el programa que te corresponde.
          </p>
        </div>

        {/* Selector de comuna */}
        <div style={{
          background: "white", borderRadius: 20, padding: "28px 28px",
          border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)",
          marginBottom: 28,
        }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--n2)", marginBottom: 12 }}>
            ¿En qué comuna vives?
            {ciudadPerfil && !comunaSeleccionada && (
              <span style={{ fontWeight: 400, color: "var(--gris)", marginLeft: 8 }}>
                (tu perfil indica: {ciudadPerfil})
              </span>
            )}
          </label>
          <select
            value={comunaSeleccionada}
            onChange={e => setComunaSeleccionada(e.target.value)}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 12,
              border: "1.5px solid var(--v5)", fontSize: 16,
              fontFamily: "DM Sans, sans-serif", background: "var(--v6)",
              color: comunaSeleccionada ? "var(--n2)" : "var(--gris)",
              boxSizing: "border-box", cursor: "pointer",
            }}
          >
            <option value="">— Selecciona tu comuna —</option>
            {COMUNAS_LIST.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option disabled>──────────────</option>
            <option value="otra">Mi comuna no está en la lista</option>
          </select>
        </div>

        {/* Resultado: comuna en lista */}
        {programa && (
          <div style={{
            background: "white", borderRadius: 20, padding: "28px 28px",
            border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)",
            marginBottom: 28,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: "var(--v5)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--v2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--v2)", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
                  {comunaSeleccionada}
                </p>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: 0 }}>
                  {programa.nombre_programa}
                </h2>
              </div>
            </div>

            <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.7, marginBottom: programa.direccion || programa.nota ? 20 : 0 }}>
              {programa.descripcion}
            </p>

            {programa.direccion && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: "var(--gris)" }}>📍</span>
                <span style={{ fontSize: 14, color: "var(--gris)" }}>{programa.direccion}</span>
              </div>
            )}

            {programa.telefono && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: "var(--gris)" }}>📞</span>
                <span style={{ fontSize: 14, color: "var(--gris)" }}>{programa.telefono}</span>
              </div>
            )}

            {programa.correo && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: "var(--gris)" }}>✉️</span>
                <a
                  href={`mailto:${programa.correo}`}
                  style={{ fontSize: 14, color: "var(--v2)", textDecoration: "none" }}
                >
                  {programa.correo}
                </a>
              </div>
            )}

            {programa.nota && (
              <div style={{
                background: "var(--v6)", borderRadius: 12, padding: "12px 16px",
                marginBottom: 20, borderLeft: "3px solid var(--v3)",
              }}>
                <p style={{ fontSize: 14, color: "var(--n2)", margin: 0, lineHeight: 1.6 }}>
                  💡 {programa.nota}
                </p>
              </div>
            )}

            {programa.link && programa.tipo_link !== "PORTADA" && programa.tipo_link !== "DIDECO" && (
              <a
                href={programa.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "var(--v2)", color: "white",
                  padding: "12px 24px", borderRadius: 50,
                  fontSize: 14, fontWeight: 700, textDecoration: "none",
                  marginTop: 8,
                }}
              >
                Ver programa en el sitio municipal →
              </a>
            )}
            {programa.link && (programa.tipo_link === "PORTADA" || programa.tipo_link === "DIDECO") && (
              <a
                href={programa.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "var(--gris)", color: "white",
                  padding: "12px 24px", borderRadius: 50,
                  fontSize: 14, fontWeight: 700, textDecoration: "none",
                  marginTop: 8,
                }}
              >
                Sitio municipal →
              </a>
            )}
          </div>
        )}

        {/* Resultado: comuna no en lista */}
        {comunaSeleccionada === "otra" && (
          <div style={{
            background: "white", borderRadius: 20, padding: "28px 28px",
            border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)",
            marginBottom: 28,
          }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", marginBottom: 12 }}>
              Tu comuna también tiene programas
            </h2>
            <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.7, marginBottom: 20 }}>
              Todas las comunas de Chile cuentan con una Oficina del Adulto Mayor con talleres gratuitos. Aún no tenemos el detalle de la tuya — búscala directamente:
            </p>
            <a
              href="https://www.google.com/search?q=Oficina+del+Adulto+Mayor+mi+comuna+talleres"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "var(--v2)", color: "white",
                padding: "12px 24px", borderRadius: 50,
                fontSize: 14, fontWeight: 700, textDecoration: "none",
                marginBottom: 12,
              }}
            >
              Buscar mi Oficina del Adulto Mayor →
            </a>
            <p style={{ fontSize: 13, color: "var(--gris)", margin: "12px 0 0" }}>
              Tip: busca &quot;Oficina del Adulto Mayor + [nombre de tu comuna]&quot; para encontrar talleres y horarios.
            </p>
          </div>
        )}

        {/* SENAMA — sección complementaria */}
        <div style={{
          background: "white", borderRadius: 20, padding: "28px 28px",
          border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)",
          marginBottom: 28,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: "#F0F4FF",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A6FA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#4A6FA5", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
                Apoyo complementario
              </p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: 0 }}>
                SENAMA — Centros Diurnos Comunitarios
              </h2>
            </div>
          </div>

          <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.7, marginBottom: 16 }}>
            El Servicio Nacional del Adulto Mayor cuenta con Centros Diurnos Comunitarios para personas mayores con dependencia leve o moderada. Ofrecen acompañamiento más estructurado: actividad física, alimentación, talleres cognitivos y apoyo psicosocial.
          </p>

          <div style={{
            background: "#F5F7FB", borderRadius: 12, padding: "12px 16px",
            marginBottom: 20, borderLeft: "3px solid #4A6FA5",
          }}>
            <p style={{ fontSize: 14, color: "var(--n2)", margin: 0, lineHeight: 1.6 }}>
              💡 La inscripción requiere contacto directo con la oficina regional de SENAMA — no está disponible 100% en línea.
            </p>
          </div>

          <a
            href="https://www.senama.gob.cl"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#4A6FA5", color: "white",
              padding: "12px 24px", borderRadius: 50,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}
          >
            Ver programas en senama.gob.cl →
          </a>
        </div>

        {/* Hospitales y Clínicas RM */}
        <div style={{
          background: "white", borderRadius: 20, padding: "28px 28px",
          border: "1.5px solid var(--v5)", boxShadow: "0 2px 8px rgba(27,94,59,.06)",
          marginBottom: 28,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: "#FFF0F0",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <line x1="12" y1="8" x2="12" y2="14"/>
                <line x1="9" y1="11" x2="15" y2="11"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#C0392B", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
                Directorio RM
              </p>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, color: "var(--n2)", margin: 0 }}>
                Hospitales y clínicas principales
              </h2>
            </div>
          </div>

          <p style={{ fontSize: 15, color: "var(--gris)", lineHeight: 1.6, marginBottom: 24 }}>
            Directorio curado de los centros de mayor tamaño en la Región Metropolitana. Verifica horarios directamente con cada centro antes de ir.
          </p>

          {/* Red pública */}
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--n2)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
            Red pública
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {HOSPITALES_PUBLICOS.map((h) => (
              <div key={h.nombre} style={{
                background: "var(--v6)", borderRadius: 12, padding: "12px 16px",
                display: "flex", flexDirection: "column", gap: 2,
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--n2)" }}>{h.nombre}</span>
                <span style={{ fontSize: 13, color: "var(--gris)" }}>📍 {h.direccion}, {h.comuna}</span>
                <span style={{ fontSize: 13, color: "var(--gris)" }}>📞 {h.telefono}</span>
                {h.web && (
                  <a href={h.web} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--v2)", fontWeight: 700, textDecoration: "none" }}>
                    🔗 Sitio web →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Clínicas privadas */}
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--n2)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
            Clínicas privadas
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {CLINICAS_PRIVADAS.map((c) => (
              <div key={c.nombre} style={{
                background: "var(--v6)", borderRadius: 12, padding: "12px 16px",
                display: "flex", flexDirection: "column", gap: 2,
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--n2)" }}>{c.nombre}</span>
                <span style={{ fontSize: 13, color: "var(--gris)" }}>📍 {c.direccion}, {c.comuna}</span>
                <span style={{ fontSize: 13, color: "var(--gris)" }}>📞 {c.telefono}</span>
                {c.web && (
                  <a href={c.web} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--v2)", fontWeight: 700, textDecoration: "none" }}>
                    🔗 Sitio web →
                  </a>
                )}
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: "var(--gris)", margin: 0 }}>
            Datos verificados agosto 2026. Los teléfonos pueden cambiar — confirma antes de llamar.
          </p>
        </div>

        {/* Link al artículo */}
        <div style={{
          background: "var(--v5)", borderRadius: 20, padding: "24px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--v2)", margin: "0 0 4px", letterSpacing: 0.5 }}>
              Lectura recomendada
            </p>
            <p style={{ fontSize: 16, color: "var(--n2)", margin: 0, fontWeight: 500 }}>
              El café de los martes — por qué la vida social alarga la vida
            </p>
          </div>
          <a
            href="/articulos?categoria=vida_social"
            style={{
              color: "var(--v2)", fontWeight: 700, fontSize: 14,
              textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            Leer artículo →
          </a>
        </div>

      </main>
    </div>
  );
}
