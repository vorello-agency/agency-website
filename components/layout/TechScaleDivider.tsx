"use client";

import React from "react";
import Container from "@/components/layout/Container";
import Scales from "@/components/aceternity/scales";
import { cn } from "@/lib/utils";

interface TechScaleDividerProps {
  className?: string;
  index?: number;
}

export default function TechScaleDivider({ className, index = 1 }: TechScaleDividerProps) {
  const formattedIndex = String(index).padStart(2, "0");
  const scaleValue = index * 10;

  return (
    <div
      className={cn(
        "pointer-events-none relative z-50 flex h-8 w-full items-center justify-center bg-transparent select-none",
        className
      )}
    >
      {/* Central Solid Division Line */}
      <div className="via-steel-grey/40 absolute top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent to-transparent" />

      {/* Repeating Diagonal Scales Background for a high-end grid touch */}
      <div className="absolute inset-0 opacity-25">
        <Scales
          orientation="diagonal"
          size={8}
          color="rgba(255, 255, 255, 0.09)"
          className="[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        />
      </div>

      {/* Margins Indicators & Register Crosses aligned with Container */}
      <Container className="relative flex h-full items-center justify-between">
        {/* Left Register */}
        <div className="bg-steel-grey/30 absolute top-1/2 left-4 flex h-6 w-px -translate-y-1/2 items-center justify-center sm:left-6 lg:left-8">
          <div className="bg-steel-grey/30 absolute h-px w-6" />
          <span className="text-chrome-deep absolute left-5 font-mono text-[7px] tracking-widest whitespace-nowrap">
            + REG_{formattedIndex} {"// SEC_DIV"}
          </span>
        </div>

        {/* Right Register */}
        <div className="bg-steel-grey/30 absolute top-1/2 right-4 flex h-6 w-px -translate-y-1/2 items-center justify-center sm:right-6 lg:right-8">
          <div className="bg-steel-grey/30 absolute h-px w-6" />
          <span className="text-chrome-deep absolute right-5 font-mono text-[7px] tracking-widest whitespace-nowrap">
            + SCALE_X_{scaleValue} {"// SEC_DIV"}
          </span>
        </div>
      </Container>
    </div>
  );
}
