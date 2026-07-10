import React from "react";
import { Route, Check } from "lucide-react";

const STEPS = [
  { label: "Discovery", status: "done" },
  { label: "Strategy", status: "done" },
  { label: "UX/UI", status: "active" },
  { label: "Development", status: "pending" },
  { label: "Launch", status: "pending" },
] as const;

/**
 * SatelliteProcess — Process phases capability signal.
 *
 * A small floating card showing the project lifecycle phases
 * with visual status indicators. Reinforces Vorello's systematic
 * approach to product development.
 *
 * Only visible on desktop (lg+).
 */
export default function SatelliteProcess() {
  return (
    <div className="bg-graphite-metal/95 border-steel-grey/35 w-40 rounded-lg border p-3 shadow-lg select-none text-left md:w-44">
      {/* Header */}
      <div className="mb-2.5 flex items-center gap-2">
        <div className="bg-electric-violet/10 flex h-5 w-5 items-center justify-center rounded-md">
          <Route className="text-electric-violet h-3 w-3" strokeWidth={1.5} />
        </div>
        <span className="text-chrome-highlight text-[11px] font-bold tracking-tight">Process</span>
      </div>

      {/* Phase list */}
      <div className="space-y-1.5">
        {STEPS.map((step, idx) => (
          <div key={idx} className="hero-process-step flex items-center gap-2">
            {/* Status indicator container - fixed size to align labels perfectly */}
            <div className="flex h-3 w-3 shrink-0 items-center justify-center">
              {step.status === "done" && (
                <Check className="text-signal-emerald/60 h-3 w-3" strokeWidth={2} />
              )}
              {step.status === "active" && (
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className="bg-electric-violet absolute h-2.5 w-2.5 animate-ping rounded-full opacity-40" />
                  <span className="bg-electric-violet relative h-2 w-2 rounded-full" />
                </div>
              )}
              {step.status === "pending" && (
                <span className="border-steel-grey/40 h-2 w-2 rounded-full border" />
              )}
            </div>

            {/* Label */}
            <span
              className={`text-[10px] font-mono ${
                step.status === "active"
                  ? "text-electric-violet font-semibold"
                  : step.status === "done"
                    ? "text-chrome-deep/70"
                    : "text-chrome-deep/45"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
