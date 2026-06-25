"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Logo from "@/components/ui/Logo";
import { TextHoverEffect } from "@/components/aceternity/text-hover-effect";
import { CONTACT_EMAIL } from "@/data/brand";

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

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hash = href.includes("#") ? href.substring(href.indexOf("#")) : "";
    const isCurrentPageHome = window.location.pathname === "/";

    if (hash && isCurrentPageHome) {
      e.preventDefault();

      // Update hash in URL smoothly
      window.history.pushState(null, "", hash);

      const target = document.querySelector(hash);
      if (target) {
        const rect = target.getBoundingClientRect();
        const top = rect.top + window.scrollY;

        // Offset for the fixed header
        window.scrollTo({
          top: top - 80,
          behavior: "smooth",
        });
      }
    }
  };


  return (
    <footer className="relative border-t border-steel-grey/30 bg-carbon-black text-chrome-deep pt-16 pb-16 sm:pb-24 md:pt-20 md:pb-32 lg:pb-48 mt-auto overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-electric-violet/[0.03] blur-[130px]" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[200px] rounded-full bg-neon-blue/[0.015] blur-[100px]" />
      </div>

      <Container className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-20">
        {/* Brand details */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link
            href="/"
            aria-label="Inicio"
            className="flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded w-fit"
          >
            <Logo
              variant="both"
              size="lg"
              className="opacity-95 transition-opacity group-hover:opacity-100"
            />
          </Link>
          <p className="text-sm leading-relaxed text-balance text-[#828B9B] max-w-sm">
            Diseñamos y desarrollamos productos digitales bien pensados,
            visualmente cuidados y técnicamente sólidos.
          </p>
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 bg-graphite-metal/50 border border-steel-grey/30 rounded-full px-3 py-1.5 w-fit whitespace-nowrap h-fit self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-chrome-highlight font-mono tracking-tight select-none">
              Disponible para proyectos — Q3 2026
            </span>
          </div>
        </div>

        {/* Services column */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-chrome-highlight font-mono">
            Servicios
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link
                href="/#servicios"
                onClick={(e) => handleNavLinkClick(e, "/#servicios")}
                className="group flex items-center gap-1 hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
              >
                <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto text-electric-violet transition-all duration-200 font-mono text-xs overflow-hidden">{"→ "}</span>
                <span className="whitespace-nowrap">Experiencias Web</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#servicios"
                onClick={(e) => handleNavLinkClick(e, "/#servicios")}
                className="group flex items-center gap-1 hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
              >
                <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto text-electric-violet transition-all duration-200 font-mono text-xs overflow-hidden">{"→ "}</span>
                <span className="whitespace-nowrap">Productos Digitales</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#servicios"
                onClick={(e) => handleNavLinkClick(e, "/#servicios")}
                className="group flex items-center gap-1 hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
              >
                <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto text-electric-violet transition-all duration-200 font-mono text-xs overflow-hidden">{"→ "}</span>
                <span className="whitespace-nowrap">E-commerce Premium</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Agency column */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-chrome-highlight font-mono">
            Agencia
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link
                href="/#proceso"
                onClick={(e) => handleNavLinkClick(e, "/#proceso")}
                className="group flex items-center gap-1 hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
              >
                <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto text-electric-violet transition-all duration-200 font-mono text-xs overflow-hidden">{"→ "}</span>
                <span className="whitespace-nowrap">Nuestro Proceso</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#manifiesto"
                onClick={(e) => handleNavLinkClick(e, "/#manifiesto")}
                className="group flex items-center gap-1 hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
              >
                <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto text-electric-violet transition-all duration-200 font-mono text-xs overflow-hidden">{"→ "}</span>
                <span>Manifiesto</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#contacto"
                onClick={(e) => handleNavLinkClick(e, "/#contacto")}
                className="group flex items-center gap-1 hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
              >
                <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto text-electric-violet transition-all duration-200 font-mono text-xs overflow-hidden">{"→ "}</span>
                <span>Contacto</span>
              </Link>
            </li>


          </ul>
        </div>

        {/* Contact & Location Column */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-chrome-highlight font-mono">
              Contacto
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-1.5 text-[#828B9B] hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded w-fit -mx-1 px-1"
              >
                <svg className="w-3.5 h-3.5 text-chrome-deep/60 group-hover:text-chrome-highlight transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{CONTACT_EMAIL}</span>
              </a>
              <div className="text-xs text-chrome-deep flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-chrome-deep/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Montevideo, UY / UTC-3</span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-2.5 mt-0.5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Vorello"
              className="text-[#828B9B] hover:text-chrome-highlight hover:scale-105 transition-all p-1.5 rounded-lg border border-steel-grey/10 hover:border-steel-grey/30 bg-graphite-metal/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Vorello"
              className="text-[#828B9B] hover:text-chrome-highlight hover:scale-105 transition-all p-1.5 rounded-lg border border-steel-grey/10 hover:border-steel-grey/30 bg-graphite-metal/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance de Vorello"
              className="text-[#828B9B] hover:text-chrome-highlight hover:scale-105 transition-all p-1.5 rounded-lg border border-steel-grey/10 hover:border-steel-grey/30 bg-graphite-metal/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Vorello"
              className="text-[#828B9B] hover:text-chrome-highlight hover:scale-105 transition-all p-1.5 rounded-lg border border-steel-grey/10 hover:border-steel-grey/30 bg-graphite-metal/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>

      {/* Bottom info bar */}
      <div className="relative z-10 border-t border-steel-grey/10 pt-10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#828B9B]">
            &copy; {currentYear} Vorello Agency. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="#privacidad"
              className="hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
            >
              Privacidad
            </a>
            <a
              href="#terminos"
              className="hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
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
