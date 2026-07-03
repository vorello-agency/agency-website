"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { defaultCountries, parseCountry } from "react-international-phone";

import { gsap } from "@/lib/gsap/register";
import { guessUserCountry } from "@/components/forms/PhoneInput";
import type { CountryOption } from "@/components/forms/CountrySelect";
import {
  CONTEXTUAL_PLACEHOLDERS,
  COUNTRY_NAMES_BY_ISO2,
  FALLBACK_COUNTRIES,
  INITIAL_START_FORM_DATA,
  START_MESSAGE_MIN_LENGTH,
  START_STORAGE_KEY,
  TOP_COUNTRY_VALUES,
  type StartFormData,
  type StartFormErrors,
  type StartStep,
  type StartSubmitStatus,
} from "./start-data";

function getLocalizedCountries(): CountryOption[] {
  try {
    const regionNames = new Intl.DisplayNames(["es"], { type: "region" });

    const mapped = defaultCountries.map((country) => {
      const parsed = parseCountry(country);
      let label = parsed.name;

      try {
        label = regionNames.of(parsed.iso2.toUpperCase()) || parsed.name;
      } catch {
        // Fallback to package-provided country name.
      }

      return {
        value: label,
        label,
        iso2: parsed.iso2,
      };
    });

    const uniqueMap = new Map<string, CountryOption>();
    mapped.forEach((item) => {
      if (!uniqueMap.has(item.value)) uniqueMap.set(item.value, item);
    });

    const sorted = Array.from(uniqueMap.values()).sort((a, b) =>
      a.label.localeCompare(b.label, "es", { sensitivity: "base" })
    );

    const topCountries: CountryOption[] = [];
    const remainingCountries: CountryOption[] = [];

    sorted.forEach((country) => {
      if (TOP_COUNTRY_VALUES.includes(country.value)) {
        topCountries.push(country);
      } else {
        remainingCountries.push(country);
      }
    });

    topCountries.sort(
      (a, b) => TOP_COUNTRY_VALUES.indexOf(a.value) - TOP_COUNTRY_VALUES.indexOf(b.value)
    );

    return [
      ...topCountries,
      { value: "divider", label: "────────────────", iso2: "" },
      ...remainingCountries,
    ];
  } catch {
    return FALLBACK_COUNTRIES;
  }
}

const COUNTRIES = getLocalizedCountries();

function isOnlyDialCode(cleanPhone: string) {
  if (!cleanPhone.startsWith("+")) return false;

  const phoneWithoutPlus = cleanPhone.substring(1);
  const sortedCountries = [...defaultCountries].sort((a, b) => {
    const dialA = parseCountry(a).dialCode;
    const dialB = parseCountry(b).dialCode;
    return dialB.length - dialA.length;
  });

  for (const country of sortedCountries) {
    const parsed = parseCountry(country);
    if (phoneWithoutPlus === parsed.dialCode) return true;
  }

  return false;
}

function useStartFormPersistence(
  formData: StartFormData,
  currentStep: StartStep,
  setFormData: React.Dispatch<React.SetStateAction<StartFormData>>,
  setCurrentStep: React.Dispatch<React.SetStateAction<StartStep>>,
  submitStatus: StartSubmitStatus
) {
  const isHydrated = useRef(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(START_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as {
          formData?: StartFormData;
          currentStep?: StartStep;
        };

        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.currentStep && parsed.currentStep >= 1 && parsed.currentStep <= 4) {
          setCurrentStep(parsed.currentStep);
        }
      }
    } catch {
      // Ignore corrupted local drafts.
    }

    isHydrated.current = true;
  }, [setCurrentStep, setFormData]);

  useEffect(() => {
    if (!isHydrated.current) return;

    const timeout = window.setTimeout(() => {
      try {
        localStorage.setItem(START_STORAGE_KEY, JSON.stringify({ formData, currentStep }));
      } catch {
        // Storage can be unavailable or full.
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [currentStep, formData]);

  useEffect(() => {
    if (submitStatus !== "success") return;

    try {
      localStorage.removeItem(START_STORAGE_KEY);
    } catch {
      // Ignore unavailable storage.
    }
  }, [submitStatus]);
}

export function useStartForm() {
  const [currentStep, setCurrentStep] = useState<StartStep>(1);
  const [formData, setFormData] = useState<StartFormData>(INITIAL_START_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<StartSubmitStatus>("idle");
  const [errors, setErrors] = useState<StartFormErrors>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const stepContentRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<"next" | "prev">("next");

  const setFormElement = useCallback((node: HTMLDivElement | null) => {
    formRef.current = node;
  }, []);

  const setStepContentElement = useCallback((node: HTMLDivElement | null) => {
    stepContentRef.current = node;
  }, []);

  useStartFormPersistence(formData, currentStep, setFormData, setCurrentStep, submitStatus);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFormData((prev) => {
        if (prev.country) return prev;

        const guessedCode = guessUserCountry();
        const guessedName = COUNTRY_NAMES_BY_ISO2[guessedCode];
        return guessedName ? { ...prev, country: guessedName } : prev;
      });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!stepContentRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const direction = directionRef.current;

    if (prefersReducedMotion) {
      gsap.set(stepContentRef.current, { opacity: 1, x: 0 });
      return;
    }

    gsap.fromTo(
      stepContentRef.current,
      {
        opacity: 0,
        x: direction === "next" ? 40 : -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      }
    );
  }, [currentStep]);

  const clearFieldError = useCallback((fieldName: keyof StartFormData) => {
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
      const fieldName = name as keyof StartFormData;

      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      clearFieldError(fieldName);
    },
    [clearFieldError]
  );

  const handleSelectField = useCallback(
    (fieldName: keyof StartFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      clearFieldError(fieldName);
    },
    [clearFieldError]
  );

  const handleCountryChange = useCallback(
    (country: string) => {
      handleSelectField("country", country);
    },
    [handleSelectField]
  );

  const handlePhoneChange = useCallback(
    (phone: string) => {
      handleSelectField("phone", phone);
    },
    [handleSelectField]
  );

  const scrollToFirstError = useCallback((newErrors: StartFormErrors) => {
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

  const validateStep = useCallback(
    (stepNumber: number): boolean => {
      const newErrors: StartFormErrors = {};

      if (stepNumber === 1) {
        if (!formData.name.trim()) newErrors.name = "Por favor, ingresa tu nombre completo.";
        if (!formData.company.trim()) newErrors.company = "Por favor, ingresa tu empresa o marca.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = "Por favor, ingresa tu correo electrónico.";
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = "Por favor, ingresa un correo válido.";
        }

        const cleanPhone = formData.phone.replace(/[\s()\-]/g, "");
        const digitsOnly = cleanPhone.replace(/\D/g, "");

        if (!formData.phone.trim() || digitsOnly.length < 8 || isOnlyDialCode(cleanPhone)) {
          newErrors.phone = "Por favor, ingresa tu teléfono.";
        }

        if (!formData.country) {
          newErrors.country = "Por favor, selecciona tu país.";
        }
      }

      if (stepNumber === 2 && !formData.projectType) {
        newErrors.projectType = "Por favor, selecciona un tipo de proyecto.";
      }

      if (stepNumber === 3) {
        if (!formData.budget) {
          newErrors.budget = "Por favor, selecciona un rango de presupuesto estimado.";
        }
        if (!formData.deadline) {
          newErrors.deadline = "Por favor, selecciona el plazo deseado.";
        }
      }

      if (stepNumber === 4) {
        if (!formData.message.trim()) {
          newErrors.message = "Por favor, descríbenos brevemente tu idea u objetivos.";
        } else if (formData.message.trim().length < START_MESSAGE_MIN_LENGTH) {
          newErrors.message =
            "Por favor, cuéntanos un poco más (mínimo 20 caracteres) para entender mejor.";
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        scrollToFirstError(newErrors);
        return false;
      }

      return true;
    },
    [formData, scrollToFirstError]
  );

  const animateStepTransition = useCallback((direction: "next" | "prev", callback: () => void) => {
    directionRef.current = direction;
    setIsAnimating(true);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!stepContentRef.current || prefersReducedMotion) {
      callback();
      return;
    }

    gsap.to(stepContentRef.current, {
      opacity: 0,
      x: direction === "next" ? -40 : 40,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        callback();
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    });
  }, []);

  const handleNext = useCallback(
    (event?: React.MouseEvent) => {
      if (event) event.preventDefault();
      if (isAnimating) return;
      if (!validateStep(currentStep)) return;

      animateStepTransition("next", () => {
        setCurrentStep((prev) => (prev + 1) as StartStep);
      });
    },
    [animateStepTransition, currentStep, isAnimating, validateStep]
  );

  const handleBack = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (isAnimating) return;

      animateStepTransition("prev", () => {
        setCurrentStep((prev) => (prev - 1) as StartStep);
      });
    },
    [animateStepTransition, isAnimating]
  );

  const handleStepClick = useCallback(
    (targetStep: StartStep) => {
      if (isAnimating || targetStep >= currentStep) return;

      animateStepTransition("prev", () => {
        setCurrentStep(targetStep);
      });
    },
    [animateStepTransition, currentStep, isAnimating]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (isSubmitting || isAnimating) return;
      if (!validateStep(4)) return;

      setIsSubmitting(true);
      setSubmitStatus("idle");

      try {
        const response = await fetch("/api/leads", {
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
        console.error("Error submitting lead:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateStep]
  );

  const textareaPlaceholder =
    CONTEXTUAL_PLACEHOLDERS[formData.projectType] ?? CONTEXTUAL_PLACEHOLDERS.default;
  const messageLength = formData.message.length;

  return {
    countries: COUNTRIES,
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
    minChars: START_MESSAGE_MIN_LENGTH,
    setFormElement,
    setStepContentElement,
    submitStatus,
    textareaPlaceholder,
  };
}

export type UseStartFormReturn = ReturnType<typeof useStartForm>;
