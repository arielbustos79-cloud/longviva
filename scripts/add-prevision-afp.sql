-- Agrega columna prevision_afp a profiles
-- Campo independiente de `prevision` (salud) — son datos distintos
-- Valores posibles: 'capital' | 'cuprum' | 'habitat' | 'modelo' | 'planvital' | 'provida' | 'uno' | 'ninguna' | NULL

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS prevision_afp text;
