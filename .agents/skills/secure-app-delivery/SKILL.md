---
name: secure-app-delivery
description: "Design, implement, and verify risk-based security for websites, APIs, backends, mobile apps, and AI features. Use for new apps, sensitive changes, security reviews, threat modeling, or release readiness; coordinate with platform skills."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Secure app delivery

Build, review, and release applications with verified, risk-proportionate security. A checklist or scanner result is not a security certification. Inspect the real system and use its maintained framework controls instead of inventing a new authentication or cryptography layer.

## Start with the actual attack surface

1. Read repository instructions, stack, deployment, dependencies, auth/storage/integration architecture and available tests. Preserve existing protections and unrelated work.
2. Inventory entry points and trust boundaries: browser, mobile app, API, database, storage, queues, jobs, CMS, admin, external providers, CI/CD, and any model or agent tools. Identify the identities and data crossing each boundary.
3. Select the **highest applicable tier**:
   - **S — Static:** public read-only content, no server-side user data. A contact form, CMS or backend makes the relevant part dynamic.
   - **A — Interactive:** forms, APIs, integrations or stored personal data.
   - **B — Identity:** user accounts, roles, multi-user or multi-tenant resources.
   - **C — High impact:** payments, privileged administration, sensitive/regulated data, or actions with large financial/privacy consequences.
   Add independent flags for AI/agents, native mobile, uploads, webhooks and public deployments.
4. Write a short threat model: asset, entry point, attacker capability, trust boundary, misuse case, consequence, mitigation, and owner. Do not invent compliance requirements, CVEs, test results or security assurances.

## Do the security work, don't just inventory it

1. **Design:** For A–C, identify authentication, session, authorization, data lifecycle, third-party, privilege and abuse boundaries before changing exposed behavior. Read [controls](references/controls.md).
2. **Implement:** Enforce decisions in the trusted backend, database, cloud permissions and CI. Never count a hidden UI control or an AI model's refusal as backend authorization. Use supported framework and provider primitives.
3. **Extend:** Read [platform extensions](references/platforms.md) for AI agents, native/mobile, payments or higher-risk data. Apply only the relevant sections.
4. **Test:** Follow [verification](references/verification.md). Add denial/negative tests for changed trust boundaries, not just success-path tests. Run available dependency/secret/static tools and authorized local or staging tests.
5. **Release:** Confirm the target environment, permissions, secrets, monitoring, restore/rollback and the actual deployed revision. Escalate material unfixed security exposure; do not declare it safe because the build passes.

## Minimum gate by tier

| Tier | Baseline |
| --- | --- |
| S | Secure hosting/TLS, safe external assets, dependencies, CI and secret hygiene, fit-for-purpose browser headers, preview and deployment permissions |
| A | S + strict server validation, abuse controls, safe errors, retention/consent appropriate to data, form/API misuse tests |
| B | A + correct auth/session lifecycle, server-enforced row/object/field/function/tenant controls, negative cross-account regression tests |
| C | B + explicit high-impact scenarios, least-privilege privileged/service access, approval/step-up controls where appropriate, recovery plan and risk-proportionate independent review |

Known risk overrides nominal tier. A static website with an admin CMS may need much more than S.

## Evidence and boundaries

Report each applicable control **PASS / FAIL / NOT APPLICABLE / UNVERIFIED**, with a supporting file/line, test, command result, reviewed configuration, or authorized URL, plus owner/next action. NOT APPLICABLE requires a feature-based reason; missing access is UNVERIFIED. Separate confirmed defects from untested hypotheses and unverified production settings.

When implementation is authorized, make narrow changes and add regression tests. For audit-only requests, stay read-only. Never scan third-party systems, access production user data, expose secrets, rotate keys, change production policy or pay for scanners without authorization. A security exception requires accountable human risk acceptance, never the assistant's self-approval.

## Ownership

- `codebase-health-audit` owns broad code health; this skill owns application attack paths and security controls.
- `client-website-launch` owns client requirements, inquiry delivery and launch; this skill provides security acceptance checks.
- `web-react`, `apple-review`, `apple-swift` and `mobile-screens` own platform details. Use this skill for shared server/API threats and platform-specific guidance for the client.

## References

- [Controls by trust boundary](references/controls.md)
- [AI, mobile and high-impact extensions](references/platforms.md)
- [Threat-driven tests and release gates](references/verification.md)
