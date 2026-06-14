"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { nombre },
      },
    });

    if (error) {
      setError("Hubo un problema. Intenta de nuevo.");
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--crema)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "DM Sans, sans-serif", padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 36, fontWeight: 700, color: "var(--v2)",
            }}>
              LongViv<span style={{ color: "var(--d2)" }}>IA</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--gris)", marginTop: 4 }}>
              Para una vida larga y activa.
            </div>
          </a>
        </div>

        {sent ? (
          <div style={{
            background: "white", borderRadius: 24, padding: "48px 40px",
            textAlign: "center", boxShadow: "0 4px 24px rgba(27,94,59,.08)",
            border: "1.5px solid var(--v5)",
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🌿</div>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 28, color: "var(--n2)", marginBottom: 12,
            }}>
              ¡Bienvenido, {nombre}!
            </h2>
            <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.7 }}>
              Te enviamos un enlace de acceso a<br />
              <strong style={{ color: "var(--v2)" }}>{email}</strong>
            </p>
            <p style={{ fontSize: 14, color: "var(--gris)", marginTop: 16 }}>
              Haz clic en el enlace para entrar a tu plataforma.
            </p>
          </div>
        ) : (
          <div style={{
            background: "white", borderRadius: 24, padding: "48px 40px",
            boxShadow: "0 4px 24px rgba(27,94,59,.08)",
            border: "1.5px solid var(--v5)",
          }}>
            {/* Badge gratis */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--v6)", border: "2px solid var(--v5)",
              color: "var(--v2)", padding: "6px 16px", borderRadius: 50,
              fontSize: 13, fontWeight: 700, marginBottom: 20,
            }}>
              🆓 100% gratuito para siempre
            </div>

            <h1 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 32, color: "var(--n2)", marginBottom: 8,
            }}>
              Empieza tu prime
            </h1>
            <p style={{ fontSize: 16, color: "var(--gris)", marginBottom: 32, lineHeight: 1.6 }}>
              Sin contraseña. Solo tu nombre y correo — y ya estás dentro.
            </p>

            <form onSubmit={handleRegistro} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: "var(--n2)", marginBottom: 8 }}>
                  Tu nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="María"
                  required
                  style={{
                    width: "100%", padding: "16px 20px",
                    borderRadius: 50, border: "2px solid var(--v5)",
                    fontSize: 17, fontFamily: "DM Sans, sans-serif",
                    outline: "none", background: "var(--v6)",
                    color: "var(--n2)", boxSizing: "border-box",
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--v3)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--v5)"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 15, fontWeight: 600, color: "var(--n2)", marginBottom: 8 }}>
                  Tu correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.cl"
                  required
                  style={{
                    width: "100%", padding: "16px 20px",
                    borderRadius: 50, border: "2px solid var(--v5)",
                    fontSize: 17, fontFamily: "DM Sans, sans-serif",
                    outline: "none", background: "var(--v6)",
                    color: "var(--n2)", boxSizing: "border-box",
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--v3)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--v5)"}
                />
              </div>

              {error && (
                <p style={{ color: "#c0392b", fontSize: 14 }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email || !nombre}
                style={{
                  padding: "18px",
                  background: loading || !email || !nombre ? "var(--v5)" : "var(--v2)",
                  color: "white", border: "none", borderRadius: 50,
                  fontSize: 18, fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "DM Sans, sans-serif",
                  transition: "background .2s",
                  minHeight: 58,
                }}
              >
                {loading ? "Enviando..." : "Crear cuenta gratis →"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 28, fontSize: 15, color: "var(--gris)" }}>
              ¿Ya tienes cuenta?{" "}
              <a href="/login" style={{ color: "var(--v2)", fontWeight: 600, textDecoration: "none" }}>
                Ingresar
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
