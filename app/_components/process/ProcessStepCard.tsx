"use client";

import React, { useRef, useEffect, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { animateProcessIconEnter, animateProcessIconLeave } from "@/lib/gsap/animations";
import { ProcessStep } from "@/data/process";
import { createCardInteraction, CardInteractionHandlers } from "@/lib/gsap/primitives/hover-card";
import { gsap } from "@/lib/gsap/register";

interface ProcessStepCardProps {
  step: ProcessStep;
  isActive: boolean;
  isMobile: boolean;
}

export default function ProcessStepCard({ step, isActive, isMobile }: ProcessStepCardProps) {
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  const [handlers, setHandlers] = useState<CardInteractionHandlers | null>(null);

  // Initialize unified card hover interaction primitive
  useEffect(() => {
    if (!cardRef.current) return;

    setHandlers(
      createCardInteraction(
        {
          card: cardRef.current,
          accentLine: accentLineRef.current,
          iconContainer: iconContainerRef.current,
        },
        {
          // Custom color tokens matching Vorello's process design values
          activeBorder: "rgba(123, 76, 255, 0.4)",
          activeIconBorder: "rgba(123, 76, 255, 0.2)",
          activeIconColor: "var(--electric-violet)",
          activeIconBg: "rgba(123, 76, 255, 0.05)",
          restBorder: "rgba(42, 46, 51, 0.2)",
          restIconBorder: "rgba(42, 46, 51, 0.3)",
          restIconColor: "var(--chrome-highlight)",
          restIconBg: "rgba(42, 46, 51, 0.25)",
        }
      )
    );
  }, [isActive]);

  // Mobile active step animation sequence
  useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    const card = cardRef.current;
    const glow = card.querySelector(".process-glow") as HTMLElement | null;
    const borderGlow = card.querySelector(".process-border-glow") as HTMLElement | null;
    const iconBox = iconContainerRef.current;
    const svg = card.querySelector(`.process-svg-${step.num}`) as SVGElement | null;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isActive) {
      if (prefersReducedMotion) {
        if (iconBox) {
          gsap.set(iconBox, {
            borderColor: "rgba(123, 76, 255, 0.4)",
            color: "var(--electric-violet)",
            backgroundColor: "rgba(123, 76, 255, 0.05)",
          });
        }
        return;
      }

      // Timeline for high-fidelity tactile pop & sweep
      const tl = gsap.timeline();

      // 1. Pop icon container
      if (iconBox) {
        tl.fromTo(
          iconBox,
          {
            scale: 0.9,
            borderColor: "rgba(42, 46, 51, 0.3)",
            color: "var(--chrome-highlight)",
            backgroundColor: "rgba(42, 46, 51, 0.25)",
          },
          {
            scale: 1.08,
            borderColor: "rgba(123, 76, 255, 0.4)",
            color: "var(--electric-violet)",
            backgroundColor: "rgba(123, 76, 255, 0.05)",
            duration: 0.4,
            ease: "back.out(1.5)",
          }
        );
      }

      // 2. Play SVG specific micro-animation
      if (svg) {
        animateProcessIconEnter(step.num, svg);
      }

      // 3. Mobile border sweep highlight
      if (glow && borderGlow) {
        const sweepObj = { x: -100, y: 50 };
        card.style.setProperty("--mouse-x", `${sweepObj.x}px`);
        card.style.setProperty("--mouse-y", `${sweepObj.y}px`);

        tl.to([glow, borderGlow], {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        }, "-=0.3");

        tl.to(sweepObj, {
          x: 360,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            card.style.setProperty("--mouse-x", `${sweepObj.x}px`);
            card.style.setProperty("--mouse-y", `${sweepObj.y}px`);
          },
        }, "-=0.15");

        tl.to([glow, borderGlow], {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        }, "-=0.25");
      }

      return () => {
        tl.kill();
        if (svg) {
          animateProcessIconLeave(step.num, svg);
        }
      };
    } else {
      // Transition back to resting state
      gsap.to(iconBox, {
        scale: 1,
        borderColor: "rgba(42, 46, 51, 0.3)",
        color: "var(--chrome-highlight)",
        backgroundColor: "rgba(42, 46, 51, 0.25)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isActive, isMobile, step.num]);

  const handleMouseEnter = () => {
    handlers?.onMouseEnter();
    const svg = cardRef.current?.querySelector(`.process-svg-${step.num}`) as SVGElement | null;
    if (svg) {
      animateProcessIconEnter(step.num, svg);
    }
  };

  const handleMouseLeave = () => {
    handlers?.onMouseLeave();
    const svg = cardRef.current?.querySelector(`.process-svg-${step.num}`) as SVGElement | null;
    if (svg) {
      animateProcessIconLeave(step.num, svg);
    }
  };

  const handleTouchStart = () => {
    handlers?.onTouchStart();
  };

  const handleTouchEnd = () => {
    handlers?.onTouchEnd();
  };

  // Conditional classes for active/inactive state on mobile
  const liMobileClasses = isMobile ? (isActive ? "" : "opacity-60") : "";

  const cardMobileClasses = isMobile
    ? isActive
      ? "scale-[1.02] !border-electric-violet/45 shadow-[0_0_24px_rgba(123,76,255,0.18)]"
      : "scale-100"
    : "";

  return (
    <li
      className={`max-w-[320px] min-w-[85vw] shrink-0 snap-center snap-always list-none md:min-h-60 md:max-w-none md:min-w-0 md:shrink md:snap-align-none ${step.area} transition-all duration-300 ease-out ${liMobileClasses}`}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={`process-card group bg-graphite-metal border-steel-grey/50 relative h-full rounded-2xl border p-6 transition-all duration-300 ease-out select-none md:p-7 xl:p-8 ${cardMobileClasses}`}
      >
        {/* Sweep glow overlay — driven by --mouse-x / --mouse-y CSS vars */}
        <div
          className="process-glow pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 blur-2xl"
          style={{
            background:
              `radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(123, 76, 255, 0.05), transparent 100%)`,
          }}
        />

        {/* Sweep border glow — masked SVG border following the sweep position */}
        <div
          className="process-border-glow pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0"
          style={{
            maskImage:
              "radial-gradient(circle 100px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle 100px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 20%, transparent 100%)",
          }}
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full rounded-[inherit]"
            style={{ overflow: "visible" }}
          >
            <rect
              x="0.75"
              y="0.75"
              width="calc(100% - 1.5px)"
              height="calc(100% - 1.5px)"
              rx="16"
              fill="none"
              stroke={`url(#sweep-grad-process-${step.num})`}
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient
                id={`sweep-grad-process-${step.num}`}
                x1="0%" y1="0%" x2="100%" y2="100%"
              >
                <stop offset="0%" stopColor="var(--electric-violet)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          ref={accentLineRef}
          className="services-accent-line via-electric-violet/40 absolute inset-x-0 -top-px h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-transparent to-transparent"
        />

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div
              ref={iconContainerRef}
              className="process-icon-box border-steel-grey/30 bg-graphite-metal/50 text-chrome-highlight w-fit overflow-visible rounded-lg border p-2 transition-all duration-500 ease-out"
            >
              <Icon className={`h-5 w-5 overflow-visible process-svg-${step.num}`} />
            </div>
            <div className="space-y-1.5">
              <Eyebrow
                className="process-phase block text-[10px] tracking-wider "
              >
                FASE {step.num}
              </Eyebrow>
              <h3 className="process-title text-chrome-highlight text-lg font-bold tracking-tight uppercase transition-colors duration-500 ease-out md:group-hover:text-white">
                {step.name}
              </h3>
            </div>
          </div>
          <p className="process-desc text-chrome-highlight/75 md:group-hover:text-chrome-highlight/90 text-xs leading-relaxed text-balance transition-colors duration-500 ease-out md:text-sm">
            {step.desc}
          </p>
        </div>
      </div>
    </li>
  );
}
