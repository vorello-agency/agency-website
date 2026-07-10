"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Cpu, Layers, LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import AmbientGlow from "@/components/ui/AmbientGlow";
import { createCardInteraction, CardInteractionHandlers } from "@/lib/gsap/primitives/hover-card";

interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

const PILLARS: PillarItem[] = [
  {
    id: "diseno",
    title: "Diseño con propósito",
    subtitle: "Visuales con intención",
    description: "Creamos interfaces que no solo se ven sofisticadas, sino que guían al usuario de manera intuitiva, reducen la fricción y están optimizadas para la conversión.",
    icon: Sparkles,
  },
  {
    id: "ingenieria",
    title: "Ingeniería de escala",
    subtitle: "Rendimiento sin concesiones",
    description: "Nuestros desarrollos están basados en arquitecturas modernas y robustas, asegurando velocidad de carga instantánea, SEO óptimo y accesibilidad nativa.",
    icon: Cpu,
  },
  {
    id: "sistemas",
    title: "Enfoque en sistemas",
    subtitle: "Infraestructura perdurable",
    description: "Evitamos el código descartable. Desarrollamos sistemas de diseño y componentes modulares estructurados para crecer y adaptarse al ritmo de tu negocio.",
    icon: Layers,
  },
];

function DifferentialCard({ pillar }: { pillar: PillarItem }) {
  const Icon = pillar.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const [handlers, setHandlers] = useState<CardInteractionHandlers | null>(null);

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
          // Custom color tokens for Differential cards
          activeBorder: "rgba(123, 76, 255, 0.35)",
          activeIconBorder: "rgba(123, 76, 255, 0.45)",
          activeIconColor: "var(--electric-violet)",
          activeIconBg: "rgba(123, 76, 255, 0.1)",
          restBorder: "rgba(42, 46, 51, 0.35)",
          restIconBorder: "rgba(42, 46, 51, 0.35)",
          restIconColor: "var(--chrome-highlight)",
          restIconBg: "rgba(42, 46, 51, 0.2)",
        }
      )
    );
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handlers?.onMouseEnter}
      onMouseLeave={handlers?.onMouseLeave}
      onTouchStart={handlers?.onTouchStart}
      onTouchEnd={handlers?.onTouchEnd}
      onTouchCancel={handlers?.onTouchCancel}
      className="relative flex flex-col justify-between rounded-xl border border-steel-grey/25 bg-graphite-metal/30 p-6 transition-colors duration-300 select-none md:p-8 2xl:p-8"
    >
      {/* Accent line sweep on hover */}
      <div
        ref={accentLineRef}
        className="pointer-events-none absolute inset-x-0 -top-px h-[2px] origin-center scale-x-0 rounded-full via-electric-violet/40 bg-gradient-to-r from-transparent to-transparent"
      />

      {/* Grid lines pattern */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "center",
        }}
      />

      <div>
        {/* Header Icon & Title Row */}
        <div className="flex items-center gap-4 mb-6">
          <div
            ref={iconContainerRef}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-steel-grey/35 bg-graphite-metal/40 text-chrome-highlight/90 transition-colors duration-300 2xl:h-12 2xl:w-12"
          >
            <Icon className="h-5 w-5 2xl:h-6 2xl:w-6" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-chrome-highlight text-lg font-bold tracking-tight 2xl:text-xl leading-tight">
              {pillar.title}
            </h3>
            <span className="text-electric-violet block font-mono text-[10px] font-semibold tracking-wider uppercase mt-0.5">
              {pillar.subtitle}
            </span>
          </div>
        </div>

        {/* Content Description */}
        <p className="text-copy-muted text-sm leading-relaxed 2xl:text-base text-pretty">
          {pillar.description}
        </p>
      </div>
    </div>
  );
}

export default function Differential() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!cardsContainerRef.current) return;

      const cards = Array.from(cardsContainerRef.current.children) as HTMLElement[];

      if (prefersReducedMotion) {
        gsap.set(".diff-heading > *", { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 76%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Stagger reveal text heading
      tl.fromTo(
        ".diff-heading > *",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );

      // Stagger reveal cards
      tl.fromTo(
        cards,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.25"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="differential"
      className="relative z-20 overflow-hidden py-20 md:py-28 2xl:py-36"
    >
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="DIFERENCIAL"
          title="Criterio antes que ejecución"
          description="No somos ejecutores pasivos.\nAportamos visión de producto, rigor técnico y diseño con propósito en cada etapa del desarrollo."
          className="diff-heading"
        />

        <div
          ref={cardsContainerRef}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 2xl:mt-16 2xl:gap-10"
        >
          {PILLARS.map((pillar) => (
            <DifferentialCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </Container>
    </section>
  );
}
