import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "violet" | "grey" | "blue" | "orange";
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
        },
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-500 ease-out group-hover:scale-125",
            {
              "bg-electric-violet/70 group-hover:bg-electric-violet": variant === "violet",
            }
          )}
        />
      )}
      {children}
    </div>
  );
}
