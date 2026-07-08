import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "violet" | "grey" | "blue" | "orange" | "green";
  withDot?: boolean;
}

export default function Badge({
  children,
  variant = "violet",
  withDot = true,
  className,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        // Base structure
        "group inline-flex cursor-default items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs backdrop-blur-sm transition-all duration-500 ease-out select-none",
        // Color variants
        {
          // Violet theme (Vorello's active badge theme)
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-electric-violet/40 hover:text-chrome-highlight animate-pulse hover:animate-none hover:bg-white/[0.02]":
            variant === "violet",
          // Green theme (Emerald)
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-signal-emerald/40 hover:text-chrome-highlight animate-pulse hover:animate-none hover:bg-white/[0.02]":
            variant === "green",
          // Grey theme
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-chrome-deep/40 hover:text-chrome-highlight hover:bg-white/[0.02]":
            variant === "grey",
          // Blue theme
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-neon-blue/40 hover:text-chrome-highlight hover:bg-white/[0.02]":
            variant === "blue",
          // Orange theme
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-signal-orange/40 hover:text-chrome-highlight hover:bg-white/[0.02]":
            variant === "orange",
        },
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-500 ease-out group-hover:scale-125",
            {
              "bg-electric-violet/70 group-hover:bg-electric-violet": variant === "violet",
              "bg-signal-emerald/70 group-hover:bg-signal-emerald": variant === "green",
              "bg-chrome-deep/70 group-hover:bg-chrome-deep": variant === "grey",
              "bg-neon-blue/70 group-hover:bg-neon-blue": variant === "blue",
              "bg-signal-orange/70 group-hover:bg-signal-orange": variant === "orange",
            }
          )}
        />
      )}
      {children}
    </div>
  );
}
