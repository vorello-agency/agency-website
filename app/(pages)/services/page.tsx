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
  title: "Servicios de Diseño, Desarrollo y Producto",
  description:
    "Diseñamos e implementamos sitios web, landing pages, plataformas a medida, ecommerce, automatizaciones e integraciones para empresas con estándares altos.",
  alternates: {
    canonical: "/services",
  },
};

const SERVICE_FAQS = [
  {
    question: "¿Cuál es el alcance inicial y cómo definen los proyectos?",
    answer:
      "Nos enfocamos en definir objetivos comerciales claros antes de escribir código. Cada proyecto inicia con una fase de descubrimiento y diseño UX/UI de 1 a 2 semanas donde mapeamos flujos de usuario, audiencias y requerimientos técnicos precisos para entregar una cotización y cronograma cerrados, sin sorpresas.",
  },
  {
    question: "¿Qué tiempos aproximados de desarrollo manejan?",
    answer:
      "Varía según la complejidad, pero como referencia general: Landing pages toman de 1 a 2 semanas; sitios corporativos premium de 4 a 6 semanas; e-commerce y plataformas web a medida a partir de 8 semanas. Las automatizaciones e integraciones suelen entregarse de forma incremental en sprints de 1 a 3 semanas.",
  },
  {
    question: "¿Quién conserva la propiedad del código y las licencias?",
    answer:
      "Tú de forma exclusiva. Todo el código desarrollado, repositorios de GitHub, cuentas de hosting y despliegue (Vercel, Firebase) y licencias asociadas se transfieren y configuran a tu nombre al finalizar el proyecto. Vorello no retiene propiedad ni impone dependencias cautivas.",
  },
  {
    question: "¿Con qué CMS o tecnologías prefieren trabajar?",
    answer:
      "Somos CMS-agnósticos y elegimos la herramienta según el caso de uso. Para proyectos corporativos de alto nivel, preferimos arquitecturas Headless / Jamstack con Next.js o Astro conectadas a CMS de contenido estructurado (como Sanity, Decap o Strapi). Para tiendas comerciales robustas, integramos Shopify Headless o implementaciones integrales a medida.",
  },
  {
    question: "¿Cómo preparan los sitios web para la búsqueda generativa y los asistentes de IA?",
    answer:
      "Diseñamos la arquitectura de información con marcado semántico HTML5 estructurado (JSON-LD), datos organizacionales claros y rendimiento extremo. Esto permite que tanto los motores de búsqueda tradicionales como los agentes de IA comprendan, citen y procesen el contenido de tu marca sin ambigüedades.",
  },
  {
    question: "¿Cómo evalúan si necesito desarrollo a medida o si alcanza con soluciones no-code / IA?",
    answer:
      "No vendemos software a medida por venderlo. Durante la fase de descubrimiento analizamos la complejidad del proyecto: si un prototipo o integración no-code resuelve tu problema operativo de forma segura y económica, te lo aconsejamos abiertamente. Si tu operación requiere seguridad de datos avanzada, reglas de negocio complejas o escalabilidad a largo plazo, diseñamos la plataforma custom ideal.",
  },
  {
    question: "¿Cómo garantizan la seguridad y estabilidad de las integraciones?",
    answer:
      "Construimos integraciones y plataformas con un enfoque robusto: autenticación cifrada, control de acceso basado en roles (RBAC), logs de auditoría para rastrear errores de API y mecanismos de fallback automático (reintentos con retraso exponencial) para que tu operación no se detenga si un proveedor externo sufre una caída temporal.",
  },
  {
    question: "¿Ofrecen soporte y mantenimiento post-lanzamiento?",
    answer:
      "Sí. Todos nuestros proyectos incluyen un período de soporte y garantía de 30 días naturales tras el lanzamiento. Posteriormente, ofrecemos planes de soporte mensual para actualización de dependencias, monitoreo de rendimiento (Core Web Vitals), optimización SEO continua y mejoras operativas.",
  },
];

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
        logo: "https://vorelloagency.com/assets/logo.webp",
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
        serviceType: "Servicio de Agencia Digital",
        description: service.description,
        provider: { "@id": "https://vorelloagency.com/#org" },
      })),
      {
        "@type": "FAQPage",
        "@id": "https://vorelloagency.com/services#faq",
        mainEntity: SERVICE_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
          <ServicesHero />
          <StickyServiceNav />

          <div className="flex flex-col">
            {servicesDetail.map((service, idx) => (
              <ServiceSection
                key={service.id}
                service={service}
                index={idx}
              />
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
