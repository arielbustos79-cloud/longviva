-- Tabla para eventos de ocio dinámicos (fiestas retro, eventos puntuales, etc.)
-- Diseñada para actualizarse sin tocar código — solo filas en Supabase.

CREATE TABLE IF NOT EXISTS eventos_ocio (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre      text        NOT NULL,
  lugar       text,
  descripcion text,
  fecha_texto text,        -- Texto libre: "Primer sábado de cada mes", "15 ago 2026", etc.
  url         text,        -- null si no hay link disponible
  activo      boolean     DEFAULT true,
  orden       integer     DEFAULT 0, -- menor = primero
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE eventos_ocio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "autenticados leen eventos activos"
  ON eventos_ocio FOR SELECT
  TO authenticated
  USING (activo = true);

GRANT SELECT ON eventos_ocio TO authenticated;

-- Dato inicial
INSERT INTO eventos_ocio (nombre, lugar, descripcion, fecha_texto, url, orden)
VALUES (
  'Studio 54',
  'Viña del Mar',
  'Fiesta para mayores de 50. Música de los 80 y 90 en un ambiente energético, sin pretensiones. Solo adultos, perfecto para reencontrarse con la pista.',
  'Mensual — ver fechas en Passline',
  'https://www.passline.com/eventos/studio-54-vina',
  0
);
