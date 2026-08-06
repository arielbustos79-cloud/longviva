# LongVivIA — Contexto del Proyecto para Claude Code

## ESTRUCTURA DE MARCA ⚠️

| | Nombre | Uso |
|---|---|---|
| Empresa legal | LongViva SpA | Contratos, facturas, B2B, AFP/Isapres |
| Plataforma digital | LongVivIA | Web, app, todo lo digital (longvivia.cl) |
| IA conversacional | VIVIAN | "VIVIAN by LongVivIA" — web + WhatsApp |

**Regla:** empresa → LongViva SpA · producto → LongVivIA · IA → VIVIAN

---

## Vocabulario de marca — CRÍTICO

**NUNCA:** envejecimiento, adulto mayor, adultos mayores, tercera edad, vejez, deterioro, declive, dependencia, cuidado (asistencial)

**SIEMPRE:** prime, vitalidad, plenitud, protagonismo, movimiento, libertad, energía, activo/a, presente, potencia

**Taglines:** "Para una vida larga y activa." · "Tu prime, tu plataforma Viva." ("Tu" sin tilde)

---

## VIVIAN — Personalidad

Cálida, paciente, directa — nunca condescendiente · tutea siempre · máx. 3 líneas · sin tecnicismos médicos · termina con acción o pregunta · emojis máx. 1-2. **Modelo:** claude-sonnet-4-6 (Anthropic)

---

## Identidad Visual

```css
--v2:#1B5E3B  --v3:#2D8A5F  --v4:#52B788  --v5:#B7E4C7  --v6:#EAFAF0
--d2:#C9973A  --d3:#F5DFA0  --n2:#1A2E22  --crema:#FAF8F3  --gris:#4A5E52
```
Tipografías: Cormorant Garamond (títulos) / DM Sans (cuerpo)
Logo: `components/OliveBranch.tsx` · Avatar VIVIAN: `components/VivianIcon.tsx`

---

## Stack Tecnológico

```
Frontend:  Next.js 15 (App Router) + TypeScript + CSS Modules
DB:        Supabase (PostgreSQL) + RLS
Auth:      Supabase Auth — magic link OTP (sin contraseña)
IA:        Claude API — claude-sonnet-4-6
WhatsApp:  Twilio Sandbox + webhook /api/whatsapp
Analytics: Tabla "eventos" Supabase (custom, no GA)
Hosting:   Vercel (auto-deploy desde master)
```

---

## Estructura de carpetas

```
app/
├── page.tsx / page.module.css / globals.css / layout.tsx
├── login · registro · dashboard · vivian · agenda · medicamentos
├── articulos/[slug] · juegos/(atencion|memoria|percepcion|ejecucion)
├── telemedicina · bienestar · ocio · nutricion · comunidad · farmacias · afp
├── admin · quienes-somos · terminos · privacidad · trabaja · ayuda · anunciantes
├── auth/callback/route.ts
└── api/(vivian|whatsapp)/route.ts
lib/  supabase-browser/server · vivian-prompt · prevision · comunidad
      external-urls · generarIcs · logEvento
```
Sub-proyecto Parkin&Son/NORITA → rama `parkinandson-draft` (pausa intencional)

---

## Páginas activas

| Rutas | Estado |
|-------|--------|
| `/` · `/login` · `/registro` · `/dashboard` · `/vivian` · `/agenda` · `/medicamentos` | ✅ |
| `/articulos` · `/articulos/[slug]` · `/juegos` (4 juegos) · `/admin` | ✅ |
| `/telemedicina` · `/bienestar` · `/ocio` · `/nutricion` · `/comunidad` · `/farmacias` · `/afp` | ✅ |
| `/quienes-somos` · `/trabaja` · `/ayuda` · `/anunciantes` | ✅ |
| `/terminos` · `/privacidad` | Draft — pendiente revisión legal |

---

## Landing (`/`) — Secciones

1. **Navbar:** logo + links (Quiénes somos · Servicios · VIVIAN IA · Centro de ayuda · Contacto) + Facebook `#1877F2` + Ingresar/Mi panel + hamburguesa mobile
2. **Hero:** tagline + CTA registro
3. **Prime:** 4 cards (Telemedicina, Bienestar activo, Ocio y experiencias, VIVIAN 24/7)
4. **VIVIAN section:** mockup chat + features + CTA
5. **Servicios:** card VIVIAN destacada + 8 cards activas
6. **¿Cómo funciona?:** 3 pasos animados
7. **Marquee** · **CTA final**
8. **Footer:** grid Servicios/Empresa/Ayuda + Facebook + email + copyright separado. "Trabaja aquí" eliminado del footer — `/trabaja` sigue activa.

---

## Dashboard (`/dashboard`)

- **ResumenHoy.tsx:** próxima cita agendada + próximo medicamento
- **Cards:** VIVIAN · Artículos · Juegos · Agenda · Medicamentos · Telemedicina · Bienestar · Ocio · Nutrición · Comunidad · Farmacias · AFP
- **Toast bienvenida** desde `?bienvenida=1`: "🌿 ¡Listo, [nombre]!" — 4s, limpia URL

---

## Agenda y Medicamentos

- **Agenda:** CRUD tabla `agenda` (título, tipo, fecha, proveedor, notas). Tipos "Telemedicina" y "Tour" deshabilitados (reservados).
- **Medicamentos:** CRUD tabla `medicamentos` (nombre, dosis, horarios[]). Inactivable sin borrar historial.
- **Export .ics** (`lib/generarIcs.ts`): citas → evento único con alarma; medicamentos → `FREQ=DAILY` por horario. Snapshot al exportar — cambios posteriores no se sincronizan (aviso visible en UI).

---

## VIVIAN Chat (`/vivian`)

Header VIVIAN · En línea · historial 60 mensajes · micrófono (SpeechRecognition)
Log: `logEvento("vivian_mensaje", { canal: "web" })` �� WhatsApp: HMAC-SHA1 Twilio

**Reglas críticas del prompt (`lib/vivian-prompt.ts`):**
- Consentimiento explícito antes de guardar/derivar/**responder con dato personalizado** de previsión (salud o AFP)
- Nunca decir "ya hablamos de X" si X no aparece literalmente en el historial visible
- Receta retenida/cheque → mostrador físico (sin buscador ni farmacias nombradas)
- WhatsApp/recordatorios: "en desarrollo, sin fecha" — nunca prometer
- URLs: solo del catálogo `lib/external-urls.ts`; si no está → deriva a Google

---

## Artículos

Tabla `articulos`: `slug, titulo, pilar, resumen, contenido, publicado`
Pilares: `salud_activa · bienestar_energia · vida_social · tecnologia_simple · finanzas_prevision`
10 artículos publicados (2/pilar). CHECK constraint activo en DB.
`ArticuloTracker.tsx`: dispara `articulo_leido` tras 30s O 80% scroll, sin duplicados.

---

## Juegos (`/juegos`)

4 juegos cognitivos (categorías Unobrain): Atención · Memoria (Simon) · Percepción · Ejecución (Stroop). Puntaje guardado en Supabase. Commit `87f5de9`.

---

## Analytics

```sql
eventos: id UUID, tipo TEXT, user_id UUID, metadata JSONB, created_at TIMESTAMPTZ
```
`TipoEvento`: `registro_completado` · `vivian_mensaje` · `articulo_leido` · `juego_completado`
`lib/logEvento.ts`: fire-and-forget. Panel `/admin`: `ADMIN_EMAILS = ["ariel.bustos79@gmail.com"]`

---

## Auth flow

`/login` o `/registro` → magic link → `/auth/callback?code=xxx` → sesión → `/dashboard?bienvenida=1`
Email Supabase incluye texto de tranquilidad antes del aviso legal.

---

## Schema Supabase

```
profiles:      id, nombre, apellido, telefono, ciudad, prevision, prevision_afp, condicion, plan, preferencias
chat_messages: id, user_id, role ('user'|'assistant'), content, canal ('web'|'whatsapp'), created_at
articulos:     id, slug, titulo, pilar, resumen, contenido, publicado
agenda:        id, user_id, titulo, tipo, fecha, proveedor, notas, confirmado
medicamentos:  id, user_id, nombre, dosis, horarios[], activo
eventos:       id, tipo, user_id, metadata JSONB, created_at
```
RLS activo en todas las tablas. `prevision_afp` con consentimiento explícito via UI.

---

## Variables de entorno

```bash
ANTHROPIC_API_KEY · NEXT_PUBLIC_SUPABASE_URL · NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY · TWILIO_ACCOUNT_SID · TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_NUMBER=+14155238886 · NEXT_PUBLIC_APP_URL=https://longvivia.cl
```

---

## Deploy

- Repo: `github.com/arielbustos79-cloud/longviva` (master) · Vercel: proyecto `longviva` / cuenta `arielteta9`
- Auto-deploy en cada push a master · Manual: `npx vercel --prod`
- Dominio: longvivia.cl + www.longvivia.cl
- **Regla:** verificar `git status` + "up to date with origin/master" antes de reportar sesión como desplegada (incidente 31-07-2026: 4 commits locales nunca pusheados)

---

## Modelo de negocio

Gratuito para usuarios. Financiado con publicidad segmentada + comisión por derivación a proveedores.
Instituciones (AFP/Isapre/Caja/Conecta Mayor UC) = canal de distribución gratuita, no fuente de ingresos.

---

## Pilares de derivación (7)

| Pilar | Ruta | Detalle |
|-------|------|---------|
| Telemedicina | `/telemedicina` | Matriz por isapre en `lib/prevision.ts` |
| Bienestar activo | `/bienestar` | 7 videos curados (Yoga silla ×2, Tai Chi ×2, Musculatura ×3) |
| Ocio y experiencias | `/ocio` | BPDigital, Chile Cultura, radios, agencias viaje, Studio 54 (Viña del Mar) |
| Nutrición | `/nutricion` | 8 videos + 3 fuentes escritas (Mayo Clinic ×2, MedlinePlus ×1) |
| Comunidad | `/comunidad` | 35 comunas Gran Santiago; 5 solo con contacto directo (sin página dedicada) |
| Farmacias | `/farmacias` | 8 farmacias modelo CPC; nota legal pendiente (abogada) |
| AFP/Previsión | `/afp` | Deriva al sitio oficial; nunca recomienda fondos ni montos |

**Telemedicina — matriz isapres** (`lib/prevision.ts`):
Cruz Blanca → IntegraMédica + Mediclic · Banmédica/Vida Tres → IntegraMédica · Consalud → Click Doctor · Colmena → Doctor Online + Mediclic · Nueva MasVida → propia + Mediclic · Esencial → TeleUrgencia + IntegraMédica + RedSalud

**Farmacias (8):** Salcobrand · Cruz Verde · Ahumada · Dr. Simi · Farmex · Meki · El Químico · Fracción
ISP/ANAMED: `registrosanitario.ispch.gob.cl` (en prompt VIVIAN, no expuesto en UI aún)

**Comunidad (35 comunas):** 23 DEDICADA · 6 TAG · 5 PORTADA · 1 DIDECO. Alertas de mantención: La Granja (URL dedicada da 404, usa TAG), La Pintana (URL dinámica WordPress).

---

## Facebook como canal principal (01-08-2026)

WhatsApp pausado (costo sin estrategia de lanzamiento). Facebook = canal principal.
URL: `https://www.facebook.com/profile.php?id=61591994294647` — verificada.
Navbar: ícono 36px desktop / 40px mobile, azul `#1877F2`. Footer: ícono + email en fila.
VIVIAN responde con link real ante "¿tienen Facebook?".
Checklist al agregar URL/canal: actualizar `lib/vivian-prompt.ts` + `lib/external-urls.ts`.

---

## URLs externas (`lib/external-urls.ts`)

Catálogo fijo — 33+ URLs verificadas con petición HTTP real (`scripts/verify-urls.mjs`).
VIVIAN usa solo URLs de este catálogo. Si el proveedor no está → admite que no tiene el dato y deriva a Google.
Correr `verify-urls.mjs` antes de cada push que modifique el catálogo.

---

## Auditoría de seguridad — cerrada jul-2026

| Punto | Estado |
|-------|--------|
| RLS todas las tablas | ✅ `articulos` habilitado con `ALTER TABLE ENABLE ROW LEVEL SECURITY` |
| Rate limiting `/api/vivian` | ✅ 20 req/min por user_id, fallback IP — commit `c7a8cc4` |
| Rate limiting `/api/whatsapp` | ✅ 10 req/min por teléfono — commit `c7a8cc4` |
| IDOR `/api/vivian` | ✅ userId de `auth.getUser()` (cookies SSR), no del body |
| Headers de seguridad | ✅ X-Frame, X-Content-Type, Referrer, Permissions — commit `c7a8cc4` |
| XSS | ✅ No existe `dangerouslySetInnerHTML` |
| Panel `/admin` | ✅ Validación server-side en Server Component |
| `npm audit` | ⚠️ 5 high en `next@16.2.7` — fix: actualizar a `next@16.2.11` (no urgente) |
| RLS `profiles` WITH CHECK | ⚠️ Pendiente confirmación visual de Ariel en Supabase → Policies → `profiles` |

---

## Auditoría WCAG — landing (05-08-2026)

### Fixes aplicados

| ID | Fix | Commit |
|----|-----|--------|
| `--gris` | `globals.css` → `#4A5E52` (6.9:1, pasa AA); eliminado valor `#7A8A82` | `0f04f16` |
| W1 `<main>` | `<main id="contenido-principal">` envuelve hero→CTA | `0f04f16` |
| W2 Skip link | `<a href="#contenido-principal">` antes del nav, visible con foco | `0f04f16` |
| W3 Marquee pausa | Botón 44×44px, `aria-pressed`, estado inicial respeta `prefers-reduced-motion` | `0f04f16` |
| W4 `prefers-reduced-motion` | Media query cubre blobs, word reveal, chat animado, marquee, scroll reveals | `0f04f16` |
| W5 Logo `href` | `href="#"` → `href="/"` en nav y footer | `0f04f16` |
| U1 a11yBar mobile | A/A+/A++ duplicados en panel mobile (a11yBar oculta en `<960px`) | `b62f241` |
| U2 Focus trap | `hamburgerRef`, `useEffect` foco, `onKeyDown` (Tab loop + Escape), `aria-expanded` | `b62f241` |
| U4 Footer touch targets | `.footerLinks a`: `min-height:44px; display:flex` (era `padding:2px`, ~20px) | `b62f241` |
| U5 Logo aria-hidden | `aria-hidden="true"` en SVGs decorativas nav + footer | `b62f241` |
| U6 `zoom` CSS | Deuda técnica aceptada — Firefox 126+ soporta `zoom` (mayo 2024) | — |

### Backlog WCAG (sin urgencia)
- OG meta tags (Facebook preview vacío al compartir)
- `min-height: 100vh` → `100svh` en hero (iOS Safari)
- `"use client"` en todo el landing (oportunidad Server Components)
- JSON-LD Organization schema

---

## Hallazgos VIVIAN — historial

| ID | Hallazgo | Fix | Commit |
|----|----------|-----|--------|
| H1 | Regresión consentimiento: respondía con dato personalizado sin preguntar | Tres prohibiciones explícitas: guardar/derivar/responder + ejemplo Colmena | `a587dad` |
| H2 | Alucinación: "Ya hablamos de X" sin historial real | Prohibición literal de esas frases | `fa39892` |
| H3 | Buscador ofrecido para sustancias controladas (Morfina) | Distinción receta-simple vs receta-retenida | `cb971c2` |
| H4 | Nomenclatura obsoleta "Farmacias comunitarias" post-pivote CPC | Corregido en bloque TU PANEL del prompt | `e46b78b` |

**Patrón meta (H1-H4):** una regla correcta en el prompt no garantiza que el modelo la siga. Requiere prueba conversacional real, idealmente bajo presión. Verificar que el texto de la regla existe no es suficiente.

---

## Otros hallazgos cerrados (copy/contenido)

- **WhatsApp FAQ falsa** (`app/ayuda/page.tsx`): prometía funcionalidad inexistente → corregida commit `083faf9`
- **URLs fabricadas por VIVIAN**: catálogo fijo `lib/external-urls.ts` desde commit `8ed6d7c` resuelve
- **Vocabulario prohibido en copy**: "adulto mayor" se coló en commit `2c3c346` → corregido `2c3c346`. Checklist: verificar lista de términos antes de commitear copy.
- **Radios**: `radiobeethoven.cl` → `beethovenfm.cl` · `radio.t13.cl` → `t13.cl/en-vivo`
- **Isapre Cruz del Norte**: cerrada (solo SQM) → usuarios migrados a "sin previsión"

---

## Pendientes operacionales

- **Legal:** Términos y Privacidad (Ley 19.628, B2B, publicidad) · SII Inicio de Actividades (pausado, domicilio/usufructo) · INAPI "LongVivIA" Clase 42 (checklist listo)
- **Infra:** Twilio Sandbox → producción (ticket #28132027, pendiente Meta Business Manager)
- **Comercial:** Conecta Mayor UC (propuesta enviada 19-07-2026, sin respuesta)
- **PWA:** ícono del launcher no coincide con logo real (pendiente asset del manifest)
- **Farmacias:** nota legal pendiente confirmación de abogada

---

## Principios de desarrollo

1. **Senior-friendly:** fuente mín. 18px, botones grandes (min 44px), máx. 3 clics
2. **Mobile first:** responsive probado en mobile
3. **Analytics no bloqueante:** fire-and-forget (`void promise`)
4. **Contenido de salud:** NUNCA generar estadísticas o citas médicas sin aprobación manual
5. **Privacidad:** RLS en Supabase, nunca exponer `service_role_key` al cliente
6. **Vocabulario:** respetar lista permitido/prohibido en TODO el copy antes de commitear
