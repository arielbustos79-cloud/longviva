"use client";

import { useEffect } from "react";
import s from "./page.module.css";

export default function Home() {
  useEffect(() => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector((a as HTMLAnchorElement).getAttribute("href")!);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    // Fade-in on scroll
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(`.${s.fadeIn}`).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* A11Y BAR */}
      <div className={s.a11yBar}>
        <span>📞 ¿Necesitas ayuda? Llámanos al <strong>600 LongVivIA</strong></span>
        <div style={{ display: "flex", gap: 10 }}>
          <button className={s.a11yBtn} onClick={() => { document.body.style.fontSize = "120%"; }}>A+ Texto grande</button>
          <button className={s.a11yBtn} onClick={() => { document.body.style.fontSize = "100%"; }}>A Normal</button>
        </div>
      </div>

      {/* NAV */}
      <nav className={s.nav}>
        <a href="#" className={s.logoWrap}>
          <svg width="32" height="38" viewBox="0 0 32 38" fill="none">
            <path d="M16,36 C16,36 6,26 8,14 C10,4 18,1 18,1" stroke="#1B5E3B" strokeWidth="1.8" strokeLinecap="round"/>
            <ellipse cx="12" cy="17" rx="6.5" ry="3.2" transform="rotate(-38,12,17)" fill="#1B5E3B"/>
            <ellipse cx="16" cy="11" rx="6" ry="2.8" transform="rotate(-22,16,11)" fill="#1B5E3B" opacity=".8"/>
            <ellipse cx="19" cy="6" rx="5" ry="2.4" transform="rotate(-10,19,6)" fill="#2D8A5F" opacity=".65"/>
            <ellipse cx="8" cy="24" rx="5.5" ry="2.8" transform="rotate(-52,8,24)" fill="#1B5E3B" opacity=".9"/>
            <ellipse cx="6" cy="30" rx="5" ry="2.4" transform="rotate(-62,6,30)" fill="#2D8A5F" opacity=".75"/>
            <circle cx="12" cy="20" r="2.2" fill="#C9973A"/>
            <circle cx="16" cy="14" r="1.8" fill="#C9973A" opacity=".8"/>
            <circle cx="7" cy="27" r="1.8" fill="#C9973A" opacity=".85"/>
          </svg>
          <div className={s.logoText}>LongViv<span>IA</span></div>
        </a>
        <ul className={s.navLinks}>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#vivian">VIVIAN IA</a></li>
          <li><a href="#como">¿Cómo funciona?</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><span className={s.freeBadge}>GRATIS</span><a href="#registro" className={s.btnNav}>Comenzar →</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg}></div>
        <div className={s.heroContent}>
          <div className={s.heroPill}>Plataforma 100% gratuita · Chile</div>
          <h1 className={s.h1}>
            <span className={s.break}>60 no es</span>
            <span className={s.break}>el límite.</span>
            <em>Es tu punto</em>
            <em> de partida.</em>
          </h1>
          <p className={s.heroDesc}>LongVivIA es tu plataforma de salud, bienestar y experiencias — con VIVIAN, la IA que te acompaña en tu etapa más libre y poderosa.</p>
          <div className={s.heroCtas}>
            <a href="#registro" className={s.btnPrimary}>Comenzar gratis →</a>
            <a href="/vivian" className={s.btnGhost}>Conocer a VIVIAN ↓</a>
          </div>
          <div className={s.heroProof}>
            <div><div className={s.proofNum}>3.5M</div><div className={s.proofLabel}>personas en su prime en Chile</div></div>
            <div><div className={s.proofNum}>100%</div><div className={s.proofLabel}>gratuito, siempre</div></div>
            <div><div className={s.proofNum}>24/7</div><div className={s.proofLabel}>VIVIAN contigo</div></div>
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
                <div className={s.vivianMsgs}>
                  <div className={s.vmBot}>¡Hola María! Hoy es un día perfecto para moverse. Tienes yoga a las 10 AM. ¿Lista? 🌿</div>
                  <div className={s.vmUsr}>Lista. ¿Y el tour del sábado?</div>
                  <div className={s.vmBot}>¡Confirmado! Cajón del Maipo, grupo de 10 personas. <strong>Tu semana tiene todo.</strong> 🏔️</div>
                </div>
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

      {/* PRIME SECTION */}
      <section className={s.primeSection}>
        <div className={s.primeLeft}>
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
            ].map((c) => (
              <div key={c.title} className={s.primeCard}>
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
          <div className={s.secLabel}>Conoce a VIVIAN</div>
          <h2 className={s.secTitle}>La IA que habla<br /><em>tu idioma</em></h2>
          <p className={s.secSub}>VIVIAN no es un chatbot frío. Es una compañía cálida, paciente y siempre disponible — que te conoce, recuerda lo que importa y actúa cuando lo necesitas.</p>
          <div className={s.vivianFeats}>
            {[
              { icon: "🏥", title: "Asistente de salud activa", desc: "Recuerda medicamentos, agenda citas y responde preguntas médicas con claridad." },
              { icon: "💬", title: "Compañía real, 24/7", desc: "Siempre disponible para conversar, escucharte y acompañarte — sin prisa ni tecnicismos." },
              { icon: "✈️", title: "Guía de experiencias", desc: "Recomienda tours, clases y actividades según tus gustos, condición y presupuesto." },
              { icon: "🎤", title: "Voz o texto, tú decides", desc: "Puedes hablarle o escribirle. VIVIAN entiende ambos con la misma calidez." },
            ].map((f) => (
              <div key={f.title} className={s.vf}>
                <div className={s.vfIco}>{f.icon}</div>
                <div className={s.vfText}><strong>{f.title}</strong><span>{f.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.vivianVisual}>
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
            <div className={s.vpMsgs}>
              <div className={s.vpBot}>¡Buenos días! ☀️ Recuerda tomar el Enalapril. Tienes médico a las 11 AM.</div>
              <div className={s.vpUsr}>¿Hay algo bueno para este fin de semana?</div>
              <div className={s.vpBot}>¡Sí! Basado en lo que te gusta, te recomiendo el Cajón del Maipo el sábado. <strong>¿Lo reservamos?</strong> 🏔️</div>
              <div className={s.vpUsr}>Sí, perfecto</div>
              <div className={s.vpBot}>Listo, reservado. 3 personas del grupo ya confirmaron. ¡Va a ser increíble! 🌿</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className={s.servicesSection} id="servicios">
        <div className={s.secLabel} style={{ marginBottom: 16 }}>Todo en un lugar</div>
        <h2 className={s.secTitle} style={{ color: "white", marginBottom: 16 }}>Servicios hechos<br /><em style={{ color: "var(--v4)" }}>para tu energía</em></h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,.6)", fontWeight: 300, lineHeight: 1.7, maxWidth: 520, marginBottom: 64 }}>Accede a todo de forma simple. Si necesitas ayuda, VIVIAN te guía o llamas al 600 LongVivIA.</p>
        <div className={s.servicesGrid}>
          {[
            { icon: "🏥", title: "Telemedicina", desc: "Consultas online con médicos y especialistas. Sin esperas. Compatible con Fonasa e Isapres.", link: "Agendar →" },
            { icon: "🧘", title: "Bienestar activo", desc: "Clases de yoga, pilates y funcional. En vivo y grabadas. Instructores especializados.", link: "Ver clases →" },
            { icon: "✈️", title: "Ocio y experiencias", desc: "Tours con grupos pequeños, tu ritmo y precios exclusivos. Natura, gastronomía, cultura.", link: "Explorar →" },
            { icon: "🍽️", title: "Nutrición", desc: "Planes personalizados con nutricionistas. Seguimiento y recetas pensadas para ti.", link: "Consultar →" },
            { icon: "👥", title: "Comunidad", desc: "Grupos por intereses, talleres y actividades sociales con personas que comparten tu energía.", link: "Unirme →" },
            { icon: "💊", title: "Gestión de salud", desc: "Recordatorios, historial de citas y seguimiento de indicadores. VIVIAN lo organiza todo.", link: "Mi salud →" },
          ].map((srv) => (
            <div key={srv.title} className={s.srvCard}>
              <div className={s.srvIcon}>{srv.icon}</div>
              <h3>{srv.title}</h3>
              <p>{srv.desc}</p>
              <a href="#" className={s.srvLink}>{srv.link}</a>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className={s.testimonials} id="como">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className={s.secLabel} style={{ color: "var(--v3)", textAlign: "center" }}>Lo que dicen quienes ya viven su prime</div>
          <h2 className={s.secTitle} style={{ color: "var(--n2)", textAlign: "center" }}>Historias <em>reales</em></h2>
        </div>
        <div className={s.testGrid}>
          {[
            { text: "VIVIAN me recuerda mis medicamentos cada mañana y me ayudó a encontrar un médico online en minutos. Y todo gratis. No lo podía creer.", name: "María Teresa R.", age: "68 años · Santiago", ava: "👩" },
            { text: "Le pregunté a VIVIAN qué hacer el fin de semana y me recomendó un tour perfecto. Fui al Cajón con un grupo encantador y llegué con más energía que nunca.", name: "Jorge A.", age: "72 años · Viña del Mar", ava: "👨" },
            { text: "Pensé que la tecnología no era para mí. Pero VIVIAN es tan clara y paciente que en una semana ya reservaba mis clases sola y me sentía dueña de mi tiempo.", name: "Carmen L.", age: "65 años · Concepción", ava: "👩" },
          ].map((t) => (
            <div key={t.name} className={s.testCard}>
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
          <input type="email" className={s.ctaInput} placeholder="tu@correo.cl" />
          <button className={s.btnGold}>Comenzar gratis →</button>
        </div>
        <p className={s.ctaNote}>Sin tarjeta de crédito. Sin letra chica. O llámanos al <strong>600 LongVivIA</strong></p>
      </section>

      {/* FOOTER */}
      <footer className={s.footer} id="contacto">
        <div className={s.footerGrid}>
          <div>
            <a href="#" className={s.logoWrap} style={{ marginBottom: 14, display: "inline-flex" }}>
              <svg width="28" height="34" viewBox="0 0 32 38" fill="none">
                <path d="M16,36 C16,36 6,26 8,14 C10,4 18,1 18,1" stroke="#52B788" strokeWidth="1.8" strokeLinecap="round"/>
                <ellipse cx="12" cy="17" rx="6.5" ry="3.2" transform="rotate(-38,12,17)" fill="#52B788"/>
                <ellipse cx="16" cy="11" rx="6" ry="2.8" transform="rotate(-22,16,11)" fill="#52B788" opacity=".8"/>
                <ellipse cx="8" cy="24" rx="5.5" ry="2.8" transform="rotate(-52,8,24)" fill="#52B788" opacity=".9"/>
                <circle cx="12" cy="20" r="2.2" fill="#F5DFA0"/>
                <circle cx="7" cy="27" r="1.8" fill="#F5DFA0" opacity=".85"/>
              </svg>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", marginLeft: 8 }}>LongViv<span style={{ color: "#C9973A" }}>IA</span></div>
            </a>
            <p className={s.footerDesc}>Plataforma digital gratuita de salud, bienestar y experiencias para personas en su prime en Chile. Financiada por publicidad y alianzas — nunca por tus datos.</p>
            <div className={s.footerPill}>🆓 100% gratuito para siempre</div>
          </div>
          <div className={s.footerCol}>
            <h4>Servicios</h4>
            <ul className={s.footerLinks}>
              {["Telemedicina","Bienestar","Tours","Nutrición","VIVIAN IA"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className={s.footerCol}>
            <h4>Empresa</h4>
            <ul className={s.footerLinks}>
              {["Quiénes somos","Proveedores","Anunciantes","Trabaja aquí"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className={s.footerCol}>
            <h4>Ayuda</h4>
            <ul className={s.footerLinks}>
              {["Centro de ayuda","Términos","Privacidad","Accesibilidad"].map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className={s.footerBottom}>
          <span>© 2026 LongViva SpA · Santiago, Chile</span>
          <div className={s.footerContact}>📞 600 LongVivIA · hola@longvivia.cl</div>
        </div>
      </footer>
    </>
  );
}
