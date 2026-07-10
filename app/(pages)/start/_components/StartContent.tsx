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

export default function StartContent({ setFormElement, ...startFormProps }: StartContentProps) {
  return (
    <div className="mt-4" ref={setFormElement}>
      <Container className="relative z-10 mb-10 md:mb-14">
        <StartIntro />
      </Container>

      <div className="to-carbon-black/80 relative z-10 w-full bg-linear-to-b from-transparent py-10 md:py-14">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-12 lg:gap-14">
            <StartForm {...startFormProps} />
            <StartSidebar />
          </div>
        </Container>
      </div>

      <div className="to-carbon-black relative z-10 w-full bg-linear-to-t from-transparent pb-8 md:pb-12">
        <TechScaleDivider index={1} />

        <Container className="mt-10 md:mt-14">
          <div className="grid max-w-2xl grid-cols-1 gap-8 pb-8 md:gap-10 md:pb-12 lg:max-w-none lg:grid-cols-2 lg:gap-14">
            {/* Texto de dudas generales */}
            <div className="text-copy-muted flex flex-col justify-center space-y-4 text-sm leading-relaxed lg:pr-12">
              <h3 className="text-chrome-highlight text-base font-bold tracking-wider uppercase">
                Canales alternativos y dudas
              </h3>
              <p className="text-pretty">
                Este formulario está diseñado para iniciar el relevamiento técnico y el diseño de tu{" "}
                <strong>propuesta técnica</strong> de forma estructurada.
              </p>
              <p className="text-pretty">
                Si tu idea se encuentra en una etapa muy temprana, si deseas proponer una
                colaboración estratégica, o simplemente prefieres conversar sin completar los pasos
                técnicos, estamos abiertos a escucharte.
              </p>
              <p className="text-pretty">
                Escríbenos de forma directa a{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-neon-blue font-medium transition-colors hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                o agenda un contacto simple a través de nuestra página de{" "}
                <Link
                  href="/contact"
                  className="text-electric-violet font-medium transition-colors hover:underline"
                >
                  contacto directo
                </Link>
                .
              </p>
            </div>

            {/* Card de envio y confidencialidad */}
            <div className="bg-graphite-metal border-steel-grey flex flex-col justify-evenly gap-4 rounded-2xl border p-6 backdrop-blur-md">
              {/* Item 1: No commitment */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Info className="text-electric-violet h-4 w-4 shrink-0" />
                  <span className="text-chrome-highlight text-sm font-semibold">
                    Envío del formulario
                  </span>
                </div>
                <p className="text-copy-muted/90 text-xs leading-relaxed text-pretty sm:text-xs">
                  Completar este formulario no implica ninguna aceptación automática ni compromiso
                  financiero.
                </p>
              </div>

              <hr className="border-steel-grey/20" />

              {/* Item 2: Confidentiality */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-neon-blue h-4 w-4 shrink-0" />
                  <span className="text-chrome-highlight text-sm font-semibold">
                    Compromiso de confidencialidad
                  </span>
                </div>
                <p className="text-copy-muted/90 text-xs leading-relaxed text-balance sm:text-xs">
                  Vorello no compartirá tus datos comerciales ni las ideas del proyecto con
                  terceros.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
