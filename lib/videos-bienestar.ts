export type Disciplina = "yoga_silla" | "tai_chi" | "musculatura";
export type Nivel = "principiante" | "intermedio";

export type VideoBienestar = {
  id: string;
  titulo: string;
  disciplina: Disciplina;
  descripcion: string;
  youtube_url: string;
  youtube_id: string;
  duracion_min: number | null;
  nivel: Nivel;
};

export const DISCIPLINA_LABELS: Record<Disciplina, string> = {
  yoga_silla:  "Yoga en silla",
  tai_chi:     "Tai Chi",
  musculatura: "Musculatura",
};

export const DISCIPLINA_COLORS: Record<Disciplina, string> = {
  yoga_silla:  "#7B5EA7",
  tai_chi:     "#2E7D6E",
  musculatura: "#C07A2A",
};

// Aprobados por Ariel — 23-07-2026
// Títulos en vocabulario LongVivIA (sin "adulto mayor", sin "mayores de 60")
export const VIDEOS_BIENESTAR: VideoBienestar[] = [
  {
    id: "v1",
    titulo: "Yoga en silla · 20 min — alivio lumbar",
    disciplina: "yoga_silla",
    descripcion: "Secuencia suave de 20 minutos sentada/o para liberar tensión en la zona lumbar y ganar flexibilidad sin levantarte de la silla.",
    youtube_url: "https://www.youtube.com/watch?v=vBXWOUXb_5g",
    youtube_id: "vBXWOUXb_5g",
    duracion_min: 20,
    nivel: "principiante",
  },
  {
    id: "v2",
    titulo: "Yoga en silla · 30 min — para principiantes",
    disciplina: "yoga_silla",
    descripcion: "Clase completa de 30 minutos adaptada para quienes empiezan. Canal Sendero del Yoga — ritmo tranquilo, instrucciones claras.",
    youtube_url: "https://www.youtube.com/watch?v=YenHD5fTA-c",
    youtube_id: "YenHD5fTA-c",
    duracion_min: 30,
    nivel: "principiante",
  },
  {
    id: "v3",
    titulo: "Tai Chi terapéutico — postura, equilibrio y movilidad",
    disciplina: "tai_chi",
    descripcion: "Secuencia terapéutica de Tai Chi enfocada en mejorar la postura, el equilibrio y la movilidad articular. Ritmo pausado.",
    youtube_url: "https://www.youtube.com/watch?v=j8YqSmzNsfY",
    youtube_id: "j8YqSmzNsfY",
    duracion_min: null,
    nivel: "principiante",
  },
  {
    id: "v4",
    titulo: "Tai Chi suave — equilibrio y prevención de caídas",
    disciplina: "tai_chi",
    descripcion: "Clase de Tai Chi suave con foco en fortalecer el equilibrio y reducir el riesgo de caídas. Ideal para empezar desde cero.",
    youtube_url: "https://www.youtube.com/watch?v=t1xPPpIsHrw",
    youtube_id: "t1xPPpIsHrw",
    duracion_min: null,
    nivel: "principiante",
  },
  {
    id: "v5",
    titulo: "Fuerza suave · 20 min — cuerpo completo",
    disciplina: "musculatura",
    descripcion: "Rutina de fuerza funcional de 20 minutos para todo el cuerpo. Sin pesas, sin impacto. Fisioterapia Querétaro — Mariana Quevedo.",
    youtube_url: "https://www.youtube.com/watch?v=cIdFerErtSg",
    youtube_id: "cIdFerErtSg",
    duracion_min: 20,
    nivel: "principiante",
  },
  {
    id: "v6",
    titulo: "Fuerza suave · 39 min — brazos y espalda",
    disciplina: "musculatura",
    descripcion: "Sesión de 39 minutos enfocada en tonificar brazos y fortalecer la espalda con movimientos controlados. Mismo canal de fisioterapia.",
    youtube_url: "https://www.youtube.com/watch?v=yeXwgPwaniA",
    youtube_id: "yeXwgPwaniA",
    duracion_min: 39,
    nivel: "principiante",
  },
  {
    id: "v7",
    titulo: "Cardio suave — nivel fácil, actívate en casa",
    disciplina: "musculatura",
    descripcion: "Rutina de cardio de bajo impacto, nivel fácil, para activar la circulación y ganar energía sin salir de casa.",
    youtube_url: "https://www.youtube.com/watch?v=aaE34xMf2VU",
    youtube_id: "aaE34xMf2VU",
    duracion_min: null,
    nivel: "principiante",
  },
];
