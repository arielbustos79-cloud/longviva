-- Verificar duplicados antes de insertar
SELECT titulo FROM articulos
WHERE titulo IN (
  'Jubilarse y sentir un vacío: por qué pasa y qué hacer',
  'Hervir laurel en casa: un hábito simple con varios beneficios',
  'Fiestas old school: por qué están de vuelta y cómo sumarte',
  'Invertir en tiempos inciertos: qué considerar antes de moverte',
  'IA y brecha digital: por qué muchos se quedan fuera y cómo cerrarla'
);

-- ─────────────────────────────────────────────────────────────
-- 1. Jubilarse y sentir un vacío
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'jubilarse-y-sentir-un-vacio-por-que-pasa-y-que-hacer',
  'Jubilarse y sentir un vacío: por qué pasa y qué hacer',
  'Es más común de lo que se habla. Y admitirlo es el primer paso para salir de ahí.',
  'bienestar_energia',
  'curado',
  E'## Cuando el descanso se siente vacío\n\nMuchas personas llegan a la jubilación esperando disfrutarla desde el primer día. Pero después de las primeras semanas, algo cambia: las actividades que antes entusiasmaban empiezan a sentirse repetitivas, y aparece una sensación difícil de nombrar — no es tristeza exactamente, pero tampoco es la plenitud que se esperaba.\n\nSegún un análisis de ReachLink sobre transiciones de vida, esta etapa suele venir acompañada de irritabilidad sin causa aparente, algo de aislamiento y cambios en el sueño — señales de que el entusiasmo inicial dio paso a una falta de rumbo. Lo llamativo es que muchos sienten vergüenza de admitirlo, porque "se supone" que la jubilación debería hacerlos felices.\n\n## Por qué pasa esto\n\nEn el trabajo, aunque a veces pesado, uno recibía señales constantes de que su experiencia importaba: un reconocimiento, un consejo pedido, una responsabilidad. Al dejar esa rutina, esas señales desaparecen de golpe — y con ellas, parte del sentido del día a día.\n\nLa reorientación suele tomar entre uno y dos años, y pasa por explorar activamente nuevas rutinas e identidades: hacer algo por otros, aprender algo nuevo, retomar una amistad postergada o un interés que quedó guardado por falta de tiempo.\n\n## Qué hacer si te está pasando\n\n- **Nómbralo.** No es debilidad ni fracaso — es una etapa de ajuste, como cualquier otra transición grande en la vida.\n- **Busca estructura propia.** Un horario, un compromiso semanal, algo que dependa de ti — reemplaza las señales que antes daba el trabajo.\n- **Conecta con otros.** Un grupo, un taller, un voluntariado. El aislamiento agrava la sensación de vacío.\n- **Habla de eso.** Con tu pareja, un amigo, o un profesional — decirlo en voz alta ya alivia.\n\nSi en cambio los síntomas se intensifican — problemas de sueño persistentes, desesperanza constante, alejamiento total de las personas cercanas — vale la pena buscar apoyo profesional, porque ahí ya no se trata de un ajuste normal sino de algo que merece atención.\n\n---\n\n*Este artículo tiene fines informativos y no reemplaza la opinión de un profesional de la salud. Ante cualquier duda sobre tu situación personal, consulta siempre a tu médico o especialista.*',
  'https://www.reachlink.com/mx/consejos-mx/factores-estresantes-de-la-vida-y-transiciones-mx/por-que-la-jubilacion-te-hace-sentir-vacio-entendiendo-y-superando-la-depresion-postlaboral/',
  true
);

-- ─────────────────────────────────────────────────────────────
-- 2. Hervir laurel en casa
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'hervir-laurel-en-casa-un-habito-simple-con-varios-beneficios',
  'Hervir laurel en casa: un hábito simple con varios beneficios',
  'No hace falta nada complicado — solo hojas secas, agua y una olla.',
  'salud_activa',
  'curado',
  E'## Un ritual sencillo que vuelve a ponerse de moda\n\nHervir hojas de laurel en casa es un hábito antiguo que muchas familias están retomando. Más allá de su uso en la cocina, el vapor que suelta al hervir tiene varios usos prácticos para el hogar y el bienestar diario.\n\n## Para qué sirve\n\n- **Perfuma el ambiente de forma natural.** El aroma que libera ayuda a disimular olores fuertes de la cocina y deja un olor suave en la casa.\n- **Ayuda a despejar la nariz.** El vapor puede aliviar la sensación de congestión, algo útil en días de frío o alergia.\n- **Genera una sensación de calma.** El aroma del laurel tiene un efecto relajante, útil para bajar revoluciones antes de descansar.\n- **Aleja mosquitos.** El olor resulta molesto para varios insectos, así que funciona como repelente natural.\n\n## Cómo prepararlo\n\nHierve 5 o 6 hojas de laurel secas en 1 litro de agua. Cuando empiece a salir vapor, deja la olla destapada para que el aroma se disperse — puedes moverla de una pieza a otra para que llegue a distintos espacios de la casa. Puedes repetir el proceso un par de veces por semana, y si quieres potenciar el efecto relajante, suma lavanda o manzanilla.\n\nUn par de cuidados: usa siempre hojas secas (concentran más aroma) y nunca dejes la olla al fuego sin supervisión.\n\n## ¿Tiene beneficios para la salud?\n\nEl laurel contiene antioxidantes y vitaminas, y se le atribuyen propiedades antiinflamatorias y digestivas cuando se consume en infusión. Aun así, si te interesa usarlo con fines terapéuticos —y no solo como aromatizante— lo correcto es consultarlo primero con tu médico, sobre todo si tomas otros medicamentos.\n\n---\n\n*Este artículo tiene fines informativos y no reemplaza la opinión de un profesional de la salud. Ante cualquier duda sobre tu situación personal, consulta siempre a tu médico o especialista.*',
  'https://www.cronista.com/informacion-gral/hervir-hojas-de-laurel-por-que-se-recomienda-y-cuales-son-sus-beneficios/',
  true
);

-- ─────────────────────────────────────────────────────────────
-- 3. Fiestas old school (pilar: vida_social)
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'fiestas-old-school-por-que-estan-de-vuelta-y-como-sumarte',
  'Fiestas old school: por qué están de vuelta y cómo sumarte',
  'Música de otra época, pista de baile y puro reencuentro. Una movida que crece en Chile.',
  'vida_social',
  'original',
  E'## El regreso de un clásico\n\nLas fiestas old school —esas que suenan a cumbia, salsa, disco, rock en español o los éxitos que marcaron los 70, 80 y 90— están volviendo con fuerza. Se hacen en centros de eventos, clubes sociales, casinos y hasta en plazas y sedes vecinales. La propuesta es simple: buena música, pista de baile y gente con ganas de pasarlo bien, sin la presión de "estar a la moda".\n\nLo que las hace distintas es el ambiente: no hay competencia por ser el más joven ni el más actualizado. Todos comparten el mismo repertorio musical y las mismas ganas de moverse.\n\n## Por qué vale la pena ir\n\n- **Reconectas con tu música.** Escuchar y bailar los temas que marcaron una época trae de vuelta esa energía de otros años.\n- **Conoces gente con tus mismos gustos.** Es una forma fácil de hacer nuevas amistades: la música ya es un tema de conversación resuelto.\n- **Te mueves sin darte cuenta.** Bailar dos o tres horas es actividad física real, disfrazada de diversión.\n- **Rompes la rutina.** Una salida distinta en el calendario, algo que esperar con ganas.\n\n## Cómo encontrar una cerca de ti\n\n- Busca en redes sociales grupos o páginas de tu comuna con palabras como "fiesta retro", "noche ochentera" o "baile old school".\n- Pregunta en tu junta de vecinos, centro comunitario o club social si organizan eventos así — muchos lo hacen de forma regular.\n- Revisa la cartelera de casinos y centros de eventos de tu ciudad; suelen tener noches temáticas fijas.\n- Si tienes un grupo de amigos con el mismo gusto musical, nada impide organizar la propia: un salón comunitario y una buena lista de música alcanzan para partir.\n\n## Un tip antes de ir\n\nSi hace tiempo no bailas seguido, parte con calma las primeras canciones y mantente hidratado durante la noche. La idea es disfrutar sin exigirte de más.\n\n---\n\n*Este artículo tiene fines informativos. Si tienes alguna condición de salud que te genere dudas sobre la actividad física, consulta primero con tu médico.*',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 4. Invertir en tiempos inciertos
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'invertir-en-tiempos-inciertos-que-considerar-antes-de-moverte',
  'Invertir en tiempos inciertos: qué considerar antes de moverte',
  'No existe una fórmula única, pero sí preguntas clave que te ayudan a decidir con más calma.',
  'finanzas_prevision',
  'original',
  E'## La incertidumbre no es nueva\n\nLos mercados suben y bajan por distintas razones: economía, política, eventos internacionales. Es normal sentir dudas sobre qué hacer con tus ahorros cuando las noticias hablan de volatilidad. Pero tomar decisiones apuradas, por miedo o por presión, suele salir más caro que pensarlas con calma.\n\n## Preguntas que te ayudan a decidir\n\n- **¿Para qué necesito este dinero y cuándo?** No es lo mismo un ahorro que vas a usar en un año que uno pensado para diez años más. El plazo cambia todo.\n- **¿Cuánto riesgo estoy realmente dispuesto a asumir?** No se trata de lo que "debería" tolerar, sino de lo que te permite dormir tranquilo.\n- **¿Estoy diversificando o todo está en un mismo lugar?** Tener los ahorros repartidos en distintos instrumentos reduce el impacto si uno de ellos cae.\n- **¿Estoy decidiendo por información o por pánico?** Vale la pena distinguir entre una noticia puntual y un cambio real en tu situación financiera.\n\n## Sobre tu AFP e Isapre\n\nSi tienes dudas sobre el fondo en que están tus ahorros previsionales (A, B, C, D o E), cada AFP ofrece asesoría gratuita para revisar si el fondo actual calza con tu horizonte y tolerancia al riesgo. Lo mismo aplica si tienes dudas sobre tu plan de salud: cada Isapre o Fonasa tiene canales de atención para resolver consultas específicas de tu caso.\n\n## Lo importante\n\nNo hay una decisión correcta para todos — depende de tu situación particular. Si tienes dudas concretas sobre tus ahorros, tu pensión o tus inversiones, lo mejor es conversarlo directamente con tu AFP, tu banco o un asesor financiero, quienes pueden revisar tu caso específico.\n\n---\n\n*Este artículo tiene fines informativos generales y no constituye asesoría financiera personalizada. Para decisiones sobre tus ahorros o inversiones, consulta directamente con tu AFP, Isapre, banco o un asesor financiero.*',
  NULL,
  true
);

-- ─────────────────────────────────────────────────────────────
-- 5. IA y brecha digital
-- ─────────────────────────────────────────────────────────────
INSERT INTO articulos (slug, titulo, resumen, pilar, tipo, contenido, fuente_url, publicado)
VALUES (
  'ia-y-brecha-digital-por-que-muchos-se-quedan-fuera-y-como-cerrarla',
  'IA y brecha digital: por qué muchos se quedan fuera y cómo cerrarla',
  'La tecnología avanza rápido, pero nadie debería quedar afuera solo por no saber por dónde partir.',
  'tecnologia_simple',
  'original',
  E'## Un cambio que llegó rápido\n\nLa inteligencia artificial —esa tecnología detrás de asistentes como VIVIAN, traductores automáticos o recomendaciones en apps— se instaló en la vida diaria en pocos años. Para quienes usan estas herramientas con frecuencia, se sienten naturales. Para quienes no, pueden parecer un mundo aparte, lleno de términos confusos y pantallas poco amigables.\n\nEsa distancia entre quienes usan la tecnología con soltura y quienes no, es lo que se conoce como brecha digital. No tiene que ver con capacidad, sino con oportunidad de práctica y con qué tan simple es la herramienta.\n\n## Por qué pasa\n\n- **El lenguaje técnico aleja.** Términos como "IA", "algoritmo" o "chatbot" suenan complicados, aunque lo que hacen sea simple.\n- **El diseño no siempre piensa en todos.** Muchas apps usan letra pequeña, botones diminutos o pasos poco claros.\n- **Falta práctica guiada.** Aprender solo, sin nadie que explique con calma, hace que cualquier error se sienta como un fracaso.\n\n## Cómo achicar la brecha, paso a paso\n\n- **Parte con una sola herramienta.** No hace falta aprenderlo todo de una vez — elige una app o función y practícala hasta sentirte cómodo.\n- **Pide que te muestren, no que te lo hagan.** Aprender viendo y repitiendo tú mismo deja más aprendizaje que ver a otro hacerlo por ti.\n- **Anota los pasos que te funcionan.** Una lista simple con capturas o pasos escritos te sirve de recordatorio propio.\n- **Usa asistentes pensados para ser simples.** Herramientas como VIVIAN están diseñadas justamente para explicar sin tecnicismos y acompañar paso a paso.\n\n## Lo que importa\n\nNo se trata de dominar toda la tecnología, sino de que las herramientas que usas te faciliten la vida, no te la compliquen. Ir a tu ritmo, con paciencia, es la única velocidad correcta.\n\n---\n\n*Este artículo tiene fines informativos.*',
  NULL,
  true
);
