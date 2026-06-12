# LongVivIA — Contexto del Proyecto para Claude Code

## ESTRUCTURA DE MARCA — LEER PRIMERO ⚠️

Existen DOS entidades distintas en este proyecto. No confundirlas:

```
LONGVIVA SpA
→ Razón social legal de la empresa
→ Dominio: longviva.cl (registrado en NIC Chile)
→ Usada en contratos, facturas, documentos legales
→ Relación con AFP, Isapres, aliados B2B
→ Es la empresa/holding

LONGVIVIA (LongVivIA)
→ Nombre de la plataforma digital
→ Dominio: longvivia.cl (registrado en NIC Chile)
→ La web, la app y todo lo digital
→ Contiene a VIVIAN, la IA conversacional
→ Es el producto

VIVIAN
→ La IA conversacional dentro de LongVivIA
→ "VIVIAN by LongVivIA"
→ Disponible en web, app y WhatsApp
→ No es una app separada — es una feature central
```

**Regla simple:**
- Hablas de la empresa → LongViva SpA
- Hablas del producto digital → LongVivIA
- Hablas de la IA → VIVIAN

---

## Qué es LongVivIA

LongVivIA es una plataforma digital **100% gratuita** de salud, bienestar y experiencias para personas en su prime (+60 años) en Chile. Se financia con publicidad segmentada y alianzas B2B (AFP, Isapres, Cajas de Compensación, farmacias, clínicas).

**Tagline:** Para una vida larga y activa.
**Misión:** Ser la plataforma digital que convierte los años de experiencia y libertad en la etapa más activa, conectada y plena de la vida.

---

## VIVIAN — La IA del proyecto

VIVIAN es la asistente IA conversacional de LongVivIA. Nombre elegido por ser cálido, femenino, fácil de pronunciar en español y sin conflictos de marca en Chile.

**Personalidad de VIVIAN:**
- Cálida, paciente, directa
- Nunca usa tecnicismos
- Habla de tú, nunca de usted
- Máximo 3 líneas por respuesta
- Siempre ofrece una acción concreta al final
- JAMÁS usa: "envejecimiento", "vejez", "adulto mayor", "tercera edad"
- El usuario está en su prime — háblale desde la vitalidad y la acción

**Modelo IA:** claude-sonnet-4-6 (Anthropic)

---

## Vocabulario de marca — CRÍTICO

### NUNCA usar estas palabras:
- envejecimiento
- adulto mayor / adultos mayores
- tercera edad
- vejez
- calidad de vida (en contexto de limitación)
- dependencia
- cuidado (en contexto asistencial)

### SIEMPRE usar estas palabras:
- prime
- vitalidad
- plenitud
- protagonismo
- movimiento
- libertad
- energía
- activo / activa
- presente
- potencia

---

## Identidad Visual

**Colores:**
```css
--v1: #0F3D24  /* verde muy oscuro */
--v2: #1B5E3B  /* verde principal */
--v3: #2D8A5F  /* verde medio */
--v4: #52B788  /* verde claro */
--v5: #B7E4C7  /* verde suave */
--v6: #EAFAF0  /* verde muy suave / fondos */
--d2: #C9973A  /* dorado principal */
--d3: #F5DFA0  /* dorado claro */
--d4: #FDF8ED  /* dorado muy suave */
--n1: #0A150D  /* negro verdoso */
--n2: #1A2E22  /* texto principal */
--crema: #FAF8F3
--gris: #7A8A82
```

**Tipografías:**
- Títulos: Cormorant Garamond (serif, elegante)
- Cuerpo: DM Sans (sans-serif, legible)
- Código: JetBrains Mono

**Logo:** Rama de olivo SVG con hojas elípticas y 3 aceitunas doradas.
El SVG del logo está en `components/Logo.tsx`.

**Símbolo de VIVIAN:** Rama de olivo sobre fondo verde (#1B5E3B) con aceitunas doradas (#F5DFA0). Usado como avatar en el chat.

---

## Stack Tecnológico

```
Frontend Web:     Next.js 15 (App Router)
App Móvil:        React Native + Expo
Base de datos:    Supabase (PostgreSQL)
Autenticación:    Supabase Auth (magic link — sin contraseña)
IA VIVIAN:        Claude API — anthropic SDK
WhatsApp:         Twilio API
Telemedicina:     Whereby API (embed)
Hosting:          Vercel
Push:             Firebase FCM
Pagos (futuro):   Transbank Webpay
```

---

## Estructura de carpetas esperada

```
longvivia/
├── .claude/
│   └── CLAUDE.md          ← Este archivo
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── registro/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── vivian/        ← Chat VIVIAN
│   │   ├── agenda/
│   │   ├── salud/
│   │   ├── servicios/
│   │   └── comunidad/
│   ├── api/
│   │   ├── vivian/        ← Claude API endpoint
│   │   ├── whatsapp/      ← Twilio webhook
│   │   └── agenda/
│   ├── layout.tsx
│   └── page.tsx           ← Landing page
├── components/
│   ├── Logo.tsx           ← SVG olivo
│   ├── VivianChat.tsx     ← Componente chat
│   ├── VivianAvatar.tsx   ← Avatar olivo
│   └── ui/
├── lib/
│   ├── supabase.ts        ← Cliente Supabase
│   ├── anthropic.ts       ← Cliente Claude API
│   └── vivian-prompt.ts   ← System prompt VIVIAN
├── types/
│   └── database.ts        ← Tipos Supabase
└── public/
    └── logo.svg
```

---

## Variables de entorno (.env.local)

```bash
# Anthropic — Claude API (VIVIAN)
ANTHROPIC_API_KEY=sk-ant-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Twilio (WhatsApp)
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=+14155238886

# Whereby (Telemedicina)
WHEREBY_API_KEY=xxx

# App
NEXT_PUBLIC_APP_URL=https://longvivia.cl
```

---

## Schema de base de datos (Supabase)

```sql
-- Perfiles de usuario
CREATE TABLE profiles (
  id          UUID REFERENCES auth.users ON DELETE CASCADE,
  nombre      TEXT,
  apellido    TEXT,
  telefono    TEXT,
  ciudad      TEXT,
  prevision   TEXT,
  condicion   TEXT,
  plan        TEXT DEFAULT 'basico',
  preferencias JSONB DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- Historial VIVIAN
CREATE TABLE chat_messages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role        TEXT CHECK (role IN ('user', 'assistant')),
  content     TEXT,
  canal       TEXT DEFAULT 'web', -- 'web' | 'app' | 'whatsapp'
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Agenda
CREATE TABLE agenda (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  titulo      TEXT,
  tipo        TEXT, -- 'telemedicina' | 'clase' | 'tour' | 'medicamento'
  fecha       TIMESTAMPTZ,
  proveedor   TEXT,
  notas       TEXT,
  confirmado  BOOLEAN DEFAULT FALSE
);

-- Medicamentos
CREATE TABLE medicamentos (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  nombre      TEXT,
  dosis       TEXT,
  horarios    TEXT[], -- ['08:00', '20:00']
  activo      BOOLEAN DEFAULT TRUE
);

-- Lista de espera (Fase 0)
CREATE TABLE waitlist (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  nombre      TEXT,
  ciudad      TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

---

## System Prompt de VIVIAN

```typescript
// lib/vivian-prompt.ts

export const VIVIAN_SYSTEM_PROMPT = `
Eres VIVIAN, la asistente personal de LongVivIA.

PERSONALIDAD:
- Cálida, directa y con sentido del humor sutil
- Paciente pero no condescendiente
- Hablas de tú, nunca de usted
- Eres energética y optimista — nunca melancólica
- Celebras los logros del usuario genuinamente

ESTILO DE RESPUESTA:
- Máximo 3 líneas por respuesta
- Sin tecnicismos médicos — usa lenguaje simple
- Siempre termina con una acción concreta o pregunta
- Usa emojis con moderación (máx. 1-2 por mensaje)
- Nunca uses listas largas — responde en prosa

VOCABULARIO PROHIBIDO:
- envejecimiento, vejez, tercera edad
- adulto mayor, personas mayores
- deterioro, declive, limitación
- cuidado (en contexto asistencial)

VOCABULARIO PREFERIDO:
- prime, vitalidad, energía, plenitud
- activo/a, libre, protagonista
- movimiento, experiencia, sabiduría

CAPACIDADES:
1. Salud: responde preguntas generales, recuerda
   medicamentos, agenda citas médicas
2. Bienestar: sugiere clases, motiva metas
3. Ocio: recomienda tours y actividades
4. Comunidad: conecta con grupos y personas
5. Compañía: conversa con calidez real

LÍMITES:
- No diagnosticas enfermedades
- No reemplazas al médico
- Si detectas urgencia médica, deriva inmediatamente
- No compartes información personal entre usuarios

Recuerda: el usuario está en el mejor momento
de su vida. Tu trabajo es ayudarle a vivirlo.
`
```

---

## API de VIVIAN — Código de referencia

```typescript
// app/api/vivian/route.ts

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { VIVIAN_SYSTEM_PROMPT } from '@/lib/vivian-prompt'

const anthropic = new Anthropic()
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const { message, userId } = await request.json()

  // Cargar últimos 10 mensajes del usuario
  const { data: history } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
    .limit(10)

  // Llamar a VIVIAN (Claude API)
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    system: VIVIAN_SYSTEM_PROMPT,
    messages: [
      ...(history || []),
      { role: 'user', content: message }
    ]
  })

  const reply = response.content[0].type === 'text'
    ? response.content[0].text
    : ''

  // Guardar en historial
  await supabase.from('chat_messages').insert([
    { user_id: userId, role: 'user', content: message, canal: 'web' },
    { user_id: userId, role: 'assistant', content: reply, canal: 'web' }
  ])

  return Response.json({ reply })
}
```

---

## Modelos de negocio

**Monetización:**
1. Publicidad segmentada (máx. 2 avisos/sesión, no intrusiva)
2. Alianzas B2B: AFP, Isapres, Cajas de Compensación, farmacias, clínicas

**Aliados prioritarios:**
- AFP (Habitat, Provida, Capital, Cuprum): $300-500 CLP/afiliado activo/mes
- Cajas de Compensación (Los Andes, Los Héroes): $1.500-3.000 CLP/afiliado/mes
- Isapres/FONASA: $2.000-5.000 CLP/usuario derivado/mes
- Farmacias: 8-12% comisión por venta derivada

---

## Fase actual del proyecto

**Fase 0 (activa):** Lista de espera
- Landing page online en longvivia.cl
- Formulario de captura de emails (Tally.so)
- Meta: 500 registros en 60 días

**Fase 1 (próxima):** MVP funcional — 10 semanas
- Web Next.js funcional con auth
- VIVIAN operativa vía web y WhatsApp
- App React Native publicada en Play Store
- 100 usuarios beta activos

**Fase 2:** Escala
- Primer aliado B2B firmado
- 3.000 usuarios activos
- Activar modelo de publicidad

---

## Prototipos HTML disponibles

Los siguientes archivos HTML existen como referencia de diseño.
El desarrollador los convierte en componentes Next.js reales:

- `longvivia-landing.html` → `app/page.tsx`
- `longvivia-registro.html` → `app/(auth)/registro/page.tsx`
- `longvivia-dashboard.html` → `app/(dashboard)/dashboard/page.tsx`
- `longvivia-vivian-app.html` → `app/(dashboard)/vivian/page.tsx`
- `longvivia-vivian-social.html` → `app/(dashboard)/comunidad/page.tsx`

---

## Principios de desarrollo

1. **Senior-friendly primero:** fuente mínima 18px, botones grandes, máx. 3 clics para cualquier acción
2. **Accesibilidad:** alto contraste, etiquetas ARIA, soporte de voz
3. **Mobile first:** el 80% de usuarios usará la app móvil
4. **Performance:** Lighthouse score >90 en todas las páginas
5. **Privacidad:** RLS en Supabase, nunca exponer service_role_key al cliente

---

## Contacto y marca

- Web: longvivia.cl
- Email: hola@longvivia.cl
- Teléfono: 600 LongVivIA
- Redes: Facebook (canal principal segmento prime)
- Marca registrada: INAPI Chile — Clase 42 y 44

---

## Taglines oficiales — LongVivIA

**Tagline principal** (bajo el logo, siempre):
> Para una vida larga y activa.

**Tagline de campaña** (hero web, publicidad, pitch):
> Tu prime, tu plataforma Viva.

Nota ortográfica crítica:
- "Tu" SIN tilde = pronombre posesivo (correcto en taglines)
- "Tú" CON tilde = pronombre personal (incorrecto en este contexto)

---

## Estado actual del proyecto — Junio 2026

### Fase 0 — Completada ✅
- Dominios registrados: longviva.cl y longvivia.cl
- VIVIAN funcionando en WhatsApp vía Twilio + Make.com
- Experimento de validación activo con 5 usuarios reales
- Taglines oficiales definidos y protegidos

### Infraestructura activa
- Twilio WhatsApp Sandbox: +14155238886 (join individual-pocket)
- Make.com: flujo Webhook → Claude API → Twilio
- Claude API: claude-sonnet-4-6 activo con créditos
- Dominios: longviva.cl y longvivia.cl registrados en NIC Chile

### Pendiente para Fase 1
- Memoria de conversación con Google Sheets en Make.com
- Constituir LongViva SpA en RES (Registro de Empresas)
- Registrar marca LongVivIA en INAPI (Clases 42 y 44)
- Deploy landing en Vercel conectada a longvivia.cl
- MVP Next.js funcional
- App React Native publicada en Google Play

### Decisiones de marca tomadas
- Empresa legal: LongViva SpA
- Plataforma digital: LongVivIA
- IA conversacional: VIVIAN by LongVivIA
- Tagline principal: Para una vida larga y activa.
- Tagline campaña: Tu prime, tu plataforma Viva.
- Dominio principal: longvivia.cl
- Logo: Rama de olivo SVG con hojas elípticas y 3 aceitunas doradas

### Vocabulario CRÍTICO — nunca usar:
envejecimiento, vejez, adulto mayor, adultos mayores,
tercera edad, deterioro, declive, dependencia

### Vocabulario SIEMPRE usar:
prime, vitalidad, plenitud, protagonismo, movimiento,
libertad, energía, activo/a, presente, potencia

### Experimento de validación WhatsApp
- 5 usuarios reales probando VIVIAN
- Métricas: activación, engagement, retención D+1, NPS
- Meta mínima: 4/5 activan, 2/5 retornan, NPS >7
- Pendiente: implementar memoria con Google Sheets

### Próxima acción inmediata en Claude Code
1. Crear proyecto Next.js 15 con App Router
2. Configurar Supabase con el schema definido
3. Convertir longvivia-landing.html → app/page.tsx
4. Implementar auth magic link
5. Crear ruta /api/vivian con el código de referencia
