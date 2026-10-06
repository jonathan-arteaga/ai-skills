---
name: app-legal-launch-audit
description: Audit a consumer app for six US launch legal risks and implement the fixes when asked. Covers a signup age gate, self-hosted fonts, session replay off or consent plus input masking, an unsubscribe link and postal address on marketing email, renewal terms next to the subscribe button, and a DMCA agent registration walkthrough. Use when asked to audit or fix these risks, or to check signup, fonts, analytics, marketing email, billing consent, or a copyright agent before launch. Do not use for a general UX review, codebase health audit, or client website delivery.
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# App legal launch audit

Audit a consumer web or app product for six common US launch risks, then implement the fixes when the user asks for implementation. This is launch hygiene, not legal advice and not a privacy program.

Scope is the United States and these six checks only. Stop and say so, without inventing a compliance program, if the product is directed to children under 13, collects health or financial data as a primary purpose, or sells mainly to EU consumers. Those cases need counsel and a different workflow.

## Workflow

1. Orient. Identify the product surface: signup, fonts, analytics, marketing email, paid subscription, and user-posted content. Note the stack and what you can edit.
2. Audit all six checks. Read only the reference for the check you are on. Record evidence: file path, request, template, or a confirmed absence.
3. Report before editing unless the user already asked to fix the list. Lead with failures.
4. When implementation is authorized, fix the code and copy you can change. Do not register a DMCA agent, send email, or change a billing provider account unless the user explicitly asks for that external step.
5. Re-check the edited surface. Do not mark a check passed from a plan alone.

## Checks

Work in this order. Pass, fail, or not applicable, each with evidence.

1. Age gate before account creation. Read [references/age-gate.md](references/age-gate.md).
2. Self-hosted fonts. Read [references/fonts.md](references/fonts.md).
3. Session replay off, or consent before recording plus input masking. Read [references/session-replay.md](references/session-replay.md).
4. Unsubscribe link and postal address on every marketing email. Read [references/marketing-email.md](references/marketing-email.md).
5. Renewal terms in visual proximity to the subscribe control. Read [references/renewal-terms.md](references/renewal-terms.md).
6. DMCA agent walkthrough, only if the app stores user-posted content and wants a 512(c) safe harbor. Read [references/dmca-agent.md](references/dmca-agent.md).

## Guardrails

- Do not call the result compliant, certified, or safe from suit.
- Do not add a COPPA verifiable-parental-consent flow. A checkbox is not that flow. If the app is directed to under-13 users, stop.
- Do not treat a privacy-policy link as consent for session replay or auto-renewal.
- Do not invent a fee, statute, or vendor behavior. Use the cited official page when a number matters.
- Do not expand into GDPR, CCPA notice inventories, accessibility, or trademark clearance.

## Report

Lead with the failed checks and the next fix. Then a six-row table: check, status, evidence, change made or still required. State what was not verified, including email delivery and any external registration.
