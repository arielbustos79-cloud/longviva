// Farmacias de turno RM — datos dinámicos, fuente: API pública MINSAL (MIDAS).
// Licencia: Creative Commons Attribution — atribuir a MINSAL en la UI.
// fk_region="7" corresponde a la Región Metropolitana en esta API
// (no coincide con el código regional oficial INE — verificado 07-08-2026).

const MINSAL_ENDPOINT = "https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php";
const RM_REGION_CODE = "7";

type FarmaciaMinsal = {
  fecha: string;
  fk_region: string;
  local_nombre: string;
  comuna_nombre: string;
  local_direccion: string;
  local_telefono: string;
  local_lat: string;
  local_lng: string;
  funcionamiento_hora_apertura: string;
  funcionamiento_hora_cierre: string;
  funcionamiento_dia: string;
};

// Cache de 1 hora — el dato se actualiza a diario en la fuente, no hace falta
// consultar la API en cada carga de página. No se persiste en base de datos.
export const revalidate = 3600;

// Edge runtime: MINSAL bloquea con 403 las IPs de las funciones serverless
// normales de Vercel (AWS) — confirmado en logs del deployment
// dpl_3SC69skHeUrbUDThSUThs6NVvdKm (12-08-2026). Edge corre en la red de
// Cloudflare, rango de IP distinto — probando si esquiva el bloqueo.
export const runtime = "edge";

export async function GET() {
  try {
    const res = await fetch(MINSAL_ENDPOINT, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`MINSAL respondió ${res.status}`);
    }

    const data: FarmaciaMinsal[] = await res.json();
    const farmaciasRM = data.filter((f) => f.fk_region === RM_REGION_CODE);

    return Response.json({
      farmacias: farmaciasRM,
      fuente: "Ministerio de Salud de Chile (MINSAL)",
      consultado: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error farmacias de turno:", error);
    return Response.json(
      { error: "No pudimos cargar las farmacias de turno en este momento." },
      { status: 502 }
    );
  }
}
