import { gsap } from "../register";

export interface SweepCardOptions {
  /** Elemento que activa el ScrollTrigger */
  trigger: Element;
  /** Card con CSS vars --mouse-x / --mouse-y (el que tiene el radial-gradient) */
  card: HTMLElement;
  /** Overlay de glow radial */
  glow: Element;
  /** Overlay de border glow con mask */
  borderGlow: Element;
  /** Posición X inicial del sweep (px). Default: -120 */
  startX?: number;
  /** Posición X final del sweep (px). Default: 420 */
  endX?: number;
  /** Posición Y fija durante el sweep (px). Default: 80 */
  y?: number;
  /** ScrollTrigger start string. Default: "top 72%" */
  scrollStart?: string;
}

/**
 * Crea un timeline de sweep (izquierda → derecha) sobre una card al entrar en viewport.
 * Diseñado para touch + desktop (tablets). Requiere .glow y .borderGlow en el DOM.
 *
 * @example
 * const isTouch = window.matchMedia("(pointer: coarse)").matches;
 * if (isTouch && isDesktop) {
 *   createScrollSweep({ trigger: stepEl, card: cardInner, glow, borderGlow });
 * }
 */
export function createScrollSweep(options: SweepCardOptions): gsap.core.Timeline {
  const {
    trigger,
    card,
    glow,
    borderGlow,
    startX = -120,
    endX = 420,
    y = 80,
    scrollStart = "top 72%",
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: scrollStart,
      toggleActions: "play none none none",
    },
  });

  const obj = { x: startX, y };

  // 1. Reveal glow overlay
  tl.to([glow, borderGlow], {
    opacity: 1,
    duration: 0.35,
    ease: "power2.out",
  });

  // 2. Animate sweep position left → right
  tl.to(
    obj,
    {
      x: endX,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate() {
        card.style.setProperty("--mouse-x", `${obj.x}px`);
        card.style.setProperty("--mouse-y", `${obj.y}px`);
      },
    },
    "-=0.25"
  );

  // 3. Fade out glow overlay
  tl.to(
    [glow, borderGlow],
    {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    },
    "-=0.3"
  );

  return tl;
}
