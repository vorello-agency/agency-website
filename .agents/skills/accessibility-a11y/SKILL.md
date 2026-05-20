---
name: accessibility-a11y
description: Build accessible interfaces for Next.js + React + Tailwind with WCAG 2.2 AA focus, keyboard-first UX, correct ARIA, focus management, reduced-motion support (including GSAP), and automated a11y testing in CI.
license: MIT
---

# Accessibility (a11y) — Next.js + Tailwind + GSAP

## Overview

Build interfaces that work for everyone: keyboard users, screen reader users, switch devices, and users with motion/visual sensitivity.

This skill is tailored for this stack:
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- GSAP motion system

Use it when building new UI, reviewing existing UI for compliance, fixing audit findings, or integrating accessibility checks in CI/CD.

## Core Principles

- Semantic HTML first: prefer native elements (`button`, `nav`, `main`, `dialog`, `form`, `label`) before ARIA.
- Keyboard baseline: if it does not work with keyboard only, it is broken.
- ARIA as enhancement: do not replace valid semantics with ARIA.
- No color-only meaning: always pair color with text/icon/state.
- Motion must respect user preference: support `prefers-reduced-motion`, including GSAP timelines/scroll animations.
- Automated + manual testing: automated tools catch only part of the issues.

## Pattern 1: Accessible Dialog (Native `<dialog>`)

When to use: overlays requiring explicit user interaction.

```tsx
import { useCallback, useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      dialog.showModal();
      return;
    }

    dialog.close();
    previousFocusRef.current?.focus();
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === dialogRef.current) onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="dialog-title"
      className="w-full max-w-xl rounded-xl border border-white/10 bg-zinc-950 p-0 text-zinc-100 backdrop:bg-black/60"
    >
      <div role="document" className="p-6">
        <header className="mb-4 flex items-center justify-between">
          <h2 id="dialog-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar diálogo"
            className="rounded-md p-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div>{children}</div>
      </div>
    </dialog>
  );
}
```

Why: native `<dialog>` + `showModal()` gives focus trap, modal semantics, and Escape behavior with fewer bugs than custom implementations.

## Pattern 2: Accessible Form Field + Error Mapping

When to use: any validated input.

```tsx
interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  description?: string;
  error?: string;
}

export function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  description,
  error,
}: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-100">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {required && <span className="sr-only"> (obligatorio)</span>}
      </label>

      {description && (
        <p id={descriptionId} className="text-xs text-zinc-400">
          {description}
        </p>
      )}

      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      />

      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-400">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}
    </div>
  );
}
```

Why: label/input relation, described-by hints, and alert-based errors guarantee better SR feedback and keyboard recovery.

## Pattern 3: Keyboard Navigation for Custom Tabs

When to use: custom widgets that do not map to native controls.

```tsx
import { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs }: { tabs: TabItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;

    event.preventDefault();
    setActiveIndex(next);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Secciones" className="flex gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`panel-${tab.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className="rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <section
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={index !== activeIndex}
          className="mt-4"
        >
          {tab.content}
        </section>
      ))}
    </div>
  );
}
```

## Pattern 4: Live Regions for Async UI

When to use: toasts, dynamic result counts, inline async status.

```tsx
export function SearchResultsAnnouncement({ query, count }: { query: string; count: number }) {
  return (
    <p className="sr-only" aria-live="polite">
      {count} resultados para "{query}".
    </p>
  );
}

export function CriticalError({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-md border border-red-500/40 bg-red-950/30 p-3 text-red-200">
      {message}
    </div>
  );
}
```

## Pattern 5: Reduced Motion with GSAP

When to use: any timeline, stagger, scrub, or parallax.

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HeroMotion() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noReduce: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            reduceMotion: boolean;
            noReduce: boolean;
          };

          if (reduceMotion) {
            gsap.set("[data-hero-item]", { opacity: 1, y: 0 });
            return;
          }

          gsap.from("[data-hero-item]", {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          });
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return <div ref={rootRef}>...</div>;
}
```

Why: preserves accessibility expectations while keeping premium motion for users who opt in.

## Automated Testing

### Unit/Component (Jest + axe)

```ts
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

it("dialog has no a11y violations", async () => {
  const { container } = render(<Dialog isOpen onClose={() => {}} title="Crear proyecto">Contenido</Dialog>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### E2E (Playwright + axe)

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home passes WCAG AA checks", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

## Quick References

### Contrast Targets

- Normal text: AA `4.5:1`, AAA `7:1`
- Large text: AA `3:1`, AAA `4.5:1`
- UI graphics/components: `3:1`

### Common Anti-Patterns

- `div` clickable instead of `button`
- positive `tabindex` values
- removing focus outline without replacement
- placeholder as only label
- color-only error indication

## Definition of Done (A11y)

- All interactions keyboard-operable.
- Visible `:focus-visible` on all focusable controls.
- Labels/hints/errors linked programmatically.
- `prefers-reduced-motion` respected for GSAP/CSS motion.
- Color contrast meets WCAG AA.
- No critical axe violations in CI.
- Manual keyboard pass and at least one screen reader smoke test done.
