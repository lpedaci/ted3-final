# Accesibilidad y QA

[← Volver al README](../README.md)

## Criterios aplicados

### Percepción

- **Contraste** de texto en nivel AA o superior. Valores medidos sobre el cielo nocturno:

  | Texto | Contraste |
  |---|---|
  | Blanco `#FCFCFC` | más de 18:1 |
  | Crema `#FCE0A8` | 14,4:1 |
  | Coral de error `#FFB4A4` | 10,9:1 |
  | Gris secundario `#BCBCBC` | más de 9:1 |

- **Textos sobre la escena** con fondo propio (placas, cajas o fondo translúcido) para que las estrellas y las montañas no compitan con la lectura.
- **Tipografía legible:** VT323 de trazo fino, sin sombra ni negrita simulada, en tamaños amplios; Figtree para textos largos.
- **No depender solo del color:** los errores combinan texto, borde y movimiento; los estados de las puertas se escriben.
- `lang="es"` en todas las páginas.

### Operación

- Navegación completa con **teclado** y foco visible (contorno discontinuo blanco) en todos los controles.
- Al cambiar de sala, el **foco pasa al título** de la sala.
- **Áreas táctiles** de 44 px como mínimo (opciones, botones, enlaces del pie).
- Ada se abre y se cierra con teclado; **Escape** cierra su cuadro y devuelve el foco.
- Sin límites de tiempo para responder; los mensajes automáticos de Ada no se cierran mientras el puntero o el foco están encima.

### Comprensión y lectores de pantalla

- Logros y errores anunciados en una región `aria-live`.
- Interruptores con `role="switch"` y `aria-checked`; opciones con `aria-pressed`.
- Grupos con nombre: puertas, llaves, equipo y perfiles.
- Íconos decorativos con `aria-hidden`; enlaces de íconos con `aria-label` («LinkedIn de Silvia Costas»).
- Botón de Ada con nombre descriptivo y `aria-expanded`.

### Movimiento

- `prefers-reduced-motion: reduce` desactiva animaciones, partículas y el flotar de Ada.

## Pruebas realizadas

| Área | Verificación |
|---|---|
| Recorrido completo | Las cuatro puertas, las tres llaves, el error de secuencia, la apertura final y la copia de la frase, sin errores en consola. |
| Tamaños de pantalla | 320 px, 375 px, tablet 768 px, escritorio 1366 px y celular en horizontal, sin desplazamiento lateral. |
| Ancho de textos | Medición de cada sala: los textos ocupan el ancho de su contenedor en todos los tamaños. |
| Ada | Presentación en primera visita, pista a demanda, reacción a llaves y errores, cierre con Escape. |
| Textos | El contenido de `js/content.js` se comparó con el original y se mantiene idéntico. |
| Publicación | Todos los archivos responden en GitHub Pages: página, estilos, scripts, íconos, og-card, `robots.txt`, `sitemap.xml`, manifiesto y 404. |
| Metadatos | Título, descripción, canónica, Open Graph, tarjeta de X y JSON-LD válido. |

## Lista de control antes de publicar

- [ ] Recorrer las cuatro puertas y abrir la final.
- [ ] Probar en celular (375 px) y escritorio: sin desplazamiento lateral.
- [ ] Navegar con Tab, Enter y Escape.
- [ ] Revisar la consola del navegador: sin errores.
- [ ] Subir el número de versión `?v=` si cambiaron CSS o JS (ver [Mantenimiento](mantenimiento.md)).
- [ ] Si cambió la og-card, revalidar el enlace en el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/).
