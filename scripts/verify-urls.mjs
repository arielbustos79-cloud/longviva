/**
 * Verifica que cada URL del catálogo responde o al menos resuelve DNS.
 * Distingue entre:
 *   DNS_FAIL   → dominio no existe (URL definitivamente mala)
 *   TIMEOUT    → servidor existe pero no respondió a tiempo (URL probablemente ok)
 *   HTTP_4xx   → servidor respondió con error de cliente (URL existe, evaluar)
 *   OK         → responde 2xx o 3xx
 * Ejecutar: node scripts/verify-urls.mjs
 */

const CATALOGO = {
  longvivia:              "https://longvivia.cl",
  afp_capital:            "https://www.afpcapital.cl",
  afp_cuprum:             "https://www.afpcuprum.cl",
  afp_habitat:            "https://www.afphabitat.cl",
  afp_modelo:             "https://www.afpmodelo.cl",
  afp_planvital:          "https://www.afpplanvital.cl",
  afp_provida:            "https://www.afpprovida.cl",
  afp_uno:                "https://www.uno.cl",
  spensiones:             "https://www.spensiones.cl",
  fonasa:                 "https://www.fonasa.gob.cl",
  isapre_banmedica:       "https://www.banmedica.cl",
  isapre_colmena:         "https://www.colmena.cl",
  isapre_consalud:        "https://www.consalud.cl",
  isapre_cruzblanca:      "https://www.cruzblanca.cl",
  isapre_masvida:         "https://www.masvida.cl",
  isapre_vidatres:        "https://www.vidatres.cl",
  caja_los_andes:         "https://www.cajadelosandes.cl",
  caja_la_araucana:       "https://www.laaraucana.cl",
  caja_los_heroes:        "https://www.losheroes.cl",
  caja_18_septiembre:     "https://www.caja18.cl",
  mediclic:               "https://www.mediclic.cl",
  integramedica:          "https://www.integramedica.cl",
  cruzblanca_portal:      "https://sitio.cruzblanca.cl/MiCruzBlanca",
  cruzblanca_mediclic:    "https://cruzblanca.mediclic.cl",
  doctoronline:           "https://www.doctoronline.cl",
  nuevamasvida:           "https://www.nuevamasvida.cl",
  isapre_esencial:        "https://www.somosesencial.cl",
  redsalud:               "https://www.redsalud.cl",
  mediglobal:             "https://www.mediglobal.cl",
  chileatiende:           "https://www.chileatiende.gob.cl",
  senama:                 "https://www.senama.gob.cl",
  sii:                    "https://www.sii.cl",
  registro_civil:         "https://www.registrocivil.cl",
  compin:                 "https://www.compin.cl",
  supersalud:             "https://www.superdesalud.gob.cl",
  municipio_providencia:  "https://www.providencia.cl",
  municipio_las_condes:   "https://www.lascondes.cl",
  municipio_santiago:     "https://www.munistgo.cl",
  municipio_nunoa:        "https://www.nunoa.cl",
  municipio_maipu:        "https://www.municipalidadmaipu.cl",
  municipio_vina_del_mar: "https://www.munivina.cl",
  bpdigital:              "https://www.bpdigital.cl",
  chile_cultura:          "https://www.chilecultura.gob.cl",
  punto_ticket:           "https://www.puntoticket.com",
  telon_ticket:           "https://www.telonticket.cl",
  sernatur:               "https://www.sernatur.cl",
  despegar:               "https://www.despegar.cl",
  viajes_falabella:       "https://viajes.falabella.com/cl",
  radio_cooperativa:      "https://www.cooperativa.cl",
  radio_biobio:           "https://www.biobiochile.cl",
  radio_infinita:         "https://www.infinita.cl",
  radio_laclave:          "https://www.radiolaclave.cl",
  radio_beethoven:        "https://www.beethovenfm.cl",
  radio_t13:              "https://www.t13.cl/en-vivo",
};


async function checkUrl(key, url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,*/*",
      },
    });
    const ok = res.status < 400 || res.status === 403 || res.status === 405;
    return { key, url, status: res.status, result: ok ? "OK" : `HTTP_${res.status}`, finalUrl: res.url };
  } catch (e) {
    const msg = e.message || "";
    const isDns = msg.includes("ENOTFOUND") || msg.includes("getaddrinfo") || msg.includes("EAI_AGAIN") || msg.includes("ERR_NAME_NOT_RESOLVED");
    const isTimeout = msg.includes("aborted") || msg.includes("timeout") || msg.includes("ETIMEDOUT");
    return {
      key, url, status: null,
      result: isDns ? "DNS_FAIL" : isTimeout ? "TIMEOUT" : "FETCH_ERR",
      error: msg,
    };
  }
}

console.log(`\n${"=".repeat(72)}`);
console.log("VERIFICACIÓN HTTP REAL — lib/external-urls.ts");
console.log(`Fecha: ${new Date().toLocaleString("es-CL")}`);
console.log(`Total URLs: ${Object.keys(CATALOGO).length}`);
console.log("=".repeat(72) + "\n");

// Verificar todas en paralelo
const resultados = await Promise.all(
  Object.entries(CATALOGO).map(([k, v]) => checkUrl(k, v))
);

const porResultado = {
  OK:        resultados.filter(r => r.result === "OK"),
  TIMEOUT:   resultados.filter(r => r.result === "TIMEOUT"),
  DNS_FAIL:  resultados.filter(r => r.result === "DNS_FAIL"),
  FETCH_ERR: resultados.filter(r => r.result === "FETCH_ERR"),
  HTTP_ERR:  resultados.filter(r => r.result?.startsWith("HTTP_")),
};

console.log("✅ OK (responden 2xx/3xx):");
for (const r of porResultado.OK) {
  const redir = r.finalUrl && r.finalUrl !== r.url ? ` ⇒ ${r.finalUrl}` : "";
  console.log(`   [${r.status}] ${r.key.padEnd(26)} ${r.url}${redir}`);
}

console.log(`\n⏱  TIMEOUT (servidor existe pero no respondió — URL probablemente válida):`);
for (const r of porResultado.TIMEOUT) {
  console.log(`   ${r.key.padEnd(26)} ${r.url}`);
}

console.log(`\n⚠️  HTTP 4xx (servidor responde con error — URL existe, revisar):`);
for (const r of [...porResultado.HTTP_ERR]) {
  console.log(`   [${r.status}] ${r.key.padEnd(26)} ${r.url}`);
}

console.log(`\n❌ DNS_FAIL (dominio NO existe — URL definitivamente incorrecta):`);
if (porResultado.DNS_FAIL.length === 0) {
  console.log("   (ninguna)");
} else {
  for (const r of porResultado.DNS_FAIL) {
    console.log(`   ${r.key.padEnd(26)} ${r.url}  ← SIN CORRECCIÓN CONOCIDA`);
  }
}

console.log(`\n❓ FETCH_ERR (error de red no clasificado):`);
for (const r of porResultado.FETCH_ERR) {
  console.log(`   ${r.key.padEnd(26)} ${r.url}  [${r.error?.slice(0, 60)}]`);
}

console.log(`\n${"=".repeat(72)}`);
console.log(`RESUMEN:`);
console.log(`  ✅ OK:          ${porResultado.OK.length}`);
console.log(`  ⏱  TIMEOUT:    ${porResultado.TIMEOUT.length}  (URL probablemente válida, servidor bloqueó bot)`);
console.log(`  ⚠️  HTTP 4xx:   ${porResultado.HTTP_ERR.length}  (URL existe, acceso denegado a bot)`);
console.log(`  ❌ DNS_FAIL:   ${porResultado.DNS_FAIL.length}  (dominio no existe — CORREGIR)`);
console.log(`  ❓ FETCH_ERR:  ${porResultado.FETCH_ERR.length}  (error de red — revisar manualmente)`);
console.log("=".repeat(72) + "\n");
