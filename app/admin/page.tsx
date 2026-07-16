import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

const ADMIN_EMAILS = ["ariel.bustos79@gmail.com"];

async function query<T>(supabase: Awaited<ReturnType<typeof createClient>>, sql: string): Promise<T[]> {
  const { data } = await supabase.rpc("ejecutar_sql", { sql }) as { data: T[] };
  return data ?? [];
}

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) {
    redirect("/");
  }

  // Usuarios totales
  const { count: totalUsuarios } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true });

  // Usuarios esta semana
  const hace7dias = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { count: usuariosEstaSemana } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .gte("created_at", hace7dias);

  // Artículos más leídos
  const { data: articulosLeidos } = await supabase
    .from("eventos")
    .select("metadata")
    .eq("tipo", "articulo_leido");

  const conteoArticulos: Record<string, number> = {};
  for (const e of articulosLeidos ?? []) {
    const slug = (e.metadata as { slug?: string })?.slug ?? "desconocido";
    conteoArticulos[slug] = (conteoArticulos[slug] ?? 0) + 1;
  }
  const topArticulos = Object.entries(conteoArticulos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // VIVIAN: total mensajes y por canal
  const { data: mensajesVivian } = await supabase
    .from("eventos")
    .select("metadata, user_id")
    .eq("tipo", "vivian_mensaje");

  const totalMensajes = mensajesVivian?.length ?? 0;
  const porCanal: Record<string, number> = {};
  const usuariosVivian = new Set<string>();
  for (const e of mensajesVivian ?? []) {
    const canal = (e.metadata as { canal?: string })?.canal ?? "web";
    porCanal[canal] = (porCanal[canal] ?? 0) + 1;
    if (e.user_id) usuariosVivian.add(e.user_id);
  }
  const promedioVivian = usuariosVivian.size > 0
    ? (totalMensajes / usuariosVivian.size).toFixed(1)
    : "0";

  // Eventos recientes
  const { data: recientes } = await supabase
    .from("eventos")
    .select("tipo, metadata, created_at, user_id")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div style={{ minHeight: "100vh", background: "#0F2419", fontFamily: "DM Sans, sans-serif" }}>
      <header style={{ background: "#1B5E3B", padding: "16px 40px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <OliveBranch size={32} variant="light" />
        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 26, fontWeight: 700, color: "white" }}>
          LongViv<span style={{ color: "#C9973A" }}>IA</span>
          <span style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,.5)", marginLeft: 12 }}>Admin</span>
        </span>
        <Link href="/dashboard" style={{ marginLeft: "auto", color: "rgba(255,255,255,.5)", fontSize: 14, textDecoration: "none" }}>
          ← Panel
        </Link>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 96px" }}>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
          {[
            { label: "Usuarios totales", valor: totalUsuarios ?? 0, sub: `${usuariosEstaSemana ?? 0} esta semana` },
            { label: "Mensajes VIVIAN", valor: totalMensajes, sub: `${promedioVivian} por usuario` },
            { label: "Artículos leídos", valor: Object.values(conteoArticulos).reduce((a, b) => a + b, 0), sub: "eventos únicos" },
            { label: "Usuarios activos VIVIAN", valor: usuariosVivian.size, sub: "con al menos 1 mensaje" },
          ].map((kpi) => (
            <div key={kpi.label} style={{
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 16, padding: "24px 20px",
            }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: 42, fontWeight: 700, color: "white", lineHeight: 1, fontFamily: "Cormorant Garamond, serif" }}>
                {kpi.valor}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 6 }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
          {/* Artículos más leídos */}
          <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 20 }}>Artículos más leídos</h2>
            {topArticulos.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>Sin datos aún</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {topArticulos.map(([slug, count]) => (
                  <div key={slug} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>
                      {slug}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#52B788", flexShrink: 0 }}>{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* VIVIAN por canal */}
          <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 20 }}>VIVIAN por canal</h2>
            {Object.keys(porCanal).length === 0 ? (
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>Sin datos aún</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {Object.entries(porCanal).map(([canal, count]) => (
                  <div key={canal} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,.7)", textTransform: "capitalize" }}>{canal}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#C9973A" }}>{count} mensajes</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actividad reciente */}
        <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px" }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 20 }}>Actividad reciente</h2>
          {(recientes ?? []).length === 0 ? (
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>Sin eventos aún</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {(recientes ?? []).map((e, i) => {
                const fecha = new Date(e.created_at).toLocaleString("es-CL", {
                  day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
                });
                const meta = e.metadata as Record<string, string> | null;
                const detalle = meta ? Object.entries(meta).map(([k, v]) => `${k}: ${v}`).join(", ") : "";
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "baseline", gap: 16, padding: "10px 0",
                    borderBottom: i < (recientes?.length ?? 0) - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
                  }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.35)", flexShrink: 0, minWidth: 110 }}>{fecha}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
                      color: e.tipo === "vivian_mensaje" ? "#52B788" : e.tipo === "articulo_leido" ? "#C9973A" : "#7EB8F7",
                      flexShrink: 0,
                    }}>{e.tipo.replace(/_/g, " ")}</span>
                    {detalle && <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{detalle}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
