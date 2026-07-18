import { createEvent, createEvents, type EventAttributes } from "ics";

function descargarIcs(contenido: string, nombre: string) {
  const blob = new Blob([contenido], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function isoADateArray(iso: string): [number, number, number, number, number] {
  const d = new Date(iso);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()];
}

export function exportarCita(cita: {
  titulo: string;
  fecha: string;
  proveedor: string | null;
  notas: string | null;
}) {
  const attrs: EventAttributes = {
    title: cita.titulo,
    start: isoADateArray(cita.fecha),
    duration: { hours: 1 },
    location: cita.proveedor ?? undefined,
    description: cita.notas ?? undefined,
    alarms: [
      {
        action: "display",
        description: `Recordatorio: ${cita.titulo}`,
        trigger: { hours: 1, minutes: 0, before: true },
      },
    ],
  };

  createEvent(attrs, (error, value) => {
    if (error || !value) return;
    const nombreArchivo = `cita-${cita.titulo.toLowerCase().replace(/\s+/g, "-")}.ics`;
    descargarIcs(value, nombreArchivo);
  });
}

export function exportarMedicamento(med: {
  nombre: string;
  dosis: string;
  horarios: string[];
}) {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = hoy.getMonth() + 1;
  const day = hoy.getDate();

  const eventos: EventAttributes[] = med.horarios.map((horario) => {
    const [hh, mm] = horario.split(":").map(Number);
    return {
      title: `${med.nombre} ${med.dosis}`,
      start: [year, month, day, hh, mm],
      duration: { minutes: 15 },
      recurrenceRule: "FREQ=DAILY",
      alarms: [
        {
          action: "display",
          description: `Hora de tomar ${med.nombre} ${med.dosis}`,
          trigger: { minutes: 0, before: true },
        },
      ],
    };
  });

  createEvents(eventos, (error, value) => {
    if (error || !value) return;
    const nombreArchivo = `medicamento-${med.nombre.toLowerCase().replace(/\s+/g, "-")}.ics`;
    descargarIcs(value, nombreArchivo);
  });
}
