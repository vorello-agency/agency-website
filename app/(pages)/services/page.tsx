import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import ServicesHero from "./_components/ServicesHero";
import StickyServiceNav from "./_components/StickyServiceNav";
import ServiceSection from "./_components/ServiceSection";
import ServicesFAQ from "./_components/ServicesFAQ";
import ServicesCTA from "./_components/ServicesCTA";
import { servicesDetail } from "@/data/services";

export const metadata: Metadata = {
  title: "Servicios de Diseño, Desarrollo y Producto | Vorello Agency",
  description:
    "Diseñamos e implementamos sitios web, landing pages, plataformas a medida, ecommerce, automatizaciones e integraciones para empresas con estándares altos.",
  alternates: {
    canonical: "https://vorelloagency.com/services",
  },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": "https://vorelloagency.com/#org",
        name: "Vorello Agency",
        legalName: "VORELLO SAS",
        url: "https://vorelloagency.com/",
        logo: "https://vorelloagency.com/og/logo.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paysandú",
          addressCountry: "UY",
        },
      },
      ...servicesDetail.map((service) => ({
        "@type": "Service",
        "@id": `https://vorelloagency.com/services#${service.id}`,
        name: service.title,
        serviceType: service.category,
        description: service.description,
        provider: { "@id": "https://vorelloagency.com/#org" },
      })),
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
        <main className="bg-carbon-black flex flex-1 flex-col overflow-hidden">
          <ServicesHero />
          <StickyServiceNav />

          <div className="flex flex-col">
            {servicesDetail.map((service, idx) => (
              <ServiceSection key={service.id} service={service} index={idx} />
            ))}
          </div>

          <ServicesFAQ />
          <ServicesCTA />
        </main>
      </TracingBeam>
      <Footer />
    </>
  );
}
