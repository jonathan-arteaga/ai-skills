---
name: write-in-authentic-voice
description: Draft, edit, or audit prose in the user's or an authorized
  organization's voice. Use for voice matching, humanizing, or reviewing writing
  patterns; leave UI terminology and repository documentation to their
  specialist workflows.
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/petergyang/no-ai-slop
---

# Write in an authentic voice

Create prose its author would plausibly send or publish. Match the purpose, audience, and channel while preserving meaning and distinctive voice.

## Choose the mode

Infer the mode from the request. Ask only when ambiguity would materially change the result.

- **Draft:** Write complete prose from the brief, source facts, and approved examples. Do not require an existing draft.
- **Edit:** Read the full draft and make the minimum effective changes. Keep strong lines, useful structure, uncertainty, and intentional rough edges.
- **Audit:** Identify meaningful writing problems, name the pattern, quote the shortest useful excerpt, and suggest a focused fix. Do not rewrite unless asked, score AI likelihood, or claim to detect authorship. If no material problems appear, say so.

## Establish context and voice

Use current instructions first, then factual source material and the supplied draft, approved examples matched to the audience/channel, stated preferences, and plain-language defaults. Style never overrides facts.

Use [voice modeling](references/voice-modeling.md) when examples or an established voice matter. Without samples, use the available request and context conservatively; ask for a sample only when matching a particular voice is central and guessing would materially change the result. Do not invent a persona.

A private personal specialization may supply a voice profile and channel guidance for that user's writing. Do not apply that profile to organizational prose or other authors. This shared skill contains no personal profile and requires no private files.

## Write or review

- Preserve facts, citations, exact terminology, qualifications, point of view, and degree of familiarity. Never invent numbers, sources, anecdotes, opinions, feelings, promises, credentials, or endorsements.
- Match structure and polish to the channel. Keep humor, fragments, repetition, uncertainty, or an aside when they express the author's voice and remain understandable.
- Lead with the useful point when the setup adds nothing. Preserve stories or context that earn their space; do not force every paragraph into the same structure.
- Use [writing patterns](references/writing-patterns.md) for edits, audits, and drafts that risk sounding generic. Patterns and word lists are diagnostic signals, not automatic violations. Accuracy, voice, and context control.
- Check [acceptance criteria](references/acceptance-checks.md) before returning the result. Fix failures without turning the check into a report the user did not request.

## Deliver

Return finished copy first for Draft and Edit. Add a short change note only when useful or requested; a copy-only request receives only the copy. Give alternatives only for a meaningful choice. For Audit, return findings rather than a replacement draft.

## Boundaries

Drafting does not authorize reading private correspondence or sending, posting, publishing, scheduling, or editing external content. Use supplied context first; obtain the required authorization before accessing private history or taking an external action. A personal specialization may impose more specific permission rules.

Use product-language for UI terminology and behavior-dependent strings; write-readme and write-reproducible-demo retain their specialist workflows. A requested voice pass can support them without replacing their factual or structural requirements.
