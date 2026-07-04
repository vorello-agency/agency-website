import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import Button from "@/components/ui/Button";

interface ContactSuccessProps {
  name: string;
  reasonLabel: string;
}

export default function ContactSuccess({ name, reasonLabel }: ContactSuccessProps) {
  const firstName = name.trim().split(" ")[0];

  return (
    <div className="mx-auto mt-6 max-w-2xl animate-in rounded-2xl border border-steel-grey/30 bg-graphite-metal/30 p-8 text-center backdrop-blur-md fade-in zoom-in duration-500 sm:p-12">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-signal-emerald/20 bg-signal-emerald/10 text-signal-emerald">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-signal-emerald">
        {"// MENSAJE ENVIADO"}
      </span>
      <h1 className="mb-4 text-balance font-bebas text-3xl tracking-tight text-chrome-highlight sm:text-4xl">
        ¡Mensaje recibido, {firstName}!
      </h1>
      <p className="mx-auto mb-8 max-w-xl text-balance text-xs leading-relaxed text-chrome-deep sm:text-sm">
        Hemos recibido tu consulta sobre{" "}
        <strong className="text-chrome-highlight">{reasonLabel}</strong>. Nuestro equipo revisará tu consulta y responderá en menos de{" "}
        <strong className="text-chrome-highlight">24 horas hábiles</strong>.
      </p>

      <div className="flex justify-center">
        <Link href="/" className="focus-visible:outline-none">
          <Button variant="secondary" size="lg">
            Volver a la Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
