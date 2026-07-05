import React from "react";

import type {
  ContactFormData,
  ContactFormErrors,
  ContactSubmitStatus,
} from "../_lib/contact-data";
import ContactSidebar from "./ContactSidebar";
import ContactForm from "./ContactForm";
import ContactIntro from "./ContactIntro";
import ContactFooterCards from "./ContactFooterCards";

interface ContactContentProps {
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

export default function ContactContent(props: ContactContentProps) {
  return (
    <div className="mt-4 space-y-12 md:space-y-16">
      <div className="space-y-10 md:space-y-14">
        <ContactIntro />

        <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-12 lg:gap-14">
          <ContactForm {...props} />
          <ContactSidebar />
        </div>
      </div>

      <ContactFooterCards />
    </div>
  );
}
