"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress of the entire page
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // ResizeObserver to continuously track layout height changes
  useEffect(() => {
    if (!contentRef.current) return;

    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Spring animations for the gradient stop values
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight]), {
    stiffness: 400,
    damping: 80,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 400,
    damping: 80,
  });

  // Transform scroll progress to hardware-accelerated values (0 layout reflows)
  const dotBg = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["var(--electric-violet)", "var(--color-white)"]
  );
  const dotBorder = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["var(--electric-violet)", "var(--color-white)"]
  );
  const dotShadow = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["rgba(0, 0, 0, 0.24) 0px 3px 8px", "rgba(0, 0, 0, 0)"]
  );

  return (
    <motion.div ref={ref} className={cn("relative w-full", className)}>
      {/* Absolute container for the SVG Tracing Beam line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-30 hidden md:block">
        <div className="relative mx-auto h-full w-full max-w-7xl px-4 sm:px-6 lg:px-16 xl:px-20 2xl:px-8">
          {/* Shifted to the left margin out of the Container text alignment for perfect breathing space */}
          <div className="absolute top-[116px] left-0 flex h-[calc(100%-116px)] flex-col items-center md:left-[-16px] lg:left-2 xl:left-[0vw] 2xl:left-[-150px]">
            {/* Pulsing indicator dot at the top of the beam */}
            <motion.div
              style={{
                boxShadow: dotShadow,
              }}
              className="border-steel-grey/30 bg-graphite-metal mb-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border shadow-sm"
            >
              <motion.div
                style={{
                  backgroundColor: dotBg,
                  borderColor: dotBorder,
                }}
                className="border-steel-grey h-2 w-2 rounded-full border bg-white"
              />
            </motion.div>

            {/* Tracing Beam SVG */}
            <svg
              viewBox={`0 0 20 ${svgHeight}`}
              width="20"
              height={svgHeight}
              className="block"
              aria-hidden="true"
            >
              {/* Static background path */}
              <motion.path
                d={`M 10 0 V ${svgHeight * 0.3} l 6 12 V ${svgHeight * 0.7} l -6 12 V ${svgHeight}`}
                fill="none"
                stroke="var(--color-steel-grey)"
                strokeOpacity="0.12"
                strokeWidth="1.5"
              />

              {/* Scroll-activated glowing gradient path */}
              <motion.path
                d={`M 10 0 V ${svgHeight * 0.3} l 6 12 V ${svgHeight * 0.7} l -6 12 V ${svgHeight}`}
                fill="none"
                stroke="url(#tracing-beam-gradient)"
                strokeWidth="2"
                className="motion-reduce:hidden"
              />

              <defs>
                <motion.linearGradient
                  id="tracing-beam-gradient"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  x2="0"
                  y1={y1}
                  y2={y2}
                >
                  <stop stopColor="var(--color-neon-blue)" stopOpacity="0" />
                  <stop stopColor="var(--color-neon-blue)" />
                  <stop offset="0.325" stopColor="var(--color-electric-violet)" />
                  <stop offset="1" stopColor="var(--color-electric-violet)" stopOpacity="0" />
                </motion.linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div ref={contentRef} className="relative w-full">
        {children}
      </div>
    </motion.div>
  );
};
