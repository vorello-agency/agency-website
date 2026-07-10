"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import { processSteps } from "@/data/process";
import ProcessStepCard from "./process/ProcessStepCard";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLUListElement>(null);
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
    if (!isMobileSlider || swipeHintDone.current || !stepsContainerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    swipeHintDone.current = true;
    const items = Array.from(stepsContainerRef.current.children) as HTMLElement[];
    const secondCard = items[1];
    if (!secondCard) return;

    // Delay to let render settle, then peek
    const timer = setTimeout(() => {
      const container = stepsContainerRef.current;
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
    if (!isMobileSlider || !stepsContainerRef.current) return;

    const container = stepsContainerRef.current;
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
    if (!stepsContainerRef.current) return;
    const items = Array.from(stepsContainerRef.current.children) as HTMLElement[];
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  // Entrance animations setup
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!stepsContainerRef.current) return;

      const steps = Array.from(stepsContainerRef.current.children) as HTMLElement[];

      if (prefersReducedMotion) {
        gsap.set(".process-heading > *", { opacity: 1, y: 0 });
        gsap.set(steps, { opacity: 1, y: 0, scale: 1, rotationX: 0 });
        steps.forEach((stepEl) => {
          gsap.set(
            stepEl.querySelectorAll(
              ".process-icon-box, .process-phase, .process-title, .process-desc"
            ),
            {
              opacity: 1,
              y: 0,
              scale: 1,
              x: 0,
            }
          );
        });
        return;
      }

      // 1. Cinematic Timeline for Heading and Bento Grid Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Heading slide-up stagger
      tl.fromTo(
        ".process-heading > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // 2. Bento grid cards with 3D rotationX entrance (md+ only)
      const isDesktop = window.innerWidth >= 768;
      if (isDesktop) {
        tl.fromTo(
          steps,
          {
            opacity: 0,
            y: 40,
            rotationX: 8,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08, // Optimized stagger to 0.08s
            ease: "power2.out",
          },
          "-=0.4"
        );
      } else {
        // Mobile entrance animation: clean fade-in and slide-up for the horizontal scroll cards
        tl.fromTo(
          steps,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.35"
        );
      }

      // 3. Staggered inner content reveals per card
      steps.forEach((stepEl) => {
        const cardInner = stepEl.querySelector(".process-card") as HTMLElement | null;
        if (!cardInner) return;

        const iconBox = cardInner.querySelector(".process-icon-box");
        const phase = cardInner.querySelector(".process-phase");
        const title = cardInner.querySelector(".process-title");
        const desc = cardInner.querySelector(".process-desc");

        // On mobile slider, don't hide inner content — let it be visible
        if (!isDesktop) {
          gsap.set([iconBox, phase, title, desc], { opacity: 1 });
          return;
        }

        // Set initial states
        gsap.set([iconBox, phase, title, desc], { opacity: 0 });

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: stepEl,
            start: "top 62%",
            toggleActions: "play none none none",
          },
        });

        // Icon scales in with back ease
        if (iconBox) {
          cardTl.fromTo(
            iconBox,
            { opacity: 0, scale: 0.6 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.4)",
            }
          );
        }

        // Phase label types in
        if (phase) {
          cardTl.fromTo(
            phase,
            { opacity: 0, x: -10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }

        // Title slides up
        if (title) {
          cardTl.fromTo(
            title,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.25"
          );
        }

        // Description fades in
        if (desc) {
          cardTl.fromTo(
            desc,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.25"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative z-40 overflow-hidden py-20 md:py-32"
      style={{
        background:
          "radial-gradient(circle at 15% 25%, rgba(123, 76, 255, 0.10), transparent 32%), linear-gradient(180deg, var(--carbon-black) 0%, #111419 48%, var(--carbon-black) 100%)",
      }}
    >
      {/* Premium Small Grid Overlay with center-focused radial mask */}
      <div
        className="bg-grid-small pointer-events-none absolute inset-0 z-0"
        style={{
          maskImage: "radial-gradient(circle at center, white 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at center, white 30%, transparent 85%)",
        }}
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="PROCESO"
          title="La metodología detrás de cada producto sólido"
          description="Cada proyecto pasa por etapas definidas de descubrimiento, diseño, desarrollo y validación antes de salir a producción."
          className="process-heading"
        />

        {/* Mobile: horizontal scroll-snap slider | md+: bento grid */}
        <ul
          ref={stepsContainerRef}
          className="group/grid scrollbar-hide -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-2 pb-2 md:mx-0 md:grid md:grid-cols-12 md:grid-rows-3 md:gap-6 md:overflow-x-visible md:px-0 md:py-0 md:pb-0 lg:max-h-[46rem] lg:grid-rows-3"
          style={{ perspective: "1200px" }}
        >
          {processSteps.map((step, idx) => (
            <ProcessStepCard
              key={idx}
              step={step}
              isActive={activeSlide === idx}
              isMobile={isMobileSlider}
            />
          ))}
        </ul>

        {/* Dot indicators + phase label — mobile only */}
        {isMobileSlider && (
          <div className="mt-6 flex flex-col items-center gap-3 md:hidden">
            {/* Phase label */}
            <span className="text-electric-violet/80 font-mono text-[10px] font-semibold tracking-widest uppercase">
              Fase {processSteps[activeSlide].num} de {String(processSteps.length).padStart(2, "0")} —{" "}
              {processSteps[activeSlide].name}
            </span>
            {/* Dots */}
            <div
              className="flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Indicadores del slider de proceso"
            >
              {processSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  role="tab"
                  aria-selected={activeSlide === idx}
                  aria-label={`Ir a fase ${idx + 1}`}
                  className={`focus-visible:ring-electric-violet relative rounded-full transition-all duration-300 after:absolute after:inset-[-8px] after:content-[''] focus-visible:ring-1 focus-visible:outline-none ${activeSlide === idx
                      ? "bg-electric-violet h-2 w-5"
                      : "bg-steel-grey/40 hover:bg-steel-grey/70 h-2 w-2"
                    }`}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
