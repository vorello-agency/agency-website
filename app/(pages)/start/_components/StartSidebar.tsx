import React from "react";
import { Activity, Video, FileText } from "lucide-react";

const NEXT_STEPS = [
  {
    title: "1. Evaluación en < 24hs hábiles",
    description:
      "Revisamos tu solicitud técnicamente para comprobar la compatibilidad de plazos, presupuesto y arquitectura requerida.",
    detail: "Analizamos la viabilidad antes de coordinar llamadas.",
    icon: Activity,
    iconClassName:
      "border-signal-orange/20 bg-signal-orange/10 text-signal-orange",
  },
  {
    title: "2. Relevamiento de alcance",
    description:
      "Conversamos mediante una videollamada corta o resolvemos los detalles por correo, según prefieras.",
    detail:
      "El objetivo es relevar los requerimientos técnicos y de negocio sin interrumpir tu agenda.",
    icon: Video,
    iconClassName: "border-neon-blue/20 bg-neon-blue/10 text-neon-blue",
  },
  {
    title: "3. Propuesta técnica",
    description:
      "Recibirás un documento estructurado con el presupuesto final y la planificación de fases.",
    detail:
      "Una hoja de ruta clara y transparente para iniciar el desarrollo sin sorpresas ni costos ocultos.",
    icon: FileText,
    iconClassName:
      "border-signal-emerald/20 bg-signal-emerald/10 text-signal-emerald",
  },
] as const;

const StartSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-4 sm:pt-8">
      <div className="space-y-6 lg:space-y-12">
        <div className="border-b border-steel-grey/30 pb-3">
          <h2 className="text-lg font-bold uppercase tracking-wider text-chrome-highlight">
            ¿Qué ocurrirá después?
          </h2>
        </div>

        <ul className="space-y-6 max-w-2xl lg:max-w-none">
          {NEXT_STEPS.map(
            ({ title, description, detail, icon: Icon, iconClassName }) => (
              <li key={title} className="flex gap-4">
                <div
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${iconClassName}`}
                >
                  <Icon className="size-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-chrome-highlight">
                    {title}
                  </h3>
                  <p className="text-balance text-xs leading-relaxed text-muted-foreground sm:text-xs">
                    <span className="font-medium">{description}</span>
                    <br />
                    <span className="opacity-90">{detail}</span>
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default StartSidebar;
