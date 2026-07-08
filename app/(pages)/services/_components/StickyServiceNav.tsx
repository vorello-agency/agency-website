"use client";

import React, { useEffect, useState, useRef } from "react";
import { servicesDetail } from "@/data/services";
import Container from "@/components/layout/Container";
import { ScrollTrigger } from "@/lib/gsap/register";
import { cn } from "@/lib/utils";

export default function StickyServiceNav() {
  const [activeSection, setActiveSection] = useState(servicesDetail[0].id);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const triggers = servicesDetail.map((service) => {
      return ScrollTrigger.create({
        trigger: `#${service.id}`,
        // Triggers when the top of the section is 40% from the top of the screen
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(service.id);

            // Auto-scroll the nav chips horizontally to keep active chip visible
            const activeLink = navContainerRef.current?.querySelector(
              `[data-link="${service.id}"]`
            ) as HTMLElement | null;

            if (activeLink && navContainerRef.current) {
              const container = navContainerRef.current;
              const containerScrollLeft = container.scrollLeft;
              const containerWidth = container.clientWidth;
              const linkOffsetLeft = activeLink.offsetLeft;
              const linkWidth = activeLink.clientWidth;

              // Check if out of bounds (left or right)
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
          }
        },
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset based on Navbar (96px/80px) + StickyServiceNav (56px)
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 136 : 160;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-carbon-black/90 border-steel-grey/30 sticky top-20 z-30 w-full border-b backdrop-blur-md md:top-24">
      <Container>
        <div
          ref={navContainerRef}
          className="scrollbar-hide flex items-center gap-3 overflow-x-auto py-3 whitespace-nowrap"
        >
          {servicesDetail.map((service) => {
            const isActive = activeSection === service.id;
            return (
              <a
                key={service.id}
                href={`#${service.id}`}
                data-link={service.id}
                onClick={(e) => handleScrollTo(e, service.id)}
                className={cn(
                  "focus-visible:ring-electric-violet/50 rounded-full border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 focus-visible:ring-1 focus-visible:outline-none",
                  isActive
                    ? "bg-electric-violet/10 border-electric-violet text-electric-violet"
                    : "bg-graphite-metal/50 border-steel-grey/30 text-chrome-deep hover:border-chrome-deep/50 hover:text-chrome-highlight"
                )}
              >
                {service.title}
              </a>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
