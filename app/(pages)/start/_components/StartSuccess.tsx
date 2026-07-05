import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MessageSquare, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";
import { CONTACT_EMAIL, WHATSAPP_HUMAN_NUMBER, getWhatsAppLink, WHATSAPP_MSG_GENERAL } from "@/data/brand";
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
      <div className="max-w-2xl mx-auto bg-graphite-metal border border-steel-grey rounded-2xl p-8 sm:p-12 text-center backdrop-blur-md mt-6 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 rounded-full bg-signal-emerald/10 border border-signal-emerald/20 flex items-center justify-center mx-auto mb-6 text-signal-emerald">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <Eyebrow variant="green" className="mb-2 block">
          SOLICITUD RECIBIDA
        </Eyebrow>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-chrome-highlight mb-4 text-balance">
          ¡Gracias por contarnos sobre tu proyecto, {firstName}!
        </h1>
        <p className="text-chrome-deep text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed text-balance">
          Registramos los datos de <strong className="text-chrome-highlight">{company}</strong> correctamente.
          Revisaremos la información para responderte con una primera orientación clara.
        </p>

        <div className="bg-steel-grey/10 border border-steel-grey/30 rounded-xl p-6 mb-8 max-w-lg mx-auto text-left space-y-4">
          <div>
            <h3 className="text-xs text-electric-violet uppercase tracking-wider mb-1 font-bold">
              PRÓXIMOS PASOS
            </h3>
            <p className="text-xs text-copy-muted leading-relaxed text-balance">
              Si vemos que existe un buen encaje con nuestra metodología y tecnologías, coordinaremos una reunión para avanzar sobre alcance, tiempos y próximos pasos.
            </p>
          </div>

          <div className="border-t border-steel-grey/20 pt-4">
            <h3 className="text-xs text-electric-violet uppercase tracking-wider mb-1 font-bold">
              TIEMPO ESTIMADO DE RESPUESTA
            </h3>
            <p className="text-xs text-copy-muted leading-relaxed text-balance">
              Respondemos normalmente dentro de las próximas{" "}
              <strong className="text-chrome-highlight">24 horas hábiles</strong>.
            </p>
          </div>
        </div>

        <div className="mb-10 text-xs text-chrome-deep">
          ¿Querés realizar alguna consulta adicional o contactarnos directamente?
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-chrome-highlight">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 hover:text-electric-violet transition-colors focus-visible:outline-none"
            >
              <Mail className="w-4 h-4" />
              {CONTACT_EMAIL}
            </a>
            <span className="text-steel-grey/50">|</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-signal-emerald transition-colors focus-visible:outline-none"
            >
              <MessageSquare className="w-4 h-4" />
              {WHATSAPP_HUMAN_NUMBER}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="focus-visible:outline-none">
            <Button size="lg" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default StartSuccess;
