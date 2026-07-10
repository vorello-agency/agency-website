import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ServicesGlobalCTA() {
  return (
    <div className="services-global-cta border-steel-grey/20 mt-12 flex flex-col gap-6 border-t pt-10 md:mt-16 md:flex-row md:items-center md:justify-between md:pt-12 2xl:mt-20">
      {/* Start: Content */}
      <div className="max-w-xl">
        <h4 className="text-chrome-highlight mb-1.5 text-lg font-bold tracking-tight md:text-xl">
          Sistemas pensados para funcionar y escalar.
        </h4>
        <p className="text-copy-muted text-sm text-balance leading-relaxed">
          Conoce el alcance detallado de nuestras áreas de enfoque y la ingeniería que respalda nuestra ejecución.
        </p>
      </div>

      {/* End: Action Buttons */}
      <div className="flex flex-col gap-3 xs:flex-row md:shrink-0">
        <Link href="/services" className="focus-visible:outline-none">
          <Button variant="secondary" size="md" className="w-full xs:w-auto">
            Explorar servicios
          </Button>
        </Link>
        <Link href="/start" className="focus-visible:outline-none">
          <Button variant="primary-blue" size="md" className="w-full xs:w-auto" withArrow>
            Solicitar propuesta técnica
          </Button>
        </Link>
      </div>
    </div>
  );
}
