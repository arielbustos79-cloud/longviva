"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

type Profile = {
  nombre: string | null;
  ciudad: string | null;
  plan: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      setEmail(user.email ?? "");

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

      {/* Header */}
      <header style={{
        background: "var(--v2)", padding: "18px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: 26, fontWeight: 700, color: "white",
        }}>
          LongViv<span style={{ color: "var(--d2)" }}>IA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: 15 }}>{email}</span>
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.25)",
              color: "white", padding: "8px 20px", borderRadius: 50,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              transition: "background .2s",
            }}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 32px" }}>

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
              icon: "🤖", title: "Hablar con VIVIAN",
              desc: "Tu asistente IA disponible ahora",
              bg: "var(--v2)", color: "white",
              href: "/vivian",
            },
            {
              icon: "🏥", title: "Telemedicina",
              desc: "Agenda una consulta online",
              bg: "white", color: "var(--n2)",
              href: "#",
            },
            {
              icon: "🧘", title: "Clases de bienestar",
              desc: "Yoga, pilates y funcional",
              bg: "white", color: "var(--n2)",
              href: "#",
            },
            {
              icon: "✈️", title: "Tours y experiencias",
              desc: "Actividades para tu prime",
              bg: "white", color: "var(--n2)",
              href: "#",
            },
            {
              icon: "📅", title: "Mi agenda",
              desc: "Citas y recordatorios",
              bg: "white", color: "var(--n2)",
              href: "#",
            },
            {
              icon: "💊", title: "Mis medicamentos",
              desc: "Recordatorios y seguimiento",
              bg: "white", color: "var(--n2)",
              href: "#",
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              style={{
                background: card.bg,
                borderRadius: 20,
                padding: "28px 26px",
                textDecoration: "none",
                border: card.bg === "white" ? "1.5px solid var(--v5)" : "none",
                boxShadow: "0 4px 16px rgba(27,94,59,.08)",
                transition: "transform .2s, box-shadow .2s",
                display: "block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 28px rgba(27,94,59,.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(27,94,59,.08)";
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{card.icon}</div>
              <div style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 22, fontWeight: 600,
                color: card.bg === "var(--v2)" ? "white" : "var(--n2)",
                marginBottom: 6,
              }}>
                {card.title}
              </div>
              <div style={{
                fontSize: 15,
                color: card.bg === "var(--v2)" ? "rgba(255,255,255,.75)" : "var(--gris)",
              }}>
                {card.desc}
              </div>
            </a>
          ))}
        </div>

        {/* Banner VIVIAN */}
        <div style={{
          background: "var(--v6)", border: "2px solid var(--v5)",
          borderRadius: 20, padding: "28px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--v3)", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>
              VIVIAN te está esperando
            </div>
            <p style={{ fontSize: 18, color: "var(--n2)", margin: 0 }}>
              ¿En qué puedo ayudarte hoy?
            </p>
          </div>
          <a
            href="/vivian"
            style={{
              background: "var(--v2)", color: "white",
              padding: "14px 28px", borderRadius: 50,
              fontSize: 16, fontWeight: 600, textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Hablar con VIVIAN →
          </a>
        </div>
      </main>
    </div>
  );
}
