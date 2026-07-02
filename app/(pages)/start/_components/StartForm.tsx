import React from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

import Button from "@/components/ui/Button";
import CardSelector from "@/components/forms/CardSelector";
import CountrySelect from "@/components/forms/CountrySelect";
import Input from "@/components/forms/Input";
import TextArea from "@/components/forms/TextArea";
import { BUDGET_RANGES, DEADLINES, PROJECT_TYPES } from "../_lib/start-data";
import type { UseStartFormReturn } from "../_lib/use-start-form";
import SelectionSummary from "./SelectionSummary";
import StepperNav from "./StepperNav";
import { CONTACT_EMAIL, WHATSAPP_HUMAN_NUMBER, getWhatsAppLink, WHATSAPP_MSG_START } from "@/data/brand";

const PhoneInput = dynamic(() => import("@/components/forms/PhoneInput"), {
  ssr: false,
  loading: () => (
    <div className="w-full space-y-2">
      <div className="h-4 w-20 animate-pulse rounded bg-steel-grey/20" />
      <div className="h-[46px] w-full animate-pulse rounded-lg border border-steel-grey/50 bg-carbon-black/50" />
    </div>
  ),
});

export type StartFormProps = Pick<
  UseStartFormReturn,
  | "countries"
  | "currentStep"
  | "errors"
  | "formData"
  | "handleBack"
  | "handleCountryChange"
  | "handleInputChange"
  | "handleNext"
  | "handlePhoneChange"
  | "handleSelectField"
  | "handleStepClick"
  | "handleSubmit"
  | "isAnimating"
  | "isSubmitting"
  | "messageLength"
  | "minChars"
  | "setStepContentElement"
  | "submitStatus"
  | "textareaPlaceholder"
>;

// ==========================================
// Sub-components for Form Steps (Local)
// ==========================================

interface StepOneContactInfoProps {
  formData: StartFormProps["formData"];
  errors: StartFormProps["errors"];
  countries: StartFormProps["countries"];
  isAnimating: StartFormProps["isAnimating"];
  handleInputChange: StartFormProps["handleInputChange"];
  handleCountryChange: StartFormProps["handleCountryChange"];
  handlePhoneChange: StartFormProps["handlePhoneChange"];
  handleNext: StartFormProps["handleNext"];
}

function StepOneContactInfo({
  formData,
  errors,
  countries,
  isAnimating,
  handleInputChange,
  handleCountryChange,
  handlePhoneChange,
  handleNext,
}: StepOneContactInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-base font-bold uppercase tracking-wider text-chrome-highlight">
          Información de Contacto
        </h2>
        <p className="text-balance text-xs leading-relaxed text-chrome-deep sm:text-xs">
          Por favor, facilítanos tus datos básicos para poder dirigirnos a ti de forma personalizada.
          <br />
          El teléfono nos sirve para coordinar de forma más ágil en caso de dudas.
        </p>
      </div>

      <Input
        id="input-name"
        name="name"
        label="Nombre y apellido"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Ej. Jane Smith"
        required
        error={errors.name}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="input-company"
          name="company"
          label="Empresa o marca"
          type="text"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Ej. Acme Corp"
          required
          error={errors.company}
        />

        <CountrySelect
          id="input-country"
          label="País de residencia"
          value={formData.country}
          onChange={handleCountryChange}
          options={countries}
          required
          error={errors.country}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="input-email"
          name="email"
          label="Correo electrónico"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Ej: nombre@empresa.com"
          required
          error={errors.email}
        />

        <PhoneInput
          id="input-phone"
          name="phone"
          label="Teléfono"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="Ej. +54 9 11 222 333"
          required
          error={errors.phone}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleNext}
          className="w-full sm:w-auto"
          withArrow
          disabled={isAnimating}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}

interface StepTwoProjectTypeProps {
  formData: StartFormProps["formData"];
  errors: StartFormProps["errors"];
  isAnimating: StartFormProps["isAnimating"];
  handleSelectField: StartFormProps["handleSelectField"];
  handleBack: StartFormProps["handleBack"];
  handleNext: StartFormProps["handleNext"];
}

function StepTwoProjectType({
  formData,
  errors,
  isAnimating,
  handleSelectField,
  handleBack,
  handleNext,
}: StepTwoProjectTypeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-base font-bold uppercase tracking-wider text-chrome-highlight">
          Tipo de Proyecto
        </h2>
        <p className="text-pretty text-xs leading-relaxed text-chrome-deep sm:text-xs">
          Selecciona la categoría técnica principal.
          <br />
          Esto nos sirve para asignar los ingenieros y diseñadores especializados al análisis técnico de encaje.
        </p>
      </div>

      <CardSelector
        id="group-projectType"
        cardIdPrefix="projectType"
        options={PROJECT_TYPES}
        value={formData.projectType}
        onChange={(value) => handleSelectField("projectType", value)}
        error={errors.projectType}
        theme="violet"
        cardSize="md"
        autoSpanLastOdd
      />

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={handleBack}
          className="order-2 w-full sm:order-1 sm:w-auto"
          disabled={isAnimating}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleNext}
          className="order-1 w-full sm:order-2 sm:w-auto"
          withArrow
          disabled={isAnimating}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}

interface StepThreeBudgetDeadlineProps {
  formData: StartFormProps["formData"];
  errors: StartFormProps["errors"];
  isAnimating: StartFormProps["isAnimating"];
  handleSelectField: StartFormProps["handleSelectField"];
  handleBack: StartFormProps["handleBack"];
  handleNext: StartFormProps["handleNext"];
}

function StepThreeBudgetDeadline({
  formData,
  errors,
  isAnimating,
  handleSelectField,
  handleBack,
  handleNext,
}: StepThreeBudgetDeadlineProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-1 text-base font-bold uppercase tracking-wider text-chrome-highlight">
          Presupuesto y Plazos
        </h2>
        <p className="text-balance text-xs leading-relaxed text-chrome-deep sm:text-xs">
          Por favor, indica tu rango de presupuesto e idea de plazos.
          <br />
          Ambos parámetros definen la velocidad de desarrollo, el tamaño del equipo y la arquitectura recomendada.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <CardSelector
          id="group-budget"
          cardIdPrefix="budget"
          options={BUDGET_RANGES}
          value={formData.budget}
          onChange={(value) => handleSelectField("budget", value)}
          error={errors.budget}
          theme="violet"
          cardSize="sm"
          columnsClass="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2"
        />

        <CardSelector
          id="group-deadline"
          cardIdPrefix="deadline"
          options={DEADLINES}
          value={formData.deadline}
          onChange={(value) => handleSelectField("deadline", value)}
          error={errors.deadline}
          theme="violet"
          cardSize="sm"
          columnsClass="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2"
        />
      </div>

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={handleBack}
          className="order-2 w-full sm:order-1 sm:w-auto"
          disabled={isAnimating}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleNext}
          className="order-1 w-full sm:order-2 sm:w-auto"
          withArrow
          disabled={isAnimating}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}

interface StepFourProjectIdeaProps {
  formData: StartFormProps["formData"];
  errors: StartFormProps["errors"];
  isSubmitting: StartFormProps["isSubmitting"];
  isAnimating: StartFormProps["isAnimating"];
  messageLength: StartFormProps["messageLength"];
  minChars: StartFormProps["minChars"];
  textareaPlaceholder: StartFormProps["textareaPlaceholder"];
  handleInputChange: StartFormProps["handleInputChange"];
  handleBack: StartFormProps["handleBack"];
}

function StepFourProjectIdea({
  formData,
  errors,
  isSubmitting,
  isAnimating,
  messageLength,
  minChars,
  textareaPlaceholder,
  handleInputChange,
  handleBack,
}: StepFourProjectIdeaProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-1 text-base font-bold uppercase tracking-wider text-chrome-highlight">
          Idea y Objetivos del Proyecto
        </h2>
        <p className="text-balance text-xs leading-relaxed text-chrome-deep sm:text-xs">
          Cuéntanos brevemente qué buscas resolver con este desarrollo técnico.
          <br />
          Menciona cualquier detalle que consideres importante (ej. sistemas a integrar, público objetivo, velocidad de carga, SEO).
        </p>
      </div>

      <SelectionSummary formData={formData} />

      <TextArea
        id="input-message"
        name="message"
        label="Descripción general del proyecto"
        rows={6}
        value={formData.message}
        onChange={handleInputChange}
        placeholder={textareaPlaceholder}
        required
        error={errors.message}
        hint={
          <p
            className={`text-xs transition-colors ${
              messageLength === 0
                ? "text-chrome-deep"
                : messageLength < minChars
                  ? "text-amber-400"
                  : "text-emerald-400"
            }`}
          >
            {messageLength} / {minChars} caracteres mínimos
            {messageLength >= minChars ? <span className="ml-2">✓</span> : null}
          </p>
        }
      />

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={handleBack}
          disabled={isSubmitting || isAnimating}
          className="order-2 w-full sm:order-1 sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>
        <Button
          type="submit"
          variant="primary-blue"
          size="lg"
          disabled={isSubmitting || isAnimating}
          className="order-1 w-full sm:order-2 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando solicitud...
            </>
          ) : (
            <>
              Iniciar proyecto
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ==========================================
// Main StartForm Component
// ==========================================

export default function StartForm({
  countries,
  currentStep,
  errors,
  formData,
  handleBack,
  handleCountryChange,
  handleInputChange,
  handleNext,
  handlePhoneChange,
  handleSelectField,
  handleStepClick,
  handleSubmit,
  isAnimating,
  isSubmitting,
  messageLength,
  minChars,
  setStepContentElement,
  submitStatus,
  textareaPlaceholder,
}: StartFormProps) {
  return (
    <div className="order-1 lg:order-2 lg:col-span-8">
      <div className="relative rounded-2xl border border-steel-grey bg-graphite-metal p-6 backdrop-blur-md sm:p-8">
        <h2 className="mb-6 border-b border-steel-grey/30 pb-3 text-base font-bold uppercase tracking-wider text-chrome-highlight">
          Formulario de solicitud
        </h2>

        <StepperNav currentStep={currentStep} onStepClick={handleStepClick} />

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {submitStatus === "error" ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-xs text-red-400 space-y-3">
              <p className="leading-relaxed">
                No pudimos enviar tu consulta en este momento. Podés intentarlo nuevamente o comunicarte con nosotros por WhatsApp o correo electrónico.
              </p>
              <div className="flex flex-wrap gap-4 pt-1 font-medium">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-red-300 underline transition-colors focus-visible:outline-none"
                >
                  Enviar correo
                </a>
                <span className="text-red-500/30">|</span>
                <a
                  href={getWhatsAppLink(WHATSAPP_MSG_START)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 underline transition-colors focus-visible:outline-none"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          ) : null}

          <div ref={setStepContentElement}>
            {currentStep === 1 ? (
              <StepOneContactInfo
                formData={formData}
                errors={errors}
                countries={countries}
                isAnimating={isAnimating}
                handleInputChange={handleInputChange}
                handleCountryChange={handleCountryChange}
                handlePhoneChange={handlePhoneChange}
                handleNext={handleNext}
              />
            ) : null}

            {currentStep === 2 ? (
              <StepTwoProjectType
                formData={formData}
                errors={errors}
                isAnimating={isAnimating}
                handleSelectField={handleSelectField}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            ) : null}

            {currentStep === 3 ? (
              <StepThreeBudgetDeadline
                formData={formData}
                errors={errors}
                isAnimating={isAnimating}
                handleSelectField={handleSelectField}
                handleBack={handleBack}
                handleNext={handleNext}
              />
            ) : null}

            {currentStep === 4 ? (
              <StepFourProjectIdea
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                isAnimating={isAnimating}
                messageLength={messageLength}
                minChars={minChars}
                textareaPlaceholder={textareaPlaceholder}
                handleInputChange={handleInputChange}
                handleBack={handleBack}
              />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
