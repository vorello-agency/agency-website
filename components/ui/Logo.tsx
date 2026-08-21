import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import isotipoImg from "@/public/assets/isotipo.webp";

type LogoVariant = "isotipo" | "logotipo" | "both" | "logo";
type LogoSize = "sm" | "md" | "lg" | "xl";

type LogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  isotipoClassName?: string;
  logotipoClassName?: string;
  alt?: string;
};

const sizeMap: Record<LogoSize, { heightPx: number; isotipoPx: number; logotipoPx: number }> = {
  sm: { heightPx: 52, isotipoPx: 32, logotipoPx: 28 },
  md: { heightPx: 68, isotipoPx: 42, logotipoPx: 38 },
  lg: { heightPx: 84, isotipoPx: 52, logotipoPx: 48 },
  xl: { heightPx: 104, isotipoPx: 64, logotipoPx: 60 },
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

  if (variant === "both" || variant === "logo") {
    return (
      <span className={cn("inline-flex items-center select-none", className)}>
        <Image
          src="/assets/logo.webp"
          alt={alt}
          width={1500}
          height={613}
          priority
          draggable={false}
          className="h-full w-auto select-none"
          style={{ height: `${sizes.heightPx}px` }}
        />
      </span>
    );
  }

  if (variant === "isotipo") {
    return (
      <span className={cn("inline-flex items-center select-none", className)}>
        <Image
          src={isotipoImg}
          alt={alt}
          priority
          draggable={false}
          className={cn("w-auto select-none", isotipoClassName)}
          style={{ height: `${sizes.isotipoPx}px` }}
        />
      </span>
    );
  }

  if (variant === "logotipo") {
    return (
      <span className={cn("inline-flex items-center select-none", className)}>
        <Image
          src="/assets/logotipo.webp"
          priority
          draggable={false}
          alt={alt}
          width={776}
          height={400}
          className={cn("w-auto select-none", logotipoClassName)}
          style={{ height: `${sizes.logotipoPx}px` }}
        />
      </span>
    );
  }

  return null;
}
