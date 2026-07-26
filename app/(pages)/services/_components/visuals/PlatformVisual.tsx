"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import { Cpu, Users } from "lucide-react";

const ROWS = [
  { id: "ORD-9421", name: "Alfa Group", status: "Completado", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { id: "ORD-9422", name: "Beta Corp", status: "En Proceso", color: "text-neon-blue bg-neon-blue/10 border-neon-blue/20" },
  { id: "ORD-9423", name: "Delta Tech", status: "Sincronizado", color: "text-electric-violet bg-electric-violet/10 border-electric-violet/20" },
];

export default function PlatformVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".platform-row",
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
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
          "radial-gradient(circle at 50% 0%, rgba(123, 76, 255, 0.15), transparent 70%), var(--graphite-metal)",
      }}
    >
      {/* Background Dots */}
      <div className="bg-dot-white pointer-events-none absolute inset-0 z-0 opacity-30" />

      {/* Top Header - Minimal Browser Dots + Security Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-steel-grey/20 pb-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-electric-violet/15 border border-electric-violet/30 px-3 py-0.5 text-electric-violet font-mono text-xs font-semibold">
          <Cpu className="h-3 w-3" />
          <span>SaaS Platform UI</span>
        </div>
      </div>

      {/* Main SaaS Data Table Layout */}
      <div className="relative z-10 my-auto flex flex-col gap-2 py-2">
        <div className="flex justify-between items-center font-mono text-[11px]">
          <span className="text-chrome-deep">Operaciones Centralizadas</span>
          <span className="text-emerald-400 font-bold">100% Trazabilidad</span>
        </div>

        <div className="h-1.5 w-full bg-steel-grey/30 rounded-full overflow-hidden mb-1">
          <div className="h-full bg-electric-violet rounded-full w-full" />
        </div>

        <div className="flex flex-col gap-1.5">
          {ROWS.map((row, idx) => (
            <div
              key={idx}
              className="platform-row flex items-center justify-between rounded-lg bg-carbon-black/70 border border-steel-grey/30 p-2.5 font-mono text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-steel-grey text-[10px]">{row.id}</span>
                <span className="font-semibold text-chrome-highlight text-xs">{row.name}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${row.color}`}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
