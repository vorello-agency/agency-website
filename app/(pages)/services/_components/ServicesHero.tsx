"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

export default function ServicesHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Force all items to be visible instantly if user has reduced-motion enabled
      gsap.set([".hero-badge", ".hero-title", ".hero-desc", ".hero-ctas", ".hero-footer"], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.35"
      );

      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      );

      tl.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.5"
      );

      tl.fromTo(
        ".hero-footer",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power1.out" },
        "-=0.2"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16"
      style={{
        background:
          "radial-gradient(circle at 50% -20%, rgba(123, 76, 255, 0.15), transparent 50%), var(--carbon-black)",
      }}
    >
      {/* Dynamic Grid Background overlay */}
      <div className="bg-grid-small pointer-events-none absolute inset-0 z-0 opacity-50 translate-y-0.5" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Category Tag / Badge */}
        <Badge
          variant="violet"
          className="hero-badge mb-8 opacity-0"
        >
          CONOCE NUESTROS SERVICIOS
        </Badge>

        {/* Headline */}
        <h1 className="hero-title text-chrome-highlight/70 mb-8 max-w-6xl text-4xl text-pretty text-center leading-tight font-extrabold tracking-tight sm:text-5xl md:text-6xl opacity-0">
          Servicios digitales para <span className="text-chrome-highlight">vender mejor</span>,
          operar con claridad y <span className="text-chrome-highlight">crecer sin parches</span>
        </h1>

        {/* Subhead / Description */}
        <p className="hero-desc text-chrome-deep mb-8 max-w-4xl text-base text-pretty text-center leading-relaxed sm:text-lg 2xl:text-xl opacity-0">
          Diseñamos productos digitales que resuelven problemas reales: sitios web preparados para el contexto actual, plataformas que estructuran operaciones y sistemas que escalan sin parches.
        </p>

        {/* Action CTAs */}
        <div className="hero-ctas flex flex-col items-center gap-4 sm:flex-row opacity-0">
          <Link href="/start" className="w-full focus-visible:outline-none sm:w-auto">
            <Button variant="primary-blue" size="lg" className="w-full font-semibold sm:w-auto" withArrow>
              Solicitar propuesta técnica
            </Button>
          </Link>
          <Link href="#websites" className="w-full focus-visible:outline-none sm:w-auto">
            <Button variant="outline" size="lg" className="bg-carbon-black w-full font-semibold sm:w-auto">
              Explorar servicios
            </Button>
          </Link>
        </div>

        {/* Legend / Footer Comment */}
        <div className="hero-footer text-chrome-highlight/45 relative z-10 mt-12 md:mt-16 font-mono text-[10px] tracking-wider uppercase select-none opacity-0">
          <span aria-hidden="true">{"// "}</span>SOFTWARE A MEDIDA HECHO PARA DURAR Y ESCALAR
        </div>
      </Container>
    </section>
  );
}
