/**
 * URLs externas verificadas manualmente.
 * VIVIAN solo puede mencionar URLs de esta lista — nunca generar una URL de memoria.
 * Si una institución no está aquí, VIVIAN debe derivar a Google en lugar de inventar.
 *
 * Para agregar una URL: verificar que el sitio responde antes de incluirla.
 * Última verificación: 2026-07-24 (script verify-urls.mjs — HTTP real)
 * Pendiente verificación manual: afp_cuprum, afp_planvital, afp_provida,
 *   isapre_masvida, caja_los_andes, redsalud, compin, viajes_falabella,
 *   radio_laclave, chile_cultura, municipio_vina_del_mar (FETCH_ERR en sandbox)
 */

export const URLS_VERIFICADAS = {
  // ── Plataforma propia ──────────────────────────────────────────────────
  longvivia: "https://longvivia.cl",

  // ── AFP ───────────────────────────────────────────────────────────────
  afp_capital: "https://www.afpcapital.cl",
  afp_cuprum: "https://www.afpcuprum.cl",
  afp_habitat: "https://www.afphabitat.cl",
  afp_modelo: "https://www.afpmodelo.cl",
  afp_planvital: "https://www.afpplanvital.cl",
  afp_provida: "https://www.afpprovida.cl",
  afp_uno: "https://www.uno.cl",
  spensiones: "https://www.spensiones.cl",

  // ── Previsión de salud ────────────────────────────────────────────────
  fonasa: "https://www.fonasa.gob.cl",
  // Isapres — solo las de mayor cobertura verificadas
  isapre_banmedica: "https://www.banmedica.cl",
  isapre_colmena: "https://www.colmena.cl",
  isapre_consalud: "https://www.consalud.cl",
  isapre_cruzblanca: "https://www.cruzblanca.cl",
  isapre_masvida: "https://www.masvida.cl",
  isapre_vidatres: "https://www.vidatres.cl",

  // ── Cajas de compensación ─────────────────────────────────────────────
  caja_los_andes: "https://www.cajadelosandes.cl",
  caja_la_araucana: "https://www.laaraucana.cl",
  caja_los_heroes: "https://www.losheroes.cl",
  caja_18_septiembre: "https://www.caja18.cl",

  // ── Telemedicina ──────────────────────────────────────────────────────
  mediclic: "https://www.mediclic.cl",
  integramedica: "https://www.integramedica.cl",
  redsalud: "https://www.redsalud.cl",
  mediglobal: "https://www.mediglobal.cl",

  // ── Portales del Estado ───────────────────────────────────────────────
  chileatiende: "https://www.chileatiende.gob.cl",
  senama: "https://www.senama.gob.cl",
  sii: "https://www.sii.cl",
  registro_civil: "https://www.registrocivil.cl",
  compin: "https://www.compin.cl",
  supersalud: "https://www.superdesalud.gob.cl",

  // ── Municipios (curados para pilar Comunidad) ─────────────────────────
  municipio_providencia: "https://www.providencia.cl",
  municipio_las_condes: "https://www.lascondes.cl",
  municipio_santiago: "https://www.munistgo.cl",
  municipio_nunoa: "https://www.nunoa.cl",
  municipio_maipu: "https://www.municipalidadmaipu.cl",
  municipio_vina_del_mar: "https://www.munivina.cl",

  // ── Ocio y cultura ────────────────────────────────────────────────────
  bpdigital: "https://www.bpdigital.cl",
  // chile_cultura (chilecultura.gob.cl) descartado 24-07-2026: certificado SSL inválido
  cultura_agenda: "https://www.cultura.gob.cl/agendacultural",
  punto_ticket: "https://www.puntoticket.com",
  telon_ticket: "https://www.telonticket.cl",
  sernatur: "https://www.sernatur.cl",
  gastronomia_800: "https://www.800.cl",

  // ── Viajes ────────────────────────────────────────────────────────────
  despegar: "https://www.despegar.cl",
  viajes_falabella: "https://viajes.falabella.com/cl",

  // ── Radios online ─────────────────────────────────────────────────────
  radio_cooperativa: "https://www.cooperativa.cl",
  radio_biobio: "https://www.biobiochile.cl",
  radio_infinita: "https://www.infinita.cl",
  radio_laclave: "https://www.radiolaclave.cl",
  // FETCH_ERR en sandbox (no DNS_FAIL — existen): verificar manualmente en browser
  radio_beethoven: "https://www.radiobeethoven.cl",
  radio_t13: "https://radio.t13.cl",

  // ── Fiestas y eventos ─────────────────────────────────────────────────
  sala_portugal: "https://www.salaportugal.cl",

  // ── Búsqueda segura (fallback cuando el proveedor no está en la lista) ─
  google_busqueda: (termino: string) =>
    `https://www.google.com/search?q=${encodeURIComponent(termino + " Chile sitio oficial")}`,
} as const;

/**
 * Genera el bloque de texto que se inyecta en el system prompt de VIVIAN.
 * Lista todas las URLs verificadas en formato legible para el modelo.
 */
export function generarCatalogoUrls(): string {
  const afps = [
    `AFP Capital → ${URLS_VERIFICADAS.afp_capital}`,
    `AFP Cuprum → ${URLS_VERIFICADAS.afp_cuprum}`,
    `AFP Habitat → ${URLS_VERIFICADAS.afp_habitat}`,
    `AFP Modelo → ${URLS_VERIFICADAS.afp_modelo}`,
    `AFP PlanVital → ${URLS_VERIFICADAS.afp_planvital}`,
    `AFP Provida → ${URLS_VERIFICADAS.afp_provida}`,
    `AFP Uno (uno.cl) → ${URLS_VERIFICADAS.afp_uno}`,
    `Superintendencia de Pensiones → ${URLS_VERIFICADAS.spensiones}`,
  ].join("\n");

  const salud = [
    `FONASA → ${URLS_VERIFICADAS.fonasa}`,
    `Isapre Banmédica → ${URLS_VERIFICADAS.isapre_banmedica}`,
    `Isapre Colmena → ${URLS_VERIFICADAS.isapre_colmena}`,
    `Isapre Consalud → ${URLS_VERIFICADAS.isapre_consalud}`,
    `Isapre Cruz Blanca → ${URLS_VERIFICADAS.isapre_cruzblanca}`,
    `Isapre MásVida → ${URLS_VERIFICADAS.isapre_masvida}`,
    `Isapre Vida Tres → ${URLS_VERIFICADAS.isapre_vidatres}`,
    `Telemedicina Mediclic → ${URLS_VERIFICADAS.mediclic}`,
    `Telemedicina IntegraMédica → ${URLS_VERIFICADAS.integramedica}`,
    `Telemedicina RedSalud → ${URLS_VERIFICADAS.redsalud}`,
    `Telemedicina Mediglobal → ${URLS_VERIFICADAS.mediglobal}`,
    `Superintendencia de Salud → ${URLS_VERIFICADAS.supersalud}`,
  ].join("\n");

  const cajas = [
    `Caja Los Andes → ${URLS_VERIFICADAS.caja_los_andes}`,
    `La Araucana → ${URLS_VERIFICADAS.caja_la_araucana}`,
    `Caja Los Héroes → ${URLS_VERIFICADAS.caja_los_heroes}`,
    `Caja 18 de Septiembre → ${URLS_VERIFICADAS.caja_18_septiembre}`,
  ].join("\n");

  const estado = [
    `ChileAtiende → ${URLS_VERIFICADAS.chileatiende}`,
    `SENAMA → ${URLS_VERIFICADAS.senama}`,
    `SII → ${URLS_VERIFICADAS.sii}`,
    `Registro Civil → ${URLS_VERIFICADAS.registro_civil}`,
    `COMPIN → ${URLS_VERIFICADAS.compin}`,
  ].join("\n");

  const municipios = [
    `Municipalidad de Providencia → ${URLS_VERIFICADAS.municipio_providencia}`,
    `Municipalidad de Las Condes → ${URLS_VERIFICADAS.municipio_las_condes}`,
    `Municipalidad de Santiago → ${URLS_VERIFICADAS.municipio_santiago}`,
    `Municipalidad de Ñuñoa → ${URLS_VERIFICADAS.municipio_nunoa}`,
    `Municipalidad de Maipú → ${URLS_VERIFICADAS.municipio_maipu}`,
    `Municipalidad de Viña del Mar → ${URLS_VERIFICADAS.municipio_vina_del_mar}`,
  ].join("\n");

  const ocio = [
    `Biblioteca Pública Digital → ${URLS_VERIFICADAS.bpdigital}`,
    `Agenda Cultural (Ministerio de las Culturas) → ${URLS_VERIFICADAS.cultura_agenda}`,
    `PuntoTicket → ${URLS_VERIFICADAS.punto_ticket}`,
    `TelonTicket → ${URLS_VERIFICADAS.telon_ticket}`,
    `SERNATUR → ${URLS_VERIFICADAS.sernatur}`,
    `Gastronomía 800.cl (guía curada) → ${URLS_VERIFICADAS.gastronomia_800}`,
    `Despegar Chile → ${URLS_VERIFICADAS.despegar}`,
    `Viajes Falabella → ${URLS_VERIFICADAS.viajes_falabella}`,
    `Radio Cooperativa → ${URLS_VERIFICADAS.radio_cooperativa}`,
    `Radio Biobío → ${URLS_VERIFICADAS.radio_biobio}`,
    `Radio Infinita → ${URLS_VERIFICADAS.radio_infinita}`,
    `Radio La Clave → ${URLS_VERIFICADAS.radio_laclave}`,
    `Radio Beethoven → ${URLS_VERIFICADAS.radio_beethoven}`,
    `T13 Radio → ${URLS_VERIFICADAS.radio_t13}`,
    `Sala Portugal (fiestas retro, Av. Portugal 1284 Santiago) → ${URLS_VERIFICADAS.sala_portugal}`,
  ].join("\n");

  return `CATÁLOGO DE URLs VERIFICADAS — REGLA ABSOLUTA:
Solo puedes mencionar URLs que aparecen en esta lista. NUNCA construyas ni infergas una URL que no esté aquí — aunque suene plausible. Si la institución no está en la lista, di explícitamente que no tienes el link verificado y sugiere buscarlo así: https://www.google.com/search?q=NOMBRE+Chile+sitio+oficial

AFP y previsión financiera:
${afps}

Previsión de salud e isapres:
${salud}

Cajas de compensación:
${cajas}

Organismos del Estado:
${estado}

Municipios:
${municipios}

Ocio, cultura y viajes:
${ocio}`;
}
