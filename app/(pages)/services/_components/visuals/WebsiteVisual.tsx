"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import { Zap, ArrowUpRight } from "lucide-react";

export default function WebsiteVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(".glass-card-hero", {
        y: -6,
        duration: 2.4,
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
          "radial-gradient(circle at 50% 0%, rgba(45, 143, 255, 0.15), transparent 70%), var(--graphite-metal)",
      }}
    >
      {/* Background Dots */}
      <div className="bg-dot-white pointer-events-none absolute inset-0 z-0 opacity-30" />

      {/* Top Header - Minimal Browser Dots + Score Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-steel-grey/20 pb-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>

        {/* Speed Indicator */}
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 text-emerald-400 font-mono text-xs font-semibold">
          <Zap className="h-3 w-3" />
          <span>99 / 100</span>
        </div>
      </div>

      {/* Main UI Canvas */}
      <div className="relative z-10 my-auto grid grid-cols-12 items-center gap-4 py-2">
        {/* Left: Clean Layout Skeleton */}
        <div className="col-span-7 flex flex-col gap-3">
          <div className="h-2 w-16 rounded bg-neon-blue/40" />
          <div className="h-4 w-full rounded bg-chrome-highlight/90" />
          <div className="h-4 w-3/4 rounded bg-chrome-highlight/90" />
          <div className="h-2 w-5/6 rounded bg-steel-grey/40 mt-1" />

          <div className="flex items-center gap-2 pt-2">
            <div className="bg-electric-violet text-white rounded-lg px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1 shadow-md">
              <span>Demo</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
            <div className="h-7 w-20 rounded-lg border border-steel-grey/40" />
          </div>
        </div>

        {/* Right: Floating Glass Card Mockup */}
        <div className="col-span-5 flex justify-end">
          <div className="glass-card-hero relative w-full max-w-[170px] rounded-xl bg-carbon-black/80 border border-steel-grey/40 p-3 shadow-2xl backdrop-blur-md">
            <div className="h-24 w-full rounded-lg bg-gradient-to-br from-neon-blue/25 via-electric-violet/20 to-carbon-black border border-steel-grey/20 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
