"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import { Workflow, Zap, Check, Bot } from "lucide-react";

const NODES = [
  { step: "01", name: "Webhook", label: "Trigger" },
  { step: "02", name: "Engine", label: "Lógica" },
  { step: "03", name: "IA Model", label: "Enrich" },
  { step: "04", name: "CRM Sync", label: "DB" },
];

export default function AutomationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pipeline-node",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
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
          "radial-gradient(circle at 50% 0%, rgba(45, 143, 255, 0.15), transparent 70%), var(--graphite-metal)",
      }}
    >
      {/* Background Dots */}
      <div className="bg-dot-white pointer-events-none absolute inset-0 z-0 opacity-30" />

      {/* Top Header - Minimal Browser Dots + Status */}
      <div className="relative z-10 flex items-center justify-between border-b border-steel-grey/20 pb-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 text-emerald-400 font-mono text-xs font-semibold">
          <Workflow className="h-3 w-3" />
          <span>Pipeline Active (24ms)</span>
        </div>
      </div>

      {/* Pipeline Connected Nodes Grid */}
      <div className="relative z-10 my-auto grid grid-cols-2 gap-2.5 sm:grid-cols-4 py-2">
        {NODES.map((node, idx) => (
          <div
            key={idx}
            className="pipeline-node relative flex flex-col justify-between rounded-xl bg-carbon-black/70 border border-steel-grey/30 p-3 shadow-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[9px] text-steel-grey">{node.step}</span>
              {node.step === "03" ? (
                <Bot className="h-3.5 w-3.5 text-electric-violet" />
              ) : (
                <div className="h-3.5 w-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Check className="h-2.5 w-2.5" />
                </div>
              )}
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-chrome-highlight block">{node.name}</span>
              <span className="font-mono text-[10px] text-chrome-deep block mt-0.5">{node.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Output */}
      <div className="relative z-10 flex items-center justify-between rounded-lg bg-carbon-black border border-steel-grey/30 px-3 py-1.5 font-mono text-[10px]">
        <div className="flex items-center gap-1.5 text-chrome-deep">
          <Zap className="h-3 w-3 text-electric-violet" />
          <span className="text-chrome-highlight font-semibold">LOG:</span>
          <span className="text-steel-grey">Webhook → AI → Database</span>
        </div>
        <span className="text-emerald-400 font-bold">200 OK</span>
      </div>
    </div>
  );
}
