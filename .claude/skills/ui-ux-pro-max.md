---
name: ui-ux-pro-max
description: Sistema de diseño visual de Pocketlibros — paleta, tipografía, patrones de layout y checklist de revisión UX
---

# Skill: ui-ux-pro-max

Cuando se invoca este skill, audita el landing activo (index-d.html o los componentes Next.js) contra las reglas de diseño de Pocketlibros y aplica las correcciones necesarias.

## Identidad visual
- **Estética de referencia**: Harvard Business Review — ejecutivo, limpio, sin exceso de decoración
- **No debe parecer**: Buscalibre.cl, plantilla WordPress de librería, colores saturados o diseño marketero barato

## Paleta
| Token       | Hex       | Uso |
|-------------|-----------|-----|
| --navy      | #0D2B4E   | Fondos hero, cubiertas de libros, texto de énfasis |
| --navy-mid  | #1A4070   | Hover states, variaciones de fondo oscuro |
| --gold      | #B8952A   | Acento principal, labels, líneas decorativas, texto en cursiva del hero |
| --gold-light| #F0E6C0   | Hover del botón blanco, fondos muy sutiles |
| --white     | #FFFFFF   | Secciones de contenido |
| --gray-bg   | #F5F5F3   | Secciones alternas (cómo funciona, por qué pocket) |
| --gray-bd   | #E0DDD8   | Bordes de tarjetas, divisores |
| --text      | #222222   | Cuerpo de texto |
| --muted     | #666666   | Texto secundario, descripciones |

**Regla de color**: el dorado es el único color de acento — no agregar verdes, rojos, azules adicionales. Si algo necesita énfasis, usar --navy o --gold.

## Tipografía
- **Display / Títulos**: Georgia, serif — `font-weight: normal` siempre (nunca bold en Georgia)
- **Cuerpo / UI**: Arial, system-ui — para párrafos, labels, botones
- **Escala**:
  - Hero h1: clamp(2.8rem, 5.5vw, 4.6rem)
  - Section title: clamp(1.4rem, 3vw, 1.9rem)
  - Step/card title: 1.05rem – 1.1rem
  - Labels uppercase: 0.68rem – 0.72rem, letter-spacing: 0.18em – 0.22em
  - Body: 0.88rem – 1rem
  - Captions/notas: 0.7rem – 0.75rem

## Layout
- **Mobile first**: base = 375px, breakpoint principal = 768px
- **Ancho máximo de contenido**: 960px – 1060px centrado con `margin: 0 auto`
- **Secciones alternas**: blanco / gris cálido (#F5F5F3) — nunca dos secciones del mismo color juntas (excepto hero)
- **Espaciado de secciones**: padding 5.5rem vertical desktop, 3.5rem mobile
- **Grid del catálogo**: `auto-fill, minmax(195px, 1fr)` → máx 4 col desktop, 2 col mobile

## Patrones de componentes correctos

### Hero
- Fondo navy full-screen (min-height: 100vh)
- Línea dorada de 3px en top
- Tipografía grande, "Sin relleno." en --gold con `<em>`
- Panel de formulario con borde `rgba(255,255,255,.15)` — sin fondo sólido
- Botón del form: fondo blanco, texto navy, hover → --gold-light
- Texto decorativo "PL" en opacity 0.025 (no visible, solo textural)

### Secciones de contenido
- Label uppercase dorado → título Georgia → contenido
- Pasos: números grandes Georgia en #D6D3CE (gris muy claro), sin negritas
- Tarjetas: borde 1px --gray-bd, hover cambia borde a --gold
- Botón "Obtener": borde 1px navy, texto navy, hover fondo navy / texto blanco

### Nav
- Transparente sobre hero, sticky
- Se vuelve blanco con borde al hacer scroll (clase `.scrolled`)
- Logo y links blancos en hero, navy/texto en scrolled

## Checklist de revisión UX (aplicar al invocar el skill)

### Contenido
- [ ] Todos los 8 libros del catálogo presentes con categoría correcta
- [ ] Precio USD 8 visible en todas las tarjetas
- [ ] Texto legal en footer: "Contenido educativo. No constituye asesoría financiera ni profesional."
- [ ] CTA del hero funciona (previene submit, no rompe)

### Visual
- [ ] Ninguna sección con fondo blanco seguida de otra blanca
- [ ] Georgia nunca en bold (font-weight: normal siempre)
- [ ] Dorado usado con restricción — no más de 3 elementos dorados por sección
- [ ] Labels uppercase con letter-spacing adecuado (mínimo 0.14em)
- [ ] Línea dorada de 3px visible en el top del hero

### Mobile (375px)
- [ ] Nav colapsa correctamente (logo visible, links accesibles)
- [ ] Hero en columna única, panel de formulario abajo del copy
- [ ] Catálogo en 2 columnas
- [ ] Pasos en columna única
- [ ] Formulario del hero apilado verticalmente
- [ ] Footer links en wrap centrado

### Performance / código
- [ ] Sin dependencias externas de fuentes (Georgia es system font)
- [ ] Sin imágenes que puedan fallar (portadas 100% CSS)
- [ ] Scroll behavior smooth en html
- [ ] Nav scroll handler con `{ passive: true }`

## Al aplicar este skill
1. Leer el archivo de landing activo (index-d.html o componentes Next.js)
2. Ejecutar el checklist completo
3. Listar qué ítems fallan
4. Aplicar correcciones una por una
5. Reportar resumen de cambios aplicados
