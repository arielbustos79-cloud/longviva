"use client";

import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

export default function TerminosPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>

      {/* Header */}
      <header style={{ background: "var(--v2)", padding: "16px 40px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
      </header>

      {/* Contenido */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 80px" }}>
        <p style={{ fontSize: 13, color: "var(--gris)", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Documentos legales</p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
          Términos y Condiciones
        </h1>
        <p style={{ color: "var(--gris)", fontSize: 14, marginBottom: 48 }}>Última actualización: julio de 2025</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

          <Section titulo="1. Aceptación de los términos">
            Al acceder y utilizar la plataforma LongVivIA (longvivia.cl), usted acepta quedar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, le pedimos que no utilice nuestros servicios.
          </Section>

          <Section titulo="2. Descripción del servicio">
            LongVivIA es una plataforma digital de salud, bienestar y experiencias dirigida a personas de 60 años o más en Chile. Ofrecemos acceso a VIVIAN, un asistente de inteligencia artificial conversacional, y en el futuro próximo a servicios de agenda, recordatorio de medicamentos, telemedicina, bienestar activo y tours.
          </Section>

          <Section titulo="3. Carácter informativo — no es atención médica">
            <strong>VIVIAN no es un profesional de la salud.</strong> Las respuestas entregadas por VIVIAN tienen carácter exclusivamente informativo y de acompañamiento. No constituyen diagnóstico, tratamiento ni consejo médico. Ante cualquier situación de salud, consulte siempre a un médico u otro profesional habilitado.
          </Section>

          <Section titulo="4. Elegibilidad">
            El servicio está diseñado para personas residentes en Chile. Al registrarse, declara tener 18 años o más y que la información proporcionada es veraz.
          </Section>

          <Section titulo="5. Cuenta y acceso">
            El acceso a la plataforma se realiza mediante un enlace mágico enviado a su correo electrónico. Usted es responsable de mantener la confidencialidad de su cuenta y de notificarnos de inmediato ante cualquier uso no autorizado.
          </Section>

          <Section titulo="6. Uso aceptable">
            Usted se compromete a no utilizar LongVivIA para fines ilegales, para compartir información falsa, para hostigar o dañar a terceros, ni para intentar vulnerar la seguridad de la plataforma.
          </Section>

          <Section titulo="7. Propiedad intelectual">
            El nombre LongVivIA, el nombre VIVIAN, el diseño, los logotipos y los contenidos propios de la plataforma son propiedad de LongVivIA. Queda prohibida su reproducción o uso sin autorización escrita.
          </Section>

          <Section titulo="8. Limitación de responsabilidad">
            LongVivIA no será responsable por daños directos, indirectos o consecuentes derivados del uso o imposibilidad de uso del servicio, en la máxima medida permitida por la ley chilena.
          </Section>

          <Section titulo="9. Modificaciones">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Le notificaremos cambios relevantes mediante el correo asociado a su cuenta o mediante aviso en la plataforma. El uso continuado del servicio implica aceptación de los nuevos términos.
          </Section>

          <Section titulo="10. Ley aplicable">
            Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa será sometida a los tribunales competentes de Santiago de Chile.
          </Section>

          <Section titulo="11. Contacto">
            Para consultas sobre estos términos, escríbanos a{" "}
            <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v2)", textDecoration: "underline" }}>hola@longvivia.cl</a>.
          </Section>

        </div>

        <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #E0EAE3", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link href="/privacidad" style={{ color: "var(--v2)", textDecoration: "underline", fontSize: 15 }}>
            Política de Privacidad →
          </Link>
          <Link href="/" style={{ color: "var(--gris)", textDecoration: "none", fontSize: 15 }}>
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{
        fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 600,
        color: "var(--v2)", marginBottom: 10,
      }}>
        {titulo}
      </h2>
      <p style={{ color: "var(--n2)", lineHeight: 1.8, fontSize: 16 }}>{children}</p>
    </div>
  );
}
