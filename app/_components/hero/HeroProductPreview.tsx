"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap/register";
import Image from "next/image";
import AmbientGlow from "@/components/ui/AmbientGlow";
import MockupDashboard from "./MockupDashboard";
import SatelliteDesign from "./SatelliteDesign";
import SatellitePerformance from "./SatellitePerformance";
import SatelliteProcess from "./SatelliteProcess";

interface HeroProductPreviewProps {
  mainCardRef: React.RefObject<HTMLDivElement | null>;
  sat1Ref: React.RefObject<HTMLDivElement | null>;
  sat2Ref: React.RefObject<HTMLDivElement | null>;
  sat3Ref: React.RefObject<HTMLDivElement | null>;
}

/**
 * HeroProductPreview — Visual composition for the Hero section.
 *
 * Orchestrates a main dashboard mockup with 3 floating satellite cards
 * representing Vorello's capabilities: Design System, Performance, and Process.
 *
 * Features:
 * - Mouse parallax on desktop (layered depth effect)
 * - Subtle hover interaction (chart highlight + metric pulse)
 * - Isotipo watermark behind composition
 * - Responsive: 3 satellites (lg+), 2 (md), 1 (mobile)
 */
export default function HeroProductPreview({
  mainCardRef,
  sat1Ref,
  sat2Ref,
  sat3Ref,
}: HeroProductPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxActive = useRef(false);

  // Mouse parallax — desktop only, layered depth
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!parallaxActive.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Normalize to -0.5 → 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Different multipliers create depth: closer elements move less
      if (mainCardRef.current) {
        gsap.to(mainCardRef.current, {
          x: x * 6,
          y: y * 6,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (sat1Ref.current) {
        gsap.to(sat1Ref.current, {
          x: x * 14,
          y: y * 10,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (sat2Ref.current) {
        gsap.to(sat2Ref.current, {
          x: x * 10,
          y: y * 8,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (sat3Ref.current) {
        gsap.to(sat3Ref.current, {
          x: x * 16,
          y: y * 12,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
    [mainCardRef, sat1Ref, sat2Ref, sat3Ref]
  );

  const handlePointerLeave = useCallback(() => {
    const refs = [mainCardRef, sat1Ref, sat2Ref, sat3Ref];
    refs.forEach((ref) => {
      if (ref.current) {
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  }, [mainCardRef, sat1Ref, sat2Ref, sat3Ref]);

  // Setup parallax listener (desktop + hover-capable devices only)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isHoverCapable = window.matchMedia("(hover: hover)").matches;

    if (prefersReducedMotion || !isHoverCapable) return;

    parallaxActive.current = true;

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [handlePointerMove, handlePointerLeave]);

  // Subtle hover interaction: chart bar pulse + metric scale
  const handleMouseEnter = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isHoverCapable = window.matchMedia("(hover: hover)").matches;
    if (prefersReducedMotion || !isHoverCapable) return;

    // Pulse the highlight bar
    const highlightBar = containerRef.current?.querySelector(".hero-chart-highlight");
    if (highlightBar) {
      gsap.to(highlightBar, {
        opacity: 0.7,
        duration: 0.4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      });
    }

    // Subtle scale on the first metric
    const firstMetric = containerRef.current?.querySelector(".hero-metric");
    if (firstMetric) {
      gsap.to(firstMetric, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className="relative flex w-full items-center justify-center lg:justify-end lg:translate-x-4 xl:justify-center xl:translate-x-0 select-none"
    >
      {/* Background glow — subtle violet ambient behind the composition */}
      <AmbientGlow className="bg-electric-violet/8 top-1/2 left-1/2 z-0 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 blur-[80px]" />

      {/* Composition container — relative for satellite positioning */}
      <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:w-[92%] lg:max-w-[390px] xl:w-[85%] xl:max-w-[500px]">
        {/* Main dashboard card */}
        <div ref={mainCardRef} style={{ opacity: 0 }}>
          <MockupDashboard />
        </div>

        {/* Satellite: Design System — top-right, hidden on mobile */}
        <div
          ref={sat1Ref}
          className="absolute -top-5 -right-3 z-20 hidden sm:block lg:-top-7 lg:-right-6"
          style={{ opacity: 0 }}
        >
          <SatelliteDesign />
        </div>

        {/* Satellite: Performance — bottom-left, always visible */}
        <div
          ref={sat2Ref}
          className="absolute -bottom-6 -left-3 z-20 sm:-bottom-8 sm:-left-5 lg:-bottom-10 lg:-left-2 xl:-left-8"
          style={{ opacity: 0 }}
        >
          <SatellitePerformance />
        </div>

        {/* Satellite: Process — bottom-right, desktop only */}
        <div
          ref={sat3Ref}
          className="absolute -bottom-4 right-4 z-20 hidden sm:block lg:-bottom-6 lg:right-6"
          style={{ opacity: 0 }}
        >
          <SatelliteProcess />
        </div>
      </div>
    </div>
  );
}
