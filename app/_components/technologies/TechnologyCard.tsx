"use client";

import React, { useRef } from "react";
import { LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Eyebrow from "@/components/ui/Eyebrow";
import { animateTechIconEnter, animateTechIconLeave } from "@/lib/gsap/animations";

export interface TechnologyItem {
  num: string;
  label: string;
  title: string;
  icon: LucideIcon;
  chips: string[];
  colorTheme: string;
  glowColors: { start: string; end: string };
}

interface TechnologyCardProps {
  layer: TechnologyItem;
}

export default function TechnologyCard({ layer }: TechnologyCardProps) {
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
        overwrite: "auto",
      });

      const themeColor =
        layer.colorTheme === "violet"
          ? "rgba(123, 76, 255, 0.25)"
          : layer.colorTheme === "blue"
            ? "rgba(45, 143, 255, 0.25)"
            : layer.colorTheme === "orange"
              ? "rgba(255, 107, 0, 0.25)"
              : "rgba(255, 255, 255, 0.2)";

      gsap.to(card, {
        borderColor: themeColor,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
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
        overwrite: "auto",
      });
    }
    if (card) {
      gsap.to(card, {
        borderColor: "rgba(42, 46, 51, 0.25)",
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
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

  return (
    <li className="flex w-full list-none flex-col">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group border-steel-grey/25 bg-graphite-metal relative flex flex-col justify-between gap-4 overflow-hidden rounded-xl border p-4 transition-all duration-500 ease-out select-none md:flex-row md:items-center md:gap-6 md:p-8"
      >
        {/* Ambient glows based on theme */}
        {layer.colorTheme === "violet" && (
          <AmbientGlow className="animate-glow-drift bg-electric-violet/10 -top-12 -right-12 z-0 h-36 w-36 opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:animate-none md:group-hover:opacity-100" />
        )}
        {layer.colorTheme === "blue" && (
          <AmbientGlow className="animate-glow-drift bg-neon-blue/10 -top-12 -right-12 z-0 h-36 w-36 opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:animate-none md:group-hover:opacity-100" />
        )}
        {layer.colorTheme === "orange" && (
          <AmbientGlow className="animate-glow-drift bg-signal-orange/10 -top-12 -right-12 z-0 h-36 w-36 opacity-0 blur-3xl transition-opacity duration-500 motion-reduce:animate-none md:group-hover:opacity-100" />
        )}

        {/* Soft background highlight that follows mouse precisely inside card */}
        <div
          ref={glowRef}
          className="tech-glow pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 blur-2xl transition-opacity duration-500 md:group-hover:opacity-100"
          style={{
            background:
              layer.colorTheme === "violet"
                ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(123, 76, 255, 0.04), transparent 100%)"
                : layer.colorTheme === "blue"
                  ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(45, 143, 255, 0.04), transparent 100%)"
                  : layer.colorTheme === "orange"
                    ? "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 107, 0, 0.04), transparent 100%)"
                    : "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 255, 255, 0.02), transparent 100%)",
          }}
        />

        {/* Hover Border Glow Following Mouse */}
        <div
          ref={borderGlowRef}
          className="tech-border-glow pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"
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
              rx="12"
              fill="none"
              stroke={`url(#glow-grad-tech-${layer.num})`}
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient
                id={`glow-grad-tech-${layer.num}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={layer.glowColors.start} stopOpacity="0.8" />
                <stop offset="100%" stopColor={layer.glowColors.end} stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Left Column: Icon & Title */}
        <div className="relative z-20 flex items-center gap-4 md:min-w-[280px]">
          <div
            className={`bg-steel-grey/15 border-steel-grey/20 text-chrome-deep flex h-10 w-10 items-center justify-center overflow-visible rounded-lg border transition-all duration-500 ease-out ${layer.colorTheme === "violet" ? "md:group-hover:text-electric-violet md:group-hover:border-electric-violet/20 md:group-hover:bg-electric-violet/5" : ""} ${layer.colorTheme === "blue" ? "md:group-hover:text-neon-blue md:group-hover:border-neon-blue/20 md:group-hover:bg-neon-blue/5" : ""} ${layer.colorTheme === "orange" ? "md:group-hover:text-signal-orange md:group-hover:border-signal-orange/20 md:group-hover:bg-signal-orange/5" : ""} `}
          >
            <Icon
              className={`h-5 w-5 tech-icon-svg-${layer.num} overflow-visible transition-transform duration-500 ease-out md:group-hover:scale-105`}
            />
          </div>
          <div className="space-y-1">
            <Eyebrow
              variant="custom"
              className="text-electric-violet md:text-chrome-highlight/75 block font-mono text-[10px] font-medium tracking-wider"
            >
              {layer.label}
            </Eyebrow>
            <h3 className="text-chrome-highlight text-lg font-bold tracking-tight transition-colors duration-500 ease-out md:group-hover:text-white">
              {layer.title}
            </h3>
          </div>
        </div>

        {/* Right Column: Chips */}
        <div className="relative z-20 flex flex-wrap items-center gap-2 md:gap-3">
          {layer.chips.map((chip, idx) => (
            <span
              key={idx}
              className={`tech-chip border-steel-grey/30 bg-graphite-metal/30 text-chrome-highlight cursor-default rounded-full border px-3 py-1 font-mono text-xs transition-all duration-500 ease-out hover:scale-[1.03] hover:text-white ${layer.colorTheme === "violet" ? "hover:border-electric-violet/40 hover:bg-electric-violet/10" : ""} ${layer.colorTheme === "blue" ? "hover:border-neon-blue/40 hover:bg-neon-blue/10" : ""} ${layer.colorTheme === "orange" ? "hover:border-signal-orange/40 hover:bg-signal-orange/10" : ""} `}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}
