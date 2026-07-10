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
    <div className="lg:col-span-7">
      <form
        onSubmit={onSubmit}
        className="border-steel-grey -mx-4 space-y-6 rounded-none border-x-0 border-y p-6 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-4 md:p-8"
        style={{
          background: "linear-gradient(to bottom, var(--graphite-metal), var(--graphite-metal))",
        }}
        noValidate
      >
        <div className="border-steel-grey/30 mb-6 border-b pb-3">
          <h2 className="text-chrome-highlight text-lg font-bold tracking-wider uppercase">
            Mensaje directo
          </h2>
        </div>

        {submitStatus === "error" ? (
          <div className="rounded-lg border border-red-500/25 bg-red-500/10 p-4 text-xs text-red-400">
            Error al enviar el formulario. Por favor, verifica tu conexión e inténtalo de nuevo, o
            escríbenos directamente a {CONTACT_EMAIL}.
          </div>
        ) : null}

        <Input
          id="input-name"
          name="name"
          label="Nombre y apellido"
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
          <span className="text-chrome-highlight block text-xs font-medium tracking-wider uppercase">
            Motivo de contacto{" "}
            <sup
              aria-hidden="true"
              className="ml-0.5 font-sans text-[10px] font-normal text-red-400 select-none"
            >
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
          placeholder="Cuéntanos brevemente sobre tu producto o consulta..."
          required
          error={errors.message}
          hint={
            <div className="flex items-center justify-end gap-4">
              <span className={cn("text-xs tabular-nums transition-colors", charCountColor)}>
                {messageLength} / {CONTACT_MESSAGE_MAX_LENGTH} caracteres
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
            withArrow={!isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>Enviar mensaje</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
