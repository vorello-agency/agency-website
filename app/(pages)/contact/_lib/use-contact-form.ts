"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_REASONS,
  CONTACT_STORAGE_KEY,
  INITIAL_CONTACT_FORM_DATA,
  type ContactFormData,
  type ContactFormErrors,
  type ContactSubmitStatus,
} from "./contact-data";

function useContactFormPersistence(
  formData: ContactFormData,
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>,
  submitStatus: ContactSubmitStatus
) {
  const isHydrated = useRef(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONTACT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { formData?: ContactFormData };
        if (parsed.formData) setFormData(parsed.formData);
      }
    } catch {
      // Ignore corrupted local drafts.
    }

    isHydrated.current = true;
  }, [setFormData]);

  useEffect(() => {
    if (!isHydrated.current) return;

    const timeout = window.setTimeout(() => {
      try {
        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify({ formData }));
      } catch {
        // Storage can be unavailable or full.
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [formData]);

  useEffect(() => {
    if (submitStatus !== "success") return;

    try {
      localStorage.removeItem(CONTACT_STORAGE_KEY);
    } catch {
      // Ignore unavailable storage.
    }
  }, [submitStatus]);
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_CONTACT_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<ContactSubmitStatus>("idle");
  const [errors, setErrors] = useState<ContactFormErrors>({});

  useContactFormPersistence(formData, setFormData, submitStatus);

  const clearFieldError = useCallback((fieldName: keyof ContactFormData) => {
    setErrors((prev) => {
      if (!prev[fieldName]) return prev;

      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      const fieldName = name as keyof ContactFormData;

      if (fieldName === "message" && value.length > CONTACT_MESSAGE_MAX_LENGTH) return;

      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      clearFieldError(fieldName);
    },
    [clearFieldError]
  );

  const handleSelectReason = useCallback(
    (value: string) => {
      setFormData((prev) => ({ ...prev, reason: value }));
      clearFieldError("reason");
    },
    [clearFieldError]
  );

  const scrollToFirstError = useCallback((newErrors: ContactFormErrors) => {
    const firstErrorKey = Object.keys(newErrors)[0];
    if (!firstErrorKey) return;

    requestAnimationFrame(() => {
      const inputEl = document.getElementById(`input-${firstErrorKey}`);
      if (inputEl instanceof HTMLElement) {
        inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
        inputEl.focus();
        return;
      }

      const groupEl = document.getElementById(`group-${firstErrorKey}`);
      if (groupEl instanceof HTMLElement) {
        groupEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, ingresa tu nombre completo.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, ingresa tu correo electrónico.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor, ingresa un correo válido.";
    }

    if (!formData.reason) {
      newErrors.reason = "Por favor, selecciona el motivo de tu contacto.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor, escribe tu consulta o mensaje.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Por favor, detalla un poco más tu consulta (mínimo 10 caracteres).";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors);
      return false;
    }

    return true;
  }, [formData, scrollToFirstError]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = (await response.json()) as { success?: boolean };

        if (response.ok && data.success) {
          setSubmitStatus("success");
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setSubmitStatus("error");
        }
      } catch (error) {
        console.error("Error submitting contact form:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm]
  );

  const messageLength = formData.message.length;
  const charCountColor = useMemo(() => {
    if (errors.message && messageLength < 10) return "text-red-400";
    if (messageLength > CONTACT_MESSAGE_MAX_LENGTH * 0.9) return "text-amber-400";
    return "text-chrome-deep";
  }, [errors.message, messageLength]);

  const selectedReasonLabel = useMemo(() => {
    return CONTACT_REASONS.find((reason) => reason.id === formData.reason)?.label ?? formData.reason;
  }, [formData.reason]);

  return {
    charCountColor,
    errors,
    formData,
    handleInputChange,
    handleSelectReason,
    handleSubmit,
    isSubmitting,
    messageLength,
    selectedReasonLabel,
    submitStatus,
  };
}
