"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import s from "./page.module.css";

/* ─── useCountUp ──────────────────────────────────────────────── */
function useCountUp(end: number, ms = 1800, go = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go || end === 0) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / ms, 1);
      setV(Math.round((1 - (1 - p) ** 3) * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, end, ms]);
  return v;
}

/* ─── ProofCounter ────────────────────────────────────────────── */
function ProofCounter({ raw, label }: { raw: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const isSlash = raw.includes("/");
  const isFloat = raw.includes(".");
  const n = isSlash ? 0 : parseFloat(raw.replace(/[^\d.]/g, ""));
  const sfx = raw.replace(/[\d.]/g, "");
  const v = useCountUp(isFloat ? Math.round(n * 10) : n, 1800, go);
  const display = isSlash ? raw : isFloat ? `${(v / 10).toFixed(1)}${sfx}` : `${v}${sfx}`;
  return (
    <div ref={ref}>
      <div className={s.proofNum}>{display}</div>
      <div className={s.proofLabel}>{label}</div>
    </div>
  );
}

/* ─── PhoneChat (hero mockup) ─────────────────────────────────── */
const HERO_MSGS = [
  { bot: true,  node: <>¡Hola María! Hoy es un día perfecto para moverse. Tienes yoga a las 10 AM. ¿Lista? 🌿</> },
  { bot: false, node: <>Lista. ¿Y el tour del sábado?</> },
  { bot: true,  node: <>¡Confirmado! Cajón del Maipo, grupo de 10. <strong>Tu semana tiene todo.</strong> 🏔️</> },
];

function PhoneChat() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const clr = () => t.current.forEach(clearTimeout);
    const run = () => {
      clr(); setShown(0); setTyping(false);
      t.current = [
        setTimeout(() => setTyping(true), 700),
        setTimeout(() => { setTyping(false); setShown(1); }, 1900),
        setTimeout(() => setShown(2), 3100),
        setTimeout(() => setTyping(true), 3900),
        setTimeout(() => { setTyping(false); setShown(3); }, 5200),
        setTimeout(run, 9500),
      ];
    };
    run();
    return clr;
  }, []);
  return (
    <div className={s.vivianMsgs}>
      {HERO_MSGS.slice(0, shown).map((m, i) => (
        <div key={i} className={`${m.bot ? s.vmBot : s.vmUsr} ${s.msgIn}`}>{m.node}</div>
      ))}
      {typing && (
        <div className={`${s.vmBot} ${s.msgIn}`}>
          <span className={s.dots}><b /><b /><b /></span>
        </div>
      )}
    </div>
  );
}

/* ─── VivianChat (sección VIVIAN) ─────────────────────────────── */
const VIVIAN_MSGS = [
  { bot: true,  node: <>¡Buenos días! ☀️ Recuerda tomar el Enalapril. Tienes médico a las 11 AM.</> },
  { bot: false, node: <>¿Hay algo bueno para este fin de semana?</> },
  { bot: true,  node: <>¡Sí! Cajón del Maipo el sábado. <strong>¿Lo reservamos?</strong> 🏔️</> },
  { bot: false, node: <>Sí, perfecto</> },
  { bot: true,  node: <>Listo, reservado. 3 personas ya confirmaron. ¡Va a ser increíble! 🌿</> },
];

function VivianChat() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const clr = () => t.current.forEach(clearTimeout);
    const run = () => {
      clr(); setShown(0); setTyping(false);
      t.current = [
        setTimeout(() => setTyping(true), 500),
        setTimeout(() => { setTyping(false); setShown(1); }, 1700),
        setTimeout(() => setShown(2), 2800),
        setTimeout(() => setTyping(true), 3600),
        setTimeout(() => { setTyping(false); setShown(3); }, 4900),
        setTimeout(() => setShown(4), 5800),
        setTimeout(() => setTyping(true), 6600),
        setTimeout(() => { setTyping(false); setShown(5); }, 7900),
        setTimeout(run, 13500),
      ];
    };
    run();
    return clr;
  }, []);
  return (
    <div className={s.vpMsgs}>
      {VIVIAN_MSGS.slice(0, shown).map((m, i) => (
        <div key={i} className={`${m.bot ? s.vpBot : s.vpUsr} ${s.msgIn}`}>{m.node}</div>
      ))}
      {typing && (
        <div className={`${s.vpBot} ${s.msgIn}`}>
          <span className={s.dots}><b /><b /><b /></span>
        </div>
      )}
    </div>
  );
}

/* ─── Marquee items ───────────────────────────────────────────── */
const STRIP = [
  "✦ VIVIAN IA 24/7",
  "✦ Yoga & Pilates próximamente",
  "✦ Tours exclusivos próximamente",
  "✦ Telemedicina próximamente",
  "✦ Nutrición próximamente",
  "✦ Comunidad activa próximamente",
  "✦ Bienestar pleno próximamente",
  "✦ 100% gratuito",
];

/* ─── Home ────────────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [sesionActiva, setSesionActiva] = useState(false);

  // Restaurar preferencia de tamaño de texto
  useEffect(() => {
    if (localStorage.getItem("textSize") === "grande") {
      document.documentElement.classList.add("text-grande");
    }
  }, []);

  // Detectar sesión activa
  useEffect(() => {
    import("@/lib/supabase-browser").then(({ createClient }) => {
      createClient().auth.getSession().then(({ data: { session } }) => {
        setSesionActiva(!!session);
      });
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(s.visible); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(`.${s.fadeIn}`).forEach((el) => obs.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector((a as HTMLAnchorElement).getAttribute("href")!);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  return (
    <>
      {/* A11Y BAR — discreta, solo texto */}
      <div className={s.a11yBar}>
        <span>¿Necesitas ayuda? <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v2)", fontWeight: 600, textDecoration: "none" }}>hola@longvivia.cl</a></span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--gris)", marginRight: 4 }}>Tamaño de texto:</span>
          <button className={s.a11yBtn} onClick={() => {
            document.documentElement.classList.add("text-grande");
            localStorage.setItem("textSize", "grande");
          }}>A+</button>
          <button className={s.a11yBtn} onClick={() => {
            document.documentElement.classList.remove("text-grande");
            localStorage.setItem("textSize", "normal");
          }}>A</button>
        </div>
      </div>

      {/* NAV */}
      <nav className={`${s.nav} ${scrolled ? s.navScrolled : ""}`}>
        <a href="#" className={s.logoWrap}>
          <svg width="32" height="38" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Tallo principal: curva elegante */}
            <path d="M 17,37 C 16,30 13,22 15,12 C 16,6 20,2 20,2" stroke="#1B5E3B" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            {/* Hoja 1 inferior-izquierda */}
            <path d="M 15,30 C 7,28 4,22 7,18 C 9,16 15,20 15,26 Z" fill="#1B5E3B"/>
            {/* Hoja 2 inferior-derecha */}
            <path d="M 16,26 C 24,24 27,18 24,15 C 22,14 16,17 16,23 Z" fill="#2D8A5F" opacity=".88"/>
            {/* Hoja 3 media-izquierda */}
            <path d="M 15,20 C 7,18 4,12 8,9 C 10,8 15,11 15,17 Z" fill="#1B5E3B" opacity=".92"/>
            {/* Hoja 4 media-derecha */}
            <path d="M 16,17 C 24,15 26,9 23,7 C 21,6 16,9 16,14 Z" fill="#1B5E3B" opacity=".82"/>
            {/* Hoja 5 superior-izquierda */}
            <path d="M 15,12 C 8,10 7,5 10,4 C 12,3 15,5 15,9 Z" fill="#2D8A5F" opacity=".78"/>
            {/* Hoja 6 superior-derecha (pequeña) */}
            <path d="M 17,8 C 22,6 23,2 20,2 C 18,1 17,3 17,6 Z" fill="#1B5E3B" opacity=".72"/>
            {/* Aceituna 1: inferior, con tallo */}
            <path d="M 15,27 L 11,25" stroke="#1B5E3B" strokeWidth="1.2" strokeLinecap="round"/>
            <circle cx="10" cy="24" r="2.5" fill="#C9973A"/>
            {/* Aceituna 2: media, con tallo */}
            <path d="M 16,19 L 20,17" stroke="#1B5E3B" strokeWidth="1" strokeLinecap="round"/>
            <circle cx="21" cy="16" r="2.1" fill="#C9973A" opacity=".88"/>
            {/* Aceituna 3: superior, con tallo */}
            <path d="M 15,11 L 11,9" stroke="#1B5E3B" strokeWidth="1" strokeLinecap="round"/>
            <circle cx="10" cy="8" r="1.8" fill="#C9973A" opacity=".82"/>
          </svg>
          <div className={s.logoText}>LongViv<span>IA</span></div>
        </a>
        <ul className={s.navLinks}>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="/vivian">VIVIAN IA</a></li>
          <li><a href="#como">¿Cómo funciona?</a></li>
          <li><a href="#contacto">Contacto</a></li>
          {sesionActiva ? (
            <>
              <li><a href="/dashboard" className={s.btnNavOutline}>Mi dashboard</a></li>
              <li><a href="/vivian" className={s.btnNav}>Hablar con VIVIAN →</a></li>
            </>
          ) : (
            <>
              <li><a href="/login" className={s.btnNavOutline}>Ingresar</a></li>
              <li><a href="/registro" className={s.btnNav}>Comenzar gratis →</a></li>
            </>
          )}
        </ul>
      </nav>

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg}>
          <div className={s.blob1} />
          <div className={s.blob2} />
          <div className={s.blob3} />
        </div>
        <div className={s.heroContent}>
          <div className={s.heroPill}>Plataforma 100% gratuita · Chile</div>
          <h1 className={s.h1}>
            <span className={s.break}>
              {["60", "no", "es"].map((w, i) => (
                <Fragment key={w}>
                  <span className={s.wr} style={{ animationDelay: `${80 + i * 90}ms` }}>{w}</span>{" "}
                </Fragment>
              ))}
            </span>
            <span className={s.break}>
              {["el", "límite."].map((w, i) => (
                <Fragment key={w}>
                  <span className={s.wr} style={{ animationDelay: `${350 + i * 90}ms` }}>{w}</span>{" "}
                </Fragment>
              ))}
            </span>
            <em className={s.break}>
              {["Es", "tu", "punto"].map((w, i) => (
                <Fragment key={w}>
                  <span className={s.wr} style={{ animationDelay: `${580 + i * 90}ms` }}>{w}</span>{" "}
                </Fragment>
              ))}
            </em>
            <em className={s.break}>
              {["de", "partida."].map((w, i) => (
                <Fragment key={w}>
                  <span className={s.wr} style={{ animationDelay: `${850 + i * 90}ms` }}>{w}</span>
                  {i === 0 ? " " : ""}
                </Fragment>
              ))}
            </em>
          </h1>
          <p className={`${s.heroDesc} ${s.entryFade}`} style={{ animationDelay: "1080ms" }}>
            LongVivIA es tu plataforma de salud, bienestar y experiencias — con VIVIAN, la IA que te acompaña en tu etapa más libre y poderosa.
          </p>
          <div className={`${s.heroCtas} ${s.entryFade}`} style={{ animationDelay: "1250ms" }}>
            <a href="/registro" className={s.btnPrimary}>Comenzar gratis →</a>
            <a href="#vivian" className={s.btnGhost}>Conocer a VIVIAN ↓</a>
          </div>
          <div className={`${s.heroProof} ${s.entryFade}`} style={{ animationDelay: "1420ms" }}>
            <ProofCounter raw="3.5M" label="personas en su prime en Chile" />
            <ProofCounter raw="100%" label="gratuito, siempre" />
            <ProofCounter raw="24/7" label="VIVIAN contigo" />
          </div>
        </div>
        <div className={s.heroVisual}>
          <div className={s.phoneWrap}>
            <div className={s.phoneFrame}>
              <div className={s.phoneScreen}>
                <div className={s.phoneTop}>
                  <div className={s.phoneGreeting}>Buenos días,</div>
                  <div className={s.phoneName}>María 👋</div>
                </div>
                <PhoneChat />
                <div className={s.phoneChips}>
                  <div className={s.chip}>✓ Ver agenda</div>
                  <div className={s.chip}>🏥 Mi salud</div>
                  <div className={s.chip}>✈️ Tours</div>
                </div>
              </div>
            </div>
            <div className={`${s.floatCard} ${s.left}`}><div className={s.fcIco} style={{ background: "var(--v6)" }}>🤖</div>VIVIAN IA</div>
            <div className={`${s.floatCard} ${s.right}`}><div className={s.fcIco} style={{ background: "var(--d4)" }}>🆓</div>Siempre gratis</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className={s.marqueeWrap} aria-hidden="true">
        <div className={s.marqueeTrack}>
          {[...STRIP, ...STRIP].map((item, i) => (
            <span key={i} className={s.marqueeItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* PRIME SECTION */}
      <section className={s.primeSection}>
        <div className={`${s.primeLeft} ${s.fadeIn}`}>
          <div className={s.secLabel}>Para una vida larga y activa.</div>
          <h2 className={s.primeTitle}>Vitalidad, movimiento<br />y <em>libertad total.</em></h2>
          <p className={s.primeDesc}>LongVivIA se financia con publicidad cuidadosamente seleccionada y alianzas con empresas que quieren estar a tu lado. Tú accedes a todo sin pagar nada. Así de simple.</p>
        </div>
        <div className={s.primeRight}>
          <div className={s.primeCards}>
            {[
              { icon: "🏥", title: "Telemedicina gratis", desc: "Consultas con especialistas sin costo ni filas" },
              { icon: "🧘", title: "Clases ilimitadas", desc: "Yoga, pilates y funcional adaptado a ti" },
              { icon: "✈️", title: "Tours a tu ritmo", desc: "Grupos pequeños, precios exclusivos" },
              { icon: "🤖", title: "VIVIAN 24/7", desc: "Tu IA personal de salud, bienestar y ocio" },
            ].map((c, i) => (
              <div key={c.title} className={`${s.primeCard} ${s.fadeIn}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className={s.pcIcon}>{c.icon}</div>
                <div className={s.pcInfo}><strong>{c.title}</strong><span>{c.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIVIAN SECTION */}
      <section className={s.vivianSection} id="vivian">
        <div>
          <div className={`${s.secLabel} ${s.fadeIn}`}>Conoce a VIVIAN</div>
          <h2 className={`${s.secTitle} ${s.fadeIn}`}>La IA que habla<br /><em>tu idioma</em></h2>
          <p className={`${s.secSub} ${s.fadeIn}`}>VIVIAN no es un chatbot frío. Es una compañía cálida, paciente y siempre disponible — que te conoce, recuerda lo que importa y actúa cuando lo necesitas.</p>
          <div className={s.vivianFeats}>
            {[
              { icon: "🏥", title: "Asistente de salud activa", desc: "Recuerda medicamentos, agenda citas y responde preguntas médicas con claridad." },
              { icon: "💬", title: "Compañía real, 24/7", desc: "Siempre disponible para conversar, escucharte y acompañarte — sin prisa ni tecnicismos." },
              { icon: "✈️", title: "Guía de experiencias", desc: "Recomienda tours, clases y actividades según tus gustos, condición y presupuesto." },
              { icon: "🎤", title: "Voz o texto, tú decides", desc: "Puedes hablarle o escribirle. VIVIAN entiende ambos con la misma calidez." },
            ].map((f, i) => (
              <div key={f.title} className={`${s.vf} ${s.fadeIn}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={s.vfIco}>{f.icon}</div>
                <div className={s.vfText}><strong>{f.title}</strong><span>{f.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${s.vivianVisual} ${s.fadeIn}`}>
          <div className={s.vivianPhone}>
            <div className={s.vpHeader}>
              <div className={s.vpAva}>
                <svg width="46" height="46" viewBox="0 0 46 46">
                  <rect width="46" height="46" fill="#1B5E3B"/>
                  <path d="M23,42 C23,42 13,32 15,19 C17,9 23,6 23,6" stroke="rgba(255,255,255,.9)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <ellipse cx="19" cy="22" rx="6" ry="3" transform="rotate(-38,19,22)" fill="rgba(255,255,255,.85)"/>
                  <ellipse cx="22" cy="16" rx="5.5" ry="2.8" transform="rotate(-20,22,16)" fill="rgba(255,255,255,.7)"/>
                  <ellipse cx="15" cy="30" rx="5" ry="2.5" transform="rotate(-52,15,30)" fill="rgba(255,255,255,.75)"/>
                  <circle cx="19" cy="25" r="2" fill="#F5DFA0"/>
                  <circle cx="14" cy="33" r="1.8" fill="#F5DFA0" opacity=".85"/>
                </svg>
              </div>
              <div><div className={s.vpName}>VIVIAN</div><div className={s.vpSub}>Tu asistente LongVivIA · En línea</div></div>
            </div>
            <VivianChat />
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className={s.servicesSection} id="servicios">
        <div className={s.secLabel} style={{ marginBottom: 16 }}>Todo en un lugar</div>
        <h2 className={s.secTitle} style={{ color: "white", marginBottom: 16 }}>Servicios hechos<br /><em style={{ color: "var(--v4)" }}>para tu energía</em></h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,.65)", fontWeight: 400, lineHeight: 1.75, maxWidth: 520, marginBottom: 64 }}>
          Accede a todo de forma simple. Si necesitas ayuda, VIVIAN te guía o escríbenos a hola@longvivia.cl.
        </p>
        <div className={s.servicesGrid}>
          {[
            { icon: "🤖", title: "VIVIAN IA", desc: "Tu asistente personal de salud, bienestar y ocio. Disponible 24/7, te conoce y te acompaña.", link: "Hablar con VIVIAN →", href: "/vivian", activo: true },
            { icon: "💊", title: "Gestión de salud", desc: "Recordatorios de medicamentos, historial de citas y seguimiento de indicadores.", link: "Próximamente", href: "#", activo: false },
            { icon: "🏥", title: "Telemedicina", desc: "Consultas online con médicos y especialistas. Sin esperas. Compatible con Fonasa e Isapres.", link: "Próximamente", href: "#", activo: false },
            { icon: "🧘", title: "Bienestar activo", desc: "Clases de yoga, pilates y funcional. En vivo y grabadas. Instructores especializados.", link: "Próximamente", href: "#", activo: false },
            { icon: "✈️", title: "Ocio y experiencias", desc: "Tours con grupos pequeños, tu ritmo y precios exclusivos. Natura, gastronomía, cultura.", link: "Próximamente", href: "#", activo: false },
            { icon: "🍽️", title: "Nutrición", desc: "Planes personalizados con nutricionistas. Seguimiento y recetas pensadas para ti.", link: "Próximamente", href: "#", activo: false },
          ].map((srv, i) => (
            <div key={srv.title} className={`${s.srvCard} ${s.fadeIn}`} style={{ transitionDelay: `${i * 80}ms`, opacity: srv.activo ? 1 : 0.75 }}>
              <div className={s.srvIcon}>{srv.icon}</div>
              <h3>{srv.title}{!srv.activo && <span style={{ fontSize: "11px", background: "var(--d3)", color: "var(--d1)", borderRadius: "20px", padding: "2px 10px", marginLeft: "8px", fontWeight: 600 }}>Próximamente</span>}</h3>
              <p>{srv.desc}</p>
              <a href={srv.href} className={s.srvLink} style={{ pointerEvents: srv.activo ? "auto" : "none", opacity: srv.activo ? 1 : 0.5 }}>{srv.link}</a>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como" style={{ background: "var(--crema)", padding: "96px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div className={`${s.secLabel} ${s.fadeIn}`} style={{ color: "var(--v3)", textAlign: "center" }}>Sin complicaciones</div>
          <h2 className={`${s.secTitle} ${s.fadeIn}`} style={{ textAlign: "center", marginBottom: 64 }}>
            Tres pasos para empezar tu prime
          </h2>
          <div className={s.fadeIn} style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}>
            {[
              {
                num: "01",
                icon: "✉️",
                title: "Regístrate gratis",
                desc: "Solo tu nombre y correo. Sin contraseña — te llegará un enlace mágico al instante.",
              },
              {
                num: "02",
                icon: "🌿",
                title: "Entra a tu plataforma",
                desc: "Haz clic en el enlace y accede directo a tu dashboard personal.",
              },
              {
                num: "03",
                icon: "✨",
                title: "Vive tu prime",
                desc: "Habla con VIVIAN, agenda clases, consultas médicas y descubre experiencias hechas para ti.",
              },
            ].map((paso) => (
              <div key={paso.num} style={{
                background: "white",
                borderRadius: 24,
                padding: "36px 28px",
                border: "1.5px solid var(--v5)",
                boxShadow: "0 4px 16px rgba(27,94,59,.06)",
                position: "relative",
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 800, color: "var(--v4)",
                  letterSpacing: 2, marginBottom: 16,
                }}>
                  {paso.num}
                </div>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{paso.icon}</div>
                <h3 style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 24, fontWeight: 700,
                  color: "var(--n2)", marginBottom: 10,
                }}>
                  {paso.title}
                </h3>
                <p style={{ fontSize: 16, color: "var(--gris)", lineHeight: 1.7, margin: 0 }}>
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
          <div className={s.fadeIn} style={{ textAlign: "center", marginTop: 48 }}>
            <a href="/registro" className={s.btnPrimary}>
              Comenzar gratis →
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className={s.testimonials}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className={`${s.secLabel} ${s.fadeIn}`} style={{ color: "var(--v3)", textAlign: "center" }}>Lo que dicen quienes ya viven su prime</div>
          <h2 className={`${s.secTitle} ${s.fadeIn}`} style={{ color: "var(--n2)", textAlign: "center" }}>Historias <em>reales</em></h2>
        </div>
        <div className={s.testGrid}>
          {[
            { text: "VIVIAN me recuerda mis medicamentos cada mañana y me ayudó a encontrar un médico online en minutos. Y todo gratis. No lo podía creer.", name: "María Teresa R.", age: "68 años · Santiago", ava: "👩" },
            { text: "Le pregunté a VIVIAN qué hacer el fin de semana y me recomendó un tour perfecto. Fui al Cajón con un grupo encantador y llegué con más energía que nunca.", name: "Jorge A.", age: "72 años · Viña del Mar", ava: "👨" },
            { text: "Pensé que la tecnología no era para mí. Pero VIVIAN es tan clara y paciente que en una semana ya reservaba mis clases sola y me sentía dueña de mi tiempo.", name: "Carmen L.", age: "65 años · Concepción", ava: "👩" },
          ].map((t, i) => (
            <div key={t.name} className={`${s.testCard} ${s.fadeIn}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className={s.testStars}>★★★★★</div>
              <div className={s.testQ}>&ldquo;</div>
              <p className={s.testText}>{t.text}</p>
              <div className={s.testAuthor}>
                <div className={s.testAva}>{t.ava}</div>
                <div><div className={s.testName}>{t.name}</div><div className={s.testAge}>{t.age}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={s.ctaFinal} id="registro">
        <div className={s.ctaLogo}>LongViv<span>IA</span></div>
        <div className={s.ctaTagline}>Para una vida larga y activa.</div>
        <h2 className={s.ctaPhrase}>Tu prime,<br /><em>tu plataforma Viva.</em></h2>
        <div className={s.ctaInputGroup}>
          <a href="/registro" className={s.btnGold}>Comenzar gratis →</a>
          <a href="/login" className={s.btnGoldOutline}>Ya tengo cuenta →</a>
        </div>
        <p className={s.ctaNote}>Sin tarjeta de crédito. Sin letra chica. ¿Dudas? <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v4)", textDecoration: "none", fontWeight: 600 }}>hola@longvivia.cl</a></p>
      </section>

      {/* FOOTER */}
      <footer className={s.footer} id="contacto">
        <div className={s.footerGrid}>
          <div>
            <a href="#" className={s.logoWrap} style={{ marginBottom: 14, display: "inline-flex" }}>
              <svg width="28" height="34" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 17,37 C 16,30 13,22 15,12 C 16,6 20,2 20,2" stroke="#52B788" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <path d="M 15,30 C 7,28 4,22 7,18 C 9,16 15,20 15,26 Z" fill="#52B788"/>
                <path d="M 16,26 C 24,24 27,18 24,15 C 22,14 16,17 16,23 Z" fill="#4AA87A" opacity=".88"/>
                <path d="M 15,20 C 7,18 4,12 8,9 C 10,8 15,11 15,17 Z" fill="#52B788" opacity=".92"/>
                <path d="M 16,17 C 24,15 26,9 23,7 C 21,6 16,9 16,14 Z" fill="#52B788" opacity=".82"/>
                <path d="M 15,12 C 8,10 7,5 10,4 C 12,3 15,5 15,9 Z" fill="#4AA87A" opacity=".78"/>
                <path d="M 17,8 C 22,6 23,2 20,2 C 18,1 17,3 17,6 Z" fill="#52B788" opacity=".72"/>
                <path d="M 15,27 L 11,25" stroke="#52B788" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="10" cy="24" r="2.5" fill="#F5DFA0"/>
                <path d="M 16,19 L 20,17" stroke="#52B788" strokeWidth="1" strokeLinecap="round"/>
                <circle cx="21" cy="16" r="2.1" fill="#F5DFA0" opacity=".88"/>
                <path d="M 15,11 L 11,9" stroke="#52B788" strokeWidth="1" strokeLinecap="round"/>
                <circle cx="10" cy="8" r="1.8" fill="#F5DFA0" opacity=".82"/>
              </svg>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", marginLeft: 8 }}>LongViv<span style={{ color: "#C9973A" }}>IA</span></div>
            </a>
            <p className={s.footerDesc}>Plataforma digital gratuita de salud, bienestar y experiencias para personas en su prime en Chile. Financiada por publicidad y alianzas — nunca por tus datos.</p>
            <div className={s.footerPill}>🆓 100% gratuito para siempre</div>
          </div>
          <div className={s.footerCol}>
            <h4>Servicios</h4>
            <ul className={s.footerLinks}>
              {["Telemedicina", "Bienestar", "Tours", "Nutrición", "VIVIAN IA"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className={s.footerCol}>
            <h4>Empresa</h4>
            <ul className={s.footerLinks}>
              {["Quiénes somos", "Proveedores", "Anunciantes", "Trabaja aquí"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className={s.footerCol}>
            <h4>Ayuda</h4>
            <ul className={s.footerLinks}>
              {["Centro de ayuda", "Términos", "Privacidad", "Accesibilidad"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className={s.footerBottom}>
          <span>© 2026 LongViva SpA · Santiago, Chile</span>
          <div className={s.footerContact}>
            <a href="mailto:hola@longvivia.cl" style={{ color: "inherit", textDecoration: "none" }}>✉️ hola@longvivia.cl</a>
          </div>
        </div>
      </footer>
    </>
  );
}
