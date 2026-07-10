"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";

export default function ServicesHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      style={{
        background:
          "radial-gradient(circle at 50% -20%, rgba(123, 76, 255, 0.15), transparent 50%), var(--carbon-black)",
      }}
    >
      {/* Dynamic Grid Background overlay */}
      <div className="bg-grid-small pointer-events-none absolute inset-0 z-0 opacity-50" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Category Tag / Badge */}
        <Eyebrow
          variant="custom"
          className="hero-badge text-electric-violet bg-electric-violet/10 border-electric-violet/20 mb-6 inline-block rounded-full border px-3 py-1 text-xs tracking-wider"
        >
          CONOCE NUESTROS SERVICIOS
        </Eyebrow>

        {/* Headline */}
        <h1 className="hero-title text-chrome-highlight/70 mb-6 max-w-4xl text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Servicios digitales para <span className="text-chrome-highlight">vender mejor</span>,
          operar con claridad y <span className="text-chrome-highlight">crecer sin parches</span>
        </h1>

        {/* Subhead / Description */}
        <p className="hero-desc text-chrome-deep mb-8 max-w-3xl text-base leading-relaxed sm:text-lg md:text-xl">
          Diseñamos interfaces que abren conversaciones y desarrollamos sistemas que sostienen
          procesos. Software a medida hecho para durar y escalar.
        </p>

        {/* Action CTAs */}
        <div className="hero-ctas flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/start" passHref legacyBehavior>
            <Button variant="primary-blue" size="lg" className="w-full font-semibold sm:w-auto">
              Iniciar proyecto
            </Button>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <Button variant="outline" size="lg" className="w-full font-semibold sm:w-auto">
              Hablar con un experto
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
