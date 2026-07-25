export type FarmaciaComunitaria = {
  comuna: string;
  nombre: string;
  direccion?: string | null;
  horario?: string | null;
  requisitos?: string | null;
  telefono?: string | null;
  link?: string | null;
  nota?: string | null;
};

/**
 * Farmacias comunitarias/populares municipales.
 * Datos curados por comuna — mismas 6 comunas del pilar Comunidad como punto de partida.
 * PENDIENTE: verificar dirección, horario y requisitos directamente en cada municipio
 * antes de considerar estos datos como confirmados para producción.
 * Fuente de referencia: municipios + CENABAST (sin listado central oficial disponible a jul-2026)
 */
export const FARMACIAS_DATA: FarmaciaComunitaria[] = [
  {
    comuna: "Santiago",
    nombre: "Farmacia Popular de Santiago",
    direccion: "Consultar en sitio municipal — varias sedes",
    horario: "Lunes a viernes 8:30–13:00 y 14:00–17:00 (verificar vigencia)",
    requisitos: "Cédula de identidad chilena y receta médica vigente",
    link: "https://www.munistgo.cl",
    nota: "⚠ Dirección y horario pendiente de verificación directa en munistgo.cl — confirmar antes de publicar.",
  },
  {
    comuna: "Providencia",
    nombre: "Farmacia Popular Providencia",
    direccion: "Consultar en sitio municipal",
    horario: "Verificar en providencia.cl",
    requisitos: "Cédula de identidad y receta médica. Puede requerir certificado de domicilio en la comuna.",
    link: "https://www.providencia.cl",
    nota: "⚠ Pendiente verificación de existencia y datos directamente en providencia.cl.",
  },
  {
    comuna: "Ñuñoa",
    nombre: "Farmacia Popular Ñuñoa",
    direccion: "Consultar en sitio municipal",
    horario: "Verificar en nunoa.cl",
    requisitos: "Cédula de identidad y receta médica",
    link: "https://www.nunoa.cl",
    nota: "⚠ Pendiente verificación directa en nunoa.cl.",
  },
  {
    comuna: "Las Condes",
    nombre: "Farmacia Municipal Las Condes",
    direccion: "Consultar en sitio municipal",
    horario: "Verificar en lascondes.cl",
    requisitos: "Cédula de identidad y receta médica. Consultar si requiere residencia en la comuna.",
    link: "https://www.lascondes.cl",
    nota: "⚠ Pendiente verificar si Las Condes tiene farmacia popular propia — confirmar en lascondes.cl.",
  },
  {
    comuna: "San Miguel",
    nombre: "Farmacia Popular San Miguel",
    direccion: "Consultar en sitio municipal",
    horario: "Verificar en sanmiguel.cl",
    requisitos: "Cédula de identidad y receta médica",
    link: "https://www.sanmiguel.cl",
    nota: "⚠ Pendiente verificación directa en sanmiguel.cl.",
  },
  {
    comuna: "Quinta Normal",
    nombre: "Farmacia Popular Quinta Normal",
    direccion: "Consultar en sitio municipal",
    horario: "Verificar en quintanormal.cl",
    requisitos: "Cédula de identidad y receta médica",
    link: "https://www.quintanormal.cl",
    nota: "⚠ Pendiente verificación directa en quintanormal.cl.",
  },
];

export function getFarmaciaData(comuna: string): FarmaciaComunitaria | null {
  return FARMACIAS_DATA.find(
    f => f.comuna.toLowerCase() === comuna.toLowerCase()
  ) ?? null;
}

export const COMUNAS_FARMACIAS = FARMACIAS_DATA.map(f => f.comuna).sort();
