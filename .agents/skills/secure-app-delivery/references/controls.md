# Security controls by trust boundary

Select applicable controls based on actual features. Each needs evidence. Do not infer a control works from the presence of a dependency, vendor marketing or a successful build.

## Identity and access

- Prefer maintained authentication and identity libraries/providers. Design enrollment, recovery, verification, session expiry/revocation, sign-out and account closure explicitly.
- Use suitable multifactor or step-up authentication for privileged/high-impact actions; control brute force, credential stuffing, account enumeration and recovery abuse.
- Browser sessions: use correctly scoped Secure, HttpOnly, appropriately SameSite cookies with TLS; prevent CSRF on state-changing cookie-authenticated requests. Renew session identifiers at privilege boundaries and revoke on sign-out or compromise.
- OAuth/OIDC: verify state, nonce when appropriate, PKCE, issuer, audience and exact approved redirects; do not hand-roll token validation.
- Authorize every server route/action and data operation, including object, property, tenant, export, cache, background job and real-time subscription access. Default deny. Never infer permission solely from a client-controlled role or tenant ID.
- Give workers, bots, external services and CI identities the minimum necessary scope. Review invitation, role-change, approval, transfer and quota workflows for business-logic abuse.

## Untrusted input and processing

- Validate and normalize at the server boundary for schema, type, size and business meaning; reject fields that cannot be changed by the caller. Parameterize database queries and avoid untrusted shell construction.
- Contextually escape/encode untrusted content in HTML, URLs, DOM, templates, logs and rich text. Avoid dangerous raw HTML and untrusted Markdown rendering.
- For server-side URL fetches, guard SSRF with outbound restrictions/destination allowlists where possible, block private/link-local/metadata networks, and handle redirects and DNS changes securely.
- Restrict uploads by size/type/content and storage destination, keep uploads out of executable paths, use unguessable names, scan risky content where warranted and check download permissions.
- Validate provider webhook signatures, timestamps and replay behavior as supported; process events idempotently and handle retries/out-of-order arrival without double side effects.
- Apply appropriate rate, concurrency, request body, pagination, time and cost limits. Return safe errors; fail closed rather than converting a dependency failure into authorization.

## Web, browser and APIs

- Enforce HTTPS, platform-appropriate HSTS, CSP, framing rules, MIME sniffing and referrer policies. Verify that the real hosted page sends the intended headers; a report-only CSP is not prevention.
- Constrain CORS to intended origins and credentials. CORS does not substitute for authentication. Validate redirect destinations and URL/deep-link input.
- Minimize tokens and personal data in browser storage, URLs, caches, analytics, logs and client bundles. Never expose privileged service credentials in a public or mobile build.
- Inventory API versions, paths, RPCs, server actions, admin routes and webhooks. Test object-, property- and function-level authorization, response minimization and forgotten endpoints.
- Validate public forms on the server, control spam, support safe retries and distinguish confirmation of a submitted request from confirmation of downstream delivery.

## Data, privacy and encryption

- Record data classes, purposes, access, third-party processors, retention, deletion, export and backups. Use synthetic data in tests and private previews.
- Use maintained cryptographic libraries and managed key services for data in transit/at rest. Never write custom crypto; keep key access and environments separate and rotate on verified exposure.
- If passwords are stored, use a vetted adaptive password hasher and recovery flow; never store plaintext or reversible password values.
- Redact session tokens, credentials, authorization headers and sensitive payloads in events, logs and traces. Restrict audit log access and retention.
- Protect object stores, backups, snapshots and exports from public reads; test recovery for consequential systems and document retention/deletion choices.

## Supply chain and infrastructure

- Use reviewed dependency manifests/lockfiles; monitor advisories and obsolete packages; inspect risky package install scripts and AI-proposed shell commands before running them.
- Configure appropriate PR/release secret scanning, SAST, dependency vulnerability checks, and container/IaC checks for the project. Triage findings; business logic must still be tested manually or in integration.
- Minimize GitHub Actions/CI privileges. Prefer short-lived workload identity/OIDC over permanent deployment keys; protect branch and production environment approval boundaries; pin external CI actions to immutable revisions for higher-assurance pipelines.
- Separate preview, development, staging and production credentials and datasets. Apply least-privilege cloud IAM, database roles/row policies, network egress and storage ACLs.
- Store secrets in approved secret managers, not source, logs or client assets. If credentials appear exposed, do not print them; record containment and obtain authorization for changes.
- Protect deployment artifacts and build provenance where supported; define reversible migrations and rollbacks. Confirm public/private routes and previews use actual access control, not merely noindex.

## Operations

- Emit redactable security events for login/denial anomalies, privilege and role changes, suspicious exports and webhook validation failures. Alerts need a real recipient and response path.
- Maintain an incident contact, containment/credential rotation procedure, patching process and restore/rollback owner. Test backups proportionate to downtime and data risk.
- Revisit threats when adding roles, tenants, sensitive data, payments, AI tools, integrations or public endpoints.

## Primary-source references

- [OWASP ASVS 5.0](https://github.com/OWASP/ASVS) — verification criteria.
- [OWASP Top 10:2025](https://top10.owasp.org/2025/) — web risk categories.
- [OWASP API Security Top 10:2023](https://api-security.owasp.org/editions/2023/en/0x11-t10/) — API-specific risks.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — implementation guidance.
- [NIST SSDF SP 800-218 v1.1](https://csrc.nist.gov/pubs/sp/800/218/final) — secure SDLC practices. Check current releases before formal mapping.
