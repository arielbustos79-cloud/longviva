-- Tabla farmacias_comunitarias
-- Mismo patrón que comunas_adulto_mayor — datos curados por comuna.
-- Ejecutar en Supabase SQL Editor.
-- PENDIENTE: poblar con datos verificados directamente en sitios municipales.

CREATE TABLE IF NOT EXISTS farmacias_comunitarias (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  comuna     text        NOT NULL,
  nombre     text        NOT NULL,
  direccion  text,
  horario    text,
  requisitos text,
  telefono   text,
  link       text,
  nota       text,
  activo     boolean     DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE farmacias_comunitarias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "autenticados leen farmacias activas"
  ON farmacias_comunitarias FOR SELECT
  TO authenticated
  USING (activo = true);

GRANT SELECT ON farmacias_comunitarias TO authenticated;
