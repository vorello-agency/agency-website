"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import { TrendingUp, ArrowRight, Check } from "lucide-react";

export default function LandingVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".cta-glow-btn", {
        boxShadow: "0 0 24px rgba(123, 76, 255, 0.7)",
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-graphite-metal border-steel-grey/30 relative flex min-h-[300px] sm:min-h-[330px] w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 select-none shadow-2xl"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(123, 76, 255, 0.15), transparent 70%), var(--graphite-metal)",
      }}
    >
      {/* Background Dots */}
      <div className="bg-dot-white pointer-events-none absolute inset-0 z-0 opacity-30" />

      {/* Top Header - Minimal Browser Dots + Conversion Rate */}
      <div className="relative z-10 flex items-center justify-between border-b border-steel-grey/20 pb-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-electric-violet/15 border border-electric-violet/30 px-3 py-0.5 text-electric-violet font-mono text-xs font-semibold">
          <TrendingUp className="h-3 w-3" />
          <span>12.8% Conversion (+38%)</span>
        </div>
      </div>

      {/* Main Landing Offer + Form Card Layout */}
      <div className="relative z-10 my-auto grid grid-cols-12 items-center gap-4 py-2">
        {/* Left: Offer Skeleton & Glowing CTA */}
        <div className="col-span-7 flex flex-col gap-3">
          <div className="h-2 w-20 rounded bg-electric-violet/60" />
          <div className="h-4 w-full rounded bg-chrome-highlight/90" />
          <div className="h-4 w-2/3 rounded bg-chrome-highlight/90" />

          <div className="flex items-center gap-2 pt-2">
            <div className="cta-glow-btn bg-electric-violet text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg">
              <span>Registrarse</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        {/* Right: Clean Lead Form Card */}
        <div className="col-span-5 flex justify-end">
          <div className="w-full max-w-[170px] rounded-xl bg-carbon-black/85 border border-steel-grey/40 p-3 shadow-2xl backdrop-blur-md flex flex-col gap-2">
            <div className="h-2.5 w-16 rounded bg-chrome-highlight/80" />
            <div className="h-6 w-full rounded bg-graphite-metal border border-steel-grey/30 px-2 flex items-center justify-between">
              <div className="h-1.5 w-20 rounded bg-steel-grey/50" />
              <Check className="h-3 w-3 text-emerald-400" />
            </div>
            <div className="h-6 w-full rounded bg-electric-violet flex items-center justify-center">
              <div className="h-1.5 w-12 rounded bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
