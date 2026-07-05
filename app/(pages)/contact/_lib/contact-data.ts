import { CONTACT_EMAIL, CALENDAR_URL, getWhatsAppLink } from "@/data/brand";
import React from "react";

export interface ContactFormData {
  name: string;
  email: string;
  reason: string;
  message: string;
}

export type ContactSubmitStatus = "idle" | "success" | "error";

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export type ContactReason = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  muted?: boolean;
};

export type ContactChannelTone = "whatsapp" | "email" | "calendar";

export type ContactChannel = {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  tone: ContactChannelTone;
  external?: boolean;
  badge?: string;
};

export const CONTACT_STORAGE_KEY = "vorello-contact-draft";
export const CONTACT_MESSAGE_MAX_LENGTH = 1000;

export const INITIAL_CONTACT_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  reason: "",
  message: "",
};

export const CONTACT_REASONS: readonly ContactReason[] = [
  { id: "consultar-proyecto", label: "Quiero consultar por un proyecto" },
  { id: "orientacion-servicio", label: "Necesito orientación sobre un servicio" },
  { id: "propuesta-colaboracion", label: "Propuesta de colaboración o alianzas" },
  { id: "consulta-tecnica", label: "Consulta técnica o de arquitectura" },
  { id: "consulta-general", label: "Tengo una consulta general", muted: true },
  { id: "otro", label: "Otro motivo", muted: true },
] as const;

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "whatsapp",
    title: "Escríbenos por WhatsApp",
    description:
      "Canal directo para consultas rápidas sobre servicios, disponibilidad y próximos pasos.",
    actionLabel: "Iniciar chat de WhatsApp",
    href: getWhatsAppLink(),
    tone: "whatsapp",
    external: true,
  },
  {
    id: "email",
    title: "Correo electrónico",
    description: "Para consultas sobre servicios, propuestas de negocios, colaboraciones formales y prensa.",
    actionLabel: "Enviar correo electrónico",
    href: `mailto:${CONTACT_EMAIL}`,
    tone: "email",
    badge: CONTACT_EMAIL,
  },
  {
    id: "calendar",
    title: "Agendar llamada técnica",
    description:
      "Reserva 15 minutos en nuestra agenda para una conversación técnica inicial sin compromiso.",
    actionLabel: "Reservar reunión de 15 minutos",
    href: CALENDAR_URL,
    tone: "calendar",
    external: true,
  },
];
