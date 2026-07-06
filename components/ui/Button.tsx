import React from "react";
import { ArrowRight } from "lucide-react";
import { animateNavbarCtaArrowEnter, animateNavbarCtaArrowLeave } from "@/lib/gsap/animations";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "primary-blue" | "secondary" | "outline" | "subtle";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "hover:bg-opacity-90 inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-all duration-200 hover:scale-105 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        {
          "group gap-2": withArrow,
        },
        // Variants
        {
          "bg-electric-violet hover:bg-electric-violet/90 shadow-electric-violet/10 border-electric-violet/20 focus-visible:ring-electric-violet/50 border text-white shadow-lg focus-visible:ring-2":
            variant === "primary",
          "bg-neon-blue hover:bg-neon-blue/90 shadow-neon-blue/15 border-neon-blue/20 focus-visible:ring-neon-blue/50 border text-white shadow-lg focus-visible:ring-2":
            variant === "primary-blue",
          "bg-graphite-metal hover:bg-steel-grey/80 border-steel-grey/60 text-chrome-highlight focus-visible:ring-steel-grey/50 border focus-visible:ring-2":
            variant === "secondary",
          "border-steel-grey/60 hover:border-chrome-highlight/40 text-chrome-highlight focus-visible:ring-chrome-deep/50 border hover:bg-white/5 focus-visible:ring-2":
            variant === "outline",
          "text-chrome-deep hover:text-chrome-highlight focus-visible:ring-chrome-deep/50 hover:bg-white/5 focus-visible:ring-2":
            variant === "subtle",
        },
        // Sizes
        {
          "px-3 py-1.5 text-xs": size === "sm",
          "px-5 py-2.5 text-sm": size === "md",
          "px-6 py-3.5 text-base hover:scale-[1.02]": size === "lg",
        },
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (!withArrow) return;
        const arrow = e.currentTarget.querySelector(".nav-cta-arrow") as HTMLElement | null;
        if (arrow) animateNavbarCtaArrowEnter(arrow);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        if (!withArrow) return;
        const arrow = e.currentTarget.querySelector(".nav-cta-arrow") as HTMLElement | null;
        if (arrow) animateNavbarCtaArrowLeave(arrow);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        if (!withArrow) return;
        const arrow = e.currentTarget.querySelector(".nav-cta-arrow") as HTMLElement | null;
        if (arrow) animateNavbarCtaArrowEnter(arrow);
      }}
      onBlur={(e) => {
        onBlur?.(e);
        if (!withArrow) return;
        const arrow = e.currentTarget.querySelector(".nav-cta-arrow") as HTMLElement | null;
        if (arrow) animateNavbarCtaArrowLeave(arrow);
      }}
      {...props}
    >
      {children}
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="nav-cta-arrow mt-0.75 h-4 w-4 shrink-0 overflow-visible opacity-60"
        />
      ) : null}
    </button>
  );
}
