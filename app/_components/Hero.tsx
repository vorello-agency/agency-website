"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import DotBackground from "@/components/ui/DotBackground";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const isotipoRef = useRef<HTMLImageElement>(null);

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
              [headlineRef.current, subtitleRef.current, ctaRef.current, visualRef.current],
              { opacity: 1, y: 0, scale: 1 }
            );
            return;
          }

          // Create a smooth entrance sequence (optimized for faster LCP)
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.fromTo(
            headlineRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.05 }
          )
            .fromTo(
              subtitleRef.current,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4 },
              "-=0.4"
            )
            .fromTo(
              ctaRef.current,
              { y: 10, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4 },
              "-=0.3"
            )
            .fromTo(
              visualRef.current,
              { scale: 0.97, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6 },
              "-=0.3"
            );

          // Idle floating animation for the visual element
          gsap.to(visualRef.current, {
            y: -12,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.8,
          });
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleIsotipoMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isotipoRef.current) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    // Calculate cursor position relative to the element's center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const maxTilt = 18; // Maximum tilt rotation in degrees

    gsap.to(isotipoRef.current, {
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
      transformPerspective: 800,
      scale: 1.05, // Slight zoom-in for premium depth feel
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleIsotipoMouseLeave = () => {
    if (!isotipoRef.current) return;
    gsap.to(isotipoRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 800,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1.1, 0.4)",
      overwrite: "auto",
    });
  };

  const handleIsotipoTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!isotipoRef.current) return;
    const touch = e.touches[0];
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;

    const maxTilt = 15;

    gsap.to(isotipoRef.current, {
      rotateX: -y * maxTilt,
      rotateY: x * maxTilt,
      transformPerspective: 800,
      scale: 1.06,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleIsotipoTouchEnd = () => {
    if (!isotipoRef.current) return;
    gsap.to(isotipoRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 800,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1.1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={containerRef}
      className="bg-carbon-black relative z-20 flex min-h-[90vh] flex-col items-stretch justify-center overflow-hidden pt-32 pb-16 sm:min-h-[85vh] sm:pt-36 sm:pb-28 md:pb-24 lg:items-center 2xl:pt-36 2xl:pb-32"
    >
      {/* Premium clean dots background with radial mask */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Dot pattern */}
        <DotBackground className="opacity-80" />
        {/* Radial gradient overlay that fades the dots into solid carbon-black */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, var(--carbon-black) 80%)",
          }}
        />
      </div>

      <Container className="relative z-10 flex w-full flex-grow flex-col items-center gap-16 lg:grid lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8 2xl:gap-x-24 2xl:gap-y-10">
        {/* Left Column: Text & CTA */}
        <div className="flex w-full flex-grow flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
          {/* Decorative Badge */}
          <Badge variant="violet" className="mb-12 sm:mb-8">
            <span className="hidden sm:inline-flex">VORELLO — ESTUDIO DIGITAL PREMIUM</span>
            <span className="inline-flex sm:hidden">ESTUDIO DIGITAL PREMIUM</span>
          </Badge>

          <h1
            ref={headlineRef}
            className="font-bebas text-chrome-highlight mb-8 flex max-w-5xl flex-col gap-3 text-6xl leading-[0.9] tracking-wide uppercase select-none sm:mb-6 sm:gap-2 sm:text-8xl lg:text-8xl xl:text-9xl 2xl:mb-8 2xl:gap-3"
            style={{ opacity: 0 }}
          >
            <span>
              Diseño
              <span className="text-chrome-deep ml-[0.02em] inline-block translate-y-[-0.07em] text-[0.78em] select-none">
                .
              </span>
            </span>
            <span>
              Tecnología
              <span className="text-chrome-deep ml-[0.02em] inline-block translate-y-[-0.07em] text-[0.78em] select-none">
                .
              </span>
            </span>
            <span>
              Producto
              <span className="text-chrome-deep ml-[0.02em] inline-block translate-y-[-0.07em] text-[0.78em] select-none">
                .
              </span>
            </span>
          </h1>

          {/* Brand core positioning sentence - improved contrast */}
          <p
            ref={subtitleRef}
            className="text-copy-muted max-w-2xl text-base leading-relaxed text-balance sm:text-lg md:text-xl 2xl:max-w-3xl 2xl:text-2xl"
            style={{ opacity: 0 }}
          >
            Diseñamos y desarrollamos productos bien pensados, visualmente cuidados y técnicamente
            sólidos.
          </p>

          {/* Call to Actions */}
          <div
            ref={ctaRef}
            className="mx-auto mt-auto flex w-full max-w-72 flex-col items-center justify-center gap-3 pt-10 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4 lg:mx-0 lg:justify-start"
            style={{ opacity: 0 }}
          >
            <Link href="/start" className="w-full focus-visible:outline-none sm:w-auto">
              <Button variant="primary" size="lg" className="w-full" withArrow>
                Iniciar proyecto
              </Button>
            </Link>
            <Link href="/services" className="w-full focus-visible:outline-none sm:w-auto">
              <Button
                variant="subtle"
                size="lg"
                className="text-chrome-deep hover:text-chrome-highlight w-full"
              >
                Conoce nuestros servicios
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Element with Isotipo (Hidden on mobile) */}
        <div className="mt-6 hidden w-full items-center justify-center sm:mt-10 lg:col-span-5 lg:mt-0 lg:flex">
          <div
            ref={visualRef}
            className="relative mx-auto flex w-full max-w-[160px] items-center justify-center sm:max-w-[224px] md:max-w-md"
            style={{ opacity: 0 }}
          >
            {/* Energy Rings & Tech Blueprint (Minimal & Interactive) */}
            {/* Fourth Orbit (Outer - Green) */}
            <div className="pointer-events-none absolute h-[130%] w-[130%] [transform:translateZ(0)] animate-[spin_150s_linear_infinite] rounded-full border border-transparent will-change-transform" />

            {/* Third Orbit (Blue) */}
            <div className="pointer-events-none absolute h-[112%] w-[112%] [transform:translateZ(0)] animate-[spin_120s_linear_infinite] rounded-full border border-transparent will-change-transform" />

            {/* Second Orbit (Violet) */}
            <div className="pointer-events-none absolute h-[94%] w-[94%] [transform:translateZ(0)] animate-[spin_70s_linear_infinite_reverse] rounded-full border border-transparent will-change-transform" />

            {/* First Orbit (Innermost - Orange) */}
            <div className="pointer-events-none absolute h-[76%] w-[76%] [transform:translateZ(0)] animate-[spin_55s_linear_infinite] rounded-full border border-transparent will-change-transform" />

            {/* Fourth Energy Particle tracking the outer orbit (Green) */}
            <div className="pointer-events-none absolute h-[130%] w-[130%] animate-[spin_12s_linear_infinite_reverse]">
              <span className="bg-signal-emerald/60 absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_4px_var(--signal-emerald)]" />
            </div>

            {/* Third Energy Particle (Blue) */}
            <div className="pointer-events-none absolute h-[112%] w-[112%] animate-[spin_10s_linear_infinite]">
              <span className="bg-neon-blue/60 absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full shadow-[0_0_6px_var(--neon-blue)]" />
            </div>

            {/* Second Energy Particle (Violet) */}
            <div className="pointer-events-none absolute h-[94%] w-[94%] animate-[spin_6s_linear_infinite_reverse]">
              <span className="bg-electric-violet/60 absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_4px_var(--electric-violet)]" />
            </div>

            {/* First Energy Particle (Orange) */}
            <div className="pointer-events-none absolute h-[76%] w-[76%] animate-[spin_8s_linear_infinite]">
              <span className="bg-signal-orange/60 absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_4px_var(--signal-orange)]" />
            </div>

            {/* Interactive container that captures mouse and touch gestures, preventing iOS native image popup */}
            <div
              className="select-drag-disabled z-10 flex h-28 w-28 cursor-pointer touch-none items-center justify-center select-none sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-76 lg:w-76 2xl:h-[350px] 2xl:w-[350px]"
              onMouseMove={handleIsotipoMouseMove}
              onMouseLeave={handleIsotipoMouseLeave}
              onTouchStart={handleIsotipoTouchStart}
              onTouchEnd={handleIsotipoTouchEnd}
              onTouchCancel={handleIsotipoTouchEnd}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                ref={isotipoRef}
                width={350}
                height={350}
                priority
                sizes="(max-width: 768px) 120px, (max-width: 1024px) 176px, 304px"
                src="/assets/isotipo.webp"
                alt="Logotipo interactivo de Vorello Agency"
                className="select-drag-disabled pointer-events-none h-full w-full object-contain select-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
