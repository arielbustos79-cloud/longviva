# Traspaso — Matriz de Telemedicina por Isapre
**Generado 24-07-2026**

> Continuación directa del fix de URLs inventadas de VIVIAN (misma sesión). Este traspaso trae el insumo de datos que le faltaba al fix para el pilar Telemedicina.

---

## Por qué esto es continuación, no un tema nuevo

El fix de URLs inventadas de VIVIAN (`isaprecedblanca.cl` para Cruz Blanca, `municipalidaddenunoa.cl` para Ñuñoa) exige una lista fija de URLs verificadas para que VIVIAN deje de generar links de memoria. Ese trabajo ya está en curso.

Este brief resuelve qué va exactamente en esa lista fija para el pilar Telemedicina — no es un tema aparte, es el insumo de datos que le faltaba al fix de URLs para el caso específico de isapres.

---

## Bug activo — prioridad más alta

El selector de previsión (`profiles.prevision`) tenía **"Cruz del Norte"** en la lista de isapres — pero Cruz del Norte es una isapre cerrada, exclusiva de trabajadores SQM. No debería estar en un selector público.

Faltaba **"Esencial"** (isapre abierta real, ligada a Clínica Alemana).

**Fix:** reemplazar Cruz del Norte por Esencial en el selector.
**Estado:** ✅ Aplicado en commit `3286377` (24-07-2026). Supabase confirmó 0 usuarios con `isapre_cruz_del_norte` — sin migración de datos.

---

## Matriz de proveedores por isapre

### Alta confianza — confirmado en fuente oficial directa

| Isapre | Proveedor(es) | Nota |
|---|---|---|
| Cruz Blanca | IntegraMédica | Confirmado en `integramedica.cl/videoconsulta-bono-cruzblanca` |
| Cruz Blanca | Mediclic | Portal marca blanca `cruzblanca.mediclic.cl` (Mi Cruz Blanca) |
| Cruz Blanca | Teledoc | Accesible desde `sitio.cruzblanca.cl/MiCruzBlanca` |
| Banmédica | IntegraMédica | Confirmado en fuente oficial IntegraMédica |
| Vida Tres | IntegraMédica | Confirmado en fuente oficial IntegraMédica (UnitedHealth group) |

Cruz Blanca tiene tres opciones en paralelo — no es proveedor único.

### Sin confirmar — contradicciones entre fuentes

No adivinar. Verificar directo en la web oficial de cada isapre antes de fijar en código.

| Isapre | Fuentes encontradas | Contradicción |
|---|---|---|
| Consalud | "Clinitel" vs "Click Doctor" | Ninguna confirmada en web oficial Consalud |
| Colmena | "Docdoc + RedSalud" vs "Doctor Online" | Ninguna confirmada en web oficial Colmena |
| Nueva MasVida | Sin datos | Sin verificar |
| Esencial | Sin datos | Sin verificar |

### Isapres cerradas — no van en selector público

| Isapre | Empresa propietaria | Estado 2026 |
|---|---|---|
| Isalud | Codelco | Activa, solo empleados Codelco |
| Fundación | BancoEstado | Activa, solo empleados BancoEstado |
| Cruz del Norte | SQM | Activa, solo empleados SQM |

---

## Qué quedó pendiente de este brief

- [ ] Verificar proveedores de Consalud, Colmena, Nueva MasVida y Esencial directo en web oficial de cada isapre antes de fijar en el router
- [ ] Tercera ronda de verificación del catálogo `lib/external-urls.ts` — 11 URLs con FETCH_ERR en sandbox pendientes de confirmación manual en browser

---

## Estado de implementación al cierre

| Item | Commit | Estado |
|---|---|---|
| Cruz del Norte → Esencial en selector | `3286377` | ✅ |
| Router telemedicina con matriz verificada | `3286377` | ✅ (Alta confianza aplicada; sin confirmar → lista genérica con disclaimer) |
| AFP Uno URL `afpuno.cl` → `uno.cl` | `3286377` | ✅ |
| `scripts/verify-urls.mjs` sincronizado | `cc11347` | ✅ |
