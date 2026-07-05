import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Mail } from "lucide-react";

import {
  CONTACT_CHANNELS,
  type ContactChannel,
  type ContactChannelTone,
} from "../_lib/contact-data";
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
    card: "hover:border-electric-violet/40 hover:bg-graphite-metal/30 hover:shadow-[0_0_20px_rgba(255,107,0,0.08)]",
    icon: "border-electric-violet/20 bg-electric-violet/10 text-electric-violet group-hover:bg-electric-violet group-hover:text-white",
    title: "group-hover:text-electric-violet",
    action: "text-electric-violet",
    ring: "focus-visible:ring-electric-violet/50",
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
        width={20}
        height={20}
        className="h-5 w-5"
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
        "group block rounded-xl border border-steel-grey/30 bg-graphite-metal/20 p-4 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2",
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
          <span className={cn("mt-4 inline-flex items-center gap-1 text-xs font-semibold", tone.action)}>
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
    <div className="space-y-8 lg:col-span-5 sm:pt-8">
      <div className="space-y-8">
        <div className="border-b border-steel-grey/30 pb-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-chrome-highlight">
            Otros canales de contacto
          </h2>
        </div>

        <div className="space-y-4">
          {CONTACT_CHANNELS.map((channel) => (
            <ContactChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>
    </div>
  );
}
