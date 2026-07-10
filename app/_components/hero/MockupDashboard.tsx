import React from "react";
import { BarChart3, LayoutGrid, Code2, Zap, Settings, Users } from "lucide-react";
import Image from "next/image";
import isotipoImg from "@/public/assets/isotipo.png";
import MockupShell from "./MockupShell";

/**
 * Bar heights for the mini chart. Pre-defined to avoid randomness
 * on each render (SSR/CSR mismatch). One bar is the "highlight" bar.
 */
const BAR_HEIGHTS = [35, 45, 55, 70, 60, 80, 55, 90, 75, 60, 70, 85, 65, 50, 75, 55, 40, 65];
const HIGHLIGHT_INDEX = 7; // The tallest bar gets the accent color

const SIDEBAR_ICONS = [BarChart3, LayoutGrid, Code2, Zap, Settings, Users];

const METRICS = [
  { value: "0.8s", label: "LCP" },
  { value: "0.01", label: "CLS" },
  { value: "8ms", label: "FID" },
];

const ACTIVITY_ROWS = [
  { barWidth: "w-24", dotColor: "bg-electric-violet/50" },
  { barWidth: "w-32", dotColor: "bg-neon-blue/50" },
  { barWidth: "w-20", dotColor: "bg-signal-emerald/50" },
];

/**
 * MockupDashboard — Main hero product interface.
 *
 * A conceptual dashboard that demonstrates Vorello's capacity
 * to build real product interfaces: sidebar, metric cards,
 * bar chart, and activity feed. All rendered as Tailwind/JSX.
 */
export default function MockupDashboard() {
  return (
    <MockupShell title="vorello.app">
      <div className="flex">
        {/* Sidebar — narrow icon column */}
        <div className="border-steel-grey/25 hidden flex-col items-center gap-3 border-r py-3 sm:flex sm:w-10 md:w-11 md:gap-3.5 md:py-4">
          {/* Mini isotipo as secondary seal/brand watermark */}
          <div className="mb-2 flex h-5 w-5 items-center justify-center">
            <Image
              src={isotipoImg}
              alt="Vorello Isotipo"
              className="h-3.5 w-auto opacity-75 select-none md:h-4.5"
            />
          </div>

          {SIDEBAR_ICONS.map((Icon, idx) => (
            <Icon
              key={idx}
              className="text-chrome-deep/60 hover:text-chrome-highlight h-3.5 w-3.5 transition-colors duration-200 md:h-4 md:w-4"
              strokeWidth={1.5}
            />
          ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 p-2.5 md:p-3">
          {/* Metric cards row */}
          <div className="mb-2 grid grid-cols-3 gap-1.5 md:mb-3 md:gap-2">
            {METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="hero-metric bg-carbon-black/60 border border-steel-grey/25 rounded-lg p-1.5 md:p-2"
              >
                <p className="text-chrome-highlight text-[10px] font-bold leading-none font-mono md:text-xs">
                  {metric.value}
                </p>
                <p className="text-chrome-deep/70 mt-0.5 text-[7px] font-mono uppercase tracking-wider md:text-[8px]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="hero-chart bg-carbon-black/40 border border-steel-grey/20 mb-2 flex h-10 items-end gap-[2px] rounded-lg px-2 pb-1.5 pt-1 md:mb-3 md:h-14 md:gap-[3px]">
            {BAR_HEIGHTS.map((height, idx) => (
              <div
                key={idx}
                className={`hero-chart-bar w-full rounded-t-[1px] transition-colors duration-500 origin-bottom ${
                  idx === HIGHLIGHT_INDEX
                    ? "hero-chart-highlight bg-electric-violet"
                    : "bg-steel-grey/45"
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          {/* Activity feed */}
          <div className="space-y-1.5 md:space-y-2">
            <p className="text-chrome-deep/55 text-[7px] font-mono uppercase tracking-wider md:text-[8px]">
              Recent activity
            </p>
            {ACTIVITY_ROWS.map((row, idx) => (
              <div key={idx} className="hero-activity-row flex items-center gap-1.5 md:gap-2">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.dotColor}`} />
                <span className={`bg-steel-grey/30 h-1.5 rounded-full md:h-2 ${row.barWidth}`} />
                <span className="bg-steel-grey/15 h-1.5 w-10 rounded-full md:h-2 md:w-14" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}
