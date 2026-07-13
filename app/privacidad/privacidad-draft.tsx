// DRAFT — No publicado. Base para revisión legal con LongViva SpA.
// Última edición: julio 2026
// Para publicar: resolver puntos marcados como PENDIENTE — revisión legal

"use client";

import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

export default function PrivacidadPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>

      <header style={{ background: "var(--v2)", padding: "16px 40px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 80px" }}>
        <p style={{ fontSize: 13, color: "var(--gris)", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>Documentos legales</p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: "var(--n2)", marginBottom: 8 }}>
          Política de Privacidad
        </h1>
        {/* Fecha corregida a 2026 */}
        <p style={{ color: "var(--gris)", fontSize: 14, marginBottom: 48 }}>Última actualización: julio de 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

          {/* PENDIENTE — revisión legal: quién es el responsable/titular. Pendiente hasta constituir LongViva SpA. */}
          <Section titulo="1. Quién trata sus datos">
            LongVivIA, plataforma digital operada en Chile, es responsable del tratamiento de sus datos personales. Puede contactarnos en{" "}
            <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v2)", textDecoration: "underline" }}>hola@longvivia.cl</a>.
          </Section>

          {/* Corregido: se agregan datos de salud como categoría sensible */}
          <Section titulo="2. Qué datos recopilamos">
            Recopilamos los datos que usted nos proporciona voluntariamente al registrarse (nombre, correo electrónico, ciudad) y los que se generan al usar el servicio (conversaciones con VIVIAN, fecha y hora de acceso). Si utiliza el canal de WhatsApp, también procesamos su número de teléfono.
            {"\n\n"}
            Adicionalmente, si usted comparte información sobre su estado de salud, condiciones médicas o medicamentos en el contexto de su interacción con VIVIAN, dichos datos son considerados <strong>datos sensibles de salud</strong> conforme a la Ley N° 19.628 y serán tratados con el nivel de protección correspondiente.
          </Section>

          <Section titulo="3. Para qué usamos sus datos">
            Utilizamos sus datos para: (a) prestarle el servicio de asistencia personalizada a través de VIVIAN; (b) enviarle el enlace de acceso a su cuenta; (c) mejorar la plataforma y personalizar su experiencia; (d) comunicarle novedades relevantes del servicio, siempre con posibilidad de cancelar la suscripción.
          </Section>

          <Section titulo="4. Base legal del tratamiento">
            El tratamiento se realiza en virtud de la Ley N° 19.628 sobre Protección de la Vida Privada de Chile. La base legal es su consentimiento explícito al registrarse y el cumplimiento de la relación contractual derivada del uso del servicio.
          </Section>

          {/* PENDIENTE — revisión legal: compartir datos con terceros. Contradice modelo de alianzas B2B. No publicar hasta definir estrategia de datos. */}
          <Section titulo="5. Con quién compartimos sus datos">
            No vendemos ni cedemos sus datos personales a terceros con fines comerciales. Podemos compartir datos con proveedores tecnológicos que nos ayudan a operar la plataforma (Supabase para base de datos, Anthropic para el modelo de IA, Twilio para WhatsApp, Resend para correo electrónico), quienes están obligados a tratar sus datos de forma confidencial y solo para los fines indicados.
          </Section>

          {/* Agregado: transferencia internacional de datos */}
          <Section titulo="6. Transferencia internacional de datos">
            Algunos de nuestros proveedores tecnológicos operan con servidores ubicados fuera de Chile. Específicamente, Anthropic (modelo de IA) y Twilio (WhatsApp) procesan datos en servidores en Estados Unidos. Al usar nuestros servicios, usted consiente esta transferencia internacional, que se realiza bajo estándares de seguridad y confidencialidad equivalentes a los exigidos por la legislación chilena.
          </Section>

          <Section titulo="7. Conversaciones con VIVIAN">
            Las conversaciones que sostiene con VIVIAN se almacenan en nuestra base de datos con el fin de mantener contexto entre sesiones y mejorar la calidad de las respuestas. El contenido de sus conversaciones no es revisado por personas salvo requerimiento legal o para resolver un problema técnico reportado por usted.
          </Section>

          <Section titulo="8. Seguridad">
            Aplicamos medidas técnicas y organizativas razonables para proteger sus datos contra acceso no autorizado, pérdida o divulgación. El acceso a la plataforma se realiza mediante enlace seguro enviado a su correo, sin necesidad de contraseña.
          </Section>

          <Section titulo="9. Conservación de datos">
            Conservamos sus datos mientras mantenga su cuenta activa. Si solicita la eliminación de su cuenta, borraremos sus datos personales en un plazo máximo de 30 días, salvo obligación legal de conservarlos.
          </Section>

          <Section titulo="10. Sus derechos">
            De acuerdo con la Ley N° 19.628, usted tiene derecho a acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales (derechos ARCO). Para ejercerlos, escríbanos a{" "}
            <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v2)", textDecoration: "underline" }}>hola@longvivia.cl</a>{" "}
            indicando su solicitud. Responderemos en un plazo máximo de 15 días hábiles.
          </Section>

          {/* PENDIENTE — revisión legal: cookies y publicidad. Contradice modelo de publicidad segmentada. No publicar hasta definir estrategia. */}
          <Section titulo="11. Cookies y tecnologías similares">
            Utilizamos cookies de sesión estrictamente necesarias para mantenerle conectado a la plataforma. No utilizamos cookies de seguimiento ni publicidad de terceros.
          </Section>

          <Section titulo="12. Cambios a esta política">
            Podemos actualizar esta política periódicamente. Le notificaremos cambios relevantes por correo electrónico o mediante aviso en la plataforma. La fecha de la última actualización siempre estará indicada al inicio de este documento.
          </Section>

          <Section titulo="13. Contacto">
            Para cualquier consulta sobre privacidad o protección de datos, contáctenos en{" "}
            <a href="mailto:hola@longvivia.cl" style={{ color: "var(--v2)", textDecoration: "underline" }}>hola@longvivia.cl</a>.
          </Section>

        </div>

        <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #E0EAE3", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link href="/terminos" style={{ color: "var(--v2)", textDecoration: "underline", fontSize: 15 }}>
            Términos y Condiciones →
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
      <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 600, color: "var(--v2)", marginBottom: 10 }}>
        {titulo}
      </h2>
      <p style={{ color: "var(--n2)", lineHeight: 1.8, fontSize: 16 }}>{children}</p>
    </div>
  );
}
