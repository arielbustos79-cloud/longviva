"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import OliveBranch from "@/components/OliveBranch";
import s from "./page.module.css";
import { logEvento } from "@/lib/logEvento";

type Profile = {
  nombre: string | null;
  ciudad: string | null;
  plan: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("bienvenida") === "1") {
      setToastVisible(true);
      window.history.replaceState({}, "", "/dashboard");
      setTimeout(() => setToastVisible(false), 4000);
    }
  }, []);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      setEmail(user.email ?? "");

      // Registrar primer acceso si la cuenta tiene menos de 5 minutos
      const createdAt = new Date(user.created_at).getTime();
      if (Date.now() - createdAt < 5 * 60 * 1000) {
        logEvento("registro_completado");
      }

      const { data } = await supabase
        .from("profiles")
        .select("nombre, ciudad, plan")
        .eq("id", user.id)
        .single();

      // Si el perfil no tiene nombre, tomarlo de user_metadata (guardado al registrarse)
      const metaNombre = user.user_metadata?.nombre as string | undefined;
      if (data && !data.nombre && metaNombre) {
        await supabase
          .from("profiles")
          .update({ nombre: metaNombre })
          .eq("id", user.id);
        setProfile({ ...data, nombre: metaNombre });
      } else {
        setProfile(data);
      }

      setLoading(false);
    }
    load();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--crema)", fontFamily: "DM Sans, sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <p style={{ color: "var(--gris)", fontSize: 18 }}>Cargando tu plataforma...</p>
        </div>
      </div>
    );
  }

  const rawNombre = profile?.nombre ?? email.split("@")[0].split(".")[0];
  const nombre = rawNombre.charAt(0).toUpperCase() + rawNombre.slice(1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>

      {/* Toast de bienvenida */}
      {toastVisible && (
        <div style={{
          position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)",
          background: "var(--v2)", color: "white",
          padding: "14px 24px", borderRadius: 50,
          fontSize: 16, fontWeight: 600,
          boxShadow: "0 8px 32px rgba(27,94,59,.3)",
          zIndex: 1000, whiteSpace: "nowrap",
          animation: "fadeInUp .35s ease",
        }}>
          🌿 ¡Listo, {nombre}! Ya iniciaste sesión.
        </div>
      )}

      {/* Header */}
      <header className={s.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <OliveBranch size={36} variant="light" />
          <div style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 34, fontWeight: 700, color: "white", letterSpacing: "-0.5px",
          }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </div>
        </div>
        <div className={s.headerRight}>
          <span className={s.headerEmail}>{email}</span>
          <button onClick={handleLogout} className={s.logoutBtn}>Salir</button>
        </div>
      </header>

      {/* Contenido */}
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>

        {/* Saludo */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: "var(--gris)", marginBottom: 6 }}>Buenos días,</p>
          <h1 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            color: "var(--n2)", fontWeight: 700, lineHeight: 1.1,
          }}>
            {nombre} 👋
          </h1>
          <p style={{ fontSize: 18, color: "var(--gris)", marginTop: 10 }}>
            Tu plataforma de salud, bienestar y experiencias.
          </p>
        </div>

        {/* Cards de acceso rápido */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20, marginBottom: 48,
        }}>
          {[
            {
              svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>,
              title: "Hablar con VIVIAN", desc: "Tu asistente IA disponible ahora",
              activo: true, href: "/vivian", destacado: true,
            },
            {
              svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
              title: "Artículos", desc: "Lecturas para tu prime",
              activo: true, href: "/articulos", destacado: false,
            },
            {
              svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="9" height="9" rx="2"/><rect x="13" y="3" width="9" height="9" rx="2"/><rect x="2" y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/></svg>,
              title: "Entrena tu mente", desc: "Memoria y sopa de letras",
              activo: true, href: "/juegos", destacado: false,
            },
            {
              svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
              title: "Mi agenda", desc: "Citas y recordatorios",
              activo: false, href: "#", destacado: false,
            },
            {
              svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18"/></svg>,
              title: "Mis medicamentos", desc: "Recordatorios y seguimiento",
              activo: false, href: "#", destacado: false,
            },
            {
              svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
              title: "Telemedicina", desc: "Consultas online con especialistas",
              activo: false, href: "#", destacado: false,
            },
            {
              svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
              title: "Bienestar activo", desc: "Yoga, pilates y funcional",
              activo: false, href: "#", destacado: false,
            },
            {
              svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              title: "Tours y experiencias", desc: "Actividades para tu prime",
              activo: false, href: "#", destacado: false,
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              style={{
                background: card.destacado ? "var(--v2)" : "white",
                borderRadius: 20,
                padding: "28px 26px",
                textDecoration: "none",
                border: card.destacado ? "none" : "1.5px solid #E8EDE9",
                boxShadow: card.destacado ? "0 8px 32px rgba(27,94,59,.2)" : "0 2px 8px rgba(27,94,59,.05)",
                transition: "transform .2s, box-shadow .2s",
                display: "block",
                opacity: !card.activo && !card.destacado ? 0.8 : 1,
                cursor: card.activo ? "pointer" : "default",
              }}
              onMouseEnter={(e) => {
                if (!card.activo) return;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(27,94,59,.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = card.destacado ? "0 8px 32px rgba(27,94,59,.2)" : "0 2px 8px rgba(27,94,59,.05)";
              }}
            >
              <div style={{
                color: card.destacado ? "rgba(255,255,255,.9)" : "var(--v3)",
                marginBottom: 18,
              }}>
                {card.svg}
              </div>
              <div style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 21, fontWeight: 600,
                color: card.destacado ? "white" : "var(--n2)",
                marginBottom: 6, lineHeight: 1.2,
              }}>
                {card.title}
              </div>
              <div style={{
                fontSize: 14,
                color: card.destacado ? "rgba(255,255,255,.65)" : "var(--gris)",
                lineHeight: 1.5,
              }}>
                {card.desc}
              </div>
              {!card.activo && (
                <div style={{
                  display: "inline-block", marginTop: 14,
                  fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
                  color: "var(--d1)", background: "var(--d4)",
                  border: "1px solid var(--d3)",
                  borderRadius: 20, padding: "3px 10px",
                  textTransform: "uppercase",
                }}>
                  Próximamente
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Banner VIVIAN */}
        <div style={{
          background: "var(--v2)",
          borderRadius: 24, padding: "32px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20,
          boxShadow: "0 8px 32px rgba(27,94,59,.2)",
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--v4)", marginBottom: 6, letterSpacing: 1.5, textTransform: "uppercase" }}>
              VIVIAN te está esperando
            </div>
            <p style={{ fontSize: 22, color: "white", margin: 0, fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }}>
              ¿En qué puedo ayudarte hoy?
            </p>
          </div>
          <a
            href="/vivian"
            style={{
              background: "white", color: "var(--v2)",
              padding: "16px 32px", borderRadius: 50,
              fontSize: 16, fontWeight: 700, textDecoration: "none",
              whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,.1)",
            }}
          >
            Hablar con VIVIAN →
          </a>
        </div>
      </main>
    </div>
  );
}
