-- Tabla educacion_interes — formulario de interés pilar Educación Continua
-- Creada para panel /admin (brief-admin-panel.md, 13-08-2026)
-- Estructura mínima según ese brief: nombre, caja, email, created_at.
-- Si el brief de /educacion (Cowork) definió columnas adicionales,
-- ajustar este script antes de correrlo — no se tuvo acceso a ese brief.

CREATE TABLE IF NOT EXISTS educacion_interes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  caja TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE educacion_interes ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede enviar el formulario (público, sin login) — igual
-- que otros formularios de interés/feedback del sitio.
CREATE POLICY "Cualquiera puede registrar interés"
  ON educacion_interes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Solo usuarios autenticados pueden leer — el panel /admin filtra
-- además por ADMIN_EMAILS a nivel de aplicación.
CREATE POLICY "Usuarios autenticados pueden leer"
  ON educacion_interes FOR SELECT
  TO authenticated
  USING (true);
