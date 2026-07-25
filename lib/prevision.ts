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
    // Cruz Blanca → Bupa → IntegraMédica (verificado integramedica.cl convenios)
    // Portal Mi Cruz Blanca: sitio.cruzblanca.cl/MiCruzBlanca (200 OK verificado 25-07-2026)
    // Mediclic portal dedicado: cruzblanca.mediclic.cl (200 OK verificado 25-07-2026)
    case "isapre_cruz_blanca":
      return [
        { nombre: "IntegraMédica",  url: "https://www.integramedica.cl",             nota: "Convenio directo Cruz Blanca. Selecciona tu isapre al pagar el bono." },
        { nombre: "Mediclic",       url: "https://cruzblanca.mediclic.cl",            nota: "Portal Mediclic exclusivo para afiliados Cruz Blanca." },
        { nombre: "Mi Cruz Blanca", url: "https://sitio.cruzblanca.cl/MiCruzBlanca", nota: "Portal oficial Cruz Blanca — accede a tus prestaciones y telemedicina desde aquí." },
      ];
    // Banmédica y Vida Tres → UnitedHealth Group → IntegraMédica (verificado integramedica.cl)
    case "isapre_banmedica":
    case "isapre_vida_tres":
      return [
        { nombre: "IntegraMédica", url: "https://www.integramedica.cl", nota: "Convenio Banmédica/Vida Tres verificado. Selecciona tu isapre en la pasarela de pago." },
      ];
    // Consalud → Click Doctor (One) — confirmado en consalud.cl/pagehome-clickdoctor.html
    // Medicina General 24/7 sin agendamiento; especialidades con agenda previa vía Sucursal Digital
    case "isapre_consalud":
      return [
        { nombre: "Click Doctor", url: "https://www.consalud.cl", nota: "Accede a Click Doctor desde tu Sucursal Digital Consalud. Medicina General 24/7 sin agendamiento previo." },
      ];
    // Cajas de Compensación → Mediclic (confirmado brief-5-pilares)
    case "caja":
      return [
        { nombre: "Mediclic", url: "https://www.mediclic.cl", nota: "Verifica con tu Caja de Compensación (La Araucana, Los Andes, Los Héroes) qué cobertura aplica." },
      ];
    // Colmena → Doctor Online (principal) + Mediclic según plan
    // Confirmado en colmena.cl/doctor-online/ — Medicina General y Pediatría
    // Mediclic disponible en planes PLENO, PLENO PLUS, PLENO MAX, PLENO SALUD, PLENO PLUS V/SUR/NORTE
    case "isapre_colmena":
      return [
        { nombre: "Doctor Online", url: "https://www.doctoronline.cl", nota: "Plataforma principal Colmena. Medicina General y Pediatría, agendada u on-demand." },
        { nombre: "Mediclic",      url: "https://www.mediclic.cl",     nota: "Disponible como beneficio adicional en planes PLENO y PLENO PLUS. Verifica tu plan." },
      ];
    // Nueva MasVida → telemedicina base propia + Blue Doctor/Mediclic (complementario)
    // Confirmado en nuevamasvida.cl/nuevo-beneficio-blue-doctor/
    // Base incluida en todos los planes, 09:00–00:00 hrs
    case "isapre_nueva_masvida":
      return [
        { nombre: "Telemedicina Nueva MasVida", url: "https://www.nuevamasvida.cl", nota: "Incluida en todos los planes. Videoconferencia de 09:00 a 00:00 hrs. Accede desde tu portal." },
        { nombre: "Mediclic (Blue Doctor)",     url: "https://www.mediclic.cl",     nota: "Beneficio complementario opcional. Activación vía correo — consulta en tu portal si está disponible en tu plan." },
      ];
    // Esencial → TeleUrgencia (Clínica Alemana) + IntegraMédica + RedSalud
    // Dominio oficial confirmado: somosesencial.cl (no esencial.cl ni isapreesencial.cl)
    // TeleUrgencia incluida en Plan Preferente Línea Esencial
    case "isapre_esencial":
      return [
        { nombre: "TeleUrgencia Clínica Alemana", url: "https://www.somosesencial.cl",  nota: "Incluida en Plan Preferente Línea Esencial. Accede desde tu portal Esencial." },
        { nombre: "IntegraMédica",                url: "https://www.integramedica.cl",  nota: "Convenio verificado con Isapre Esencial. Selecciona tu isapre al pagar el bono." },
        { nombre: "RedSalud",                     url: "https://www.redsalud.cl",       nota: "Red en convenio con Esencial. Consulta cobertura de tu plan antes de agendar." },
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
