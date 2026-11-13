/* Final de recorrido · Ada, la asistente del equipo, como guía flotante.
   Ada es la asistente que creó el equipo Enlace Pedagógico para la cursada
   «IA Generativa en el Aula». Acá acompaña el recorrido: se presenta la primera vez,
   al tocarla muestra la pista de la sala actual y avisa sola cuando se gana una
   llave o hay un error de orden. Las pistas usan los textos del recorrido. */

/* Logo original de Ada (nodos conectados), tal como en la asistente de la cursada. */
const ADA_LOGO = '<svg class="ada-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
  '<line x1="5.5" y1="6.5" x2="12" y2="4.5"/><line x1="12" y1="4.5" x2="18.5" y2="8"/>' +
  '<line x1="5.5" y1="6.5" x2="9" y2="14"/><line x1="9" y1="14" x2="18.5" y2="8"/>' +
  '<line x1="9" y1="14" x2="15.5" y2="18.5"/><line x1="18.5" y1="8" x2="15.5" y2="18.5"/>' +
  '<circle cx="5.5" cy="6.5" r="1.7" fill="currentColor" stroke="none"/>' +
  '<circle cx="12" cy="4.5" r="1.7" fill="var(--ada-core, #B8E8FC)"/>' +
  '<circle cx="18.5" cy="8" r="1.7" fill="currentColor" stroke="none"/>' +
  '<circle cx="9" cy="14" r="1.7" fill="var(--ada-core, #B8E8FC)"/>' +
  '<circle cx="15.5" cy="18.5" r="1.7" fill="var(--ada-core, #B8E8FC)"/></svg>';

/* Presentación de Ada (datos de la asistente de la cursada). */
const ADA_INTRO = "Hola, soy Ada, la asistente que creó el equipo Enlace Pedagógico (Clara, Silvia y Lourdes) " +
  "para la cursada «IA Generativa en el Aula». Me llamo así por Ada Lovelace, reconocida como la primera " +
  "persona programadora de la historia. En este recorrido te doy pistas: tocame cuando las necesites.";

const Ada = (() => {
  let hint = "";
  let timer = null;
  const root = document.createElement("div");
  root.className = "ada";
  root.innerHTML =
    '<div class="ada-bubble" id="ada-bubble" hidden>' +
      '<span class="ada-name">Ada <small>Asistente de Enlace Pedagógico</small></span>' +
      '<p class="ada-intro" hidden></p>' +
      '<p class="ada-text"></p>' +
    '</div>' +
    '<button type="button" class="ada-orb" aria-label="Ada, la asistente que creó el equipo: ver pista" aria-expanded="false" aria-controls="ada-bubble">' +
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
  const introEl = root.querySelector(".ada-intro");
  introEl.textContent = ADA_INTRO;

  function open(text, mood) {
    clearTimeout(timer);
    textEl.textContent = text;
    introEl.hidden = mood !== "intro";
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
    if (!bubble.hidden && /hint|intro/.test(root.dataset.mood)) textEl.textContent = hint;
  }

  /* Primera visita de la sesión: Ada se presenta sola y después se retira. */
  function intro() {
    let seen = false;
    try { seen = sessionStorage.getItem("ada-intro") === "1"; } catch (_) {}
    if (seen) return;
    try { sessionStorage.setItem("ada-intro", "1"); } catch (_) {}
    setTimeout(() => {
      if (!bubble.hidden) return;
      open(hint, "intro");
      timer = setTimeout(() => { if (root.dataset.mood === "intro") close(); }, 12000);
    }, 1200);
  }
  /* Mientras se lee (mouse o foco encima), no se cierra sola. */
  root.addEventListener("pointerenter", () => clearTimeout(timer));
  root.addEventListener("focusin", () => clearTimeout(timer));

  orb.addEventListener("click", () => {
    if (!bubble.hidden && /hint|intro/.test(root.dataset.mood)) close();
    else if (hint) open(hint, "hint");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !bubble.hidden) { close(); orb.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (!bubble.hidden && !root.contains(e.target) && !e.target.closest("[data-act], .door")) close();
  });

  return { say, setHint, close, intro };
})();
