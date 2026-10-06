---
name: app-legal-launch-audit
description: Audit a consumer app for six US launch legal risks and fix them.
  Covers an age gate on signup, self-hosted fonts, session replay off or consent
  plus input masking, an unsubscribe link and postal address on marketing email,
  renewal terms next to the subscribe control, and DMCA agent registration. Use
  when the user asks for this legal-risk audit or names these checks. Do not use
  for general UX review, website delivery, or codebase health. Not legal advice.
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# App legal launch audit

Audit the app for the six risks below and fix the ones in scope. This is US consumer-app launch hygiene, not a privacy program and not legal advice. Verify the cited official source before treating a rule as current. Stop and hand the item to counsel when the product is directed at children under 13, the primary market is the EU, or the app collects health or financial data beyond a normal checkout.

Do not expand this into a GDPR program, a COPPA verifiable-parental-consent product, or a general compliance review. Route accessibility and forms to `ux-review`. Route site delivery to `client-website-launch` or `client-prototype-launch`.

## Audit, then fix

1. Identify the surface: signup, font loading, analytics, marketing email templates, paid subscription checkout, and user-posted content.
2. Read only the reference for each check that applies. Mark a check not applicable with a reason.
3. Report each finding as `file:line` plus the failing check, evidence, and the fix.
4. When the user asked to fix them, implement the fix in the app. Do not register a DMCA agent, send email, or change a live billing provider without explicit authorization.
5. Re-check the changed files. State what is verified, what is pending a human or counsel, and what remains.

## The six checks

- Age gate before account creation. Default minimum is 13, or the higher age the terms already require. A gate is not verifiable parental consent. See [references/age-gate.md](references/age-gate.md).
- Self-host fonts. No runtime request to a font CDN. See [references/self-hosted-fonts.md](references/self-hosted-fonts.md).
- Session replay off, or consent before recording plus default input masking. See [references/session-replay.md](references/session-replay.md).
- Every marketing email has a working unsubscribe link and a valid postal address. See [references/marketing-email.md](references/marketing-email.md).
- Renewal terms sit in visual proximity to the subscribe control, before charge. See [references/renewal-terms.md](references/renewal-terms.md).
- DMCA designated agent, only if the app stores user-posted content and wants a 512(c) safe harbor. See [references/dmca-agent.md](references/dmca-agent.md).

## Report

Lead with the six statuses: pass, fixed, blocked, or not applicable. Name files changed. Do not call the app legally compliant.
