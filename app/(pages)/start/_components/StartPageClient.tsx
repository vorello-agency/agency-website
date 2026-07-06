"use client";

import React from "react";

import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { useStartForm } from "../_lib/use-start-form";
import StartContent from "./StartContent";
import StartPageShell from "./StartPageShell";
import StartSuccess from "./StartSuccess";

export default function StartPageClient() {
  const {
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
    setFormElement,
    setStepContentElement,
    submitStatus,
    textareaPlaceholder,
  } = useStartForm();

  return (
    <StartPageShell footerSlot={submitStatus !== "success" ? <WhatsAppFloat /> : null}>
      {submitStatus === "success" ? (
        <StartSuccess name={formData.name} company={formData.company} />
      ) : (
        <StartContent
          countries={countries}
          currentStep={currentStep}
          errors={errors}
          formData={formData}
          handleBack={handleBack}
          handleCountryChange={handleCountryChange}
          handleInputChange={handleInputChange}
          handleNext={handleNext}
          handlePhoneChange={handlePhoneChange}
          handleSelectField={handleSelectField}
          handleStepClick={handleStepClick}
          handleSubmit={handleSubmit}
          isAnimating={isAnimating}
          isSubmitting={isSubmitting}
          messageLength={messageLength}
          minChars={minChars}
          setFormElement={setFormElement}
          setStepContentElement={setStepContentElement}
          submitStatus={submitStatus}
          textareaPlaceholder={textareaPlaceholder}
        />
      )}
    </StartPageShell>
  );
}
