import Eyebrow from "@/components/ui/Eyebrow";

export default function StartIntro() {
  return (
    <div className="mb-6 max-w-4xl md:mb-12">
      <Eyebrow className="mb-4 block">CUENTANOS QUE TIENES EN MENTE</Eyebrow>
      <h1 className="text-chrome-highlight mb-4 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl md:text-6xl 2xl:text-6xl">
        Solicitar propuesta técnica
      </h1>
      <p className="text-muted-foreground text-sm text-balance sm:text-base">
        Esta información nos permite analizar la viabilidad técnica y diseñar una propuesta técnica
        personalizada, con arquitectura recomendada, desglose de entregables y costo final cerrado.
      </p>
    </div>
  );
}
