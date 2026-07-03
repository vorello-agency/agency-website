"use client";

import React from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ContactContent from "./_components/ContactContent";
import ContactPageShell from "./_components/ContactPageShell";
import ContactSuccess from "./_components/ContactSuccess";
import { useContactForm } from "./_lib/use-contact-form";

export default function ContactPage() {
  const contactForm = useContactForm();

  return (
    <>
      <Navbar />

      <ContactPageShell>
        {contactForm.submitStatus === "success" ? (
          <ContactSuccess
            name={contactForm.formData.name}
            reasonLabel={contactForm.selectedReasonLabel}
          />
        ) : (
          <ContactContent
            charCountColor={contactForm.charCountColor}
            errors={contactForm.errors}
            formData={contactForm.formData}
            isSubmitting={contactForm.isSubmitting}
            messageLength={contactForm.messageLength}
            submitStatus={contactForm.submitStatus}
            onInputChange={contactForm.handleInputChange}
            onReasonSelect={contactForm.handleSelectReason}
            onSubmit={contactForm.handleSubmit}
          />
        )}
      </ContactPageShell>

      <Footer />
    </>
  );
}
