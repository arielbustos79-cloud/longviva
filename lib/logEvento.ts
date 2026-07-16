import { createClient } from "@/lib/supabase-browser";

type TipoEvento = "registro_completado" | "vivian_mensaje" | "articulo_leido" | "juego_completado";

export async function logEvento(
  tipo: TipoEvento,
  metadata?: Record<string, unknown>
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("eventos").insert({
      tipo,
      user_id: user?.id ?? null,
      metadata: metadata ?? null,
    });
  } catch {
    // silencioso — nunca bloquear la UI por un evento fallido
  }
}
