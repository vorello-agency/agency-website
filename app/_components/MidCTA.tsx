"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import AmbientGlow from "@/components/ui/AmbientGlow";
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
            gsap.set(
              [
                ".midcta-top-line",
                ".midcta-bottom-line",
                ".midcta-left-dots",
                ".midcta-right-dots",
                ".midcta-left-glow",
                ".midcta-right-glow",
                ".midcta-text",
                ".midcta-button-wrapper",
              ],
              { opacity: 1, scaleX: 1, scale: 1, x: 0 }
            );
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
      className="border-steel-grey/30 relative z-40 w-full overflow-hidden border-t border-b py-8 md:py-10"
    >
      {/* Opaque Carbon Black solid base to completely block the Tracing Beam line */}
      <div className="bg-carbon-black pointer-events-none absolute inset-0 z-0" />

      {/* Translucent premium Electric Violet overlay on top of the solid base */}
      <div className="bg-electric-violet/[0.04] pointer-events-none absolute inset-0 z-0" />

      {/* Subtle top border micro-glow in pure electric violet */}
      <div className="midcta-top-line via-electric-violet/35 pointer-events-none absolute top-0 left-0 z-10 h-px w-full origin-center bg-gradient-to-r from-transparent to-transparent" />

      {/* Subtle bottom border micro-glow in pure electric violet */}
      <div className="midcta-bottom-line via-electric-violet/35 pointer-events-none absolute bottom-0 left-0 z-10 h-px w-full origin-center bg-gradient-to-r from-transparent to-transparent" />

      {/* Ambient soft purple glow under text on the left side */}
      <AmbientGlow className="midcta-left-glow bg-electric-violet/[0.03] top-1/2 left-0 z-0 h-32 w-80 -translate-y-1/2 blur-[40px]" />

      {/* Concentrated and vibrant violet glow behind the button on the right side */}
      <AmbientGlow className="midcta-right-glow bg-electric-violet/20 top-1/2 right-0 z-0 h-28 w-48 -translate-y-1/2 blur-[28px] md:right-[15%]" />

      {/* Subtle Dot Pattern overlay on the left side with fade-out mask */}
      <div
        className="midcta-left-dots pointer-events-none absolute top-0 bottom-0 left-0 z-0 w-1/3 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          backgroundPosition: "center",
          WebkitMaskImage: "linear-gradient(to right, white 10%, transparent 90%)",
          maskImage: "linear-gradient(to right, white 10%, transparent 90%)",
        }}
      />

      {/* Subtle Dot Pattern overlay on the right side with fade-out mask */}
      <div
        className="midcta-right-dots pointer-events-none absolute top-0 right-0 bottom-0 z-0 w-1/3 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          backgroundPosition: "center",
          WebkitMaskImage: "linear-gradient(to left, white 10%, transparent 90%)",
          maskImage: "linear-gradient(to left, white 10%, transparent 90%)",
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col justify-between gap-6 md:flex-row md:items-center">
          {/* Left: Text query (strong bold contrast, limited max-width for premium visual weight, optimized leading for vertical alignment) */}
          <p className="midcta-text max-w-xl text-lg leading-tight font-bold tracking-tight text-balance text-white sm:text-xl md:text-2xl">
            Buscamos proyectos que demanden diseño riguroso, tecnología moderna y criterio
            estratégico.
          </p>

          {/* Right: Focused single conversion action button */}
          <div className="midcta-button-wrapper flex shrink-0 items-center">
            <Button
              variant="primary-blue"
              size="md"
              className="shadow-neon-blue/20 cursor-pointer shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
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
