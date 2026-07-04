import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { BRAND_FULL_NAME, CONTACT_EMAIL, BRAND_DOMAIN } from "@/data/brand";

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col bg-carbon-black pt-32 pb-20 md:pt-40 md:pb-28">
        <Container className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-chrome-highlight mb-4">
            Términos y Condiciones
          </h1>

          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-copy-muted leading-relaxed [&_h2]:text-chrome-highlight [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-chrome-highlight/90 [&_a]:text-neon-blue [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-chrome-highlight [&_a]:transition-colors">
            <p>
              Al acceder y utilizar el sitio web de <strong>{BRAND_FULL_NAME}</strong> ({BRAND_DOMAIN}),
              aceptás los siguientes términos y condiciones de uso.
            </p>

            <div className="bg-graphite-metal/30 border border-steel-grey/20 rounded-lg px-5 py-4 text-xs text-chrome-deep leading-relaxed space-y-1">
              <p><strong className="text-chrome-highlight/80">Razón social:</strong> VORELLO SAS</p>
              <p><strong className="text-chrome-highlight/80">RUT:</strong> 220921350012</p>
              <p><strong className="text-chrome-highlight/80">Domicilio:</strong> Paysandú, Uruguay</p>
            </div>

            <h2>1. Uso del sitio</h2>
            <p>
              Este sitio web tiene como propósito presentar los servicios, el proceso de trabajo
              y la información de contacto de {BRAND_FULL_NAME}. El contenido es informativo y
              no constituye una oferta contractual vinculante.
            </p>

            <h2>2. Propiedad intelectual</h2>
            <p>
              Todo el contenido del sitio — incluyendo diseño, textos, gráficos, logotipos,
              íconos, código fuente y estructura visual — es propiedad de {BRAND_FULL_NAME} o
              sus licenciantes. Queda prohibida su reproducción, distribución o modificación
              sin autorización expresa.
            </p>

            <h2>3. Limitación de responsabilidad</h2>
            <p>
              {BRAND_FULL_NAME} no garantiza la disponibilidad ininterrumpida del sitio ni
              se responsabiliza por errores u omisiones en el contenido. El uso del sitio
              es bajo tu propia responsabilidad.
            </p>

            <h2>4. Enlaces externos</h2>
            <p>
              El sitio puede contener enlaces a sitios web de terceros. {BRAND_FULL_NAME} no
              se responsabiliza por el contenido, políticas de privacidad o prácticas de
              dichos sitios externos.
            </p>

            <h2>5. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento.
              Los cambios serán efectivos a partir de su publicación en esta página.
            </p>

            <h2>6. Legislación aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República Oriental del Uruguay.
              Cualquier controversia será sometida a la jurisdicción de los tribunales
              competentes de Montevideo, Uruguay.
            </p>

            <h2>7. Contacto</h2>
            <p>
              Para consultas sobre estos términos, escribinos a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>

          <p className="text-right text-[11px] text-chrome-deep/50 font-mono mt-12 select-none">
            Última actualización: Julio 2026
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
