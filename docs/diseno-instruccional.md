# Diseño instruccional

[← Volver al README](../README.md)

## Propósito

Comunicar qué aprendió el equipo durante el cuatrimestre de un modo que invite a participar, no solo a leer. La pieza responde a la pregunta de la cátedra, *¿Qué es la LTE?*, mostrando el recorrido que llevó a esa respuesta.

## Público y contexto de uso

- Docentes, estudiantes y la cátedra de Tecnología Educativa III.
- Uso individual y breve (pocos minutos), desde celular, tablet o computadora.
- Sin registro ni requisitos previos.

## Estructura de la experiencia

El recorrido sigue una secuencia de reflexión en tres momentos y una síntesis. Cada momento corresponde a una puerta.

| Puerta | Actividad | Intención pedagógica | Retroalimentación |
|---|---|---|---|
| **Lo que creíamos** | Elegir la certeza inicial con la que cada quien se identifica. | Activar conocimientos previos y contrastar una creencia de partida con su reformulación actual. | La certeza elegida se tacha y aparece cómo la escribe hoy el equipo. |
| **Lo que dudamos** | Ordenar cronológicamente tres momentos de quiebre. | Reconstruir el proceso de cambio conceptual: la secuenciación exige comprender, no solo leer. | Cada acierto se numera; un error se señala con texto y movimiento, sin penalizar. |
| **Lo que hacemos hoy** | Activar interruptores que muestran el «antes» y el «hoy» de cada práctica. | Hacer visible la transferencia a la práctica docente mediante la comparación directa. | Cada interruptor cambia el texto y la etiqueta de «Antes» a «Hoy». |
| **La respuesta** | Leer la síntesis del equipo y escribir una frase propia. | Integrar lo recorrido y promover la metacognición y la apropiación personal. | La frase se puede copiar y compartir; se confirma la acción. |

## Decisiones de diseño

- **Recorrido no lineal.** Las tres primeras puertas se abren en cualquier orden, respetando los tiempos y la curiosidad de cada persona.
- **Progreso explícito.** El inventario de llaves, fijo arriba de la pantalla, funciona como indicador de avance y meta clara. La puerta final muestra cuántas llaves faltan y se ilumina cuando está lista.
- **Retroalimentación inmediata y formativa.** Cada acción tiene una respuesta visible. Los errores informan sin castigar y permiten volver a intentar.
- **Cierre productivo.** La experiencia termina con una producción propia, no con una lectura: la frase personal sobre la LTE.
- **Carga cognitiva acotada.** Una sala por vez, consignas breves y una sola acción principal por pantalla.

## Ada como andamiaje

Ada es la asistente que el equipo Enlace Pedagógico creó para la cursada «IA Generativa en el Aula»; su nombre homenajea a Ada Lovelace, reconocida como la primera persona programadora de la historia. En este sitio cumple el rol de guía:

| Momento | Qué hace Ada |
|---|---|
| Primera visita | Se presenta: quién es, quién la creó y por qué se llama así. |
| Nueva sala | Muestra un «!» para indicar que hay una pista disponible. |
| Al consultarla | Ofrece la consigna de la sala actual. |
| Llave conseguida | Celebra el logro con el mensaje correspondiente. |
| Error de secuencia | Señala el error con el mismo aviso de la sala. |

Criterios: la ayuda es **opcional** (se consulta a demanda), **retoma los textos del recorrido** sin sumar consignas nuevas y **no reemplaza** la actividad, solo la orienta.

## Marco conceptual

La propuesta se apoya en el modelo **TPACK** (Koehler y Mishra, 2009): la tecnología cobra sentido en relación con las decisiones pedagógicas y disciplinares de quien enseña. La síntesis final lo expresa en la respuesta del equipo y en la cita que la acompaña.

## Contenido

Todo el texto del recorrido vive en [`js/content.js`](../js/content.js) y se conservó sin cambios a lo largo del rediseño visual. Ver [Mantenimiento](mantenimiento.md) para editarlo.
