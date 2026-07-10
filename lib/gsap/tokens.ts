/**
 * Motion Design Tokens — Vorello
 * Fuente de verdad para timing, easing y valores del sistema de motion.
 *
 * Cambiar un valor aquí se refleja en todas las primitivas y componentes
 * que consuman estos tokens.
 */

export const MOTION = {
  /** Durations (seconds) */
  duration: {
    /** Hover, micro-interactions */
    fast: 0.3,
    /** Inner reveals, staggers */
    base: 0.4,
    /** Scroll entrances principales */
    entrance: 0.6,
    /** Efectos editoriales lentos */
    slow: 0.8,
  },

  /** Easing curves */
  ease: {
    /** Entrada: deceleración natural */
    enter: "power2.out",
    /** Salida: suave simétrico */
    exit: "power2.inOut",
    /** Pop sutil para iconos, botones */
    spring: "back.out(1.4)",
    /** Scrub, word-reveal */
    editorial: "power1.out",
  },

  /** Stagger intervals (seconds) */
  stagger: {
    /** Chips, badges, list items densos */
    tight: 0.04,
    /** Items de contenido regulares */
    base: 0.08,
    /** Heading cascade, cards */
    cascade: 0.12,
  },

  /** Scroll entrance defaults */
  scroll: {
    /** Desplazamiento vertical de entrada (px) */
    y: 30,
    /** Scale de entrada para cards */
    scale: 0.97,
    /** Scale de entrada para iconos */
    iconScale: 0.85,
  },

  /** Hover states */
  hover: {
    /** Micro-scale de card en hover */
    cardScale: 1.008,
    /** Scale de hover para SVG icons */
    iconScale: 1.12,
    /** Duración hover enter */
    enterDuration: 0.3,
    /** Duración hover exit (más lento que enter) */
    exitDuration: 0.4,
  },

  /** Touch states */
  touch: {
    /** Duración touch enter */
    enterDuration: 0.25,
    /** Duración touch exit */
    exitDuration: 0.5,
  },
} as const;

export type MotionTokens = typeof MOTION;
