"use client";

import React, { useEffect, useRef } from "react";
import { Layers, Server, Palette } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const LAYERS = [
  {
    num: "1",
    title: "Capa de Interacción",
    icon: Layers,
    chips: ["Next.js", "React", "Angular", "TypeScript", "Tailwind CSS"],
    colorTheme: "violet",
    glowColors: { start: "#7b4cff", end: "#2d8fff" }
  },
  {
    num: "2",
    title: "Capa de Infraestructura",
    icon: Server,
    chips: ["Node.js", "Vercel", "Cloudflare", "Firebase", "Google Cloud"],
    colorTheme: "blue",
    glowColors: { start: "#2d8fff", end: "#00f2fe" }
  },
  {
    num: "3",
    title: "Sistema Visual",
    icon: Palette,
    chips: ["Figma", "Storybook", "Design Systems", "UX/UI", "Prototyping"],
    colorTheme: "chrome",
    glowColors: { start: "#e3e7ee", end: "#5a6270" }
  }
];

type LayerItem = typeof LAYERS[0];

function LayerCard({ layer }: { layer: LayerItem }) {
  const Icon = layer.icon;
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

  const getHoverClasses = () => {
    if (layer.colorTheme === "violet") {
      return "hover:border-electric-violet/20 hover:shadow-[inset_0_0_0_1px_rgba(123,76,255,0.15),_inset_0_0_16px_rgba(123,76,255,0.10)]";
    }
    if (layer.colorTheme === "blue") {
      return "hover:border-neon-blue/20 hover:shadow-[inset_0_0_0_1px_rgba(45,143,255,0.15),_inset_0_0_16px_rgba(45,143,255,0.10)]";
    }
    return "hover:border-white/20 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),_inset_0_0_16px_rgba(255,255,255,0.08)]";
  };

  return (
    <li className="list-none flex flex-col w-full">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-xl border border-steel-grey/25 bg-graphite-metal/20 shadow-[inset_0_0_0_0px_rgba(255,255,255,0),_inset_0_0_0px_rgba(255,255,255,0)] hover:bg-graphite-metal/35 hover:scale-[1.008] ${getHoverClasses()} transition-all duration-500 ease-out backdrop-blur-sm overflow-hidden`}
      >
        {/* Subtle dynamic radial light on hover */}
        {layer.colorTheme === "violet" && (
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-electric-violet/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 animate-glow-drift" />
        )}
        {layer.colorTheme === "blue" && (
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-neon-blue/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 animate-glow-drift" />
        )}
        {layer.colorTheme === "chrome" && (
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 animate-glow-drift" />
        )}

        {/* Soft background highlight that follows mouse precisely inside card */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: layer.colorTheme === "violet"
              ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(123, 76, 255, 0.04), transparent 100%)"
              : layer.colorTheme === "blue"
              ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(45, 143, 255, 0.04), transparent 100%)"
              : "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 255, 255, 0.02), transparent 100%)"
          }}
        />

        {/* Hover Border Glow Following Mouse */}
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
              rx="12"
              fill="none"
              stroke={`url(#glow-grad-tech-${layer.num})`}
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id={`glow-grad-tech-${layer.num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={layer.glowColors.start} stopOpacity="0.8" />
                <stop offset="100%" stopColor={layer.glowColors.end} stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Left Column: Icon & Title */}
        <div className="relative z-20 flex items-center gap-4 min-w-[280px]">
          <div className={`w-10 h-10 rounded-lg bg-steel-grey/15 border border-steel-grey/20 flex items-center justify-center text-chrome-deep transition-all duration-500 ease-out
            ${layer.colorTheme === "violet" ? "group-hover:text-electric-violet group-hover:border-electric-violet/20 group-hover:bg-electric-violet/5" : ""}
            ${layer.colorTheme === "blue" ? "group-hover:text-neon-blue group-hover:border-neon-blue/20 group-hover:bg-neon-blue/5" : ""}
            ${layer.colorTheme === "chrome" ? "group-hover:text-white group-hover:border-white/20 group-hover:bg-white/5" : ""}
          `}>
            <Icon className="w-5 h-5 transition-transform duration-500 ease-out group-hover:scale-105" />
          </div>
          <div className="space-y-0.5">
            <span className="block font-mono text-[9px] font-medium tracking-wider text-chrome-deep">
              CAPA 0{layer.num}
            </span>
            <h3 className="text-lg font-bold text-chrome-highlight tracking-tight group-hover:text-white transition-colors duration-500 ease-out">
              {layer.title}
            </h3>
          </div>
        </div>

        {/* Right Column: Chips */}
        <div className="relative z-20 flex flex-wrap gap-2 md:gap-3 items-center">
          {layer.chips.map((chip, idx) => (
            <span
              key={idx}
              className={`tech-chip px-3.5 py-1.5 text-xs font-mono rounded-full border border-steel-grey/30 bg-graphite-metal/30 text-chrome-highlight hover:text-white hover:scale-[1.03] transition-all duration-500 ease-out cursor-default
                ${layer.colorTheme === "violet" ? "hover:border-electric-violet/40 hover:bg-electric-violet/10" : ""}
                ${layer.colorTheme === "blue" ? "hover:border-neon-blue/40 hover:bg-neon-blue/10" : ""}
                ${layer.colorTheme === "chrome" ? "hover:border-white/30 hover:bg-white/10" : ""}
              `}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLUListElement>(null);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!cardsContainerRef.current) return;

      const cards = Array.from(cardsContainerRef.current.children) as HTMLElement[];

      if (prefersReducedMotion) {
        gsap.set(".tech-heading > *", { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        cards.forEach((card) => {
          gsap.set(card.querySelectorAll(".tech-chip"), { opacity: 1, scale: 1, x: 0 });
        });
        return;
      }

      // 1. Unified Cinematic Timeline (Trigger calibrated to top 62% for balanced scroll focus)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          toggleActions: "play none none none",
        },
      });

      // 2. SectionHeading stagger entrance (Standardized to 0.6s duration)
      tl.fromTo(
        ".tech-heading > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // 3. Stagger reveal of Layer Cards (Standardized to 0.6s duration)
      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
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

      // 4. Stagger reveal of Chips inside each Layer Card (Standardized to 0.4s duration)
      cards.forEach((card) => {
        const chips = card.querySelectorAll(".tech-chip");
        tl.fromTo(
          chips,
          { opacity: 0, scale: 0.85, x: 6 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.4"
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tecnologia"
      className="py-20 md:py-32 relative overflow-hidden z-10"
      style={{
        background: "radial-gradient(circle at 85% 25%, rgba(45, 143, 255, 0.05), transparent 35%), radial-gradient(circle at 15% 75%, rgba(123, 76, 255, 0.05), transparent 35%), #0D0F11"
      }}
    >
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// TECNOLOGÍA"
          title="Tecnología elegida con criterio"
          description="Seleccionamos herramientas modernas según cada desafío, priorizando rendimiento, escalabilidad y una base técnica preparada para evolucionar."
          className="tech-heading"
        />

        <ul
          ref={cardsContainerRef}
          className="group/grid mt-12 flex flex-col gap-6 max-w-5xl mx-auto"
        >
          {LAYERS.map((layer, idx) => (
            <LayerCard key={idx} layer={layer} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
