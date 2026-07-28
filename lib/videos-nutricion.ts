export type CategoriaNU = "alimentacion" | "hidratacion" | "sarcopenia";
export type NivelNU = "informativo";

export type VideoNutricion = {
  id: string;
  titulo: string;
  categoria: CategoriaNU;
  descripcion: string;
  youtube_url: string;
  youtube_id: string;
  duracion_min: number | null;
  especialista?: string;
};

export const CATEGORIA_LABELS: Record<CategoriaNU, string> = {
  alimentacion: "Alimentación prime",
  hidratacion:  "Hidratación",
  sarcopenia:   "Prevención de sarcopenia",
};

export const CATEGORIA_COLORS: Record<CategoriaNU, string> = {
  alimentacion: "#2D8A5F",
  hidratacion:  "#2E7D9E",
  sarcopenia:   "#7B5EA7",
};

// Aprobados por Ariel — 27-07-2026
// Criterio: especialista identificado por nombre y credencial cuando disponible
export const VIDEOS_NUTRICION: VideoNutricion[] = [
  // ── Categoría A: Alimentación general prime ──────────────────────────────
  {
    id: "n1",
    titulo: "Nutrición en el prime — 5 consejos clave",
    categoria: "alimentacion",
    descripcion: "Cinco hábitos de alimentación respaldados por especialistas para mantener la energía y la masa muscular en la etapa activa.",
    youtube_url: "https://www.youtube.com/watch?v=QG7G29NNdSY",
    youtube_id: "QG7G29NNdSY",
    duracion_min: null,
  },
  {
    id: "n2",
    titulo: "Guía de alimentación saludable en el prime",
    categoria: "alimentacion",
    descripcion: "Panorama general de los grupos de alimentos más importantes y los ajustes que conviene hacer en la etapa activa.",
    youtube_url: "https://www.youtube.com/watch?v=rK0zdmS0mb8",
    youtube_id: "rK0zdmS0mb8",
    duracion_min: null,
  },
  {
    id: "n3",
    titulo: "Alimentación saludable — para vivir mejor",
    categoria: "alimentacion",
    descripcion: "Recomendaciones prácticas sobre porciones, variedad y frecuencia de comidas para quienes quieren mantenerse activos.",
    youtube_url: "https://www.youtube.com/watch?v=pBVof_fgLV4",
    youtube_id: "pBVof_fgLV4",
    duracion_min: null,
  },

  // ── Categoría B: Hidratación ─────────────────────────────────────────────
  {
    id: "n4",
    titulo: "Consejos de hidratación — EsSalud (institucional)",
    categoria: "hidratacion",
    descripcion: "Video institucional de EsSalud (Seguro Social de Salud del Perú) con consejos prácticos de hidratación para la etapa activa.",
    youtube_url: "https://www.youtube.com/watch?v=mZni409_RCs",
    youtube_id: "mZni409_RCs",
    duracion_min: null,
    especialista: "EsSalud — Seguro Social de Salud del Perú",
  },
  {
    id: "n5",
    titulo: "Hidratación y forma física — por qué importa",
    categoria: "hidratacion",
    descripcion: "Explicación clara del rol del agua en el rendimiento físico y la salud general, con señales prácticas para hidratarse bien.",
    youtube_url: "https://www.youtube.com/watch?v=wo3ZVSqAVLI",
    youtube_id: "wo3ZVSqAVLI",
    duracion_min: null,
  },

  // ── Categoría C: Prevención de sarcopenia ────────────────────────────────
  {
    id: "n6",
    titulo: "Proteínas y sarcopenia — Webinar especializado",
    categoria: "sarcopenia",
    descripcion: "Webinar completo sobre el rol de las proteínas en la prevención de la sarcopenia, con recomendaciones concretas de ingesta.",
    youtube_url: "https://www.youtube.com/watch?v=nlbGXNvfKeY",
    youtube_id: "nlbGXNvfKeY",
    duracion_min: null,
    especialista: "Dr. Samuel Durán — Nutricionista, Doctor en Nutrición y Alimentos, Univ. San Sebastián (Chile)",
  },
  {
    id: "n7",
    titulo: "¿Cómo prevenir la sarcopenia?",
    categoria: "sarcopenia",
    descripcion: "Explicación directa de qué es la sarcopenia, por qué se produce y cómo la alimentación y el ejercicio ayudan a prevenirla.",
    youtube_url: "https://www.youtube.com/watch?v=Wz155_hwMNo",
    youtube_id: "Wz155_hwMNo",
    duracion_min: null,
    especialista: "Dra. Lorenza Martínez Gallardo — especialista",
  },
  {
    id: "n8",
    titulo: "El alimento que detiene la sarcopenia después de los 60",
    categoria: "sarcopenia",
    descripcion: "Video práctico sobre qué proteína tiene mayor impacto en la preservación de masa muscular y por qué es especialmente relevante.",
    youtube_url: "https://www.youtube.com/watch?v=57CvPJnf9po",
    youtube_id: "57CvPJnf9po",
    duracion_min: null,
    especialista: "Dr. Javier Martínez — médico especialista en geriatría",
  },
];
