import React from "react";
import Link from "next/link";
import { Activity, Video, FileText, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL } from "@/data/brand";

const StartSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-4 space-y-8 order-2 lg:order-1 lg:mt-8">
      <div className="space-y-6">
        <h2 className="font-bebas text-xl text-chrome-highlight uppercase tracking-wider border-b border-steel-grey/30 pb-2">
          ¿Qué ocurrirá después?
        </h2>

        <ul className="space-y-6">
          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center shrink-0 text-[#FF6B00] mt-0.5">
              <Activity className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-chrome-highlight text-sm">1. Evaluación en &lt; 24h</h3>
              <p className="text-xs sm:text-xs text-muted-foreground leading-relaxed mt-1 text-balance">
                <span className="font-medium">
                  Revisamos tu solicitud técnicamente para comprobar la compatibilidad de plazos, presupuesto y arquitectura requerida.
                </span>
                <br />
                <span className="opacity-90">
                  Analizamos la viabilidad antes de coordinar llamadas.
                </span>
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center shrink-0 text-neon-blue mt-0.5">
              <Video className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-chrome-highlight text-sm">2. Sesión de descubrimiento</h3>
              <p className="text-xs sm:text-xs text-muted-foreground leading-relaxed mt-1 text-balance">
                <span className="font-medium">
                  Si hay un buen encaje técnico y comercial, coordinamos una videollamada corta de 20 minutos.
                </span>
                <br />
                <span className="opacity-90">Nos servirá para conocernos, profundizar en el alcance y resolver dudas iniciales.</span>
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-semibold text-chrome-highlight text-sm">3. Propuesta formal</h3>
              <p className="text-xs sm:text-xs text-muted-foreground leading-relaxed mt-1 text-balance">
                <span className="font-medium">Recibirás una propuesta detallada con arquitectura recomendada, desglose de hitos de entrega y costo final cerrado.</span><br />
                <span className="opacity-90">Todo transparente y detallado.</span>
              </p>
            </div>
          </li>
        </ul>
      </div>

      <hr className="w-full border-steel-grey/30" />

      {/* Trust message */}
      <div className="bg-graphite-metal/20 border border-steel-grey/30 rounded-xl p-5 backdrop-blur-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-medium text-balance text-sm">Compromiso de confidencialidad</span>
        </div>
        <p className="text-xs sm:text-xs text-[#8F9BA8] leading-relaxed text-balance">
          <span className="text-balance">Vorello no compartirá tus datos comerciales ni las ideas del proyecto con terceros.</span><br />
          <span className="text-balance opacity-90">Completar este formulario no implica ninguna aceptación automática ni compromiso financiero.</span>
        </p>
      </div>

      {/* Secondary contact */}
      <div className="text-xs text-[#8F9BA8] leading-relaxed space-y-2">
        <p>
          ¿Tienes dudas generales o una propuesta de colaboración que no encaja aquí?
        </p>
        <p>
          Escríbenos directamente a <a href={`mailto:${CONTACT_EMAIL}`} className="text-neon-blue hover:underline font-medium">{CONTACT_EMAIL}</a> o visita nuestra página de <Link href="/contact" className="text-electric-violet hover:underline font-medium">contacto directo</Link>.
        </p>
      </div>
    </div>
  );
};

export default StartSidebar;
