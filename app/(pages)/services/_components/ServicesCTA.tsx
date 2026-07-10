"use client";

import React, { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { gsap } from "@/lib/gsap/register";
import Eyebrow from "@/components/ui/Eyebrow";

export default function ServicesCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-carbon-black relative z-20 overflow-hidden py-20 md:py-32">
      {/* Background glow dot */}
      <div className="bg-electric-violet/10 pointer-events-none absolute top-1/2 left-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <Container>
        <div
          ref={containerRef}
          className="border-steel-grey/30 bg-graphite-metal relative z-10 mx-auto max-w-4xl overflow-hidden rounded-2xl border p-8 text-center md:p-16"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(45, 143, 255, 0.08), transparent 60%), var(--graphite-metal)",
          }}
        >
          {/* Subtle grid accent inside the card */}
          <div className="bg-grid-small pointer-events-none absolute inset-0 z-0 opacity-15" />

          <div className="relative z-10 flex flex-col items-center">
            <Eyebrow className="mb-4 block">TRABAJEMOS JUNTOS</Eyebrow>

            <h2 className="text-chrome-highlight mb-4 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              ¿Tienes un proyecto digital en mente?
            </h2>

            <p className="text-chrome-deep mb-8 max-w-xl text-xs leading-relaxed sm:text-sm md:text-base">
              Mapeemos juntos tus objetivos, viabilidad de integraciones y alcance operativo. Te
              propondremos un enfoque técnico y presupuesto a medida sin compromiso.
            </p>

            <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
              <Link href="/start" passHref legacyBehavior>
                <Button variant="primary-blue" size="lg" className="w-full font-semibold sm:w-auto">
                  Solicitar propuesta técnica
                </Button>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <Button variant="outline" size="lg" className="w-full font-semibold sm:w-auto">
                  Enviar mensaje directo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
