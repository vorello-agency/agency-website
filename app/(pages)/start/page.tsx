"use client";

import React from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import StartContent from "./_components/StartContent";
import StartPageShell from "./_components/StartPageShell";
import StartSuccess from "./_components/StartSuccess";
import { useStartForm } from "./_lib/use-start-form";

export default function StartPage() {
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
    <>
      <Navbar />

      <StartPageShell
        footerSlot={submitStatus !== "success" ? <WhatsAppFloat /> : null}
      >
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

      <Footer />
    </>
  );
}
