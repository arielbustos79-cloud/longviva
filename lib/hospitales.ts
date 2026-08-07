// Directorio curado de hospitales públicos y clínicas privadas principales, RM.
// Verificado agosto 2026 contra sitios oficiales / Superintendencia de Salud.
// Teléfonos pueden cambiar — re-verificar cada 6 meses.

export type Centro = {
  nombre: string;
  comuna: string;
  direccion: string;
  telefono: string;
  web?: string;
};

export const HOSPITALES_PUBLICOS: Centro[] = [
  {
    nombre: "Hospital del Salvador",
    comuna: "Providencia",
    direccion: "Av. Salvador 364",
    telefono: "22 575 4000",
    web: "https://www.hsalvador.cl",
  },
  {
    nombre: "Hospital San Juan de Dios",
    comuna: "Santiago",
    direccion: "Portales 3239",
    telefono: "22 574 1900",
  },
  {
    nombre: "Hospital Clínico Félix Bulnes",
    comuna: "Cerro Navia",
    direccion: "Mapocho Sur 7432",
    telefono: "22 574 4400",
  },
  {
    nombre: "Hospital Barros Luco",
    comuna: "San Miguel",
    direccion: "Gran Av. José Miguel Carrera 3204",
    telefono: "22 576 3000",
    web: "https://www.hospitalbarrosluco.gob.cl",
  },
  {
    nombre: "Complejo Asistencial Dr. Sótero del Río",
    comuna: "Puente Alto",
    direccion: "Av. Concha y Toro 3459",
    telefono: "22 576 2300",
  },
];

export const CLINICAS_PRIVADAS: Centro[] = [
  {
    nombre: "Clínica Alemana",
    comuna: "Vitacura",
    direccion: "Av. Vitacura 5951",
    telefono: "22 210 1111",
    web: "https://www.clinicaalemana.cl",
  },
  {
    nombre: "Clínica Las Condes",
    comuna: "Las Condes",
    direccion: "Lo Fontecilla 441",
    telefono: "22 610 4000",
    web: "https://www.clinicalascondes.cl",
  },
  {
    nombre: "Hospital Clínico UC Christus",
    comuna: "Santiago",
    direccion: "Marcoleta 367",
    telefono: "22 354 3000",
    web: "https://www.ucchristus.cl",
  },
  {
    nombre: "Clínica Santa María",
    comuna: "Providencia",
    direccion: "Av. Santa María 0500",
    telefono: "22 913 0000",
    web: "https://www.clinicasantamaria.cl",
  },
  {
    nombre: "Clínica Indisa",
    comuna: "Providencia",
    direccion: "Av. Santa María 1810",
    telefono: "22 362 5555",
    web: "https://www.indisa.cl",
  },
  {
    nombre: "Clínica Bupa Santiago",
    comuna: "La Florida",
    direccion: "Av. Departamental 1455",
    telefono: "600 712 0020",
    web: "https://www.clinicabupasantiago.cl",
  },
];
