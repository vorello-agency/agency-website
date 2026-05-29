import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "primary-blue" | "secondary" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] focus-visible:outline-none",
        // Variants
        {
          "bg-electric-violet hover:bg-electric-violet/90 text-white shadow-lg shadow-electric-violet/10 border border-electric-violet/20 focus-visible:ring-2 focus-visible:ring-electric-violet/50":
            variant === "primary",
          "bg-neon-blue hover:bg-neon-blue/90 text-white shadow-lg shadow-neon-blue/15 border border-neon-blue/20 focus-visible:ring-2 focus-visible:ring-neon-blue/50":
            variant === "primary-blue",
          "bg-graphite-metal hover:bg-steel-grey/80 border border-steel-grey/60 text-chrome-highlight focus-visible:ring-2 focus-visible:ring-steel-grey/50":
            variant === "secondary",
          "border border-steel-grey/60 hover:border-chrome-highlight/40 hover:bg-white/5 text-chrome-highlight focus-visible:ring-2 focus-visible:ring-chrome-deep/50":
            variant === "outline",
          "text-chrome-deep hover:text-chrome-highlight hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-chrome-deep/50":
            variant === "subtle",
        },
        // Sizes
        {
          "px-3 py-1.5 text-xs": size === "sm",
          "px-5 py-2.5 text-sm": size === "md",
          "px-6 py-3.5 text-base": size === "lg",
        },
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
      {...props}
    >
      {children}
    </button>
  );
}
