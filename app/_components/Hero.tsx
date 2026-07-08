"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import DotBackground from "@/components/ui/DotBackground";
import Link from "next/link";
import HeroProductPreview from "./hero/HeroProductPreview";
import TechScaleDivider from "@/components/layout/TechScaleDivider";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Refs for the product preview composition (passed down to HeroProductPreview)
  const mainCardRef = useRef<HTMLDivElement>(null);
  const sat1Ref = useRef<HTMLDivElement>(null);
  const sat2Ref = useRef<HTMLDivElement>(null);
  const sat3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
                headlineRef.current,
                subtitleRef.current,
                ctaRef.current,
                mainCardRef.current,
                sat1Ref.current,
                sat2Ref.current,
                sat3Ref.current,
              ],
              { opacity: 1, y: 0, scale: 1 }
            );
            return;
          }

          // Entrance sequence — text leads, visual follows
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          // Text stagger
          tl.fromTo(
            headlineRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.05 }
          )
            .fromTo(
              subtitleRef.current,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4 },
              "-=0.3"
            )
            .fromTo(
              ctaRef.current,
              { y: 10, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4 },
              "-=0.3"
            );

          // Main card enters in parallel with CTAs
          tl.fromTo(
            mainCardRef.current,
            { scale: 0.96, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.7 },
            "-=0.5"
          );

          // Satellites stagger in
          tl.fromTo(
            sat1Ref.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.35"
          )
            .fromTo(
              sat2Ref.current,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              "-=0.35"
            )
            .fromTo(
              sat3Ref.current,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              "-=0.35"
            );

          // Floating idle — each element with a different phase for organic feel
          gsap.to(mainCardRef.current, {
            y: -6,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          gsap.to(sat1Ref.current, {
            y: -4,
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.5,
          });
          gsap.to(sat2Ref.current, {
            y: -5,
            duration: 3.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.0,
          });
          gsap.to(sat3Ref.current, {
            y: -3,
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.3,
          });
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-carbon-black relative z-30 flex min-h-[90vh] flex-col items-stretch justify-center overflow-hidden pt-32 pb-16 sm:min-h-[85vh] sm:pt-36 sm:pb-28 md:pb-24 lg:items-center lg:pt-44 lg:pb-36 2xl:pt-48 2xl:pb-40"
    >
      {/* Premium clean dots background with radial mask */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <DotBackground className="opacity-80" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, var(--carbon-black) 80%)",
          }}
        />
      </div>

      <Container spacing="compact" className="relative z-10 flex w-full grow flex-col items-center gap-12 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-16 2xl:gap-x-20 2xl:gap-y-10">
        {/* Left Column: Text & CTA */}
        <div className="flex w-full grow flex-col items-center text-center gap-6 sm:gap-8 lg:col-span-6 lg:items-start lg:text-left lg:gap-10 2xl:gap-12">
          {/* Badge */}
          <Badge variant="violet">
            AGENCIA DIGITAL PREMIUM
          </Badge>

          {/* Headline & Subheadline Group */}
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 lg:items-start lg:text-left lg:gap-5">
            {/* Headline — Space Grotesk (sans), stacked for typographic impact */}
            <h1
              ref={headlineRef}
              className="font-sans font-bold text-chrome-highlight flex max-w-5xl flex-col gap-1 text-3xl leading-[1.05] tracking-tight select-none sm:gap-2 sm:text-6xl md:text-6xl lg:text-[clamp(2.1rem,3.8vw,6rem)] 2xl:gap-2.5 2xl:text-8xl"
              style={{ opacity: 0 }}
            >
              <span className="whitespace-nowrap">Experiencias digitales</span>
              <span className="whitespace-nowrap">que se sienten tan bien</span>
              <span className="whitespace-nowrap">
                como funcionan
                <span className="text-electric-violet ml-[0.02em] inline-block translate-y-[-0.07em] text-[0.78em] select-none">
                  .
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              ref={subtitleRef}
              className="text-copy-muted max-w-xl text-base leading-relaxed text-balance sm:text-xl md:text-xl lg:text-[clamp(1.05rem,1.15vw,1.5rem)] lg:max-w-none 2xl:max-w-2xl"
              style={{ opacity: 0 }}
            >
              <span className="lg:block lg:whitespace-nowrap">
                Diseñamos y desarrollamos productos digitales
              </span>
              <span className="lg:block lg:whitespace-nowrap">
                con criterio visual, base técnica sólida y escala.
              </span>
            </p>
          </div>

          {/* Call to Actions */}
          <div
            ref={ctaRef}
            className="mx-auto flex w-full max-w-72 flex-col items-center justify-center gap-2 pt-4 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4 lg:mx-0 lg:justify-start lg:pt-6 2xl:pt-8"
            style={{ opacity: 0 }}
          >
            <Link href="/start" className="w-full focus-visible:outline-none sm:w-auto">
              <Button variant="primary" size="lg" className="w-full" withArrow>
                Hablar de mi proyecto
              </Button>
            </Link>
            <Link href="/services" className="w-full focus-visible:outline-none sm:w-auto">
              <Button
                variant="subtle"
                size="lg"
                className="text-chrome-deep hover:text-chrome-highlight w-full"
              >
                Ver servicios
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Product Preview Composition */}
        <div className="mt-4 flex w-full items-center justify-center sm:mt-6 lg:col-span-6 lg:mt-0">
          <HeroProductPreview
            mainCardRef={mainCardRef}
            sat1Ref={sat1Ref}
            sat2Ref={sat2Ref}
            sat3Ref={sat3Ref}
          />
        </div>
      </Container>
    </section>
  );
}
