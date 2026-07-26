"use client";

import React, { useEffect, useState, useRef } from "react";
import { servicesDetail } from "@/data/services";
import Container from "@/components/layout/Container";
import { ScrollTrigger } from "@/lib/gsap/register";
import { cn } from "@/lib/utils";
import Scales from "@/components/aceternity/scales";

const SHORT_TITLES: Record<string, string> = {
  "websites": "Sitios Web",
  "landing-pages": "Landing Pages",
  "ecommerce": "Ecommerce",
  "platforms": "Plataformas",
  "automation": "Automatización",
  "support": "Evolución",
};

const SERVICE_ITEMS = servicesDetail.map((s) => ({
  id: s.id,
  label: SHORT_TITLES[s.id] || s.title,
}));

export default function StickyServiceNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    const triggers = SERVICE_ITEMS.map((item) => {
      return ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(item.id);

            const activeLink = navContainerRef.current?.querySelector(
              `[data-link="${item.id}"]`
            ) as HTMLElement | null;

            if (activeLink && navContainerRef.current) {
              const container = navContainerRef.current;
              const containerScrollLeft = container.scrollLeft;
              const containerWidth = container.clientWidth;
              const linkOffsetLeft = activeLink.offsetLeft;
              const linkWidth = activeLink.clientWidth;

              if (linkOffsetLeft < containerScrollLeft) {
                container.scrollTo({
                  left: linkOffsetLeft - 16,
                  behavior: "smooth",
                });
              } else if (linkOffsetLeft + linkWidth > containerScrollLeft + containerWidth) {
                container.scrollTo({
                  left: linkOffsetLeft - containerWidth + linkWidth + 16,
                  behavior: "smooth",
                });
              }
            }
          } else {
            // Check if any service section is currently active
            const anyActive = SERVICE_ITEMS.some((i) => {
              const el = document.getElementById(i.id);
              if (!el) return false;
              const rect = el.getBoundingClientRect();
              const vh = window.innerHeight;
              return rect.top <= vh * 0.45 && rect.bottom >= vh * 0.45;
            });
            if (!anyActive) {
              setActiveSection("");
            }
          }
        },
      });
    });

    return () => {
      clearTimeout(refreshTimer);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const isMobile = window.innerWidth < 768;
          const offset = isMobile ? 136 : 160;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 136 : 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="bg-carbon-black/90 border-steel-grey/30 sticky top-20 z-30 w-full border-y backdrop-blur-md">
      <div className="absolute inset-0 opacity-25 z-0">
        <Scales
          orientation="horizontal"
          size={8}
          color="rgba(255, 255, 255, 0.09)"
          className="[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        />
      </div>
      <Container className="relative z-10">
        <div className="flex items-center justify-start py-3">
          <div
            ref={navContainerRef}
            className="scrollbar-hide flex items-center gap-3 overflow-x-auto whitespace-nowrap"
          >
            {SERVICE_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-link={item.id}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className={cn(
                    "focus-visible:ring-electric-violet/50 rounded-full border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 focus-visible:ring-1 focus-visible:outline-none",
                    isActive
                      ? "bg-electric-violet/15 border-electric-violet text-electric-violet"
                      : "bg-carbon-black border-steel-grey/50 text-chrome-deep hover:border-chrome-deep/75 hover:text-chrome-highlight"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
