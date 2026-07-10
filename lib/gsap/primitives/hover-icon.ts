import { gsap } from "../register";
import { MOTION } from "../tokens";

/**
 * Hover unificado para SVG icons dentro de cards.
 *
 * Un solo efecto: scale al centro. Sin wobbles, sin distorsiones,
 * sin condicionales por tipo de servicio. Un movimiento limpio
 * que comunica "esto es interactivo".
 *
 * Respeta prefers-reduced-motion.
 */
export function hoverIconEnter(svg: Element) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.to(svg, {
    scale: MOTION.hover.iconScale,
    transformOrigin: "center center",
    duration: MOTION.hover.enterDuration,
    ease: MOTION.ease.enter,
    overwrite: "auto",
  });
}

export function hoverIconLeave(svg: Element) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.to(svg, {
    scale: 1,
    transformOrigin: "center center",
    duration: MOTION.hover.exitDuration,
    ease: MOTION.ease.exit,
    overwrite: "auto",
  });
}
