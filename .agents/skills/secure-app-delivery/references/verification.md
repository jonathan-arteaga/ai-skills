# Threat-driven verification and release gates

Do not probe production or external systems without authorization. Use synthetic identities and test data, safe rates, and owned local/staging targets.

## Minimum negative-test matrix

| Surface | Test an expected denial/failure |
| --- | --- |
| Authentication/session | Anonymous and expired sessions denied; sign-out and privilege changes revoke/rotate as designed |
| Authorization | User A cannot read/write User B objects; tenant A cannot access tenant B rows, files, exports, cache or subscriptions; ordinary user cannot invoke admin action |
| Fields/business logic | Injected owner, role, price or status fields are rejected; duplicate/out-of-order requests do not double-apply actions |
| Browser/session | Cookie-authenticated state change resists CSRF; credentialed CORS and redirects follow policy; sensitive responses are not broadly cached |
| Input/files | Malformed, oversized, injection-like and unexpected payloads are safely rejected or encoded; path traversal and unsafe uploads denied |
| SSRF/egress | Untrusted URLs cannot fetch metadata/private network resources, including through redirect/DNS tricks |
| API abuse | Direct API calls cannot skip UI restrictions; page/size/time/attempt limits and error boundaries hold |
| Webhooks | Invalid signatures, replays and downstream failures cannot confirm or duplicate important actions |
| Secrets/CI | No privileged credentials appear in changed files, client output, preview artifacts or routine logs |
| AI agents | Retrieved malicious text cannot expand tool permissions, cross tenants or perform unapproved writes |
| Mobile | Deep link abuse, local secret storage and release-mode network behavior are tested on actual supported builds |
| Recovery | Rollback or restore procedure is exercised when consequence warrants it; security alerts reach an owner |

Select tests by real features. Static sites still need hosted TLS/headers, dependency review, permissions and secret hygiene.

## Stage checkpoints

1. **Design:** inventory assets, threat boundaries, risks and mitigation owners before major implementation.
2. **Code change:** implement guards and regression tests at the backend/data layer. Run relevant unit/integration tests, lint/types, SAST, dependency and secret scanning if tooling exists. Do not treat missing tools as a pass.
3. **Pull request:** triage findings, confirm permissions and tests, document remaining uncertainty. Do not introduce privileged scanners or weaken pipeline policy without authorization.
4. **Release:** confirm exact revision, environment, access controls, secrets, public and private routes, incident contact, monitoring and rollback. Run safe dynamic checks only on authorized targets.
5. **After deployment, if authorized:** verify actual HTTPS/headers, denied-access behavior, high-risk flows and alerts; a successful CI run is not production evidence.

## Decisions and exceptions

- **Block/escalate credible material risk:** confirmed unmitigated authorization bypass, secret disclosure, exploitable injection, privileged AI tool misuse, sensitive-data exposure, or another high-impact exploit path. Justify severity from exploitability and consequence, not just a scanner label.
- **UNVERIFIED:** a test could not run, runtime/account access was missing, or the deployment was not inspected.
- **NOT APPLICABLE:** explain the absent feature; an untested feature is not N/A.
- **Risk acceptance:** capture accountable human owner, impact, compensating measures, deadline and recheck trigger. Do not self-approve exceptions.

## Evidence handoff

Use the project's existing tracker if available:

| Threat/control | Status | Evidence | Risk and next action | Owner |
| --- | --- | --- | --- | --- |
| Cross-user object access | PASS / FAIL / UNVERIFIED / NOT APPLICABLE | path:line, test result, reviewed configuration or authorized URL | concrete issue or precise remaining check | project owner/role |

Report **only tools and tests actually run**, affected paths and release checks still pending. Omit credentials, private payloads and sensitive attack output from public writeups.
