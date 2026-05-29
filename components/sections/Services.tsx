"use client";

import React, { useEffect, useRef } from "react";
import { Globe, Cpu, ShoppingBag, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const SERVICES = [
  {
    num: "01",
    title: "Experiencias web de alto rendimiento",
    description:
      "Sitios web corporativos y landing pages modernas, orientadas a conversión, velocidad extrema, SEO técnico impecable y accesibilidad rigurosa.",
    icon: Globe,
    features: [
      "Sitios corporativos premium",
      "Landing pages de alto rendimiento",
      "Optimización de Core Web Vitals",
      "SEO técnico estructurado",
      "Accesibilidad WCAG 2.2 AA",
    ],
  },
  {
    num: "02",
    title: "Productos digitales a medida",
    description:
      "Web apps, plataformas internas, paneles de administración y portales privados integrados sólidamente a tu lógica de negocio.",
    icon: Cpu,
    features: [
      "Web apps robustas",
      "Dashboards avanzados",
      "Sistemas y portales privados",
      "Integraciones y automatización",
      "Arquitecturas escalables",
    ],
  },
  {
    num: "03",
    title: "Ecommerce de alto nivel",
    description:
      "Experiencias de comercio electrónico escalables, optimizadas para conversión y construidas sobre arquitecturas modernas.",
    icon: ShoppingBag,
    features: [
      "Ecommerce custom",
      "Arquitecturas headless",
      "Experiencia UX optimizada",
      "Integraciones con pasarelas",
      "Performance y SEO técnico",
    ],
  },
];

function ServiceCard({ service, idx }: { service: typeof SERVICES[0]; idx: number }) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = () => {
    if (cardRef.current && accentLineRef.current && iconRef.current) {
      gsap.to(accentLineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(iconRef.current, {
        borderColor: "rgba(123, 76, 255, 0.4)",
        color: "var(--electric-violet)",
        backgroundColor: "rgba(123, 76, 255, 0.05)",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(cardRef.current, {
        borderColor: "rgba(123, 76, 255, 0.35)",
        backgroundColor: "rgba(26, 29, 33, 0.55)",
        scale: 1.008,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const handleTouchEnd = () => {
    if (cardRef.current && accentLineRef.current && iconRef.current) {
      gsap.to(accentLineRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
      });
      gsap.to(iconRef.current, {
        borderColor: "rgba(42, 46, 51, 0.3)",
        color: "var(--chrome-highlight)",
        backgroundColor: "rgba(42, 46, 51, 0.25)",
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
      });
      gsap.to(cardRef.current, {
        borderColor: "rgba(42, 46, 51, 0.2)",
        backgroundColor: "rgba(26, 29, 33, 0.2)",
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="group relative flex flex-col p-6 md:p-8 rounded-xl border border-steel-grey/30 bg-graphite-metal/20 md:hover:bg-graphite-metal/40 md:hover:border-electric-violet/40 transition-all duration-300 backdrop-blur-sm h-full min-h-[480px] select-none"
    >
      {/* Accent line animation hover */}
      <div
        ref={accentLineRef}
        className="services-accent-line absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent scale-x-0 md:group-hover:scale-x-100 md:transition-transform md:duration-500 rounded-full"
      />

      {/* Main content wrapper (takes all available height) */}
      <div className="flex-1 flex flex-col">
        {/* Header: Icon & Num */}
        <div className="flex items-center justify-between mb-8">
          <div
            ref={iconRef}
            className="services-icon w-12 h-12 rounded-lg bg-steel-grey/25 border border-steel-grey/30 flex items-center justify-center text-chrome-highlight md:group-hover:text-electric-violet md:group-hover:border-electric-violet/20 transition-all duration-300"
          >
            <Icon className="w-6 h-6" />
          </div>
          <span className="services-num font-mono text-sm text-steel-grey md:group-hover:text-chrome-deep transition-colors">
            {"// "} {service.num}
          </span>
        </div>

        {/* Title */}
        <h3 className="services-title text-xl font-bold text-chrome-highlight mb-3 tracking-tight leading-snug md:group-hover:text-white transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="services-desc text-sm text-[#8F9BA8] leading-relaxed mb-6 md:group-hover:text-chrome-deep/90">
          {service.description}
        </p>

        {/* Features / Bullets (Separated with border-top) */}
        <ul className="flex flex-col gap-2.5 mb-8 border-t border-steel-grey/20 pt-6 mt-auto">
          {service.features.map((feature, fIdx) => (
            <li
              key={fIdx}
              className="services-list-item text-xs text-[#8F9BA8] flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-electric-violet/70" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA - Pushed strictly to the bottom of the card */}
      <div className="services-cta mt-auto">
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 text-xs font-mono text-chrome-highlight font-semibold md:group-hover:text-electric-violet transition-colors focus-visible:outline-none"
        >
          Explorar servicio{" "}
          <ArrowUpRight className="w-3.5 h-3.5 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;

      const cards = Array.from(cardsRef.current.children) as HTMLElement[];

      if (prefersReducedMotion) {
        // Fallback: show everything instantly
        gsap.set(".services-heading > *", { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotationX: 0 });
        cards.forEach((card) => {
          gsap.set(card.querySelectorAll(".services-icon, .services-num, .services-title, .services-desc, .services-list-item, .services-cta"), {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0
          });
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      // 1. Heading cascade entrance (Standardized to 0.6s duration)
      tl.fromTo(
        ".services-heading > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // 2. 3D Card rotation and scale entrance (Standardized to 0.6s duration)
      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          rotationX: 12,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 3. Staggered inner card content reveals
      cards.forEach((card) => {
        const icon = card.querySelector(".services-icon");
        const num = card.querySelector(".services-num");
        const title = card.querySelector(".services-title");
        const desc = card.querySelector(".services-desc");
        const listItems = card.querySelectorAll(".services-list-item");
        const cta = card.querySelector(".services-cta");
        const accentLine = card.querySelector(".services-accent-line");

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 52%",
            toggleActions: "play none none none",
          }
        });

        // Set initial states to avoid flashing
        gsap.set([icon, num, title, desc, listItems, cta], { opacity: 0 });

        cardTl.fromTo(
          [icon, num],
          { opacity: 0, scale: 0.75 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.2)",
          }
        );

        cardTl.fromTo(
          [title, desc],
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.3"
        );

        cardTl.fromTo(
          listItems,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.3"
        );

        cardTl.fromTo(
          cta,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        );

        // Mobile touch-triggered sweep effect via ScrollTrigger
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch && accentLine && icon) {
          cardTl.fromTo(
            accentLine,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "-=0.4"
          ).to(
            accentLine,
            {
              scaleX: 0,
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "+=0.2"
          );

          cardTl.fromTo(
            icon,
            { borderColor: "rgba(42, 46, 51, 0.3)", color: "var(--chrome-highlight)" },
            {
              borderColor: "rgba(123, 76, 255, 0.4)",
              color: "var(--electric-violet)",
              backgroundColor: "rgba(123, 76, 255, 0.05)",
              duration: 0.6,
              ease: "power2.out",
            },
            "-=1.6"
          ).to(
            icon,
            {
              borderColor: "rgba(42, 46, 51, 0.3)",
              color: "var(--chrome-highlight)",
              backgroundColor: "rgba(42, 46, 51, 0.25)",
              duration: 0.8,
              ease: "power2.inOut",
            },
            "+=0.2"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="py-20 md:py-32 bg-carbon-black relative z-20 overflow-hidden"
    >
      <Container>
        <SectionHeading
          eyebrow="// SERVICIOS"
          title="Soluciones digitales pensadas para escalar"
          description="Combinamos estrategia, diseño y desarrollo para crear experiencias digitales sólidas, visualmente cuidadas y orientadas a resultados."
          className="services-heading"
        />

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12"
          style={{ perspective: "1000px" }}
        >
          {SERVICES.map((service, idx) => (
            <ServiceCard service={service} idx={idx} key={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
