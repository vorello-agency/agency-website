"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import Eyebrow from "@/components/ui/Eyebrow";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const textSegments = [
    { text: "No construimos páginas aisladas, sino", highlight: false },
    { text: "sistemas digitales", highlight: true },
    { text: "pensados para funcionar, escalar y generar", highlight: false },
    { text: "resultados reales.", highlight: true },
  ];

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      if (prefersReducedMotion) {
        // Fallback for reduced motion: show everything statically
        gsap.set(".reveal-word", { opacity: 1, filter: "blur(0px)", y: 0 });
        gsap.set(".reveal-item", { opacity: 1, y: 0 });
        return;
      }

      // Smooth editorial entrance for intro tag and paragraph
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        }
      );

      // Advanced word-by-word reveal with soft blur clearing and scroll-driven highlight
      gsap.fromTo(
        ".reveal-word",
        {
          opacity: 0,
          filter: "blur(4px)",
          y: 4,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.06,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 52%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifiesto"
      className="bg-carbon-black relative z-20 overflow-hidden py-20 md:py-28 2xl:py-36"
    >
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col gap-6 2xl:gap-8">
          {/* Manifesto Intro Tag */}
          <Eyebrow className="reveal-item mb-4 block">NUESTRO MANIFIESTO</Eyebrow>

          {/* High-Fidelity Word-Split Manifesto Heading */}
          <h2
            ref={textRef}
            className="text-copy-muted font-sans text-3xl leading-tight font-bold tracking-tight select-none sm:text-4xl md:text-5xl lg:text-[50px] 2xl:text-[64px] 2xl:leading-[1.1]"
          >
            {textSegments.map((segment, segmentIdx) => {
              const words = segment.text.split(" ").filter(Boolean);
              return words.map((word, wordIdx) => (
                <span
                  key={`${segmentIdx}-${wordIdx}`}
                  className={cn(
                    "reveal-word mr-[0.25em] inline-block",
                    segment.highlight ? "font-semibold text-white" : "text-copy-muted"
                  )}
                >
                  {word}
                </span>
              ));
            })}
          </h2>

          {/* Manifesto Subtext Paragraph */}
          <p className="reveal-item text-copy-muted mt-2 max-w-2xl text-base leading-relaxed sm:text-lg 2xl:mt-4 2xl:max-w-3xl 2xl:text-xl">
            Trabajamos con proceso, estándares altos y tecnología moderna.
            <br />
            El resultado se nota en cada detalle.
          </p>
        </div>
      </Container>
    </section>
  );
}
