export type Prevision =
  | "fonasa"
  | "isapre_banmedica"
  | "isapre_cruz_blanca"
  | "isapre_consalud"
  | "isapre_colmena"
  | "isapre_vida_tres"
  | "isapre_nueva_masvida"
  | "isapre_cruz_del_norte"
  | "caja"
  | null;

export const PREVISION_LABELS: Record<string, string> = {
  fonasa: "Fonasa",
  isapre_banmedica: "Isapre Banmédica",
  isapre_cruz_blanca: "Isapre Cruz Blanca",
  isapre_consalud: "Isapre Consalud",
  isapre_colmena: "Isapre Colmena",
  isapre_vida_tres: "Isapre Vida Tres",
  isapre_nueva_masvida: "Isapre Nueva Masvida",
  isapre_cruz_del_norte: "Isapre Cruz del Norte",
  caja: "Caja de Compensación",
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
      { value: "isapre_cruz_del_norte","label": "Cruz del Norte" },
    ],
  },
  { group: "Caja de Compensación", items: [{ value: "caja", label: "Caja de Compensación (La Araucana / Los Andes / Los Héroes)" }] },
];

// ── Telemedicina ────────────────────────────────────────────
export type ProveedorTelemed = {
  nombre: string;
  url: string;
  nota: string;
};

export function getProveedoresTelemed(prevision: Prevision): ProveedorTelemed[] {
  switch (prevision) {
    case "fonasa":
      return [
        { nombre: "RedSalud Telemedicina", url: "https://www.redsalud.cl", nota: "Consulta si tu convenio Fonasa cubre esta atención antes de agendar." },
        { nombre: "Mediglobal", url: "https://www.mediglobal.cl", nota: "Verifica con tu ejecutiva(o) Fonasa qué prestaciones están cubiertas." },
      ];
    case "isapre_cruz_blanca":
    case "isapre_colmena":
      return [
        { nombre: "IntegraMédica", url: "https://www.integramedica.cl", nota: "Consulta si tu plan Isapre incluye telemedicina antes de reservar." },
      ];
    case "caja":
      return [
        { nombre: "Mediclic", url: "https://www.mediclic.cl", nota: "Verifica con tu Caja de Compensación qué cobertura aplica." },
      ];
    default:
      // Todas las demás isapres
      if (prevision && prevision.startsWith("isapre_")) {
        return [
          { nombre: "Mediglobal", url: "https://www.mediglobal.cl", nota: "Consulta con tu Isapre si cubre telemedicina y qué copago aplica." },
        ];
      }
      return [];
  }
}

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
