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
  // Cruz Blanca — portales verificados 25-07-2026 (200 OK)
  cruzblanca_portal: "https://sitio.cruzblanca.cl/MiCruzBlanca",
  cruzblanca_mediclic: "https://cruzblanca.mediclic.cl",
  // Colmena — Doctor Online verificado 25-07-2026 (200 OK)
  doctoronline: "https://www.doctoronline.cl",
  // Nueva MasVida — verificado 25-07-2026 (200 OK)
  nuevamasvida: "https://www.nuevamasvida.cl",
  // Esencial — dominio oficial confirmado somosesencial.cl (200 OK)
  isapre_esencial: "https://www.somosesencial.cl",

  // ── Portales del Estado ───────────────────────────────────────────────
  chileatiende: "https://www.chileatiende.gob.cl",
  senama: "https://www.senama.gob.cl",
  sii: "https://www.sii.cl",
  registro_civil: "https://www.registrocivil.cl",
  compin: "https://www.compin.cl",
  supersalud: "https://www.superdesalud.gob.cl",

  // ── Municipios — portadas genéricas (solo para referencias indirectas) ──
  municipio_vina_del_mar: "https://www.munivina.cl",

  // ── Comunidad — Programas Adulto Mayor (verificados 30-07-2026) ──────
  // DEDICADA = página propia del programa | TAG = noticias/categoría | PORTADA = último recurso
  comunidad_cerrillos:        "https://www.mcerrillos.cl",                                                                                          // PORTADA
  comunidad_cerro_navia:      "https://www.cerronavia.cl/oficina-personas-mayores/",                                                                 // DEDICADA 200
  comunidad_conchali:         "https://conchali.cl/adulto-mayor/",                                                                                  // DEDICADA 200
  comunidad_el_bosque:        "https://www.municipalidadelbosque.cl/tramites-y-beneficios/adultos-mayores-centro-gerontologico/",                    // DEDICADA 200
  comunidad_estacion_central: "https://muniecentral.cl",                                                                                            // PORTADA (sitio inestable)
  comunidad_huechuraba:       "https://www.huechuraba.cl/dideco/area-integracion-social/oficina-comunal-para-personas-mayores",                     // DEDICADA 200
  comunidad_independencia:    "https://www.independencia.cl/oficinas-municipales/adulto-mayor/",                                                      // DEDICADA 200 (redirect verificado)
  comunidad_la_cisterna:      "http://www.cisterna.cl/011-casa-del-adulto-mayor.php",                                                               // DEDICADA 403* Google confirma
  comunidad_la_florida:       "https://www.laflorida.cl/sitio/programas/programa-adulto-mayor/",                                                    // DEDICADA 200
  comunidad_la_granja:        "https://www.municipalidadlagranja.cl/tag/adulto-mayor/",                                                             // TAG (URL directa da 404)
  comunidad_la_pintana:       "https://pintana.cl/?page_id=3415",                                                                                   // DEDICADA 200 (URL dinámica WP)
  comunidad_la_reina:         "https://www.lareina.cl/oficina-de-proteccion-al-adulto-mayor/",                                                      // DEDICADA 200
  comunidad_las_condes:       "https://www.lascondes.cl/soy-vecino/adulto-mayor/",                                                                  // DEDICADA 200
  comunidad_lo_barnechea:     "https://lobarnechea.cl/comunidades/adulto-mayor/",                                                                   // DEDICADA 403* Google confirma
  comunidad_lo_espejo:        "https://www.loespejo.cl",                                                                                            // PORTADA
  comunidad_lo_prado:         "https://loprado.cl/dideco/proteccion-social/adulto-mayor/",                                                          // DEDICADA 200
  comunidad_macul:            "https://www.munimacul.cl/portalnv/index.php/centro-integral-del-adulto-mayor-ciam/",                                 // DEDICADA 200
  comunidad_maipu:            "https://municipalidadmaipu.cl/tag/oficina-del-adulto-mayor/",                                                        // TAG
  comunidad_nunoa:            "https://www.nunoa.cl/direcciones-y-coorporaciones/direccion-de-desarrollo-comunitario/departamento-de-la-persona-mayor/", // DEDICADA 200
  comunidad_padre_hurtado:    "https://portal.mph.cl/?cat=2",                                                                                       // TAG 200
  comunidad_pac:              "https://www.pedroaguirrecerda.cl/dideco-2/",                                                                         // DIDECO
  comunidad_penalolen:        "https://www.penalolen.cl/comuna-amigable-2/",                                                                        // DEDICADA 200
  comunidad_providencia:      "https://providencia.cl/provi/comunidad/personas-mayores/personas-mayores-departamento",                              // DEDICADA 200
  comunidad_pudahuel:         "https://www.mpudahuel.cl",                                                                                           // PORTADA
  comunidad_puente_alto:      "https://mpuentealto.cl/oficina-del-adulto-mayor/",                                                                   // DEDICADA 200
  comunidad_quilicura:        "https://ww2.muniquilicura.cl/adultos-mayores-2/",                                                                    // DEDICADA 403* Google confirma
  comunidad_quinta_normal:    "https://www.quintanormal.cl",                                                                                        // PORTADA
  comunidad_recoleta:         "https://www.recoleta.cl/category/adulto-mayor/",                                                                      // TAG 200 (URL /programa-adulto-mayor/ da 404)
  comunidad_renca:            "https://renca.cl/unidades-municipales/direccion-de-desarrollo-comunitario/departamento-adulto-mayor/",               // DEDICADA ECONNRESET* Google confirma
  comunidad_san_bernardo:     "https://www.sanbernardo.cl/oficina-del-adulto-mayor/",                                                               // DEDICADA 403* Google confirma
  comunidad_san_joaquin:      "https://sanjoaquin.cl/personas-mayores/",                                                                            // DEDICADA 200
  comunidad_san_miguel:       "https://web.sanmiguel.cl/category/adulto-mayor/",                                                                    // TAG 200
  comunidad_san_ramon:        "https://municipalidadsanramon.cl/tag/adultos-mayores/",                                                              // TAG 200
  comunidad_santiago:         "https://www.munistgo.cl/adulto-mayor/",                                                                              // DEDICADA 200
  comunidad_vitacura:         "https://vitacura.cl/vecinos/centro-de-dia-para-personas-mayores/",                                                   // DEDICADA 200

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
  radio_beethoven: "https://www.beethovenfm.cl",
  radio_t13: "https://www.t13.cl/en-vivo",

  // ── Fiestas y eventos ─────────────────────────────────────────────────
  sala_portugal: "https://www.salaportugal.cl",

  // ── Farmacias — catálogo (modelo CPC, verificadas HTTP 200, 27-07-2026) ────
  // Capa 1: link profundo con búsqueda pre-cargada (patrón verificado)
  farmacia_cruzverde:  "https://www.cruzverde.cl",
  farmacia_drsimi:     "https://www.drsimi.cl",
  farmacia_fraccion:   "https://www.fraccion.cl",
  farmacia_farmex:     "https://farmex.cl",
  farmacia_meki:       "https://farmaciameki.cl",
  farmacia_ahumada:    "https://www.farmaciasahumada.cl",
  farmacia_elquimico:  "https://farmaciaelquimico.cl",
  // Capa 2: fallback clipboard (Salcobrand no expone búsqueda por URL)
  farmacia_salcobrand: "https://salcobrand.cl",
  // Pendientes: Remedia (timeout, no clasificable), Farmam (pendiente decisión producto)

  // ── ISP / ANAMED — Registro Sanitario (verificado auditor 28-07-2026) ────
  isp_registro_sanitario: "https://registrosanitario.ispch.gob.cl/",

  // ── Contenido curado Nutrición (aprobado por Ariel, verificado 27-07-2026) ─
  // Mayo Clinic en español — desnutrición en personas mayores, señales de alerta
  nutricion_mayoclinic_tercera_edad: "https://newsnetwork.mayoclinic.org/es/2018/03/03/consejos-de-salud-salud-en-adultos-mayores/",
  // Mayo Clinic — vitamina D, fibra, hidratación en el envejecimiento (actualizado junio 2026)
  nutricion_mayoclinic_envejecimiento: "https://www.mayoclinic.org/es/healthy-lifestyle/healthy-aging/in-depth/aging/art-20046070",
  // MedlinePlus — Biblioteca Nacional de Medicina de EEUU, sin fines comerciales
  nutricion_medlineplus: "https://medlineplus.gov/spanish/nutritionforolderadults.html",

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
    `Cruz Blanca — Portal Mi Cruz Blanca → ${URLS_VERIFICADAS.cruzblanca_portal}`,
    `Cruz Blanca — Mediclic exclusivo → ${URLS_VERIFICADAS.cruzblanca_mediclic}`,
    `Colmena — Doctor Online → ${URLS_VERIFICADAS.doctoronline}`,
    `Nueva MasVida → ${URLS_VERIFICADAS.nuevamasvida}`,
    `Isapre Esencial (somosesencial.cl) → ${URLS_VERIFICADAS.isapre_esencial}`,
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
    `Providencia — Personas Mayores → ${URLS_VERIFICADAS.comunidad_providencia}`,
    `Las Condes — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_las_condes}`,
    `Santiago — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_santiago}`,
    `Ñuñoa — Persona Mayor → ${URLS_VERIFICADAS.comunidad_nunoa}`,
    `Maipú — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_maipu}`,
    `Puente Alto — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_puente_alto}`,
    `La Florida — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_la_florida}`,
    `San Bernardo — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_san_bernardo}`,
    `Peñalolén — Personas Mayores → ${URLS_VERIFICADAS.comunidad_penalolen}`,
    `Quilicura — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_quilicura}`,
    `Vitacura — Personas Mayores → ${URLS_VERIFICADAS.comunidad_vitacura}`,
    `San Joaquín — Personas Mayores → ${URLS_VERIFICADAS.comunidad_san_joaquin}`,
    `Lo Prado — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_lo_prado}`,
    `Macul — CIAM → ${URLS_VERIFICADAS.comunidad_macul}`,
    `Independencia — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_independencia}`,
    `Huechuraba — Personas Mayores → ${URLS_VERIFICADAS.comunidad_huechuraba}`,
    `Conchalí — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_conchali}`,
    `Cerro Navia — Personas Mayores → ${URLS_VERIFICADAS.comunidad_cerro_navia}`,
    `El Bosque — Centro Gerontológico → ${URLS_VERIFICADAS.comunidad_el_bosque}`,
    `La Reina — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_la_reina}`,
    `Lo Barnechea — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_lo_barnechea}`,
    `Renca — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_renca}`,
    `San Miguel — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_san_miguel}`,
    `San Ramón — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_san_ramon}`,
    `La Granja — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_la_granja}`,
    `Padre Hurtado — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_padre_hurtado}`,
    `Recoleta — Adulto Mayor → ${URLS_VERIFICADAS.comunidad_recoleta}`,
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
