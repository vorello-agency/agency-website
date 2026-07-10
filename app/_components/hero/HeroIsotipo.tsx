"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Image from "next/image";

/**
 * HeroIsotipo — Preserved legacy visual element.
 *
 * Contains the interactive isotipo with orbital rings and energy particles
 * that was originally part of the Hero section. Extracted as a standalone
 * component for potential future use in other pages or sections.
 *
 * NOT imported by the current Hero. This file is for preservation only.
 */
export default function HeroIsotipo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const isotipoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduce: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            gsap.set(visualRef.current, { opacity: 1, y: 0, scale: 1 });
            return;
          }

          // Entrance animation
          gsap.fromTo(
            visualRef.current,
            { scale: 0.97, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.3 }
          );

          // Idle floating animation
          gsap.to(visualRef.current, {
            y: -12,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.8,
          });
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleIsotipoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isotipoRef.current) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const maxTilt = 18;

    gsap.to(isotipoRef.current, {
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
      transformPerspective: 800,
      scale: 1.05,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleIsotipoMouseLeave = () => {
    if (!isotipoRef.current) return;
    gsap.to(isotipoRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 800,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1.1, 0.4)",
      overwrite: "auto",
    });
  };

  const handleIsotipoTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isotipoRef.current) return;
    const touch = e.touches[0];
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;

    const maxTilt = 15;

    gsap.to(isotipoRef.current, {
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
      transformPerspective: 800,
      scale: 1.06,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleIsotipoTouchEnd = () => {
    if (!isotipoRef.current) return;
    gsap.to(isotipoRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 800,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1.1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <div ref={containerRef} className="flex w-full items-center justify-center">
      <div
        ref={visualRef}
        className="relative mx-auto flex w-full max-w-[160px] items-center justify-center sm:max-w-[224px] md:max-w-md"
        style={{ opacity: 0 }}
      >
        {/* Fourth Orbit (Outer - Green) */}
        <div className="pointer-events-none absolute h-[130%] w-[130%] [transform:translateZ(0)] animate-[spin_150s_linear_infinite] rounded-full border border-transparent will-change-transform" />

        {/* Third Orbit (Blue) */}
        <div className="pointer-events-none absolute h-[112%] w-[112%] [transform:translateZ(0)] animate-[spin_120s_linear_infinite] rounded-full border border-transparent will-change-transform" />

        {/* Second Orbit (Violet) */}
        <div className="pointer-events-none absolute h-[94%] w-[94%] [transform:translateZ(0)] animate-[spin_70s_linear_infinite_reverse] rounded-full border border-transparent will-change-transform" />

        {/* First Orbit (Innermost - Orange) */}
        <div className="pointer-events-none absolute h-[76%] w-[76%] [transform:translateZ(0)] animate-[spin_55s_linear_infinite] rounded-full border border-transparent will-change-transform" />

        {/* Fourth Energy Particle tracking the outer orbit (Green) */}
        <div className="pointer-events-none absolute h-[130%] w-[130%] animate-[spin_12s_linear_infinite_reverse]">
          <span className="bg-signal-emerald/60 absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_4px_var(--signal-emerald)]" />
        </div>

        {/* Third Energy Particle (Blue) */}
        <div className="pointer-events-none absolute h-[112%] w-[112%] animate-[spin_10s_linear_infinite]">
          <span className="bg-neon-blue/60 absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full shadow-[0_0_6px_var(--neon-blue)]" />
        </div>

        {/* Second Energy Particle (Violet) */}
        <div className="pointer-events-none absolute h-[94%] w-[94%] animate-[spin_6s_linear_infinite_reverse]">
          <span className="bg-electric-violet/60 absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_4px_var(--electric-violet)]" />
        </div>

        {/* First Energy Particle (Orange) */}
        <div className="pointer-events-none absolute h-[76%] w-[76%] animate-[spin_8s_linear_infinite]">
          <span className="bg-signal-orange/60 absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_4px_var(--signal-orange)]" />
        </div>

        {/* Interactive container */}
        <div
          className="select-drag-disabled z-10 flex h-28 w-28 cursor-pointer touch-none items-center justify-center select-none sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-76 lg:w-76 2xl:h-[350px] 2xl:w-[350px]"
          onMouseMove={handleIsotipoMouseMove}
          onMouseLeave={handleIsotipoMouseLeave}
          onTouchStart={handleIsotipoTouchStart}
          onTouchEnd={handleIsotipoTouchEnd}
          onTouchCancel={handleIsotipoTouchEnd}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Image
            ref={isotipoRef}
            width={350}
            height={350}
            priority
            sizes="(max-width: 768px) 120px, (max-width: 1024px) 176px, 304px"
            src="/assets/isotipo.webp"
            alt="Logotipo interactivo de Vorello Agency"
            className="select-drag-disabled pointer-events-none h-full w-full object-contain select-none"
          />
        </div>
      </div>
    </div>
  );
}
