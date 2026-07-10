import Eyebrow from "@/components/ui/Eyebrow";

export default function ContactIntro() {
  return (
    <div className="mb-6 max-w-3xl md:mb-12">
      <Eyebrow className="mb-4 block">CANALES DE CONTACTO</Eyebrow>
      <h1 className="text-chrome-highlight mb-4 text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl md:text-6xl 2xl:text-6xl">
        Contacto
      </h1>
      <p className="text-muted-foreground text-sm text-balance sm:text-base">
        Tanto si buscas iniciar un proyecto, proponer una alianza o resolver una consulta técnica,
        selecciona la vía que prefieras o envíanos un mensaje directo.
      </p>
    </div>
  );
}
