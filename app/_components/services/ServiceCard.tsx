"use client";

import React, { useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createCardInteraction } from "@/lib/gsap/primitives/hover-card";
import { hoverIconEnter, hoverIconLeave } from "@/lib/gsap/primitives/hover-icon";
import Eyebrow from "@/components/ui/Eyebrow";
import Link from "next/link";
import type { ServiceCategory } from "@/data/services";
import { Globe, Cpu, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

/** Map iconName strings from data to actual Lucide components */
const ICON_MAP: Record<ServiceCategory["iconName"], LucideIcon> = {
  Globe,
  Cpu,
  ShoppingBag,
};

/** Map service num to anchor on /services page */
const SERVICE_LINKS: Record<string, string> = {
  "01": "/services#sitios-web",
  "02": "/services#plataformas-web",
  "03": "/services#ecommerce",
};

interface ServiceCardProps {
  service: ServiceCategory;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICON_MAP[service.iconName];
  const cardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Card hover/touch handlers (delegated to primitive)
  const getHandlers = useCallback(() => {
    if (!cardRef.current) return null;
    return createCardInteraction({
      card: cardRef.current,
      accentLine: accentLineRef.current,
      iconContainer: iconRef.current,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    getHandlers()?.onMouseEnter();
    // Unified SVG icon hover
    const svg = cardRef.current?.querySelector("svg");
    if (svg) hoverIconEnter(svg);
  }, [getHandlers]);

  const handleMouseLeave = useCallback(() => {
    getHandlers()?.onMouseLeave();
    const svg = cardRef.current?.querySelector("svg");
    if (svg) hoverIconLeave(svg);
  }, [getHandlers]);

  const handleTouchStart = useCallback(() => {
    getHandlers()?.onTouchStart();
  }, [getHandlers]);

  const handleTouchEnd = useCallback(() => {
    getHandlers()?.onTouchEnd();
  }, [getHandlers]);

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        `service-card-grid-${service.num}`,
        "service-card group border-steel-grey/30 bg-graphite-metal relative rounded-xl border p-6 select-none transition-all duration-300",
        "flex flex-col md:p-8",
        "xmd:grid xmd:grid-cols-[1.5fr_1fr] xmd:gap-x-12 xmd:gap-y-4 xmd:p-10",
        "xlg:flex xlg:flex-col xlg:p-8 xlg:gap-0",
        "2xl:p-8"
      )}
    >
      <style>{`
        @media (min-width: 900px) {
          .service-card-grid-${service.num} {
            display: grid !important;
            grid-template-areas:
              "icon num"
              "info bullets"
              "info bullets"
              "info cta";
          }
          .service-card-grid-${service.num} .services-icon { grid-area: icon; }
          .service-card-grid-${service.num} .services-num { grid-area: num; justify-self: end; }
          .service-card-grid-${service.num} .services-grid-info { grid-area: info; }
          .service-card-grid-${service.num} .services-grid-bullets { grid-area: bullets; }
          .service-card-grid-${service.num} .services-grid-cta { grid-area: cta; }
        }
        @media (min-width: 1150px) {
          .service-card-grid-${service.num} {
            display: flex !important;
          }
        }
      `}</style>

      {/* Accent line animation hover */}
      <div
        ref={accentLineRef}
        className="services-accent-line via-electric-violet/40 absolute inset-x-0 -top-px h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-transparent to-transparent"
      />

      {/* Header: Icon & Num (contents display on xmd to let them occupy independent grid areas) */}
      <div className="services-grid-header mb-5 flex w-full items-center justify-between xmd:contents xlg:flex xlg:w-full xlg:justify-between xlg:items-center xlg:gap-0 xlg:mb-8">
        <div
          ref={iconRef}
          className="services-icon bg-steel-grey/25 border-steel-grey/30 text-chrome-highlight flex h-12 w-12 items-center justify-center rounded-lg border transition-[color,border-color,background-color] duration-300"
        >
          <Icon className="h-6 w-6" />
        </div>
        <Eyebrow
          variant="custom"
          className="services-num text-steel-grey text-sm transition-colors"
        >
          {service.num}
        </Eyebrow>
      </div>

      {/* Title & Description Wrapper */}
      <div className="services-grid-info flex flex-col min-h-0 xlg:min-h-[140px] xl:min-h-[120px] 2xl:min-h-[140px]">
        {/* Title */}
        <h3 className="services-grid-title services-title text-chrome-highlight mb-3 text-xl leading-snug font-bold tracking-tight transition-colors whitespace-nowrap 2xl:text-[22px]">
          {service.title}
        </h3>

        {/* Description */}
        <p className="services-desc text-copy-muted mb-4 text-sm leading-relaxed text-pretty md:mb-6 lg:mb-4 xlg:mb-6 2xl:text-base">
          {service.description}
        </p>
      </div>

      {/* Features / Bullets */}
      <ul className="services-grid-bullets border-steel-grey/20 mt-auto mb-5 flex flex-col gap-2 border-t pt-4 md:mb-8 md:gap-2.5 md:pt-6 xmd:mt-0 xmd:mb-0 xmd:border-t-0 xmd:pt-0 xmd:gap-2 xlg:mt-auto xlg:mb-8 xlg:border-t xlg:pt-6 xlg:gap-2.5 xlg:pt-6 2xl:gap-3.5">
        {service.features.map((feature, fIdx) => (
          <li
            key={fIdx}
            className="services-list-item text-copy-muted flex items-center gap-2 text-xs 2xl:text-sm"
          >
            <span className="bg-electric-violet/70 h-1 w-1 rounded-full" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="services-grid-cta services-cta mt-auto">
        <Link
          href={SERVICE_LINKS[service.num] ?? "/services"}
          className="text-chrome-highlight hover:text-electric-violet group/cta inline-flex items-center gap-2 font-mono text-xs font-semibold transition-colors focus-visible:outline-none 2xl:text-sm"
        >
          Ver servicio{" "}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
