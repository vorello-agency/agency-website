import React from "react";
import { Palette } from "lucide-react";

const SWATCHES = [
  { color: "bg-carbon-black", border: "border-steel-grey/30" },
  { color: "bg-graphite-metal", border: "border-steel-grey/20" },
  { color: "bg-steel-grey", border: "border-transparent" },
  { color: "bg-neon-blue", border: "border-transparent" },
  { color: "bg-electric-violet", border: "border-transparent" },
];

/**
 * SatelliteDesign — Design System capability signal.
 *
 * A small floating card that communicates Vorello's systematic
 * approach to design: component library, layout patterns,
 * and a visual palette preview.
 */
export default function SatelliteDesign() {
  return (
    <div className="bg-graphite-metal/95 border-steel-grey/35 w-44 rounded-lg border p-3 shadow-lg select-none text-left md:w-48">
      {/* Header */}
      <div className="mb-2.5 flex items-center gap-2">
        <div className="bg-electric-violet/10 flex h-5 w-5 items-center justify-center rounded-md">
          <Palette className="text-electric-violet h-3 w-3" strokeWidth={1.5} />
        </div>
        <span className="text-chrome-highlight text-[11px] font-bold tracking-tight">
          Design System
        </span>
      </div>

      {/* Stats */}
      <div className="mb-3 space-y-1">
        <p className="text-chrome-deep/80 text-[9px] font-mono">
          <span className="hero-design-components">24</span> components
        </p>
        <p className="text-chrome-deep/80 text-[9px] font-mono">
          <span className="hero-design-layouts">8</span> layout patterns
        </p>
      </div>

      {/* Color swatches */}
      <div className="flex items-center gap-1.5">
        {SWATCHES.map((swatch, idx) => (
          <div
            key={idx}
            className={`hero-design-swatch h-3 w-3 rounded-sm border ${swatch.color} ${swatch.border}`}
          />
        ))}
      </div>
    </div>
  );
}
