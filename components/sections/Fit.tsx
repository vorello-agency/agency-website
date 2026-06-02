"use client";

import React, { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const IDEAL_FITS = [
  "Valoras el diseño de interacción y la experiencia de usuario (UX) como ventajas competitivas clave.",
  "Entiendes que la infraestructura técnica y el desarrollo sólido son inversiones estratégicas de negocio.",
  "Buscas una alianza basada en procesos metodológicos rigurosos, feedback constante y validación continua.",
  "Exiges productos de alto rendimiento, accesibles (a11y) y diseñados para escalar a largo plazo.",
];

const AVOID_FITS = [
  "Buscas la opción de menor costo de desarrollo inmediato, sacrificando la durabilidad técnica del producto.",
  "Exiges entregas inmediatas e improvisadas que impidan realizar una fase previa de estrategia y planificación.",
  "Prefieres un proveedor pasivo al que delegar tareas de ejecución en lugar de un socio tecnológico estratégico.",
  "Buscas desplegar plantillas prefabricadas rápidas que carecen de identidad propia y criterio de ingeniería.",
];

export default function Fit() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(".fit-heading > *", { opacity: 1, y: 0 });
        gsap.set([leftCardRef.current, rightCardRef.current], { opacity: 1, x: 0 });
        gsap.set(".fit-ideal-item", { opacity: 1, y: 0 });
        gsap.set(".fit-avoid-item", { opacity: 1, y: 0 });
        return;
      }

      // 1. Unified Snappy Timeline (Trigger calibrated to top 62% for 30-40% viewport height activation)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          toggleActions: "play none none none",
        },
      });

      // 2. Section Heading stagger entrance (Accelerated duration and tighter stagger)
      tl.fromTo(
        ".fit-heading > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // 3. Snappy stagger reveal of Both Cards (sliding inwards symmetrically with lower offsets and duration)
      tl.fromTo(
        leftCardRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      tl.fromTo(
        rightCardRef.current,
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 4. Snappy stagger reveal of the bullet points inside the cards (Faster reading flow)
      tl.fromTo(
        ".fit-ideal-item",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.3"
      );

      tl.fromTo(
        ".fit-avoid-item",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        },
        "-=0.3"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fit"
      className="py-20 md:py-32 2xl:py-40 bg-carbon-black relative z-20 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] 2xl:w-[700px] 2xl:h-[700px] rounded-full bg-electric-violet/5 blur-[120px] pointer-events-none" />

      <Container>
        <SectionHeading
          eyebrow="// CLIENTE IDEAL"
          title="Criterios de colaboración estratégica"
          description="Creemos que la transparencia y la alineación estricta en estándares de calidad son indispensables para construir sistemas digitales competitivos."
          align="center"
          className="fit-heading"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-12 max-w-5xl 2xl:max-w-7xl mx-auto mt-12 2xl:mt-16">
          {/* Ideal Fit Card */}
          <div
            ref={leftCardRef}
            className="p-6 md:p-8 2xl:p-10 rounded-xl border border-electric-violet/20 bg-graphite-metal/30 backdrop-blur-sm relative"
          >
            <div className="flex items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-electric-violet/10 border border-electric-violet/30 flex items-center justify-center text-electric-violet shrink-0">
                <Check className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </div>
              <h3 className="text-lg 2xl:text-2xl font-semibold text-chrome-highlight tracking-tight">
                Somos tu aliado ideal si:
              </h3>
            </div>

            <ul className="flex flex-col gap-4 2xl:gap-5">
              {IDEAL_FITS.map((item, idx) => (
                <li key={idx} className="fit-ideal-item flex gap-3 2xl:gap-4 text-sm 2xl:text-base text-chrome-highlight">
                  <div className="w-8 2xl:w-10 flex justify-center shrink-0 mt-0.5">
                    <Check className="w-5 h-5 2xl:w-6 2xl:h-6 text-electric-violet" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Ideal Fit Card */}
          <div
            ref={rightCardRef}
            className="p-6 md:p-8 2xl:p-10 rounded-xl border border-steel-grey/30 bg-graphite-metal/10 backdrop-blur-sm relative"
          >
            <div className="flex items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
              <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-steel-grey/20 border border-steel-grey/30 flex items-center justify-center text-chrome-highlight/75 shrink-0">
                <X className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </div>
              <h3 className="text-lg 2xl:text-2xl font-semibold text-chrome-highlight tracking-tight">
                No encajamos bien si:
              </h3>
            </div>

            <ul className="flex flex-col gap-4 2xl:gap-5">
              {AVOID_FITS.map((item, idx) => (
                <li key={idx} className="fit-avoid-item flex gap-3 2xl:gap-4 text-sm 2xl:text-base text-chrome-highlight/75">
                  <div className="w-8 2xl:w-10 flex justify-center shrink-0 mt-0.5">
                    <X className="w-5 h-5 2xl:w-6 2xl:h-6 text-chrome-highlight/40" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
