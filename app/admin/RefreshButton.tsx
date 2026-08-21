"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [ultimaActualizacion, setUltimaActualizacion] = useState(() =>
    new Date().toLocaleString("es-CL", {
      timeZone: "America/Santiago",
      day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
    })
  );

  function actualizar() {
    startTransition(() => {
      router.refresh();
      setUltimaActualizacion(
        new Date().toLocaleString("es-CL", {
          timeZone: "America/Santiago",
          day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
        })
      );
    });
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>
        Última actualización: {ultimaActualizacion}
      </span>
      <button
        onClick={actualizar}
        disabled={isPending}
        style={{
          background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.2)",
          color: "white", borderRadius: 50, padding: "8px 18px", fontSize: 13, fontWeight: 600,
          cursor: isPending ? "default" : "pointer", opacity: isPending ? 0.6 : 1,
        }}
      >
        {isPending ? "Actualizando…" : "Actualizar"}
      </button>
    </div>
  );
}
