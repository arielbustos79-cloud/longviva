'use client'

import { useState } from 'react'
import Link from 'next/link'

// SVG tulipán rojo — símbolo oficial del Parkinson desde 2005
function TulipIcon({ size = 28 }: { size?: number }) {
  const h = Math.round(size * 1.36)
  return (
    <svg width={size} height={h} viewBox="0 0 28 38" fill="none" aria-label="Tulipán rojo — símbolo del Parkinson">
      <path d="M14 38 L14 24" stroke="#3D7A3D" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M14 31 Q7 26 8.5 18 Q11 23 14 31Z" fill="#4A9A4A" />
      <path d="M14 22 Q4 18 6 7 Q8 0 12 6 Q12 15 14 22Z" fill="#C82424" />
      <path d="M14 22 Q24 18 22 7 Q20 0 16 6 Q16 15 14 22Z" fill="#B51E1E" />
      <path d="M14 22 Q10 14 11.5 5 Q13 0 14 0 Q15 0 16.5 5 Q18 14 14 22Z" fill="#E03535" />
      <path d="M14 20 Q12 13 13 5" stroke="rgba(255,160,160,0.35)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function ParkinAndSonLanding() {
  const [formData, setFormData] = useState({ nombre: '', email: '', rol: '', ciudad: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: conectar con Supabase waitlist
    setSubmitted(true)
  }

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#1C1030', background: '#F9F8FD' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        background: 'rgba(249,248,253,0.94)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(92,59,176,0.1)',
        padding: '14px 0',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <TulipIcon size={26} />
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#3A1F82' }}>
              Parkin<span style={{ color: '#D9920A', fontStyle: 'italic' }}>&</span>Son
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6B5F80', borderLeft: '2px solid #C9B8F0', paddingLeft: 10 }}>
              by Longviva SPA
            </span>
          </div>
          <Link href="/parkinandson/norita" style={{
            background: '#3A1F82', color: 'white',
            padding: '10px 22px', borderRadius: '50px',
            fontSize: 14, fontWeight: 500, textDecoration: 'none',
            transition: 'background 0.2s',
          }}>
            Hablar con NORITA
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(150deg, #2A1060 0%, #1A0840 50%, #0D0528 100%)',
        display: 'flex', alignItems: 'center',
        padding: '100px 24px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Orb */}
        <div style={{
          position: 'absolute', right: -100, top: -100,
          width: 550, height: 550, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(92,59,176,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(139,108,212,0.15)', border: '1px solid rgba(139,108,212,0.4)',
            color: '#C9B8F0', padding: '7px 16px', borderRadius: '50px',
            fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
            marginBottom: 28,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F0B82A', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            Para todas las edades · Chile
          </div>

          {/* Título */}
          <div style={{ fontSize: 28, color: 'white', marginBottom: 4, fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
            Bienvenido a
          </div>
          <div style={{ fontSize: 'clamp(52px, 8vw, 88px)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, lineHeight: 1, marginBottom: 18 }}>
            <span style={{ color: 'white' }}>Parkin</span>
            <span style={{ color: '#F0B82A', fontStyle: 'italic', textShadow: '0 0 40px rgba(240,184,42,0.4)' }}>&</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Son</span>
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#C9B8F0', fontStyle: 'italic', marginBottom: 20 }}>
            Parkinson. En familia.
          </div>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', marginBottom: 44, maxWidth: 480, fontWeight: 300, lineHeight: 1.7 }}>
            NORITA te acompaña, orienta y abre un mundo de alternativas — para quien tiene Parkinson y para quienes lo acompañan.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#lista" style={{
              background: 'linear-gradient(135deg, #D9920A, #F0B82A)',
              color: '#100820', padding: '17px 34px', borderRadius: '50px',
              fontSize: 17, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(217,146,10,0.45)',
              display: 'inline-block',
            }}>
              Quiero acceso anticipado
            </a>
            <Link href="/parkinandson/norita" style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.28)',
              color: 'white', padding: '17px 34px', borderRadius: '50px',
              fontSize: 17, textDecoration: 'none', display: 'inline-block',
            }}>
              Conocer a NORITA →
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
          animation: 'fadeUpDown 2s ease-in-out infinite',
        }}>
          <div style={{
            width: 24, height: 24,
            borderRight: '2px solid rgba(139,108,212,0.7)',
            borderBottom: '2px solid rgba(139,108,212,0.7)',
            transform: 'rotate(45deg)',
          }} />
        </div>
      </section>

      {/* ECOSYSTEM BAR */}
      <div style={{ background: '#F0ECFC', borderBottom: '1px solid #C9B8F0', padding: '14px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap', fontSize: 14, color: '#5C3BB0' }}>
          <span>Parte del ecosistema</span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 600, color: '#3A1F82' }}>Longviva SPA</span>
          <span style={{ color: '#8B6CD4' }}>·</span>
          <span style={{ background: 'white', border: '1px solid #C9B8F0', borderRadius: '50px', padding: '3px 14px', fontSize: 13, fontWeight: 600 }}>
            Parkin<span style={{ color: '#D9920A', fontStyle: 'italic' }}>&</span>Son
          </span>
          <span style={{ color: '#8B6CD4' }}>·</span>
          <Link href="/" style={{ background: 'white', border: '1px solid #C9B8F0', borderRadius: '50px', padding: '3px 14px', fontSize: 13, fontWeight: 600, textDecoration: 'none', color: '#3A1F82' }}>
            LongvivIA
          </Link>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(92,59,176,0.1)', padding: '24px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: '🧠', text: 'IA especializada en Parkinson' },
            { icon: '👨‍👩‍👧', text: 'Para todas las edades' },
            { icon: '💬', text: 'Disponible 24/7 por WhatsApp' },
            { icon: '🔒', text: 'Privacidad total · sin vender datos' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 28px', borderRight: '1px solid rgba(92,59,176,0.1)', color: '#3A1F82', fontSize: 15, fontWeight: 500 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* AWARENESS TULIPÁN */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(210,40,40,0.07)', border: '1px solid rgba(210,40,40,0.18)', borderRadius: '50px', padding: '8px 18px', marginBottom: 20, fontSize: 14, color: '#a82020', fontWeight: 500 }}>
            <TulipIcon size={16} />
            Símbolo oficial del Parkinson desde 2005
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 44px)', color: '#1E0F45', marginBottom: 16, fontWeight: 600 }}>
            El Parkinson no elige edad.
          </h2>
          <p style={{ fontSize: 18, color: '#6B5F80', maxWidth: 560, fontWeight: 300, lineHeight: 1.7, marginBottom: 28 }}>
            El 10–15% de los diagnósticos ocurren antes de los 50 años. Parkin&Son acompaña a todos — jóvenes, adultos, personas mayores — y a su familia completa.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['Jóvenes con Parkinson', 'Adultos 40–60', 'Mayores de 60', 'Familias y cuidadores'].map((tag) => (
              <span key={tag} style={{ background: '#3A1F82', color: 'white', padding: '8px 18px', borderRadius: '50px', fontSize: 14, fontWeight: 500 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NORITA CTA */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #1E0F45, #2A1060)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, #3A1F82, #8B6CD4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, margin: '0 auto 20px', boxShadow: '0 8px 32px rgba(92,59,176,0.4)' }}>
            🌸
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, color: 'white', marginBottom: 14, fontWeight: 600 }}>
            NORITA te está esperando
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', marginBottom: 32, lineHeight: 1.7, fontWeight: 300 }}>
            Cálida, paciente y disponible ahora mismo. Empieza con una pregunta, una duda, o simplemente cuéntale cómo estás.
          </p>
          <Link href="/parkinandson/norita" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #D9920A, #F0B82A)',
            color: '#100820', padding: '18px 40px', borderRadius: '50px',
            fontSize: 18, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(217,146,10,0.45)',
          }}>
            Hablar con NORITA ahora →
          </Link>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="lista" style={{ padding: '80px 24px', background: 'linear-gradient(150deg, #2A1060, #1A0840)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#C9B8F0', marginBottom: 12 }}>
            Acceso anticipado
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, color: 'white', marginBottom: 14, fontWeight: 600 }}>
            Sé de los primeros en acceder.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.62)', marginBottom: 36, fontWeight: 300 }}>
            Parkin&Son está en desarrollo. Únete y recibe acceso gratuito prioritario cuando abramos.
          </p>

          {submitted ? (
            <div style={{ background: 'rgba(139,108,212,0.15)', border: '1px solid rgba(139,108,212,0.35)', borderRadius: 16, padding: 36, color: 'white' }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>💜</div>
              <strong style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>¡Ya estás dentro!</strong>
              Te avisaremos cuando Parkin&Son abra sus puertas.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { name: 'nombre', placeholder: 'Tu nombre', type: 'text' },
                { name: 'email', placeholder: 'tu@email.com', type: 'email' },
              ].map((f) => (
                <input
                  key={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.name === 'email'}
                  value={formData[f.name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                  style={{
                    background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(139,108,212,0.35)',
                    color: 'white', padding: '14px 18px', borderRadius: 12,
                    fontSize: 16, fontFamily: 'DM Sans, sans-serif', outline: 'none',
                  }}
                />
              ))}
              <select
                required
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                style={{
                  background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(139,108,212,0.35)',
                  color: formData.rol ? 'white' : 'rgba(255,255,255,0.4)',
                  padding: '14px 18px', borderRadius: 12, fontSize: 16,
                  fontFamily: 'DM Sans, sans-serif', outline: 'none',
                }}
              >
                <option value="" disabled>¿Cuál es tu rol?</option>
                <option value="paciente_joven">Tengo Parkinson (menor de 50)</option>
                <option value="paciente">Tengo Parkinson</option>
                <option value="familiar">Soy familiar / cuidador</option>
                <option value="profesional">Soy profesional de salud</option>
              </select>
              <input
                type="text"
                placeholder="¿En qué ciudad estás?"
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                style={{
                  background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(139,108,212,0.35)',
                  color: 'white', padding: '14px 18px', borderRadius: 12,
                  fontSize: 16, fontFamily: 'DM Sans, sans-serif', outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  gridColumn: '1 / -1',
                  background: 'linear-gradient(135deg, #D9920A, #F0B82A)',
                  color: '#100820', border: 'none', cursor: 'pointer',
                  padding: '17px 36px', borderRadius: 12,
                  fontSize: 18, fontWeight: 700, fontFamily: 'DM Sans, sans-serif',
                  boxShadow: '0 4px 24px rgba(217,146,10,0.4)',
                }}
              >
                Quiero acceso gratuito →
              </button>
            </form>
          )}
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', marginTop: 14 }}>
            Sin spam. Sin venta de datos. Puedes salirte cuando quieras.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#100820', color: 'rgba(255,255,255,0.42)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#C9B8F0', fontWeight: 600 }}>
              Parkin<span style={{ color: '#F0B82A', fontStyle: 'italic' }}>&</span>Son
            </div>
            <div style={{ fontSize: 13, marginTop: 3 }}>Parkinson. En familia. · Chile · by Longviva SPA</div>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidad</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Términos</a>
            <a href="mailto:hola@parkinandson.cl" style={{ color: 'inherit', textDecoration: 'none' }}>hola@parkinandson.cl</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes fadeUpDown { 0%,100%{opacity:0.35;transform:translateX(-50%) translateY(0)} 50%{opacity:0.85;transform:translateX(-50%) translateY(7px)} }
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.4); }
        select option { background: #1A0840; }
      `}</style>
    </div>
  )
}
