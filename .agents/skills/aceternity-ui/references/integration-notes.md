# Aceternity Integration Notes

## Preflight

- Confirm the target route and component ownership.
- Check `package.json` for animation/UI dependencies before installing new ones.
- Verify Tailwind config/content paths already include the files being edited.

## Implementation Guardrails

- Prefer composable local components over large copied blocks.
- Keep animation constants near the component unless shared in 2+ places.
- Avoid global CSS side effects for one section.
- Preserve keyboard accessibility for interactive elements.

## Next.js and Rendering

- Keep browser-only logic behind client component boundaries when needed.
- If a component depends on runtime viewport values, protect SSR behavior to avoid hydration mismatch.
- Avoid unnecessary client components for static layout pieces.

## QA Checklist

- Desktop: layout, spacing, and animation quality.
- Mobile: overflow, tap targets, and animation smoothness.
- Reduced motion: ensure usable fallback (no blocked content).
- Performance: no obvious jank, large re-renders, or console warnings.

## Response Checklist

In final responses, include:
- Which files changed.
- Any dependencies added/removed.
- What was tested locally and what could not be tested.
