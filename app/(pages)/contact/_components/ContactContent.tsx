import React from "react";

import type {
  ContactFormData,
  ContactFormErrors,
  ContactSubmitStatus,
} from "../_lib/contact-data";
import ContactSidebar from "./ContactSidebar";
import ContactForm from "./ContactForm";
import ContactIntro from "./ContactIntro";

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
    <div className="mt-4">
      <ContactIntro />

      <div className="grid grid-cols-1 gap-6 md:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <ContactSidebar />
        <ContactForm {...props} />
      </div>
    </div>
  );
}
