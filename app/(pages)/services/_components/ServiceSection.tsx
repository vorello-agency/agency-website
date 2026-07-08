"use client";

import React, { useEffect, useRef } from "react";
import { ServiceDetail } from "@/data/services";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { gsap } from "@/lib/gsap/register";
import Eyebrow from "@/components/ui/Eyebrow";
import { Globe, FileText, Cpu, ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceSectionProps {
  service: ServiceDetail;
  index: number;
}

// Map service ID to an interactive icon representation for the visual placeholder
function VisualPlaceholder({ serviceId }: { serviceId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Small floating animation for elements inside the visual container
      gsap.to(".floating-element", {
        y: -6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.2,
      });

      if (serviceId === "automatizaciones") {
        gsap.to(".pulse-dot", {
          scale: 1.5,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [serviceId]);

  return (
    <div
      ref={containerRef}
      className="bg-graphite-metal border-steel-grey/30 relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border p-6 select-none md:p-8"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(42, 46, 51, 0.4), transparent 70%), var(--graphite-metal)",
      }}
    >
      {/* Grid background overlay */}
      <div className="bg-grid-small absolute inset-0 z-0 opacity-30" />

      {/* Glow highlight */}
      <div
        className={cn(
          "pointer-events-none absolute z-0 h-48 w-48 rounded-full opacity-15 blur-[80px]",
          serviceId === "sitios-web" || serviceId === "landing-pages" || serviceId === "ecommerce"
            ? "bg-neon-blue"
            : "bg-electric-violet"
        )}
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between">
        {/* Header decoration of mockup */}
        <div className="border-steel-grey/20 flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center gap-1.5">
            <span className="bg-steel-grey/40 h-2.5 w-2.5 rounded-full" />
            <span className="bg-steel-grey/40 h-2.5 w-2.5 rounded-full" />
            <span className="bg-steel-grey/40 h-2.5 w-2.5 rounded-full" />
          </div>
          <span className="text-steel-grey font-mono text-[10px] tracking-wider uppercase">
            Vorello Core System v1.0
          </span>
        </div>

        {/* Dynamic Inner Representation based on Service */}
        <div className="flex w-full flex-1 items-center justify-center py-4">
          {serviceId === "sitios-web" && (
            <div className="floating-element bg-carbon-black border-steel-grey/40 flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4 shadow-2xl">
              <div className="bg-steel-grey/20 h-4 w-3/4 rounded-md" />
              <div className="bg-steel-grey/10 h-3 w-1/2 rounded-md" />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="bg-steel-grey/10 flex h-10 items-center justify-center rounded-md">
                  <Globe className="text-neon-blue h-4 w-4" />
                </div>
                <div className="col-span-2 flex flex-col justify-center gap-1.5">
                  <div className="bg-steel-grey/25 h-2 w-full rounded-md" />
                  <div className="bg-steel-grey/10 h-2 w-4/5 rounded-md" />
                </div>
              </div>
            </div>
          )}

          {serviceId === "landing-pages" && (
            <div className="floating-element bg-carbon-black border-steel-grey/40 flex w-full max-w-xs flex-col items-center gap-4 rounded-lg border p-4 text-center shadow-2xl">
              <div className="bg-neon-blue/10 border-neon-blue/20 flex h-8 w-8 items-center justify-center rounded-lg border">
                <FileText className="text-neon-blue h-4 w-4" />
              </div>
              <div className="flex w-full flex-col gap-1.5">
                <div className="bg-steel-grey/20 mx-auto h-3 w-4/5 rounded-md" />
                <div className="bg-steel-grey/10 mx-auto h-2 w-3/5 rounded-md" />
              </div>
              <div className="bg-electric-violet w-full rounded-md py-2 font-mono text-xs font-bold tracking-wider text-white uppercase">
                100% conversion
              </div>
            </div>
          )}

          {serviceId === "plataformas-web" && (
            <div className="floating-element bg-carbon-black border-steel-grey/40 flex w-full max-w-sm gap-3 rounded-lg border p-3 shadow-2xl">
              <div className="bg-steel-grey/15 flex w-16 flex-col gap-2 rounded-md p-1.5">
                <div className="bg-steel-grey/35 h-2.5 w-4/5 rounded-md" />
                <div className="bg-steel-grey/20 h-2 w-full rounded-md" />
                <div className="bg-steel-grey/10 h-2 w-3/4 rounded-md" />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="bg-steel-grey/20 h-3 w-1/3 rounded-md" />
                  <Cpu className="text-electric-violet h-3.5 w-3.5" />
                </div>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <div className="border-steel-grey/20 bg-steel-grey/5 flex h-12 flex-col justify-between rounded-md border p-2">
                    <span className="text-steel-grey font-mono text-[8px]">KPI 01</span>
                    <div className="bg-electric-violet/25 h-3 w-3/4 rounded-sm" />
                  </div>
                  <div className="border-steel-grey/20 bg-steel-grey/5 flex h-12 flex-col justify-between rounded-md border p-2">
                    <span className="text-steel-grey font-mono text-[8px]">KPI 02</span>
                    <div className="bg-neon-blue/25 h-3 w-1/2 rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ServiceSection({ service, index }: ServiceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isEven = index % 2 === 0;

      // Create entrance timeline for text and visual content
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        textRef.current?.children || [],
        { opacity: 0, x: isEven ? -24 : 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      tl.fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.95, y: 16 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [index]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      id={service.id}
      className={cn(
        "border-steel-grey/25 relative scroll-mt-36 border-b py-16 md:scroll-mt-44 md:py-28",
        isEven ? "bg-carbon-black" : "bg-graphite-metal/30"
      )}
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 md:gap-16 lg:grid-cols-12">
          {/* Visual Concept Card (Lg order adjustment for alternating layout) */}
          <div
            ref={visualRef}
            className={cn(
              "flex w-full items-center justify-center lg:col-span-5",
              isEven ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div className="w-full max-w-md lg:max-w-none">
              <VisualPlaceholder serviceId={service.id} />
              {/* Concept Label */}
              <p className="text-steel-grey mt-3 text-center font-mono text-[10px]">
                Visual Concept: {service.visualConcept}
              </p>
            </div>
          </div>

          {/* Text Content Block */}
          <div
            ref={textRef}
            className={cn("flex flex-col lg:col-span-7", isEven ? "lg:order-1" : "lg:order-2")}
          >
            {/* Category Subhead */}
            <Eyebrow className="mb-3 font-bold tracking-wider">{service.category}</Eyebrow>

            {/* Title / Headline */}
            <h2 className="text-chrome-highlight mb-6 text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl">
              {service.headline}
            </h2>

            {/* Long Description (Split by newline into separate paragraphs) */}
            <div className="text-chrome-deep mb-6 space-y-4 text-sm leading-relaxed sm:text-base">
              {service.longDescription.split("\n\n").map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            {/* Target Audience */}
            <div className="bg-graphite-metal/50 border-steel-grey/20 mb-6 rounded-lg border p-4">
              <h4 className="text-chrome-highlight mb-1.5 font-mono text-xs font-bold tracking-wider uppercase">
                Público objetivo
              </h4>
              <p className="text-chrome-deep text-xs leading-relaxed sm:text-sm">
                {service.audience}
              </p>
            </div>

            {/* Benefits & Trust Signals Split Grid */}
            <div className="border-steel-grey/15 mb-8 grid grid-cols-1 gap-6 border-t pt-4 md:grid-cols-2">
              {/* Benefits */}
              <div>
                <h4 className="text-chrome-highlight mb-3 font-mono text-xs font-bold tracking-wider uppercase">
                  Beneficios clave
                </h4>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-chrome-deep flex items-start gap-2 text-xs leading-relaxed sm:text-sm"
                    >
                      <Check className="text-neon-blue mt-0.5 h-4 w-4 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Signals */}
              <div>
                <h4 className="text-chrome-highlight mb-3 font-mono text-xs font-bold tracking-wider uppercase">
                  Señales de ejecución
                </h4>
                <ul className="space-y-2">
                  {service.trustSignals.map((signal, sIdx) => (
                    <li
                      key={sIdx}
                      className="text-chrome-deep flex items-start gap-2 text-xs leading-relaxed sm:text-sm"
                    >
                      <Check className="text-electric-violet mt-0.5 h-4 w-4 shrink-0" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Case Study teaser & Action CTA buttons */}
            <div className="border-steel-grey/15 mt-2 flex flex-col items-stretch justify-between gap-6 border-t pt-6 sm:flex-row sm:items-center">
              <div className="flex flex-1 flex-col gap-1 pr-0 sm:pr-4">
                <span className="text-steel-grey font-mono text-[10px] tracking-wider uppercase">
                  Gancho de caso real
                </span>
                <p className="text-chrome-deep text-xs leading-relaxed">{service.caseStudy}</p>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
                <Link href={service.secondaryCtaLink} passHref legacyBehavior>
                  <a className="border-steel-grey/60 hover:border-chrome-highlight/40 text-chrome-highlight inline-flex w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:bg-white/5 sm:w-auto">
                    {service.secondaryCtaText}
                  </a>
                </Link>
                <Link href={service.ctaLink} passHref legacyBehavior>
                  <a className="bg-electric-violet hover:bg-electric-violet/90 shadow-electric-violet/10 group inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-200 sm:w-auto">
                    {service.ctaText}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
