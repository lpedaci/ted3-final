# Guía de estilo

[← Volver al README](../README.md)

Estética de **aventura de 8 bits**, inspirada en los videojuegos de la era NES. Es un diseño original: no usa personajes, logos ni recursos de juegos existentes. Solo modo oscuro.

Los valores viven como variables CSS al inicio de [`css/styles.css`](../css/styles.css).

## Paleta

| Token | Color | Uso |
|---|---|---|
| `--night-1` | `#04041C` | Fondo principal, franja superior del cielo |
| `--night-2` · `--night-3` · `--night-4` | `#0C0C3C` · `#24185C` · `#44186C` | Franjas del cielo |
| `--black` | `#000000` | Cajas de diálogo, placas, fondos de texto |
| `--white` | `#FCFCFC` | Texto principal y marcos |
| `--cream` | `#FCE0A8` | Títulos destacados, botón principal, notas |
| `--gray` | `#BCBCBC` | Texto secundario y estados |
| `--gray-dark` · `--gray-deep` | `#7C7C7C` · `#3C3C3C` | Bordes de controles y separadores |
| `--orange` | `#FCA044` | Acento: etiquetas, íconos de llave, emblemas |
| `--red` | `#E44028` | Solo decorativo: cursor ▶ y borde de error |
| `--red-text` | `#FFB4A4` | Texto de error y de puerta bloqueada |
| `--green-hi` | `#58D854` | Logros: llaves, puertas abiertas, interruptores |

**Regla:** el rojo puro no se usa para texto (contraste insuficiente sobre el cielo); para texto de alerta se usa `--red-text`.

## Tipografía

| Familia | Uso | Notas |
|---|---|---|
| **VT323** | Títulos, etiquetas, puertas, HUD, botones, Ada | Un solo peso: siempre `font-weight: 400`, sin sombra ni negrita simulada. Tamaños ≈30 % mayores que una sans equivalente. |
| **Figtree** | Párrafos, opciones, textos largos | 16 px base; 17 px en escritorio. |

## Componentes

- **Caja de diálogo.** Fondo negro, marco blanco de 2 px con 2 px de aire y esquinas recortadas en escalón (`--notch`). Se usa en salas, HUD, tarjetas del equipo y voces.
- **Cursor ▶.** Rojo, parpadea por pasos. Marca la puerta activa, la opción seleccionada y el botón principal.
- **Placas de puerta.** Negro con marco gris; blanco en la puerta activa. Nombre arriba y estado abajo.
- **HUD de llaves.** Fijo arriba al desplazarse. Casilleros que se encienden y contador de tres celdas.
- **Opciones de menú.** Borde de 2 px; al pasar o enfocar aparece el cursor ▶; seleccionada con borde blanco.
- **Interruptores.** Palanca cuadrada de dos posiciones; encendida en verde.
- **Botón principal.** Crema con texto negro y ▶ rojo.
- **Créditos del equipo.** Nombres en una línea centrada con íconos sin recuadro.

## Pixel art

- **Puertas** ([`js/doors.js`](../js/doors.js)): grilla de 24 × 40 generada por código. Arco de ladrillo con clave, abertura iluminada, hoja de madera con tablones, flejes con remaches y medallón oscuro con emblema crema de 9 × 9 (sol, pregunta, brote, estrella). La puerta final es violeta, con clave dorada y candado.
- **Avatares:** PNG de 32 px ampliados con `image-rendering: pixelated`.
- **Cielo:** franjas de color, estrellas cuadradas y sierras con líneas de monitor.

## Ada

- Luz azul que flota abajo a la derecha, con halo que respira y chispas que la orbitan.
- Logo original de Ada (nodos conectados) en azul noche.
- Aviso de pista: burbuja redonda amarilla, del tono de la luz de las puertas.
- Cuadro de diálogo con marco celeste (pista), verde (logro) o coral (error).

## Movimiento

- Animaciones **por pasos** (`steps()`), coherentes con el pixel art: aparición de salas, apertura de puertas, llaves, estallido de píxeles.
- Movimientos suaves solo en Ada (flotar, respirar), para diferenciarla como personaje.
- Con `prefers-reduced-motion: reduce` se desactivan todas las animaciones y partículas.

## Puntos de corte

| Ancho | Ajustes |
|---|---|
| ≤ 380 px | Etiquetas de puertas y HUD más compactos. |
| ≤ 599 px | Selección de personajes en columna, HUD en una línea, menos relleno en salas. |
| ≥ 600 px | Tarjetas del equipo en fila, voces en tres columnas, textos de puertas más grandes. |
| ≥ 1024 px | Contenedor de 1040 px, puertas de hasta 170 px, cuerpo de texto a 17 px. |
| Horizontal bajo (≤ 480 px de alto) | HUD no fijo y puertas más chicas. |
