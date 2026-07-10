"use client";

import React, { useRef } from "react";
import { RefreshCw, Workflow, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { MOTION } from "@/lib/gsap/tokens";
import Link from "next/link";

export default function PostLaunchStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stripRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const items = stripRef.current.querySelectorAll(".strip-item");
      const divider = stripRef.current.querySelector(".strip-divider");

      if (prefersReducedMotion) {
        gsap.set([stripRef.current, items, divider], {
          opacity: 1,
          y: 0,
          scaleY: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // Container entrance
      tl.fromTo(
        stripRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.entrance,
          ease: MOTION.ease.enter,
        }
      );

      // Divider grows vertically (editorial detail)
      if (divider) {
        tl.fromTo(
          divider,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: MOTION.duration.base,
            ease: MOTION.ease.enter,
          },
          "-=0.3"
        );
      }

      // Content items stagger
      tl.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: MOTION.stagger.cascade,
          ease: MOTION.ease.enter,
        },
        "-=0.3"
      );
    },
    { scope: stripRef }
  );

  return (
    <div
      ref={stripRef}
      className="border-steel-grey/20 bg-graphite-metal mt-10 rounded-xl border p-6 md:mt-14 md:p-8 2xl:mt-16 2xl:p-8"
    >
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-0">
        {/* Vertical divider (desktop only) */}
        <div className="strip-divider bg-steel-grey/20 absolute top-0 bottom-0 left-1/2 hidden w-px origin-center md:block" />

        {/* Soporte continuo */}
        <div className="strip-item flex gap-4 md:pr-8 2xl:pr-12">
          <div className="bg-neon-blue/10 border-neon-blue/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border 2xl:h-12 2xl:w-12">
            <RefreshCw className="text-neon-blue h-5 w-5 2xl:h-6 2xl:w-6" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-chrome-highlight mb-1.5 text-sm font-bold tracking-tight 2xl:text-base">
              Evolución y mantenimiento
            </h4>
            <p className="text-copy-muted text-xs text-balance leading-relaxed 2xl:text-sm md:mb-2">
              Acompañamos cada proyecto después del lanzamiento con mejoras continuas, soporte
              técnico y optimización de rendimiento.
            </p>
            <Link
              href="/contact"
              className="text-chrome-highlight hover:text-neon-blue group/cta mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-none"
            >
              Consultar soporte{" "}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Automatización y evolución */}
        <div className="strip-item flex gap-4 md:pl-8 2xl:pl-12">
          <div className="bg-electric-violet/10 border-electric-violet/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border 2xl:h-12 2xl:w-12">
            <Workflow className="text-electric-violet h-5 w-5 2xl:h-6 2xl:w-6" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-chrome-highlight mb-1.5 text-sm font-bold tracking-tight 2xl:text-base">
              Automatizaciones e integraciones
            </h4>
            <p className="text-copy-muted text-xs text-balance leading-relaxed 2xl:text-sm md:mb-2">
              Conectamos herramientas, sistemas y procesos para reducir tareas manuales, ordenar
              operaciones y mejorar la eficiencia del negocio.
            </p>
            <div className="mt-3 flex items-center gap-4">
              <Link
                href="/services#automatizaciones"
                className="text-chrome-highlight hover:text-electric-violet group/cta inline-flex items-center gap-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-none"
              >
                Automatizaciones{" "}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Link>
              <Link
                href="/services#integraciones"
                className="text-chrome-highlight hover:text-electric-violet group/cta inline-flex items-center gap-1 font-mono text-xs font-semibold transition-colors focus-visible:outline-none"
              >
                Integraciones{" "}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
