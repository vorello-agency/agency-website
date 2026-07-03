"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
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
      // Create a smooth entrance sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          visualRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 },
          "-=0.5"
        );

      // Idle floating animation for the visual element
      gsap.to(visualRef.current, {
        y: -12,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });
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
      className="relative z-20 min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 md:pb-24 2xl:pt-36 2xl:pb-32 overflow-hidden bg-carbon-black"
    >
      {/* Premium clean dots background with radial mask */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dot pattern */}
        <div className="absolute inset-0 bg-dot-white opacity-80" />
        {/* Radial gradient overlay that fades the dots into solid carbon-black */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, var(--carbon-black) 80%)"
          }}
        />
      </div>


      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 2xl:gap-24 items-center">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Decorative Badge */}
          <Badge variant="violet" className="mb-5 sm:mb-8">
            <span className="hidden sm:inline-flex">VORELLO — ESTUDIO DIGITAL PREMIUM</span>
            <span className="inline-flex sm:hidden">ESTUDIO DIGITAL PREMIUM</span>
          </Badge>

          <h1
            ref={headlineRef}
            className="text-5xl sm:text-8xl lg:text-8xl xl:text-9xl font-bebas tracking-wide text-chrome-highlight uppercase mb-4 sm:mb-6 2xl:mb-8 max-w-5xl leading-[0.9] select-none flex flex-col gap-1 sm:gap-2 2xl:gap-3"
            style={{ opacity: 0 }}
          >
            <span>Diseño<span className="inline-block text-[0.78em] translate-y-[-0.07em] ml-[0.02em] select-none text-chrome-deep">.</span></span>
            <span>Tecnología<span className="inline-block text-[0.78em] translate-y-[-0.07em] ml-[0.02em] select-none text-chrome-deep">.</span></span>
            <span>Producto<span className="inline-block text-[0.78em] translate-y-[-0.07em] ml-[0.02em] select-none text-chrome-deep">.</span></span>
          </h1>

          {/* Brand core positioning sentence - improved contrast */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-[#A8B0BD] max-w-2xl 2xl:max-w-3xl leading-relaxed text-balance mb-10 2xl:mb-14"
            style={{ opacity: 0 }}
          >
            Diseñamos y desarrollamos productos bien pensados, visualmente cuidados y técnicamente sólidos.
          </p>

          {/* Call to Actions */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start w-full sm:w-auto"
            style={{ opacity: 0 }}
          >
            <Link href="/start" className="w-full sm:w-auto focus-visible:outline-none">
              <Button variant="primary-blue" size="lg" className="w-full" withArrow>
                Iniciar proyecto
              </Button>
            </Link>
            <Link href="#proceso" className="w-full sm:w-auto focus-visible:outline-none">
              <Button variant="outline" size="lg" className="w-full bg-carbon-black/50">
                Proceso de trabajo
              </Button>
            </Link>

          </div>
        </div>

        {/* Right Column: Visual Element with Isotipo */}
        <div className="lg:col-span-5 flex items-center justify-center w-full mt-6 sm:mt-10 lg:mt-0">
          <div
            ref={visualRef}
            className="relative w-full max-w-[160px] sm:max-w-[224px] md:max-w-md mx-auto flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            {/* Energy Rings & Tech Blueprint (Minimal & Interactive) */}
            {/* Fourth Orbit (Outer - Green) */}
            <div className="absolute rounded-full border border-transparent w-[130%] h-[130%] pointer-events-none will-change-transform [transform:translateZ(0)] animate-[spin_150s_linear_infinite]" />

            {/* Third Orbit (Blue) */}
            <div className="absolute rounded-full border border-transparent w-[112%] h-[112%] pointer-events-none will-change-transform [transform:translateZ(0)] animate-[spin_120s_linear_infinite]" />

            {/* Second Orbit (Violet) */}
            <div className="absolute rounded-full border border-transparent w-[94%] h-[94%] pointer-events-none will-change-transform [transform:translateZ(0)] animate-[spin_70s_linear_infinite_reverse]" />

            {/* First Orbit (Innermost - Orange) */}
            <div className="absolute rounded-full border border-transparent w-[76%] h-[76%] pointer-events-none will-change-transform [transform:translateZ(0)] animate-[spin_55s_linear_infinite]" />

            {/* Fourth Energy Particle tracking the outer orbit (Green) */}
            <div className="absolute w-[130%] h-[130%] pointer-events-none animate-[spin_12s_linear_infinite_reverse]">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500/60 shadow-[0_0_4px_#10b981]" />
            </div>

            {/* Third Energy Particle (Blue) */}
            <div className="absolute w-[112%] h-[112%] pointer-events-none animate-[spin_10s_linear_infinite]">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neon-blue/60 shadow-[0_0_6px_#2D8FFF] animate-pulse" />
            </div>

            {/* Second Energy Particle (Violet) */}
            <div className="absolute w-[94%] h-[94%] pointer-events-none animate-[spin_6s_linear_infinite_reverse]">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-electric-violet/60 shadow-[0_0_4px_#7B4CFF]" />
            </div>

            {/* First Energy Particle (Orange) */}
            <div className="absolute w-[76%] h-[76%] pointer-events-none animate-[spin_8s_linear_infinite]">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF5C00]/60 shadow-[0_0_4px_#FF5C00]" />
            </div>

            {/* Interactive container that captures mouse and touch gestures, preventing iOS native image popup */}
            <div
              className="w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-76 lg:h-76 2xl:w-[350px] 2xl:h-[350px] flex items-center justify-center cursor-pointer z-10 touch-none select-none select-drag-disabled"
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
                className="w-full h-full object-contain pointer-events-none select-none select-drag-disabled"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
