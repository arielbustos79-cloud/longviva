-- Tabla feedback — respuestas del formulario de ayuda
-- Ejecutar en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS feedback (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre          text,
  que_hacias      text,
  que_fue_dificil text,
  comentario      text,
  user_id         uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Cualquier usuario autenticado puede insertar su propio feedback
CREATE POLICY "usuarios insertan su feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Cada usuario puede ver solo su propio feedback
CREATE POLICY "usuarios ven su propio feedback"
  ON feedback FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

GRANT INSERT, SELECT ON feedback TO authenticated;
