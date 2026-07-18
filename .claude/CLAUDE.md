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

Plataforma digital **100% gratuita** de salud, bienestar y experiencias para personas en su prime (+60 años) en Chile. Se financia con publicidad segmentada y alianzas B2B (AFP, Isapres, Cajas de Compensación, farmacias, clínicas).

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
│   │   ├── page.tsx          ← Selección de juegos
│   │   ├── memoria/page.tsx  ← Juego de memoria (4x3, 6 pares)
│   │   └── sopa-letras/page.tsx ← Sopa de letras (12x12)
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
| `/juegos` | ✅ Activa | Selección de juegos cognitivos |
| `/juegos/memoria` | ✅ Activa | Juego de memoria |
| `/juegos/sopa-letras` | ✅ Activa | Sopa de letras |
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
- 5 artículos publicados con tracker de lectura
- Juegos cognitivos: Memoria + Sopa de letras
- **Mi agenda** — CRUD de citas + exportación a calendario (.ics)
- **Mis medicamentos** — CRUD de recordatorios + exportación a calendario recurrente (.ics)
- Panel de analytics interno `/admin`
- Navbar con todos los links (desktop + mobile hamburguesa)

### Próximamente (features en roadmap)
- Notificaciones push/WhatsApp reales para agenda y medicamentos (hoy solo hay export manual a calendario)
- Telemedicina online (Whereby embed)
- Bienestar activo (clases en vivo/grabadas)
- Tours y experiencias
- App React Native (Expo) — publicación en Google Play

### Pendiente operacional
- Publicar páginas de Términos y Privacidad (pendiente revisión legal)
- Twilio: salir del Sandbox (requiere cuenta de empresa activa)
- Primer aliado B2B firmado
- Registro de marca LongVivIA en INAPI (Clases 42 y 44)
- Constitución LongViva SpA en RES

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
