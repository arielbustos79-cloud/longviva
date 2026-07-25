# Brief — Ocio: recursos adicionales
**24-07-2026** · Ejecutado 25-07-2026

## Cambios aplicados

| Item | Estado | Detalle |
|---|---|---|
| Chile Cultura SSL inválido | ✅ Reemplazado | `chilecultura.gob.cl` → `cultura.gob.cl/agendacultural` (verificado OK) |
| Radio Beethoven | ✅ Agregada | `radiobeethoven.cl` (FETCH_ERR sandbox, no DNS_FAIL) |
| T13 Radio | ✅ Agregada | `radio.t13.cl` (FETCH_ERR sandbox, no DNS_FAIL) |
| Agencias de viaje | ✅ Ya existía | Despegar + Viajes Falabella ya estaban en `/ocio` bajo Turismo |
| TV streaming via agregadores | ✅ Descartado | No implementar — riesgo legal retransmisión no autorizada |

## Pendientes de verificación manual en browser

- `radiobeethoven.cl` — FETCH_ERR en sandbox (no DNS_FAIL). Verificar que carga sin error de certificado.
- `radio.t13.cl` — ídem.
