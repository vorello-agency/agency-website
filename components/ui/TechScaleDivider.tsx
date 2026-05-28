"use client";

import React from "react";
import Container from "@/components/ui/Container";
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
    <div className={cn("w-full h-8 relative z-50 pointer-events-none select-none flex items-center justify-center bg-transparent", className)}>
      {/* Central Solid Division Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-steel-grey/40 to-transparent absolute top-1/2 -translate-y-1/2" />

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
      <Container className="relative h-full flex items-center justify-between">
        {/* Left Register */}
        <div className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 h-6 w-px bg-steel-grey/30 flex items-center justify-center">
          <div className="absolute w-6 h-px bg-steel-grey/30" />
          <span className="absolute left-5 font-mono text-[7px] text-chrome-deep whitespace-nowrap tracking-widest">
            + REG_{formattedIndex} {"// SEC_DIV"}
          </span>
        </div>

        {/* Right Register */}
        <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 h-6 w-px bg-steel-grey/30 flex items-center justify-center">
          <div className="absolute w-6 h-px bg-steel-grey/30" />
          <span className="absolute right-5 font-mono text-[7px] text-chrome-deep whitespace-nowrap tracking-widest">
            + SCALE_X_{scaleValue} {"// SEC_DIV"}
          </span>
        </div>
      </Container>
    </div>
  );
}
