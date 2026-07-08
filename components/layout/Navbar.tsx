"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, GitMerge, Fingerprint, Send, Boxes } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import {
  animateNavbarIconEnter,
  animateNavbarIconLeave,
  animateNavbarCtaArrowEnter,
  animateNavbarCtaArrowLeave,
} from "@/lib/gsap/animations";

import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Servicios",
    href: "/#servicios",
    icon: Boxes,
  },
  {
    label: "Proceso",
    href: "/#proceso",
    icon: GitMerge,
  },
  {
    label: "Manifiesto",
    href: "/#manifiesto",
    icon: Fingerprint,
  },
  {
    label: "Contacto",
    href: "/contact",
    icon: Send,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const isOnboardingPage = pathname === "/start";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const mobileBackdropRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileBackdropRef.current) return;

    const links = mobileLinksRef.current?.querySelectorAll(".mobile-nav-link");
    const button = mobileMenuRef.current?.querySelector(".mobile-nav-button");
    const backdrop = mobileBackdropRef.current;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Initialize starting state silently without animating on mount
      gsap.set(mobileMenuRef.current, { autoAlpha: 0, y: -12 });
      gsap.set(backdrop, { autoAlpha: 0 });
      if (links) gsap.set(links, { autoAlpha: 0, y: 8 });
      if (button) gsap.set(button, { autoAlpha: 0, y: 8 });
      return;
    }

    if (mobileMenuOpen) {
      // Open animation
      gsap.killTweensOf([mobileMenuRef.current, backdrop, links, button]);

      // Explicitly reset initial states to guarantee the animation runs every time
      gsap.set(mobileMenuRef.current, { autoAlpha: 0, y: -12 });
      gsap.set(backdrop, { autoAlpha: 0 });
      if (links) gsap.set(links, { autoAlpha: 0, y: 8 });
      if (button) gsap.set(button, { autoAlpha: 0, y: 8 });

      // Fade in the blurred backdrop overlay
      gsap.to(backdrop, {
        autoAlpha: 1,
        duration: 0.35,
        ease: "power2.out",
      });

      // Animate background drawer (snappy and precise)
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Stagger links vertically (sliding up and fading in elegantly)
      if (links && links.length > 0) {
        gsap.to(links, {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.05,
        });
      }

      // Animate button
      if (button) {
        gsap.to(button, {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          delay: 0.1 + (links ? links.length * 0.04 : 0),
        });
      }
    } else {
      // Close animation
      gsap.killTweensOf([mobileMenuRef.current, backdrop, links, button]);

      // Smoothly fade out everything together snappily
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 0,
        y: -12,
        duration: 0.2,
        ease: "power2.inOut",
      });

      gsap.to(backdrop, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });

      // Also fade out links quickly so they don't linger
      if (links) {
        gsap.to(links, {
          autoAlpha: 0,
          y: -4,
          duration: 0.15,
          ease: "power2.in",
        });
      }
      if (button) {
        gsap.to(button, {
          autoAlpha: 0,
          y: -4,
          duration: 0.15,
          ease: "power2.in",
        });
      }
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll(); // Apply initial scroll state on mount (catches reload/refresh scrolled state)

    // Enable transitions only after initial scroll layout has settled
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Wait for page layout and fonts to stabilize on mount
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          const rect = target.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          window.scrollTo({
            top: top - 80,
            behavior: "smooth",
          });
        }
      }, 200);
    }
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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

  // Dynamic GSAP Hover/Focus Sliding Animation
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>
  ) => {
    const link = e.currentTarget;
    const nav = navContainerRef.current;
    if (!pillRef.current || !nav) return;

    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    // Calculate left position and width relative to the parent nav block
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;

    gsap.to(pillRef.current, {
      left,
      width,
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!pillRef.current) return;
    gsap.to(pillRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.18,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  // High-Fidelity Physics Animations for Navbar Icons
  const handleItemMouseEnter = (
    label: string,
    e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>
  ) => {
    // 1. Disparar el fondo (pill)
    handleMouseEnter(e);

    // 2. Delegar la animación vectorial al módulo central de GSAP
    const svg = e.currentTarget.querySelector(".nav-icon-svg") as SVGElement | null;
    if (svg) {
      animateNavbarIconEnter(label, svg);
    }
  };

  const handleItemMouseLeave = (
    label: string,
    e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>
  ) => {
    // 1. Limpiar el fondo
    handleMouseLeave();

    // 2. Delegar el restablecimiento vectorial al módulo central de GSAP
    const svg = e.currentTarget.querySelector(".nav-icon-svg") as SVGElement | null;
    if (svg) {
      animateNavbarIconLeave(label, svg);
    }
  };

  const handleCtaMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>
  ) => {
    const arrow = e.currentTarget.querySelector(".nav-cta-arrow") as HTMLElement | null;
    if (arrow) {
      animateNavbarCtaArrowEnter(arrow);
    }
  };

  const handleCtaMouseLeave = (
    e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>
  ) => {
    const arrow = e.currentTarget.querySelector(".nav-cta-arrow") as HTMLElement | null;
    if (arrow) {
      animateNavbarCtaArrowLeave(arrow);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-[100] w-full",
        shouldAnimate && "transition-all duration-300",
        mobileMenuOpen
          ? "border-b border-steel-grey/30 bg-carbon-black"
          : isScrolled
            ? "border-b border-steel-grey/30 bg-carbon-black/80 backdrop-blur-md"
            : "border-b-0 bg-transparent"
      )}
    >
      <Container
        spacing="compact"
        className={cn(
          "relative z-50 flex items-center justify-between",
          shouldAnimate && "transition-all duration-300",
          isScrolled ? "h-20" : "h-24"
        )}
      >
        {/* Brand logo */}
        <Link
          href="/"
          aria-label="Vorello - Ir al inicio"
          className={cn(
            "group relative flex items-center gap-2 focus-visible:outline-none",
            shouldAnimate && "transition-all duration-300",
            isScrolled && "md:ml-8"
          )}
        >
          {/* Animated large, soft atmospheric white glow behind the logo when menu is open */}
          <div
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-visible transition-all duration-1000 ease-out",
              mobileMenuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
            )}
            style={{ width: "350px", height: "350px" }}
          >
            {/* Outer ambient aura: wide, extremely soft, premium low-opacity dispersion */}
            <div className="absolute h-80 w-80 rounded-full bg-white/[0.03] blur-[64px]" />
            {/* Mid ambient aura: smooth transition blur */}
            <div className="absolute h-56 w-56 rounded-full bg-white/[0.06] blur-[40px]" />
            {/* Core glow: soft white center to gently outline the logo area */}
            <div className="absolute h-20 w-36 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-white/[0.09] blur-[24px]" />
          </div>

          {/* Mobile logo: both isotype and logotipo */}
          <span className="relative z-10 inline-flex md:hidden">
            <Logo
              variant="both"
              size="xl"
              className="opacity-95 transition-opacity group-hover:opacity-100"
            />
          </span>
          {/* Desktop logo: logotipo only */}
          <span className="relative z-10 hidden md:inline-flex">
            <Logo
              variant="logotipo"
              size="xl"
              className="opacity-95 transition-opacity group-hover:opacity-100"
            />
          </span>
        </Link>

        {/* Desktop sliding highlight navigation */}
        {!isOnboardingPage && (
          <nav
            ref={navContainerRef}
            className="border-steel-grey/30 bg-graphite-metal relative hidden items-center gap-1 rounded-full border px-2 py-1.5 md:flex"
            onMouseLeave={handleMouseLeave}
          >
            {/* Absolute moving highlight pill */}
            <div
              ref={pillRef}
              className="pointer-events-none absolute top-1/2 z-0 h-[30px] -translate-y-1/2 scale-95 rounded-md border border-white/[0.02] bg-white/[0.04] opacity-0"
              style={{ left: 0, width: 0 }}
            />

            {/* Navigation Links */}
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-copy-muted hover:text-chrome-highlight focus-visible:ring-electric-violet group/nav relative z-10 flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:ring-1 focus-visible:outline-none"
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                  onMouseEnter={(e) => handleItemMouseEnter(item.label, e)}
                  onFocus={(e) => handleItemMouseEnter(item.label, e)}
                  onMouseLeave={(e) => handleItemMouseLeave(item.label, e)}
                  onBlur={(e) => handleItemMouseLeave(item.label, e)}
                >
                  <Icon className="text-copy-muted/60 nav-icon-svg h-3.5 w-3.5 overflow-visible" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* CTA Action / Volver al inicio */}
        {isOnboardingPage ? (
          <div className="hidden items-center md:flex">
            <Link
              href="/"
              className="group border-steel-grey/30 bg-graphite-metal/30 hover:border-steel-grey/60 text-chrome-highlight focus-visible:ring-electric-violet flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all focus-visible:ring-1 focus-visible:outline-none"
            >
              <ArrowRight className="h-4 w-4 rotate-180 opacity-60 transition-transform group-hover:-translate-x-1" />
              <span>Volver al inicio</span>
            </Link>
          </div>
        ) : (
          <div
            className={cn(
              "hidden items-center md:flex",
              shouldAnimate && "transition-all duration-300",
              isScrolled && "md:mr-8"
            )}
          >
            <Link
              href="/start"
              className="group border-steel-grey/30 bg-graphite-metal text-copy-muted hover:text-chrome-highlight hover:border-steel-grey/50 focus-visible:ring-electric-violet relative flex items-center justify-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:ring-1 focus-visible:outline-none"
              onMouseEnter={handleCtaMouseEnter}
              onMouseLeave={handleCtaMouseLeave}
              onFocus={handleCtaMouseEnter}
              onBlur={handleCtaMouseLeave}
            >
              <span>Iniciar proyecto</span>
              <ArrowRight className="nav-cta-arrow group-hover:text-electric-violet ml-1.5 h-3.5 w-3.5 overflow-visible opacity-60 transition-colors duration-300" />
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        {isOnboardingPage ? (
          <Link
            href="/"
            className="border-steel-grey/30 bg-graphite-metal/30 text-chrome-highlight flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium focus-visible:outline-none md:hidden"
          >
            <X className="h-3.5 w-3.5" />
            <span>Salir</span>
          </Link>
        ) : (
          <button
            className="text-chrome-deep hover:text-chrome-highlight cursor-pointer p-2 focus-visible:outline-none md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}
      </Container>

      {/* Mobile menu backdrop overlay */}
      <div
        ref={mobileBackdropRef}
        className={cn(
          "bg-carbon-black/60 fixed inset-0 z-30 backdrop-blur-[4px] transition-[opacity] duration-300 md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
        style={{ opacity: 0, visibility: "hidden" }}
      />

      {/* Mobile menu navigation drawer */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "bg-carbon-black border-steel-grey/30 absolute left-0 z-40 flex w-full flex-col gap-6 border-b px-6 py-8 shadow-2xl transition-[top] duration-300 md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
          isScrolled ? "top-20" : "top-28"
        )}
        style={{
          opacity: 0,
          visibility: "hidden",
          transform: "translateY(-12px)",
        }}
      >
        <div ref={mobileLinksRef} className="divide-steel-grey/10 flex flex-col divide-y">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="mobile-nav-link text-chrome-deep hover:text-chrome-highlight active:text-chrome-highlight flex items-center gap-2 py-4 text-base font-medium transition-all active:translate-x-1 active:scale-[0.98]"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavLinkClick(e, item.href);
                }}
              >
                <Icon className="text-chrome-deep/60 h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="mobile-nav-button flex flex-col">
          <div className="bg-electric-violet/25 mb-3 h-px w-full" />
          <Link
            href="/start"
            className="mobile-nav-link text-neon-blue hover:text-neon-blue/80 active:text-neon-blue flex items-center gap-2 py-2 text-base font-medium transition-all active:translate-x-1 active:scale-[0.98]"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          >
            <ArrowRight className="text-neon-blue/80 h-4 w-4" />
            <span>Iniciar proyecto</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
