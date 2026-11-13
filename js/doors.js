/* Las tres puertas · Puertas y llave dibujadas como pixel art (grilla 24 × 40).
   Cada puerta se genera por código: arco de ladrillo, abertura iluminada y una hoja
   de madera (grupo .leaf-g) que se abre con la misma animación que antes. */

/* Llave pixel (8 × 8) para el inventario y los mensajes de logro. */
const KEY_SVG = '<svg viewBox="0 0 8 8" aria-hidden="true" shape-rendering="crispEdges" fill="currentColor">' +
  '<path d="M1 2h3v1h1v2H4v1H1V5H0V3h1zM2 3v2h1V3zM5 3h3v1H7v1H6V4H5z"></path></svg>';

/* Paletas de 8 bits. */
const PAL = {
  stone: "#5C5C74", stoneHi: "#8C8CA4", joint: "#24243A", key: "#BCBCBC", keyFinal: "#FCA044",
  glow: "#FCD87C", glowHi: "#FCF4D0", glowLo: "#E4A040",
  wood: "#8C5418", woodHi: "#AC7C30", woodLine: "#4C2808",
  woodF: "#6C1C5C", woodFHi: "#94407C", woodFLine: "#32082A",
  strap: "#1C1C1C", brass: "#FCA044", medal: "#140802", medalF: "#12020F", sign: "#FCE0A8"
};

/* Emblemas 9 × 9: "#" = pixel encendido. Se dibujan en crema sobre una placa oscura. */
const EMBLEMS = {
  c: [                 /* sol con rayos */
    "....#....",
    ".#.....#.",
    "...###...",
    "..#####..",
    "#.#####.#",
    "..#####..",
    "...###...",
    ".#.....#.",
    "....#...."
  ],
  d: [                 /* signo de pregunta */
    "..#####..",
    ".##...##.",
    ".##...##.",
    ".....##..",
    "....##...",
    "...##....",
    "...##....",
    ".........",
    "...##...."
  ],
  p: [                 /* brote con dos hojas */
    "......###",
    ".##..####",
    "####.###.",
    ".###.#...",
    "....#....",
    "....#....",
    "....#....",
    "..#####..",
    ".#######."
  ],
  f: [                 /* estrella */
    "....#....",
    "...###...",
    "...###...",
    "#########",
    ".#######.",
    "..#####..",
    "..##.##..",
    ".##...##.",
    ".#.....#."
  ]
};
const LOCK = ["..###..", ".#...#.", "#######", "###.###", "###.###", "#######"];

const W = 24, H = 40, SILL = 39;

/* Convierte un mapa {y: [color por x]} en rects agrupando tramos del mismo color. */
function rowsToRects(grid) {
  let out = "";
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    if (!row) continue;
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      if (!c) { x++; continue; }
      let w = 1;
      while (x + w < row.length && row[x + w] === c) w++;
      out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="1" fill="' + c + '"></rect>';
      x += w;
    }
  }
  return out;
}

function inside(x, y, cx, cy, r, flatFrom) {
  const px = x + .5, py = y + .5;
  if (py >= flatFrom) return px >= cx - r && px <= cx + r;
  return Math.hypot(px - cx, py - cy) <= r;
}

function bitmap(rows, ox, oy, color, grid) {
  rows.forEach((line, j) => {
    [...line].forEach((ch, i) => {
      if (ch === "#") {
        grid[oy + j] = grid[oy + j] || [];
        grid[oy + j][ox + i] = color;
      }
    });
  });
}

function doorSVG(id) {
  const final = id === "f";
  const stone = [], glow = [], leaf = [], lock = [];

  for (let y = 0; y < H; y++) {
    stone[y] = []; glow[y] = []; leaf[y] = [];
    for (let x = 0; x < W; x++) {
      const outer = inside(x, y, 12, 12, 12, 12);
      const inner = inside(x, y, 12, 13.5, 9, 13.5);
      if (y >= SILL) continue;
      if (outer && !inner) {
        /* Ladrillos: juntas horizontales cada 4 filas y verticales alternadas. */
        const course = Math.floor(y / 4);
        const jointH = y % 4 === 3;
        const jointV = (x + (course % 2) * 2) % 4 === 0;
        const edge = !inside(x - 1, y, 12, 12, 12, 12) || !inside(x, y - 1, 12, 12, 12, 12);
        stone[y][x] = jointH || jointV ? PAL.joint : edge ? PAL.stoneHi : PAL.stone;
      }
      if (inner) {
        /* Abertura iluminada (se ve al abrir la puerta). */
        const dc = Math.abs(x + .5 - 12);
        glow[y][x] = dc < 2.5 ? PAL.glowHi : dc < 6 ? PAL.glow : PAL.glowLo;
        /* Hoja de madera: tablones con veta y luz a la izquierda. */
        const base = final ? PAL.woodF : PAL.wood;
        const hi = final ? PAL.woodFHi : PAL.woodHi;
        const line = final ? PAL.woodFLine : PAL.woodLine;
        const plankEdge = x === 7 || x === 12 || x === 16;
        const plankHi = x === 4 || x === 8 || x === 13 || x === 17;
        const grain = (y * 7 + x * 3) % 23 === 0;
        leaf[y][x] = plankEdge ? line : plankHi ? hi : grain ? line : base;
      }
    }
  }
  /* Clave del arco. */
  for (let x = 10; x <= 13; x++) for (let y = 0; y <= 2; y++) stone[y][x] = final ? PAL.keyFinal : PAL.key;
  stone[2][10] = stone[2][13] = PAL.joint;
  /* Umbral. */
  stone[SILL] = Array(W).fill(PAL.stoneHi);

  /* Flejes de hierro con remaches. */
  [25, 34].forEach((sy) => {
    for (let x = 3; x < 21; x++) { leaf[sy][x] = PAL.strap; leaf[sy + 1][x] = PAL.strap; }
    [4, 11, 19].forEach((rx) => { leaf[sy][rx] = PAL.brass; });
  });
  /* Placa oscura con aro de bronce y emblema en crema (alto contraste). */
  for (let y = 9; y <= 23; y++) for (let x = 5; x <= 19; x++) {
    const d = Math.hypot(x + .5 - 12.5, y + .5 - 16.5);
    if (d <= 7) leaf[y][x] = d > 6 ? PAL.brass : (final ? PAL.medalF : PAL.medal);
  }
  bitmap(EMBLEMS[id], 8, 12, PAL.sign, leaf);
  /* Tirador. */
  leaf[29][18] = PAL.brass; leaf[30][18] = PAL.brass; leaf[29][17] = PAL.strap;
  /* Candado de la puerta final, entre los dos flejes. */
  if (final) bitmap(LOCK, 9, 27, PAL.brass, lock);

  return '<svg class="dsvg" viewBox="0 0 24 40" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' +
    '<g class="pool"><rect x="-1" y="39" width="26" height="1" fill="#FCD87C" opacity=".55"></rect>' +
      '<rect x="3" y="40" width="18" height="1" fill="#FCD87C" opacity=".35"></rect></g>' +
    '<g class="surround">' + rowsToRects(stone) + '</g>' +
    '<g class="glow">' + rowsToRects(glow) + '</g>' +
    '<g class="leaf-g">' + rowsToRects(leaf) +
      (final ? '<g class="lock">' + rowsToRects(lock) + '</g>' : "") +
    '</g>' +
  '</svg>';
}
