"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { MOTION } from "@/lib/gsap/tokens";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import ServiceCard from "./services/ServiceCard";
import PostLaunchStrip from "./services/PostLaunchStrip";
import ServicesGlobalCTA from "./services/ServicesGlobalCTA";
import { servicesCategories } from "@/data/services";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const cards = Array.from(
        cardsRef.current.children
      ) as HTMLElement[];

      if (prefersReducedMotion) {
        gsap.set(".services-heading > *", { opacity: 1, y: 0 });
        gsap.set(".services-global-cta", { opacity: 1, y: 0 });
        cards.forEach((card) => {
          gsap.set(card, { opacity: 1, y: 0, scale: 1 });
          gsap.set(
            card.querySelectorAll(
              ".services-icon, .services-num, .services-title, .services-desc, .services-list-item, .services-cta"
            ),
            { opacity: 1, scale: 1, x: 0, y: 0 }
          );
        });
        return;
      }

      // ─── Heading cascade ───
      gsap.fromTo(
        ".services-heading > *",
        { opacity: 0, y: MOTION.scroll.y },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.entrance,
          stagger: MOTION.stagger.cascade,
          ease: MOTION.ease.enter,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );

      // ─── Cards: unified single timeline per card ───
      cards.forEach((card) => {
        const icon = card.querySelector(".services-icon");
        const num = card.querySelector(".services-num");
        const title = card.querySelector(".services-title");
        const desc = card.querySelector(".services-desc");
        const listItems = card.querySelectorAll(".services-list-item");
        const cta = card.querySelector(".services-cta");

        // Initial hidden state
        gsap.set(card, { opacity: 0, y: MOTION.scroll.y, scale: MOTION.scroll.scale });
        gsap.set([icon, num, title, desc, listItems, cta], { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });

        // 1. Card container entrance
        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: MOTION.duration.entrance,
          ease: MOTION.ease.enter,
        });

        // 2. Icon + Num pop
        tl.fromTo(
          [icon, num],
          { opacity: 0, scale: MOTION.scroll.iconScale },
          {
            opacity: 1,
            scale: 1,
            duration: MOTION.duration.base,
            stagger: 0.05,
            ease: MOTION.ease.spring,
          },
          "-=0.35"
        );

        // 3. Title + Description
        tl.fromTo(
          [title, desc],
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.base,
            stagger: MOTION.stagger.base,
            ease: MOTION.ease.enter,
          },
          "-=0.25"
        );

        // 4. List items cascade
        tl.fromTo(
          listItems,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: MOTION.duration.base,
            stagger: 0.06,
            ease: MOTION.ease.enter,
          },
          "-=0.25"
        );

        // 5. CTA — last element, enters after list finishes
        tl.fromTo(
          cta,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: MOTION.ease.enter,
          },
          "-=0.1"
        );
      });

      // ─── Global CTA entrance ───
      gsap.fromTo(
        ".services-global-cta",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.base,
          ease: MOTION.ease.enter,
          scrollTrigger: {
            trigger: ".services-global-cta",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-20 overflow-hidden pt-20 pb-10 md:pt-32 md:pb-16 2xl:pt-40 2xl:pb-24"
      style={{
        background:
          "radial-gradient(circle at 85% 30%, rgba(123, 76, 255, 0.09), transparent 28%), radial-gradient(circle at 15% 70%, rgba(45, 143, 255, 0.08), transparent 25%), var(--carbon-black)",
      }}
    >
      {/* Dot pattern overlay masked to match the violet glow area at the top right */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(rgba(123, 76, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          WebkitMaskImage: "radial-gradient(circle at 85% 30%, white, transparent 32%)",
          maskImage: "radial-gradient(circle at 85% 30%, white, transparent 32%)",
        }}
      />
      {/* Dot pattern overlay masked to match the blue glow area at the bottom left */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(rgba(45, 143, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          WebkitMaskImage: "radial-gradient(circle at 15% 70%, white, transparent 32%)",
          maskImage: "radial-gradient(circle at 15% 70%, white, transparent 32%)",
        }}
      />
      <Container>
        <SectionHeading
          eyebrow="SERVICIOS"
          title="Tres áreas de enfoque, un mismo estándar"
          description="Trabajamos tres líneas principales de servicio, con el mismo estándar de diseño, tecnología y criterio de producto."
          className="services-heading"
        />

        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 gap-6 md:gap-8 xlg:grid-cols-3 2xl:mt-16 2xl:gap-10"
        >
          {servicesCategories.map((service) => (
            <ServiceCard service={service} key={service.num} />
          ))}
        </div>

        <PostLaunchStrip />

        <ServicesGlobalCTA />
      </Container>
    </section>
  );
}
