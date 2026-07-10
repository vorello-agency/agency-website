"use client";

import React, { useEffect, useRef } from "react";
import { Layers, Server, Palette } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import TechnologyCard from "./technologies/TechnologyCard";
const LAYERS = [
  {
    num: "1",
    label: "DESIGN",
    title: "Sistema visual y experiencia",
    icon: Palette,
    chips: ["Figma", "Storybook", "Design Systems", "UX/UI", "Prototyping"],
    colorTheme: "orange",
    glowColors: { start: "var(--signal-orange)", end: "#FF3D00" },
  },
  {
    num: "2",
    label: "FRONTEND",
    title: "Interfaz, interacción y rendimiento",
    icon: Layers,
    chips: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
    colorTheme: "violet",
    glowColors: { start: "var(--electric-violet)", end: "var(--neon-blue)" },
  },
  {
    num: "3",
    label: "BACKEND",
    title: "Datos, servicios e infraestructura",
    icon: Server,
    chips: ["Node.js", "Vercel", "Supabase", "Sanity", "Stripe"],
    colorTheme: "blue",
    glowColors: { start: "var(--neon-blue)", end: "#00f2fe" },
  },
];

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLUListElement>(null);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!cardsContainerRef.current) return;

      const cards = Array.from(cardsContainerRef.current.children) as HTMLElement[];

      if (prefersReducedMotion) {
        gsap.set(".tech-heading > *", { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        cards.forEach((card) => {
          gsap.set(card.querySelectorAll(".tech-chip"), {
            opacity: 1,
            scale: 1,
            x: 0,
          });
        });
        return;
      }

      // 1. Unified Cinematic Timeline (Trigger calibrated to top 62% for balanced scroll focus)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          toggleActions: "play none none none",
        },
      });

      // 2. SectionHeading stagger entrance (Standardized to 0.6s duration)
      tl.fromTo(
        ".tech-heading > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // 3. Stagger reveal of Layer Cards (Standardized to 0.6s duration)
      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 4. Stagger reveal of Chips inside each Layer Card (Standardized to 0.4s duration)
      cards.forEach((card) => {
        const chips = card.querySelectorAll(".tech-chip");
        tl.fromTo(
          chips,
          { opacity: 0, scale: 0.85, x: 6 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.4"
        );
      });

      // 5. Mobile touch-triggered sweep effect via ScrollTrigger for each Layer Card
      cards.forEach((card) => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch) {
          const cardInner = card.querySelector(".group");
          const glow = card.querySelector(".tech-glow");
          const borderGlow = card.querySelector(".tech-border-glow");

          if (cardInner && glow && borderGlow) {
            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 72%",
                toggleActions: "play none none none",
              },
            });

            const obj = { x: -120, y: 50 };

            cardTl.to([glow, borderGlow], {
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
            });

            cardTl.to(
              obj,
              {
                x: 500,
                y: 50,
                duration: 1.4,
                ease: "power2.inOut",
                onUpdate: () => {
                  (cardInner as HTMLElement).style.setProperty("--mouse-x", `${obj.x}px`);
                  (cardInner as HTMLElement).style.setProperty("--mouse-y", `${obj.y}px`);
                },
              },
              "-=0.25"
            );

            cardTl.to(
              [glow, borderGlow],
              {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
              },
              "-=0.3"
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="relative z-10 overflow-hidden py-20 md:py-32"
    >
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="TECNOLOGÍAS"
          title="Herramientas elegidas con criterio"
          description="Elegimos herramientas probadas, no populares.\nNuestra selección responde a un criterio de rendimiento, mantenibilidad y escala."
          className="tech-heading"
        />

        <ul
          ref={cardsContainerRef}
          className="group/grid mx-auto mt-12 flex max-w-5xl flex-col gap-6"
        >
          {LAYERS.map((layer, idx) => (
            <TechnologyCard key={idx} layer={layer} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
