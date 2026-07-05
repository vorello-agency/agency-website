import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StartPageClient from "./_components/StartPageClient";

export const metadata: Metadata = {
  title: "Solicitar Propuesta Técnica | Vorello Agency",
  description:
    "Inicia tu proyecto digital con Vorello. Completa nuestro formulario para recibir una propuesta técnica estructurada, con diseño, arquitectura de software y presupuesto cerrado.",
  alternates: {
    canonical: "https://vorelloagency.com/start",
  },
};

export default function StartPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://vorelloagency.com/start#webpage",
    "url": "https://vorelloagency.com/start",
    "name": "Solicitar Propuesta Técnica | Vorello Agency",
    "description": "Formulario de relevamiento de proyectos para diseño y desarrollo de productos digitales, web apps y ecommerce premium por Vorello Agency.",
    "isPartOf": {
      "@id": "https://vorelloagency.com/#website"
    },
    "about": {
      "@id": "https://vorelloagency.com/#org"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <StartPageClient />
      <Footer />
    </>
  );
}
