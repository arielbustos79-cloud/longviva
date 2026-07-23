-- Tabla de comunas con programas municipales para adultos mayores
-- Diseñada para crecer: agregar nuevas comunas via INSERT sin tocar el código

CREATE TABLE IF NOT EXISTS comunas_adulto_mayor (
  id serial PRIMARY KEY,
  comuna text NOT NULL UNIQUE,
  nombre_programa text NOT NULL,
  descripcion text,
  direccion text,
  telefono text,
  link text,
  nota text,
  activo boolean DEFAULT true
);

ALTER TABLE comunas_adulto_mayor ENABLE ROW LEVEL SECURITY;

-- Lectura pública — información municipal, no sensible
CREATE POLICY "lectura publica comunas"
ON comunas_adulto_mayor FOR SELECT
TO anon, authenticated
USING (activo = true);

GRANT SELECT ON comunas_adulto_mayor TO anon, authenticated;

-- Seed inicial — 6 comunas confirmadas
INSERT INTO comunas_adulto_mayor (comuna, nombre_programa, descripcion, direccion, link, nota) VALUES
(
  'Las Condes',
  'Dirección de Desarrollo Comunitario — Adulto Mayor',
  'Clubes de Adultos Mayores, talleres gratuitos de crecimiento personal, arte y estimulación cognitiva.',
  NULL,
  'https://www.lascondes.cl',
  'Inscripción presencial en DIDECO Las Condes.'
),
(
  'Providencia',
  'Programa Adulto Mayor Providencia',
  'Talleres de actividad física, arte, cultura, finanzas, tecnología y trekking.',
  NULL,
  'https://www.providencia.cl',
  'Requiere Tarjeta Vecino de Providencia para inscribirse.'
),
(
  'Santiago',
  'Centro Adulto Mayor Santiago',
  'Talleres culturales, recreativos y sociales. Sede principal en Matucana 272, Parque Quinta Normal. También Centro Comunitario Carol Urzúa.',
  'Matucana 272, Parque Quinta Normal',
  'https://www.municipalidaddesantiago.cl',
  NULL
),
(
  'Ñuñoa',
  'Programa Adulto Mayor Ñuñoa',
  'Talleres culturales, recreativos y sociales en modalidad presencial y virtual.',
  NULL,
  'https://www.nunoa.cl',
  NULL
),
(
  'San Miguel',
  'Talleres Adulto Mayor San Miguel',
  'Talleres rotativos por clubes y agrupaciones: cocina, baile de salón, tejido y más.',
  NULL,
  'https://www.sanmiguel.cl',
  NULL
),
(
  'Quinta Normal',
  'Centro Comunitario para Personas Mayores',
  'Centro comunitario con programas de integración social y talleres para personas mayores.',
  NULL,
  'https://www.quintanormal.cl',
  NULL
)
ON CONFLICT (comuna) DO NOTHING;
