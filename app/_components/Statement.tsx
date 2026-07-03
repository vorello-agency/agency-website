"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const textSegments = [
    { text: "No construimos páginas aisladas, sino", highlight: false },
    { text: "sistemas digitales", highlight: true },
    { text: "pensados para funcionar, escalar y generar", highlight: false },
    { text: "resultados reales.", highlight: true }
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
          opacity: 0.15,
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
      className="py-20 md:py-28 2xl:py-36 bg-carbon-black relative z-20 overflow-hidden"
    >

      <Container>
        <div className="max-w-4xl mx-auto flex flex-col gap-6 2xl:gap-8">
          {/* Manifesto Intro Tag */}
          <span className="reveal-item font-mono text-xs text-electric-violet uppercase tracking-widest block font-semibold">
            {"// NUESTRO MANIFIESTO"}
          </span>

          {/* High-Fidelity Word-Split Manifesto Heading */}
          <h2
            ref={textRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] 2xl:text-[64px] font-bold tracking-tight text-[#8F9BA8] leading-tight 2xl:leading-[1.1] select-none font-sans"
          >
            {textSegments.map((segment, segmentIdx) => {
              const words = segment.text.split(" ").filter(Boolean);
              return words.map((word, wordIdx) => (
                <span
                  key={`${segmentIdx}-${wordIdx}`}
                  className={cn(
                    "reveal-word inline-block mr-[0.25em]",
                    segment.highlight ? "text-white font-semibold" : "text-[#8F9BA8]"
                  )}
                >
                  {word}
                </span>
              ));
            })}
          </h2>

          {/* Manifesto Subtext Paragraph */}
          <p className="reveal-item text-base sm:text-lg 2xl:text-xl text-[#A8B0BD] max-w-2xl 2xl:max-w-3xl leading-relaxed mt-2 2xl:mt-4">
            Trabajamos con proceso, estándares altos y tecnología moderna.
            <br />
            El resultado se nota en cada detalle.
          </p>
        </div>
      </Container>
    </section>
  );
}
