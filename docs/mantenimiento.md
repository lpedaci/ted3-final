# Mantenimiento

[← Volver al README](../README.md)

## Ver el sitio localmente

```bash
python -m http.server 5173
```

Abrir `http://localhost:5173`. También funciona abriendo `index.html` directamente, porque los scripts son clásicos y no requieren compilación.

## Editar textos

Todo el contenido del recorrido está en [`js/content.js`](../js/content.js):

- `EQUIPO`: nombre y rol de cada integrante, en el orden en que aparecen.
- `T.entrada`: título, texto y pista de bienvenida.
- `T.c`, `T.d`, `T.p`: las tres puertas (nombre, llave, consigna, ítems y mensaje de logro).
- `T.f`: la puerta final (respuesta, cita, recorrido, voces e invitación).

Los textos de Ada que no salen del recorrido (su presentación) están en `ADA_INTRO`, dentro de [`js/ada.js`](../js/ada.js). Los estados de las puertas («Abierta», «Sin abrir», «Faltan N llaves») están en [`js/app.js`](../js/app.js).

## Actualizar la versión de CSS y JS

Los enlaces de `index.html` llevan un número de versión para que los navegadores descarguen los cambios nuevos:

```html
<link rel="stylesheet" href="css/styles.css?v=27">
<script src="js/app.js?v=27" defer></script>
```

Cada vez que cambie un archivo de `css/` o `js/`, subir ese número en **todos** los enlaces de `index.html`.

## Regenerar la imagen para redes y los íconos

Las fuentes están en `tools/` y usan las mismas puertas y tipografías del sitio.

```bash
chrome --headless=new --hide-scrollbars --window-size=1200,630 --screenshot=assets/og-card.png tools/og-card.html
```

```bash
chrome --headless=new --hide-scrollbars --window-size=512,512 --screenshot=assets/icon-512.png tools/app-icon.html
```

A partir de `icon-512.png` se derivan `icon-192.png` (192 px) y `apple-touch-icon.png` (180 px).

Después de cambiar la og-card, revalidar el enlace en el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/) para que las redes olviden la vista previa anterior.

## Publicar

El sitio se publica con **GitHub Pages** desde la rama `main`, carpeta raíz.

```bash
git add -A
git commit -m "Describe el cambio"
git push origin main
```

La versión nueva queda en línea en uno o dos minutos en https://lpedaci.github.io/ted3-final/.

## Buscadores

- Si cambia la URL del sitio, actualizar la canónica, `og:url`, `og:image` y `twitter:image` en `index.html`, además de `sitemap.xml`, `robots.txt` y el JSON-LD.
- Al publicar cambios importantes, actualizar `<lastmod>` en `sitemap.xml`.
- La carpeta `tools/` está excluida en `robots.txt`.

## Dependencias externas

| Recurso | Origen | Si falla |
|---|---|---|
| Tipografías VT323 y Figtree | Google Fonts | Se usan fuentes del sistema; el sitio sigue funcionando. |
| Avatares del equipo | API de DiceBear | Se ve el recuadro del avatar vacío; el resto funciona. |
