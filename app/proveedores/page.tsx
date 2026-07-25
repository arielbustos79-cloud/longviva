import Link from "next/link";
import OliveBranch from "@/components/OliveBranch";

export default function ProveedoresPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--crema)", fontFamily: "DM Sans, sans-serif" }}>
      <header style={{ background: "var(--v2)", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <OliveBranch size={32} variant="light" />
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "white" }}>
            LongViv<span style={{ color: "var(--d2)" }}>IA</span>
          </span>
        </Link>
      </header>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px 96px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--v2)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>
          Empresa
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 4vw, 48px)", color: "var(--n2)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px" }}>
          Proveedores y aliados
        </h1>

        <div style={{ background: "white", borderRadius: 20, padding: "32px", border: "1.5px solid var(--v5)", marginBottom: 24 }}>
          <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.75, margin: "0 0 20px" }}>
            LongVivIA es la plataforma de salud, bienestar y experiencias para personas en su prime en Chile. Conectamos a más de miles de usuarios con servicios de calidad — no operamos los servicios directamente, los cubramos y derivamos a quienes los ofrecen mejor.
          </p>
          <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.75, margin: "0 0 20px" }}>
            Si tu institución, clínica, farmacia, agencia o servicio quiere ser parte de nuestra red de derivación, nos interesa conocerte. El modelo es simple: tú provees el servicio, nosotros orientamos a los usuarios que encajan con tu oferta.
          </p>
          <p style={{ fontSize: 17, color: "var(--gris)", lineHeight: 1.75, margin: 0 }}>
            Estamos construyendo esta sección. Mientras tanto, escríbenos directamente:
          </p>
        </div>

        <a
          href="mailto:hola@longvivia.cl"
          style={{
            display: "inline-block", background: "var(--v2)", color: "white",
            padding: "14px 32px", borderRadius: 50, fontSize: 16, fontWeight: 700,
            textDecoration: "none", marginBottom: 32,
          }}
        >
          hola@longvivia.cl →
        </a>

        <div style={{ textAlign: "center", paddingTop: 32, borderTop: "1px solid var(--v5)" }}>
          <Link href="/" style={{ color: "var(--v2)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
