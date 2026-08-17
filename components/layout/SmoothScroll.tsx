"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap/register";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize Lenis with enhanced smooth dampening for an ultra-fluid, floaty experience
    const lenis = new Lenis({
      duration: 1.25, // Extended dampening duration (buttery slow-motion deceleration)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential ease-out
      wheelMultiplier: 0.7, // Lowered multiplier to dampen mouse-wheel force and jumps
      touchMultiplier: 1.2, // Fluid touch response
      infinite: false,
    });

    lenisRef.current = lenis;

    // Bind Lenis scroll event to ScrollTrigger update cycle
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Sincronizar recalculo de dimensiones cuando ScrollTrigger se actualiza
    const handleScrollTriggerRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", handleScrollTriggerRefresh);

    // Synchronize Lenis requestAnimationFrame with GSAP's global ticker
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000); // Sincroniza a milisegundos
    };

    gsap.ticker.add(updateLenis);

    // Disable lag smoothing to prevent ScrollTrigger frame desyncs on scrub
    gsap.ticker.lagSmoothing(0);

    // Observar cambios dinámicos en la altura del DOM para recalcular el límite de scroll de Lenis en tiempo real
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      resizeObserver.disconnect();
      ScrollTrigger.removeEventListener("refresh", handleScrollTriggerRefresh);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Synchronously reset scroll position on route change before browser paints
  // to avoid rendering the new page at the old page's scroll height.
  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    lenisRef.current?.resize();
    ScrollTrigger.clearScrollMemory();
    ScrollTrigger.refresh();

    // Recalculo diferido para dar tiempo a la hidratación completa de componentes dinámicos (SVGs, fuentes, etc.)
    const timer = setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
