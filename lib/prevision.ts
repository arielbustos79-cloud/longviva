export type Prevision =
  | "fonasa"
  | "isapre_banmedica"
  | "isapre_cruz_blanca"
  | "isapre_consalud"
  | "isapre_colmena"
  | "isapre_vida_tres"
  | "isapre_nueva_masvida"
  | "isapre_esencial"
  | "caja"
  | "ninguna"
  | null;

export const PREVISION_LABELS: Record<string, string> = {
  fonasa: "Fonasa",
  isapre_banmedica: "Isapre Banmédica",
  isapre_cruz_blanca: "Isapre Cruz Blanca",
  isapre_consalud: "Isapre Consalud",
  isapre_colmena: "Isapre Colmena",
  isapre_vida_tres: "Isapre Vida Tres",
  isapre_nueva_masvida: "Isapre Nueva Masvida",
  isapre_esencial: "Isapre Esencial",
  caja: "Caja de Compensación",
  ninguna: "Sin previsión registrada",
};

export const PREVISION_OPTIONS = [
  { group: "Fonasa", items: [{ value: "fonasa", label: "Fonasa" }] },
  {
    group: "Isapre",
    items: [
      { value: "isapre_banmedica",     label: "Banmédica" },
      { value: "isapre_cruz_blanca",   label: "Cruz Blanca" },
      { value: "isapre_consalud",      label: "Consalud" },
      { value: "isapre_colmena",       label: "Colmena" },
      { value: "isapre_vida_tres",     label: "Vida Tres" },
      { value: "isapre_nueva_masvida", label: "Nueva Masvida" },
      { value: "isapre_esencial",      label: "Esencial" },
    ],
  },
  { group: "Caja de Compensación", items: [{ value: "caja", label: "Caja de Compensación (La Araucana / Los Andes / Los Héroes)" }] },
  { group: "Otro", items: [{ value: "ninguna", label: "Sin previsión registrada" }] },
];

// ── Telemedicina ────────────────────────────────────────────
export type ProveedorTelemed = {
  nombre: string;
  url: string;
  nota: string;
};

// Lista genérica cuando no hay previsión específica o es "ninguna"
export const PROVEEDORES_TELEMED_GENERICOS: ProveedorTelemed[] = [
  { nombre: "Mediglobal",           url: "https://www.mediglobal.cl",    nota: "Acepta Fonasa y diversas Isapres. Verifica qué prestaciones cubre tu plan." },
  { nombre: "RedSalud Telemedicina", url: "https://www.redsalud.cl",     nota: "Disponible para Fonasa e Isapres con convenio. Consulta antes de agendar." },
  { nombre: "IntegraMédica",        url: "https://www.integramedica.cl", nota: "Cubre Cruz Blanca, Colmena y otras Isapres. Verifica tu plan antes de reservar." },
  { nombre: "Mediclic",             url: "https://www.mediclic.cl",      nota: "Trabaja con Cajas de Compensación (La Araucana, Los Andes, Los Héroes) y otras previsiones." },
];

export function getProveedoresTelemed(prevision: Prevision): ProveedorTelemed[] {
  switch (prevision) {
    case "fonasa":
      return [
        { nombre: "RedSalud Telemedicina", url: "https://www.redsalud.cl",   nota: "Consulta si tu convenio Fonasa cubre esta atención antes de agendar." },
        { nombre: "Mediglobal",            url: "https://www.mediglobal.cl", nota: "Verifica qué prestaciones están cubiertas en tu modalidad Fonasa." },
      ];
    // Cruz Blanca → Bupa → IntegraMédica (convenio verificado en integramedica.cl)
    // Mediclic también disponible vía cruzblanca.mediclic.cl (portal Mi Cruz Blanca)
    case "isapre_cruz_blanca":
      return [
        { nombre: "IntegraMédica", url: "https://www.integramedica.cl", nota: "Convenio directo Cruz Blanca. Selecciona tu isapre al pagar el bono." },
        { nombre: "Mediclic",      url: "https://www.mediclic.cl",      nota: "Disponible desde Mi Cruz Blanca (cruzblanca.mediclic.cl). Verifica cobertura de tu plan." },
      ];
    // Banmédica y Vida Tres → UnitedHealth Group → IntegraMédica (verificado en integramedica.cl)
    case "isapre_banmedica":
    case "isapre_vida_tres":
      return [
        { nombre: "IntegraMédica", url: "https://www.integramedica.cl", nota: "Convenio Banmédica/Vida Tres verificado. Selecciona tu isapre en la pasarela de pago." },
      ];
    // Consalud → Cámara Chilena de la Construcción → RedSalud (red clínica principal, alta confianza)
    case "isapre_consalud":
      return [
        { nombre: "RedSalud Telemedicina", url: "https://www.redsalud.cl", nota: "Red principal de Consalud. Consulta cobertura de tu plan antes de agendar." },
      ];
    // Cajas de Compensación → Mediclic (confirmado brief-5-pilares)
    case "caja":
      return [
        { nombre: "Mediclic", url: "https://www.mediclic.cl", nota: "Verifica con tu Caja de Compensación (La Araucana, Los Andes, Los Héroes) qué cobertura aplica." },
      ];
    // Colmena, Nueva MasVida, Esencial — proveedor específico sin verificar en fuente oficial
    // → lista genérica con disclaimer claro
    case "isapre_colmena":
    case "isapre_nueva_masvida":
    case "isapre_esencial":
      return [
        { nombre: "IntegraMédica", url: "https://www.integramedica.cl", nota: "Consulta con tu Isapre qué plataforma de telemedicina cubre tu plan específico." },
        { nombre: "Mediglobal",    url: "https://www.mediglobal.cl",    nota: "Verifica antes de agendar — la cobertura depende de tu plan contratado." },
      ];
    case "ninguna":
    case null:
      return PROVEEDORES_TELEMED_GENERICOS;
    default:
      return PROVEEDORES_TELEMED_GENERICOS;
  }
}

// ── AFP ─────────────────────────────────────────────────────
export type AfpNombre =
  | "capital" | "cuprum" | "habitat" | "modelo"
  | "planvital" | "provida" | "uno" | "ninguna" | null;

export const AFP_LABELS: Record<string, string> = {
  capital:   "AFP Capital",
  cuprum:    "AFP Cuprum",
  habitat:   "AFP Habitat",
  modelo:    "AFP Modelo",
  planvital: "AFP PlanVital",
  provida:   "AFP Provida",
  uno:       "AFP Uno",
  ninguna:   "Sin AFP registrada",
};

export const AFP_OPTIONS = [
  {
    group: "AFP",
    items: [
      { value: "capital",   label: "AFP Capital" },
      { value: "cuprum",    label: "AFP Cuprum" },
      { value: "habitat",   label: "AFP Habitat" },
      { value: "modelo",    label: "AFP Modelo" },
      { value: "planvital", label: "AFP PlanVital" },
      { value: "provida",   label: "AFP Provida" },
      { value: "uno",       label: "AFP Uno" },
    ],
  },
  { group: "Otro", items: [{ value: "ninguna", label: "Sin AFP registrada" }] },
];

export const AFP_URLS: Record<string, string> = {
  capital:   "https://www.afpcapital.cl",
  cuprum:    "https://www.afpcuprum.cl",
  habitat:   "https://www.afphabitat.cl",
  modelo:    "https://www.afpmodelo.cl",
  planvital: "https://www.afpplanvital.cl",
  provida:   "https://www.afpprovida.cl",
  uno:       "https://www.uno.cl",
};

// ── Nutrición ───────────────────────────────────────────────
export type ProveedorNutricion = {
  nombre: string;
  url: string;
  nota: string;
};

export function getProveedoresNutricion(prevision: Prevision): ProveedorNutricion[] {
  const base: ProveedorNutricion[] = [
    { nombre: "DoctorPlus", url: "https://www.doctorplus.cl", nota: "Reconocidos por Fonasa. Nutricionistas con especialización en personas en su prime." },
    { nombre: "Mediglobal", url: "https://www.mediglobal.cl", nota: "Verifica con tu previsión qué prestaciones de nutrición están cubiertas." },
  ];
  if (prevision === "fonasa") {
    return [
      { nombre: "DoctorPlus", url: "https://www.doctorplus.cl", nota: "Reconocidos por Fonasa. Nutricionistas con especialización en personas en su prime." },
    ];
  }
  return base;
}
