import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Section({
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 lg:py-32 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
