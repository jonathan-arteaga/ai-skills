# AI, mobile and high-impact extensions

Read only the sections applicable to the project. A client security control does not remove the need for server-side authorization.

## AI, RAG and agents

- Treat user prompts, retrieved pages/documents, repository content, model output and tool responses as untrusted input. A forged system message inside retrieved text never raises authority.
- Define each tool's allowed operations, authenticated principal, input schema, file/network scope, budget and escalation path. Authorize each tool call at the service boundary; do not trust model self-restraint.
- Prevent cross-tenant retrieval and tool actions. Filter access before retrieval, and authorize again before reading sensitive results or executing side effects.
- Keep credentials and sensitive data out of prompts and retrieval corpora wherever possible. Redact outputs and logs; limit egress to approved destinations.
- Split read, draft and consequential write actions. Require an appropriate explicit approval for irreversible, paid, public or privileged side effects; verify the actual result.
- Isolate execution of generated code and untrusted attachments. Bound recursion, context, tool calls, time, retries, cost and outbound requests.
- Run negative evaluations with malicious documents, prompt injection, fake policy text, credential-exfiltration requests, cross-tenant search and unauthorized tool writes. Record observed failures without claiming model-wide guarantees.
- Reference: [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/).

## iOS, Android, Expo and native apps

- Review signing, entitlements, exported components, permissions, sandboxing, WebViews, native bridges, deep links, clipboard and sensitive logs.
- Store secrets/tokens using platform Keychain/Keystore or vetted secure-storage wrappers, not plaintext UserDefaults/AsyncStorage, debug traces or bundled constants.
- Assume clients are modifiable; validate purchases, ownership, sessions and permissions on the backend even if the app hides a route.
- Validate URLs/intents, untrusted file formats, TLS behavior, local caching, backups, screenshot exposure and permission disclosures.
- Exercise security-critical flows in release builds on supported devices; debug builds alone do not prove production behavior.
- Reference: [OWASP MASVS and MASTG](https://mas.owasp.org/).

## Payments and consequential workflows

- Prefer vetted payment processors and hosted/tokenized flows. Do not store card data or claim PCI compliance without confirming scoped obligations and independent assessment.
- Verify provider-signed events, amount/currency, order/account ownership and backend fulfillment state. A client success screen is not payment confirmation.
- Enforce atomic or idempotent handling for charging, credits, refunds, transfers, invitations and repeated/out-of-order events; test races and retries.
- Require explicit permissions for real financial actions or irreversible state changes.

## Sensitive or regulated data

- Identify laws, contracts and geographical boundaries with an accountable owner; do not infer HIPAA, GDPR, SOC 2 or other certification from generic controls.
- Restrict processing, access, retention and third-party disclosure; obtain specialist independent review as warranted by risk and contractual requirements.
