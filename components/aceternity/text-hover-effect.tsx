"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
  forceActive = false,
}: {
  text: string;
  duration?: number;
  forceActive?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const isCurrentlyHovered = hovered || forceActive;

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none h-auto"
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FF5C00" />
          <stop offset="12%" stopColor="#2D8FFF" />
          <stop offset="50%" stopColor="#2D8FFF" />
          <stop offset="80%" stopColor="#7B4CFF" />
          <stop offset="100%" stopColor="#FF2A54" />
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          initial={{ cx: "50%", cy: "50%", r: "20%" }}
          animate={{
            ...maskPosition,
            r: forceActive ? "100%" : "20%",
          }}
          transition={{ duration: duration ?? 0.8, ease: "easeOut" }}

        // example for a smoother animation below

        //   transition={{
        //     type: "spring",
        //     stiffness: 300,
        //     damping: 50,
        //   }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-steel-grey/15 font-sans font-black tracking-widest text-6xl uppercase"
        style={{ opacity: isCurrentlyHovered ? 0.7 : 0.25 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-electric-violet/20 sm:stroke-steel-grey/50 font-sans font-black tracking-widest text-6xl uppercase"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth={isCurrentlyHovered ? "0.3" : "0.5"}
        mask="url(#textMask)"
        className="fill-transparent font-sans font-black tracking-widest text-6xl uppercase transition-all duration-500 ease-out"
        style={{
          opacity: isCurrentlyHovered ? 1 : 0.15,
          filter: isCurrentlyHovered
            ? "drop-shadow(0 0 12px rgba(123, 76, 255, 0.55)) drop-shadow(0 0 8px rgba(45, 143, 255, 0.45)) drop-shadow(0 0 3px rgba(255, 92, 0, 0.15)) drop-shadow(0 0 3px rgba(255, 42, 84, 0.15))"
            : "none",
        }}
      >
        {text}
      </text>
    </svg>
  );
};
