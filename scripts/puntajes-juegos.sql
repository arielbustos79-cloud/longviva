-- Tabla de mejores puntajes por usuario y juego
-- Usada por los 4 juegos cognitivos de "Entrena tu mente"

CREATE TABLE IF NOT EXISTS puntajes_juegos (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  juego      text        NOT NULL, -- 'caza_objetos' | 'secuencia' | 'diferencias' | 'test_colores'
  puntaje    integer     NOT NULL DEFAULT 0, -- métrica principal (score o nivel)
  nivel      integer     NOT NULL DEFAULT 0, -- nivel de dificultad alcanzado
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, juego)
);

ALTER TABLE puntajes_juegos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios leen su propio puntaje"
  ON puntajes_juegos FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "usuarios insertan su puntaje"
  ON puntajes_juegos FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "usuarios actualizan su puntaje"
  ON puntajes_juegos FOR UPDATE
  TO authenticated USING (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE ON puntajes_juegos TO authenticated;
