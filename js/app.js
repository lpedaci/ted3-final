/* Las tres puertas · Estado, render de salas e interacción. */

const S = {
  room: "entrada",
  c: { pick: null },
  d: { seq: [], err: false, shake: null },
  p: { on: [false, false, false] },
  f: { opened: false, frase: "" }
};

const $ = (s) => document.querySelector(s);
const doorsEl = $("#doors");
const roomEl = $("#room");
const keysEl = $("#keys");
const hudEl = $("#hud");

$("#team").innerHTML = EQUIPO.map((m, i) =>
  '<li>' + avatarSVG(i) + '<span class="who"><strong>' + m.nombre + '</strong><span>' + m.rol + '</span></span></li>'
).join("");

const DOORS = [
  { id: "c", name: T.c.nombre },
  { id: "d", name: T.d.nombre },
  { id: "p", name: T.p.nombre },
  { id: "f", name: T.f.nombre }
];

doorsEl.innerHTML = DOORS.map((d) =>
  '<button type="button" class="door" data-door="' + d.id + '">' +
  doorSVG(d.id) +
  '<span class="door-label">' + d.name + '</span>' +
  '<span class="door-state"></span></button>'
).join("");

keysEl.innerHTML = '<span class="keys-title">Llaves</span>' +
  ["c", "d", "p"].map((id) =>
    '<span class="key" data-key="' + id + '" data-got="false">' + KEY_SVG + T[id].llave + '</span>'
  ).join("");

function keys() {
  return { c: S.c.pick !== null, d: S.d.seq.length === 3, p: S.p.on.every(Boolean) };
}
function gotCount() { return Object.values(keys()).filter(Boolean).length; }
function faltan(n) { return n === 1 ? "Falta 1 llave" : "Faltan " + n + " llaves"; }
function gotLine(text) { return '<p class="got">' + KEY_SVG + '<span>' + text + '</span></p>'; }

function updateChrome() {
  const k = keys();
  const n = gotCount();
  doorsEl.querySelectorAll(".door").forEach((b) => {
    const id = b.dataset.door;
    let state, label;
    if (id === "f") {
      if (S.f.opened) { state = "open"; label = "Abierta"; }
      else if (n < 3) { state = "locked"; label = faltan(3 - n); }
      else { state = "closed"; label = "Lista para abrir"; }
    } else {
      state = k[id] ? "open" : "closed";
      label = k[id] ? "Abierta" : "Sin abrir";
    }
    b.dataset.state = state;
    b.querySelector(".door-state").textContent = label;
    if (S.room === id) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
  });
  hudEl.dataset.count = String(n);
  keysEl.querySelectorAll(".key").forEach((el) => {
    const id = el.dataset.key;
    const was = el.dataset.got === "true";
    el.dataset.got = String(k[id]);
    if (k[id] && !was && booted) {
      el.classList.remove("pop");
      void el.offsetWidth;
      el.classList.add("pop");
      burst(el);
      announce(T[id].ganada);
    }
  });
}

/* Estallido de píxeles decorativo (se omite con movimiento reducido). */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function burst(target, amount) {
  if (reduceMotion.matches || !target) return;
  const r = target.getBoundingClientRect();
  const box = document.createElement("div");
  box.className = "burst";
  box.setAttribute("aria-hidden", "true");
  box.style.left = (r.left + r.width / 2) + "px";
  box.style.top = (r.top + r.height / 2) + "px";
  const colors = ["#FCA044", "#FCE0A8", "#E44028", "#FCFCFC", "#58D854"];
  const total = amount || 14;
  for (let i = 0; i < total; i++) {
    const a = (Math.PI * 2 * i) / total + Math.random() * .4;
    const d = 40 + Math.random() * (total > 20 ? 120 : 40);
    const p = document.createElement("i");
    p.style.setProperty("--x", Math.round(Math.cos(a) * d) + "px");
    p.style.setProperty("--y", Math.round(Math.sin(a) * d) + "px");
    p.style.setProperty("--c", colors[i % colors.length]);
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 900);
}

let booted = false;
const liveEl = $("#sr-live");
function announce(text) {
  liveEl.textContent = "";
  setTimeout(() => { liveEl.textContent = text; }, 60);
}
function focusTitle() {
  const h = $("#room-title");
  if (h) h.focus({ preventScroll: true });
}

function roomEntrada() {
  return '<h2 id="room-title" tabindex="-1">' + T.entrada.titulo + '</h2><p>' + T.entrada.texto + '</p><p class="note">' + T.entrada.pista + '</p>';
}

function roomC() {
  const p = S.c.pick;
  const choices = T.c.items.map((it, i) =>
    '<button type="button" class="choice" data-act="pick" data-i="' + i + '" data-f="pick' + i + '" aria-pressed="' + (p === i) + '">' +
    '<span class="tag">' + EQUIPO[it.quien].nombre + '</span><span class="choice-text">' + it.antes + '</span></button>'
  ).join("");
  let reveal = "";
  if (p !== null) {
    reveal = '<div class="reveal"><span class="tag">' + EQUIPO[T.c.items[p].quien].nombre + '</span><p class="note">' + T.c.hoyNota + '</p><p class="after">' + T.c.items[p].hoy + '</p></div>' + gotLine(T.c.ganada);
  }
  return '<h2 id="room-title" tabindex="-1">' + T.c.nombre + '</h2><p>' + T.c.pregunta + '</p><div class="choices">' + choices + '</div>' + reveal;
}

function roomD() {
  const frags = T.d.ordenVisible.map((i) => {
    const f = T.d.frags[i];
    const pos = S.d.seq.indexOf(i);
    const picked = pos >= 0;
    const shake = S.d.shake === i ? " shake" : "";
    return '<button type="button" class="frag' + shake + '" data-act="frag" data-i="' + i + '" data-f="frag' + i + '" aria-pressed="' + picked + '">' +
      '<span class="badge" data-on="' + picked + '">' + (picked ? pos + 1 : "") + '</span>' +
      '<span><span class="tag">' + EQUIPO[f.quien].nombre + ' · ' + f.tag + '</span>' + f.texto + '</span></button>';
  }).join("");
  S.d.shake = null;
  let tail = '<p class="msg">' + (S.d.err ? T.d.error : "") + '</p>';
  if (S.d.seq.length === 3) {
    tail = '<div class="reveal"><p class="note">' + T.d.cierre + '</p></div>' + gotLine(T.d.ganada);
  }
  return '<h2 id="room-title" tabindex="-1">' + T.d.nombre + '</h2><p>' + T.d.pregunta + '</p><div class="choices">' + frags + '</div>' + tail;
}

function roomP() {
  const rows = T.p.items.map((it, i) => {
    const on = S.p.on[i];
    return '<button type="button" class="sw" role="switch" aria-checked="' + on + '" data-act="sw" data-i="' + i + '" data-f="sw' + i + '">' +
      '<span class="sw-text"><span class="tag">' + EQUIPO[it.quien].nombre + ' · ' + it.label + ' · ' + (on ? "Hoy" : "Antes") + '</span>' +
      '<span class="' + (on ? "strong" : "soft") + '">' + (on ? it.hoy : it.antes) + '</span></span>' +
      '<span class="track" aria-hidden="true"><span class="thumb"></span></span></button>';
  }).join("");
  const done = S.p.on.every(Boolean) ? gotLine(T.p.ganada) : "";
  return '<h2 id="room-title" tabindex="-1">' + T.p.nombre + '</h2><p>' + T.p.pregunta + '</p><div class="switches">' + rows + '</div>' + done;
}

function resumenF() {
  const rec = T.f.recorrido.map((r) =>
    '<li><span class="tag">' + r.puerta + '</span><span>' + r.texto + '</span></li>').join("");
  const voces = T.f.voces.map((v, i) =>
    '<div class="voice"><span class="tag">' + EQUIPO[i].nombre + ' · ' + EQUIPO[i].rol + '</span><p>' + v + '</p></div>').join("");
  return '<div class="summary"><h3 class="tag">' + T.f.marcoTitulo + '</h3><p class="fine">' + T.f.marco + '</p></div>' +
    '<div class="summary"><h3 class="tag">' + T.f.recorridoTitulo + '</h3><ul class="recap">' + rec + '</ul></div>' +
    '<div class="summary"><h3 class="tag">' + T.f.vocesTitulo + '</h3><div class="voices">' + voces + '</div></div>';
}

function roomF() {
  const n = gotCount();
  if (n < 3) {
    return '<h2 id="room-title" tabindex="-1">' + T.f.nombre + '</h2><p>' + T.f.cerrada + ' ' + faltan(3 - n) + '.</p>';
  }
  if (!S.f.opened) {
    return '<h2 id="room-title" tabindex="-1">' + T.f.nombre + '</h2><p>' + T.f.lista + '</p><button type="button" class="primary" data-act="open" data-f="open">' + T.f.abrir + '</button>';
  }
  return '<h2 id="room-title" tabindex="-1">' + T.f.pregunta + '</h2>' +
    '<blockquote class="answer">' + T.f.respuesta + '</blockquote>' + resumenF() +
    '<p class="note">' + T.f.invitacion + '</p>' +
    '<div class="field"><label for="mi-frase">' + T.f.campo + '</label>' +
    '<textarea id="mi-frase" rows="3" placeholder="' + T.f.placeholder + '"></textarea></div>' +
    '<button type="button" class="primary" data-act="copy" data-f="copy">' + T.f.copiar + '</button>' +
    '<p class="msg" id="copy-msg" role="status"></p>' +
    '<p class="fine">' + T.f.nota + '</p>';
}

function renderRoom() {
  const active = document.activeElement;
  const focusId = active && active.dataset ? active.dataset.f : null;
  const view = { entrada: roomEntrada, c: roomC, d: roomD, p: roomP, f: roomF }[S.room];
  roomEl.innerHTML = view();
  if (S.room === "f" && S.f.opened) {
    const ta = $("#mi-frase");
    if (ta) ta.value = S.f.frase;
  }
  if (focusId) {
    const el = roomEl.querySelector('[data-f="' + focusId + '"]');
    if (el) el.focus({ preventScroll: true });
  }
}

function refresh() { renderRoom(); updateChrome(); }

doorsEl.addEventListener("click", (e) => {
  const b = e.target.closest(".door");
  if (!b) return;
  const changed = S.room !== b.dataset.door;
  S.room = b.dataset.door;
  refresh();
  if (changed) {
    roomEl.classList.remove("enter");
    void roomEl.offsetWidth;
    roomEl.classList.add("enter");
  }
  focusTitle();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  roomEl.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
});

roomEl.addEventListener("click", (e) => {
  const t = e.target.closest("[data-act]");
  if (!t) return;
  const a = t.dataset.act;
  const i = Number(t.dataset.i);
  if (a === "pick") {
    S.c.pick = i;
  } else if (a === "frag") {
    if (S.d.seq.includes(i)) return;
    if (i === S.d.seq.length) { S.d.seq.push(i); S.d.err = false; }
    else { S.d.err = true; S.d.shake = i; announce(T.d.error); }
  } else if (a === "sw") {
    S.p.on[i] = !S.p.on[i];
  } else if (a === "open") {
    S.f.opened = true;
  } else if (a === "copy") {
    copyFrase();
    return;
  }
  refresh();
  if (a === "open") {
    roomEl.classList.remove("enter");
    void roomEl.offsetWidth;
    roomEl.classList.add("enter");
    focusTitle();
    burst(doorsEl.querySelector('[data-door="f"] .dsvg'), 36);
  }
});

roomEl.addEventListener("input", (e) => {
  if (e.target && e.target.id === "mi-frase") S.f.frase = e.target.value;
});

function copyFrase() {
  const ta = $("#mi-frase");
  const msg = $("#copy-msg");
  const text = (ta.value || "").trim();
  if (!text) { msg.textContent = T.f.vacio; ta.focus(); return; }
  const fallback = () => { ta.select(); msg.textContent = T.f.fallo; };
  try {
    navigator.clipboard.writeText(text).then(() => { msg.textContent = T.f.ok; }, fallback);
  } catch (_) {
    fallback();
  }
}

refresh();
booted = true;
