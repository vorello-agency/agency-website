"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SupportVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".uptime-block",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.02, stagger: 0.02, ease: "power1.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-graphite-metal border-steel-grey/30 relative flex min-h-[300px] sm:min-h-[330px] w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 select-none shadow-2xl"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.12), transparent 70%), var(--graphite-metal)",
      }}
    >
      {/* Background Dots */}
      <div className="bg-dot-white pointer-events-none absolute inset-0 z-0 opacity-30" />

      {/* Top Header - Minimal Browser Dots + SLA */}
      <div className="relative z-10 flex items-center justify-between border-b border-steel-grey/20 pb-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 text-emerald-400 font-mono text-xs font-semibold">
          <ShieldCheck className="h-3 w-3" />
          <span>SLA 99.99% Uptime</span>
        </div>
      </div>

      {/* Uptime Grid Layout */}
      <div className="relative z-10 my-auto flex flex-col gap-3 py-2">
        <div className="flex justify-between items-center font-mono text-xs">
          <span className="text-chrome-deep">Salud del Sistema (30 Días)</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Monitoreo 24/7
          </span>
        </div>

        {/* 30 Uptime Blocks */}
        <div className="grid grid-cols-15 sm:grid-cols-30 gap-1 bg-carbon-black/70 border border-steel-grey/30 rounded-lg p-3">
          {Array.from({ length: 30 }).map((_, idx) => (
            <div
              key={idx}
              className="uptime-block h-8 w-full rounded-sm bg-emerald-400/90 shadow-[0_0_6px_rgba(16,185,129,0.3)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
