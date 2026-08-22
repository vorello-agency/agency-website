"use client";

import React from "react";
import Link from "next/link";
import { Archivo_Black } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DotBackground from "@/components/ui/DotBackground";
import AmbientGlowBackground from "@/components/ui/AmbientGlowBackground";
import { cn } from "@/lib/utils";
import TechScaleDivider from "@/components/layout/TechScaleDivider";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-carbon-black relative flex flex-1 flex-col items-center justify-center overflow-hidden pt-36 pb-24 sm:pt-40 sm:pb-32 lg:pt-44">
        {/* Background Patterns */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <DotBackground className="opacity-80" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, var(--carbon-black) 80%)",
            }}
          />
          <AmbientGlowBackground violetSide="right" className="opacity-80" />
        </div>

        {/* Content */}
        <Container className="relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-4">
            <Badge variant="red">ERROR 404 - NOT FOUND</Badge>
          </div>

          {/* Large Text 404 Display */}
          <div
            className={cn(
              archivoBlack.className,
              "text-chrome-deep select-none leading-none tracking-tighter filter my-4",
              "text-[8rem] sm:text-[11rem] md:text-[14rem] lg:text-[18rem]"
            )}
          >
            404
          </div>

          {/* Messages */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <h1 className="text-chrome-highlight font-display uppercase text-4xl tracking-wide sm:text-5xl md:text-6xl">
              Página no encontrada
            </h1>
            <p className="text-copy-muted max-w-md text-balance text-sm leading-relaxed sm:text-base md:text-lg">
              La ruta solicitada no existe o ha sido movida.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex w-full max-w-[280px] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/" className="w-full focus-visible:outline-none sm:w-auto">
              <Button variant="primary-blue" size="lg" className="w-full sm:w-auto" withArrow>
                Comenzar desde el inicio
              </Button>
            </Link>
            <Link href="/services" className="w-full focus-visible:outline-none sm:w-auto">
              <Button variant="outline" size="lg" className="w-full bg-carbon-black/40 sm:w-auto">
                Explorar servicios
              </Button>
            </Link>
          </div>
        </Container>
      </main>
      <TechScaleDivider leftContent="ERROR 404" rightContent="NOT FOUND" />
      <Footer />
    </>
  );
}

