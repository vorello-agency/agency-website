"use client";

import React, { useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
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

function FAQCard({ faq, idx }: { faq: FAQItem; idx: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = `faq-btn-${idx}`;
  const panelId = `faq-panel-${idx}`;

  return (
    <div className="border-steel-grey/25 border-b py-4">
      <h3>
        <button
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen(!isOpen)}
          className="text-chrome-highlight hover:text-electric-violet focus-visible:ring-electric-violet/50 flex w-full items-center justify-between rounded py-3 text-left font-sans text-sm font-bold transition-colors focus-visible:ring-1 focus-visible:outline-none sm:text-base"
        >
          <span>{faq.question}</span>
          <span className="bg-steel-grey/15 border-steel-grey/30 text-chrome-deep ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200">
            {isOpen ? (
              <Minus className="text-electric-violet h-3.5 w-3.5" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen
            ? "mt-2 grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-chrome-deep max-w-3xl pb-4 text-xs leading-relaxed sm:text-sm">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesFAQ() {
  return (
    <section className="border-steel-grey/20 bg-carbon-black relative z-20 border-b py-20 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="PREGUNTAS FRECUENTES"
          title="Claridad operativa y alcance técnico"
          description="Resolvemos dudas sobre nuestra forma de trabajo, entregables, metodologías y propiedad técnica."
          className="mb-12"
        />

        <div className="border-steel-grey/25 mx-auto mt-8 flex max-w-4xl flex-col border-t">
          {FAQS.map((faq, idx) => (
            <FAQCard key={idx} faq={faq} idx={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
