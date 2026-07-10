"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import AmbientGlow from "@/components/ui/AmbientGlow";
import { createCardInteraction, CardInteractionHandlers } from "@/lib/gsap/primitives/hover-card";

interface FitCardProps {
  variant: "ideal" | "avoid";
  items: string[];
  title: string;
  icon: LucideIcon;
}

export default function FitCard({ variant, items, title, icon: Icon }: FitCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  const [handlers, setHandlers] = useState<CardInteractionHandlers | null>(null);

  const isIdeal = variant === "ideal";

  // Use the unified card hover interaction primitive
  useEffect(() => {
    if (!cardRef.current) return;

    setHandlers(
      createCardInteraction(
        {
          card: cardRef.current,
          accentLine: accentLineRef.current,
          iconContainer: iconContainerRef.current,
        },
        isIdeal
          ? {
              // Custom color tokens for Ideal Fit card
              activeBorder: "rgba(123, 76, 255, 0.4)",
              activeIconBorder: "rgba(123, 76, 255, 0.5)",
              activeIconColor: "var(--electric-violet)",
              activeIconBg: "rgba(123, 76, 255, 0.1)",
              restBorder: "rgba(123, 76, 255, 0.2)",
              restIconBorder: "rgba(123, 76, 255, 0.3)",
              restIconColor: "var(--electric-violet)",
              restIconBg: "rgba(123, 76, 255, 0.1)",
            }
          : {
              // Custom color tokens for Avoid Fit card
              activeBorder: "rgba(90, 98, 112, 0.5)",
              activeIconBorder: "rgba(90, 98, 112, 0.5)",
              activeIconColor: "var(--chrome-highlight)",
              activeIconBg: "rgba(90, 98, 112, 0.1)",
              restBorder: "rgba(42, 46, 51, 0.3)",
              restIconBorder: "rgba(42, 46, 51, 0.3)",
              restIconColor: "var(--chrome-highlight)",
              restIconBg: "rgba(42, 46, 51, 0.25)",
              activeShadow: "rgba(0, 0, 0, 0.4)",
            }
      )
    );
  }, [isIdeal]);

  const itemClass = isIdeal ? "fit-ideal-item" : "fit-avoid-item";

  return (
    <div
      ref={cardRef}
      onMouseEnter={handlers?.onMouseEnter}
      onMouseLeave={handlers?.onMouseLeave}
      onTouchStart={handlers?.onTouchStart}
      onTouchEnd={handlers?.onTouchEnd}
      onTouchCancel={handlers?.onTouchCancel}
      className={`relative h-full rounded-xl border p-5 transition-colors duration-300 select-none md:p-8 2xl:p-10 ${
        isIdeal
          ? "border-electric-violet/20 bg-graphite-metal"
          : "border-steel-grey/30 bg-graphite-metal"
      }`}
    >
      {/* Accent line sweep on hover */}
      <div
        ref={accentLineRef}
        className={`pointer-events-none absolute inset-x-0 -top-px h-[2px] origin-center scale-x-0 rounded-full ${
          isIdeal
            ? "via-electric-violet/50 bg-gradient-to-r from-transparent to-transparent"
            : "via-steel-grey/40 bg-gradient-to-r from-transparent to-transparent"
        }`}
      />

      {/* Card ambient glow */}
      {isIdeal && (
        <AmbientGlow className="bg-electric-violet/[0.06] -top-8 left-1/2 h-24 w-48 -translate-x-1/2 blur-[50px]" />
      )}

      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "center",
          WebkitMaskImage: "radial-gradient(ellipse at center, white 30%, transparent 80%)",
          maskImage: "radial-gradient(ellipse at center, white 30%, transparent 80%)",
        }}
      />

      {/* Header */}
      <div className="relative mb-4 flex items-center gap-3 md:mb-6 2xl:mb-8 2xl:gap-4">
        <div
          ref={iconContainerRef}
          className={`fit-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 2xl:h-10 2xl:w-10 ${
            isIdeal
              ? "bg-electric-violet/10 border-electric-violet/30 text-electric-violet border"
              : "bg-steel-grey/20 border-steel-grey/30 text-chrome-highlight/75 border"
          }`}
        >
          <Icon className="h-4 w-4 2xl:h-5 2xl:w-5" />
        </div>
        <h3 className="text-chrome-highlight text-lg font-semibold tracking-tight 2xl:text-2xl">
          {title}
        </h3>
      </div>

      {/* List items */}
      <ul className="relative flex flex-col gap-3 md:gap-4 2xl:gap-5">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`${itemClass} flex gap-2 text-sm md:gap-3 2xl:gap-4 2xl:text-base ${
              isIdeal ? "text-chrome-highlight" : "text-chrome-highlight/75"
            }`}
          >
            <div className="mt-0.5 flex w-8 shrink-0 justify-center 2xl:w-10">
              <Icon
                className={`h-5 w-5 2xl:h-6 2xl:w-6 ${
                  isIdeal ? "text-electric-violet" : "text-chrome-highlight/40"
                }`}
              />
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
