---
name: frontend-design
description: Convenciones de componentes, CSS y estructura de archivos para Pocketlibros (Next.js 16 + Turbopack)
---

# Skill: frontend-design

Cuando se invoca este skill, revisa el código frontend del proyecto y aplica las siguientes convenciones. Si hay un archivo HTML prototipo activo (index-d.html o similar), portarlo o mejorarlo siguiendo estas reglas.

## Stack
- Next.js 16 con Turbopack (ver AGENTS.md — leer docs en node_modules/next/dist/docs/ antes de escribir código)
- CSS modules o `<style>` scoped por componente — sin Tailwind
- Sin dependencias de UI externas (no Radix, no shadcn) — componentes propios

## Estructura de carpetas
```
app/
  layout.tsx       ← fuente tipográfica, metadata global
  page.tsx         ← landing principal (importa secciones)
  globals.css      ← tokens CSS globales únicamente
components/
  Nav.tsx
  Hero.tsx
  HowItWorks.tsx
  Catalog.tsx
  WhyPocket.tsx
  Footer.tsx
```

## Tokens CSS globales (globals.css)
Siempre definir en :root — nunca hardcodear hex en componentes:
```css
:root {
  --navy:       #0D2B4E;
  --navy-mid:   #1A4070;
  --gold:       #B8952A;
  --gold-light: #F0E6C0;
  --white:      #FFFFFF;
  --text:       #222222;
  --gray-bg:    #F5F5F3;
  --gray-bd:    #E0DDD8;
  --muted:      #666666;
}
```

## Convenciones de componentes
- Cada sección es un componente independiente en `components/`
- Props tipadas con TypeScript interface arriba del componente
- Datos (catálogo, pasos, argumentos) en arrays/objetos separados del JSX — nunca inline
- Sin `useEffect` para cosas que pueden ser estáticas

## CSS por componente
- Usar CSS modules (`.module.css`) al lado del componente
- Clases en camelCase: `.bookCard`, `.heroTitle`
- Sin `!important`
- Mobile first: base = móvil, `@media (min-width: 768px)` para desktop

## Imágenes y assets
- Portadas de libros: componente `BookCover` con CSS puro (fondo navy + título + línea dorada) hasta que existan imágenes reales
- Sin imágenes de stock ni SVG decorativos complejos

## Formulario de email
- Input + button como componente `EmailForm`
- Sin backend real — `onSubmit` previene default y muestra mensaje inline
- No integrar servicios de email hasta que se decida el proveedor

## Al aplicar este skill
1. Revisar si `app/page.tsx` aún tiene el boilerplate de Next.js
2. Si sí: reemplazarlo con la estructura de componentes descrita
3. Crear los componentes faltantes basándose en `public/index-d.html` como referencia visual
4. Extraer tokens a `globals.css`
5. Reportar qué archivos se crearon o modificaron
