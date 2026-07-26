"use client";

import React, { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { gsap } from "@/lib/gsap/register";
import Eyebrow from "@/components/ui/Eyebrow";
import Scales from "@/components/aceternity/scales";

export default function ServicesCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 });
      gsap.set(
        [".cta-eyebrow", ".cta-title", ".cta-desc", ".cta-buttons"],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Snappy reveal of the card frame backdrop
      tl.fromTo(
        containerRef.current,
        { scale: 0.97, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      // Expand the internal blue glowing bulb behind content
      tl.fromTo(
        ".cta-glow",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Stagger reveal of the internal headers and body copy
      tl.fromTo(
        [".cta-eyebrow", ".cta-title", ".cta-desc"],
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Pop reveal of the conversion buttons
      tl.fromTo(
        ".cta-buttons",
        { opacity: 0, scale: 0.94, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-carbon-black relative z-20 overflow-hidden py-20 md:py-32">
      {/* Background glow dot (Neon Blue) */}
      <div className="bg-neon-blue/10 pointer-events-none absolute top-1/2 left-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <Container>
        <div
          ref={containerRef}
          className="border-steel-grey/30 bg-graphite-metal relative z-10 mx-auto max-w-4xl overflow-hidden rounded-2xl border p-8 text-center md:p-16 opacity-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(45, 143, 255, 0.08), transparent 60%), var(--graphite-metal)",
          }}
        >
          {/* Scales background accent inside the card */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Scales
              orientation="horizontal"
              size={8}
              color="var(--steel-grey)"
            />
          </div>

          {/* Internal ambient glowing bulb (Neon Blue) */}
          <div className="cta-glow bg-neon-blue/5 absolute top-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center">
            <Eyebrow className="cta-eyebrow mb-4 block">TRABAJEMOS JUNTOS</Eyebrow>
            <h2 className="cta-title text-chrome-highlight mb-4 max-w-2xl text-2xl font-bold tracking-tight text-pretty sm:text-3xl md:text-4xl">
              ¿Listo para estructurar tu infraestructura digital?
            </h2>

            <p className="cta-desc text-chrome-deep mb-8 max-w-2xl text-xs leading-relaxed text-pretty sm:text-sm md:text-base">
              Diseñemos una base técnica preparada para crecer sin parches.<br />
              Cuéntanos en qué consiste tu operación y nuestro equipo diseñará una arquitectura limpia, flujos automatizados y estimaciones a medida de tus objetivos.
            </p>

            <div className="cta-buttons flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
              <Link href="/start" className="w-full focus-visible:outline-none sm:w-auto">
                <Button variant="primary-blue" size="lg" className="w-full font-semibold sm:w-auto">
                  Solicitar propuesta técnica
                </Button>
              </Link>
              <Link href="/contact" className="w-full focus-visible:outline-none sm:w-auto">
                <Button variant="outline" size="lg" className="w-full font-semibold sm:w-auto">
                  Hablar con un experto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
