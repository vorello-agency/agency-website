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
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono backdrop-blur-sm transition-all duration-500 ease-out cursor-default select-none group",
        // Color variants
        {
          // Violet theme (Vorello's active badge theme)
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-electric-violet/40 hover:bg-white/[0.02] hover:text-chrome-highlight animate-pulse hover:animate-none":
            variant === "violet",
          // Green theme (Emerald)
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-signal-emerald/40 hover:bg-white/[0.02] hover:text-chrome-highlight animate-pulse hover:animate-none":
            variant === "green",
          // Grey theme
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-chrome-deep/40 hover:bg-white/[0.02] hover:text-chrome-highlight":
            variant === "grey",
          // Blue theme
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-neon-blue/40 hover:bg-white/[0.02] hover:text-chrome-highlight":
            variant === "blue",
          // Orange theme
          "border-steel-grey/30 bg-graphite-metal/50 text-chrome-deep hover:border-signal-orange/40 hover:bg-white/[0.02] hover:text-chrome-highlight":
            variant === "orange",
        }
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out group-hover:scale-125",
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
