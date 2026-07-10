import React from "react";
import { cn } from "@/lib/utils";

interface MockupShellProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * MockupShell — Reusable browser chrome wrapper for hero mockups.
 *
 * Renders a minimal dark browser frame with traffic-light dots
 * and an optional title. The children slot receives the actual
 * mockup content (dashboard, e-commerce, etc.).
 */
export default function MockupShell({ title = "vorello.app", children, className }: MockupShellProps) {
  return (
    <div
      className={cn(
        "bg-graphite-metal/95 border-steel-grey/35 overflow-hidden rounded-xl border shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Title bar with traffic lights */}
      <div className="border-steel-grey/25 flex h-7 items-center gap-1.5 border-b px-3 md:h-8">
        {/* Traffic light dots — slightly higher opacity for better visibility */}
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/60" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e]/60" />
        <span className="h-2 w-2 rounded-full bg-[#27c93f]/60" />

        {/* Title — pushed to the right */}
        <span className="text-chrome-deep/70 ml-auto font-mono text-[9px] tracking-wider select-none">
          {title}
        </span>
      </div>

      {/* Content area — children handle their own padding */}
      {children}
    </div>
  );
}
