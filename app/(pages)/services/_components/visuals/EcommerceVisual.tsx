"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/register";
import { ShoppingBag, ShoppingCart, ArrowUpRight } from "lucide-react";

export default function EcommerceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setRevenue(148920);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to({ val: 0 }, {
        val: 148920,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: function () {
          setRevenue(Math.floor(this.targets()[0].val));
        },
      });

      gsap.to(".ecom-float-card", {
        y: -6,
        duration: 2.2,
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

      {/* Top Header - Minimal Browser Dots + Checkout Speed */}
      <div className="relative z-10 flex items-center justify-between border-b border-steel-grey/20 pb-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-neon-blue/10 border border-neon-blue/20 px-3 py-0.5 text-neon-blue font-mono text-xs font-semibold">
          <ShoppingBag className="h-3 w-3" />
          <span>Checkout 0.4s</span>
        </div>
      </div>

      {/* Main Grid: Revenue Stat + Product Card Mockup */}
      <div className="relative z-10 my-auto grid grid-cols-12 items-center gap-4 py-2">
        {/* Left: Live Sales Metric */}
        <div className="col-span-6 flex flex-col gap-2">
          <span className="font-mono text-[10px] text-chrome-deep uppercase tracking-wider block">
            Ventas Online
          </span>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-chrome-highlight flex items-baseline gap-1">
            <span>${revenue.toLocaleString()}</span>
            <span className="text-xs text-emerald-400 font-normal flex items-center">
              +24% <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>

          <div className="h-10 w-full rounded-lg bg-carbon-black/60 border border-steel-grey/30 p-2 flex items-center justify-between font-mono text-xs">
            <span className="text-chrome-deep text-[11px]">Sincronización</span>
            <span className="text-emerald-400 font-bold text-[11px]">En vivo ✓</span>
          </div>
        </div>

        {/* Right: Product Card Mockup */}
        <div className="col-span-6 flex justify-end">
          <div className="ecom-float-card w-full max-w-[160px] rounded-xl bg-carbon-black/85 border border-steel-grey/40 p-2.5 shadow-2xl backdrop-blur-md flex flex-col gap-2">
            <div className="h-20 w-full rounded-lg bg-gradient-to-br from-neon-blue/20 via-steel-grey/20 to-carbon-black border border-steel-grey/30 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-neon-blue/60" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="h-2 w-16 rounded bg-chrome-highlight/80 mb-1" />
                <span className="font-mono text-xs text-neon-blue font-bold">$240.00</span>
              </div>
              <div className="bg-electric-violet text-white p-1.5 rounded-lg flex items-center justify-center cursor-pointer shadow-md">
                <ShoppingCart className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
