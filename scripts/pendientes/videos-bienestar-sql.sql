-- Tabla para videos de bienestar — para cuando se quiera migrar desde código a Supabase
-- La página /bienestar actualmente lee de lib/videos-bienestar.ts (hardcoded)
-- Correr esto cuando se quiera gestionar videos desde Supabase (agregar/editar sin deploy)

CREATE TABLE IF NOT EXISTS videos_bienestar (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo      TEXT NOT NULL,
  disciplina  TEXT CHECK (disciplina IN ('yoga_silla', 'tai_chi', 'musculatura')),
  descripcion TEXT,
  youtube_url TEXT NOT NULL,
  duracion_min INTEGER,
  nivel       TEXT CHECK (nivel IN ('principiante', 'intermedio')),
  publicado   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE videos_bienestar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lectura publica videos publicados"
ON videos_bienestar FOR SELECT
TO anon, authenticated
USING (publicado = true);

GRANT SELECT ON videos_bienestar TO anon, authenticated;

-- Seed — 7 videos aprobados por Ariel (23-07-2026)
-- duracion_min NULL = verificar en el video antes de cargar
INSERT INTO videos_bienestar (titulo, disciplina, descripcion, youtube_url, duracion_min, nivel, publicado) VALUES
('Yoga en silla · 20 min — alivio lumbar',              'yoga_silla',  'Secuencia suave de 20 minutos sentada/o para liberar tensión lumbar.',                   'https://www.youtube.com/watch?v=vBXWOUXb_5g', 20,   'principiante', true),
('Yoga en silla · 30 min — para principiantes',         'yoga_silla',  'Clase completa de 30 minutos. Canal Sendero del Yoga.',                                   'https://www.youtube.com/watch?v=YenHD5fTA-c', 30,   'principiante', true),
('Tai Chi terapéutico — postura, equilibrio y movilidad','tai_chi',     'Secuencia terapéutica enfocada en postura, equilibrio y movilidad articular.',           'https://www.youtube.com/watch?v=j8YqSmzNsfY', NULL, 'principiante', true),
('Tai Chi suave — equilibrio y prevención de caídas',   'tai_chi',     'Tai Chi suave con foco en fortalecer el equilibrio y reducir riesgo de caídas.',          'https://www.youtube.com/watch?v=t1xPPpIsHrw', NULL, 'principiante', true),
('Fuerza suave · 20 min — cuerpo completo',             'musculatura', 'Rutina de fuerza funcional de 20 minutos. Sin pesas, sin impacto.',                       'https://www.youtube.com/watch?v=cIdFerErtSg', 20,   'principiante', true),
('Fuerza suave · 39 min — brazos y espalda',            'musculatura', 'Sesión de 39 min enfocada en tonificar brazos y fortalecer la espalda.',                  'https://www.youtube.com/watch?v=yeXwgPwaniA', 39,   'principiante', true),
('Cardio suave — nivel fácil, actívate en casa',        'musculatura', 'Cardio de bajo impacto, nivel fácil, para activar circulación sin salir de casa.',        'https://www.youtube.com/watch?v=aaE34xMf2VU', NULL, 'principiante', true)
ON CONFLICT DO NOTHING;
