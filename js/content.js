/* Final de recorrido · Contenido textual del recorrido (no modificar el texto). */

/* Todo el texto vive en este bloque. */
const EQUIPO = [
  { nombre: "Silvia", rol: "Nivel inicial" },
  { nombre: "Lourdes", rol: "Informática, secundaria técnica" },
  { nombre: "Clara", rol: "Preceptora y economía" }
];

const T = {
  entrada: {
    titulo: "Cuatro puertas, tres llaves",
    texto: "Las tres primeras tienen una prueba corta y guardan algo de cada integrante del equipo. Cada puerta te da una llave, y con las tres se abre la última. Podés entrar en el orden que quieras.",
    pista: "Tocá una puerta para empezar."
  },
  c: {
    nombre: "Lo que creíamos",
    llave: "Certezas",
    pregunta: "Cada integrante trae una certeza con la que empezó a enseñar. Tocá la que más se parecía a la tuya.",
    hoyNota: "Hoy la escribimos así",
    ganada: "Llave conseguida: revisaste una certeza.",
    items: [
      { quien: 0, antes: "La tecnología no tiene lugar en la sala de nivel inicial.", hoy: "La tecnología entra a la sala como una forma más de explorar, jugar y contar lo que pasa." },
      { quien: 1, antes: "Es muy difícil que otros docentes vean el potencial de la informática en su área si la miran con miedo o recelo.", hoy: "El recelo no se vence con demos, se acompaña. Primero entender para qué cambiar, después animarse a probar con un problema real de su propia materia." },
      { quien: 2, antes: "Evaluar es medir lo que quedó.", hoy: "Evaluar es mirar el proceso y devolver algo que sirva para seguir." }
    ]
  },
  d: {
    nombre: "Lo que dudamos",
    llave: "Dudas",
    pregunta: "Cada integrante vivió un momento que le movió el piso. Tocalos en el orden en que pasaron.",
    error: "Ese vino más tarde. Probá con otro.",
    cierre: "Ahí entendimos que la duda era la parte más útil de la clase.",
    ganada: "Llave conseguida: armaste el momento del quiebre.",
    frags: [
      { quien: 0, tag: "Foro de la Unidad 1", texto: "Leí la consigna tres veces. No entendía por qué no pedía una respuesta correcta." },
      { quien: 1, tag: "Taller de chatbots", texto: "Nuestra bot Ada respondía todo. La cátedra pidió un bot que guiara sin dar la respuesta, y tuve que repensarla desde cero." },
      { quien: 2, tag: "Borrador de planificación", texto: "Taché la actividad entera y volví a empezar, esta vez con una pregunta primero." }
    ],
    ordenVisible: [2, 0, 1]
  },
  p: {
    nombre: "Lo que hacemos hoy",
    llave: "Práctica",
    pregunta: "Cada integrante cambió algo en su práctica. Dá vuelta cada interruptor para verlo.",
    ganada: "Llave conseguida: viste tres cambios en el aula.",
    items: [
      { quien: 0, label: "Planifico", antes: "Armaba las propuestas desde el tema del mes.", hoy: "Parto de lo que les intriga a las niñas y los niños y después elijo la herramienta." },
      { quien: 1, label: "Integro IA", antes: "Mostraba herramientas de IA y cómo usarlas.", hoy: "Diseño para que la IA haga pensar: un coach que pregunta en vez de responder y un escape room donde hay que detectar fuentes inventadas." },
      { quien: 2, label: "Acompaño", antes: "Respondía las dudas en voz alta, para todos juntos.", hoy: "Abro espacios (foro, audios, trabajo en grupo) donde cada estudiante pregunta a su ritmo." }
    ]
  },
  f: {
    nombre: "La respuesta",
    cerrada: "Todavía está cerrada.",
    lista: "Tenés las tres llaves.",
    abrir: "Abrir la puerta",
    pregunta: "¿Qué es la LTE?",
    respuesta: "La LTE es aprender a decidir antes de elegir. Tecno 3 nos enseñó que la tecnología no transforma un aula: la transforman las decisiones pedagógicas de quien enseña.",
    marcoTitulo: "Lo que nos guió",
    marco: "\u201CThere is no single technological solution that applies for every teacher, every course, or every view of teaching\u201D (Koehler &amp; Mishra, 2009, p. 66).",
    recorridoTitulo: "El recorrido en tres líneas",
    recorrido: [
      { puerta: "Lo que creíamos", texto: "Que la tecnología no era para la sala, que era casi imposible mostrar el potencial de la informática a quien la mira con miedo y que evaluar era medir lo que quedó." },
      { puerta: "Lo que dudamos", texto: "Una consigna sin respuesta correcta, un chatbot que respondía de más y una planificación tachada." },
      { puerta: "Lo que hacemos hoy", texto: "Partimos de una pregunta, usamos la IA para que el otro piense y abrimos espacios para preguntar a cada ritmo." }
    ],
    vocesTitulo: "Qué es la LTE para cada integrante",
    voces: [
      "Un lugar donde aprendí a preguntar antes de explicar.",
      "La carrera que me mostró que la informática vale cuando responde a la pregunta de cada área.",
      "La razón por la que hoy me animo a rehacer mi clase."
    ],
    invitacion: "Ahora te toca a vos",
    campo: "¿Qué es la LTE para vos?",
    placeholder: "Escribí tu frase acá",
    copiar: "Copiar mi frase",
    ok: "Frase copiada.",
    fallo: "Tu frase quedó seleccionada. Copiala con el teclado.",
    vacio: "Escribí tu frase primero.",
    nota: "Tu frase queda en esta pantalla. Copiala y compartila donde quieras."
  }
};
