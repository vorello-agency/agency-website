"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/register";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Compass,
  Route,
  PanelsTopLeft,
  Code2,
  Gauge,
  Rocket,
  Orbit,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEPS = [
  {
    num: "01",
    name: "Descubrimiento",
    desc: "Entendemos objetivos, usuarios y restricciones técnicas para definir una base clara.",
    icon: Compass,
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  },
  {
    num: "02",
    name: "Estrategia",
    desc: "Definimos arquitectura, alcance funcional y roadmap de ejecución.",
    icon: Route,
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
  },
  {
    num: "03",
    name: "UX/UI",
    desc: "Diseñamos interfaces claras, refinadas y enfocadas en la experiencia.",
    icon: PanelsTopLeft,
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
  },
  {
    num: "04",
    name: "Desarrollo",
    desc: "Construimos con código limpio, arquitectura escalable y foco en rendimiento.",
    icon: Code2,
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
  },
  {
    num: "05",
    name: "Optimización",
    desc: "Validamos accesibilidad, performance, SEO técnico y comportamiento responsive.",
    icon: Gauge,
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
  },
  {
    num: "06",
    name: "Lanzamiento",
    desc: "Desplegamos el producto en un entorno estable, seguro y preparado para operar.",
    icon: Rocket,
    area: "md:col-span-6 xl:col-span-6",
  },
  {
    num: "07",
    name: "Evolución",
    desc: "Acompañamos el crecimiento con mejoras continuas basadas en métricas, uso real y objetivos en evolución.",
    icon: Orbit,
    area: "md:col-span-6 xl:col-span-6",
  },
];

type StepItem = {
  num: string;
  name: string;
  desc: string;
  icon: LucideIcon;
  area: string;
};

function GridItem({ step }: { step: StepItem }) {
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    if (glowRef.current && borderGlowRef.current) {
      gsap.to([glowRef.current, borderGlowRef.current], {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });
      gsap.to(card, {
        borderColor: "rgba(45, 143, 255, 0.25)",
        backgroundColor: "rgba(26, 29, 33, 0.55)",
        scale: 1.008,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const handleTouchEnd = () => {
    const card = cardRef.current;
    if (glowRef.current && borderGlowRef.current) {
      gsap.to([glowRef.current, borderGlowRef.current], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
    if (card) {
      gsap.to(card, {
        borderColor: "rgba(42, 46, 51, 0.2)",
        backgroundColor: "rgba(26, 29, 33, 0.4)",
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

    const svg = card.querySelector(`.process-svg-${step.num}`);
    if (!svg) return;

    if (step.num === "01") {
      const needle = svg.querySelector("path");
      const dial = svg.querySelector("circle");
      if (needle && dial) {
        // Establecer estados iniciales de rotación limpia
        gsap.set(dial, { rotation: 0, transformOrigin: "center center" });
        gsap.set(needle, { rotation: 0, transformOrigin: "center center" });

        const tl = gsap.timeline({ overwrite: "auto" });

        // 1. Escalar y rotar el dial externo en sentido contrario
        tl.to(dial, {
          scale: 1.08,
          rotation: -45,
          transformOrigin: "center center",
          duration: 0.8,
          ease: "power2.out",
        });

        // 2. Animación magnética oscilante de la aguja
        const needleTl = gsap.timeline({ overwrite: "auto" });
        needleTl.to(needle, {
          rotation: 270,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "power2.in",
        })
        .to(needle, {
          rotation: 410,
          transformOrigin: "center center",
          duration: 0.18,
          ease: "power1.out",
        })
        .to(needle, {
          rotation: 325,
          transformOrigin: "center center",
          duration: 0.15,
          ease: "power1.inOut",
        })
        .to(needle, {
          rotation: 380,
          transformOrigin: "center center",
          duration: 0.12,
          ease: "power1.inOut",
        })
        .to(needle, {
          rotation: 348,
          transformOrigin: "center center",
          duration: 0.1,
          ease: "power1.inOut",
        })
        .to(needle, {
          rotation: 366,
          transformOrigin: "center center",
          duration: 0.08,
          ease: "power1.inOut",
        })
        .to(needle, {
          rotation: 360,
          transformOrigin: "center center",
          duration: 0.06,
          ease: "power2.out",
        });
      }
    } else if (step.num === "02") {
      const circles = svg.querySelectorAll("circle");
      const path = svg.querySelector("path");
      if (circles.length >= 2 && path) {
        // Establecer estado inicial del trazado del camino
        gsap.set(path, { strokeDasharray: 50, strokeDashoffset: 50 });
        
        // Timeline secuencial inercial para conectar los puntos siguiendo el path
        const tl = gsap.timeline({ overwrite: "auto" });
        tl.fromTo(circles[0], 
          { scale: 0, transformOrigin: "center center" }, 
          { scale: 1.25, duration: 0.25, ease: "back.out(2)" }
        )
        .fromTo(path, 
          { strokeDashoffset: 50 }, 
          { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" }
        )
        .fromTo(circles[1], 
          { scale: 0, transformOrigin: "center center" }, 
          { scale: 1.25, duration: 0.25, ease: "back.out(2)" }
        );
      }
    } else if (step.num === "03") {
      const rect = svg.querySelector("rect");
      const paths = svg.querySelectorAll("path");
      if (rect && paths.length >= 2) {
        // Establecer estados iniciales
        gsap.set(rect, { scale: 1, transformOrigin: "center center" });
        gsap.set(paths[0], { strokeDasharray: 18, strokeDashoffset: 18 });
        gsap.set(paths[1], { strokeDasharray: 12, strokeDashoffset: 12, x: 0 });

        const tl = gsap.timeline({ overwrite: "auto" });
        
        // 1. Efecto de compresión y expansión orgánica ("squish") en el rect principal
        tl.to(rect, {
          scaleX: 1.08,
          scaleY: 0.92,
          transformOrigin: "center center",
          duration: 0.2,
          ease: "power1.out",
        })
        .to(rect, {
          scaleX: 0.96,
          scaleY: 1.04,
          duration: 0.15,
          ease: "power1.inOut",
        })
        .to(rect, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.2,
          ease: "power2.out",
        })
        // 2. Dibujar la cabecera horizontal
        .to(paths[0], {
          strokeDashoffset: 0,
          duration: 0.35,
          ease: "power2.out",
        }, "-=0.25")
        // 3. Dibujar la división de sidebar vertical
        .to(paths[1], {
          strokeDashoffset: 0,
          duration: 0.3,
          ease: "power2.inOut",
        }, "-=0.1")
        // 4. Animación de "arrastre/redimensionamiento" elástico del panel
        .to(paths[1], {
          x: -3,
          duration: 0.25,
          ease: "power2.inOut",
        })
        .to(paths[1], {
          x: 2,
          duration: 0.3,
          ease: "back.out(2)",
        })
        .to(paths[1], {
          x: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    } else if (step.num === "04") {
      const paths = svg.querySelectorAll("path");
      if (paths.length >= 3) {
        // Establecer estados iniciales de rotación y traslación limpia
        gsap.set(paths[0], { x: 0 }); // >
        gsap.set(paths[1], { x: 0 }); // <
        gsap.set(paths[2], { rotation: 0, transformOrigin: "center center" }); // /

        const tl = gsap.timeline({ overwrite: "auto" });

        // 1. Expandir los brackets hacia los lados con rebote
        tl.to(paths[1], {
          x: -5,
          duration: 0.35,
          ease: "back.out(2)",
        })
        .to(paths[0], {
          x: 5,
          duration: 0.35,
          ease: "back.out(2)",
        }, 0)
        // 2. Giro tipo compilación/hélice de la barra diagonal central (path[2])
        .to(paths[2], {
          rotation: 360,
          transformOrigin: "center center",
          duration: 0.7,
          ease: "back.out(1.5)",
        }, "-=0.2")
        // 3. Asentamiento en posición expandida estable
        .to(paths[1], {
          x: -3,
          duration: 0.25,
          ease: "power2.out",
        }, "-=0.35")
        .to(paths[0], {
          x: 3,
          duration: 0.25,
          ease: "power2.out",
        }, "-=0.35");
      }
    } else if (step.num === "05") {
      // Lucide Gauge SVG: path[0] = aguja (m12 14 4-4), path[1] = arco del dial
      const allPaths = svg.querySelectorAll("path");
      const needle = allPaths[0];
      if (needle) {
        // La aguja retrocede (gira en arco circular hacia atrás) y vuelve con rebote
        const tl = gsap.timeline({ overwrite: "auto" });
        tl.to(needle, {
          rotation: -90,
          svgOrigin: "12 14",
          duration: 0.45,
          ease: "power2.in",
        })
        .to(needle, {
          rotation: 0,
          svgOrigin: "12 14",
          duration: 0.7,
          ease: "back.out(1.7)",
        })
        .to(needle, { rotation: 6, svgOrigin: "12 14", duration: 0.06, ease: "none" })
        .to(needle, { rotation: -5, svgOrigin: "12 14", duration: 0.06, ease: "none" })
        .to(needle, { rotation: 3, svgOrigin: "12 14", duration: 0.06, ease: "none" })
        .to(needle, { rotation: -2, svgOrigin: "12 14", duration: 0.06, ease: "none" })
        .to(needle, { rotation: 0, svgOrigin: "12 14", duration: 0.08, ease: "power1.out" });
      }
    } else if (step.num === "06") {
      gsap.killTweensOf(svg);
      gsap.timeline()
        .to(svg, {
          y: -5,
          x: 3,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(svg, {
          x: "+=0.8",
          yoyo: true,
          repeat: 5,
          duration: 0.05,
        }, "-=0.1");
    } else if (step.num === "07") {
      const circles = svg.querySelectorAll("circle");
      const paths = svg.querySelectorAll("path");
      if (circles.length >= 3 && paths.length >= 2) {
        // Establecer estados iniciales
        gsap.set(circles[0], { scale: 1, transformOrigin: "center center" });
        gsap.set([paths[0], paths[1]], { strokeDasharray: 50, strokeDashoffset: 50 });
        gsap.set([circles[1], circles[2]], { 
          scale: 0, 
          rotation: 0, 
          svgOrigin: "12 12" 
        });

        const tl = gsap.timeline({ overwrite: "auto" });
        tl.fromTo(circles[0],
          { scale: 0.5 },
          { scale: 1.3, duration: 0.3, ease: "back.out(2)" }
        )
        .to([paths[0], paths[1]], {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: "power2.inOut",
        }, "-=0.15")
        .to([circles[1], circles[2]], {
          scale: 1.3,
          duration: 0.25,
          ease: "back.out(2)",
          stagger: 0.1,
        }, "-=0.3")
        .to(circles[1], {
          rotation: 180,
          svgOrigin: "12 12",
          duration: 0.9,
          ease: "back.out(1.5)",
        }, "-=0.1")
        .to(circles[2], {
          rotation: 180,
          svgOrigin: "12 12",
          duration: 0.9,
          ease: "back.out(1.5)",
        }, "-=0.9");
      }
    }
  };

  const handleMouseLeave = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const svg = card.querySelector(`.process-svg-${step.num}`);
    if (!svg) return;

    if (step.num === "01") {
      const needle = svg.querySelector("path");
      const dial = svg.querySelector("circle");
      if (needle && dial) {
        gsap.to(dial, {
          scale: 1,
          rotation: 0,
          transformOrigin: "center center",
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(needle, {
          rotation: 0,
          transformOrigin: "center center",
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    } else if (step.num === "02") {
      const circles = svg.querySelectorAll("circle");
      const path = svg.querySelector("path");
      if (circles.length > 0) {
        gsap.to(circles, {
          scale: 1,
          transformOrigin: "center center",
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (path) {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    } else if (step.num === "03") {
      const rect = svg.querySelector("rect");
      const paths = svg.querySelectorAll("path");
      
      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(rect, {
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        transformOrigin: "center center",
        duration: 0.4,
        ease: "power2.out",
      })
      .to(paths[0], {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 0)
      .to(paths[1], {
        strokeDashoffset: 0,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      }, 0);
    } else if (step.num === "04") {
      const paths = svg.querySelectorAll("path");
      if (paths.length >= 3) {
        gsap.to(paths[1], { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        gsap.to(paths[0], { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        gsap.to(paths[2], { rotation: 0, transformOrigin: "center center", duration: 0.5, ease: "power2.out", overwrite: "auto" });
      }
    } else if (step.num === "05") {
      // Lucide Gauge SVG: path[0] = aguja
      const allPaths = svg.querySelectorAll("path");
      const needle = allPaths[0];
      if (needle) {
        gsap.to(needle, {
          rotation: 0,
          svgOrigin: "12 14",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    } else if (step.num === "06") {
      gsap.killTweensOf(svg);
      gsap.to(svg, {
        y: 0,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else if (step.num === "07") {
      const circles = svg.querySelectorAll("circle");
      const paths = svg.querySelectorAll("path");
      
      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(circles, {
        scale: 1,
        rotation: 0,
        svgOrigin: "12 12",
        transformOrigin: "center center",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      })
      .to(paths, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "power2.out",
      }, 0);
    }
  };

  return (
    <li className={`min-h-[15rem] list-none ${step.area}`}>
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full rounded-2xl p-6 md:p-7 xl:p-8 bg-graphite-metal/40 backdrop-blur-md border border-steel-grey/20 shadow-[inset_0_0_0_0px_rgba(45,143,255,0),_inset_0_0_0px_rgba(45,143,255,0)] md:hover:bg-graphite-metal/55 md:hover:border-neon-blue/20 md:hover:scale-[1.012] md:hover:shadow-[inset_0_0_0_1px_rgba(45,143,255,0.15),_inset_0_0_16px_rgba(45,143,255,0.10)] transition-all duration-500 ease-out overflow-hidden select-none"
      >

        {/* Capa 1: Círculo blurred de luz azul en la esquina superior derecha (Hover) */}
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-neon-blue/35 blur-3xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 animate-glow-drift" />

        {/* Soft background highlight that follows mouse across card boundaries */}
        <div
          ref={glowRef}
          className="process-glow absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: "radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(45, 143, 255, 0.05), transparent 100%)"
          }}
        />

        {/* Subtle, ultra-thin border glow following mouse precisely across cards */}
        <div
          ref={borderGlowRef}
          className="process-border-glow absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            maskImage: "radial-gradient(circle 100px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle 100px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 20%, transparent 100%)"
          }}
        >
          <svg className="absolute inset-0 w-full h-full rounded-[inherit] pointer-events-none" style={{ overflow: "visible" }}>
            <rect
              x="0.75"
              y="0.75"
              width="calc(100% - 1.5px)"
              height="calc(100% - 1.5px)"
              rx="16"
              fill="none"
              stroke={`url(#glow-grad-${step.num})`}
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id={`glow-grad-${step.num}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7b4cff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#2d8fff" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-30 flex h-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="w-fit rounded-lg border border-steel-grey/30 bg-graphite-metal/50 p-2 overflow-visible text-chrome-highlight md:group-hover:text-electric-violet md:group-hover:border-electric-violet/20 transition-all duration-500 ease-out">
              <Icon className={`h-5 w-5 overflow-visible process-svg-${step.num}`} />
            </div>
            <div className="space-y-1.5">
              <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-electric-violet">
                {"// FASE "} {step.num}
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-chrome-highlight md:group-hover:text-white transition-colors duration-500 ease-out">
                {step.name}
              </h3>
            </div>
          </div>
          <p className="text-xs md:text-sm leading-relaxed text-chrome-highlight/65 md:group-hover:text-chrome-highlight/90 transition-colors duration-500 ease-out">
            {step.desc}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!stepsContainerRef.current) return;

      const steps = Array.from(stepsContainerRef.current.children) as HTMLElement[];

      if (prefersReducedMotion) {
        gsap.set(".process-heading > *", { opacity: 1, y: 0 });
        gsap.set(steps, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // 1. Cinematic Timeline for Heading and Bento Grid Entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // 1. Heading slide-up stagger (Standardized to 0.6s duration)
      tl.fromTo(
        ".process-heading > *",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // 2. Bento grid cards slide-up stagger - sleek, clean, and solid (Standardized to 0.6s duration)
      tl.fromTo(
        steps,
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 3. Mobile touch-triggered sweep effect via ScrollTrigger for each card
      steps.forEach((stepEl) => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch) {
          const cardInner = stepEl.querySelector(".group");
          const glow = stepEl.querySelector(".process-glow");
          const borderGlow = stepEl.querySelector(".process-border-glow");

          if (cardInner && glow && borderGlow) {
            const stepTl = gsap.timeline({
              scrollTrigger: {
                trigger: stepEl,
                start: "top 72%",
                toggleActions: "play none none none",
              }
            });

            const obj = { x: -120, y: 80 };

            stepTl.to([glow, borderGlow], {
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
            });

            stepTl.to(obj, {
              x: 380,
              y: 120,
              duration: 1.4,
              ease: "power2.inOut",
              onUpdate: () => {
                (cardInner as HTMLElement).style.setProperty("--mouse-x", `${obj.x}px`);
                (cardInner as HTMLElement).style.setProperty("--mouse-y", `${obj.y}px`);
              }
            }, "-=0.25");

            stepTl.to([glow, borderGlow], {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            }, "-=0.3");
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="py-20 md:py-32 relative overflow-hidden z-40"
      style={{
        background: "radial-gradient(circle at 15% 25%, rgba(123, 76, 255, 0.10), transparent 32%), radial-gradient(circle at 85% 65%, rgba(45, 143, 255, 0.10), transparent 34%), linear-gradient(180deg, #0D0F11 0%, #111419 48%, #0D0F11 100%)"
      }}
    >
      {/* Premium Small Grid Overlay with center-focused radial mask */}
      <div
        className="absolute inset-0 z-0 bg-grid-small pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle at center, white 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at center, white 30%, transparent 85%)"
        }}
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="// PROCESO DE TRABAJO"
          title="Un proceso claro para resultados sólidos"
          description="Trabajamos por etapas claras para tomar mejores decisiones, reducir incertidumbre y construir productos digitales más sólidos."
          className="process-heading"
        />

        <ul
          ref={stepsContainerRef}
          className="group/grid mt-12 grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 xl:max-h-[46rem] xl:grid-rows-3"
          style={{ perspective: "1200px" }}
        >
          {STEPS.map((step, idx) => (
            <GridItem key={idx} step={step} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
