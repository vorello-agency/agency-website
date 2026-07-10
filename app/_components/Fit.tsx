"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Check, X } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import AmbientGlow from "@/components/ui/AmbientGlow";

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

import FitCard from "./fit/FitCard";


export default function Fit() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobileSlider, setIsMobileSlider] = useState(false);
  const swipeHintDone = useRef(false);

  // Track whether we're in mobile slider mode
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileSlider(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Swipe hint: small peek animation on mount (mobile only, runs once)
  useEffect(() => {
    if (!isMobileSlider || swipeHintDone.current || !cardsContainerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    swipeHintDone.current = true;
    const items = Array.from(cardsContainerRef.current.children) as HTMLElement[];
    const secondCard = items[1];
    if (!secondCard) return;

    const timer = setTimeout(() => {
      const container = cardsContainerRef.current;
      if (!container) return;
      const tl = gsap.timeline();
      tl.to(container, {
        x: -28,
        duration: 0.45,
        ease: "power2.out",
      });
      tl.to(container, {
        x: 0,
        duration: 0.5,
        ease: "power2.inOut",
        delay: 0.15,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [isMobileSlider]);

  // IntersectionObserver for dot tracking in mobile slider
  useEffect(() => {
    if (!isMobileSlider || !cardsContainerRef.current) return;

    const container = cardsContainerRef.current;
    const items = Array.from(container.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSlide(idx);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [isMobileSlider]);

  // Scroll to a specific slide when dot is clicked
  const scrollToSlide = useCallback((index: number) => {
    if (!cardsContainerRef.current) return;
    const items = Array.from(cardsContainerRef.current.children) as HTMLElement[];
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(".fit-heading > *", { opacity: 1, y: 0 });
        gsap.set([leftCardRef.current, rightCardRef.current], {
          opacity: 1,
          x: 0,
        });
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

      // 2. Cards entrance (3D rotation in desktop, simple fade in mobile)
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
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
      } else {
        tl.fromTo(
          [leftCardRef.current, rightCardRef.current],
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

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
          ).to(accentLine, { scaleX: 0, opacity: 0, duration: 0.8, ease: "power2.inOut" }, "+=0.3");
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobileSlider]);

  return (
    <section
      ref={sectionRef}
      id="fit"
      className="bg-carbon-black relative z-20 overflow-hidden py-20 md:py-32 2xl:py-40"
    >
      {/* Ambient background glows */}
      <AmbientGlow className="bg-electric-violet/5 top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 blur-[120px] 2xl:h-[700px] 2xl:w-[700px]" />
      <AmbientGlow className="bg-neon-blue/[0.03] top-0 right-0 h-[300px] w-[300px] blur-[100px]" />
      <AmbientGlow className="bg-electric-violet/[0.04] bottom-0 left-0 h-[250px] w-[250px] blur-[90px]" />

      {/* Subtle grid dot pattern across background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
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
          eyebrow="AFINIDAD"
          title="Alineación de visión y ejecución"
          description="El éxito de un producto depende de compartir los mismos estándares.\nEstos son los principios sobre los que construimos nuestras alianzas."
          className="fit-heading"
        />

        <div
          ref={cardsContainerRef}
          className="scrollbar-hide -mx-4 mx-auto mt-12 flex max-w-5xl snap-x snap-mandatory gap-6 overflow-x-auto px-4 py-2 pb-4 md:mx-auto md:grid md:grid-cols-2 md:gap-8 md:overflow-x-visible md:px-0 md:py-0 md:pb-0 2xl:mt-16 2xl:max-w-7xl 2xl:gap-12"
          style={{ perspective: "1000px" }}
        >
          {/* Ideal Fit Card */}
          <div
            ref={leftCardRef}
            className="max-w-[340px] min-w-[85vw] shrink-0 snap-center md:max-w-none md:min-w-0 md:shrink md:snap-align-none"
          >
            <FitCard
              variant="ideal"
              items={IDEAL_FITS}
              title="Somos tu aliado ideal si:"
              icon={Check}
            />
          </div>

          {/* Non-Ideal Fit Card */}
          <div
            ref={rightCardRef}
            className="max-w-[340px] min-w-[85vw] shrink-0 snap-center md:max-w-none md:min-w-0 md:shrink md:snap-align-none"
          >
            <FitCard variant="avoid" items={AVOID_FITS} title="No encajamos bien si:" icon={X} />
          </div>
        </div>

        {/* Dot indicators — mobile only */}
        {isMobileSlider && (
          <div
            className="mt-6 flex items-center justify-center gap-2 md:hidden"
            role="tablist"
            aria-label="Indicadores del slider de fit"
          >
            {[0, 1].map((idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                role="tab"
                aria-selected={activeSlide === idx}
                aria-label={`Ir a tarjeta ${idx + 1}`}
                className={`focus-visible:ring-electric-violet relative rounded-full transition-all duration-300 after:absolute after:inset-[-8px] after:content-[''] focus-visible:ring-1 focus-visible:outline-none ${activeSlide === idx
                  ? "bg-electric-violet h-2 w-5"
                  : "bg-steel-grey/40 hover:bg-steel-grey/70 h-2 w-2"
                  }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
