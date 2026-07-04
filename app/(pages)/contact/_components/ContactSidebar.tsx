import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Mail, Sparkles } from "lucide-react";

import {
  CONTACT_CHANNELS,
  type ContactChannel,
  type ContactChannelTone,
} from "../_lib/contact-data";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CHANNEL_TONE_CLASSES: Record<
  ContactChannelTone,
  {
    card: string;
    icon: string;
    title: string;
    action: string;
    ring: string;
  }
> = {
  whatsapp: {
    card: "hover:border-whatsapp-green/40 hover:bg-graphite-metal/30 hover:shadow-[0_0_20px_rgba(37,211,102,0.08)]",
    icon: "border-whatsapp-green/20 bg-whatsapp-green/10 group-hover:bg-whatsapp-green/20",
    title: "group-hover:text-whatsapp-green",
    action: "text-whatsapp-green",
    ring: "focus-visible:ring-whatsapp-green/50",
  },
  email: {
    card: "hover:border-signal-orange/40 hover:bg-graphite-metal/30 hover:shadow-[0_0_20px_rgba(255,107,0,0.08)]",
    icon: "border-signal-orange/20 bg-signal-orange/10 text-signal-orange group-hover:bg-signal-orange group-hover:text-white",
    title: "group-hover:text-signal-orange",
    action: "text-signal-orange",
    ring: "focus-visible:ring-signal-orange/50",
  },
  calendar: {
    card: "hover:border-neon-blue/40 hover:bg-graphite-metal/30 hover:shadow-[0_0_20px_rgba(45,143,255,0.08)]",
    icon: "border-neon-blue/20 bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue group-hover:text-white",
    title: "group-hover:text-neon-blue",
    action: "text-neon-blue",
    ring: "focus-visible:ring-neon-blue/50",
  },
};

function ContactChannelIcon({ tone }: { tone: ContactChannelTone }) {
  if (tone === "whatsapp") {
    return (
      <Image
        src="/assets/whatsapp.svg"
        alt="WhatsApp"
        width={22}
        height={22}
        className="h-[22px] w-[22px]"
      />
    );
  }

  if (tone === "calendar") {
    return <Calendar className="h-5 w-5" />;
  }

  return <Mail className="h-5 w-5" />;
}

function ContactChannelCard({ channel }: { channel: ContactChannel }) {
  const tone = CHANNEL_TONE_CLASSES[channel.tone];

  return (
    <a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noopener noreferrer" : undefined}
      className={cn(
        "group block rounded-xl border border-steel-grey/30 bg-graphite-metal/20 p-5 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2",
        tone.ring,
        tone.card
      )}
    >
      <div className="flex gap-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all",
            tone.icon
          )}
        >
          <ContactChannelIcon tone={channel.tone} />
        </div>
        <div>
          <h3
            className={cn(
              "text-sm font-semibold text-chrome-highlight transition-colors sm:text-base",
              tone.title
            )}
          >
            {channel.title}
          </h3>
          <p className="mt-1 text-balance text-xs leading-relaxed text-copy-muted">
            {channel.description}
          </p>
          {channel.badge ? (
            <>
              <span className="mt-2 inline-block rounded border border-steel-grey/50 bg-steel-grey/35 px-2 py-0.5 text-xs text-chrome-highlight/85">
                {channel.badge}
              </span>
              <br />
            </>
          ) : null}
          <span className={cn("mt-3 inline-flex items-center gap-1 text-xs font-semibold", tone.action)}>
            {channel.actionLabel}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function ContactSidebar() {
  return (
    <div className="order-2 space-y-8 lg:order-1 lg:col-span-5 lg:pt-8">
      <div className="space-y-6">
        <h2 className="border-b border-steel-grey/30 pb-2 font-bebas text-xl uppercase tracking-wider text-chrome-highlight">
          Canales de comunicación
        </h2>

        <div className="space-y-4">
          {CONTACT_CHANNELS.map((channel) => (
            <ContactChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-electric-violet/20 bg-electric-violet/[0.03] p-5 backdrop-blur-sm">
        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-electric-violet/5 blur-2xl" />

        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-chrome-highlight sm:text-base">
          <Sparkles className="h-4 w-4 text-electric-violet" />
          ¿Listo para iniciar tu proyecto?
        </h3>
        <p className="mb-4 text-balance text-xs leading-relaxed text-copy-muted">
          Si necesitas una propuesta formal con arquitectura, plazos y presupuesto cerrado, usa nuestro formulario técnico de proyecto.
        </p>
        <Link href="/start" className="focus-visible:outline-none">
          <Button
            variant="secondary"
            size="sm"
            withArrow
            className="group relative bg-graphite-metal border border-steel-grey/60 text-chrome-highlight hover:border-electric-violet/60 hover:bg-electric-violet/[0.04] hover:shadow-[0_0_15px_rgba(123,76,255,0.2)] flex items-center justify-center transition-all duration-300 w-full py-2 text-xs sm:w-auto"
          >
            Iniciar solicitud de proyecto
          </Button>
        </Link>
      </div>
    </div>
  );
}
