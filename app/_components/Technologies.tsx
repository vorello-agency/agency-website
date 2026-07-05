"use client";

import React, { useEffect, useRef } from "react";
import { Layers, Server, Palette, Cpu } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import AmbientGlow from "@/components/ui/AmbientGlow";
import { animateTechIconEnter, animateTechIconLeave } from "@/lib/gsap/animations";

const LAYERS = [
  {
    num: "1",
    title: "Diseño y sistema visual",
    icon: Palette,
    chips: ["Figma", "Storybook", "Design Systems", "UX/UI", "Prototyping"],
    colorTheme: "orange",
    glowColors: { start: "var(--signal-orange)", end: "#FF3D00" }
  },
  {
    num: "2",
    title: "Interacción y front-end",
    icon: Layers,
    chips: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    colorTheme: "violet",
    glowColors: { start: "var(--electric-violet)", end: "var(--neon-blue)" }
  },
  {
    num: "3",
    title: "Infraestructura y cloud",
    icon: Server,
    chips: ["Node.js", "Vercel", "Cloudflare", "Supabase", "Google Cloud"],
    colorTheme: "blue",
    glowColors: { start: "var(--neon-blue)", end: "#00f2fe" }
  },
  {
    num: "4",
    title: "Servicios y datos",
    icon: Cpu,
    chips: ["Sanity", "Stripe", "Resend", "n8n", "Webhooks"],
    colorTheme: "emerald",
    glowColors: { start: "var(--signal-emerald)", end: "#059669" }
  }
];

type LayerItem = typeof LAYERS[0];

function LayerCard({ layer }: { layer: LayerItem }) {
  const Icon = layer.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

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

      const themeColor = layer.colorTheme === "violet"
        ? "rgba(123, 76, 255, 0.25)"
        : layer.colorTheme === "blue"
          ? "rgba(45, 143, 255, 0.25)"
          : layer.colorTheme === "orange"
            ? "rgba(255, 107, 0, 0.25)"
            : layer.colorTheme === "emerald"
              ? "rgba(16, 185, 129, 0.25)"
              : "rgba(255, 255, 255, 0.2)";

      gsap.to(card, {
        borderColor: themeColor,
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
        borderColor: "rgba(42, 46, 51, 0.25)",
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

    const svg = card.querySelector(`.tech-icon-svg-${layer.num}`) as SVGElement | null;
    if (svg) {
      animateTechIconEnter(layer.num, svg);
    }
  };

  const handleMouseLeave = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const svg = card.querySelector(`.tech-icon-svg-${layer.num}`) as SVGElement | null;
    if (svg) {
      animateTechIconLeave(layer.num, svg);
    }
  };

  const getHoverClasses = () => {
    if (layer.colorTheme === "violet") {
      return "md:hover:border-electric-violet/20 md:hover:shadow-[inset_0_0_0_1px_rgba(123,76,255,0.15),_inset_0_0_16px_rgba(123,76,255,0.10)]";
    }
    if (layer.colorTheme === "blue") {
      return "md:hover:border-neon-blue/20 md:hover:shadow-[inset_0_0_0_1px_rgba(45,143,255,0.15),_inset_0_0_16px_rgba(45,143,255,0.10)]";
    }
    if (layer.colorTheme === "orange") {
      return "md:hover:border-signal-orange/20 md:hover:shadow-[inset_0_0_0_1px_rgba(255,107,0,0.15),_inset_0_0_16px_rgba(255,107,0,0.10)]";
    }
    if (layer.colorTheme === "emerald") {
      return "md:hover:border-signal-emerald/20 md:hover:shadow-[inset_0_0_0_1px_rgba(16,185,129,0.15),_inset_0_0_16px_rgba(16,185,129,0.10)]";
    }
    return "md:hover:border-white/20 md:hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),_inset_0_0_16px_rgba(255,255,255,0.08)]";
  };

  return (
    <li className="list-none flex flex-col w-full">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 p-4 md:p-8 rounded-xl border border-steel-grey/25 bg-graphite-metal transition-all duration-500 ease-out overflow-hidden select-none"
      >
        {/* Subtle dynamic radial light on hover - Commented out for non-glassmorphism look */}
        {layer.colorTheme === "violet" && (
          <AmbientGlow className="-right-12 -top-12 z-0 h-36 w-36 animate-glow-drift bg-electric-violet/10 opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:animate-none md:group-hover:opacity-100" />
        )}
        {layer.colorTheme === "blue" && (
          <AmbientGlow className="-right-12 -top-12 z-0 h-36 w-36 animate-glow-drift bg-neon-blue/10 opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:animate-none md:group-hover:opacity-100" />
        )}
        {layer.colorTheme === "orange" && (
          <AmbientGlow className="-right-12 -top-12 z-0 h-36 w-36 animate-glow-drift bg-signal-orange/10 opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:animate-none md:group-hover:opacity-100" />
        )}
        {layer.colorTheme === "emerald" && (
          <AmbientGlow className="-right-12 -top-12 z-0 h-36 w-36 animate-glow-drift bg-signal-emerald/10 opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:animate-none md:group-hover:opacity-100" />
        )}
        {layer.colorTheme === "chrome" && (
          <AmbientGlow className="-right-12 -top-12 z-0 h-36 w-36 animate-glow-drift bg-white/5 opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:animate-none md:group-hover:opacity-100" />
        )}

        {/* Soft background highlight that follows mouse precisely inside card - Commented out for non-glassmorphism look */}
        <div
          ref={glowRef}
          className="tech-glow absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
          style={{
            background: layer.colorTheme === "violet"
              ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(123, 76, 255, 0.04), transparent 100%)"
              : layer.colorTheme === "blue"
                ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(45, 143, 255, 0.04), transparent 100%)"
                : layer.colorTheme === "orange"
                  ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 107, 0, 0.04), transparent 100%)"
                  : layer.colorTheme === "emerald"
                    ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(16, 185, 129, 0.04), transparent 100%)"
                    : "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 255, 255, 0.02), transparent 100%)"
          }}
        />

        {/* Hover Border Glow Following Mouse */}
        <div
          ref={borderGlowRef}
          className="tech-border-glow absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10"
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
        <div className="relative z-20 flex items-center gap-4 md:min-w-[280px]">
          <div className={`w-10 h-10 rounded-lg bg-steel-grey/15 border border-steel-grey/20 flex items-center justify-center text-chrome-deep transition-all duration-500 ease-out overflow-visible
            ${layer.colorTheme === "violet" ? "md:group-hover:text-electric-violet md:group-hover:border-electric-violet/20 md:group-hover:bg-electric-violet/5" : ""}
            ${layer.colorTheme === "blue" ? "md:group-hover:text-neon-blue md:group-hover:border-neon-blue/20 md:group-hover:bg-neon-blue/5" : ""}
            ${layer.colorTheme === "orange" ? "md:group-hover:text-signal-orange md:group-hover:border-signal-orange/20 md:group-hover:bg-signal-orange/5" : ""}
            ${layer.colorTheme === "emerald" ? "md:group-hover:text-signal-emerald md:group-hover:border-signal-emerald/20 md:group-hover:bg-signal-emerald/5" : ""}
            ${layer.colorTheme === "chrome" ? "md:group-hover:text-white md:group-hover:border-white/20 md:group-hover:bg-white/5" : ""}
          `}>
            <Icon className={`w-5 h-5 tech-icon-svg-${layer.num} overflow-visible transition-transform duration-500 ease-out md:group-hover:scale-105`} />
          </div>
          <div className="space-y-0.5">
            <Eyebrow
              variant="custom"
              className="block text-[9px] font-medium tracking-wider text-chrome-highlight/75"
            >
              CAPA 0{layer.num}
            </Eyebrow>
            <h3 className="text-lg font-bold text-chrome-highlight tracking-tight md:group-hover:text-white transition-colors duration-500 ease-out">
              {layer.title}
            </h3>
          </div>
        </div>

        {/* Right Column: Chips */}
        <div className="relative z-20 flex flex-wrap gap-2 md:gap-3 items-center">
          {layer.chips.map((chip, idx) => (
            <span
              key={idx}
              className={`tech-chip px-3 py-1 text-xs font-mono rounded-full border border-steel-grey/30 bg-graphite-metal/30 text-chrome-highlight hover:text-white hover:scale-[1.03] transition-all duration-500 ease-out cursor-default
                ${layer.colorTheme === "violet" ? "hover:border-electric-violet/40 hover:bg-electric-violet/10" : ""}
                ${layer.colorTheme === "blue" ? "hover:border-neon-blue/40 hover:bg-neon-blue/10" : ""}
                ${layer.colorTheme === "orange" ? "hover:border-signal-orange/40 hover:bg-signal-orange/10" : ""}
                ${layer.colorTheme === "emerald" ? "hover:border-signal-emerald/40 hover:bg-signal-emerald/10" : ""}
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

      // 5. Mobile touch-triggered sweep effect via ScrollTrigger for each Layer Card
      cards.forEach((card) => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch) {
          const cardInner = card.querySelector(".group");
          const glow = card.querySelector(".tech-glow");
          const borderGlow = card.querySelector(".tech-border-glow");

          if (cardInner && glow && borderGlow) {
            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 72%",
                toggleActions: "play none none none",
              }
            });

            const obj = { x: -120, y: 50 };

            cardTl.to([glow, borderGlow], {
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
            });

            cardTl.to(obj, {
              x: 500,
              y: 50,
              duration: 1.4,
              ease: "power2.inOut",
              onUpdate: () => {
                (cardInner as HTMLElement).style.setProperty("--mouse-x", `${obj.x}px`);
                (cardInner as HTMLElement).style.setProperty("--mouse-y", `${obj.y}px`);
              }
            }, "-=0.25");

            cardTl.to([glow, borderGlow], {
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

  return (
    <section
      ref={sectionRef}
      id="tecnologia"
      className="py-20 md:py-32 relative overflow-hidden z-10"
      style={{
        background: "radial-gradient(circle at 85% 25%, rgba(45, 143, 255, 0.05), transparent 35%), radial-gradient(circle at 15% 75%, rgba(123, 76, 255, 0.05), transparent 35%), var(--carbon-black)"
      }}
    >
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="TECNOLOGÍA"
          title="Herramientas elegidas con criterio"
          description="No seguimos tendencias. Seleccionamos tecnologías probadas que garantizan rendimiento, escalabilidad y mantenibilidad a largo plazo."
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
