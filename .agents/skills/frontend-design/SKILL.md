---
name: frontend-design
description: Diseña e implementa interfaces frontend premium para Vorello Web con una dirección visual oscura, tecnológica y sobria. Usa GSAP + ScrollTrigger como sistema principal de motion y evita animación decorativa.
---

# Frontend Design — Vorello Web

## Objetivo

Construir interfaces modernas, premium y técnicamente sólidas para Vorello Web.

El diseño y el motion deben reforzar:
- jerarquía
- claridad
- storytelling
- percepción de calidad

Antes de cualquier decisión visual o de copy, revisar:
- `docs/brand-brief.md`

## Stack y dirección base

- Framework: Next.js
- Lenguaje: TypeScript
- UI: React
- Estilos: Tailwind CSS
- Motion principal: GSAP + ScrollTrigger
- Componentes visuales avanzados: Aceternity UI (adaptados al sistema visual de Vorello)

## Regla principal de motion

Usar **GSAP como librería principal de animaciones**.

- Permitido: `gsap`, `ScrollTrigger`
- No usar Motion/Framer Motion salvo razón técnica clara y justificada en la tarea.

## Principios de motion

- El movimiento debe acompañar el contenido, no competir con él.
- Evitar efectos ruidosos, exagerados o sin intención.
- Priorizar fluidez, precisión y elegancia.
- Diseñar una experiencia premium, no sobreanimada.
- Si una animación no agrega claridad, narrativa o calidad percibida, eliminarla.

## Cuándo usar GSAP

Implementar GSAP para:
- apariciones suaves al entrar en viewport
- stagger en textos, cards, listas y bloques
- animaciones ligadas al scroll
- secciones sticky/pin cuando aporten narrativa
- scrub progresivo en secciones clave
- transformaciones de mockups, grids, líneas, glows o UI layers
- timelines de entrada para hero y bloques editoriales

## Cuándo usar solo CSS/Tailwind

Usar transiciones CSS/Tailwind para interacciones simples:
- color
- borde
- opacity
- scale leve
- translate leve

No usar GSAP para hovers simples que ya se resuelven limpio con CSS.

## Hero (criterio obligatorio)

El hero debe tener entrada fuerte, sobria y cuidada, transmitiendo:
- diseño
- tecnología
- producto
- calidad
- detalle
- solidez

Recursos posibles:
- headline por bloques o palabras
- glow sutil azul/violeta
- grid/fondo técnico oscuro
- parallax leve en capas visuales
- mockup o preview con entrada progresiva y/o motion ligado al scroll

## Secciones recomendadas con motion

### Proceso

Aplicar scroll-driven narrative por etapas:
1. Descubrimiento
2. Estrategia
3. UX/UI
4. Desarrollo
5. Optimización
6. Entrega

Cada etapa debe poder cambiar de estado o revelarse progresivamente.

### Servicios

- aparición con stagger
- hover premium sobrio
- foco en legibilidad y jerarquía

### Diferencial / Statement

- entrada editorial progresiva
- blur inicial sutil + reveal limpio
- énfasis en copy principal

### Casos/Mockups

- parallax leve
- profundidad y transformaciones sutiles
- sin deformaciones agresivas

## Implementación técnica recomendada

```txt
src/
  lib/
    gsap/
      register.ts
      animations.ts
      scroll.ts
  hooks/
    useGsapContext.ts
  components/
    motion/
      Reveal.tsx
      StaggerGroup.tsx
      ScrollSection.tsx
```

Reglas:
- Registrar plugins GSAP en un único punto.
- Centralizar utilidades de animación para evitar duplicación.
- Usar `gsap.context()` (o patrón equivalente) en componentes React.
- Limpiar siempre timelines y ScrollTriggers al desmontar.
- No crear triggers innecesarios.

## Performance

- Animar principalmente `transform` y `opacity`.
- Evitar `width`, `height`, `top`, `left`, `margin` en animación continua.
- Evitar layout shift.
- Minimizar timelines y observers redundantes.
- Cuidar peso de bundle y scope de animaciones.

## Accesibilidad y reduced motion

Respetar `prefers-reduced-motion`:
- desactivar scrub complejo
- limitar parallax
- mantener reveals simples o estado estático
- no ocultar contenido esencial por depender de animación

Además:
- no bloquear navegación por teclado
- no comprometer legibilidad
- no interferir con botones/links
- mantener semántica HTML correcta

## Definition of Done (motion)

Una sección con motion está terminada solo si:
- funciona bien en mobile y desktop
- respeta `prefers-reduced-motion`
- no degrada performance
- no genera layout shift
- no bloquea interacción
- mantiene legibilidad
- aporta valor visual o narrativo real
- se siente alineada con la identidad premium, oscura y tecnológica de Vorello
