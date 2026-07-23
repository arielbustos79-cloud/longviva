"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Cuando la PWA vuelve a primer plano (tras clic en magic link en el correo),
  // verificamos si ya hay sesión y redirigimos automáticamente al panel.
  useEffect(() => {
    if (!sent) return;
    const supabase = createClient();

    const handleVisibility = async () => {
      if (document.visibilityState !== "visible") return;
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.push("/dashboard");
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [sent, router]);

  async function handleCheckSession() {
    setChecking(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push("/dashboard");
    } else {
      setChecking(false);
      setError("Aún no detectamos el enlace. ¿Ya hiciste clic en el correo?");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
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
          /* Estado: email enviado */
          <div style={{
            background: "white", borderRadius: 24, padding: "48px 40px",
            textAlign: "center", boxShadow: "0 4px 24px rgba(27,94,59,.08)",
            border: "1.5px solid var(--v5)",
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>📬</div>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 28, color: "var(--n2)", marginBottom: 12,
            }}>
              Revisa tu correo
            </h2>
            <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.7 }}>
              Enviamos un enlace de acceso a<br />
              <strong style={{ color: "var(--v2)" }}>{email}</strong>
            </p>

            {/* Instrucción clave para PWA */}
            <div style={{
              background: "var(--v6)", borderRadius: 14,
              padding: "16px 20px", margin: "20px 0",
              border: "1px solid var(--v5)", textAlign: "left",
            }}>
              <p style={{ fontSize: 14, color: "var(--n2)", margin: 0, lineHeight: 1.7 }}>
                <strong>Cómo entrar:</strong><br />
                1. Abre el correo de LongVivIA<br />
                2. Haz clic en "Entrar a LongVivIA"<br />
                3. Vuelve aquí — entrarás directo a tu panel
              </p>
            </div>

            <button
              onClick={handleCheckSession}
              disabled={checking}
              style={{
                width: "100%", padding: "18px",
                background: checking ? "var(--v5)" : "var(--v2)",
                color: "white", border: "none", borderRadius: 50,
                fontSize: 17, fontWeight: 600,
                cursor: checking ? "not-allowed" : "pointer",
                fontFamily: "DM Sans, sans-serif",
                marginBottom: 12,
              }}
            >
              {checking ? "Verificando..." : "¿Ya hiciste clic? Entrar →"}
            </button>

            {error && (
              <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 12 }}>{error}</p>
            )}

            <button
              onClick={() => { setSent(false); setError(""); }}
              style={{
                background: "none", border: "none",
                color: "var(--v3)", fontSize: 14, cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Usar otro correo
            </button>
          </div>
        ) : (
          /* Formulario */
          <div style={{
            background: "white", borderRadius: 24, padding: "48px 40px",
            boxShadow: "0 4px 24px rgba(27,94,59,.08)",
            border: "1.5px solid var(--v5)",
          }}>
            <h1 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 32, color: "var(--n2)", marginBottom: 8,
            }}>
              Bienvenido de vuelta
            </h1>
            <p style={{ fontSize: 16, color: "var(--gris)", marginBottom: 36, lineHeight: 1.6 }}>
              Ingresa tu correo y te enviamos un enlace de acceso. Sin contraseña.
            </p>

            <form onSubmit={handleLogin}>
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
                  marginBottom: 12,
                  transition: "border-color .2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--v3)"}
                onBlur={(e) => e.target.style.borderColor = "var(--v5)"}
              />

              {error && (
                <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 12 }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                style={{
                  width: "100%", padding: "18px",
                  background: loading || !email ? "var(--v5)" : "var(--v2)",
                  color: "white", border: "none", borderRadius: 50,
                  fontSize: 18, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "DM Sans, sans-serif",
                  transition: "background .2s",
                  minHeight: 58,
                }}
              >
                {loading ? "Enviando..." : "Enviar enlace de acceso →"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 28, fontSize: 15, color: "var(--gris)" }}>
              ¿Primera vez?{" "}
              <a href="/registro" style={{ color: "var(--v2)", fontWeight: 600, textDecoration: "none" }}>
                Crear cuenta gratis
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
