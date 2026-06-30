"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import Logo from "@/components/ui/Logo";
import { TextHoverEffect } from "@/components/aceternity/text-hover-effect";
import { FlagImage } from "react-international-phone";
import {
  CONTACT_EMAIL,
  CALENDAR_URL,
  SOCIAL_LINKS,
  BRAND_TAGLINE,
  getCurrentAvailability,
  getWhatsAppLink,
  WHATSAPP_MSG_GENERAL,
  WHATSAPP_HUMAN_NUMBER,
} from "@/data/brand";

/* ------------------------------------------------------------------ */
/*  Footer navigation links                                          */
/* ------------------------------------------------------------------ */

const SERVICE_LINKS = [
  { label: "Experiencias Web", href: "/#servicios" },
  { label: "Productos Digitales", href: "/#servicios" },
  { label: "Ecommerce", href: "/#servicios" },
  { label: "Automatizaciones", href: "/#servicios" },
];

const AGENCY_LINKS = [
  { label: "Manifiesto", href: "/#manifiesto" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Tecnología", href: "/#tecnologia" },
  { label: "Contacto", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Reusable link hover underline (CSS class)                         */
/* ------------------------------------------------------------------ */

const linkClass =
  "group/link relative inline-flex items-center text-sm text-[#828B9B] hover:text-chrome-highlight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded py-1";

const underlineSpan =
  "absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-electric-violet/60 transition-transform duration-300 group-hover/link:scale-x-100";

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const currentYear = new Date().getFullYear();
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
        const utcHour = now.getUTCHours();
        const uyHour = (utcHour - 3 + 24) % 24;
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
  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hash = href.includes("#") ? href.substring(href.indexOf("#")) : "";
    const isCurrentPageHome = window.location.pathname === "/";

    if (hash && isCurrentPageHome) {
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

  /* ---------- Back to top ---------- */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      /* -- If reduced-motion: show everything immediately -- */
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

      /* -- Signature TextHoverEffect glow trigger (replaces IntersectionObserver) -- */
      ScrollTrigger.create({
        trigger: signatureRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          // 2 s delay → 2 s glow → off
          setTimeout(() => {
            setIsAtBottom(true);
            setTimeout(() => setIsAtBottom(false), 2000);
          }, 2000);
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-steel-grey/20 bg-carbon-black text-chrome-deep pt-16 pb-16 sm:pb-24 md:pt-20 md:pb-32 lg:pb-48 mt-auto overflow-hidden"
    >
      {/* ── Main content grid ── */}
      <Container className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-10 pb-20 xl:px-16!">

        {/* — Brand column — */}
        <div className="footer-col flex flex-col gap-5 max-w-md w-full">
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

          <p className="text-sm leading-relaxed text-balance text-[#828B9B] max-w-md">
            {BRAND_TAGLINE}
          </p>

          {/* Badges Container */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {/* Combined Availability & Call-to-Action Badge */}
            <div className="inline-flex items-center gap-3 bg-graphite-metal/30 border border-steel-grey/30 rounded-lg p-1 pl-4 w-full select-none">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium text-chrome-highlight font-mono tracking-tight select-none whitespace-nowrap">
                  Disponible para proyectos • {quarter} {year}
                </span>
              </div>
              <Link href="/start" className="focus-visible:outline-none flex shrink-0 ml-auto">
                <Button
                  variant="primary-blue"
                  size="sm"
                  withArrow
                  className="!text-[11px] !py-1 !px-3 rounded-md hover:shadow-[0_0_12px_rgba(45,143,255,0.25)] hover:!scale-100 active:!scale-100 transition-all duration-300"
                >
                  Iniciar proyecto
                </Button>
              </Link>
            </div>

            {/* Location & Timezone Badge */}
            <div className="flex gap-3 bg-graphite-metal/30 border border-steel-grey/30 rounded-lg px-3 py-2 w-full select-none">
              <span className="relative flex h-2 w-2 shrink-0 mt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue" />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-medium text-chrome-highlight font-mono tracking-tight whitespace-nowrap flex items-center gap-2">
                  <span className="whitespace-nowrap">Desde Montevideo, Uruguay</span>
                  <FlagImage
                    iso2="uy"
                    style={{ width: "20px", height: "15px" }}
                    className="shrink-0 rounded-[2px] select-none"
                  />
                </span>
                <span className="text-[10px] text-[#828B9B]/60 font-mono tracking-tight mt-0.5 whitespace-nowrap">
                  Hub tecnológico de exportación en América Latina
                </span>
              </div>
              <span className="ml-auto text-[11px] font-medium text-chrome-highlight font-mono tracking-tight whitespace-nowrap my-auto" title="Hora local en Montevideo, Uruguay">
                <span className="text-chrome-highlight/90 font-semibold">{localTime || "--:--"}</span>{" "}
                <span className="text-[10px] text-[#828B9B]/60 font-sans">(UTC-3)</span>
              </span>
            </div>
          </div>
        </div>
        {/* — Links & Contact Wrapper — */}
        <div className="flex flex-col sm:flex-row items-start gap-y-10 gap-x-12 lg:gap-x-16">

          {/* — Services column — */}
          <div className="footer-col flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-chrome-highlight font-mono">
              Servicios
            </h3>
            <ul className="flex flex-col gap-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={linkClass}
                  >
                    <span>{link.label}</span>
                    <span className={underlineSpan} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* — Agency column — */}
          <div className="footer-col flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-chrome-highlight font-mono">
              Agencia
            </h3>
            <ul className="flex flex-col gap-2">
              {AGENCY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) =>
                      link.href.includes("#")
                        ? handleNavLinkClick(e, link.href)
                        : undefined
                    }
                    className={linkClass}
                  >
                    <span>{link.label}</span>
                    <span className={underlineSpan} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* — Contact & Social column — */}
          <div className="footer-col flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-chrome-highlight font-mono">
                Contacto
              </h3>
              <div className="flex flex-col gap-3 text-sm">
                {/* Email */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group/link relative inline-flex items-center gap-2 text-[#828B9B] hover:text-chrome-highlight transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded"
                >
                  <svg className="w-4 h-4 text-chrome-deep/60 group-hover/link:text-chrome-highlight transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{CONTACT_EMAIL}</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={getWhatsAppLink(WHATSAPP_MSG_GENERAL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative inline-flex items-center gap-2 text-[#828B9B] hover:text-chrome-highlight transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded"
                >
                  <svg className="w-4 h-4 text-chrome-deep/60 group-hover/link:text-chrome-highlight transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{WHATSAPP_HUMAN_NUMBER}</span>
                </a>

                {/* Calendar */}
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative inline-flex items-center gap-2 text-[#828B9B] hover:text-chrome-highlight transition-colors w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded"
                >
                  <svg className="w-4 h-4 text-chrome-deep/60 group-hover/link:text-chrome-highlight transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Agendar una llamada</span>
                </a>
              </div>
            </div>

            <hr className="border-steel-grey/20" />

            {/* Social Profiles */}
            <div className="footer-social-row flex items-center gap-2">
              <SocialIcon href={SOCIAL_LINKS.linkedin} label="LinkedIn de Vorello">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.github} label="GitHub de Vorello">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.behance} label="Behance de Vorello">
                <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
              </SocialIcon>
              <SocialIcon href={SOCIAL_LINKS.instagram} label="Instagram de Vorello">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Gradient divider ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 xl:px-20 2xl:px-8" aria-hidden="true">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-steel-grey/40 to-transparent" />
      </div>

      {/* ── Bottom info bar ── */}
      <div className="footer-bottom relative z-10 pt-8">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#828B9B]">
            &copy; {currentYear} Vorello Agency.
            <br />
            Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy-policy"
              className="text-[#828B9B] hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
            >
              Privacidad
            </Link>
            <span className="text-steel-grey/75 select-none" aria-hidden="true">·</span>
            <Link
              href="/terms-of-service"
              className="text-[#828B9B] hover:text-chrome-highlight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
            >
              Términos
            </Link>
            <span className="text-steel-grey/75 select-none" aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="group/top inline-flex items-center gap-1 text-[#828B9B] hover:text-chrome-highlight transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet rounded px-1 -mx-1"
              aria-label="Volver arriba"
            >
              <span className="hidden sm:inline">Volver arriba</span>
              <ArrowUp className="h-3 w-3 transition-transform group-hover/top:-translate-y-1" />
            </button>
          </div>
        </Container>
      </div>

      {/* ── Signature visual anchor ── */}
      <div
        ref={signatureRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-24 sm:h-40 md:h-56 z-0 translate-y-4 sm:translate-y-8 md:translate-y-16 lg:-translate-y-6 xl:-translate-y-8 select-none"
      >
        <TextHoverEffect text="VORELLO" forceActive={isMobileTouch || isAtBottom} />
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Social icon button — extracted for readability                    */
/* ------------------------------------------------------------------ */

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="footer-social-icon text-[#828B9B] hover:text-chrome-highlight hover:scale-110 transition-all duration-200 p-2 rounded-lg border border-steel-grey/10 hover:border-steel-grey/30 bg-graphite-metal/20 hover:bg-graphite-metal/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
