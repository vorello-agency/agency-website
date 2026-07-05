import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  variant?: "violet" | "green" | "custom";
}

export default function Eyebrow({
  children,
  variant = "violet",
  className,
  ...props
}: EyebrowProps) {
  if (!children) return null;

  return (
    <span
      className={cn(
        "font-mono font-semibold uppercase",
        variant === "violet" && "text-xs tracking-widest text-electric-violet",
        variant === "green" && "text-xs tracking-widest text-signal-emerald",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="select-none pointer-events-none mr-2">
        {"//"}
      </span>
      {children}
    </span>
  );
}
