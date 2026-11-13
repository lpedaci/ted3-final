# Las tres puertas · ¿Qué es la LTE?

Recorrido interactivo del Equipo N.º 7 (Enlace Pedagógico) para el desafío creativo de cierre de Tecnología Educativa III (Licenciatura en Tecnología Educativa, UTN, 2026).

Cuatro puertas, tres llaves: cada una de las tres primeras tiene una prueba corta. Con las tres llaves se abre la última, que reúne la respuesta del equipo.

## Estética

Aventura de 8 bits, estilo de la era NES: paleta limitada, cajas de diálogo negras con marco blanco, puertas en pixel art y cursor ▶ de selección. Diseño original, sin recursos de juegos existentes.

## Estructura

```
.
├── index.html          Página principal (marcado, escena de fondo, contenedores)
├── css/
│   └── styles.css      Estilos 8 bits: paleta, escena, HUD, puertas, salas, responsive
├── js/
│   ├── content.js      Todo el texto del recorrido (EQUIPO y T)
│   ├── avatars.js      Avatares del equipo (estilo Micah vía DiceBear)
│   ├── doors.js        Puertas y llave en pixel art (SVG generado por código)
│   └── app.js          Estado, render de cada sala e interacción
├── assets/
│   └── favicon.svg     Ícono de la pestaña (llave pixel)
└── README.md
```

Los scripts son clásicos (`defer`) y se cargan en orden, así que el sitio funciona abriendo `index.html` directamente, sin servidor.

## Cómo verlo

- Abrí `index.html` en el navegador, o
- servilo localmente, por ejemplo con `npx serve .` o `python -m http.server`.

Para publicarlo alcanza con subir la carpeta completa a cualquier hosting estático (GitHub Pages, Netlify, etc.).

## Editar textos

Todo el texto está en `js/content.js`. Las demás capas no contienen contenido textual del recorrido, salvo los estados de las puertas en `js/app.js`.

## Accesibilidad

- Navegable con teclado; foco visible en todos los controles.
- Al cambiar de sala, el foco pasa al título de la sala.
- Los logros y errores se anuncian a lectores de pantalla en una región `aria-live`.
- Respeta `prefers-reduced-motion`: sin animaciones ni partículas.

## Dependencias externas

- Tipografías: VT323 (títulos y etiquetas) y Figtree (texto) (Google Fonts).
- Avatares: [Micah](https://www.dicebear.com/styles/micah/) de Micah Lanier, licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), servidos por la API de DiceBear (requiere conexión).

## Referencia

Koehler, M. J., & Mishra, P. (2009). What is technological pedagogical content knowledge? *Contemporary Issues in Technology and Teacher Education, 9*(1), 60–70.
