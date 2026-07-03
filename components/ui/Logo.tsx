import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "isotipo" | "logotipo" | "both";
type LogoSize = "sm" | "md" | "lg" | "xl";

type LogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  isotipoClassName?: string;
  logotipoClassName?: string;
  alt?: string;
};

const sizeMap: Record<
  LogoSize,
  { isotipoPx: number; logotipoPx: number; gap: string }
> = {
  sm: { isotipoPx: 28, logotipoPx: 24, gap: "gap-2" },
  md: { isotipoPx: 36, logotipoPx: 32, gap: "gap-2.5" },
  lg: { isotipoPx: 44, logotipoPx: 40, gap: "gap-3" },
  xl: { isotipoPx: 52, logotipoPx: 48, gap: "gap-3.5" },
};

export default function Logo({
  variant = "both",
  size = "md",
  className,
  isotipoClassName,
  logotipoClassName,
  alt = "Vorello Agency",
}: LogoProps) {
  const sizes = sizeMap[size];
  const showIsotipo = variant === "isotipo" || variant === "both";
  const showLogotipo = variant === "logotipo" || variant === "both";

  return (
    <span className={cn("inline-flex items-center", sizes.gap, className)}>
      {showIsotipo && (
        <Image
          src="/assets/isotipo.webp"
          alt={variant === "isotipo" ? alt : ""}
          aria-hidden={variant !== "isotipo"}
          width={256}
          height={219}
          priority
          className={cn("w-auto", isotipoClassName)}
          style={{ height: `${sizes.isotipoPx}px` }}
        />
      )}

      {showLogotipo && (
        <Image
          src="/assets/logotipo.svg"
          priority
          alt={showIsotipo ? "" : alt}
          aria-hidden={showIsotipo}
          width={776}
          height={400}
          className={cn("w-auto", logotipoClassName)}
          style={{ height: `${sizes.logotipoPx}px` }}
        />
      )}
    </span>
  );
}
