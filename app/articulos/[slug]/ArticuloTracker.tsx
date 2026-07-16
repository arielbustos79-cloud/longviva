"use client";

import { useEffect, useRef } from "react";
import { logEvento } from "@/lib/logEvento";

export default function ArticuloTracker({ slug, pilar }: { slug: string; pilar: string }) {
  const registrado = useRef(false);

  useEffect(() => {
    if (registrado.current) return;

    // Opción A: tiempo mínimo de 30 segundos en la página
    const timer = setTimeout(() => {
      if (!registrado.current) {
        registrado.current = true;
        logEvento("articulo_leido", { slug, pilar });
      }
    }, 30_000);

    // Opción B: scroll hasta el 80% del artículo
    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.8 && !registrado.current) {
        registrado.current = true;
        clearTimeout(timer);
        logEvento("articulo_leido", { slug, pilar });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [slug, pilar]);

  return null;
}
