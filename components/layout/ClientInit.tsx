"use client";

import { useEffect } from "react";

export default function ClientInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent native link and button dragging across all browsers/OS (especially macOS)
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, [role='button'], img")) {
        e.preventDefault();
      }
    };

    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
