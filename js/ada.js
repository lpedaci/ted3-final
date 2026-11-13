/* Final de recorrido · Ada, la asistente del equipo, como guía flotante.
   Una luz con el logo de Ada que acompaña el recorrido: al tocarla muestra la pista
   de la sala actual, y avisa sola cuando se gana una llave o hay un error de orden.
   Usa los mismos textos del recorrido (js/content.js); no agrega consignas nuevas. */

/* Logo de Ada: cinco nodos unidos, redibujado en vectores. */
const ADA_LOGO = '<svg class="ada-logo" viewBox="30 24 62 68" aria-hidden="true" focusable="false">' +
  '<g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M39 44L61 34L82 47L71 82L51 66L39 44M51 66L82 47"></path>' +
  '</g>' +
  '<g fill="var(--ada-core, #24185C)" stroke="currentColor" stroke-width="4.5">' +
    '<circle cx="61" cy="34" r="6"></circle><circle cx="39" cy="44" r="6"></circle>' +
    '<circle cx="82" cy="47" r="6"></circle><circle cx="51" cy="66" r="6.5"></circle>' +
    '<circle cx="71" cy="82" r="6.5"></circle>' +
  '</g></svg>';

const Ada = (() => {
  let hint = "";
  let timer = null;
  const root = document.createElement("div");
  root.className = "ada";
  root.innerHTML =
    '<div class="ada-bubble" id="ada-bubble" hidden>' +
      '<span class="ada-name">Ada</span>' +
      '<p class="ada-text"></p>' +
    '</div>' +
    '<button type="button" class="ada-orb" aria-label="Ada, asistente del recorrido: ver pista" aria-expanded="false" aria-controls="ada-bubble">' +
      '<span class="ada-glow" aria-hidden="true"></span>' +
      '<span class="ada-spark s1" aria-hidden="true"></span>' +
      '<span class="ada-spark s2" aria-hidden="true"></span>' +
      ADA_LOGO +
      '<span class="ada-alert" aria-hidden="true">!</span>' +
    '</button>';
  document.body.appendChild(root);

  const orb = root.querySelector(".ada-orb");
  const bubble = root.querySelector(".ada-bubble");
  const textEl = root.querySelector(".ada-text");

  function open(text, mood) {
    clearTimeout(timer);
    textEl.textContent = text;
    root.dataset.mood = mood || "hint";
    bubble.hidden = false;
    orb.setAttribute("aria-expanded", "true");
    root.classList.remove("has-hint");
  }
  function close() {
    clearTimeout(timer);
    bubble.hidden = true;
    orb.setAttribute("aria-expanded", "false");
    root.dataset.mood = "";
  }
  /* Mensaje breve que se cierra solo (logros y errores). */
  function say(text, mood) {
    open(text, mood);
    root.classList.remove("cheer", "worry");
    void root.offsetWidth;
    root.classList.add(mood === "error" ? "worry" : "cheer");
    timer = setTimeout(close, 4200);
  }
  /* Pista de la sala actual: Ada titila hasta que la consultan. */
  function setHint(text, isNew) {
    hint = text;
    if (isNew && bubble.hidden) root.classList.add("has-hint");
    if (!bubble.hidden && root.dataset.mood === "hint") textEl.textContent = hint;
  }

  orb.addEventListener("click", () => {
    if (!bubble.hidden && root.dataset.mood === "hint") close();
    else if (hint) open(hint, "hint");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !bubble.hidden) { close(); orb.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (!bubble.hidden && !root.contains(e.target) && !e.target.closest("[data-act], .door")) close();
  });

  return { say, setHint, close };
})();
