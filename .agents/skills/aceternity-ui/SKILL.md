---
name: aceternity-ui
description: Use this skill when the user wants to add, adapt, or debug Aceternity UI components and effects in a Next.js + Tailwind project, including installation, integration, theming, and animation fixes.
---

# Aceternity Ui

## Overview

This skill standardizes how to implement Aceternity UI components safely in this codebase. Use it for new sections, visual refreshes, component migrations, and bug fixes related to motion, Tailwind classes, or composition patterns used by Aceternity.

## Trigger Conditions

Use this skill when the request mentions:
- Aceternity UI, Aceternity blocks/components, or a specific Aceternity effect.
- Hero sections, cards, beams, spotlights, animated backgrounds, or interaction-heavy UI.
- Tailwind + motion integration issues after adding visual components.

Do not use this skill for:
- Backend-only changes.
- Pure data/model updates with no UI impact.
- Design systems that explicitly forbid external visual patterns.

## Workflow

1. Clarify scope
- Identify the exact UI section and expected behavior on desktop and mobile.
- Confirm whether this is net-new UI or replacing existing components.

2. Validate framework constraints first
- Read `AGENTS.md` and the Next.js docs under `node_modules/next/dist/docs/` relevant to the API being touched.
- Preserve existing project patterns unless the user requests a deliberate visual change.

3. Install or verify dependencies
- Check if required UI/motion dependencies already exist before adding anything.
- Avoid duplicate utility functions or repeated animation wrappers.

4. Integrate incrementally
- Build or adapt the component in the smallest viable slice.
- Keep visual primitives reusable and avoid hardcoding content.
- Use semantic structure and maintain responsive behavior.

5. Align styles
- Map Aceternity visual style into the project's palette/typography decisions.
- Prefer CSS variables or shared tokens over one-off inline values.

6. Validate behavior
- Check for hydration warnings, layout shifts, and performance regressions.
- Verify animation fallbacks and acceptable reduced-motion behavior.
- Confirm mobile rendering and touch interactions.

## Output Expectations

When using this skill, the final implementation should:
- Fit existing folder conventions in the app.
- Include only necessary dependencies and cleanup unused code.
- Document any required setup steps in the response.
- Report what was validated and what remains unverified.

## Quick Prompts

- "Add an Aceternity-style hero to the landing page, keeping current brand colors."
- "Replace this static card grid with an animated Aceternity-inspired variant."
- "Fix the spotlight effect causing hydration mismatch in this Next.js page."

## References

- Use [integration-notes.md](references/integration-notes.md) when you need the detailed implementation checklist.
