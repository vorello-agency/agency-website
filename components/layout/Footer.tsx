"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import Logo from "@/components/ui/Logo";
import { TextHoverEffect } from "@/components/aceternity/text-hover-effect";
import FooterAvailabilityBadge from "./_components/footer/FooterAvailabilityBadge";
import FooterLocationBadge from "./_components/footer/FooterLocationBadge";
import FooterNavCol from "./_components/footer/FooterNavCol";
import FooterContact from "./_components/footer/FooterContact";
import FooterBottom from "./_components/footer/FooterBottom";
import {
  BRAND_TAGLINE,
  getCurrentAvailability,
} from "@/data/brand";

/* ------------------------------------------------------------------ */
/*  Footer navigation links                                          */
/* ------------------------------------------------------------------ */

const SERVICE_LINKS = [
  { label: "Sitios web", href: "/services#sitios-web" },
  { label: "Landing pages", href: "/services#landing-pages" },
  { label: "Plataformas web", href: "/services#plataformas-web" },
  { label: "E‑commerce", href: "/services#ecommerce" },
  { label: "Automatizaciones", href: "/services#automatizaciones" },
  { label: "Integraciones", href: "/services#integraciones" },
];

const AGENCY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Servicios", href: "/#services" },
  { label: "Diferencial", href: "/#differential" },
  { label: "Proceso", href: "/#process" },
  { label: "Tecnologías", href: "/#technologies" },
  { label: "Afinidad", href: "/#fit" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const { quarter, year } = getCurrentAvailability();

  const footerRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobileTouch, setIsMobileTouch] = useState(false);
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Montevideo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      try {
        setLocalTime(new Intl.DateTimeFormat("es-UY", options).format(new Date()));
      } catch (err) {
        const now = new Date();
        const uyHour = (now.getUTCHours() - 3 + 24) % 24;
        const formattedHour = String(uyHour).padStart(2, "0");
        const formattedMinute = String(now.getUTCMinutes()).padStart(2, "0");
        setLocalTime(`${formattedHour}:${formattedMinute}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- Smooth scroll to anchor on same page ---------- */
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.includes("#") ? href.substring(href.indexOf("#")) : "";

    const targetPath = href.split("#")[0];
    const isTargetCurrentPage =
      targetPath === "" ||
      targetPath === "/" ||
      targetPath === window.location.pathname;

    const isCurrentPageHome = window.location.pathname === "/";

    if ((href === "/" || href === "") && isCurrentPageHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      return;
    }

    if (hash && isTargetCurrentPage) {
      e.preventDefault();
      window.history.pushState(null, "", hash);

      const target = document.querySelector(hash);
      if (target) {
        const rect = target.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        window.scrollTo({ top: top - 80, behavior: "smooth" });
      }
    }
  };

  /* ---------- Mobile detection ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setIsMobileTouch(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- GSAP reveal + TextHoverEffect trigger ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".footer-col", { opacity: 1, y: 0 });
        gsap.set(".footer-social-icon", { opacity: 1, scale: 1 });
        gsap.set(".footer-bottom", { opacity: 1, y: 0 });
        return;
      }

      /* -- Column stagger reveal -- */
      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      /* -- Social icons stagger -- */
      gsap.fromTo(
        ".footer-social-icon",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".footer-social-row",
            start: "top 95%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      /* -- Bottom bar reveal -- */
      gsap.fromTo(
        ".footer-bottom",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top 98%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      /* -- Signature TextHoverEffect glow trigger -- */
      ScrollTrigger.create({
        trigger: signatureRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          setTimeout(() => {
            setIsAtBottom(true);
            setTimeout(() => setIsAtBottom(false), 2000);
          }, 2000);
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-steel-grey/20 bg-carbon-black text-chrome-deep relative mt-auto overflow-hidden border-t pt-16 pb-16 sm:pb-24 md:pt-20 md:pb-32 xlg:pb-48"
    >
      {/* ── Main content grid ── */}
      <Container className="relative z-10 flex flex-col items-start justify-between gap-10 px-5 xs:px-10 pb-8 md:flex-row md:pb-20 xlg:px-16 xl:px-16! 2xl:max-w-[1500px]">
        {/* — Brand column — */}
        <div className="footer-col flex w-full max-w-md flex-col gap-5">
          <div className="flex flex-col gap-5 pl-1 xxs:pl-0">
            <Link
              href="/"
              aria-label="Inicio"
              className="group focus-visible:ring-electric-violet flex w-fit items-center gap-1 rounded focus-visible:ring-1 focus-visible:outline-none"
            >
              <Logo
                variant="both"
                size="lg"
                className="opacity-95 transition-opacity group-hover:opacity-100"
              />
            </Link>

            <p className="text-copy-muted max-w-md text-sm leading-relaxed text-balance">
              {BRAND_TAGLINE}
            </p>
          </div>

          {/* Badges Container */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <FooterAvailabilityBadge quarter={quarter} year={year} />
            <FooterLocationBadge localTime={localTime} />
          </div>
        </div>

        {/* — Links & Contact Wrapper — */}
        <div className="flex flex-col items-start gap-y-6 pl-2 xxs:pl-0 xxs:grid xxs:grid-cols-2 xxs:gap-x-12 xxs:gap-y-8 xxs:w-full sm:flex sm:flex-row sm:w-full sm:justify-between md:w-auto sm:items-stretch xlg:gap-x-16">
          <FooterNavCol
            title="Navegación"
            links={AGENCY_LINKS}
            onLinkClick={handleNavLinkClick}
          />
          <FooterNavCol
            title="Servicios"
            links={SERVICE_LINKS}
            onLinkClick={handleNavLinkClick}
          />
          <FooterContact />
        </div>
      </Container>

      {/* ── Gradient divider ── */}
      <div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 xlg:px-16 xl:px-20 2xl:px-8"
        aria-hidden="true"
      >
        <div className="via-steel-grey/40 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
      </div>

      {/* ── Bottom info bar ── */}
      <FooterBottom />

      {/* ── Signature visual anchor ── */}
      <div
        ref={signatureRef}
        className="absolute bottom-0 left-1/2 z-0 h-24 w-full max-w-screen-2xl -translate-x-1/2 translate-y-4 select-none sm:h-40 sm:translate-y-8 md:h-56 md:translate-y-16 lg:translate-y-6 xlg:translate-y-0 xl:-translate-y-8"
      >
        <TextHoverEffect text="VORELLO" forceActive={isMobileTouch || isAtBottom} />
      </div>
    </footer>
  );
}
