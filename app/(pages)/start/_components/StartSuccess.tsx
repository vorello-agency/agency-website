import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

interface StartSuccessProps {
  name: string;
  company: string;
}

const StartSuccess: React.FC<StartSuccessProps> = ({ name, company }) => {
  const firstName = name.trim().split(" ")[0];

  return (
    <div className="max-w-2xl mx-auto bg-graphite-metal border border-steel-grey rounded-2xl p-8 sm:p-12 text-center backdrop-blur-md mt-6 animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-2">
        {"// SOLICITUD ENVIADA"}
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-chrome-highlight mb-4 text-balance">
        ¡Gracias por confiar en Vorello, {firstName}!
      </h1>
      <p className="text-chrome-deep text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed text-balance">
        Hemos registrado el onboarding de tu proyecto para{" "}
        <strong className="text-chrome-highlight">{company}</strong>.
        <br />
        Nuestro equipo evaluará los detalles técnicos y comerciales y te responderá con una primera orientación en menos de{" "}
        <strong className="text-chrome-highlight">24 horas hábiles</strong>.
      </p>

      <div className="bg-steel-grey/10 border border-steel-grey/30 rounded-xl p-5 mb-10 max-w-md mx-auto text-left">
        <h3 className="text-xs text-electric-violet uppercase tracking-wider mb-2 font-bold">
          PRÓXIMO PASO:
        </h3>
        <p className="text-xs text-[#8F9BA8] leading-relaxed text-balance">
          Si tu proyecto tiene un buen encaje con nuestra metodología y tecnologías, te enviaremos un enlace personalizado para coordinar una llamada corta de descubrimiento y definir el alcance inicial.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="focus-visible:outline-none">
          <Button size="lg" className="w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>
        <Link href="/contact" className="focus-visible:outline-none">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Mail className="w-4 h-4 mr-2" />
            Canales de comunicación
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StartSuccess;
