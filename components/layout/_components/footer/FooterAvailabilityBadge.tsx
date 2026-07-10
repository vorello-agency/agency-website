"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface FooterAvailabilityBadgeProps {
  quarter: string;
  year: number;
}

export default function FooterAvailabilityBadge({ quarter, year }: FooterAvailabilityBadgeProps) {
  return (
    <div className="bg-graphite-metal/30 border-steel-grey/30 inline-flex w-full flex-col gap-2 rounded-lg border p-3 select-none xs:flex-row xs:items-center xs:justify-between sm:gap-3 sm:p-1 sm:pl-4">
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="bg-signal-emerald absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
          <span className="bg-signal-emerald relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <span className="xs:hidden sm:block text-chrome-highlight font-mono text-[11px] font-medium tracking-tight whitespace-nowrap">
          Disponible para proyectos • {quarter} {year}
        </span>
        <span className="hidden xs:block sm:hidden text-chrome-highlight font-mono text-[11px] font-medium tracking-tight whitespace-nowrap">
          Disponible para proyectos
          <span className="text-copy-muted/60 mt-1 block font-mono tracking-tight whitespace-nowrap">
            {quarter} {year}
          </span>
        </span>
      </div>

      {/* Desktop Button: hidden on mobile */}
      <Link
        href="/start"
        className="hidden shrink-0 focus-visible:outline-none sm:ml-auto sm:flex"
      >
        <Button
          variant="primary-blue"
          size="sm"
          withArrow
          className="w-full rounded-md !px-3 !py-1 !text-[11px] transition-all duration-300 hover:!scale-100 hover:shadow-[0_0_12px_rgba(45,143,255,0.25)] active:!scale-100 sm:w-auto"
        >
          Solicitar propuesta
        </Button>
      </Link>

      {/* Mobile Button: subtle outline style aligned to the left (indented pl-5) */}
      <Link
        href="/start"
        className="mt-1 flex shrink-0 pl-5 focus-visible:outline-none sm:hidden"
      >
        <Button
          variant="outline"
          size="sm"
          withArrow
          className="border-steel-grey/40 hover:border-chrome-highlight/30 text-chrome-highlight bg-carbon-black/30 hover:bg-carbon-black/60 w-auto rounded-md !px-2.5 !py-1.5 !text-[10px] transition-all duration-300"
        >
          Solicitar propuesta
        </Button>
      </Link>
    </div>
  );
}
