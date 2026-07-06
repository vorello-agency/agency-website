"use client";

import React, { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import AmbientGlow from "@/components/ui/AmbientGlow";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/ui/Eyebrow";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!cardRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(cardRef.current, { opacity: 1, scale: 1 });
        gsap.set(
          [".cta-glow", ".cta-tag", ".cta-title", ".cta-desc", ".cta-buttons", ".cta-footer"],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // 1. Unified Snappy Timeline (Trigger calibrated to top 60% for 30-40% viewport height activation)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // 2. Snappy reveal of the card frame backdrop
      tl.fromTo(
        cardRef.current,
        { scale: 0.97, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      // 3. Expand the internal violet glowing bulb behind content
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

      // 4. Stagger reveal of the internal headers and body copy
      tl.fromTo(
        [".cta-tag", ".cta-title", ".cta-desc"],
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

      // 5. Spring pop reveal of the conversion buttons with tighter bounce (back.out(1.2))
      tl.fromTo(
        ".cta-buttons",
        { opacity: 0, scale: 0.94, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      );

      // 6. Fade in response footer timing details
      tl.fromTo(
        ".cta-footer",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power1.out",
        },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="bg-carbon-black relative z-20 overflow-hidden py-0 md:py-32 2xl:py-40"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AmbientGlow className="bg-electric-violet/10 bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 blur-[120px]" />
      </div>

      <Container className="px-0 sm:px-0 md:px-6 lg:px-16 xl:px-20 2xl:px-8">
        <div
          ref={cardRef}
          className="md:border-steel-grey/30 md:bg-graphite-metal relative mx-auto max-w-xl overflow-hidden border-0 bg-transparent px-5 pt-8 pb-12 text-left sm:px-8 md:max-w-2xl md:rounded-2xl md:border md:px-8 md:py-10 md:text-center lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl 2xl:px-36 2xl:py-16"
          style={{ opacity: 0 }}
        >
          {/* Internal ambient glowing bulb */}
          <AmbientGlow className="cta-glow bg-electric-violet/5 top-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 blur-[80px]" />

          {/* Grid lines mimic */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px]" />

          <Eyebrow className="cta-tag relative z-10 mb-4 block">INICIAR CONVERSACIÓN</Eyebrow>

          <h2 className="cta-title text-chrome-highlight relative z-10 mx-0 mb-6 max-w-2xl text-2xl leading-tight font-bold tracking-tight sm:text-4xl md:mx-auto md:text-5xl 2xl:text-6xl">
            Diseñemos y desarrollemos tu próximo sistema digital
          </h2>

          <p className="cta-desc text-chrome-highlight/75 relative z-10 mx-0 mb-10 max-w-lg text-sm leading-relaxed sm:text-base md:mx-auto 2xl:mb-12 2xl:max-w-xl 2xl:text-lg">
            Cuéntanos sobre tus objetivos de negocio. Analizaremos tu caso particular sin compromiso
            para proponerte una estrategia de producto y tecnología a medida.
          </p>

          <div className="cta-buttons relative z-10 flex flex-col items-center justify-start gap-4 sm:flex-row md:justify-center">
            <Link href="/start" className="w-full focus-visible:outline-none sm:w-auto">
              <Button variant="primary-blue" size="lg" className="w-full" withArrow>
                Iniciar proyecto
              </Button>
            </Link>
            <Link href="/contact" className="w-full focus-visible:outline-none sm:w-auto">
              <Button variant="outline" size="lg" className="bg-carbon-black w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Contacto
              </Button>
            </Link>
          </div>

          <div className="cta-footer text-chrome-highlight/60 relative z-10 mt-8 font-mono text-xs md:mt-12">
            Tiempo estimado de respuesta
            <br />
            &lt; 24 horas hábiles
          </div>
        </div>
      </Container>
    </section>
  );
}
