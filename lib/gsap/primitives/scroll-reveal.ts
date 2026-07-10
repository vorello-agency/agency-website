import { gsap } from "../register";
import { MOTION } from "../tokens";

export interface ScrollRevealOptions {
  /** Element that triggers the animation on scroll */
  trigger: Element;
  /** Target elements to animate */
  targets: gsap.TweenTarget;
  /** ScrollTrigger start position (default: "top 75%") */
  start?: string;
  /** Vertical displacement in px (default: MOTION.scroll.y) */
  y?: number;
  /** Scale from value — if undefined, no scale animation */
  scale?: number;
  /** Stagger interval (default: MOTION.stagger.cascade) */
  stagger?: number;
  /** Duration (default: MOTION.duration.entrance) */
  duration?: number;
  /** Easing (default: MOTION.ease.enter) */
  ease?: string;
  /** Delay before start */
  delay?: number;
}

/**
 * Entrada genérica por scroll. Un solo tween con ScrollTrigger.
 *
 * Usado por: heading cascades, card entrances, strip reveals.
 *
 * @example
 * scrollReveal({
 *   trigger: sectionRef.current!,
 *   targets: ".services-heading > *",
 *   start: "top 60%",
 * });
 */
export function scrollReveal({
  trigger,
  targets,
  start = "top 75%",
  y = MOTION.scroll.y,
  scale,
  stagger = MOTION.stagger.cascade,
  duration = MOTION.duration.entrance,
  ease = MOTION.ease.enter,
  delay,
}: ScrollRevealOptions): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y,
      ...(scale !== undefined && { scale }),
    },
    {
      opacity: 1,
      y: 0,
      ...(scale !== undefined && { scale: 1 }),
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    }
  );
}
