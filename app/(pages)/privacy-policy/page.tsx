import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { BRAND_FULL_NAME } from "@/data/brand";

const PRIVACY_EMAIL = "data@vorelloagency.com";

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col bg-carbon-black pt-32 pb-20 md:pt-40 md:pb-28">
        <Container className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-chrome-highlight mb-4">
            Política de Privacidad
          </h1>


          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-copy-muted leading-relaxed [&_h2]:text-chrome-highlight [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_strong]:text-chrome-highlight/90 [&_a]:text-neon-blue [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-chrome-highlight [&_a]:transition-colors">
            <p>
              En <strong>{BRAND_FULL_NAME}</strong> nos tomamos en serio la privacidad de nuestros
              usuarios y clientes. Esta política describe cómo recopilamos, usamos y protegemos
              tu información personal cuando interactuás con nuestro sitio web y servicios.
            </p>

            <div className="bg-graphite-metal/30 border border-steel-grey/20 rounded-lg px-5 py-4 text-xs text-chrome-deep leading-relaxed space-y-1">
              <p><strong className="text-chrome-highlight/80">Razón social:</strong> VORELLO SAS</p>
              <p><strong className="text-chrome-highlight/80">RUT:</strong> 220921350012</p>
              <p><strong className="text-chrome-highlight/80">Domicilio:</strong> Paysandú, Uruguay</p>
            </div>

            <h2>1. Información que recopilamos</h2>
            <p>
              Podemos recopilar información personal que nos proporcionás directamente, como tu
              nombre, dirección de correo electrónico y detalles del proyecto cuando completás
              un formulario de contacto o iniciás un proyecto con nosotros.
            </p>

            <h2>2. Uso de la información</h2>
            <p>
              Utilizamos tu información personal exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Responder a tus consultas y solicitudes</li>
              <li>Gestionar proyectos y comunicación comercial</li>
              <li>Mejorar nuestros servicios y experiencia de usuario</li>
              <li>Cumplir con obligaciones legales aplicables</li>
            </ul>

            <h2>3. Protección de datos</h2>
            <p>
              Implementamos medidas técnicas y organizativas razonables para proteger
              tu información personal contra acceso no autorizado, pérdida o alteración.
            </p>

            <h2>4. Cookies y tecnologías similares</h2>
            <p>
              Nuestro sitio puede utilizar cookies técnicas estrictamente necesarias para
              su funcionamiento. No utilizamos cookies de seguimiento ni compartimos
              información con terceros con fines publicitarios.
            </p>

            <h2>5. Tus derechos</h2>
            <p>
              Tenés derecho a acceder, rectificar o solicitar la eliminación de tus datos
              personales en cualquier momento. Para ejercer estos derechos, contactanos a{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
            </p>

            <h2>6. Contacto</h2>
            <p>
              Si tenés preguntas sobre esta política de privacidad, podés comunicarte con
              nosotros en{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
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
