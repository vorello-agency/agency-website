import Link from "next/link";
import { Info, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL } from "@/data/brand";
import Container from "@/components/layout/Container";
import TechScaleDivider from "@/components/layout/TechScaleDivider";
import type { UseStartFormReturn } from "../_lib/use-start-form";
import StartForm from "./StartForm";
import type { StartFormProps } from "./StartForm";
import StartIntro from "./StartIntro";
import StartSidebar from "./StartSidebar";

interface StartContentProps extends StartFormProps {
  setFormElement: UseStartFormReturn["setFormElement"];
}

export default function StartContent({
  setFormElement,
  ...startFormProps
}: StartContentProps) {
  return (
    <div className="mt-4" ref={setFormElement}>
      <Container className="relative z-10 px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
        <StartIntro />
      </Container>

      <div className="w-full bg-linear-to-b from-transparent to-carbon-black/80 relative z-10 py-10 md:py-14">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-12 lg:gap-14">
            <StartForm {...startFormProps} />
            <StartSidebar />
          </div>
        </Container>
      </div>

      <div className="w-full bg-linear-to-t from-transparent to-carbon-black relative z-10 pb-8 md:pb-12">
        <TechScaleDivider index={1} />

        <Container className="px-4 sm:px-6 lg:px-8 mt-10 md:mt-14">
          <div className="grid grid-cols-1 gap-8 md:gap-10 max-w-2xl lg:max-w-none lg:grid-cols-2 lg:gap-14 pb-8 md:pb-12">
            {/* Texto de dudas generales */}
            <div className="text-sm text-copy-muted leading-relaxed space-y-4 lg:pr-12 flex flex-col justify-center">
              <h3 className="text-base font-bold uppercase tracking-wider text-chrome-highlight">
                Canales alternativos y dudas
              </h3>
              <p className="text-pretty">
                Este formulario está diseñado para iniciar el relevamiento técnico y el diseño de tu <strong>propuesta técnica</strong> de forma estructurada.
              </p>
              <p className="text-pretty">
                Si tu idea se encuentra en una etapa muy temprana, si deseas proponer una colaboración estratégica, o simplemente prefieres conversar sin completar los pasos técnicos, estamos abiertos a escucharte.
              </p>
              <p className="text-pretty">
                Escríbenos de forma directa a{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-neon-blue hover:underline font-medium transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                o agenda un contacto simple a través de nuestra página de{" "}
                <Link
                  href="/contact"
                  className="text-electric-violet hover:underline font-medium transition-colors"
                >
                  contacto directo
                </Link>
                .
              </p>
            </div>

            {/* Card de envio y confidencialidad */}
            <div className="bg-graphite-metal border border-steel-grey rounded-2xl p-6 backdrop-blur-md flex flex-col justify-evenly gap-4">
              {/* Item 1: No commitment */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-electric-violet shrink-0" />
                  <span className="font-semibold text-chrome-highlight text-sm">
                    Envío del formulario
                  </span>
                </div>
                <p className="text-xs sm:text-xs text-copy-muted/90 leading-relaxed text-pretty">
                  Completar este formulario no implica ninguna aceptación automática ni compromiso financiero.
                </p>
              </div>

              <hr className="border-steel-grey/20" />

              {/* Item 2: Confidentiality */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neon-blue shrink-0" />
                  <span className="font-semibold text-chrome-highlight text-sm">
                    Compromiso de confidencialidad
                  </span>
                </div>
                <p className="text-xs sm:text-xs text-copy-muted/90 leading-relaxed text-balance">
                  Vorello no compartirá tus datos comerciales ni las ideas del proyecto con terceros.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
