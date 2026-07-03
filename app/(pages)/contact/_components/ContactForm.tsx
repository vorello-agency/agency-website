import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import {
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_REASONS,
  type ContactFormData,
  type ContactFormErrors,
  type ContactSubmitStatus,
} from "../_lib/contact-data";
import Button from "@/components/ui/Button";
import Input from "@/components/forms/Input";
import TextArea from "@/components/forms/TextArea";
import CardSelector from "@/components/forms/CardSelector";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/data/brand";

interface ContactFormProps {
  charCountColor: string;
  errors: ContactFormErrors;
  formData: ContactFormData;
  isSubmitting: boolean;
  messageLength: number;
  submitStatus: ContactSubmitStatus;
  onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onReasonSelect: (value: string) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function ContactForm({
  charCountColor,
  errors,
  formData,
  isSubmitting,
  messageLength,
  submitStatus,
  onInputChange,
  onReasonSelect,
  onSubmit,
}: ContactFormProps) {
  return (
    <div className="order-1 lg:order-2 lg:col-span-7">
      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-none border-y border-x-0 sm:rounded-2xl sm:border-x border-steel-grey/30 bg-graphite-metal/30 p-6 backdrop-blur-md sm:p-8 -mx-4 sm:mx-0"
        noValidate
      >
        <h2 className="mb-6 border-b border-steel-grey/30 pb-3 text-base font-bold uppercase tracking-wider text-chrome-highlight">
          Mensaje directo
        </h2>

        {submitStatus === "error" ? (
          <div className="rounded-lg border border-red-500/25 bg-red-500/10 p-4 text-xs text-red-400">
            Error al enviar el formulario. Por favor, verifica tu conexión e inténtalo de nuevo, o escríbenos directamente a {CONTACT_EMAIL}.
          </div>
        ) : null}

        <Input
          id="input-name"
          name="name"
          label="Tu nombre completo"
          type="text"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Ej. Jane Smith"
          required
          error={errors.name}
        />

        <Input
          id="input-email"
          name="email"
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="Ej: nombre@empresa.com"
          required
          error={errors.email}
        />

        <div id="group-reason" className="space-y-2">
          <span className="block text-xs font-medium uppercase tracking-wider text-chrome-highlight">
            Motivo de contacto{" "}
            <sup aria-hidden="true" className="ml-0.5 select-none font-sans text-[10px] font-normal text-red-400">
              *
            </sup>
          </span>
          <CardSelector
            id="input-reason"
            cardIdPrefix="reason"
            options={CONTACT_REASONS}
            value={formData.reason}
            onChange={onReasonSelect}
            error={errors.reason}
            theme="violet"
            cardSize="sm"
            columnsClass="grid grid-cols-1 sm:grid-cols-2 gap-2"
            indicator="radio"
          />
        </div>

        <TextArea
          id="input-message"
          name="message"
          label="Mensaje o consulta"
          rows={5}
          value={formData.message}
          onChange={onInputChange}
          maxLength={CONTACT_MESSAGE_MAX_LENGTH}
          placeholder="Ej. Hola Vorello, me gustaría saber si tienen disponibilidad para..."
          required
          error={errors.message}
          hint={
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-chrome-deep">Mínimo 10 caracteres.</p>
              <span className={cn("text-xs tabular-nums transition-colors", charCountColor)}>
                {messageLength} / {CONTACT_MESSAGE_MAX_LENGTH}
              </span>
            </div>
          }
        />

        <div className="flex flex-col pt-2 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            variant="primary-blue"
            size="md"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar mensaje
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
