"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  },
  {
    num: "02",
    name: "Estrategia",
    desc: "Definimos arquitectura, alcance funcional y roadmap de ejecución.",
    icon: Route,
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
  },
  {
    num: "03",
    name: "UX/UI",
    desc: "Diseñamos interfaces claras, refinadas y enfocadas en la experiencia.",
    icon: PanelsTopLeft,
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
  },
  {
    num: "04",
    name: "Desarrollo",
    desc: "Construimos con código limpio, arquitectura escalable y foco en rendimiento.",
    icon: Code2,
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
  },
  {
    num: "05",
    name: "Optimización",
    desc: "Validamos accesibilidad, performance, SEO técnico y comportamiento responsive.",
    icon: Gauge,
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
  },
  {
    num: "06",
    name: "Lanzamiento",
    desc: "Desplegamos el producto en un entorno estable, seguro y preparado para operar.",
    icon: Rocket,
    area: "md:col-span-6 xl:col-span-6",
  },
  {
    num: "07",
    name: "Evolución",
    desc: "Acompañamos el crecimiento con mejoras continuas basadas en métricas, uso real y objetivos en evolución.",
    icon: Orbit,
    area: "md:col-span-6 xl:col-span-6",
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

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <li className={`min-h-[15rem] list-none ${step.area}`}>
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        className="group relative h-full rounded-2xl p-6 md:p-7 xl:p-8 bg-graphite-metal/40 backdrop-blur-md border border-steel-grey/20 shadow-[inset_0_0_0_0px_rgba(45,143,255,0),_inset_0_0_0px_rgba(45,143,255,0)] hover:bg-graphite-metal/55 hover:border-neon-blue/20 hover:scale-[1.012] hover:shadow-[inset_0_0_0_1px_rgba(45,143,255,0.15),_inset_0_0_16px_rgba(45,143,255,0.10)] transition-all duration-500 ease-out overflow-hidden"
      >

        {/* Capa 1: Círculo blurred de luz azul en la esquina superior derecha (Hover) */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-neon-blue/35 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 animate-glow-drift" />

        {/* Soft background highlight that follows mouse across card boundaries */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(45, 143, 255, 0.05), transparent 100%)"
          }}
        />

        {/* Subtle, ultra-thin border glow following mouse precisely across cards (transparent inside, no black circle) */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            maskImage: "radial-gradient(circle 100px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle 100px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 20%, transparent 100%)"
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
            <div className="w-fit rounded-lg border border-steel-grey/30 bg-graphite-metal/50 p-2 text-chrome-highlight group-hover:text-electric-violet group-hover:border-electric-violet/20 transition-all duration-500 ease-out">
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-electric-violet">
                {"// FASE "} {step.num}
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-chrome-highlight group-hover:text-white transition-colors duration-500 ease-out">
                {step.name}
              </h3>
            </div>
          </div>
          <p className="text-xs md:text-sm leading-relaxed text-chrome-highlight/65 group-hover:text-chrome-highlight/90 transition-colors duration-500 ease-out">
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
        gsap.set(steps, { opacity: 1, y: 0, scale: 1 });
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

      // 1. Heading slide-up stagger (Standardized to 0.6s duration)
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

      // 2. Bento grid cards slide-up stagger - sleek, clean, and solid (Standardized to 0.6s duration)
      tl.fromTo(
        steps,
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
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
          title="Un proceso claro para resultados sólidos"
          description="Trabajamos por etapas claras para tomar mejores decisiones, reducir incertidumbre y construir productos digitales más sólidos."
          className="process-heading"
        />

        <ul
          ref={stepsContainerRef}
          className="group/grid mt-12 grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 xl:max-h-[46rem] xl:grid-rows-3"
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
