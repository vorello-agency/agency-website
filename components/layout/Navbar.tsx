"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, GitMerge, Fingerprint, Send, Boxes } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Servicios",
    href: "#servicios",
    icon: Boxes,
    hoverClass: "group-hover/nav:scale-110 group-hover/nav:text-electric-violet"
  },
  {
    label: "Proceso",
    href: "#proceso",
    icon: GitMerge,
    hoverClass: "group-hover/nav:rotate-12 group-hover/nav:scale-110 group-hover/nav:text-neon-blue"
  },
  {
    label: "Manifiesto",
    href: "#manifiesto",
    icon: Fingerprint,
    hoverClass: "group-hover/nav:scale-110 group-hover/nav:text-electric-violet"
  },
  {
    label: "Contacto",
    href: "#contacto",
    icon: Send,
    hoverClass: "group-hover/nav:translate-x-0.5 group-hover/nav:-translate-y-0.5 group-hover/nav:text-neon-blue"
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

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

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      // Update hash in URL smoothly
      window.history.pushState(null, "", href);

      const target = document.querySelector(href);
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-200 w-full",
        shouldAnimate && "transition-all duration-300",
        isScrolled
          ? "border-b border-steel-grey/30 bg-carbon-black/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between",
          shouldAnimate && "transition-all duration-300",
          isScrolled ? "h-20" : "h-24"
        )}
      >
        {/* Brand logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 group focus-visible:outline-none",
            shouldAnimate && "transition-all duration-300",
            isScrolled && "md:ml-8"
          )}
        >
          <Logo
            variant="logotipo"
            size="xl"
            className="opacity-95 transition-opacity group-hover:opacity-100"
          />
        </Link>

        {/* Desktop sliding highlight navigation */}
        <nav
          ref={navContainerRef}
          className="relative hidden md:flex items-center gap-1 py-1.5 px-2 rounded-full border border-steel-grey/30 bg-graphite-metal/40"
          onMouseLeave={handleMouseLeave}
        >
          {/* Absolute moving highlight pill */}
          <div
            ref={pillRef}
            className="absolute top-1/2 -translate-y-1/2 h-[30px] bg-white/[0.04] border border-white/[0.02] rounded-md pointer-events-none opacity-0 scale-95 z-0"
            style={{ left: 0, width: 0 }}
          />

          {/* Navigation Links */}
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative z-10 px-3.5 py-1.5 text-sm font-medium text-[#828B9B] hover:text-chrome-highlight transition-colors duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-electric-violet flex items-center gap-1.5 group/nav"
                onClick={(e) => handleNavLinkClick(e, item.href)}
                onMouseEnter={handleMouseEnter}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
              >
                <Icon className={cn("h-3.5 w-3.5 text-[#828B9B]/60 transition-all duration-300 ease-out", item.hoverClass)} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Action */}
        <div className={cn(
          "hidden md:flex items-center",
          shouldAnimate && "transition-all duration-300",
          isScrolled && "md:mr-8"
        )}>
          <Button
            variant="secondary"
            size="sm"
            className="group relative bg-graphite-metal border border-steel-grey/60 text-chrome-highlight hover:border-electric-violet/60 hover:bg-electric-violet/[0.04] hover:shadow-[0_0_15px_rgba(123,76,255,0.2)] flex items-center justify-center transition-all duration-300"
          >
            <span>Iniciar proyecto</span>
            <ArrowRight className="h-3.5 w-0 opacity-0 -translate-x-2 group-hover:w-3.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-1.5 transition-all duration-300 ease-out" />
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-chrome-deep hover:text-chrome-highlight focus-visible:outline-none cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </Container>

      {/* Mobile menu navigation drawer */}
      {mobileMenuOpen && (
        <div
          className={cn(
            "md:hidden absolute left-0 w-full bg-carbon-black border-b border-steel-grey/30 px-6 py-8 flex flex-col gap-6 shadow-2xl z-40 transition-all duration-300",
            isScrolled ? "top-20" : "top-28"
          )}
        >
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-chrome-deep hover:text-chrome-highlight transition-colors py-2 border-b border-steel-grey/10 flex items-center gap-2"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavLinkClick(e, item.href);
                  }}
                >
                  <Icon className="h-4 w-4 text-chrome-deep/60" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <Button
            variant="primary-blue"
            size="md"
            className="w-full justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Iniciar Proyecto
          </Button>
        </div>
      )}
    </header>
  );
}
