"use client";

import React, { useEffect, useRef, useState } from "react";
import { ServiceDetail } from "@/data/services";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/register";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowUpRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

import WebsiteVisual from "./visuals/WebsiteVisual";
import LandingVisual from "./visuals/LandingVisual";
import EcommerceVisual from "./visuals/EcommerceVisual";
import PlatformVisual from "./visuals/PlatformVisual";
import AutomationVisual from "./visuals/AutomationVisual";
import SupportVisual from "./visuals/SupportVisual";

interface ServiceSectionProps {
  service: ServiceDetail;
  index: number;
}

function ServiceVisual({ serviceId }: { serviceId: string }) {
  switch (serviceId) {
    case "websites":
      return <WebsiteVisual />;
    case "landing-pages":
      return <LandingVisual />;
    case "ecommerce":
      return <EcommerceVisual />;
    case "platforms":
      return <PlatformVisual />;
    case "automation":
      return <AutomationVisual />;
    case "support":
      return <SupportVisual />;
    default:
      return null;
  }
}

export default function ServiceSection({ service, index }: ServiceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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

      // Inverted aggressive scroll parallax effect
      const parallaxTarget = visualRef.current?.querySelector(".visual-parallax-target");
      if (parallaxTarget && sectionRef.current) {
        gsap.fromTo(
          parallaxTarget,
          { y: isEven ? -110 : 110 },
          {
            y: isEven ? 110 : -110,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }
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
        {/* Main 2-Column Grid (Visual + Text) */}
        <div className="grid grid-cols-1 items-center gap-8 md:gap-16 lg:grid-cols-12">
          {/* Visual Concept Card (Lg order adjustment for alternating layout - 50/50 split) */}
          <div
            ref={visualRef}
            className={cn(
              "flex w-full items-center justify-center lg:col-span-6",
              isEven ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div className="visual-parallax-target w-full">
              <ServiceVisual serviceId={service.id} />
            </div>
          </div>

          {/* Text Content Block (50/50 split) */}
          <div
            ref={textRef}
            className={cn("flex flex-col lg:col-span-6", isEven ? "lg:order-1" : "lg:order-2")}
          >
            {/* Category Subhead */}
            <Eyebrow className="mb-3 font-bold tracking-wider">{service.category}</Eyebrow>

            {/* Title / Headline */}
            <h2 className="text-chrome-highlight mb-6 text-2xl leading-tight font-bold tracking-tight text-pretty sm:text-3xl md:text-4xl">
              {service.headline}
            </h2>

            {/* Long Description (Split by newline into separate paragraphs & preserving single line breaks) */}
            <div className="text-chrome-deep mb-6 text-sm leading-relaxed sm:text-base">
              {(() => {
                const cleanDesc = service.longDescription
                  .split("\n")
                  .map((line) => line.trim())
                  .join("\n");
                const paragraphs = cleanDesc.split("\n\n");
                return (
                  <>
                    <p className="text-pretty whitespace-pre-line">{paragraphs[0]}</p>
                    {paragraphs.length > 1 && (
                      <div
                        className={cn(
                          "grid transition-all duration-300 ease-in-out",
                          isExpanded
                            ? "grid-rows-[1fr] opacity-100 mt-4"
                            : "grid-rows-[0fr] opacity-0 overflow-hidden mt-0"
                        )}
                      >
                        <div className="overflow-hidden space-y-4">
                          {paragraphs.slice(1).map((paragraph, pIdx) => (
                            <p key={pIdx} className="text-pretty whitespace-pre-line">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {paragraphs.length > 1 && (
                      <button
                        onClick={() => {
                          const nextState = !isExpanded;
                          setIsExpanded(nextState);
                          // Refresh ScrollTrigger positions immediately for start of transition
                          ScrollTrigger.refresh();
                          // And refresh again once the transition is expected to finish
                          setTimeout(() => {
                            ScrollTrigger.refresh();
                          }, 320);
                        }}
                        className="text-neon-blue hover:text-neon-blue/80 focus-visible:ring-neon-blue/30 mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 rounded px-1 -mx-1"
                      >
                        {isExpanded ? (
                          <>
                            <span>Ver menos</span>
                            <ChevronUp className="h-3.5 w-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Ver más</span>
                            <ChevronDown className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Target Audience */}
            <div className="bg-graphite-metal/50 border-steel-grey/20 mb-6 rounded-lg border p-4">
              <h4 className="text-chrome-highlight mb-1.5 font-mono text-xs font-bold tracking-wider uppercase">
                Público objetivo
              </h4>
              <p className="text-chrome-deep text-xs leading-relaxed text-pretty sm:text-sm">
                {service.audience}
              </p>
            </div>

            {/* Benefits & Trust Signals Split Grid */}
            <div className="border-steel-grey/15 mb-2 grid grid-cols-1 gap-6 border-t pt-4 md:grid-cols-2">
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
                      <span className="text-pretty">{benefit}</span>
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
                      <span className="text-pretty">{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Footer Strip: Case Study & Action CTAs (spans below both columns) */}
        <div className="border-steel-grey/20 mt-12 flex flex-col items-stretch justify-between gap-6 border-t pt-8 md:mt-16 md:flex-row md:items-center">
          <div className="flex flex-1 flex-col gap-1 pr-0 md:pr-8">
            <span className="text-steel-grey font-mono text-[10px] tracking-wider uppercase font-bold">
              Caso de impacto
            </span>
            <p className="text-chrome-deep text-xs leading-relaxed text-balance sm:text-sm">
              {service.caseStudy}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
            <Link href={service.secondaryCtaLink} passHref legacyBehavior>
              <a className="border-steel-grey/60 hover:border-chrome-highlight/40 text-chrome-highlight inline-flex w-full cursor-pointer items-center justify-center rounded-lg border px-5 py-2.5 text-xs font-semibold transition-all duration-200 hover:bg-white/5 sm:w-auto">
                {service.secondaryCtaText}
              </a>
            </Link>
            <Link href={service.ctaLink} passHref legacyBehavior>
              <a className="bg-electric-violet hover:bg-electric-violet/90 shadow-electric-violet/10 group inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all duration-200 sm:w-auto">
                {service.ctaText}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
