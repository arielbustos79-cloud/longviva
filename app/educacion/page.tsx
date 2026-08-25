"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./page.module.css";
import { TEMAS, getCursosPorTema, type TemaEducacion } from "@/lib/educacion";

function fechaCorta(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

export default function EducacionPage() {
  const [temaSeleccionado, setTemaSeleccionado] = useState<TemaEducacion>(TEMAS[0].id);

  const cursos = getCursosPorTema(temaSeleccionado);

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Link href="/dashboard" className={s.headerBack}>
          ← Volver
        </Link>
        <div className={s.headerLogo}>
          LongViv<span>IA</span>
        </div>
      </header>

      <main className={s.main}>
        <p className={s.eyebrow}>Educación Continua</p>
        <h1 className={s.title}>Cursos gratuitos, a tu ritmo</h1>
        <p className={s.subtitle}>
          Selecciona un tema y te mostramos opciones curadas de universidades, SENCE, YouTube y otras plataformas.
          Te conectamos con el curso — te registras directo en el sitio del proveedor.
        </p>

        <div className={s.temaSelector}>
          {TEMAS.map(tema => (
            <button
              key={tema.id}
              onClick={() => setTemaSeleccionado(tema.id)}
              className={`${s.temaBtn} ${temaSeleccionado === tema.id ? s.temaBtnActivo : ""}`}
            >
              {tema.label}
            </button>
          ))}
        </div>

        {cursos.length === 0 ? (
          <div className={s.emptyState}>
            Todavía no tenemos cursos verificados para este tema. Prueba con otro, o pregúntale a VIVIAN.
          </div>
        ) : (
          cursos.map(curso => (
            <div key={curso.url} className={s.cursoCard}>
              <p className={s.cursoProveedor}>{curso.proveedor}</p>
              <h2 className={s.cursoTitulo}>{curso.titulo}</h2>

              {curso.aclaracion && (
                <div className={s.cursoAclaracion}>
                  <p className={s.cursoAclaracionTexto}>💡 {curso.aclaracion}</p>
                </div>
              )}

              <div className={s.cursoMeta}>
                <span className={s.cursoFechaVerificacion}>
                  Verificado gratis el {fechaCorta(curso.fechaVerificacion)}
                </span>
                <a href={curso.url} target="_blank" rel="noopener noreferrer" className={s.cursoLink}>
                  Ver curso →
                </a>
              </div>
            </div>
          ))
        )}

        <div className={s.avisoFinal}>
          <p className={s.avisoFinalTexto}>
            LongVivIA no gestiona inscripciones ni certificados — solo cataloga cursos verificados y te lleva directo al proveedor.
            La disponibilidad y el precio pueden cambiar sin aviso; si algo no calza con lo indicado aquí, cuéntanos a hola@longvivia.cl.
          </p>
        </div>
      </main>
    </div>
  );
}
