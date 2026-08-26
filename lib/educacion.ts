// Catálogo curado — pilar Educación Continua.
// Mismo patrón que lib/hospitales.ts: datos estáticos verificados a mano,
// no una integración en vivo con cada proveedor (no existen APIs públicas
// viables para SENCE, Coursera, Udemy, etc. de forma unificada).
//
// MANTENIMIENTO:
// - Entradas de Udemy: re-verificar mensualmente (precios cambian sin aviso)
// - Resto de proveedores: re-verificar trimestralmente
// - Última verificación general de este catálogo: 21-08-2026

export type TemaEducacion =
  | "tecnologia"
  | "finanzas"
  | "idiomas"
  | "salud"
  | "oficios"
  | "arte"
  | "digital_basico";

export const TEMAS: { id: TemaEducacion; label: string }[] = [
  { id: "tecnologia", label: "Tecnología y computación" },
  { id: "finanzas", label: "Finanzas personales y previsión" },
  { id: "idiomas", label: "Idiomas" },
  { id: "salud", label: "Salud y bienestar" },
  { id: "oficios", label: "Oficios y emprendimiento" },
  { id: "arte", label: "Arte, cultura e historia" },
  { id: "digital_basico", label: "Habilidades digitales básicas" },
];

export type CursoEducacion = {
  titulo: string;
  proveedor: string;
  url: string;
  temas: TemaEducacion[]; // la mayoría aplica a 1 tema; portales tipo PUCV aplican a varios
  esGratuito: boolean;
  requiereRegistro?: boolean; // muestra badge "Gratuito · Requiere registro"
  aclaracion: string | null;
  fechaVerificacion: string; // YYYY-MM-DD
  mostrarFechaVerificacion?: boolean; // false para portales generales (no cursos individuales) — default true
};

export const CATALOGO_EDUCACION: CursoEducacion[] = [
  // ── Multi-tema — portales, no cursos individuales ──────────────────────
  // PUCV: verificado 25-08-2026 que la URL del brief (/masterclass) redirige
  // a un evento puntual ya vencido (abril 2025) — justo lo que el brief pide
  // evitar. Se usa /todos-los-eventos/ en su lugar: listado en vivo,
  // confirmado con eventos reales de septiembre-octubre 2026 al verificar.
  {
    titulo: "Masterclass gratuitas PUCV",
    proveedor: "PUCV — Formación Continua",
    url: "https://formacioncontinuapucv.cl/todos-los-eventos/",
    temas: ["tecnologia", "salud", "finanzas", "arte", "digital_basico"],
    esGratuito: true,
    requiereRegistro: true,
    aclaracion: "Webinars gratuitos de la Pontificia Universidad Católica de Valparaíso. La oferta varía según convocatoria — revisa el portal para ver las próximas fechas disponibles.",
    fechaVerificacion: "2026-08-25",
    mostrarFechaVerificacion: false,
  },

  // ── Tecnología y computación ──────────────────────────────────────────
  {
    titulo: "Conceptos Bilingües Básicos de Tecnología de la Información",
    proveedor: "Udemy",
    url: "https://www.udemy.com/course/conceptos-bilingues-basicos-de-tecnologia-de-la-informacion/",
    temas: ["tecnologia"],
    esGratuito: true,
    aclaracion: "Curso gratuito confirmado. Los precios en Udemy pueden cambiar sin aviso — re-verificar mensualmente.",
    fechaVerificacion: "2026-08-21",
  },
  {
    titulo: "Competencias digitales de ofimática: Microsoft Excel",
    proveedor: "Coursera — Universitat Autònoma de Barcelona",
    url: "https://www.coursera.org/learn/competencias-digitales-ofimatica-excel",
    temas: ["tecnologia"],
    esGratuito: true,
    aclaracion: "El contenido del curso es gratuito en modalidad auditoría; el certificado de finalización tiene costo.",
    fechaVerificacion: "2026-08-21",
  },

  // ── Finanzas personales y previsión ───────────────────────────────────
  {
    titulo: "Finanzas Personales: Curso básico expreso GRATIS",
    proveedor: "Udemy",
    url: "https://www.udemy.com/course/finanzas-personales-curso-basico-expreso-gratis/",
    temas: ["finanzas"],
    esGratuito: true,
    aclaracion: "Curso gratuito confirmado. Los precios en Udemy pueden cambiar sin aviso — re-verificar mensualmente.",
    fechaVerificacion: "2026-08-21",
  },

  // ── Idiomas ────────────────────────────────────────────────────────────
  {
    titulo: "Curso de Inglés: Vocabulario Base para Principiantes",
    proveedor: "Udemy",
    url: "https://www.udemy.com/course/ingles-nivel-1-ingles-basico-para-tu-dia-a-dia/",
    temas: ["idiomas"],
    esGratuito: true,
    aclaracion: "Curso gratuito confirmado. Los precios en Udemy pueden cambiar sin aviso — re-verificar mensualmente.",
    fechaVerificacion: "2026-08-21",
  },

  // ── Salud y bienestar ──────────────────────────────────────────────────
  {
    titulo: "Gestión del estrés y Mindfulness",
    proveedor: "Coursera — Universidad Anáhuac",
    url: "https://www.coursera.org/learn/gestion-del-estres-y-mindfulness",
    temas: ["salud"],
    esGratuito: true,
    aclaracion: "El contenido del curso es gratuito en modalidad auditoría; el certificado de finalización tiene costo.",
    fechaVerificacion: "2026-08-21",
  },

  // ── Oficios y emprendimiento ───────────────────────────────────────────
  {
    titulo: "Gestión Empresarial Exitosa para Pymes",
    proveedor: "Coursera — Pontificia Universidad Católica de Chile",
    url: "https://www.coursera.org/learn/gestionempresarialpyme",
    temas: ["oficios"],
    esGratuito: true,
    aclaracion: "El contenido del curso es gratuito en modalidad auditoría; el certificado de finalización tiene costo.",
    fechaVerificacion: "2026-08-21",
  },
  {
    titulo: "Cursos en línea SENCE",
    proveedor: "SENCE (Gobierno de Chile)",
    url: "https://sence.gob.cl/personas/cursos-en-linea",
    temas: ["oficios"],
    esGratuito: true,
    aclaracion: "Portal general — busca cursos disponibles con tu RUT y ClaveÚnica. Las convocatorias cambian, no hay curso fijo.",
    fechaVerificacion: "2026-08-21",
  },

  // ── Arte, cultura e historia ───────────────────────────────────────────
  {
    titulo: "Academia Play — canal de historia, arte y cultura",
    proveedor: "YouTube",
    url: "https://www.youtube.com/@academiaplay",
    temas: ["arte"],
    esGratuito: true,
    aclaracion: null,
    fechaVerificacion: "2026-08-21",
  },

  // ── Habilidades digitales básicas ──────────────────────────────────────
  {
    titulo: "Aprende a usar WhatsApp",
    proveedor: "YouTube",
    url: "https://www.youtube.com/watch?v=0HIC__rf4LY",
    temas: ["digital_basico"],
    esGratuito: true,
    aclaracion: null,
    fechaVerificacion: "2026-08-21",
  },
  {
    titulo: "Catálogo de cursos — habilidades digitales, idiomas y más",
    proveedor: "Santander Open Academy",
    url: "https://www.santanderopenacademy.com",
    temas: ["digital_basico"],
    esGratuito: true,
    aclaracion: "Requiere registro gratuito en la plataforma. No es necesario ser cliente Santander.",
    fechaVerificacion: "2026-08-21",
  },
];

export function getCursosPorTema(tema: TemaEducacion): CursoEducacion[] {
  return CATALOGO_EDUCACION.filter(c => c.temas.includes(tema));
}
