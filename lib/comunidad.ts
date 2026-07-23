export type ComunaPrograma = {
  comuna: string;
  nombre_programa: string;
  descripcion: string;
  direccion?: string | null;
  telefono?: string | null;
  link?: string | null;
  nota?: string | null;
};

// Datos en código — misma fuente que la tabla Supabase comunas_adulto_mayor.
// Para agregar una nueva comuna: INSERT en Supabase Y agregar aquí.
export const COMUNAS_DATA: ComunaPrograma[] = [
  {
    comuna: "Las Condes",
    nombre_programa: "Dirección de Desarrollo Comunitario — Adulto Mayor",
    descripcion: "Clubes de Adultos Mayores, talleres gratuitos de crecimiento personal, arte y estimulación cognitiva.",
    link: "https://www.lascondes.cl",
    nota: "Inscripción presencial en DIDECO Las Condes.",
  },
  {
    comuna: "Providencia",
    nombre_programa: "Programa Adulto Mayor Providencia",
    descripcion: "Talleres de actividad física, arte, cultura, finanzas, tecnología y trekking.",
    link: "https://www.providencia.cl",
    nota: "Requiere Tarjeta Vecino de Providencia para inscribirse.",
  },
  {
    comuna: "Santiago",
    nombre_programa: "Centro Adulto Mayor Santiago",
    descripcion: "Talleres culturales, recreativos y sociales. Sede principal en Matucana 272, Parque Quinta Normal. También Centro Comunitario Carol Urzúa.",
    direccion: "Matucana 272, Parque Quinta Normal",
    link: "https://www.municipalidaddesantiago.cl",
  },
  {
    comuna: "Ñuñoa",
    nombre_programa: "Programa Adulto Mayor Ñuñoa",
    descripcion: "Talleres culturales, recreativos y sociales en modalidad presencial y virtual.",
    link: "https://www.nunoa.cl",
  },
  {
    comuna: "San Miguel",
    nombre_programa: "Talleres Adulto Mayor San Miguel",
    descripcion: "Talleres rotativos por clubes y agrupaciones: cocina, baile de salón, tejido y más.",
    link: "https://www.sanmiguel.cl",
  },
  {
    comuna: "Quinta Normal",
    nombre_programa: "Centro Comunitario para Personas Mayores",
    descripcion: "Centro comunitario con programas de integración social y talleres para personas mayores.",
    link: "https://www.quintanormal.cl",
  },
];

export function getComunaData(comuna: string): ComunaPrograma | null {
  return COMUNAS_DATA.find(
    c => c.comuna.toLowerCase() === comuna.toLowerCase()
  ) ?? null;
}
