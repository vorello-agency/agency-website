import React from "react";
import Link from "next/link";
import { Globe, Rocket } from "lucide-react";

import { SOCIAL_LINKS } from "@/data/brand";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = {
  linkedin: (
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  ),
  github: (
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  ),
  behance: (
    <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
  ),
  instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  ),
};

interface SocialPillProps {
  href: string;
  label: string;
  iconKey: keyof typeof SOCIAL_ICONS;
  hoverClasses: string;
}

function SocialPill({ href, label, iconKey, hoverClasses }: SocialPillProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-steel-grey/30 bg-graphite-metal/40 px-3 py-2 text-xs font-semibold text-copy-muted transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-blue hover:-translate-y-0.5",
        hoverClasses
      )}
    >
      <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        {SOCIAL_ICONS[iconKey]}
      </svg>
      <span>{label}</span>
    </a>
  );
}

export default function ContactFooterCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Card 1: ¿Listo para iniciar tu proyecto? */}
      <div className="relative overflow-hidden rounded-xl border border-electric-violet/20 bg-electric-violet/3 p-6 backdrop-blur-sm">
        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-electric-violet/5 blur-2xl" />

        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-chrome-highlight sm:text-base">
          <Rocket className="h-4 w-4 text-electric-violet" />
          ¿Listo para iniciar tu proyecto?
        </h3>
        <p className="mb-4 text-balance text-xs leading-relaxed text-copy-muted">
          Si necesitas una propuesta técnica con arquitectura, plazos y presupuesto cerrado, usa nuestro formulario técnico de proyecto.
        </p>
        <Link href="/start" className="focus-visible:outline-none">
          <Button
            variant="secondary"
            size="sm"
            withArrow
            className="group relative bg-graphite-metal border border-steel-grey/60 text-chrome-highlight hover:border-electric-violet/60 hover:bg-electric-violet/[0.04] hover:shadow-[0_0_15px_rgba(123,76,255,0.2)] flex items-center justify-center transition-all duration-300 w-full py-2 text-xs sm:w-auto"
          >
            Solicitar propuesta técnica
          </Button>
        </Link>
      </div>

      {/* Card 2: Ecosistema y Redes profesionales */}
      <div className="relative overflow-hidden rounded-xl border border-neon-blue/20 bg-neon-blue/3 p-6 backdrop-blur-sm">
        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-neon-blue/5 blur-2xl" />

        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-chrome-highlight sm:text-base">
          <Globe className="h-4 w-4 text-neon-blue" />
          Conectemos por redes
        </h3>
        <p className="mb-4 text-balance text-xs leading-relaxed text-copy-muted">
          Conéctate con nosotros en redes para conocer más de nuestro día a día, contribuciones técnicas de código abierto y portafolio de diseño.
        </p>

        <div className="flex flex-wrap gap-3">
          <SocialPill
            href={SOCIAL_LINKS.linkedin}
            label="LinkedIn"
            iconKey="linkedin"
            hoverClasses="hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/5 hover:text-[#0a66c2] hover:shadow-[0_0_15px_rgba(10,102,194,0.15)]"
          />
          <SocialPill
            href={SOCIAL_LINKS.instagram}
            label="Instagram"
            iconKey="instagram"
            hoverClasses="hover:border-[#e1306c]/40 hover:bg-[#e1306c]/5 hover:text-[#e1306c] hover:shadow-[0_0_15px_rgba(225,48,108,0.15)]"
          />
          <SocialPill
            href={SOCIAL_LINKS.behance}
            label="Behance"
            iconKey="behance"
            hoverClasses="hover:border-[#1769ff]/40 hover:bg-[#1769ff]/5 hover:text-[#1769ff] hover:shadow-[0_0_15px_rgba(23,105,255,0.15)]"
          />
          <SocialPill
            href={SOCIAL_LINKS.github}
            label="GitHub"
            iconKey="github"
            hoverClasses="hover:border-chrome-highlight/40 hover:bg-chrome-highlight/5 hover:text-chrome-highlight hover:shadow-[0_0_15px_rgba(227,231,238,0.1)]"
          />
        </div>
      </div>
    </div>
  );
}
