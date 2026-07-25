# Scripts de utilidad — LongVivIA

## Node.js

### `verify-urls.mjs` — Verificación HTTP del catálogo de URLs

Verifica que cada URL de `lib/external-urls.ts` responde, distinguiendo entre error de DNS (dominio no existe) y error de red (sandbox o firewall).

```bash
node scripts/verify-urls.mjs
```

**Salida:**
- `✅ OK` — responde 2xx/3xx
- `⏱ TIMEOUT` — servidor existe pero no respondió al bot (URL probablemente válida)
- `⚠️ HTTP 4xx` — servidor responde con error de cliente
- `❌ DNS_FAIL` — dominio **no existe** → corregir en `lib/external-urls.ts`
- `❓ FETCH_ERR` — error de red no clasificado → verificar manualmente en browser

**Cuándo ejecutar:** antes de cada push que modifique `lib/external-urls.ts`.

**Nota:** el script usa GET con User-Agent de Chrome para evitar bloqueos de HEAD. Algunos dominios bloquean bots igualmente (FETCH_ERR) aunque el sitio exista — verificar esos manualmente en el browser.

---

### `gen-pwa-icons.mjs` — Genera iconos PWA desde SVG

Genera los archivos `public/icon-192.png` y `public/icon-512.png` a partir del SVG fuente usando `sharp`.

```bash
node scripts/gen-pwa-icons.mjs
```

**Cuándo ejecutar:** si se modifica el isotipo o el SVG fuente del ícono.

---

## SQL (Supabase SQL Editor)

### `articulos-batch-2.sql`
Inserta el segundo batch de artículos de bienestar en la tabla `articulos`.

### `eventos-ocio.sql`
Inserta eventos de ocio y cultura en la tabla correspondiente.

### `puntajes-juegos.sql`
Crea o actualiza la estructura de puntajes para los minijuegos de EntraMente.

### `add-prevision-afp.sql`
Agrega las columnas `prevision` y `prevision_afp` a la tabla `profiles`.
Incluye las políticas RLS para que cada usuario solo lea/escriba sus propios datos (Ley 19.628).

---

## SQL pendientes (`scripts/pendientes/`)

Scripts listos para ejecutar pero que requieren aprobación antes de correr en producción.

### `comunidad-sql.sql`
Estructura para el pilar Comunidad (eventos, municipios, grupos).

### `videos-bienestar-sql.sql`
Inserta videos de bienestar. **Requiere aprobación de Ariel** — los videos a embeber deben ser validados uno a uno antes de publicar.
