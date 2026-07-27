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
│   ├── telemedicina/page.tsx ← Router de derivación por previsión
│   ├── ocio/page.tsx         ← Ocio y experiencias
│   ├── nutricion/page.tsx    ← Nutrición — router por previsión
│   ├── bienestar/page.tsx    ← Bienestar activo — videos curados + artículos
│   ├── comunidad/page.tsx    ← Directorio municipal por comuna + SENAMA
│   ├── farmacias/page.tsx    ← Farmacias comunitarias por comuna
│   ├── ayuda/page.tsx        ← Centro de ayuda — FAQ + feedback
│   ├── proveedores/page.tsx  ← Página informativa proveedores/aliados
│   ├── anunciantes/page.tsx  ← Página informativa anunciantes
│   ├── admin/page.tsx        ← Panel interno (solo ariel.bustos79@gmail.com)
│   ├── quienes-somos/page.tsx
│   ├── terminos/page.tsx
│   ├── privacidad/page.tsx
│   ├── trabaja/page.tsx
│   ├── auth/callback/route.ts ← Intercambia code → sesión, redirige a /dashboard?bienvenida=1
│   └── api/
│       ├── vivian/route.ts   ← Claude API endpoint (chat web) — rate limit 20 req/min
│       └── whatsapp/route.ts ← Twilio webhook (VIVIAN por WhatsApp) — rate limit 10 req/min
├── components/
│   ├── OliveBranch.tsx       ← SVG logo rama de olivo (props: size, variant)
│   └── VivianIcon.tsx        ← Avatar SVG de VIVIAN
├── lib/
│   ├── supabase-browser.ts   ← Cliente Supabase (client components)
│   ├── supabase-server.ts    ← Cliente Supabase SSR con cookies (@supabase/ssr)
│   ├── vivian-prompt.ts      ← System prompt de VIVIAN
│   ├── external-urls.ts      ← Catálogo de URLs verificadas (HTTP 200 OK) — VIVIAN solo usa estas
│   ├── prevision.ts          ← Tipos previsión + matriz telemedicina por isapre + AFP URLs
│   ├── farmacias.ts          ← Datos farmacias comunitarias por comuna (⚠ pendiente verificación)
│   ├── generarIcs.ts         ← Genera y descarga .ics (citas y medicamentos)
│   └── logEvento.ts          ← Fire-and-forget analytics a tabla "eventos"
├── scripts/
│   ├── verify-urls.mjs           ← Verifica HTTP de todas las URLs del catálogo
│   ├── gen-pwa-icons.mjs         ← Genera iconos PWA desde SVG
│   ├── feedback.sql              ← Tabla feedback + RLS
│   ├── farmacias-comunitarias.sql← Tabla farmacias_comunitarias + RLS
│   ├── sala-portugal-insert.sql  ← INSERT Sala Portugal en eventos_ocio
│   └── SCRIPTS.md                ← Documentación de todos los scripts
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
| `/telemedicina` | ✅ Activa | Router de derivación por previsión (matriz completa 25-07) |
| `/ocio` | ✅ Activa | Ocio y experiencias — libros, cultura, radio, gastronomía, fiestas |
| `/nutricion` | ✅ Activa | Nutrición — router por previsión |
| `/bienestar` | ✅ Activa | Bienestar activo — videos curados + artículos |
| `/comunidad` | ✅ Activa | Directorio municipal por comuna + SENAMA |
| `/farmacias` | ✅ Activa | Farmacias comunitarias por comuna (datos ⚠ pendiente verificación) |
| `/ayuda` | ✅ Activa | Centro de ayuda — 4 pasos + FAQ acordeón + feedback |
| `/proveedores` | ✅ Activa | Página informativa proveedores (placeholder con mailto) |
| `/anunciantes` | ✅ Activa | Página informativa anunciantes (placeholder con mailto) |
| `/admin` | ✅ Activa | Panel analytics (solo admin) |
| `/quienes-somos` | ✅ Activa | Página institucional |
| `/terminos` | ✅ Draft | Pendiente revisión legal |
| `/privacidad` | ✅ Draft | Pendiente revisión legal |
| `/trabaja` | ✅ Activa | Página de empleo |
---
## Landing page (`/`) — Secciones
1. **Navbar** — Logo + links (Quiénes somos, Servicios, VIVIAN IA, Centro de ayuda, Contacto) + botón Ingresar/Mi panel + hamburguesa mobile. Igual en desktop y mobile (simplificado 25-07-2026: se eliminaron Artículos, Entrena tu mente, ¿Cómo funciona?).
2. **Hero** — Tagline principal + CTA registro
3. **Prime** — 4 tarjetas: Telemedicina gratis, Clases ilimitadas, Tours a tu ritmo, VIVIAN 24/7
4. **VIVIAN section** — Mockup chat (no clickeable) + features + botón "Hablar con VIVIAN →"
5. **Servicios** — Card destacada VIVIAN IA + cards secundarias activas e inactivas
6. **¿Cómo funciona?** — 3 pasos animados (sección existe en landing, link eliminado del navbar)
7. **Testimonios** — Citas editoriales con OliveBranch + "Usuario LongVivIA"
8. **Marquee** — Pilares: salud, bienestar, juegos, VIVIAN, nutrición...
9. **Contacto / Footer** — Email, WhatsApp, redes, links legales
**Footer Servicios:** VIVIAN IA, Artículos, Entrena tu mente, Agenda, Medicamentos, Comunidad, AFP/Previsión financiera, Telemedicina, Bienestar activo, Ocio y experiencias, Farmacias comunitarias.
**Footer Empresa:** Quiénes somos, Proveedores (/proveedores), Anunciantes (/anunciantes), Trabaja con nosotros.
**Footer Ayuda:** Centro de ayuda (/ayuda), Términos de uso, Privacidad.
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
- **Farmacias** → `/farmacias`
Cards próximamente: Telemedicina, Bienestar activo, Tours y experiencias.
**Toast de bienvenida:** Al llegar desde magic link (`?bienvenida=1`), muestra toast verde "🌿 ¡Listo, [nombre]! Ya iniciaste sesión." por 4 segundos. El parámetro se limpia del URL automáticamente.
---
## Agenda y Medicamentos (`/agenda`, `/medicamentos`)
- **Agenda:** CRUD de citas (título, tipo, fecha/hora, proveedor, notas) en tabla `agenda`. Tipos "Telemedicina" y "Tour" ya están en el selector pero deshabilitados (`activo: false`) — reservados para cuando existan esas features.
- **Medicamentos:** CRUD de medicamentos (nombre, dosis, múltiples horarios de toma) en tabla `medicamentos`. Se pueden marcar inactivos sin borrar el historial.
- **Exportación a calendario (`lib/generarIcs.ts`, librería `ics`):** botón "📅 Agregar a mi calendario" en cada cita/medicamento genera un `.ics` descargable (alarma nativa en Google Calendar/iPhone/Outlook). Los medicamentos se exportan como evento diario recurrente (`FREQ=DAILY`) por cada horario.
- **Limitación conocida (por diseño):** el `.ics` es un snapshot al momento de exportar — si el usuario edita o elimina la cita/medicamento después, el evento ya exportado en su calendario NO se actualiza solo. Se avisa con nota visible en ambas páginas.
- **⚠️ Recordatorios automáticos por WhatsApp NO existen** — Twilio sigue en Sandbox (ticket #28132027). No mencionar en ningún copy del sitio ni en respuestas de VIVIAN. Regla activa en `lib/vivian-prompt.ts`.
---
## VIVIAN Chat (`/vivian`)
- Header: "VIVIAN" centrado + "● En línea", fecha + "← Volver" (→ /dashboard si hay sesión, → / si no)
- Íconos: 🕐 historial de conversaciones / 🔍 búsqueda en historial
- Input: placeholder "Escribe o Habla", botón micrófono (SpeechRecognition), botón "Enviar"
- Historial: carga últimos 60 mensajes como contexto oculto para VIVIAN
- Logs: `logEvento("vivian_mensaje", { canal: "web" })`
- **WhatsApp:** webhook en `/api/whatsapp` con verificación firma Twilio (HMAC-SHA1), logs `vivian_mensaje` canal whatsapp
- **Seguridad:** `userId` se obtiene del JWT de sesión del lado servidor (`authClient.auth.getUser()` via `@supabase/ssr`), nunca del body del cliente — previene IDOR (25-07-2026).
---
## Artículos
- Tabla `articulos` en Supabase: `slug, titulo, pilar, resumen, contenido, publicado`
- Pilares (valores reales en BD, con CHECK constraint `articulos_pilar_check` activo): `salud_activa`, `bienestar_energia`, `vida_social`, `tecnologia_simple`, `finanzas_prevision`
- 10 artículos publicados (2 por pilar), todos tipo `original` o `curado`
- `ArticuloTracker.tsx`: dispara `articulo_leido` tras 30s O 80% de scroll (lo que ocurra primero), sin duplicados (ref `registrado`)
---
## Juegos — Entrena tu mente (`/juegos`)
4 juegos nuevos (commit `87f5de9`), basados en categorías cognitivas de Unobrain. Los juegos anteriores (Memoria de parejas, Sopa de letras) fueron reemplazados — sus rutas redirigen a `/juegos`.
### Caza objetos (`/juegos/caza-objetos`) — Atención
- Grilla 4×4 → 8×8 con progresión de dificultad
### Secuencia (`/juegos/secuencia`) — Memoria
- Secuencia tipo Simón sin techo de nivel
### Encuentra las diferencias (`/juegos/diferencias`) — Percepción
- 5 escenas SVG con diferencias a encontrar
### Test de colores (`/juegos/test-colores`) — Ejecución
- Efecto Stroop, 60 segundos
Todos guardan mejor puntaje/nivel en tabla `puntajes_juegos` en Supabase.
---
## Catálogo de URLs verificadas (`lib/external-urls.ts`)
VIVIAN **solo puede mencionar URLs de esta lista** — nunca genera URLs de memoria. Si el proveedor no está en el catálogo, admite que no tiene el link verificado y deriva a Google.
- Verificación HTTP real via `scripts/verify-urls.mjs`
- Práctica establecida: correr el script antes de cualquier push que modifique el catálogo
- Última verificación completa: 25-07-2026
---
## Telemedicina — Matriz por Isapre (`lib/prevision.ts`)
Matriz completa, tres pasadas de verificación en fuente oficial. Cerrada 25-07-2026.
| Isapre | Proveedor(es) |
|---|---|
| Cruz Blanca | IntegraMédica + Mediclic (cruzblanca.mediclic.cl) + Portal Mi Cruz Blanca |
| Banmédica / Vida Tres | IntegraMédica |
| Consalud | Click Doctor |
| Colmena | Doctor Online + Mediclic (según plan) |
| Nueva MasVida | Telemedicina propia + Blue Doctor/Mediclic |
| Esencial | TeleUrgencia (Clínica Alemana) + IntegraMédica + RedSalud |
| Fonasa | RedSalud + Mediglobal |
| Caja | Mediclic |
Dominio oficial Isapre Esencial: `somosesencial.cl` (no `esencial.cl` ni `isapreesencial.cl`).
---
## Analytics internos
### Tabla `eventos` (Supabase)
```sql
CREATE TABLE eventos (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo       TEXT,
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
- `juego_completado` — juego terminado
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
profiles: id, nombre, apellido, telefono, ciudad, prevision, prevision_afp, condicion, plan, preferencias, created_at
-- Chat VIVIAN
chat_messages: id, user_id, role ('user'|'assistant'), content, canal ('web'|'whatsapp'), created_at
-- Artículos
articulos: id, slug, titulo, pilar, resumen, contenido, publicado, created_at
-- Agenda
agenda: id, user_id, titulo, tipo, fecha, proveedor, notas, confirmado, created_at
-- Medicamentos
medicamentos: id, user_id, nombre, dosis, horarios (array de "HH:MM"), activo, created_at
-- Tomas (historial de tomas de medicamentos — sin policy DELETE, intencional)
tomas_medicamento: id, user_id, medicamento_id, tomado_at, created_at
-- Juegos
puntajes_juegos: id, user_id, juego, puntaje, nivel, created_at
-- Ocio
eventos_ocio: id, nombre, lugar, descripcion, fecha_texto, url, orden, created_at
-- Farmacias (datos pendientes verificación por municipio)
farmacias_comunitarias: id, comuna, nombre, direccion, horario, requisitos, telefono, link, nota, created_at
-- Feedback (/ayuda)
feedback: id, nombre, que_hacias, que_fue_dificil, comentario, user_id, created_at
-- Analytics
eventos: id, tipo, user_id, metadata (JSONB), created_at
```
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
- **Dominio producción:** longvivia.cl + www.longvivia.cl
---
## Estado actual — Julio 2026
### Construido y en producción ✅
- Landing page completa con todas las secciones y diseño de marca
- Auth magic link (registro + login) con toast de bienvenida
- Dashboard de usuario con cards de acceso rápido + tarjeta "Resumen de hoy"
- VIVIAN web (chat completo con historial, búsqueda, micrófono)
- VIVIAN WhatsApp (Twilio webhook con verificación de firma)
- 10 artículos publicados con tracker de lectura (2 por pilar, pilares verificados 27-07-2026)
- **Juegos cognitivos rediseñados** (commit `87f5de9`): 4 juegos nuevos Unobrain (Caza objetos, Secuencia, Diferencias, Stroop) con guardado de puntaje en Supabase
- **Mi agenda** — CRUD de citas + exportación a calendario (.ics)
- **Mis medicamentos** — CRUD de recordatorios + exportación a calendario recurrente (.ics)
- Panel de analytics interno `/admin`
- LongViva SpA constituida (13-07-2026, vía RES)
- **PWA instalable** — confirmada funcional (23-07-2026). Bug abierto: ícono del launcher no coincide con logo real de marca.
- **Pilar AFP / Previsión financiera**: campo `prevision_afp` en profiles, selector con consentimiento explícito, VIVIAN deriva sin asesorar.
- **Pilar Comunidad**: /comunidad, selector de comuna → 6 comunas curadas + SENAMA. Solo derivación, sin interacción usuario-a-usuario.
- **Bienestar activo**: 7 videos aprobados manualmente (Yoga en silla x2, Tai Chi x2, Musculatura x3).
- **Ocio y experiencias**: libros, agenda cultural, radios, gastronomía, fiestas retro, Sala Portugal.
- **Farmacias comunitarias**: /farmacias activa, selector por comuna, 6 comunas con datos ⚠ pendiente verificación municipal.
- **Centro de ayuda /ayuda**: 4 pasos, FAQ acordeón (8 preguntas, privacidad primero), CTA a VIVIAN, formulario feedback → tabla `feedback` en Supabase.
- **Páginas empresa**: /proveedores y /anunciantes activas (placeholders informativos con mailto).
- **Fix historial VIVIAN**: historial por fecha, expansión, eliminación individual y masiva, bug timezone corregido.
- **Catálogo URLs VIVIAN** (`lib/external-urls.ts`): 35+ URLs verificadas HTTP 200, VIVIAN solo puede usar estas.
- **Matriz Telemedicina/Isapres** (`lib/prevision.ts`): completa, triple verificación en fuente oficial, cerrada 25-07-2026.
- **Auditoría de seguridad** (24-25-07-2026): RLS completo, rate limiting, headers de seguridad, IDOR fix — ver checklist abajo.
- **Navbar simplificado** (25-07-2026): igual en desktop y mobile — Quiénes somos, Servicios, VIVIAN IA, Centro de ayuda, Contacto.
- **Fix WhatsApp** (25-07-2026): eliminadas promesas de recordatorios automáticos inexistentes. Regla activa en vivian-prompt.ts.
### Próximamente (roadmap)
- Notificaciones push/WhatsApp reales (bloqueado por Twilio ticket #28132027)
- Datos farmacias comunitarias — verificación pendiente en sitios municipales
- Videos Nutrición — candidatos listos, pendiente aprobación uno por uno por Ariel
- npm audit — actualizar next@16.2.7 → 16.2.11 (5 CVEs high, no urgente)
- App React Native (Expo) — publicación en Google Play
### Pendiente operacional
- Publicar Términos y Privacidad (pendiente revisión legal — Ley 19.628, B2B, publicidad, transferencia internacional)
- SII Inicio de Actividades — pausado en campo domicilio/usufructo
- Twilio: salir del Sandbox (ticket #28132027, pendiente Meta Business Manager)
- Primer aliado B2B — propuesta enviada a Conecta Mayor UC (19-07-2026), respuesta pendiente
- Registro de marca INAPI — "LongVivIA" denominativa, Clase 42; checklist listo, ejecución pendiente
- PWA — corregir ícono del launcher
---
## Auditoría de seguridad — Checklist (actualizado 25-07-2026)
- [x] RLS `chat_messages` DELETE scopeado a `auth.uid() = user_id` — confirmado con captura Supabase ✓
- [x] RLS `profiles` con `WITH CHECK (auth.uid() = id)` — confirmado visualmente en Supabase ✓
- [x] RLS `agenda`, `medicamentos`, `tomas_medicamento` — activo, policies correctas ✓
- [x] RLS `articulos` — RLS estaba deshabilitado, corregido con `ALTER TABLE articulos ENABLE ROW LEVEL SECURITY` ✓
- [x] RLS `eventos_ocio` — solo SELECT para autenticados ✓
- [x] RLS `puntajes_juegos` — `auth.uid() = user_id` en SELECT/INSERT/UPDATE ✓
- [x] RLS `feedback` — INSERT autenticado + SELECT propio ✓
- [x] Rate limiting `/api/vivian` — 20 req/min por user_id (fallback IP), 429 en español. Limitación declarada: in-process, no persiste entre instancias serverless. (commit `c7a8cc4`) ✓
- [x] Rate limiting `/api/whatsapp` — 10 req/min por teléfono. Firma Twilio es primera línea de defensa. ✓
- [x] IDOR `/api/vivian` — userId desde JWT sesión servidor (`authClient.auth.getUser()` via @supabase/ssr), nunca del body. (commit `c3b49f2`) ✓
- [x] Headers de seguridad `next.config.ts` — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. (commit `c7a8cc4`) ✓
- [x] XSS / dangerouslySetInnerHTML — no existe en el proyecto ✓
- [x] Panel `/admin` — validación server-side, no depende del cliente ✓
- [x] Consentimiento previsión de salud en VIVIAN — regla en vivian-prompt.ts (commit `d6a6d34`) ✓
- [x] Consentimiento AFP en VIVIAN — regla espejada, mismo commit ✓
- [ ] npm audit — next@16.2.7 tiene 5 CVEs high → actualizar a 16.2.11 (no urgente)
---
## Decisiones de estrategia — 22-23 de julio de 2026
> Todo lo de esta sección es decisión de negocio/estrategia. Los puntos 1-5 son del 22-07; los 6-13 de la sesión del 23-07.
### 1. Pivote de modelo de negocio
Modelo vigente: instituciones grandes = canal de distribución gratuita. Monetización = comisión por derivación + publicidad segmentada. LongVivIA es orientador/filtro/validador, no construye servicios propios.
### 2. Pilar Farmacias
Quinto pilar de derivación. Modelo a investigar: afiliación tipo ChileSalud.
### 6. Expansión pilares de 5 a 7
AFP/Previsión financiera (6°) y Comunidad (7°) agregados. Comunidad: solo directorio, sin interacción usuario-a-usuario.
### 10. Juegos — rediseño completo
Reemplazados Memoria/Sopa de letras por 4 juegos Unobrain. **Implementado y en producción** (commit `87f5de9`).
### 12. ⚠️ Oportunidad sin verificar
"Claude Impact Lab – Longevidad 2026" (Caja La Araucana, 5-6 agosto) — esta edición específica no verificada de forma independiente. Pendiente confirmación de Ariel por canales oficiales.
---
## Decisiones de estrategia — 24 de julio de 2026
### 15. Catálogo de URLs VIVIAN — cerrado
Catálogo fijo en `lib/external-urls.ts`, 35+ URLs verificadas HTTP real. VIVIAN solo usa URLs de esta lista. Práctica: correr `verify-urls.mjs` antes de cada push que modifique el catálogo.
### 16. Auditoría de seguridad — resultado
Ver checklist arriba. Único pendiente: npm audit (no urgente).
---
## Decisiones de estrategia — 25 de julio de 2026
### 17. Fix WhatsApp — promesa incumplida eliminada
Card "Gestión de salud" prometía "recordatorios automáticos por WhatsApp" — eliminado. Auditoría completa de menciones en el repo: todas las demás son correctas (canal de conversación activo). Regla activa en `lib/vivian-prompt.ts`: si un usuario pregunta por recordatorios automáticos, VIVIAN explica que hoy existe exportación .ics y que los recordatorios están en desarrollo, sin comprometerse a fecha.
### 18. Matriz Telemedicina/Isapres — cerrada
Triple verificación en fuente oficial. Ver tabla en sección "Telemedicina — Matriz por Isapre" arriba. Descartados: "Clinitel" (Consalud) y "Docdoc y RedSalud" (Colmena). Dominio Esencial: `somosesencial.cl`. Migración SQL ejecutada: usuarios con `prevision = 'isapre_cruz_del_norte'` → 'ninguna' (isapre cerrada, exclusiva SQM).
### 19. Radios — URLs corregidas
`radiobeethoven.cl` (DNS_FAIL) → `beethovenfm.cl`. `radio.t13.cl` (DNS_FAIL) → `t13.cl/en-vivo`.
### 20. Navbar simplificado
Desktop y mobile unificados: eliminados "¿Cómo funciona?", "Artículos", "Entrena tu mente". Agregado "Centro de ayuda" → /ayuda. Menú final: Quiénes somos · Servicios · VIVIAN IA · Centro de ayuda · Contacto.
### 21. Próximo enfoque
Con desarrollo técnico y auditoría en buen estado, el foco pasa a: comercial (Conecta Mayor UC), legal (SII, Términos/Privacidad, INAPI), Twilio producción. El chat de estrategia toma estas decisiones; el chat de código y auditor siguen disponibles para verificar avances técnicos.
---
## Sub-proyecto: Parkin&Son / NORITA (movido a otra rama)
Separado a rama `parkinandson-draft` (18 jul 2026). Proyecto en pausa intencional. Detalle en `.claude/CLAUDE.md` de esa rama.
---
## Principios de desarrollo
1. **Senior-friendly:** fuente mínima 18px, botones grandes, máx. 3 clics para cualquier acción
2. **Mobile first:** diseño responsivo probado en mobile
3. **Analytics no bloqueante:** todos los eventos usan fire-and-forget (`void promise`)
4. **Contenido de salud:** NUNCA generar estadísticas o citas médicas — solo usar contenido aprobado
5. **Privacidad:** RLS en Supabase, nunca exponer service_role_key al cliente
6. **Sin tecnicismos de marca:** respetar vocabulario permitido/prohibido en TODO el copy
7. **URLs verificadas:** VIVIAN nunca genera URLs de memoria — solo usa `lib/external-urls.ts`
8. **Sin promesas inexistentes:** no mencionar features que no están en producción (ej. recordatorios WhatsApp)
