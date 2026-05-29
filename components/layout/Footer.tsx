"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { TextHoverEffect } from "@/components/aceternity/text-hover-effect";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const signatureRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobileTouch, setIsMobileTouch] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Timeout references for clean cancellation
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const durationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      // Strictly on mobile viewports (< 768px)
      setIsMobileTouch(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggeredRef.current) {
            hasTriggeredRef.current = true;

            // Wait 2 seconds after reaching the bottom before starting the glow climax
            delayTimeoutRef.current = setTimeout(() => {
              setIsAtBottom(true);

              // Glow for 2 seconds (visual climax), then fade back to restore normal hover
              durationTimeoutRef.current = setTimeout(() => {
                setIsAtBottom(false);
              }, 2000);
            }, 2000);
          }
        } else {
          // Reset all timeouts immediately on leave to prevent ghost animations
          if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
          if (durationTimeoutRef.current) clearTimeout(durationTimeoutRef.current);

          setIsAtBottom(false);
          hasTriggeredRef.current = false;
        }
      },
      {
        root: null,
        threshold: 0.15, // Trigger when 15% of the signature is in viewport
      }
    );

    if (signatureRef.current) {
      observer.observe(signatureRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
      if (durationTimeoutRef.current) clearTimeout(durationTimeoutRef.current);
    };
  }, []);

  return (
    <footer className="relative border-t border-steel-grey/30 bg-carbon-black text-chrome-deep pt-12 pb-16 sm:pb-24 md:pt-16 md:pb-32 lg:pb-48 mt-auto overflow-hidden">
      <Container className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-24">
        {/* Brand details */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Link
            href="/"
            aria-label="Inicio"
            className="flex items-center gap-1 group focus-visible:outline-none w-fit"
          >
            <Logo
              variant="both"
              size="lg"
              className="opacity-95 transition-opacity group-hover:opacity-100"
            />
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">
            Diseñamos y desarrollamos productos digitales bien pensados,
            visually cuidados y técnicamente sólidos.
          </p>
        </div>

        {/* Services column */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-chrome-highlight font-mono">
            Servicios
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href="#servicios"
                className="hover:text-chrome-highlight transition-colors"
              >
                Webs de Alto Rendimiento
              </a>
            </li>
            <li>
              <a
                href="#servicios"
                className="hover:text-chrome-highlight transition-colors"
              >
                Productos a Medida
              </a>
            </li>
            <li>
              <a
                href="#servicios"
                className="hover:text-chrome-highlight transition-colors"
              >
                Ecommerce de Alto Nivel
              </a>
            </li>
          </ul>
        </div>

        {/* Agency column */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-chrome-highlight font-mono">
            Agencia
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href="#proceso"
                className="hover:text-chrome-highlight transition-colors"
              >
                Nuestro Proceso
              </a>
            </li>
            <li>
              <a
                href="#manifiesto"
                className="hover:text-chrome-highlight transition-colors"
              >
                Manifiesto
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="hover:text-chrome-highlight transition-colors"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </Container>
      {/* Bottom info bar */}
      <div className="relative z-10 border-t border-steel-grey/10 pt-12 -translate-y-4">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            &copy; {currentYear} Vorello Agency. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="#privacidad"
              className="hover:text-chrome-highlight transition-colors"
            >
              Privacidad
            </a>
            <a
              href="#terminos"
              className="hover:text-chrome-highlight transition-colors"
            >
              Términos
            </a>
          </div>
        </Container>
      </div>

      {/* Signature visual anchor - Centered, responsive (max-w-screen-2xl), and shifted further upward proportionally using native Tailwind translations, heights, and max-width */}
      <div ref={signatureRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-24 sm:h-40 md:h-56 z-0 translate-y-4 sm:translate-y-8 md:translate-y-16 lg:-translate-y-6 xl:-translate-y-8 select-none">
        <TextHoverEffect text="VORELLO" forceActive={isMobileTouch || isAtBottom} />
      </div>
    </footer>
  );
}
