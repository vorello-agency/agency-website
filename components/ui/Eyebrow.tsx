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
        variant === "violet" && "text-electric-violet text-xs tracking-widest",
        variant === "green" && "text-signal-emerald text-xs tracking-widest",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className="pointer-events-none mr-2 select-none">
        {"//"}
      </span>
      {children}
    </span>
  );
}
