# Skills Index

Guía rápida para elegir skills en este repo.

## Cómo usar este índice

- Si la tarea es visual/UI completa: empezar por `frontend-design`.
- Si la tarea toca motion avanzado: complementar con `gsap/*`.
- Si la tarea toca reglas de framework: usar `next-best-practices` + `nextjs-app-router-patterns`.
- Si la tarea toca calidad no-funcional: usar `accessibility-a11y` y/o `web-performance-optimization`.

## Mapa de skills

### Diseño y UI

- `frontend-design`
  - Cuándo: diseño/implementación de secciones premium de Vorello.
  - Foco: dirección visual, jerarquía, motion GSAP-first, DoD UI.

- `tailwind-design-system`
  - Cuándo: crear/estandarizar componentes, tokens y variantes.
  - Foco: sistema de diseño escalable en Tailwind v4.

- `aceternity-ui`
  - Cuándo: integrar/adaptar componentes de Aceternity.
  - Foco: integración segura en Next.js + Tailwind, sin romper consistencia visual.

### Motion (GSAP)

- `gsap/gsap-core`
  - Cuándo: tweens base, easing, stagger, matchMedia.
  - Foco: API core de GSAP.

- `gsap/gsap-timeline`
  - Cuándo: secuencias complejas y orquestación de pasos.
  - Foco: timelines, labels, position parameter.

- `gsap/gsap-scrolltrigger`
  - Cuándo: animación ligada a scroll, pin, scrub.
  - Foco: configuración de ScrollTrigger y patrones scroll-driven.

- `gsap/gsap-react`
  - Cuándo: implementar GSAP en React/Next.
  - Foco: `useGSAP`, `gsap.context()`, cleanup, SSR safety.

### Next.js y arquitectura

- `next-best-practices`
  - Cuándo: validar reglas y convenciones del framework.
  - Foco: prácticas recomendadas, límites RSC, handlers, metadata, async APIs.

- `nextjs-app-router-patterns`
  - Cuándo: implementar features concretas del App Router.
  - Foco: patrones prácticos (streaming, parallel routes, actions, caching).

### Calidad, contenido y soporte

- `accessibility-a11y`
  - Cuándo: construir/revisar accesibilidad.
  - Foco: WCAG 2.2 AA, teclado, ARIA, reduced motion, testing CI.

- `web-performance-optimization`
  - Cuándo: mejorar CWV y tiempos de carga.
  - Foco: carga, bundles, caching, monitoreo performance.

- `content-research-writer`
  - Cuándo: redactar contenido con investigación.
  - Foco: flujo editorial con evidencia y alineación de voz.

- `browser-use`
  - Cuándo: automatizar navegación/pruebas web en browser.
  - Foco: interacción automatizada, capturas, extracción.

- `grill-me`
  - Cuándo: stress-test de decisiones o planes.
  - Foco: cuestionario estructurado para resolver incertidumbre.

## Combinaciones recomendadas

- Landing/section premium:
  - `frontend-design` + `gsap/gsap-scrolltrigger` + `accessibility-a11y`.

- Nuevo módulo App Router:
  - `next-best-practices` + `nextjs-app-router-patterns` + `tailwind-design-system`.

- Refactor de UI existente:
  - `tailwind-design-system` + `frontend-design` + `web-performance-optimization`.

## Regla práctica

- Priorizar pocas skills bien elegidas por tarea.
- Evitar aplicar muchas skills en paralelo si no aportan valor directo.
