-- Batch 3 — 8 artículos originales — 01-08-2026
-- Verificar duplicados de título antes de insertar
SELECT titulo FROM articulos
WHERE titulo IN (
  'Tu AFP a un clic: cómo tomar el control de tus fondos',
  'Redes que activan: actividades comunitarias cerca de ti',
  'Fuerza y equilibrio: por qué el ejercicio suave marca la diferencia',
  'Santiago cultural: panoramas gratuitos para redescubrir la ciudad',
  'Proteínas que suman: cómo cuidar tu musculatura con la alimentación',
  'Gimnasia mental: por qué los desafíos lógicos te mantienen ágil',
  'Controles médicos sin salir de casa: qué es la telemedicina',
  'Nombre comercial vs. principio activo: entiende tus medicamentos'
);

-- ─────────────────────────────────────────────────────────────
-- 1. Tu AFP a un clic (finanzas_prevision)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'tu-afp-a-un-clic-como-tomar-el-control-de-tus-fondos',
  'Tu AFP a un clic: cómo tomar el control de tus fondos',
  'Saber en qué está tu plata previsional no requiere trámites complicados — solo saber dónde mirar.',
  'finanzas_prevision',
  'original',
  E'## La información es la base del control\n\nSaber en qué está tu dinero previsional no requiere trámites complicados. Cada AFP tiene un portal digital donde puedes revisar tu saldo, tu historial de cotizaciones y el fondo en que están invertidos tus ahorros (A, B, C, D o E). Conocer esos datos con regularidad te da tranquilidad y evita sorpresas.\n\n## Qué puedes revisar hoy mismo\n\n- **Tu cartola actual.** Muestra tu saldo y los movimientos del último período.\n- **El fondo en que estás.** Cada fondo tiene un nivel de riesgo distinto — vale la pena saber en cuál estás y por qué.\n- **Tus datos de contacto.** Mantenerlos actualizados asegura que la AFP pueda avisarte de cualquier trámite o cambio relevante.\n\n## Un hábito simple\n\nNo hace falta revisar todo a diario. Con mirar tu cartola una vez al mes o cada vez que recibas una notificación, ya estás ejerciendo control real sobre tu previsión — sin depender de intermediarios para entender qué está pasando con tu plata.\n\n## Tu paso de hoy\n\nEntra al módulo de previsión en tu panel de LongVivIA y accede directo al portal oficial de tu AFP, sin pasos adicionales.\n\n---\n\n*Este artículo tiene fines informativos generales y no constituye asesoría financiera personalizada. Para decisiones sobre tu fondo o tus ahorros previsionales, consulta directamente con tu AFP.*',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 2. Redes que activan (vida_social)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'redes-que-activan-actividades-comunitarias-cerca-de-ti',
  'Redes que activan: actividades comunitarias cerca de ti',
  'Tu municipalidad tiene más de lo que crees — y la mayoría es gratis o casi gratis.',
  'vida_social',
  'original',
  E'## El barrio como punto de encuentro\n\nMuchas municipalidades de Chile organizan de forma permanente talleres, actividad física grupal y eventos culturales pensados para personas en su prime. Son espacios gratuitos o de bajo costo, diseñados para compartir con otros, aprender algo nuevo y salir de la rutina sin necesidad de trasladarse lejos.\n\n## Por qué vale la pena sumarte\n\n- **Conoces gente de tu propio sector.** Compartir un taller o una caminata grupal es una forma natural de hacer nuevas amistades.\n- **Te mantienes en movimiento.** La actividad física grupal suele ser más entretenida y sostenible que hacerla solo.\n- **Descubres talleres que no sabías que existían.** Manualidades, coro, gimnasia, huerto comunitario — la oferta varía mucho de comuna en comuna.\n\n## Cómo empezar\n\nNo necesitas experiencia previa ni compromiso a largo plazo — la mayoría de estos programas permiten sumarte cuando quieras, sin trámites complicados. Basta con acercarte a la oficina correspondiente en tu municipalidad o revisar la cartelera disponible.\n\n## Tu paso de hoy\n\nIngresa al directorio de Comunidad en LongVivIA, selecciona tu comuna y revisa qué actividades tienes disponibles esta semana.',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 3. Fuerza y equilibrio (bienestar_energia)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'fuerza-y-equilibrio-por-que-el-ejercicio-suave-marca-la-diferencia',
  'Fuerza y equilibrio: por qué el ejercicio suave marca la diferencia',
  'No se trata de intensidad — se trata de constancia y del tipo correcto de movimiento.',
  'bienestar_energia',
  'original',
  E'## El equilibrio se entrena\n\nMantener los músculos activos y el equilibrio firme es clave para conservar tu independencia y libertad de movimiento. La buena noticia es que no se necesita un entrenamiento intenso: rutinas suaves y constantes de flexibilidad, fuerza y equilibrio son igual de efectivas cuando se mantienen en el tiempo.\n\n## Qué tipo de ejercicio suma\n\n- **Fuerza suave.** Ejercicios con el propio peso corporal o bandas elásticas ayudan a mantener la masa muscular.\n- **Equilibrio.** Prácticas como Tai Chi o ejercicios específicos de estabilidad reducen el riesgo de caídas.\n- **Flexibilidad.** Estiramientos simples mejoran el rango de movimiento y disminuyen la rigidez articular.\n\n## La constancia importa más que la intensidad\n\nDiez o quince minutos diarios de movimiento suave, hechos con regularidad, tienden a dar mejores resultados que sesiones largas y esporádicas. Tu cuerpo responde al estímulo constante, no a la exigencia puntual.\n\n## Tu paso de hoy\n\nEntra a la biblioteca de videos de Bienestar activo en LongVivIA y prueba tu primera rutina guiada de 10 minutos.\n\n---\n\n*Este artículo tiene fines informativos y no reemplaza la opinión de un profesional de la salud. Ante cualquier duda sobre tu situación personal, consulta siempre a tu médico o especialista.*',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 4. Santiago cultural (vida_social)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'santiago-cultural-panoramas-gratuitos-para-redescubrir-la-ciudad',
  'Santiago cultural: panoramas gratuitos para redescubrir la ciudad',
  'Museos de entrada liberada, historia y arte — sin moverse demasiado ni gastar.',
  'vida_social',
  'original',
  E'## La ciudad como panorama\n\nNo hace falta viajar lejos para tener una buena salida cultural. Santiago cuenta con varios museos de entrada liberada, ideales para recorrer con calma y sin apuro. Entre los más conocidos están el Museo Histórico Nacional, en pleno centro, y el Museo Nacional de Historia Natural, en el Parque Quinta Normal — ambos con colecciones permanentes que se pueden visitar cualquier día de la semana.\n\n## Por qué sumar esto a tu semana\n\n- **Estimula la curiosidad.** Aprender algo nuevo, aunque sea un dato histórico o una obra de arte, mantiene la mente activa.\n- **Es una buena excusa para salir.** Un panorama cultural es una meta concreta para el día, algo que romper la rutina.\n- **Se puede compartir.** Ir en pareja, con amigos o en grupo hace que la experiencia rinda el doble.\n\n## Un tip práctico\n\nRevisa los horarios de atención antes de ir — algunos museos cierran los lunes o tienen horario reducido los fines de semana. Llegar temprano también ayuda a evitar las horas de mayor afluencia.\n\n## Tu paso de hoy\n\nExplora el pilar de Ocio en LongVivIA y elige tu próxima salida cultural entre las opciones disponibles sin costo.',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 5. Proteínas que suman (salud_activa)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'proteinas-que-suman-como-cuidar-tu-musculatura-con-la-alimentacion',
  'Proteínas que suman: cómo cuidar tu musculatura con la alimentación',
  'Fuentes simples y accesibles que puedes incorporar sin complicarte la vida.',
  'salud_activa',
  'original',
  E'## La proteína como aliada\n\nMantener la masa muscular con los años requiere, entre otras cosas, una alimentación que incluya suficiente proteína de buena calidad. Fuentes simples como pescado, pollo, pavo, huevo o legumbres son opciones accesibles que se pueden incorporar en las comidas del día a día sin mayor complicación.\n\n## Cómo incorporarla sin complicarte\n\n- **Suma una fuente de proteína en cada comida principal.** No hace falta que sea en grandes cantidades — la regularidad importa más que la porción.\n- **Combina con verduras de colores variados.** Aportan fibra y otros nutrientes que complementan la alimentación.\n- **No descartes las legumbres.** Son una fuente de proteína accesible y fácil de preparar de varias formas.\n\n## Un hábito, no una dieta estricta\n\nNo se trata de reglas rígidas ni de eliminar grupos de alimentos completos, sino de ir incorporando estas opciones de forma constante. Los cambios sostenibles en el tiempo suelen dar mejores resultados que los cambios drásticos y puntuales.\n\n## Tu paso de hoy\n\nRevisa la sección de Nutrición en LongVivIA y descubre recetas simples con buen aporte de proteína.\n\n---\n\n*Este artículo tiene fines informativos y no reemplaza la opinión de un profesional de la salud o nutricionista. Ante cualquier duda sobre tu alimentación, consulta siempre a un especialista.*',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 6. Gimnasia mental (bienestar_energia)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'gimnasia-mental-por-que-los-desafios-logicos-te-mantienen-agil',
  'Gimnasia mental: por qué los desafíos lógicos te mantienen ágil',
  'Unos minutos al día de juego mental suman más de lo que parece.',
  'bienestar_energia',
  'original',
  E'## El cerebro también necesita movimiento\n\nAsí como el cuerpo se mantiene en forma con actividad regular, la mente se beneficia de desafíos constantes. Juegos de memoria, sopas de letras y otros ejercicios lúdicos son una forma simple y entretenida de mantener la atención y la agilidad mental activas.\n\n## Qué aporta este tipo de juego\n\n- **Atención focalizada.** Concentrarte en encontrar una palabra o recordar una secuencia entrena tu capacidad de enfoque.\n- **Memoria de trabajo.** Recordar posiciones o patrones ejercita la memoria a corto plazo.\n- **Un momento de disfrute.** Más allá del entrenamiento, son un buen espacio de entretención personal.\n\n## No se trata de competir contigo mismo todo el tiempo\n\nEl objetivo no es "ganarle" al juego cada vez, sino mantener el hábito. Jugar unos minutos al día, sin presión ni exigencia, es lo que realmente suma con el tiempo.\n\n## Tu paso de hoy\n\nEntra a la sección de Juegos en LongVivIA y prueba una ronda de tu juego favorito hoy mismo.',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 7. Controles médicos sin salir de casa (salud_activa)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'controles-medicos-sin-salir-de-casa-que-es-la-telemedicina',
  'Controles médicos sin salir de casa: qué es la telemedicina',
  'Una consulta médica sin traslado ni sala de espera — para los seguimientos que ya conoces.',
  'salud_activa',
  'original',
  E'## Una forma distinta de ver al médico\n\nLa telemedicina permite tener una consulta médica a distancia, por videollamada o llamada telefónica, sin necesidad de trasladarte ni esperar en una sala de espera. Es especialmente útil para controles periódicos, dudas puntuales o seguimientos de tratamientos que ya conoces.\n\n## Cuándo puede servirte\n\n- **Controles de rutina.** Revisar exámenes o hacer seguimiento de una condición ya diagnosticada.\n- **Consultas por dudas puntuales.** Una molestia leve o una pregunta sobre un medicamento no siempre requiere ir presencial.\n- **Ahorro de tiempo y traslado.** Especialmente útil si te cuesta movilizarte o el centro de salud queda lejos.\n\n## Qué no reemplaza\n\nLa telemedicina no sirve para urgencias ni para exámenes físicos que requieren presencia — para eso, siempre hay que acudir presencialmente o llamar a un servicio de urgencia. Es un complemento, no un reemplazo total de la atención médica presencial.\n\n## Tu paso de hoy\n\nRevisa tu panel de LongVivIA para ver los prestadores de telemedicina disponibles según tu previsión de salud.\n\n---\n\n*Este artículo tiene fines informativos y no reemplaza la opinión de un profesional de la salud. Ante cualquier duda sobre tu situación personal, consulta siempre a tu médico o especialista.*',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 8. Nombre comercial vs. principio activo (salud_activa)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'nombre-comercial-vs-principio-activo-entiende-tus-medicamentos',
  'Nombre comercial vs. principio activo: entiende tus medicamentos',
  'Dos nombres, un mismo remedio — entender la diferencia te da más autonomía sobre tu cuidado.',
  'salud_activa',
  'original',
  E'## Dos nombres, un mismo remedio\n\nTodo medicamento tiene un nombre comercial (la marca con la que se vende) y un principio activo (el compuesto químico responsable de su efecto). Un mismo principio activo puede venderse bajo distintas marcas y precios — conocer esta diferencia te permite entender mejor lo que estás tomando y comparar alternativas con más información.\n\n## Por qué es útil saberlo\n\n- **Evitas confusiones.** Si cambias de marca pero el principio activo es el mismo, el efecto del medicamento no debería variar.\n- **Puedes preguntar con más precisión.** Tanto a tu médico como en la farmacia, mencionar el principio activo ayuda a resolver dudas más rápido.\n- **Entiendes mejor tu tratamiento.** Saber para qué sirve cada componente te da más autonomía sobre tu propio cuidado.\n\n## Dónde encontrar información confiable\n\nEn Chile, el Instituto de Salud Pública (ISP) regula y registra la información oficial de cada medicamento. Si tienes dudas sobre el principio activo o las especificaciones de algo que estás tomando, puedes preguntarle directamente a VIVIAN.\n\n## Tu paso de hoy\n\nPregúntale a VIVIAN por el principio activo o las especificaciones ISP de tu medicamento, o revisa las farmacias disponibles para derivación directa desde tu panel.\n\n---\n\n*Este artículo tiene fines informativos y no reemplaza la opinión de un profesional de la salud o farmacéutico. Ante cualquier duda sobre tu medicación, consulta siempre a tu médico o farmacéutico.*',
  NULL,
  true
);
