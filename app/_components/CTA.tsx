"use client";

import React, { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Container from "@/components/layout/Container";




export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!cardRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(cardRef.current, { opacity: 1, scale: 1 });
        gsap.set([
          ".cta-glow",
          ".cta-tag",
          ".cta-title",
          ".cta-desc",
          ".cta-buttons",
          ".cta-footer"
        ], { opacity: 1, y: 0, scale: 1 });
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
      className="py-0 md:py-32 2xl:py-40 bg-carbon-black relative z-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-electric-violet/10 blur-[120px]" />
      </div>

      <Container className="px-0 sm:px-0 md:px-6 lg:px-16 xl:px-20 2xl:px-8">
        <div
          ref={cardRef}
          className="relative max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl mx-auto md:rounded-2xl border-0 md:border md:border-steel-grey/30 bg-transparent md:bg-graphite-metal pt-8 pb-12 px-5 sm:px-8 md:py-10 md:px-8 2xl:py-16 2xl:px-36 text-left md:text-center overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Internal ambient glowing bulb */}
          <div className="cta-glow absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-electric-violet/5 blur-[80px] pointer-events-none" />

          {/* Grid lines mimic */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <span className="cta-tag font-mono text-xs text-electric-violet uppercase tracking-widest block mb-4 font-semibold relative z-10">
            {"// INICIAR CONVERSACIÓN"}
          </span>

          <h2 className="cta-title text-2xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold text-chrome-highlight tracking-tight mb-6 max-w-2xl mx-0 md:mx-auto leading-tight relative z-10">
            Diseñemos y desarrollemos tu próximo sistema digital
          </h2>

          <p className="cta-desc text-sm sm:text-base 2xl:text-lg text-chrome-highlight/75 max-w-lg 2xl:max-w-xl mx-0 md:mx-auto mb-10 2xl:mb-12 leading-relaxed relative z-10">
            Cuéntanos sobre tus objetivos de negocio. Analizaremos tu caso particular sin compromiso para proponerte una estrategia de producto y tecnología a medida.
          </p>

          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-start md:justify-center items-center relative z-10">
            <Link href="/start" className="w-full sm:w-auto focus-visible:outline-none">
              <Button
                variant="primary-blue"
                size="lg"
                className="w-full"
                withArrow
              >
                Iniciar proyecto
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto focus-visible:outline-none">
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 bg-carbon-black"
              >
                <MessageSquare className="w-4 h-4" />
                Contacto
              </Button>
            </Link>

          </div>

          <div className="cta-footer mt-8 md:mt-12 text-xs font-mono text-chrome-highlight/60 relative z-10">
            Tiempo estimado de respuesta
            <br />
            &lt; 24 horas hábiles
          </div>
        </div>
      </Container>
    </section>
  );
}
