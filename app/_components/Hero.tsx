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
  const badgeRef = useRef<HTMLDivElement>(null);
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
                badgeRef.current,
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

          // Target elements inside mainCardRef (Mockup Dashboard) for the loading animation
          const metrics = mainCardRef.current?.querySelectorAll(".hero-metric");
          const chartBars = mainCardRef.current?.querySelectorAll(".hero-chart-bar");
          const activityRows = mainCardRef.current?.querySelectorAll(".hero-activity-row");

          // Target elements inside sat1Ref (Design System card) for the loading animation
          const componentsEl = sat1Ref.current?.querySelector(".hero-design-components");
          const layoutsEl = sat1Ref.current?.querySelector(".hero-design-layouts");
          const swatches = sat1Ref.current?.querySelectorAll(".hero-design-swatch");

          // Target elements inside sat2Ref (Performance card) for the loading animation
          const scoreEl = sat2Ref.current?.querySelector(".hero-perf-score");
          const barEl = sat2Ref.current?.querySelector(".hero-perf-bar");
          const zapEl = sat2Ref.current?.querySelector("svg");

          // Target elements inside sat3Ref (Process card) for the loading animation
          const steps = sat3Ref.current?.querySelectorAll(".hero-process-step");

          if (metrics && metrics.length > 0) {
            gsap.set(metrics, { opacity: 0, y: 8 });
          }

          if (chartBars && chartBars.length > 0) {
            gsap.set(chartBars, { scaleY: 0, transformOrigin: "bottom center" });
          }

          if (activityRows && activityRows.length > 0) {
            gsap.set(activityRows, { opacity: 0, x: -8 });
          }

          if (componentsEl && layoutsEl) {
            gsap.set(componentsEl, { textContent: "0" });
            gsap.set(layoutsEl, { textContent: "0" });
          }

          if (swatches && swatches.length > 0) {
            gsap.set(swatches, { opacity: 0, scale: 0.5 });
          }

          if (scoreEl && barEl) {
            gsap.set(scoreEl, { textContent: "0" });
            gsap.set(barEl, { width: "0%" });
          }

          if (steps && steps.length > 0) {
            gsap.set(steps, { opacity: 0, x: -8 });
          }

          // Entrance sequence — text leads, visual follows
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          // Text stagger starting with Badge
          tl.fromTo(
            badgeRef.current,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 0.05 }
          )
            .fromTo(
              headlineRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 },
              "-=0.3"
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
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.7,
              onStart: () => {
                // 1. Stagger reveal metrics (LCP, CLS, FID)
                if (metrics && metrics.length > 0) {
                  gsap.to(metrics, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.06,
                    ease: "power2.out",
                    delay: 0.15,
                  });
                }

                // 2. Animate chart bars grow from bottom
                if (chartBars && chartBars.length > 0) {
                  gsap.to(chartBars, {
                    scaleY: 1,
                    duration: 0.6,
                    stagger: 0.02,
                    ease: "power2.out",
                    delay: 0.25,
                  });
                }

                // 3. Stagger reveal recent activity rows
                if (activityRows && activityRows.length > 0) {
                  gsap.to(activityRows, {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: "power2.out",
                    delay: 0.35,
                  });
                }
              },
              onComplete: () => {
                // ─── Infinite Live Fluctuation Loops (Senior Motion Polish) ───

                // 1. Chart bars fluctuate organically to simulate live traffic
                if (chartBars && chartBars.length > 0) {
                  chartBars.forEach((bar, idx) => {
                    gsap.to(bar, {
                      scaleY: "random(0.8, 1.15)",
                      duration: "random(2, 4.5)",
                      ease: "sine.inOut",
                      yoyo: true,
                      repeat: -1,
                      delay: idx * 0.04,
                    });
                  });
                }
              },
            },
            "-=0.5"
          );

          // Satellites stagger in
          tl.fromTo(
            sat1Ref.current,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              onStart: () => {
                // 1. Stagger reveal swatches with bounce
                if (swatches && swatches.length > 0) {
                  gsap.to(swatches, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.06,
                    ease: "back.out(2)",
                  });
                }

                // 2. Count-up components (0 to 24)
                if (componentsEl) {
                  const compObj = { val: 0 };
                  gsap.to(compObj, {
                    val: 24,
                    duration: 1.2,
                    ease: "power2.out",
                    onUpdate: () => {
                      componentsEl.textContent = Math.round(compObj.val).toString();
                    },
                  });
                }

                // 3. Count-up layout patterns (0 to 8)
                if (layoutsEl) {
                  const layoutObj = { val: 0 };
                  gsap.to(layoutObj, {
                    val: 8,
                    duration: 1.0,
                    ease: "power2.out",
                    onUpdate: () => {
                      layoutsEl.textContent = Math.round(layoutObj.val).toString();
                    },
                  });
                }
              },
            },
            "-=0.35"
          )
            .fromTo(
              sat2Ref.current,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                onStart: () => {
                  // Animate progress bar to 100%
                  if (barEl) {
                    gsap.to(barEl, {
                      width: "100%",
                      duration: 1.4,
                      ease: "power2.out",
                    });
                  }

                  // Animate score counter from 0 to 100
                  if (scoreEl) {
                    const scoreObj = { val: 0 };
                    gsap.to(scoreObj, {
                      val: 100,
                      duration: 1.4,
                      ease: "power2.out",
                      onUpdate: () => {
                        scoreEl.textContent = Math.round(scoreObj.val).toString();
                      },
                    });
                  }

                  // Animate zap icon pop
                  if (zapEl) {
                    gsap.fromTo(
                      zapEl,
                      { scale: 0.5, rotation: -20 },
                      {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: "back.out(2)",
                        delay: 0.9,
                      }
                    );
                  }
                },
              },
              "-=0.35"
            )
            .fromTo(
              sat3Ref.current,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                onStart: () => {
                  // Stagger steps in with a subtle slide
                  if (steps && steps.length > 0) {
                    gsap.to(steps, {
                      opacity: 1,
                      x: 0,
                      duration: 0.4,
                      stagger: 0.08,
                      ease: "power2.out",
                    });
                  }
                },
              },
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

      <Container spacing="compact" className="relative z-10 flex w-full grow flex-col items-center gap-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8 2xl:max-w-[1500px] 2xl:gap-x-28">
        {/* Left Column: Headline and CTAs unified flow */}
        <div className="flex w-full flex-col items-center text-center gap-6 sm:gap-8 lg:col-span-6 lg:items-start lg:text-left lg:justify-center lg:gap-6 2xl:gap-12">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="flex justify-center w-full lg:justify-start"
            style={{ opacity: 0 }}
          >
            <Badge variant="violet">
              AGENCIA DIGITAL PREMIUM
            </Badge>
          </div>

          {/* Headline & Subheadline Group */}
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 lg:items-start lg:text-left lg:gap-5 2xl:gap-8">
            {/* Headline — Space Grotesk (sans), stacked for typographic impact */}
            <h1
              ref={headlineRef}
              className="font-sans font-bold text-chrome-highlight flex max-w-5xl flex-col gap-1 text-[clamp(1.75rem,7.5vw,2.5rem)] leading-[1.05] tracking-tight select-none sm:gap-2 sm:text-[clamp(2.2rem,7.5vw,3.2rem)] md:text-[clamp(3.2rem,7vw,4rem)] lg:text-[clamp(2.1rem,3.8vw,6rem)] 2xl:gap-2 2xl:text-6xl"
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
            className="flex w-full max-w-72 flex-col items-center justify-center gap-2 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4 lg:justify-start"
            style={{ opacity: 0 }}
          >
            <Link href="/start" className="w-full focus-visible:outline-none sm:w-auto">
              <Button variant="primary-blue" size="lg" className="w-full" withArrow>
                Solicitar propuesta técnica
              </Button>
            </Link>
            <Link href="/services" className="w-full focus-visible:outline-none sm:w-auto">
              <Button
                variant="subtle"
                size="lg"
                className="text-chrome-deep hover:text-chrome-highlight w-full"
              >
                Explorar servicios
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Product Preview Composition (Mockup) */}
        <div className="mt-6 mb-8 flex w-full items-center justify-center sm:mt-8 sm:mb-12 lg:col-span-6 lg:mt-0 lg:mb-0 lg:justify-center">
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
