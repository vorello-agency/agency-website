import { gsap } from "../register";
import { MOTION } from "../tokens";

export interface HoverCardElements {
  card: HTMLElement;
  accentLine?: HTMLElement | null;
  iconContainer?: HTMLElement | null;
}

export interface HoverCardColors {
  activeBorder: string;
  activeIconBorder: string;
  activeIconColor: string;
  activeIconBg: string;
  restBorder: string;
  restIconBorder: string;
  restIconColor: string;
  restIconBg: string;
  activeShadow?: string;
}

const DEFAULT_COLORS: HoverCardColors = {
  activeBorder: "rgba(123, 76, 255, 0.35)",
  activeIconBorder: "rgba(123, 76, 255, 0.4)",
  activeIconColor: "var(--electric-violet)",
  activeIconBg: "rgba(123, 76, 255, 0.05)",
  restBorder: "rgba(42, 46, 51, 0.2)",
  restIconBorder: "rgba(42, 46, 51, 0.3)",
  restIconColor: "var(--chrome-highlight)",
  restIconBg: "rgba(42, 46, 51, 0.25)",
};

/**
 * Anima una card hacia su estado activo (hover o touch).
 */
function animateIn(
  elements: HoverCardElements,
  colors: HoverCardColors,
  duration: number
) {
  const { card, accentLine, iconContainer } = elements;

  if (accentLine) {
    gsap.to(accentLine, {
      scaleX: 1,
      opacity: 1,
      duration,
      ease: MOTION.ease.enter,
      overwrite: "auto",
    });
  }

  if (iconContainer) {
    gsap.to(iconContainer, {
      borderColor: colors.activeIconBorder,
      color: colors.activeIconColor,
      backgroundColor: colors.activeIconBg,
      y: -2,
      scale: 1.04,
      duration,
      ease: MOTION.ease.enter,
      overwrite: "auto",
    });
  }

  // Create a soft glowing shadow colored after the active border
  const shadowColor = colors.activeShadow || colors.activeBorder
    .replace("0.35", "0.15")
    .replace("0.4", "0.15");

  gsap.to(card, {
    borderColor: colors.activeBorder,
    y: -5, // Physical lift (highly tactile)
    boxShadow: `0 20px 32px -12px ${shadowColor}, 0 0 1px 0.5px ${colors.activeBorder}`,
    duration,
    ease: MOTION.ease.enter,
    overwrite: "auto",
  });
}

/**
 * Anima una card de vuelta a su estado de reposo.
 */
function animateOut(
  elements: HoverCardElements,
  colors: HoverCardColors,
  duration: number
) {
  const { card, accentLine, iconContainer } = elements;

  if (accentLine) {
    gsap.to(accentLine, {
      scaleX: 0,
      opacity: 0,
      duration,
      ease: MOTION.ease.exit,
      overwrite: "auto",
    });
  }

  if (iconContainer) {
    gsap.to(iconContainer, {
      borderColor: colors.restIconBorder,
      color: colors.restIconColor,
      backgroundColor: colors.restIconBg,
      y: 0,
      scale: 1,
      duration,
      ease: MOTION.ease.exit,
      overwrite: "auto",
    });
  }

  gsap.to(card, {
    borderColor: colors.restBorder,
    y: 0,
    boxShadow: "none",
    duration,
    ease: MOTION.ease.exit,
    overwrite: "auto",
  });
}

export interface CardInteractionHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
}

/**
 * Crea handlers de hover y touch para cards interactivas.
 *
 * Retorna un objeto con 5 handlers listos para asignar al JSX.
 * Usado por: ServiceCard, FitCard, y cualquier card interactiva futura.
 *
 * @example
 * const handlers = createCardInteraction({
 *   card: cardRef.current!,
 *   accentLine: accentLineRef.current,
 *   iconContainer: iconRef.current,
 * });
 *
 * <div {...handlers}>...</div>
 */
export function createCardInteraction(
  elements: HoverCardElements,
  colors: Partial<HoverCardColors> = {}
): CardInteractionHandlers {
  const c = { ...DEFAULT_COLORS, ...colors };

  return {
    onMouseEnter: () => animateIn(elements, c, MOTION.hover.enterDuration),
    onMouseLeave: () => animateOut(elements, c, MOTION.hover.exitDuration),
    onTouchStart: () => animateIn(elements, c, MOTION.touch.enterDuration),
    onTouchEnd: () => animateOut(elements, c, MOTION.touch.exitDuration),
    onTouchCancel: () => animateOut(elements, c, MOTION.touch.exitDuration),
  };
}
