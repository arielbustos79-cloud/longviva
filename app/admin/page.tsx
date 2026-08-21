import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";
import RefreshButton from "./RefreshButton";

const ADMIN_EMAILS = ["ariel.bustos79@gmail.com"];

// Formato chileno: punto como separador de miles.
function formatoCL(n: number) {
  return n.toLocaleString("es-CL");
}

function fechaCL(iso: string) {
  return new Date(iso).toLocaleString("es-CL", {
    timeZone: "America/Santiago",
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

async function query<T>(supabase: Awaited<ReturnType<typeof createClient>>, sql: string): Promise<T[]> {
  const { data } = await supabase.rpc("ejecutar_sql", { sql }) as { data: T[] };
  return data ?? [];
}

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Sin sesión → /login. Con sesión pero sin rol admin → /.
  // No existe columna `role` en profiles — se mantiene el patrón
  // ADMIN_EMAILS ya usado en producción (mínima intervención).
  if (!user) {
    redirect("/login");
  }
  if (!ADMIN_EMAILS.includes(user.email ?? "")) {
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

  // Usuarios últimos 30 días
  const hace30dias = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { count: usuarios30dias } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .gte("created_at", hace30dias);

  // Usuarios por semana — últimas 8 semanas, para el gráfico de barras
  const hace8semanas = new Date(Date.now() - 8 * 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: usuariosRecientes } = await supabase
    .from("profiles")
    .select("created_at")
    .gte("created_at", hace8semanas);

  const semanas: number[] = Array(8).fill(0);
  const ahora = Date.now();
  for (const u of usuariosRecientes ?? []) {
    const diasAtras = (ahora - new Date(u.created_at).getTime()) / (24 * 60 * 60 * 1000);
    const semanaIdx = 7 - Math.min(7, Math.floor(diasAtras / 7));
    semanas[semanaIdx]++;
  }
  const maxSemana = Math.max(1, ...semanas);

  // Artículos más leídos — cruce eventos(articulo_leido) x articulos.
  // No existe columna views/read_count en articulos; se reconstruye
  // el ranking desde los eventos, como ya hacía esta página.
  const { data: articulosLeidos } = await supabase
    .from("eventos")
    .select("metadata")
    .eq("tipo", "articulo_leido");

  const conteoArticulos: Record<string, number> = {};
  for (const e of articulosLeidos ?? []) {
    const slug = (e.metadata as { slug?: string })?.slug ?? "desconocido";
    conteoArticulos[slug] = (conteoArticulos[slug] ?? 0) + 1;
  }
  const slugsTop10 = Object.entries(conteoArticulos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([slug]) => slug);

  const { data: articulosInfo } = slugsTop10.length > 0
    ? await supabase.from("articulos").select("slug, titulo, pilar, created_at").in("slug", slugsTop10)
    : { data: [] as { slug: string; titulo: string; pilar: string; created_at: string }[] };

  const topArticulosDetalle = slugsTop10.map(slug => {
    const info = (articulosInfo ?? []).find(a => a.slug === slug);
    return {
      slug,
      titulo: info?.titulo ?? slug,
      pilar: info?.pilar ?? "—",
      fecha: info?.created_at ?? null,
      vistas: conteoArticulos[slug],
    };
  });

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

  // VIVIAN — "conversaciones", all-time.
  // No existe una tabla/columna de conversación en el schema (chat_messages
  // es a nivel de mensaje individual). Se aproxima una "conversación" como
  // mensajes de un mismo usuario agrupados por día calendario — heurística,
  // no un ID de sesión real. chat_messages es una tabla chica (cientos de
  // filas), por eso se trae completa sin filtro de fecha.
  const hace24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: mensajesChat } = await supabase
    .from("chat_messages")
    .select("user_id, created_at")
    .eq("role", "user");

  const conversacionesSet = new Set<string>();
  const conv7diasSet = new Set<string>();
  const conv24hSet = new Set<string>();
  for (const m of mensajesChat ?? []) {
    const dia = m.created_at.slice(0, 10);
    const clave = `${m.user_id}_${dia}`;
    conversacionesSet.add(clave);
    if (m.created_at >= hace7dias) conv7diasSet.add(clave);
    if (m.created_at >= hace24h) conv24hSet.add(clave);
  }
  const conversaciones7dias = conv7diasSet.size;
  const conversaciones24h = conv24hSet.size;
  const totalConversaciones = conversacionesSet.size;

  // Formularios — educacion_interes. Puede no existir aún (crear con
  // scripts/educacion-interes-schema.sql); se maneja como placeholder si falla.
  const { data: formularios, count: totalFormularios, error: errorFormularios } = await supabase
    .from("educacion_interes")
    .select("nombre, caja, email, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(10);

  const desglosePorCaja: Record<string, number> = {};
  if (!errorFormularios) {
    const { data: todosFormularios } = await supabase
      .from("educacion_interes")
      .select("caja");
    for (const f of todosFormularios ?? []) {
      const caja = f.caja || "Sin especificar";
      desglosePorCaja[caja] = (desglosePorCaja[caja] ?? 0) + 1;
    }
  }

  // Feedback del formulario de ayuda
  const { data: feedbacks, count: totalFeedback } = await supabase
    .from("feedback")
    .select("nombre, que_hacias, que_fue_dificil, comentario, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(20);

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
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 24 }}>
          <RefreshButton />
          <Link href="/dashboard" style={{ color: "rgba(255,255,255,.5)", fontSize: 14, textDecoration: "none" }}>
            ← Panel
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px 96px" }}>

        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 32, fontWeight: 700, color: "white", margin: "0 0 40px" }}>
          Panel de administración
        </h1>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Usuarios totales", valor: totalUsuarios ?? 0, sub: `${formatoCL(usuariosEstaSemana ?? 0)} esta semana · ${formatoCL(usuarios30dias ?? 0)} en 30 días` },
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
                {formatoCL(kpi.valor)}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 6 }}>{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Gráfico de barras — usuarios nuevos por semana (últimas 8) */}
        <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px", marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 20 }}>Usuarios nuevos por semana</h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
            {semanas.map((valor, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{valor > 0 ? valor : ""}</span>
                <div style={{
                  width: "100%", background: "#52B788", borderRadius: 4,
                  height: `${Math.max(4, (valor / maxSemana) * 70)}px`,
                }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,.35)" }}>
                  {i === 7 ? "hoy" : `-${(7 - i) * 7}d`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* VIVIAN — conversaciones (heurística user+día, ver comentario en query) */}
        <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px", marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 4 }}>Actividad VIVIAN — conversaciones</h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginBottom: 20 }}>
            Aproximado — no existe un ID de sesión real; se agrupa por usuario + día
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {[
              { label: "Conversaciones (total)", valor: totalConversaciones },
              { label: "Últimos 7 días", valor: conversaciones7dias },
              { label: "Últimas 24 horas", valor: conversaciones24h },
            ].map(kpi => (
              <div key={kpi.label}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "white", fontFamily: "Cormorant Garamond, serif" }}>
                  {formatoCL(kpi.valor)}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Uso de cards del dashboard — sin tracking implementado */}
        <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px", marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 12 }}>Uso de cards del dashboard</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", margin: 0, lineHeight: 1.6 }}>
            Tracking de cards no implementado aún. Las cards de navegación del dashboard (Telemedicina, Bienestar, Ocio, etc.) son links directos sin evento asociado.
            Para habilitar este dato, agregar una llamada a <code style={{ color: "#C9973A" }}>logEvento(&quot;card_click&quot;, {"{"} card: nombre {"}"})</code> en el <code style={{ color: "#C9973A" }}>onClick</code> de cada card.
          </p>
        </div>

        {/* Formularios — educacion_interes */}
        <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", margin: 0 }}>Formularios — Educación Continua</h2>
            {!errorFormularios && <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{formatoCL(totalFormularios ?? 0)} total</span>}
          </div>

          {errorFormularios ? (
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>
              Sin datos disponibles — la tabla <code style={{ color: "#C9973A" }}>educacion_interes</code> aún no existe.
              Ver <code style={{ color: "#C9973A" }}>scripts/educacion-interes-schema.sql</code> para crearla.
            </p>
          ) : (formularios ?? []).length === 0 ? (
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>Sin envíos aún</p>
          ) : (
            <>
              {Object.keys(desglosePorCaja).length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {Object.entries(desglosePorCaja).sort((a, b) => b[1] - a[1]).map(([caja, count]) => (
                    <span key={caja} style={{
                      fontSize: 12, color: "rgba(255,255,255,.7)", background: "rgba(255,255,255,.06)",
                      padding: "6px 12px", borderRadius: 50,
                    }}>
                      {caja}: <strong style={{ color: "#C9973A" }}>{formatoCL(count)}</strong>
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(formularios ?? []).map((f, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    padding: "8px 0", borderBottom: i < (formularios?.length ?? 0) - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
                  }}>
                    <div>
                      <span style={{ fontSize: 14, color: "white", fontWeight: 600 }}>{f.nombre}</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginLeft: 10 }}>{f.caja || "—"}</span>
                    </div>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>{fechaCL(f.created_at)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
          {/* Top 10 artículos más leídos */}
          <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 20 }}>Top 10 artículos más leídos</h2>
            {topArticulosDetalle.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>Sin datos aún</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {topArticulosDetalle.map((a) => (
                  <div key={a.slug} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ fontSize: 14, color: "rgba(255,255,255,.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {a.titulo}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", textTransform: "capitalize" }}>
                        {a.pilar.replace(/_/g, " ")}{a.fecha ? ` · ${fechaCL(a.fecha)}` : ""}
                      </div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#52B788", flexShrink: 0 }}>{formatoCL(a.vistas)}</span>
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

        {/* Feedback de usuarios */}
        <div style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "white", margin: 0 }}>Feedback — Centro de ayuda</h2>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{totalFeedback ?? 0} total</span>
          </div>
          {(feedbacks ?? []).length === 0 ? (
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14 }}>Sin feedback aún</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(feedbacks ?? []).map((f, i) => {
                const fecha = new Date(f.created_at).toLocaleString("es-CL", {
                  timeZone: "America/Santiago",
                  day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit",
                });
                return (
                  <div key={i} style={{
                    borderBottom: i < (feedbacks?.length ?? 0) - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
                    paddingBottom: i < (feedbacks?.length ?? 0) - 1 ? 16 : 0,
                  }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>{fecha}</span>
                      {f.nombre && <span style={{ fontSize: 13, fontWeight: 600, color: "#C9973A" }}>{f.nombre}</span>}
                    </div>
                    {f.que_hacias && (
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", margin: "0 0 4px" }}>
                        <span style={{ color: "rgba(255,255,255,.35)" }}>Hacía: </span>{f.que_hacias}
                      </p>
                    )}
                    {f.que_fue_dificil && (
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", margin: "0 0 4px" }}>
                        <span style={{ color: "rgba(255,255,255,.35)" }}>Difícil: </span>{f.que_fue_dificil}
                      </p>
                    )}
                    {f.comentario && (
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", margin: 0 }}>
                        <span style={{ color: "rgba(255,255,255,.35)" }}>Comentario: </span>{f.comentario}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
                  timeZone: "America/Santiago",
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
