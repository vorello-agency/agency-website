"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

export default function MidCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduce: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            reduceMotion: boolean;
          };

          if (reduceMotion) {
            gsap.set([
              ".midcta-top-line",
              ".midcta-bottom-line",
              ".midcta-left-dots",
              ".midcta-right-dots",
              ".midcta-left-glow",
              ".midcta-right-glow",
              ".midcta-text",
              ".midcta-button-wrapper"
            ], { opacity: 1, scaleX: 1, scale: 1, x: 0 });
            return;
          }

          // Unified Cinematic Timeline (Trigger calibrated to top 50% for balanced scroll focus)
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });

          // 1. Expand neon border micro-glow lines outwards from the center (Standardized to 0.6s duration)
          tl.fromTo(
            [".midcta-top-line", ".midcta-bottom-line"],
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            }
          );

          // 2. Fade in dot patterns and soft ambient left glow (Standardized to 0.5s duration)
          tl.fromTo(
            [".midcta-left-dots", ".midcta-right-dots"],
            { opacity: 0 },
            { opacity: 0.2, duration: 0.5, ease: "power2.out" },
            "-=0.45"
          );

          tl.fromTo(
            ".midcta-left-glow",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
            "-=0.45"
          );

          // 3. Scale-pop the concentrated button glow behind the CTA button (Standardized to 0.5s duration)
          tl.fromTo(
            ".midcta-right-glow",
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
            "-=0.45"
          );

          // 4. Slide-in the copy text from the left (Standardized to 0.5s duration)
          tl.fromTo(
            ".midcta-text",
            { opacity: 0, x: -12 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.35"
          );

          // 5. Reveal CTA conversion button with a sophisticated pop (Standardized to 0.5s / back.out(1.2))
          tl.fromTo(
            ".midcta-button-wrapper",
            { opacity: 0, scale: 0.9, x: 12 },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 0.5,
              ease: "back.out(1.2)",
            },
            "-=0.35"
          );
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full border-t border-b border-steel-grey/30 py-8 md:py-10 relative z-40 overflow-hidden"
    >
      {/* Opaque Carbon Black solid base to completely block the Tracing Beam line */}
      <div className="absolute inset-0 bg-carbon-black z-0 pointer-events-none" />

      {/* Translucent premium Electric Violet overlay on top of the solid base */}
      <div className="absolute inset-0 bg-electric-violet/[0.04] z-0 pointer-events-none" />

      {/* Subtle top border micro-glow in pure electric violet */}
      <div className="midcta-top-line absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-violet/35 to-transparent pointer-events-none z-10 origin-center" />

      {/* Subtle bottom border micro-glow in pure electric violet */}
      <div className="midcta-bottom-line absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-violet/35 to-transparent pointer-events-none z-10 origin-center" />

      {/* Ambient soft purple glow under text on the left side */}
      <div className="midcta-left-glow absolute left-0 top-1/2 -translate-y-1/2 w-80 h-32 rounded-full bg-electric-violet/[0.03] blur-[40px] pointer-events-none z-0" />

      {/* Concentrated and vibrant violet glow behind the button on the right side */}
      <div className="midcta-right-glow absolute right-0 md:right-[15%] top-1/2 -translate-y-1/2 w-48 h-28 rounded-full bg-electric-violet/20 blur-[28px] pointer-events-none z-0" />

      {/* Subtle Dot Pattern overlay on the left side with fade-out mask */}
      <div
        className="midcta-left-dots absolute left-0 top-0 bottom-0 w-1/3 opacity-20 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          backgroundPosition: "center",
          WebkitMaskImage: "linear-gradient(to right, white 10%, transparent 90%)",
          maskImage: "linear-gradient(to right, white 10%, transparent 90%)"
        }}
      />

      {/* Subtle Dot Pattern overlay on the right side with fade-out mask */}
      <div
        className="midcta-right-dots absolute right-0 top-0 bottom-0 w-1/3 opacity-20 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          backgroundPosition: "center",
          WebkitMaskImage: "linear-gradient(to left, white 10%, transparent 90%)",
          maskImage: "linear-gradient(to left, white 10%, transparent 90%)"
        }}
      />

      <Container className="relative z-10">
        <div
          className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          {/* Left: Text query (strong bold contrast, limited max-width for premium visual weight, optimized leading for vertical alignment) */}
          <p className="midcta-text text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-tight text-balance max-w-xl">
            Buscamos proyectos que demanden diseño riguroso, tecnología moderna y criterio estratégico.
          </p>

          {/* Right: Focused single conversion action button */}
          <div className="midcta-button-wrapper flex items-center shrink-0">
            <Button
              variant="primary-blue"
              size="md"
              className="cursor-pointer shadow-lg shadow-neon-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={() => handleScrollTo("contacto")}
              aria-label="Iniciar un proyecto con Vorello"
              withArrow
            >
              Iniciar proyecto
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
