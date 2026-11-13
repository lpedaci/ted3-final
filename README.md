# Final de recorrido · ¿Qué es la LTE?

Experiencia de aprendizaje interactiva desarrollada por el **Equipo N.º 7 (Enlace Pedagógico)** como desafío creativo de cierre de *Tecnología Educativa III*, Licenciatura en Tecnología Educativa (UTN, 2026).

El sitio responde a la pregunta *¿Qué es la LTE?* a través de un recorrido: cuatro puertas y tres llaves. Cada una de las tres primeras puertas propone una actividad breve sobre la trayectoria del equipo; al completarlas se obtiene una llave, y con las tres se desbloquea la puerta final, que integra la respuesta.

**Sitio publicado:** https://lpedaci.github.io/ted3-final/

---

## Propósito y público

La pieza busca comunicar el aprendizaje del equipo durante el cuatrimestre de un modo que invite a participar, no solo a leer. Está pensada para docentes, estudiantes y la cátedra, y se recorre en pocos minutos desde cualquier dispositivo.

## Diseño instruccional

El recorrido se organiza como una secuencia de reflexión en tres momentos, más una síntesis:

| Puerta | Actividad | Intención pedagógica |
|---|---|---|
| **Lo que creíamos** | Elegir la certeza inicial con la que cada quien se identifica. | Activar conocimientos previos y contrastar una creencia de partida con su reformulación actual. |
| **Lo que dudamos** | Ordenar cronológicamente tres momentos de quiebre. | Reconstruir el proceso de cambio conceptual; la secuenciación exige comprender, no solo leer. |
| **Lo que hacemos hoy** | Activar interruptores que muestran el “antes” y el “hoy” de cada práctica. | Hacer visible la transferencia a la práctica docente mediante la comparación directa. |
| **La respuesta** | Lectura de la síntesis del equipo y escritura de una frase propia. | Integrar lo recorrido y promover la metacognición y la apropiación personal. |

Decisiones que sostienen la propuesta:

- **Recorrido no lineal.** Las tres primeras puertas pueden abrirse en cualquier orden, lo que respeta los tiempos y la curiosidad de cada persona.
- **Retroalimentación inmediata.** Cada acción tiene respuesta visible: la reformulación aparece al elegir una certeza, un error de secuencia se señala sin penalizar y la llave conseguida se anuncia en el momento.
- **Progreso explícito.** El inventario de llaves funciona como indicador de avance y como meta clara; la puerta final permanece cerrada hasta reunir las tres.
- **Cierre productivo.** La experiencia termina con una producción propia (la frase personal sobre la LTE), que se puede copiar y compartir.
- **Marco conceptual.** La propuesta se apoya en el modelo TPACK (Koehler y Mishra, 2009): la tecnología cobra sentido en relación con las decisiones pedagógicas y disciplinares de quien enseña.

## Diseño de interfaz y experiencia

- **Estética.** Aventura de 8 bits inspirada en los videojuegos de la era NES: paleta limitada, cajas de diálogo negras con marco blanco, puertas en pixel art y cursor ▶ de selección. El lenguaje visual refuerza la metáfora del recorrido y la idea de “desbloquear” niveles. Es un diseño original; no utiliza recursos de juegos existentes.
- **Legibilidad.** Tipografía pixel de trazo fino (VT323) para títulos y etiquetas, y una sans serif (Figtree) para los textos largos. Nombres y estados de cada puerta sobre placas de alto contraste.
- **Jerarquía.** Las salas se presentan como cuadros de diálogo con un único foco por pantalla; las opciones se comportan como un menú de juego, con estados de selección claros.
- **Responsive.** Diseño *mobile first*, verificado en celular (320 y 375 px), tablet (768 px), escritorio (1366 px) y celular en horizontal, sin desplazamiento lateral.

## Accesibilidad

- Contraste de texto en nivel AA o superior (los textos de estado superan 10:1).
- Navegación completa con teclado y foco visible en todos los controles.
- Al cambiar de sala, el foco pasa al título de la sala.
- Logros y errores anunciados a lectores de pantalla mediante una región `aria-live`.
- Los errores no dependen solo del color: se acompañan de texto y movimiento.
- Áreas táctiles de 44 px como mínimo.
- Respeta `prefers-reduced-motion`: sin animaciones ni partículas.

## Estructura del proyecto

```
.
├── index.html          Página principal: marcado, escena de fondo y contenedores
├── css/
│   └── styles.css      Estilos: paleta, escena, HUD, puertas, salas y responsive
├── js/
│   ├── content.js      Contenido textual del recorrido (EQUIPO y T)
│   ├── avatars.js      Avatares del equipo
│   ├── doors.js        Puertas y llave en pixel art (SVG generado por código)
│   └── app.js          Estado, render de cada sala e interacción
├── assets/
│   └── favicon.svg     Ícono de la pestaña
└── README.md
```

El contenido está separado de la presentación y de la lógica: para editar textos alcanza con modificar `js/content.js`. Los scripts son clásicos (`defer`) y se cargan en orden, por lo que el sitio funciona sin proceso de compilación.

## Uso local y publicación

- Abrir `index.html` en el navegador, o servir la carpeta con un servidor estático (por ejemplo, `python -m http.server`).
- Publicación en GitHub Pages desde la rama `main`, carpeta raíz. Cualquier hosting estático es compatible.
- Los enlaces a CSS y JS llevan un número de versión (`?v=`) para que los navegadores descarguen los cambios nuevos.

## Equipo

| Integrante | Perfil | Enlaces |
|---|---|---|
| **Silvia Costas** | Nivel inicial | [LinkedIn](https://www.linkedin.com/in/silvia-costas/) |
| **Lourdes Pedaci** | Informática, secundaria técnica | [LinkedIn](https://www.linkedin.com/in/lourdes-pedaci/) · [Portfolio](https://lpedaci.github.io/portfolio/) · [GitHub](https://github.com/lpedaci) |
| **Clara Argüello** | Preceptora y economía | [LinkedIn](https://www.linkedin.com/in/clara-arg%C3%BCello-684894367/) |

## Créditos y dependencias

- Tipografías: VT323 y Figtree, vía Google Fonts.
- Avatares: [Micah](https://www.dicebear.com/styles/micah/), de Micah Lanier, licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), servidos por la API de DiceBear (requieren conexión).

## Referencia

Koehler, M. J., & Mishra, P. (2009). What is technological pedagogical content knowledge? *Contemporary Issues in Technology and Teacher Education, 9*(1), 60–70.
