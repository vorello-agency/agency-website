import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import TechScaleDivider from "@/components/layout/TechScaleDivider";

// Secciones cargadas dinámicamente para optimizar el bundle JS inicial (Code Splitting)
const Statement = dynamic(() => import("./_components/Statement"));
const Services = dynamic(() => import("./_components/Services"));
const Differential = dynamic(() => import("./_components/Differential"));
const Process = dynamic(() => import("./_components/Process"));
const Technologies = dynamic(() => import("./_components/Technologies"));
const MidCTA = dynamic(() => import("./_components/MidCTA"));
const Fit = dynamic(() => import("./_components/Fit"));
const CTA = dynamic(() => import("./_components/CTA"));

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://vorelloagency.com/#website",
        url: "https://vorelloagency.com",
        name: "Vorello Agency",
        description:
          "Diseñamos y desarrollamos productos digitales bien pensados, visualmente cuidados y técnicamente sólidos.",
        publisher: {
          "@id": "https://vorelloagency.com/#org",
        },
        inLanguage: "es",
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://vorelloagency.com/#org",
        name: "Vorello Agency",
        legalName: "VORELLO SAS",
        url: "https://vorelloagency.com",
        logo: "https://vorelloagency.com/assets/logo.webp",
        image: "https://vorelloagency.com/og/og-home.png",
        description:
          "Agencia digital especializada en diseño, tecnología y desarrollo de productos digitales premium.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paysandú",
          addressCountry: "UY",
        },
        sameAs: [
          "https://instagram.com/vorelloagency",
          "https://linkedin.com/company/vorelloagency",
          "https://github.com/vorelloagency",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <TracingBeam>
        <main className="bg-carbon-black flex flex-1 flex-col">
          <Hero />
          <div className="bg-carbon-black z-30">
            <TechScaleDivider leftContent="VORELLO AGENCY" rightContent="DESIGN // PRODUCT // TECHNOLOGY" />
          </div>
          <Statement />
          <TechScaleDivider leftContent="// WHAT WE DO?" rightContent="✦  WE BUILD PRODUCTS TO SCALE YOUR BUSINESS  ✦" />
          <Services />
          <TechScaleDivider compact leftContent="// WHY VORELLO?" rightContent="✦  CRITERIA OVER PASSIVE EXECUTION  ✦" />
          <Differential />
          <TechScaleDivider compact leftContent="// HOW WE EXECUTE?" rightContent="✦  A ROADMAP FROM DISCOVERY TO EVOLUTION  ✦" className="translate-y-4" />
          <Process />
          <TechScaleDivider compact leftContent="// HOW WE BUILD?" rightContent="✦  WITH MODERN TECH BUILT FOR SCALE  ✦" className="-translate-y-4" />
          <Technologies />
          <MidCTA />
          <Fit />
          <TechScaleDivider leftContent="// READY TO START?" rightContent="✦  REQUEST YOUR TECHNICAL PROPOSAL  ✦" />
          <CTA />
        </main>
      </TracingBeam>
      <Footer />
    </>
  );
}
