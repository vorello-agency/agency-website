import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import {
  CONTACT_EMAIL,
  WHATSAPP_HUMAN_NUMBER,
  getWhatsAppLink,
  WHATSAPP_MSG_GENERAL,
} from "@/data/brand";
import Eyebrow from "@/components/ui/Eyebrow";

interface StartSuccessProps {
  name: string;
  company: string;
}

const StartSuccess: React.FC<StartSuccessProps> = ({ name, company }) => {
  const firstName = name.trim().split(" ")[0];
  const whatsappUrl = getWhatsAppLink(WHATSAPP_MSG_GENERAL);

  return (
    <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-graphite-metal border-steel-grey animate-in fade-in zoom-in mx-auto mt-6 max-w-2xl rounded-2xl border p-8 text-center backdrop-blur-md duration-500 sm:p-12">
        <div className="bg-signal-emerald/10 border-signal-emerald/20 text-signal-emerald mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <Eyebrow variant="green" className="mb-2 block">
          SOLICITUD RECIBIDA
        </Eyebrow>
        <h1 className="text-chrome-highlight mb-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          ¡Gracias por contarnos sobre tu proyecto, {firstName}!
        </h1>
        <p className="text-chrome-deep mx-auto mb-8 max-w-xl text-xs leading-relaxed text-balance sm:text-sm">
          Registramos los datos de <strong className="text-chrome-highlight">{company}</strong>{" "}
          correctamente. Revisaremos la información para responderte con una primera orientación
          clara.
        </p>

        <div className="bg-steel-grey/10 border-steel-grey/30 mx-auto mb-8 max-w-lg space-y-4 rounded-xl border p-6 text-left">
          <div>
            <h3 className="text-electric-violet mb-1 text-xs font-bold tracking-wider uppercase">
              PRÓXIMOS PASOS
            </h3>
            <p className="text-copy-muted text-xs leading-relaxed text-balance">
              Si vemos que existe un buen encaje con nuestra metodología y tecnologías,
              coordinaremos una reunión para avanzar sobre alcance, tiempos y próximos pasos.
            </p>
          </div>

          <div className="border-steel-grey/20 border-t pt-4">
            <h3 className="text-electric-violet mb-1 text-xs font-bold tracking-wider uppercase">
              TIEMPO ESTIMADO DE RESPUESTA
            </h3>
            <p className="text-copy-muted text-xs leading-relaxed text-balance">
              Respondemos normalmente dentro de las próximas{" "}
              <strong className="text-chrome-highlight">24 horas hábiles</strong>.
            </p>
          </div>
        </div>

        <div className="text-chrome-deep mb-10 text-xs">
          ¿Querés realizar alguna consulta adicional o contactarnos directamente?
          <div className="text-chrome-highlight mt-2 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:text-electric-violet flex items-center gap-2 transition-colors focus-visible:outline-none"
            >
              <Mail className="h-4 w-4" />
              {CONTACT_EMAIL}
            </a>
            <span className="text-steel-grey/50">|</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-signal-emerald flex items-center gap-2 transition-colors focus-visible:outline-none"
            >
              <MessageSquare className="h-4 w-4" />
              {WHATSAPP_HUMAN_NUMBER}
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="focus-visible:outline-none">
            <Button size="lg" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default StartSuccess;
