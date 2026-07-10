import React from "react";
import { Zap } from "lucide-react";

/**
 * SatellitePerformance — Core Web Vitals capability signal.
 *
 * A small floating card showing a performance score of 98/100.
 * Visible on all breakpoints (including mobile) because the
 * numeric impact is immediate and communicates technical quality.
 */
export default function SatellitePerformance() {
  return (
    <div className="bg-graphite-metal/95 border-steel-grey/35 w-40 rounded-lg border p-3 shadow-lg select-none text-left md:w-44">
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <div className="bg-signal-emerald/10 flex h-5 w-5 items-center justify-center rounded-md">
          <Zap className="text-signal-emerald h-3 w-3" strokeWidth={1.5} />
        </div>
        <span className="text-chrome-deep/80 text-[8px] font-mono uppercase tracking-wider">
          Core Web Vitals
        </span>
      </div>

      {/* Score — large prominent number */}
      <p className="text-signal-emerald hero-perf-score mb-2 text-2xl font-bold leading-none font-mono md:text-3xl">
        100
      </p>

      {/* Progress bar */}
      <div className="bg-steel-grey/20 mb-1.5 h-1 w-full rounded-full">
        <div className="bg-signal-emerald/60 hero-perf-bar relative h-full w-[100%] rounded-full">
          <span className="bg-signal-emerald absolute -right-1 -top-0.5 h-2 w-2 rounded-full" />
        </div>
      </div>

      {/* Label */}
      <p className="text-chrome-deep/60 text-[8px] font-mono">Performance Score</p>
    </div>
  );
}
