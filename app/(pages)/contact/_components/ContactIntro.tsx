import Eyebrow from "@/components/ui/Eyebrow";

export default function ContactIntro() {
  return (
    <div className="mb-6 max-w-3xl md:mb-12">
      <Eyebrow className="mb-4 block">
        CONTACTO DIRECTO
      </Eyebrow>
      <h1 className="mb-4 text-balance font-bebas text-4xl uppercase tracking-wide text-chrome-highlight sm:text-5xl lg:text-6xl">
        ¿Cómo podemos ayudarte?
      </h1>
      <p className="text-balance text-sm leading-relaxed text-copy-muted sm:text-base">
        Dudas sobre nuestros servicios, propuestas de colaboración o consultas técnicas. Elige el canal que mejor se adapte o envíanos un mensaje directo.
      </p>
    </div>
  );
}
