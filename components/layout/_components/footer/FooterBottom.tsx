"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Container from "@/components/layout/Container";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="footer-bottom relative z-10 py-8">
      <Container className="flex flex-col items-center gap-6 text-xs md:flex-row md:justify-between md:gap-4 2xl:max-w-[1500px]">
        <p className="text-copy-muted text-center md:text-left">
          &copy; {currentYear} Vorello Agency
          <br className="xs:hidden" />
          <span className="hidden xs:inline px-2"> • </span>
          Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/privacy-policy"
            className="text-copy-muted hover:text-chrome-highlight focus-visible:ring-electric-violet -mx-1 rounded px-1 transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Privacidad
          </Link>
          <span className="text-steel-grey/75 select-none" aria-hidden="true">
            ·
          </span>
          <Link
            href="/terms-of-service"
            className="text-copy-muted hover:text-chrome-highlight focus-visible:ring-electric-violet -mx-1 rounded px-1 transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Términos
          </Link>
          <span className="text-steel-grey/75 select-none" aria-hidden="true">
            ·
          </span>
          <button
            onClick={scrollToTop}
            className="group/top text-copy-muted hover:text-chrome-highlight focus-visible:ring-electric-violet relative -mx-1 inline-flex cursor-pointer items-center gap-1 rounded px-1 transition-colors after:absolute after:inset-[-12px] after:content-[''] focus-visible:ring-1 focus-visible:outline-none"
            aria-label="Volver arriba"
          >
            <span className="hidden xs:inline">Volver arriba</span>
            <ArrowUp className="h-3 w-3 transition-transform group-hover/top:-translate-y-1" />
          </button>
        </div>
      </Container>
    </div>
  );
}
