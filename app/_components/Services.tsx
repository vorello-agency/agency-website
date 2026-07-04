"use client";

import React, { useEffect, useRef } from "react";
import { Globe, Cpu, ShoppingBag, ArrowUpRight, RefreshCw, Workflow } from "lucide-react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    title: "Experiencias web de alto rendimiento",
    description:
      "Sitios corporativos y landing pages con estándares altos de performance, accesibilidad y SEO técnico.",
    icon: Globe,
    features: [
      "Sitios corporativos premium",
      "Landing pages de alto rendimiento",
      "Optimización de Core Web Vitals",
      "SEO técnico estructurado",
      "Accesibilidad (WCAG AA)",
    ],
  },
  {
    num: "02",
    title: "Productos digitales a medida",
    description:
      "Web apps, portales, sistemas internos y flujos automatizados diseñados para operar, escalar e integrarse con tu stack existente.",
    icon: Cpu,
    features: [
      "Web apps y dashboards avanzados",
      "Sistemas internos y portales privados",
      "Automatización de procesos operativos",
      "Integraciones entre plataformas y APIs",
      "Arquitecturas escalables",
    ],
  },
  {
    num: "03",
    title: "Ecommerce de alto nivel",
    description:
      "Comercio electrónico con arquitectura headless, UX optimizada y rendimiento técnico cuidado.",
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

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
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
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
  };

  const handleMouseEnter = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const svg = card.querySelector(`.services-svg-${service.num}`);
    if (!svg) return;

    if (service.num === "01") {
      const circle = svg.querySelector("circle");
      const paths = svg.querySelectorAll("path");
      if (circle) {
        gsap.to(circle, {
          scale: 1.12,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
      }
      if (paths && paths.length > 0) {
        gsap.to(paths, {
          stroke: "currentColor",
          scaleX: 1.15,
          transformOrigin: "center center",
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    } else if (service.num === "02") {
      const rect = svg.querySelector("rect");
      const paths = svg.querySelectorAll("path, line");
      if (rect) {
        gsap.to(rect, {
          scale: 1.25,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "back.out(2)",
          overwrite: "auto",
        });
      }
      if (paths && paths.length > 0) {
        gsap.to(paths, {
          stroke: "var(--electric-violet)",
          stagger: 0.02,
          duration: 0.25,
          ease: "power1.out",
          overwrite: "auto",
        });
      }
    } else if (service.num === "03") {
      const tl = gsap.timeline();
      tl.to(svg, { rotation: 15, transformOrigin: "top center", duration: 0.12, ease: "power1.out" })
        .to(svg, { rotation: -12, duration: 0.12, ease: "power1.inOut" })
        .to(svg, { rotation: 8, duration: 0.12, ease: "power1.inOut" })
        .to(svg, { rotation: -4, duration: 0.12, ease: "power1.inOut" })
        .to(svg, { rotation: 0, duration: 0.18, ease: "power1.inOut" });
    }
  };

  const handleMouseLeave = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const svg = card.querySelector(`.services-svg-${service.num}`);
    if (!svg) return;

    if (service.num === "01") {
      const circle = svg.querySelector("circle");
      const paths = svg.querySelectorAll("path");
      if (circle) {
        gsap.to(circle, {
          scale: 1,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (paths && paths.length > 0) {
        gsap.to(paths, {
          stroke: "currentColor",
          scaleX: 1,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    } else if (service.num === "02") {
      const rect = svg.querySelector("rect");
      const paths = svg.querySelectorAll("path, line");
      if (rect) {
        gsap.to(rect, {
          scale: 1,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (paths && paths.length > 0) {
        gsap.to(paths, {
          stroke: "currentColor",
          stagger: 0.01,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    } else if (service.num === "03") {
      gsap.to(svg, {
        rotation: 0,
        transformOrigin: "top center",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col p-5 md:p-8 2xl:p-10 rounded-xl border border-steel-grey/30 bg-graphite-metal md:hover:border-electric-violet/40 transition-all duration-300 h-full md:min-h-[480px] 2xl:min-h-[520px] select-none"
    >
      {/* Accent line animation hover */}
      <div
        ref={accentLineRef}
        className="services-accent-line absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-electric-violet/40 to-transparent scale-x-0 md:group-hover:scale-x-100 md:transition-transform md:duration-500 rounded-full"
      />

      {/* Main content wrapper (takes all available height) */}
      <div className="flex-1 flex flex-col">
        {/* Header: Icon & Num */}
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <div
            ref={iconRef}
            className="services-icon w-12 h-12 rounded-lg bg-steel-grey/25 border border-steel-grey/30 flex items-center justify-center text-chrome-highlight md:group-hover:text-electric-violet md:group-hover:border-electric-violet/20 transition-all duration-300"
          >
            <Icon className={`w-6 h-6 services-svg-${service.num}`} />
          </div>
          <span className="services-num font-mono text-sm text-steel-grey md:group-hover:text-chrome-deep transition-colors">
            {"// "} {service.num}
          </span>
        </div>

        {/* Title */}
        <h3 className="services-title text-xl 2xl:text-2xl font-bold text-chrome-highlight mb-3 tracking-tight leading-snug md:group-hover:text-white transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="services-desc text-sm 2xl:text-base text-copy-muted leading-relaxed mb-4 md:mb-6 md:group-hover:text-chrome-highlight/90">
          {service.description}
        </p>

        {/* Features / Bullets (Separated with border-top) */}
        <ul className="flex flex-col gap-2 md:gap-2.5 2xl:gap-3.5 mb-5 md:mb-8 border-t border-steel-grey/20 pt-4 md:pt-6 mt-auto">
          {service.features.map((feature, fIdx) => (
            <li
              key={fIdx}
              className="services-list-item text-xs 2xl:text-sm text-copy-muted flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-electric-violet/70" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA - Pushed strictly to the bottom of the card */}
      <div className="services-cta mt-auto">
        <Link
          href="/start"
          className="inline-flex items-center gap-2 text-xs 2xl:text-sm font-mono text-chrome-highlight font-semibold md:group-hover:text-electric-violet transition-colors focus-visible:outline-none"
        >
          Iniciar proyecto{" "}
          <ArrowUpRight className="w-3.5 h-3.5 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function PostLaunchStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!stripRef.current) return;

      const items = stripRef.current.querySelectorAll(".strip-item");
      const divider = stripRef.current.querySelector(".strip-divider");

      if (prefersReducedMotion) {
        gsap.set([stripRef.current, items, divider], { opacity: 1, y: 0, scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        stripRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      if (divider) {
        tl.fromTo(
          divider,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.3"
        );
      }

      tl.fromTo(
        items,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
    }, stripRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stripRef}
      className="mt-10 md:mt-14 2xl:mt-16 rounded-xl border border-steel-grey/20 bg-graphite-metal p-6 md:p-8 2xl:p-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 relative">
        {/* Vertical divider (desktop only) */}
        <div className="strip-divider hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-steel-grey/20 origin-center" />

        {/* Soporte continuo */}
        <div className="strip-item flex gap-4 md:pr-8 2xl:pr-12">
          <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5 2xl:w-6 2xl:h-6 text-neon-blue" />
          </div>
          <div>
            <h4 className="text-sm 2xl:text-base font-bold text-chrome-highlight mb-1.5 tracking-tight">
              Evolución y mantenimiento
            </h4>
            <p className="text-xs 2xl:text-sm text-copy-muted leading-relaxed">
              Acompañamos cada proyecto después del lanzamiento con mejoras continuas, soporte técnico y optimización de rendimiento.
            </p>
          </div>
        </div>

        {/* Automatización y evolución */}
        <div className="strip-item flex gap-4 md:pl-8 2xl:pl-12">
          <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-lg bg-electric-violet/10 border border-electric-violet/20 flex items-center justify-center shrink-0">
            <Workflow className="w-5 h-5 2xl:w-6 2xl:h-6 text-electric-violet" />
          </div>
          <div>
            <h4 className="text-sm 2xl:text-base font-bold text-chrome-highlight mb-1.5 tracking-tight">
              Automatizaciones e integraciones
            </h4>
            <p className="text-xs 2xl:text-sm text-copy-muted leading-relaxed">
              Conectamos herramientas, sistemas y procesos para reducir tareas manuales, ordenar operaciones y mejorar la eficiencia del negocio.
            </p>
          </div>
        </div>
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
      className="py-20 md:py-32 2xl:py-40 relative z-20 overflow-hidden"
      style={{
        background: "radial-gradient(circle at 85% 30%, rgba(45, 143, 255, 0.12), transparent 28%), radial-gradient(circle at 15% 70%, rgba(123, 76, 255, 0.1), transparent 25%), var(--carbon-black)"
      }}
    >
      <Container>
        <SectionHeading
          eyebrow="// SERVICIOS"
          title="Productos digitales con criterio y ejecución técnica"
          description="Combinamos estrategia, diseño UX/UI y desarrollo moderno para crear soluciones digitales con base sólida y capacidad de evolución."
          className="services-heading"
        />

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 2xl:gap-12 mt-12 2xl:mt-16"
          style={{ perspective: "1000px" }}
        >
          {SERVICES.map((service, idx) => (
            <ServiceCard service={service} key={idx} />
          ))}
        </div>

        {/* Post-launch support strip */}
        <PostLaunchStrip />
      </Container>
    </section>
  );
}
