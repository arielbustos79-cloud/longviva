# LongVivIA — Contexto del Proyecto para Claude Code
## ESTRUCTURA DE MARCA — LEER PRIMERO ⚠️

```
LONGVIVA SpA
→ Razón social legal de la empresa
→ Dominio: longviva.cl
→ Usada en contratos, facturas, documentos legales
→ Relación con AFP, Isapres, aliados B2B
LONGVIVIA (LongVivIA)
→ Nombre de la plataforma digital
→ Dominio: longvivia.cl (producción activa)
→ La web, la app y todo lo digital
→ Contiene a VIVIAN, la IA conversacional
VIVIAN
→ La IA conversacional dentro de LongVivIA
→ "VIVIAN by LongVivIA"
→ Disponible en web y WhatsApp (Twilio)
→ No es una app separada — es la feature central
```

**Regla simple:**
- Hablas de la empresa → LongViva SpA
- Hablas del producto digital → LongVivIA
- Hablas de la IA → VIVIAN
---
## Qué es LongVivIA
Plataforma digital **100% gratuita** de salud, bienestar y experiencias para personas en su prime (+60 años) en Chile. Se financia con publicidad segmentada y comisión por derivación a proveedores externos (ver sección "Decisiones de estrategia — 22 de julio de 2026" más abajo — reemplaza el modelo de cuota por afiliado descrito originalmente).
**Tagline principal:** Para una vida larga y activa.
**Tagline campaña:** Tu prime, tu plataforma Viva.
Nota: "Tu" SIN tilde en taglines (pronombre posesivo, no personal).
---
## Vocabulario de marca — CRÍTICO
### NUNCA usar:
envejecimiento, adulto mayor, adultos mayores, tercera edad, vejez, deterioro, declive, dependencia, cuidado (en contexto asistencial)
### SIEMPRE usar:
prime, vitalidad, plenitud, protagonismo, movimiento, libertad, energía, activo/a, presente, potencia
---
## VIVIAN — Personalidad
- Cálida, paciente, directa — nunca condescendiente
- Habla de tú, nunca de usted
- Máximo 3 líneas por respuesta
- Sin tecnicismos médicos
- Siempre termina con acción concreta o pregunta
- Emojis con moderación (máx. 1-2 por mensaje)
- **Modelo:** claude-sonnet-4-6 (Anthropic)
---
## Identidad Visual

```css
--v1: #0F3D24   /* verde muy oscuro */
--v2: #1B5E3B   /* verde principal */
--v3: #2D8A5F   /* verde medio */
--v4: #52B788   /* verde claro */
--v5: #B7E4C7   /* verde suave */
--v6: #EAFAF0   /* verde muy suave / fondos */
--d2: #C9973A   /* dorado principal */
--d3: #F5DFA0   /* dorado claro */
--d4: #FDF8ED   /* dorado muy suave */
--n2: #1A2E22   /* texto principal */
--crema: #FAF8F3
--gris: #7A8A82
```

**Tipografías:** Cormorant Garamond (títulos) / DM Sans (cuerpo)
**Logo:** `components/OliveBranch.tsx` — SVG rama de olivo con aceitunas doradas
**Avatar VIVIAN:** `components/VivianIcon.tsx`
---
## Stack Tecnológico

```
Frontend:      Next.js 15 (App Router) + TypeScript + CSS Modules
Base de datos: Supabase (PostgreSQL) con RLS
Auth:          Supabase Auth — magic link OTP (sin contraseña)
IA VIVIAN:     Claude API — claude-sonnet-4-6 (Anthropic)
WhatsApp:      Twilio Sandbox + webhook en /api/whatsapp
Analytics:     Tabla "eventos" en Supabase (custom, no GA)
Hosting:       Vercel (auto-deploy desde GitHub master)
```

---
## Estructura de carpetas real (julio 2026)

```
longviva/
├── .claude/
│   └── CLAUDE.md
├── app/
│   ├── page.tsx              ← Landing page principal
│   ├── page.module.css
│   ├── globals.css
│   ├── layout.tsx
│   ├── login/page.tsx        ← Magic link login
│   ├── registro/page.tsx     ← Registro con nombre + email
│   ├── dashboard/            ← Panel de usuario autenticado
│   │   ├── page.tsx
│   │   ├── page.module.css
│   │   └── ResumenHoy.tsx    ← Tarjeta "Resumen de hoy" (próxima cita/medicamento)
│   ├── agenda/page.tsx       ← Mi agenda — CRUD de citas + export .ics
│   ├── medicamentos/page.tsx ← Mis medicamentos — CRUD + export .ics recurrente
│   ├── vivian/page.tsx       ← Chat VIVIAN (web)
│   ├── articulos/
│   │   ├── page.tsx          ← Listado de artículos
│   │   └── [slug]/
│   │       ├── page.tsx      ← Artículo individual
│   │       └── ArticuloTracker.tsx  ← Evento articulo_leido
│   ├── juegos/
│   │   ├── page.tsx              ← Selección de juegos (4 categorías Unobrain)
│   │   ├── caza-objetos/page.tsx ← Atención — grilla 4x4 a 8x8
│   │   ├── secuencia/page.tsx    ← Memoria — Simón sin techo
│   │   ├── diferencias/page.tsx  ← Percepción — 5 escenas SVG
│   │   ├── test-colores/page.tsx ← Ejecución — Stroop 60s
│   │   ├── memoria/page.tsx      ← Redirige a /juegos (reemplazado)
│   │   └── sopa-letras/page.tsx  ← Redirige a /juegos (reemplazado)
│   ├── admin/page.tsx        ← Panel interno (solo ariel.bustos79@gmail.com)
│   ├── quienes-somos/page.tsx
│   ├── terminos/page.tsx
│   ├── privacidad/page.tsx
│   ├── trabaja/page.tsx
│   ├── auth/callback/route.ts ← Intercambia code → sesión, redirige a /dashboard?bienvenida=1
│   └── api/
│       ├── vivian/route.ts   ← Claude API endpoint (chat web)
│       └── whatsapp/route.ts ← Twilio webhook (VIVIAN por WhatsApp)
├── components/
│   ├── OliveBranch.tsx       ← SVG logo rama de olivo (props: size, variant)
│   └── VivianIcon.tsx        ← Avatar SVG de VIVIAN
├── lib/
│   ├── supabase-browser.ts   ← Cliente Supabase (client components)
│   ├── supabase-server.ts    ← Cliente Supabase (server components)
│   ├── vivian-prompt.ts      ← System prompt de VIVIAN
│   ├── generarIcs.ts         ← Genera y descarga .ics (citas y medicamentos)
│   └── logEvento.ts          ← Fire-and-forget analytics a tabla "eventos"
└── public/
```

> ℹ️ El sub-proyecto Parkin&Son / NORITA (otra marca, mismo holding) vivía en este repo bajo
> `app/parkinandson/`, `app/api/norita/` y `lib/norita-prompt.ts`. Se movió a la rama
> `parkinandson-draft` para no mezclarse con el desarrollo activo de LongVivIA — está en pausa
> intencional. Ver el `.claude/CLAUDE.md` de esa rama para el detalle completo.
---
## Páginas y rutas activas
| Ruta | Estado | Descripción |
|------|--------|-------------|
| `/` | ✅ Activa | Landing page completa |
| `/login` | ✅ Activa | Solicitar magic link |
| `/registro` | ✅ Activa | Registro (nombre + email → magic link) |
| `/dashboard` | ✅ Activa | Panel de usuario (requiere auth) |
| `/vivian` | ✅ Activa | Chat con VIVIAN (web) |
| `/agenda` | ✅ Activa | Mi agenda — citas médicas, export .ics |
| `/medicamentos` | ✅ Activa | Mis medicamentos — recordatorios, export .ics diario |
| `/articulos` | ✅ Activa | Listado de artículos |
| `/articulos/[slug]` | ✅ Activa | Artículo individual con tracker |
| `/juegos` | ✅ Activa | Selección de juegos cognitivos (4 categorías Unobrain) |
| `/juegos/caza-objetos` | ✅ Activa | Atención — Caza objetos |
| `/juegos/secuencia` | ✅ Activa | Memoria — Secuencia (Simón) |
| `/juegos/diferencias` | ✅ Activa | Percepción — Encuentra las diferencias |
| `/juegos/test-colores` | ✅ Activa | Ejecución — Test de colores (Stroop) |
| `/juegos/memoria` | ↩ Redirige | Redirige a /juegos (reemplazado) |
| `/juegos/sopa-letras` | ↩ Redirige | Redirige a /juegos (reemplazado) |
| `/telemedicina` | ✅ Activa | Router de derivación por previsión |
| `/ocio` | ✅ Activa | Ocio y experiencias |
| `/nutricion` | ✅ Activa | Nutrición — router por previsión |
| `/bienestar` | ✅ Activa | Bienestar activo — videos curados + artículos |
| `/comunidad` | ✅ Activa | Directorio municipal por comuna + SENAMA |
| `/admin` | ✅ Activa | Panel analytics (solo admin) |
| `/quienes-somos` | ✅ Activa | Página institucional |
| `/terminos` | ✅ Draft | Pendiente revisión legal |
| `/privacidad` | ✅ Draft | Pendiente revisión legal |
| `/trabaja` | ✅ Activa | Página de empleo |
---
## Landing page (`/`) — Secciones
1. **Navbar** — Logo + links (Quiénes somos, ¿Cómo funciona?, Servicios, VIVIAN IA, Artículos, Entrena tu mente, Contacto) + botón Ingresar/Mi panel + hamburguesa mobile
2. **Hero** — Tagline principal + CTA registro
3. **Prime** — 4 tarjetas: Telemedicina gratis, Clases ilimitadas, Tours a tu ritmo, VIVIAN 24/7
4. **VIVIAN section** — Mockup chat (no clickeable) + features + botón "Hablar con VIVIAN →"
5. **Servicios** — Card destacada VIVIAN IA + cards secundarias (Entrena tu mente ✅, Gestión de salud 🔜, Telemedicina 🔜, Bienestar activo 🔜, Ocio y experiencias 🔜, Nutrición 🔜)
6. **¿Cómo funciona?** — 3 pasos animados
7. **Testimonios** — Citas editoriales con OliveBranch + "Usuario LongVivIA"
8. **Marquee** — Pilares: salud, bienestar, juegos, VIVIAN, nutrición...
9. **Contacto / Footer** — Email, WhatsApp, redes, links legales
**Motivos visuales:** OliveBranch SVG como separador de secciones y decoración en card VIVIAN.
---
## Dashboard (`/dashboard`)
**Resumen de hoy** (`ResumenHoy.tsx`): tarjeta sobre las cards de acceso, muestra próxima cita agendada y próximo medicamento a tomar.
Cards activas:
- **Hablar con VIVIAN** → `/vivian` (card destacada verde)
- **Artículos** → `/articulos`
- **Entrena tu mente** → `/juegos`
- **Mi agenda** → `/agenda`
- **Mis medicamentos** → `/medicamentos`
Cards próximamente: Telemedicina, Bienestar activo, Tours y experiencias.
**Toast de bienvenida:** Al llegar desde magic link (`?bienvenida=1`), muestra toast verde "🌿 ¡Listo, [nombre]! Ya iniciaste sesión." por 4 segundos. El parámetro se limpia del URL automáticamente.
---
## Agenda y Medicamentos (`/agenda`, `/medicamentos`)
- **Agenda:** CRUD de citas (título, tipo, fecha/hora, proveedor, notas) en tabla `agenda`. Tipos "Telemedicina" y "Tour" ya están en el selector pero deshabilitados (`activo: false`) — reservados para cuando existan esas features.
- **Medicamentos:** CRUD de medicamentos (nombre, dosis, múltiples horarios de toma) en tabla `medicamentos`. Se pueden marcar inactivos sin borrar el historial.
- **Exportación a calendario (`lib/generarIcs.ts`, librería `ics`):** botón "📅 Agregar a mi calendario" en cada cita/medicamento genera un `.ics` descargable (alarma nativa en Google Calendar/iPhone/Outlook). Los medicamentos se exportan como evento diario recurrente (`FREQ=DAILY`) por cada horario.
- **Limitación conocida (por diseño):** el `.ics` es un snapshot al momento de exportar — si el usuario edita o elimina la cita/medicamento después, el evento ya exportado en su calendario NO se actualiza solo. Se avisa con nota visible en ambas páginas.
---
## VIVIAN Chat (`/vivian`)
- Header: "VIVIAN" centrado + "● En línea", fecha + "← Volver" (→ /dashboard si hay sesión, → / si no)
- Íconos: 🕐 historial de conversaciones / 🔍 búsqueda en historial
- Input: placeholder "Escribe o Habla", botón micrófono (SpeechRecognition), botón "Enviar"
- Historial: carga últimos 60 mensajes como contexto oculto para VIVIAN
- Logs: `logEvento("vivian_mensaje", { canal: "web" })`
- **WhatsApp:** webhook en `/api/whatsapp` con verificación firma Twilio (HMAC-SHA1), logs `vivian_mensaje` canal whatsapp
> ⚠️ **Riesgo activo identificado (22-07-2026, no corregido):** VIVIAN captura y reutiliza el dato de previsión de salud del usuario (ej. "Banmédica") desde la memoria conversacional libre, sin campo de perfil formal ni consentimiento explícito separado. Contradice el borrador de Política de Privacidad (consentimiento expreso y separado para datos sensibles, Ley 19.628). Ver detalle en "Decisiones de estrategia — 22 de julio de 2026" más abajo — es prerrequisito antes de activar el router de Telemedicina por previsión.
---
## Artículos
- Tabla `articulos` en Supabase: `slug, titulo, pilar, resumen, contenido, publicado`
- Pilares: salud, bienestar, nutricion, movimiento, mente
- 5 artículos publicados con contenido aprobado
- `ArticuloTracker.tsx`: dispara `articulo_leido` tras 30s O 80% de scroll (lo que ocurra primero), sin duplicados (ref `registrado`)
---
## Juegos — Entrena tu mente (`/juegos`)
### Memoria (`/juegos/memoria`)
- 6 pares de símbolos SVG (sol, hoja, ola, montaña, flor, pájaro)
- Grilla 4×3 (12 cartas), Fisher-Yates shuffle
- Lógica: voltear 2 → pareja = queda descubierta, no pareja = vuelve en 1000ms
- Al completar: `logEvento("juego_completado", { juego: "memoria", intentos })`
### Sopa de letras (`/juegos/sopa-letras`)
- Grilla 12×12, 8 palabras: PRIME, ENERGIA, VITAL, CALMA, SALUD, MOVER, VIVIAN, PLENO
- Palabras en 4 direcciones (→ ← ↓ ↑), sin diagonal
- Selección: clic primera letra → clic última letra (misma fila o columna)
- Al completar: `logEvento("juego_completado", { juego: "sopa_letras" })`
---
## Analytics internos
### Tabla `eventos` (Supabase)

```sql
CREATE TABLE eventos (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo       TEXT,  -- ver TipoEvento
  user_id    UUID,
  metadata   JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### `lib/logEvento.ts`
Tipos válidos (`TipoEvento`):
- `registro_completado` — primer acceso (<5 min desde created_at)
- `vivian_mensaje` — mensaje enviado a VIVIAN (web o whatsapp)
- `articulo_leido` — artículo leído (30s o 80% scroll)
- `juego_completado` — juego terminado (memoria o sopa_letras)
Patrón: fire-and-forget (`void promise`) — nunca bloquea la UI.
### Panel `/admin`
Protegido por `ADMIN_EMAILS = ["ariel.bustos79@gmail.com"]`.
KPIs: usuarios totales, mensajes VIVIAN, artículos leídos, usuarios activos VIVIAN.
Top artículos, VIVIAN por canal, timeline de actividad reciente.
---
## Auth flow
1. Usuario ingresa email en `/login` o `/registro`
2. Supabase envía magic link al correo
3. Usuario hace clic → `/auth/callback?code=xxx`
4. `route.ts` intercambia code → sesión → redirige a `/dashboard?bienvenida=1`
5. Dashboard muestra toast de bienvenida una sola vez
**Email template (Supabase):** incluye texto de tranquilidad antes del aviso legal:
> "Puedes cerrar esta pantalla sin problema — tu sesión queda guardada. La próxima vez que entres a longvivia.cl, ya vas a estar dentro, sin necesitar un nuevo enlace."
---
## Schema Supabase (tablas activas)

```sql
-- Perfiles
profiles: id, nombre, apellido, telefono, ciudad, prevision, condicion, plan, preferencias, created_at
-- Chat VIVIAN
chat_messages: id, user_id, role ('user'|'assistant'), content, canal ('web'|'whatsapp'), created_at
-- Artículos
articulos: id, slug, titulo, pilar, resumen, contenido, publicado, created_at
-- Agenda
agenda: id, user_id, titulo, tipo, fecha, proveedor, notas, confirmado, created_at
-- Medicamentos
medicamentos: id, user_id, nombre, dosis, horarios (array de "HH:MM"), activo, created_at
-- Analytics
eventos: id, tipo, user_id, metadata (JSONB), created_at
```

> Nota (22-07-2026): campo `prevision` en `profiles` existe en el schema pero VIVIAN no lo usa formalmente — ver alerta de riesgo arriba. Pendiente: confirmar si el campo está siendo poblado hoy vía UI o solo definido en el schema.
---
## Variables de entorno

```bash
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=+14155238886
NEXT_PUBLIC_APP_URL=https://longvivia.cl
```

---
## Deploy
- **Repo:** github.com/arielbustos79-cloud/longviva (rama `master`)
- **Vercel:** proyecto `longviva` bajo cuenta `arielteta9`
- **Auto-deploy:** cada push a `master` → deploy automático en Vercel
- **Deploy manual:** `npx vercel --prod` desde `C:\Users\ARIEL\longviva`
- **Dominio producción:** longvivia.cl + [www.longvivia.cl](https://www.longvivia.cl)
---
## Estado actual — Julio 2026
### Construido y en producción ✅
- Landing page completa con todas las secciones y diseño de marca
- Auth magic link (registro + login) con toast de bienvenida
- Dashboard de usuario con cards de acceso rápido + tarjeta "Resumen de hoy"
- VIVIAN web (chat completo con historial, búsqueda, micrófono)
- VIVIAN WhatsApp (Twilio webhook con verificación de firma)
- 5 artículos publicados con tracker de lectura
- Juegos cognitivos: Memoria + Sopa de letras
- **Mi agenda** — CRUD de citas + exportación a calendario (.ics)
- **Mis medicamentos** — CRUD de recordatorios + exportación a calendario recurrente (.ics)
- Panel de analytics interno `/admin`
- Navbar con todos los links (desktop + mobile hamburguesa)
- LongViva SpA constituida (13-07-2026, vía RES)
- **PWA instalable** — confirmada funcional (23-07-2026), verificado vía commits `4be1cdc` (manifest, service worker, iconos, instalación) y `ef36c43` (fix de redirección tras magic link). Bug abierto: ícono del launcher no coincide con logo real de marca — pendiente de corregir asset del manifest.
- **Pilar de derivación AFP / Previsión financiera** (commits `d6a6d34`→`6f946b5`): campo `prevision_afp` en `profiles`, selector "Mi AFP" en dashboard con consentimiento explícito, VIVIAN deriva al sitio oficial sin comparar AFPs ni recomendar fondos/estrategias.
- **Pilar Comunidad** (commits `e8d2578`, `da82276`): página `/comunidad`, selector de comuna → programa municipal específico para 6 comunas (Las Condes, Providencia, Santiago, Ñuñoa, San Miguel, Quinta Normal), mensaje genérico + búsqueda Google para comunas no curadas, sección SENAMA complementaria. Confirmado: solo directorio de derivación, sin interacción usuario-a-usuario.
- **Bienestar activo — biblioteca de videos** (commit `cac53d6`): 7 videos aprobados manualmente por Ariel (23-07-2026) — Yoga en silla x2, Tai Chi x2, Musculatura x3 — con filtros por disciplina, player embebido y disclaimer médico visible por video.
- **Fix historial VIVIAN** (commits `68c1833`, `90b211a`, `c240b44`): historial ahora muestra todas las conversaciones ordenadas por fecha, expansión por grupo, eliminación individual y "borrar todo" con confirmación, bug de timezone corregido (UTC explícito).
- **Alerta de privacidad (previsión de salud + AFP) — mayormente resuelta (23-07-2026):**
  - RLS `chat_messages` DELETE scopeado a `auth.uid() = user_id` — **confirmado con captura de Supabase** ✓
  - Regla de consentimiento conversacional en `lib/vivian-prompt.ts` (commit `d6a6d34`) — **confirmada vía diff**: VIVIAN pregunta antes de persistir un dato de previsión o AFP mencionado casualmente en el chat, tanto para salud como para AFP (regla espejada) ✓
  - RLS `profiles` con `WITH CHECK (auth.uid() = id)` — Claude Code entregó el SQL que dice haber corrido, **pero falta que Ariel confirme visualmente en Supabase → Authentication → Policies → tabla `profiles`** (mismo paso ya hecho para `chat_messages`). No cerrar la alerta hasta esa confirmación.
- Cards de servicio activadas en dashboard + landing (commit `8941d81`)
- **Telemedicina** — proveedores completos (Mediclic, IntegraMédica agregados), bug de persistencia de "sin previsión" corregido, lógica condicional implementada (commit `16158c2`)
- **Ocio y experiencias** — 5 nuevas secciones de derivación (commit `8adaf07`), incluyendo Studio 54 (fiesta retro) en **Viña del Mar** — confirmado en `scripts/eventos-ocio.sql` y URL de Passline (`d0b122b`). El brief original (`brief-ocio-recursos-adicionales.md`) tenía el dato de ubicación equivocado ("Santiago Oriente") — la corrección del commit es legítima, no un error.
- **Quiénes somos** actualizado con modelo financiero y oferta corregidos (commit `345a1ff`)
- **QA landing** — los 11 puntos del brief original confirmados implementados vía revisión de `app/page.tsx` (23-07-2026): corrección gramatical hero, estadística 4.1M INE 2026, subtítulos de pilares sin promesas de gratuidad, párrafo de financiamiento actualizado, "Bienestar activo" como nombre de card, ícono de favoritos (estrella, no rama de olivo), tercera opción de tamaño de texto (A++), sección "Historias Reales" eliminada. El commit `dadc44b` decía "7 correcciones" porque parte de los puntos ya existían o se resolvieron en otros commits — el resultado neto cubre el brief completo.
### Próximamente (features en roadmap — ver sección "Decisiones de estrategia 22-23 de julio de 2026" para el detalle completo)
- Notificaciones push/WhatsApp reales para agenda y medicamentos (hoy solo hay export manual a calendario)
- Farmacias — **confirmado no implementado** (23-07-2026): no existe `app/farmacias/` ni ruta activa. Existe solo como card placeholder en `app/page.tsx` línea 611, con `activo: false`, `href: "#"` y badge "Próximamente". De los 5 pilares originales del brief, los otros 4 (Telemedicina, Bienestar activo, Ocio, Nutrición) sí tienen páginas y rutas propias — Farmacias quedó parcialmente pendiente dentro de ese mismo brief.
- Entrena tu mente — rediseño completo implementado: commit `87f5de9` — 4 juegos nuevos (Caza objetos, Secuencia, Encuentra las diferencias, Test de colores), tabla `puntajes_juegos` en Supabase, confirmado en producción (23-07-2026) ✅
- App React Native (Expo) — publicación en Google Play
### Briefs sin ningún commit asociado (actualizado 23-07-2026)
Confirmado por Claude Code — todos los briefs de la ronda 22-23/07 tienen commits asociados. No quedan briefs pendientes de esta ronda.
### Pendiente operacional
- Publicar páginas de Términos y Privacidad (pendiente revisión legal — riesgos identificados: Ley 19.628 datos de salud, B2B, publicidad segmentada, transferencia internacional)
- SII Inicio de Actividades — pausado en campo domicilio/usufructo
- Twilio: salir del Sandbox (RUT resuelto vía SpA activa; ticket #28132027 activo; pendiente verificación Facebook Business Manager)
- Primer aliado B2B — propuesta enviada a Conecta Mayor UC (19-07-2026), respuesta pendiente
- Registro de marca INAPI — decidido registrar "LongVivIA" denominativa, Clase 42, primero; checklist preparado, ejecución pendiente
- PWA — corregir ícono del launcher (no coincide con logo real de marca), ver detalle en "Estado actual"
---
## Decisiones de estrategia — 22-23 de julio de 2026 (planificación, no implementado)
> Todo lo de esta sección es decisión de negocio/estrategia, no código verificado. No marcar nada como "construido" hasta que Claude Code lo implemente y se confirme en el repo. Los puntos 1-5 son de la sesión del 22-07; los puntos 6-13 son de la sesión larga que se extendió hasta la madrugada del 23-07 (mismo bloque de trabajo, fecha de corte 23-07-2026 03:35 AM).
### 1. Pivote de modelo de negocio
Se descarta la venta de "cuota por afiliado activo" a AFP/Isapres/Cajas de Compensación como estrategia principal. Modelo vigente:
- **Instituciones grandes** (AFP/Isapre/Caja/Conecta Mayor UC) = canal de **distribución gratuita**. Recomiendan LongVivIA a sus afiliados sin costo para la institución, sin cuota pagada por ellas.
- **Monetización real** = comisión por derivación a proveedores externos (Mediclic, IntegraMédica, RedSalud, Turismo Senior, DoctorPlus, farmacias tipo ChileSalud) + publicidad segmentada.
- LongVivIA se posiciona como **orientador/filtro/validador** — no construye servicios propios, conecta al usuario con proveedores ya existentes.
> Esto reemplaza el modelo anterior de "Aliados prioritarios con tarifa por afiliado" (AFP $300-500 CLP/afiliado/mes, Cajas $1.500-3.000 CLP/afiliado/mes, Isapres/FONASA $2.000-5.000 CLP/usuario/mes, farmacias 8-12% comisión) que aparecía en versiones previas de este documento — ese cuadro de tarifas queda obsoleto.
### 2. Nuevo pilar: Farmacias
Quinto pilar de derivación (se suma a Telemedicina, Ocio, Bienestar activo, Nutrición): descuentos, disponibilidad de genéricos/bioequivalentes, artículos de cuidado de piel a bajo costo.
- Modelo a investigar: afiliación tipo ChileSalud (cupones de descuento).
- Referencia de benchmark: app "Espacio Mayor" de Conecta Mayor UC (benchmark completo hecho el 22-07-2026, sin detalle registrado en este documento).
### 3. ⚠️ ALERTA — Riesgo de privacidad activo, NO resuelto
**Hallazgo:** VIVIAN ya captura y reutiliza el dato de previsión de salud del usuario (ej. "Banmédica") desde la memoria conversacional libre — sin campo de perfil formal ni consentimiento explícito separado.
**Por qué es grave:** contradice lo ya definido en el borrador de Política de Privacidad (consentimiento expreso y separado para datos sensibles, Ley 19.628 — dato de previsión/salud).
**Estado:** pendiente de corregir en el system prompt de VIVIAN (`lib/vivian-prompt.ts`). El brief `brief-5-pilares-derivacion.md` incluye este fix como **prerrequisito** antes de activar el router de Telemedicina por previsión. No marcar como resuelto en ninguna documentación hasta confirmar el fix en código.
### 4. Briefs nuevos armados el 22-07-2026 — aún NO enviados a Claude Code
- `brief-5-pilares-derivacion.md` — activación técnica de Telemedicina, Ocio, Bienestar activo, Nutrición y Farmacias bajo modelo de derivación (incluye fix del punto 3 como prerrequisito).
- `brief-qa-landing-11-puntos.md` — correcciones de copy, estadística de población (3,5M → 4,1M según INE 2026), quitar sección "Historias Reales" (testimonios no reales, sin piloto formal aún), accesibilidad (tercera opción de tamaño de texto), entre otros.
- `quienes-somos-actualizado.md` — párrafo de financiamiento ajustado al modelo de comisión por derivación.
### 6. Expansión del modelo de pilares de derivación — de 5 a 7
Se agregan dos pilares nuevos a los 5 ya registrados (Telemedicina, Ocio, Bienestar activo, Nutrición, Farmacias):
- **AFP / Previsión financiera** (6°): mismo patrón de consentimiento explícito que previsión de salud — campo `prevision_afp` separado de `prevision` (salud). VIVIAN informa y deriva al sitio oficial de la AFP correspondiente, nunca aconseja montos ni fondos específicos (terreno regulado por Superintendencia de Pensiones). Surgió porque VIVIAN ya estaba resolviendo consultas de AFP orgánicamente sin campo formal — mismo tipo de riesgo que el hallazgo del punto 3, ahora en un dominio distinto (financiero, no salud).
- **Comunidad** (7°): recuperado del prototipo original de landing (nunca implementado en producción). Modelo de dos capas — oficinas municipales del Adulto Mayor (universal, todas las comunas) + SENAMA Centros Diurnos (apoyo más intensivo, focalizado). 6 comunas investigadas y confirmadas con perfil socioeconómico variado: Las Condes, Providencia, Santiago Centro, Ñuñoa, San Miguel, Quinta Normal. **Límite explícito: solo directorio de derivación, NO incluye interacción usuario-a-usuario (foros/chat/matching) — categoría de riesgo distinta que no se debe construir sin análisis de seguridad aparte.**
### 7. Ajustes a Telemedicina (ya construido, requiere fixes)
- Faltan agregar Mediclic e IntegraMédica como proveedores (solo estaban Mediglobal y RedSalud).
- Bug reportado: "Sin previsión registrada" no persiste al guardarse en el selector del panel — pendiente de diagnóstico y fix.
- Falta confirmar lógica condicional: si el usuario ya tiene previsión registrada, debe ir directo a la recomendación específica, no mostrar las 4 opciones genéricas.
### 8. Bienestar activo — enfoque definido: biblioteca de videos curados
En vez de directorio de terceros (mercado fragmentado, sin proveedor dominante), se optó por biblioteca de videos de YouTube curados por disciplina (Yoga en silla, Tai Chi, Musculatura/fuerza suave), inspirado en cómo lo hace "Espacio Mayor" de Conecta Mayor UC. Lista corta de 9 videos candidatos (3 por disciplina) armada — **pendiente de que Ariel los revise y apruebe uno por uno antes de publicar** (contenido de ejercicio físico, mismo nivel de cuidado que los artículos de salud — no publicar sin aprobación manual).
### 9. Ocio y experiencias — 5 recursos nuevos
Libros gratis (BPDigital, oficial del Estado), Panoramas culturales (Chile Cultura, oficial), Radios (BioBío, Cooperativa, Infinita, La Clave), Agencias de viaje (Despegar.com, Viajes Falabella), Fiestas retro/old school (Studio 54 en Santiago Oriente — único ejemplo por ahora, categoría más dinámica que requiere mantención periódica). **Se descartó explícitamente agregar canales de TV en streaming vía agregadores de terceros — riesgo real de facilitar acceso a contenido pirata.**
### 10. Entrena tu mente — rediseño completo de los juegos
Se decidió **eliminar** los 2 juegos actuales (Memoria de parejas, Sopa de letras) y reemplazarlos por 4 juegos nuevos con progresión de dificultad real, organizados según las 4 categorías cognitivas de Unobrain.com (referencia: neuropsicólogos, +60 juegos validados): Atención (Caza objetos), Memoria (Secuencia tipo Simon), Percepción (Encuentra las diferencias), Ejecución (Test de colores/efecto Stroop). Cada uno debe guardar el mejor puntaje/nivel del usuario en Supabase. **No implementado — reemplaza por completo lo que hoy está en producción bajo `/juegos`, marcar como cambio disruptivo cuando se ejecute el brief.**
### 11. Actualización de copy — Quiénes somos, hero, landing general
Corrección del modelo de financiamiento descrito (de "alianzas institucionales" a "comisión por derivación + publicidad"), corrección de estadística de población (3,5M → 4,1M según INE 2026), y 11 puntos de QA adicionales en el landing (ver brief), incluyendo recomendación de **eliminar la sección "Historias Reales"** por contener testimonios no reales sin estar en etapa de piloto formal.
### 12. ⚠️ Oportunidad de negocio sin verificar — no comprometerse aún
Invitación recibida a "Claude Impact Lab – Longevidad 2026" (organizado por Caja La Araucana, auspiciado por SURA, Mundo, Mediclic, SIRAK) — 5-6 agosto 2026, Parque Deportivo La Araucana. Se confirmó que "Claude Impact Lab" es un programa real de Anthropic (primera edición Chile fue en fintech, mayo 2026), **pero esta edición específica de "Longevidad" no se pudo verificar de forma independiente todavía.** Pendiente de que Ariel confirme por canales oficiales de Caja La Araucana antes de comprometerse a cualquier cosa. Si se confirma, encaja con el proyecto (Mediclic ya es partner de interés en Telemedicina, Caja La Araucana es aliado de distribución potencial). Requeriría equipo de 3 perfiles: profesional de salud, AI Builder, Vibecoder (este último rol lo cumpliría Ariel).
### 13. Briefs nuevos armados en la sesión 22-23/07 — aún NO enviados a Claude Code
- `brief-pilar-afp-prevision-financiera.md`
- `brief-pilar-comunidad.md`
- `brief-fix-telemedicina.md`
- `brief-bienestar-activo-videos.md` (contenido pendiente de aprobación manual de Ariel antes de publicar)
- `brief-ocio-recursos-adicionales.md`
- `brief-nuevos-juegos-entrena-mente.md`
### 14. Checklist de auditoría — actualizado 23-07-2026
- [x] Fix de consentimiento de datos de previsión de salud en `lib/vivian-prompt.ts` — confirmado vía diff (commit `d6a6d34`)
- [x] Fix de consentimiento para `prevision_afp` — confirmado, regla espejada en el mismo diff
- [x] Bug de persistencia de "Sin previsión registrada" — corregido (commit `16158c2`)
- [x] Mediclic e IntegraMédica agregados como proveedores de Telemedicina — confirmado (commit `16158c2`)
- [x] Biblioteca de videos de Bienestar activo publicada — 7 videos (no 9), todos aprobados manualmente por Ariel el 23-07-2026 antes de publicar
- [x] Estadística 3,5M → 4,1M corregida en la landing — confirmado vía código
- [x] Sección "Historias Reales" eliminada — confirmado, no existe en `app/page.tsx`
- [x] Pilares AFP y Comunidad agregados — confirmado con commits y archivos nuevos
- [x] Comunidad sigue siendo solo derivación (sin interacción usuario-a-usuario) — confirmado
- [x] RLS de `profiles` con `WITH CHECK (auth.uid() = id)` — **confirmado visualmente en Supabase por Ariel** (23-07-2026) ✓
- [x] Rediseño de juegos (Atención/Memoria/Percepción/Ejecución) — commit `87f5de9`, confirmado en producción (23-07-2026) ✓
- [ ] Pilar Farmacias — **confirmado NO implementado**, sigue como placeholder visual sin ruta
---
## Sub-proyecto: Parkin&Son / NORITA (movido a otra rama)
Vivía en este repo bajo `app/parkinandson/`, `app/api/norita/` y `lib/norita-prompt.ts` — un
producto/marca distinto (acompañamiento para personas con Parkinson y sus familias), no una
feature de LongVivIA, sin enlace desde la navegación ni URL pública en producción.
Se separó a la rama **`parkinandson-draft`** (18 jul 2026) para dejar de mezclarse con el
desarrollo activo de LongVivIA. El historial se preservó — incluyendo el commit original
`6df8295` (5 jun 2026) que lo introdujo junto con el trabajo de memoria persistente de VIVIAN.
Proyecto en pausa intencional; el `TODO: conectar con Supabase` del formulario de lista de
espera queda sin resolver a propósito. Detalle completo en el `.claude/CLAUDE.md` de esa rama.
---
## Principios de desarrollo
1. **Senior-friendly:** fuente mínima 18px, botones grandes, máx. 3 clics para cualquier acción
2. **Mobile first:** diseño responsivo probado en mobile
3. **Analytics no bloqueante:** todos los eventos usan fire-and-forget (`void promise`)
4. **Contenido de salud:** NUNCA generar estadísticas o citas médicas — solo usar contenido aprobado
5. **Privacidad:** RLS en Supabase, nunca exponer service_role_key al cliente
6. **Sin tecnicismos de marca:** respetar vocabulario permitido/prohibido en TODO el copy
