---
name: content-research-writer
description: Writing copilot for Vorello content. Helps plan, research, draft, and refine high-quality content with citations while preserving voice and aligning copy with docs/brand-brief.md.
---

# Content Research Writer

## Purpose

Use this skill to create or improve content with a structured workflow:

- clarify goal and audience
- build a solid outline
- research with credible sources and citations
- draft section by section
- polish for clarity, consistency, and voice

This skill is optimized for Codex and this repository.

## Required Inputs

Before drafting, confirm:

- topic
- target audience
- objective (`educate`, `persuade`, `explain`, `announce`)
- target format and length
- citation style (`inline`, `numbered`, `footnotes`)

For UI/site copy, review first:

- `docs/brand-brief.md` (mandatory)

## Output Location (Repo-Local)

Prefer repo-local content structure:

```txt
docs/content/<slug>/
  outline.md
  research.md
  draft-v1.md
  final.md
```

Avoid global paths like `~/writing/...`.

## Workflow

### 1) Align scope

Ask only what is missing:

- what is the core claim?
- who is this for?
- what action should the reader take?

Then define a one-line editorial goal.

### 2) Build outline

Create:

- hook
- introduction
- 2-5 main sections
- conclusion
- research gaps list

Mark claims that require evidence with `[[source needed]]`.

### 3) Research and citations

Rules:

- prioritize primary and credible sources
- include publication date
- avoid unsupported claims
- if a fact is uncertain, label it as tentative

For each key claim, provide:

- finding
- source
- citation snippet in chosen format

### 4) Draft collaboratively

Draft section by section, preserving user voice.
After each section, provide:

- what works
- what to improve
- 2-3 concrete line edits
- missing evidence notes

Do not overwrite tone unless requested.

### 5) Final review

Run this checklist:

- argument is clear and consistent
- transitions are smooth
- claims are sourced
- citations are complete and formatted consistently
- wording matches audience and objective
- copy aligns with `docs/brand-brief.md` when applicable

## Response Templates

### Outline template

```md
# Title (working)

## Hook

- ...

## Intro

- ...

## Section 1

- key point
- evidence

## Section 2

- key point
- evidence

## Conclusion

- summary
- CTA

## Research To-Do

- [ ] ...
```

### Section feedback template

```md
## Feedback: <section name>

### Works well

- ...

### Improve

- issue -> fix
- issue -> fix

### Missing support

- claim -> required source

### Suggested edits

1. Original: "..."
   Suggested: "..."
2. Original: "..."
   Suggested: "..."
```

## Guardrails

- Do not fabricate sources.
- Do not use invented statistics.
- Do not present old data as current without date.
- Keep suggestions specific and actionable.
- Prefer concise structure over verbose theory.

## Best Use Cases

- blog posts
- landing page long-form sections
- case studies
- technical explainers
- educational newsletters
