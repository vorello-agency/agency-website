"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap/register";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize Lenis with enhanced smooth dampening for an ultra-fluid, floaty experience
    const lenis = new Lenis({
      duration: 1.25,          // Extended dampening duration (buttery slow-motion deceleration)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential ease-out
      wheelMultiplier: 0.70,  // Lowered multiplier to dampen mouse-wheel force and jumps
      touchMultiplier: 1.2,   // Fluid touch response
      infinite: false,
    });

    lenisRef.current = lenis;

    // Bind Lenis scroll event to ScrollTrigger update cycle
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Synchronize Lenis requestAnimationFrame with GSAP's global ticker
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000); // Sincroniza a milisegundos
    };

    gsap.ticker.add(updateLenis);

    // Disable lag smoothing to prevent ScrollTrigger frame desyncs on scrub
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll to top instantly on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
