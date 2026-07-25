# Brief — Ajuste matriz de Telemedicina por Isapres
**24-07-2026** · Origen: hallazgo de URL inventada por VIVIAN (`isaprecedblanca.cl`)

> **Estado de implementación:** ✅ Aplicado en commit `3286377` (24-07-2026).
> Ver traspaso en `2026-07-24-traspaso-matriz-telemedicina.md`.

---

## 0. Conexión con `brief-fix-urls-inventadas-vivian.md`

Este brief nace directamente del hallazgo de ese otro: al testear a VIVIAN, dio `isaprecedblanca.cl` (inexistente) para Cruz Blanca. Investigar la URL correcta abrió la pregunta más grande de qué proveedor de telemedicina corresponde a cada isapre.

**Implicancia directa:** la lista fija de URLs verificadas que VIVIAN debe usar debe poblarse con los datos de este brief para el pilar Telemedicina — no con una URL genérica de la isapre. Para Cruz Blanca la lista fija no debería tener un solo link, sino el flujo real: portal `sitio.cruzblanca.cl/MiCruzBlanca` como punto de entrada.

---

## 1. Error a corregir — selector de Isapre en el perfil

El selector listaba: Banmédica, Cruz Blanca, Consalud, Colmena, Vida Tres, Nueva Masvida, **Cruz del Norte**.

**Problema:** Cruz del Norte es una isapre **cerrada**, exclusiva para trabajadores de SQM — no debería estar en un selector de acceso público.

Las 7 isapres abiertas reales: Banmédica, Colmena, Consalud, Cruz Blanca, **Esencial**, Nueva Masvida, Vida Tres.
Esencial: isapre más nueva del sistema, creada 2022, ligada a la Corporación Chileno Alemana de Beneficencia / Clínica Alemana.

**Fix:** reemplazar "Cruz del Norte" por "Esencial" en `profiles.prevision`.
**✅ Aplicado — commit `3286377`. Supabase confirmó 0 usuarios con `isapre_cruz_del_norte`.**

---

## 2. Marco general — tres modalidades de mercado

- **Holdings integrados:** mismo dueño de la Isapre y de las clínicas (ej. Bupa es dueño de Cruz Blanca e IntegraMédica). Suele significar copagos más bajos o consultas de urgencia virtual a costo $0 dentro de su red.
- **Plataformas propias:** desarrolladas por la aseguradora directamente.
- **Convenios directos (I-Med):** el afiliado agenda en la web de un prestador grande y paga el bono electrónico ahí, seleccionando su isapre en la pasarela. Modelo de las isapres cerradas.

---

## 3. Matriz de Isapres — nivel de confianza por dato

### Relación dueño / red clínica — alta confianza

| Isapre | Grupo controlador | Red clínica principal |
|---|---|---|
| Cruz Blanca | Bupa (Reino Unido) | IntegraMédica, clínicas Bupa |
| Banmédica | UnitedHealth Group | Clínica Santa María, Dávila |
| Vida Tres | UnitedHealth Group (mismo dueño que Banmédica) | Clínica Santa María, Dávila, Alemana |
| Consalud | Cámara Chilena de la Construcción (desde 1983) | RedSalud |
| Esencial | Corporación Chileno Alemana de Beneficencia | Clínica Alemana |
| Colmena | Fondo de inversión (ligado a Bethia) | Red propia |
| Nueva MasVida | Nexus (EEUU) | No verificado |
| Isalud | Codelco (cerrada) | `isapredecodelco.cl` |
| Fundación | BancoEstado (cerrada) | — |
| Cruz del Norte | SQM (cerrada) | `isaprecruzdelnorte.cl` |

### Proveedores de telemedicina — segunda ronda 24-07-2026

**Cruz Blanca — al menos tres proveedores en paralelo:**
1. **Mediclic** — portal marca blanca `cruzblanca.mediclic.cl`, accesible desde "Mi Cruz Blanca" (`sitio.cruzblanca.cl/MiCruzBlanca`)
2. **Teledoc** — mismo flujo desde "Mi Cruz Blanca", opción alternativa al comprar el bono
3. **IntegraMédica** — vía convenio independiente (`integramedica.cl/.../videoconsulta-bono-cruzblanca`)

> Una fuente adicional (no oficial) menciona "Doctor Online" — no coincide con fuentes oficiales, probablemente desactualizada. No usar sin confirmar en `cruzblanca.cl`.

**Banmédica y Vida Tres → IntegraMédica** — confirmado directo en página de convenios de IntegraMédica. Dato sólido, coherente con dueño compartido (UnitedHealth Group).

**Sin confirmar — contradicciones reales entre fuentes:**

| Isapre | Fuente A | Fuente B | Estado |
|---|---|---|---|
| Consalud | Clinitel | Click Doctor (tabla original) | ❌ Sin confirmar en web oficial Consalud |
| Colmena | Docdoc + RedSalud | Doctor Online (tabla original) | ❌ Sin confirmar en web oficial Colmena |
| Nueva MasVida | — | — | ❌ Sin verificar |
| Esencial | — | — | ❌ Sin verificar |

---

## 4. Ajuste al router — criterios aplicados

- Cruz Blanca → IntegraMédica (confianza alta) + Mediclic (portal Mi Cruz Blanca) ✅
- Banmédica, Vida Tres → IntegraMédica (mismo dueño UnitedHealth, confirmado) ✅
- Consalud → RedSalud (red CChC, alta confianza por ownership) ✅ *(Clinitel sin confirmar — se usó RedSalud como dato más defendible)*
- Caja → Mediclic (sin cambio)
- Colmena, Nueva MasVida, Esencial → lista genérica con disclaimer (proveedor específico sin verificar)
- Isapres cerradas → no van en selector público

**Disclaimer activo en todos los proveedores:** "Consulta si tu previsión cubre esta atención antes de agendar. La cobertura depende de tu plan específico."

---

## 5. Pendiente — tercera ronda de verificación

Antes de fijar proveedores específicos de Consalud, Colmena, Nueva MasVida y Esencial en el router, verificar directo en la web oficial de cada isapre:

- [ ] `consalud.cl` → ¿Clinitel o Click Doctor o RedSalud?
- [ ] `colmena.cl` → ¿Docdoc, RedSalud o Doctor Online?
- [ ] `nuevamasvida.cl` → proveedor de telemedicina
- [ ] `esencial.cl` o equivalente → proveedor de telemedicina
