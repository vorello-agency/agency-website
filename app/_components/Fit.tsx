"use client";

import React, { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

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

function FitCard({
  variant,
  items,
  title,
  icon: Icon,
}: {
  variant: "ideal" | "avoid";
  items: string[];
  title: string;
  icon: typeof Check;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);

  const isIdeal = variant === "ideal";

  // GSAP-driven hover for desktop (following ServiceCard pattern from Services.tsx)
  const handleMouseEnter = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        borderColor: isIdeal ? "rgba(123, 76, 255, 0.4)" : "rgba(90, 98, 112, 0.5)",
        scale: 1.008,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (accentLineRef.current) {
      gsap.to(accentLineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (iconContainerRef.current) {
      gsap.to(iconContainerRef.current, {
        scale: 1.1,
        borderColor: isIdeal ? "rgba(123, 76, 255, 0.5)" : "rgba(90, 98, 112, 0.5)",
        duration: 0.3,
        ease: "back.out(1.5)",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        borderColor: isIdeal ? "rgba(123, 76, 255, 0.2)" : "rgba(42, 46, 51, 0.3)",
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
    if (accentLineRef.current) {
      gsap.to(accentLineRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
    if (iconContainerRef.current) {
      gsap.to(iconContainerRef.current, {
        scale: 1,
        borderColor: isIdeal ? "rgba(123, 76, 255, 0.3)" : "rgba(42, 46, 51, 0.3)",
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  };

  // Touch interaction for mobile (following ServiceCard pattern)
  const handleTouchStart = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        borderColor: isIdeal ? "rgba(123, 76, 255, 0.4)" : "rgba(90, 98, 112, 0.5)",
        scale: 1.005,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (accentLineRef.current) {
      gsap.to(accentLineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleTouchEnd = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        borderColor: isIdeal ? "rgba(123, 76, 255, 0.2)" : "rgba(42, 46, 51, 0.3)",
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
    if (accentLineRef.current) {
      gsap.to(accentLineRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  };

  const itemClass = isIdeal ? "fit-ideal-item" : "fit-avoid-item";

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`relative h-full p-6 md:p-8 2xl:p-10 rounded-xl border select-none transition-colors duration-300 ${isIdeal
          ? "border-electric-violet/20 bg-graphite-metal"
          : "border-steel-grey/30 bg-graphite-metal"
        }`}
    >
      {/* Accent line sweep on hover */}
      <div
        ref={accentLineRef}
        className={`absolute inset-x-0 -top-px h-[2px] rounded-full scale-x-0 origin-center pointer-events-none ${isIdeal
            ? "bg-gradient-to-r from-transparent via-electric-violet/50 to-transparent"
            : "bg-gradient-to-r from-transparent via-steel-grey/40 to-transparent"
          }`}
      />

      {/* Card ambient glow */}
      {isIdeal && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full bg-electric-violet/[0.06] blur-[50px] pointer-events-none" />
      )}

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 rounded-xl opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "center",
          WebkitMaskImage: "radial-gradient(ellipse at center, white 30%, transparent 80%)",
          maskImage: "radial-gradient(ellipse at center, white 30%, transparent 80%)",
        }}
      />

      {/* Header */}
      <div className="relative flex items-center gap-3 2xl:gap-4 mb-6 2xl:mb-8">
        <div
          ref={iconContainerRef}
          className={`fit-icon w-8 h-8 2xl:w-10 2xl:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isIdeal
              ? "bg-electric-violet/10 border border-electric-violet/30 text-electric-violet"
              : "bg-steel-grey/20 border border-steel-grey/30 text-chrome-highlight/75"
            }`}
        >
          <Icon className="w-4 h-4 2xl:w-5 2xl:h-5" />
        </div>
        <h3 className="text-lg 2xl:text-2xl font-semibold text-chrome-highlight tracking-tight">
          {title}
        </h3>
      </div>

      {/* List items */}
      <ul className="relative flex flex-col gap-4 2xl:gap-5">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`${itemClass} flex gap-3 2xl:gap-4 text-sm 2xl:text-base ${isIdeal
                ? "text-chrome-highlight"
                : "text-chrome-highlight/75"
              }`}
          >
            <div className="w-8 2xl:w-10 flex justify-center shrink-0 mt-0.5">
              <Icon
                className={`w-5 h-5 2xl:w-6 2xl:h-6 ${isIdeal
                    ? "text-electric-violet"
                    : "text-chrome-highlight/40"
                  }`}
              />
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
        gsap.set(".fit-icon", { opacity: 1, scale: 1 });
        return;
      }

      // Unified Snappy Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          toggleActions: "play none none none",
        },
      });

      // 1. Section Heading stagger entrance
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

      // 2. Cards slide in symmetrically with 3D rotation (elevating beyond basic fade)
      tl.fromTo(
        leftCardRef.current,
        { x: -30, opacity: 0, rotationY: 4, scale: 0.97 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.4"
      );

      tl.fromTo(
        rightCardRef.current,
        { x: 30, opacity: 0, rotationY: -4, scale: 0.97 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 3. Icon scale-pop entrance (back.out for a satisfying bounce)
      tl.fromTo(
        ".fit-icon",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      );

      // 4. Stagger reveal of bullet points with horizontal slide
      tl.fromTo(
        ".fit-ideal-item",
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.3"
      );

      tl.fromTo(
        ".fit-avoid-item",
        { opacity: 0, x: 12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 5. Auto-trigger accent line sweep on the ideal card (once, on mobile — mirroring Services mobile pattern)
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (isTouch && leftCardRef.current) {
        const accentLine = leftCardRef.current.querySelector("[class*='scale-x-0']");
        if (accentLine) {
          tl.fromTo(
            accentLine,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" },
            "-=0.2"
          ).to(
            accentLine,
            { scaleX: 0, opacity: 0, duration: 0.8, ease: "power2.inOut" },
            "+=0.3"
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fit"
      className="py-20 md:py-32 2xl:py-40 bg-carbon-black relative z-20 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] 2xl:w-[700px] 2xl:h-[700px] rounded-full bg-electric-violet/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-neon-blue/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-electric-violet/[0.04] blur-[90px] pointer-events-none" />

      {/* Subtle grid dot pattern across background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "center",
          WebkitMaskImage: "radial-gradient(ellipse at center, white 20%, transparent 70%)",
          maskImage: "radial-gradient(ellipse at center, white 20%, transparent 70%)",
        }}
      />

      <Container>
        <SectionHeading
          eyebrow="// CLIENTE IDEAL"
          title="Criterios de colaboración estratégica"
          description="Trabajamos mejor con empresas que valoran el diseño, la tecnología y un proceso claro para construir productos digitales de calidad."
          align="center"
          className="fit-heading"
        />

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 2xl:gap-12 max-w-5xl 2xl:max-w-7xl mx-auto mt-12 2xl:mt-16"
          style={{ perspective: "1000px" }}
        >
          {/* Ideal Fit Card */}
          <div ref={leftCardRef}>
            <FitCard
              variant="ideal"
              items={IDEAL_FITS}
              title="Somos tu aliado ideal si:"
              icon={Check}
            />
          </div>

          {/* Non-Ideal Fit Card */}
          <div ref={rightCardRef}>
            <FitCard
              variant="avoid"
              items={AVOID_FITS}
              title="No encajamos bien si:"
              icon={X}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
