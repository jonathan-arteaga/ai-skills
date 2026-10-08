# Website release checks

Adapt this checklist to the agreed endpoint and implemented features. A local prototype can be complete while live delivery and domain cutover remain future work. Use the client's existing queue rather than generating another tracker unnecessarily.

Record checks as: `Item | Status | Evidence (revision, URL, result, date) | Owner / next action`. Screenshots and automated checks complement journey tests; neither alone proves the launch works.

## Brand and content

- Current selected brand is used throughout; superseded marks, colors, contact details, and boilerplate are removed from release output.
- Public identity, affiliation, service claims, portraits, testimonials, asset rights, and applicable disclosures have appropriate source/review records. Missing optional proof is omitted consistently.
- English and Spanish route/content inventories match the agreed scope. Count actual routes, including privacy or optional pages; do not rely on a rough page estimate.
- Spanish copy has an identified reviewer and status. Translation preserves intent; translated testimonials do not imply Spanish was the original language.
- Privacy copy matches the actual forms, providers, data practices, and any chosen analytics. Do not copy a previous client's policy as verified advice.

## Bilingual journeys and accessibility

- Representative visitors can understand the offering and reach the intended CTA on phone, tablet, and desktop in either language.
- Language switching preserves equivalent page context; subsequent navigation, reloads, and direct locale URLs behave as designed.
- Both languages cover menus, mobile navigation, fields, validation errors, success/failure states, metadata, privacy, and relevant image alternatives.
- Longer Spanish labels, accents, zoom/reflow, and mobile keyboards do not clip content or hide form actions.
- Keyboard navigation, focus visibility, labels/errors, contrast, touch controls, and reduced-motion behavior have been checked where applicable. Automated scans do not establish accessibility certification.
- Deep links, navigation, unknown routes/404s, and return navigation work. Applicable type/build/lint checks pass; relevant runtime and console errors are resolved.

## Contact path

- Prototype delivery is accurately described. Live contact actions use verified destinations and have no false “sent” states.
- An authorized synthetic inquiry reaches the intended inbox/provider/CRM with correct language and source context; receipt evidence and follow-up owner are recorded.
- Required-field validation, server rejection, spam controls, failure/retry, and rapid duplicate submission are checked. Recoverable errors retain inputs and offer a verified alternative when available.
- Secrets are excluded from client bundles and source. Personal form values are absent from URLs and routine analytics/logging. Inquiry and marketing permissions remain distinct.

## Repository and deployment

- Intended repository, visibility, owner, branch, and pushed/merged revision are verified. Working changes are understood and unrelated work preserved.
- Hosting account/team, project, deployment revision, environment, and final URL are verified. Record whether deployment is manual or Git-connected; prove an automatic deployment before claiming it.
- Public output excludes private handoffs, research, credentials, and unintended source assets. Confidential previews have access protection; noindex alone does not provide it.
- Final hosted pages, routes, assets, contact behavior, and both locale journeys are checked after deployment, not inferred from local success.

## Domain and operations, when in scope

- Domain ownership and change authority are known. Verify intended hostname, DNS, HTTPS, canonical redirects, and any authorized old-URL redirects while preserving existing mail/service records.
- Production metadata has the real base URL, unique titles/descriptions, reciprocal locale links, sitemap, social previews, and verified structured-data facts where used.
- Preview indexing restrictions and intended production indexing are handled deliberately. Search Console and analytics remain pending unless access, scope, and verification support completion.
- Release review/authorization, fallback deployment or rollback procedure, account owners, costs, lead destination, content-edit process, and support scope are recorded.
- For a transition, priority owned contact links work; unresolved external directory/profile changes remain visible with owners. Sending a correction request does not mark the profile updated.

## Milestone return note

```text
Milestone and requested endpoint:
Completed task IDs:
Working project/repository and revision:
Artifacts / preview / production URL:
Checks performed and results:
Decision changes and sources:
Pending input -> affected deliverable -> owner:
Scope or recurring-cost changes:
Exact next task:
```
