# Sistema de diseño — portafolio de Gerardo (rama rediseno)

**La idea en una línea:** estructura seria de sistemas con alma de calle. Lo que lo contrata se ve creíble;
la personalidad (grafiti, hip-hop, pixel art, lógica) vive en los detalles.

## Lo que NO se hace
Tarjetas de cifra con sombra/degradado, pastillas de color para todo, morado/neón, todo en negritas, íconos de
adorno, donas/velocímetros, títulos que solo nombran el tema, adjetivos de venta. Tampoco grafiti por todos lados
que tire la credibilidad: el grafiti es acento, no fondo.

## Lo que SÍ
- Titular que afirma. Rótulo pixel chico encima nombra la categoría.
- Cifras en filas de texto, valor a la derecha, dígitos tabulares, cada una con fecha. Solo métricas `tecnica` en público.
- Estado con color fijo: verde = en producción, ámbar = prototipo, dim = diseño. El color no decora.
- Evidencia de sistemas confidenciales = diagrama con firma + reconstrucción de UI con datos de ejemplo (etiquetada).
- La personalidad entra como capa: pixel en marcas, acento spray, Kali en pixel, sección "fuera del código".

## Tokens
```
--bg:#121216  --panel:#17171c  --line:#26262e  --ink:#ececef  --mut:#9a9aa4  --dim:#5d5d67
--ok:#7fe08a (en producción)  --amb:#e0b24a (prototipo / valores)  --spray:#e8433a (acento, con medida)
--pix:#c7e070 (verde pixel, rótulos y ojos de Kali)
```
## Tipografía
- **Pixelify Sans:** wordmark (dgsm04, el 04 en spray), rótulos de sección, chips. Solo marcas, nunca cuerpo.
- **Space Grotesk 700:** afirmaciones y títulos. Subrayado spray ocasional, con medida.
- **Inter:** cuerpo (16px/1.6, máx ~65ch).
- **JetBrains Mono:** identificadores, métricas, el tablero `$ systems --status`.

## Motivos con firma
- Tablero de estado tipo consola en el hero (`$ systems --status`).
- Kali en pixel art como marca; vive también en la ⌘K (easter egg del juego de gatos).
- Fondo con retícula sutil. ⌘K para navegar.
- Fuera del código: grafiti, skate, pixel art, ajedrez, hip-hop. Solo arte recortado, nunca fotos con personas, con visto bueno de Gerardo.

## Accesibilidad
Contraste ≥ 4.5:1, foco visible, objetivos 44px, 400px ok, respeta prefers-reduced-motion. El color nunca es la única señal.

## Pendientes de detalle (se hacen por partes)
Kali pixel más fina, texturas/stencil de grafiti, favicon pixel, meter el arte real, afinar el rojo como acento.
