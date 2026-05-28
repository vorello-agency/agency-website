# Design Tokens

Fuente operativa de tokens visuales para Vorello.

## Colores base (brand-brief)

- Carbon Black: `#0D0F11`
- Graphite Metal: `#1A1D21`
- Steel Grey: `#2A2E33`
- Neon Blue: `#2D8FFF`
- Electric Violet: `#7B4CFF`
- Chrome Highlight: `#E3E7EE`
- Chrome Deep: `#5A6270`

## Semántica recomendada

- `--bg-primary`: fondos principales oscuros.
- `--bg-secondary`: bloques/superficies secundarias.
- `--text-primary`: texto principal de alta legibilidad.
- `--text-secondary`: texto de apoyo.
- `--accent-blue`: acento principal de interacción.
- `--accent-violet`: acento complementario premium.
- `--border-subtle`: bordes suaves.

## Tipografía

- Headings: familia display/condensada definida por proyecto.
- Body: sans moderna legible para lectura continua.
- Jerarquía consistente: `h1 > h2 > h3` sin saltos injustificados.

## Spacing (escala sugerida)

- Base: múltiplos de 4 (`4, 8, 12, 16, 24, 32, 48, 64`).
- Secciones: padding vertical amplio en desktop, compacto en mobile.

## Radius y bordes

- Radio base: suave (evitar extremos).
- Bordes: discretos, contraste suficiente sobre fondos oscuros.

## Sombras y profundidad

- Sombras sutiles, no difusas en exceso.
- Priorizar contraste por capas y bordes sobre blur agresivo.

## Motion tokens

- Duración corta: `120ms–220ms` (hover/feedback).
- Duración media: `280ms–480ms` (reveal/entradas).
- Easing principal: curva suave, salida limpia.
- Animar preferentemente `transform` y `opacity`.

## Reglas

- No introducir colores arbitrarios sin justificación.
- Evitar variaciones aisladas por componente.
- Si se añade token nuevo: documentarlo aquí antes de escalar uso.
