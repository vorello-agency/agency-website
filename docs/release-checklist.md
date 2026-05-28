# Release Checklist

Checklist mínima antes de considerar una entrega lista.

## Build y calidad técnica

- [ ] `npm run build` sin errores.
- [ ] `npm run lint` sin errores relevantes.
- [ ] `npm run typecheck` sin errores de tipos.

## UI/UX

- [ ] Responsive correcto en mobile/tablet/desktop.
- [ ] Sin overflow horizontal.
- [ ] Jerarquía visual clara en todas las secciones.
- [ ] Componentes reutilizables (sin duplicación innecesaria).

## Marca y copy

- [ ] Copy consistente con `docs/brand-brief.md`.
- [ ] Tono sobrio, premium y directo.
- [ ] CTAs claros y coherentes.

## Motion

- [ ] GSAP + ScrollTrigger usados con criterio (si aplica).
- [ ] Sin animación decorativa excesiva.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Sin impacto evidente en interacción o legibilidad.

## Accesibilidad

- [ ] Semántica HTML correcta.
- [ ] Focus visible en elementos interactivos.
- [ ] Contraste suficiente (mínimo AA).
- [ ] Inputs con label y errores asociados (si aplica).

## Performance

- [ ] Imágenes optimizadas.
- [ ] Sin bundles innecesarios por features no usadas.
- [ ] Sin layout shifts notorios en carga.

## Verificación final

- [ ] Revisión visual rápida de rutas principales.
- [ ] No quedan TODO críticos para la entrega.
- [ ] Cambios documentados cuando corresponde.
