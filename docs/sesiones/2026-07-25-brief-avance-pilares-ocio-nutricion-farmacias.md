# Brief — Avance pilares: Ocio, Nutrición, Farmacias
**24-07-2026** · Ejecutado 25-07-2026

## Cambios aplicados

| Item | Estado | Detalle |
|---|---|---|
| Dashboard saludo | ✅ | "Buenos días," → "Hola," |
| Gastronomía en `/ocio` | ✅ | Nueva sección: 800.cl (curada) + TripAdvisor (complemento) |
| Sala Portugal | ✅ SQL listo | `scripts/sala-portugal-insert.sql` — ejecutar en Supabase. `salaportugal.cl` confirmado OK. |
| Farmacias comunitarias | ✅ Estructura | `lib/farmacias.ts` + `app/farmacias/page.tsx` + `scripts/farmacias-comunitarias.sql` |
| Farmacias en dashboard/landing | ✅ | `activo: true`, `href: "/farmacias"` — ya visible en producción |
| Videos Nutrición | ⏳ Pendiente aprobación | Lista de candidatos abajo — NO publicar sin OK de Ariel |

## Pendientes antes de considerar cerrado

### SQL a ejecutar en Supabase
1. `scripts/farmacias-comunitarias.sql` — crea la tabla (para futura migración de datos a DB; hoy los datos están en `lib/farmacias.ts`)
2. `scripts/sala-portugal-insert.sql` — agrega Sala Portugal a `eventos_ocio`

### Datos de farmacias comunitarias — verificación pendiente
Los datos de `lib/farmacias.ts` tienen placeholders con ⚠ para cada comuna — confirmar dirección, horario y requisitos directamente en el sitio de cada municipio antes de considerar producción:
- Santiago → munistgo.cl
- Providencia → providencia.cl
- Ñuñoa → nunoa.cl
- Las Condes → lascondes.cl (confirmar si tiene farmacia popular propia)
- San Miguel → sanmiguel.cl
- Quinta Normal → quintanormal.cl

### Videos de Nutrición — candidatos para aprobación de Ariel

Subtema: **Alimentación general en el prime**
1. Mayo Clinic — "Eating Healthy at Any Age" (canal oficial Mayo Clinic en YouTube, subtitulado)
2. Clínica Las Condes — contenido de nutrición para adulto mayor (canal YouTube oficial)
3. Hospital Clínico UC — serie nutrición saludable (canal YouTube oficial)

Subtema: **Hidratación**
1. MINSAL Chile — campaña hidratación en adultos mayores (si existe en canal oficial)
2. FAO — guías de alimentación saludable para mayores (canal oficial)
3. Pendiente identificar tercera opción con fuente certificada en español

Subtema: **Alimentación y medicamentos / interacciones básicas**
1. Pendiente — solo fuente oficial (médico o institución certificada), ningún canal de divulgación sin validación profesional

> ⚠ Ninguno de estos videos se publica hasta que Ariel apruebe uno por uno. Misma regla que Bienestar activo.

## Nutrición — fuentes de artículos (no videos)
Dos opciones evaluadas para sección de contenido educativo:
- **Mayo Clinic en español** (`newsnetwork.mayoclinic.org/es`) — más reconocida por público general
- **MedlinePlus** (`medlineplus.gov`) — gubernamental EEUU, sin fines comerciales, sección nutrición para mayores

Recomendación: usar MedlinePlus como fuente principal (sin vínculo comercial) + Mayo Clinic como complemento. Pendiente implementar esta sección en `/nutricion`.
