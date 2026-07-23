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

Plataforma digital **100% gratuita** de salud, bienestar y experiencias para personas en su prime (+60 años) en Chile. Se financia con publicidad segmentada y comisión por derivación a proveedores externos (modelo vigente desde 22-07-2026 — reemplaza el modelo anterior de cuota por afiliado).

LongVivIA actúa como **orientador/filtro/validador** — no construye servicios propios, conecta al usuario con proveedores ya existentes y gana comisión por derivación.

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

**Regla crítica de consentimiento (implementada 22-07-2026):** Si el usuario menciona su previsión en el chat, VIVIAN debe preguntar "¿Quieres que recuerde tu previsión para orientarte mejor la próxima vez?" antes de usar ese dato. Nunca asumir consentimiento por una mención casual. Ver `lib/vivian-prompt.ts`.

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
               ⚠️ Sandbox bloqueado — ticket Twilio #28132027 activo
Analytics:     Tabla "eventos" en Supabase (custom, no GA)
Hosting:       Vercel (auto-deploy desde GitHub master)
ICS export:    Librería `ics` (npm) — genera .ics para Google/iPhone/Outlook
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
│   ├── dashboard/
│   │   ├── page.tsx          ← Panel de usuario autenticado
│   │   ├── page.module.css
│   │   ├── PerfilSalud.tsx   ← Mi previsión (selector + consentimiento Ley 19.628)
│   │   └── ResumenHoy.tsx    ← Tarjeta "Resumen de hoy" (medicamentos + citas)
│   ├── agenda/page.tsx       ← Mi agenda — CRUD de citas + export .ics
│   ├── medicamentos/page.tsx ← Mis medicamentos — CRUD + export .ics recurrente
│   ├── telemedicina/page.tsx ← Router por previsión (RedSalud/IntegraMédica/Mediclic)
│   ├── ocio/page.tsx         ← Ocio y experiencias (VTE Sernatur + Turismo Senior)
│   ├── nutricion/page.tsx    ← Nutrición — router por previsión (DoctorPlus/Mediglobal)
│   ├── bienestar/page.tsx    ← Bienestar activo — artículos curados + placeholder clases
│   ├── vivian/page.tsx       ← Chat VIVIAN (web)
│   ├── articulos/
│   │   ├── page.tsx          ← Listado de artículos
│   │   └── [slug]/
│   │       ├── page.tsx      ← Artículo individual
│   │       └── ArticuloTracker.tsx
│   ├── juegos/
│   │   ├── page.tsx
│   │   ├── memoria/page.tsx
│   │   └── sopa-letras/page.tsx
│   ├── admin/page.tsx
│   ├── quienes-somos/page.tsx
│   ├── terminos/page.tsx
│   ├── privacidad/page.tsx
│   ├── trabaja/page.tsx
│   ├── auth/callback/route.ts
│   └── api/
│       ├── vivian/route.ts
│       └── whatsapp/route.ts
├── components/
│   ├── OliveBranch.tsx
│   └── VivianIcon.tsx
├── lib/
│   ├── supabase-browser.ts
│   ├── supabase-server.ts
│   ├── vivian-prompt.ts      ← System prompt VIVIAN (incluye regla de consentimiento previsión)
│   ├── prevision.ts          ← Tipos, labels y routers por previsión (telemedicina/nutrición)
│   ├── generarIcs.ts         ← Genera y descarga .ics (citas y medicamentos)
│   └── logEvento.ts
├── scripts/
│   └── articulos-batch-2.sql ← INSERT de los 5 artículos del batch 2
└── public/
```

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
| `/telemedicina` | ✅ Activa | Router de derivación por previsión |
| `/ocio` | ✅ Activa | Ocio y experiencias (VTE Sernatur + Turismo Senior) |
| `/nutricion` | ✅ Activa | Nutrición — router por previsión |
| `/bienestar` | ✅ Activa | Bienestar activo — artículos curados |
| `/articulos` | ✅ Activa | Listado de artículos |
| `/articulos/[slug]` | ✅ Activa | Artículo individual con tracker |
| `/juegos` | ✅ Activa | Selección de juegos cognitivos |
| `/juegos/memoria` | ✅ Activa | Juego de memoria |
| `/juegos/sopa-letras` | ✅ Activa | Sopa de letras |
| `/admin` | ✅ Activa | Panel analytics (solo admin) |
| `/quienes-somos` | ✅ Activa | Página institucional (actualizada 22-07-2026) |
| `/terminos` | ✅ Draft | Pendiente revisión legal |
| `/privacidad` | ✅ Draft | Pendiente revisión legal |
| `/trabaja` | ✅ Activa | Página de empleo |

---

## Dashboard (`/dashboard`)

Orden de secciones de arriba hacia abajo:
1. **PerfilSalud** — "Mi previsión de salud": selector agrupado (Fonasa / Isapre [7 opciones] / Caja de Compensación) + checkbox de consentimiento explícito Ley 19.628. Botón gris hasta que el usuario tilda el consentimiento.
2. **ResumenHoy** — Medicamentos del día (4 estados: ingerido/próxima/pendiente/atrasada) + citas de hoy. UPSERT en `tomas_medicamento` al marcar ingerido. Auto-refresh de estados cada 60 segundos.
3. **Cards de acceso rápido** — VIVIAN IA (destacada), Artículos, Entrena tu mente, Mi agenda, Mis medicamentos (activos) + Telemedicina 🔜, Bienestar activo 🔜, Tours 🔜 (próximamente)
4. **Banner VIVIAN** — CTA rápido a `/vivian`

---

## Pilares de derivación

Lógica centralizada en `lib/prevision.ts`. Valores del campo `profiles.prevision`:

| Valor | Label |
|---|---|
| `fonasa` | Fonasa |
| `isapre_banmedica` | Isapre Banmédica |
| `isapre_cruz_blanca` | Isapre Cruz Blanca |
| `isapre_consalud` | Isapre Consalud |
| `isapre_colmena` | Isapre Colmena |
| `isapre_vida_tres` | Isapre Vida Tres |
| `isapre_nueva_masvida` | Isapre Nueva Masvida |
| `isapre_cruz_del_norte` | Isapre Cruz del Norte |
| `caja` | Caja de Compensación |
| `null` | Sin previsión registrada |

**Telemedicina** (`/telemedicina`):
- Fonasa → RedSalud Telemedicina + Mediglobal
- Cruz Blanca / Colmena → IntegraMédica
- Caja → Mediclic
- Resto isapres → Mediglobal
- Sin previsión → mensaje + link al dashboard para completar perfil

**Ocio** (`/ocio`): VTE Sernatur (destacado como "Programa estatal") + Turismo Senior. Sin mencionar precios.

**Nutrición** (`/nutricion`): Fonasa → DoctorPlus. Resto → DoctorPlus + Mediglobal.

**Bienestar** (`/bienestar`): artículos curados propios + placeholder "Próximamente" para clases en vivo.

**Farmacias**: ⏸️ BLOQUEADO — pendiente confirmar modelo de afiliación (tipo ChileSalud) antes de construir cualquier cosa.

**Copy invariable en todos los pilares:** nunca prometer "gratis" ni "sin costo" de forma absoluta — usar "Consulta si tu previsión cubre esta atención" o "Verifica con tu plan antes de agendar".

---

## Agenda y Medicamentos

- **Agenda** (`/agenda`): CRUD de citas en tabla `agenda`. Exporta `.ics` con alarma 1h antes. Tipos Telemedicina y Tour en el selector pero `activo: false`.
- **Medicamentos** (`/medicamentos`): CRUD en tabla `medicamentos`. Exporta `.ics` con `RRULE:FREQ=DAILY` por cada horario (alarma al momento exacto).
- **tomas_medicamento**: tabla para tracking de dosis. UPSERT al marcar ingerido. No se pre-generan filas — se calcula cruzando `medicamentos.horarios` con registros del día.
- **Limitación conocida:** el `.ics` es estático — si el usuario edita algo después de exportar, el calendario no se actualiza. Se avisa con nota en ambas páginas.

---

## Artículos (estado 22-07-2026)

10 artículos publicados en 2 batches:

**Batch 1 (5 artículos):**
- Chequeos que vale la pena tener al día (`salud_activa`)
- Moverse 20 minutos al día (`salud_activa`)
- El café de los martes (`vida_social`)
- Videollamadas sin complicaciones (`tecnologia_simple`)
- Isapre o Fonasa (`finanzas_prevision`)

**Batch 2 (5 artículos — 22-07-2026):**
- Jubilarse y sentir un vacío (`bienestar_energia`, curado)
- Hervir laurel en casa (`salud_activa`, curado)
- Fiestas old school (`vida_social`, original)
- Invertir en tiempos inciertos (`finanzas_prevision`, original)
- IA y brecha digital (`tecnologia_simple`, original)

Columna del cuerpo: `contenido` (no `cuerpo` — error detectado al insertar batch 2).

---

## VIVIAN Chat (`/vivian`)

- Historial: últimos 60 mensajes como contexto oculto
- Logs: `logEvento("vivian_mensaje", { canal: "web" })`
- **WhatsApp:** webhook en `/api/whatsapp` — ⚠️ sandbox bloqueado por Twilio #28132027

---

## Schema Supabase (tablas activas)

```sql
-- Perfiles
profiles: id, nombre, apellido, telefono, ciudad, prevision, condicion, plan, preferencias, created_at
-- prevision: TEXT — valores snake_case (fonasa, isapre_*, caja, null)
-- Ley 19.628: consentimiento explícito requerido antes de guardar prevision

-- Chat VIVIAN
chat_messages: id, user_id, role ('user'|'assistant'), content, canal ('web'|'whatsapp'), created_at

-- Artículos
articulos: id, slug, titulo, pilar, resumen, contenido, publicado, created_at
-- ATENCIÓN: columna es "contenido", NO "cuerpo"

-- Agenda
agenda: id, user_id, titulo, tipo, fecha, proveedor, notas, confirmado, created_at

-- Medicamentos
medicamentos: id, user_id, nombre, dosis, horarios (text[]), activo, created_at

-- Tracking de dosis
tomas_medicamento: id, medicamento_id, user_id, fecha (date), horario (text), ingerido (bool), marcado_en (timestamptz)
UNIQUE (medicamento_id, fecha, horario)
RLS: select/insert/update own rows
GRANT ALL TO authenticated

-- Analytics
eventos: id, tipo, user_id, metadata (JSONB), created_at
```

---

## Analytics internos

### `lib/logEvento.ts` — TipoEvento válidos:
- `registro_completado` — primer acceso (<5 min desde created_at)
- `vivian_mensaje` — mensaje enviado a VIVIAN (web o whatsapp)
- `articulo_leido` — artículo leído (30s o 80% scroll)
- `juego_completado` — juego terminado (memoria o sopa_letras)

### Panel `/admin`
Protegido por `ADMIN_EMAILS = ["ariel.bustos79@gmail.com"]`.

---

## Auth flow

1. Email en `/login` o `/registro` → magic link
2. Clic → `/auth/callback?code=xxx` → sesión → `/dashboard?bienvenida=1`
3. Toast verde "🌿 ¡Listo, [nombre]! Ya iniciaste sesión." por 4 segundos

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
- **Auto-deploy:** cada push a `master` → Vercel automático
- **Deploy manual:** `npx vercel --prod` desde `C:\Users\ARIEL\longviva`
- **Dominio:** longvivia.cl + www.longvivia.cl

---

## Estado actual — 22 de julio de 2026

### Construido y en producción ✅
- Landing page completa (servicios activos con links reales: Telemedicina, Ocio, Bienestar, Nutrición + Farmacias "Próximamente")
- Auth magic link con toast de bienvenida
- Dashboard: PerfilSalud (previsión + consentimiento) + ResumenHoy + cards de acceso
- VIVIAN web + WhatsApp (sandbox bloqueado)
- 10 artículos publicados (2 batches)
- Juegos cognitivos: Memoria + Sopa de letras
- Mi agenda — CRUD + export .ics (alarma 1h antes)
- Mis medicamentos — CRUD + export .ics recurrente diario
- Telemedicina `/telemedicina` — router por previsión
- Ocio `/ocio` — VTE Sernatur + Turismo Senior
- Nutrición `/nutricion` — router por previsión
- Bienestar `/bienestar` — artículos curados
- Panel analytics `/admin`
- LongViva SpA constituida (13-07-2026)

### Pendiente de construir / bloqueado
- **Farmacias** — bloqueado, pendiente confirmar modelo afiliación (tipo ChileSalud)
- **Notificaciones push/WhatsApp** — bloqueado por Twilio #28132027
- **Clases en vivo** (bienestar) — mercado fragmentado, sin proveedor definido
- **App React Native** (Expo)

### Pendiente operacional
- Términos y Privacidad — pendiente revisión legal
- SII Inicio de Actividades — pausado campo domicilio/usufructo
- Twilio: salir del sandbox (ticket #28132027 activo)
- Primer aliado B2B — propuesta enviada a Conecta Mayor UC (19-07-2026)
- Registro de marca INAPI — "LongVivIA" denominativa, Clase 42

---

## Principios de desarrollo

1. **Senior-friendly:** fuente mínima 18px, botones grandes, máx. 3 clics para cualquier acción
2. **Mobile first:** diseño responsivo probado en mobile
3. **Analytics no bloqueante:** fire-and-forget (`void promise`)
4. **Contenido de salud:** NUNCA generar estadísticas o citas médicas — solo usar contenido aprobado
5. **Privacidad:** RLS en Supabase, nunca exponer service_role_key al cliente. Campo `prevision` requiere consentimiento explícito (Ley 19.628).
6. **Sin tecnicismos de marca:** respetar vocabulario permitido/prohibido en TODO el copy
7. **Copy de servicios derivados:** nunca prometer gratuidad ni precio que LongVivIA no controla

---

## Sub-proyecto: Parkin&Son / NORITA

Movido a rama `parkinandson-draft` (18 jul 2026). En pausa intencional.
