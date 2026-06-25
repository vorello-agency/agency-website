"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import { animateProcessIconEnter, animateProcessIconLeave } from "@/lib/gsap/animations";
import {
  Compass,
  Route,
  PanelsTopLeft,
  Code2,
  Gauge,
  Rocket,
  Orbit,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEPS = [
  {
    num: "01",
    name: "Descubrimiento",
    desc: "Entendemos objetivos, usuarios y restricciones técnicas para definir una base clara.",
    icon: Compass,
    area: "md:[grid-area:1/1/2/7] lg:[grid-area:1/1/2/5]",
  },
  {
    num: "02",
    name: "Estrategia y definición",
    desc: "Definimos arquitectura, alcance funcional y roadmap de ejecución.",
    icon: Route,
    area: "md:[grid-area:1/7/2/13] lg:[grid-area:2/1/3/5]",
  },
  {
    num: "03",
    name: "UX/UI",
    desc: "Diseñamos interfaces claras, refinadas y validadas antes del desarrollo.",
    icon: PanelsTopLeft,
    area: "md:[grid-area:2/1/3/7] lg:[grid-area:1/5/3/8]",
  },
  {
    num: "04",
    name: "Desarrollo",
    desc: "Construimos con código limpio, arquitectura escalable y foco en rendimiento.",
    icon: Code2,
    area: "md:[grid-area:2/7/3/13] lg:[grid-area:1/8/2/13]",
  },
  {
    num: "05",
    name: "Optimización",
    desc: "Validamos accesibilidad, performance, SEO técnico y comportamiento responsive.",
    icon: Gauge,
    area: "md:[grid-area:3/1/4/13] lg:[grid-area:2/8/3/13]",
  },
  {
    num: "06",
    name: "Lanzamiento",
    desc: "Desplegamos el producto en un entorno estable, seguro y preparado para operar.",
    icon: Rocket,
    area: "md:col-span-6 lg:col-span-6",
  },
  {
    num: "07",
    name: "Evolución",
    desc: "Acompañamos el crecimiento con mejoras continuas basadas en métricas, uso real y objetivos en evolución.",
    icon: Orbit,
    area: "md:col-span-6 lg:col-span-6",
  },
];

type StepItem = {
  num: string;
  name: string;
  desc: string;
  icon: LucideIcon;
  area: string;
};

function GridItem({ step }: { step: StepItem }) {
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    if (glowRef.current && borderGlowRef.current) {
      gsap.to([glowRef.current, borderGlowRef.current], {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(card, {
        borderColor: "rgba(45, 143, 255, 0.25)",
        backgroundColor: "rgba(26, 29, 33, 0.55)",
        scale: 1.008,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const handleTouchEnd = () => {
    const card = cardRef.current;
    if (glowRef.current && borderGlowRef.current) {
      gsap.to([glowRef.current, borderGlowRef.current], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
    if (card) {
      gsap.to(card, {
        borderColor: "rgba(42, 46, 51, 0.2)",
        backgroundColor: "rgba(26, 29, 33, 0.4)",
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
  };

  const handleMouseEnter = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const svg = card.querySelector(`.process-svg-${step.num}`) as SVGElement | null;
    if (svg) {
      animateProcessIconEnter(step.num, svg);
    }
  };

  const handleMouseLeave = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const svg = card.querySelector(`.process-svg-${step.num}`) as SVGElement | null;
    if (svg) {
      animateProcessIconLeave(step.num, svg);
    }
  };

  return (
    <li className={`min-h-[15rem] list-none ${step.area}`}>
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="process-card group relative h-full rounded-2xl p-6 md:p-7 xl:p-8 bg-graphite-metal/40 backdrop-blur-md border border-steel-grey/20 shadow-[inset_0_0_0_0px_rgba(45,143,255,0),_inset_0_0_0px_rgba(45,143,255,0)] md:hover:bg-graphite-metal/55 md:hover:border-neon-blue/20 md:hover:scale-[1.012] md:hover:shadow-[inset_0_0_0_1px_rgba(45,143,255,0.15),_inset_0_0_16px_rgba(45,143,255,0.10)] transition-all duration-500 ease-out overflow-hidden select-none"
      >

        {/* Capa 1: Círculo blurred de luz azul en la esquina superior derecha (Hover) */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-neon-blue/15 blur-3xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 animate-glow-drift" />

        {/* Soft background highlight that follows mouse across card boundaries */}
        <div
          ref={glowRef}
          className="process-glow absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 md:group-hover/grid:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: "radial-gradient(circle 180px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(45, 143, 255, 0.08), transparent 100%)"
          }}
        />

        {/* Subtle, ultra-thin border glow following mouse precisely across cards */}
        <div
          ref={borderGlowRef}
          className="process-border-glow absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 md:group-hover/grid:opacity-100 transition-opacity duration-500 z-10"
          style={{
            maskImage: "radial-gradient(circle 160px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle 160px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 20%, transparent 100%)"
          }}
        >
          <svg className="absolute inset-0 w-full h-full rounded-[inherit] pointer-events-none" style={{ overflow: "visible" }}>
            <rect
              x="0.75"
              y="0.75"
              width="calc(100% - 1.5px)"
              height="calc(100% - 1.5px)"
              rx="16"
              fill="none"
              stroke={`url(#glow-grad-${step.num})`}
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id={`glow-grad-${step.num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7b4cff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#2d8fff" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="process-icon-box w-fit rounded-lg border border-steel-grey/30 bg-graphite-metal/50 p-2 overflow-visible text-chrome-highlight md:group-hover:text-electric-violet md:group-hover:border-electric-violet/20 transition-all duration-500 ease-out">
              <Icon className={`h-5 w-5 overflow-visible process-svg-${step.num}`} />
            </div>
            <div className="space-y-1.5">
              <span className="process-phase block font-mono text-[10px] font-semibold uppercase tracking-wider text-electric-violet">
                {"// FASE "} {step.num}
              </span>
              <h3 className="process-title text-lg font-bold uppercase tracking-tight text-chrome-highlight md:group-hover:text-white transition-colors duration-500 ease-out">
                {step.name}
              </h3>
            </div>
          </div>
          <p className="process-desc text-xs md:text-sm leading-relaxed text-balance text-chrome-highlight/65 md:group-hover:text-chrome-highlight/90 transition-colors duration-500 ease-out">
            {step.desc}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!stepsContainerRef.current) return;

      const steps = Array.from(stepsContainerRef.current.children) as HTMLElement[];

      if (prefersReducedMotion) {
        gsap.set(".process-heading > *", { opacity: 1, y: 0 });
        gsap.set(steps, { opacity: 1, y: 0, scale: 1, rotationX: 0 });
        steps.forEach((stepEl) => {
          gsap.set(stepEl.querySelectorAll(".process-icon-box, .process-phase, .process-title, .process-desc"), {
            opacity: 1, y: 0, scale: 1, x: 0
          });
        });
        return;
      }

      // 1. Cinematic Timeline for Heading and Bento Grid Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Heading slide-up stagger
      tl.fromTo(
        ".process-heading > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // ─── 2. Bento grid cards with 3D rotationX entrance ───
      tl.fromTo(
        steps,
        {
          opacity: 0,
          y: 40,
          rotationX: 8,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 3. Staggered inner content reveals per card
      steps.forEach((stepEl) => {
        const cardInner = stepEl.querySelector(".process-card") as HTMLElement | null;
        if (!cardInner) return;

        const iconBox = cardInner.querySelector(".process-icon-box");
        const phase = cardInner.querySelector(".process-phase");
        const title = cardInner.querySelector(".process-title");
        const desc = cardInner.querySelector(".process-desc");

        // Set initial states
        gsap.set([iconBox, phase, title, desc], { opacity: 0 });

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: stepEl,
            start: "top 62%",
            toggleActions: "play none none none",
          }
        });

        // Icon scales in with back ease
        if (iconBox) {
          cardTl.fromTo(
            iconBox,
            { opacity: 0, scale: 0.6 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.4)",
            }
          );
        }

        // Phase label types in
        if (phase) {
          cardTl.fromTo(
            phase,
            { opacity: 0, x: -10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }

        // Title slides up
        if (title) {
          cardTl.fromTo(
            title,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.25"
          );
        }

        // Description fades in
        if (desc) {
          cardTl.fromTo(
            desc,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.25"
          );
        }

        // Mobile touch-triggered sweep effect via ScrollTrigger
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch) {
          const glow = stepEl.querySelector(".process-glow");
          const borderGlow = stepEl.querySelector(".process-border-glow");

          if (cardInner && glow && borderGlow) {
            const sweepTl = gsap.timeline({
              scrollTrigger: {
                trigger: stepEl,
                start: "top 72%",
                toggleActions: "play none none none",
              }
            });

            const obj = { x: -120, y: 80 };

            sweepTl.to([glow, borderGlow], {
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
            });

            sweepTl.to(obj, {
              x: 380,
              y: 120,
              duration: 1.4,
              ease: "power2.inOut",
              onUpdate: () => {
                cardInner.style.setProperty("--mouse-x", `${obj.x}px`);
                cardInner.style.setProperty("--mouse-y", `${obj.y}px`);
              }
            }, "-=0.25");

            sweepTl.to([glow, borderGlow], {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            }, "-=0.3");
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = stepsContainerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Deshabilitar en dispositivos táctiles sin hover
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      return;
    }

    const cards = Array.from(container.querySelectorAll(".process-card")) as HTMLElement[];
    let frameId: number;

    const handlePointerMove = (e: PointerEvent) => {
      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const clientX = e.clientX;
        const clientY = e.clientY;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        });
      });
    };

    const handlePointerLeave = () => {
      if (frameId) cancelAnimationFrame(frameId);
      cards.forEach((card) => {
        card.style.setProperty("--mouse-x", `-999px`);
        card.style.setProperty("--mouse-y", `-999px`);
      });
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="py-20 md:py-32 relative overflow-hidden z-40"
      style={{
        background: "radial-gradient(circle at 15% 25%, rgba(123, 76, 255, 0.10), transparent 32%), radial-gradient(circle at 85% 65%, rgba(45, 143, 255, 0.10), transparent 34%), linear-gradient(180deg, #0D0F11 0%, #111419 48%, #0D0F11 100%)"
      }}
    >
      {/* Premium Small Grid Overlay with center-focused radial mask */}
      <div
        className="absolute inset-0 z-0 bg-grid-small pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle at center, white 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at center, white 30%, transparent 85%)"
        }}
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// PROCESO DE TRABAJO"
          title="De la idea al producto, con proceso y criterio"
          description="Cada proyecto pasa por etapas definidas de descubrimiento, diseño, desarrollo y validación antes de salir a producción."
          className="process-heading"
        />

        <ul
          ref={stepsContainerRef}
          className="group/grid mt-12 grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 lg:max-h-[46rem] lg:grid-rows-3"
          style={{ perspective: "1200px" }}
        >
          {STEPS.map((step, idx) => (
            <GridItem key={idx} step={step} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
