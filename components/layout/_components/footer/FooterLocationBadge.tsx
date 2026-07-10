"use client";

import React from "react";
import { FlagImage } from "react-international-phone";

interface FooterLocationBadgeProps {
  localTime: string;
}

export default function FooterLocationBadge({ localTime }: FooterLocationBadgeProps) {
  return (
    <div className="bg-graphite-metal/30 border-steel-grey/30 inline-flex w-full flex-col gap-2 rounded-lg border p-3 select-none xs:flex-row xs:items-center xs:justify-between sm:gap-3 sm:p-2 sm:pl-4">
      <div className="flex min-w-0 flex-col">
        <span className="text-chrome-highlight flex items-center gap-3 font-mono text-[11px] font-medium tracking-tight whitespace-nowrap">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="bg-neon-blue absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-neon-blue relative inline-flex h-2 w-2 rounded-full" />
          </span>
          <span className="whitespace-nowrap">Desde Montevideo, Uruguay</span>
          <FlagImage
            iso2="uy"
            style={{ width: "20px", height: "15px" }}
            className="shrink-0 rounded-[2px] select-none"
          />
        </span>
        <span className="text-copy-muted/60 mt-1 hidden pl-5 font-mono text-[11px] tracking-tight whitespace-nowrap min-[375px]:block">
          Hub tecnológico en América Latina
        </span>
      </div>
      <span
        className="text-chrome-highlight pl-4 font-mono text-[11px] font-medium tracking-tight whitespace-nowrap sm:my-auto ml-auto sm:pl-0"
        title="Hora local en Montevideo, Uruguay"
      >
        <span className="text-chrome-highlight/90 font-semibold">
          {localTime || "--:--"}
        </span>{" "}
        <span className="text-copy-muted/60 font-sans text-[10px]">(UTC-3)</span>
      </span>
    </div>
  );
}
