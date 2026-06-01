import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl 2xl:max-w-5xl mb-12 md:mb-16 2xl:mb-20",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="text-xs uppercase tracking-widest font-mono text-electric-violet block mb-3 font-semibold">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold tracking-tight text-chrome-highlight mb-4 leading-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-chrome-deep leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
