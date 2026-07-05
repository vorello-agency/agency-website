import Eyebrow from "@/components/ui/Eyebrow";

export default function ContactIntro() {
  return (
    <div className="mb-6 max-w-3xl md:mb-12">
      <Eyebrow className="mb-4 block">
        ¿CÓMO PODEMOS AYUDARTE?
      </Eyebrow>
      <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-6xl font-bold tracking-tight text-chrome-highlight mb-4 leading-tight text-balance">
        Contacto
      </h1>
      <p className="text-balance text-sm text-muted-foreground sm:text-base">
        Tanto si buscas iniciar un proyecto, proponer una alianza o resolver una consulta técnica, selecciona la vía que prefieras o envíanos un mensaje directo.
      </p>
    </div>
  );
}
