# Prototype verification

Select checks for the implemented experience. Record the tested revision, URL, actual viewport, browser/device, and result. Use fictional form data and avoid sending real leads during prototype tests.

## Customer journey and mobile

- Exercise navigation through services/showcase/experience to intake and review. Ensure service prefills preserve existing answers.
- Check a typical phone, a short narrow phone, and desktop. Historical useful sizes were 390 × 844, 320 × 568, and 1440 px wide; adapt to the intended audience. Confirm the actual viewport changed before crediting screenshots as responsive evidence.
- Check horizontal overflow, sticky-panel height, first-question visibility, and keyboard/focus access. An enlarged gallery must display the image larger than its inline version. Secondary controls need comfortable hit areas; approximately 44 px is a useful design target, not an automatic conformance verdict.
- Reproduce missing-field errors and recovery; error summaries must link only to affected fields and preserve help text. Check Back, reload, cross-page navigation, dialog dismissal, and any draft expiry/clear behavior that is promised.
- For photo intake, check supported files, unreadable files, size/count limits, previews, removal, and storage failures. Do not imply attachments travel with copied text or messaging links.
- Check modal focus entry, Tab/Shift+Tab, Escape, focus return, reduced motion, and console/network failures.
- Keep browser emulation distinct from physical-phone keyboard, camera, HEIC, screen-reader speech, and message-delivery evidence.

## Publication

- Validate the deployment package contains only intended distributable files. Check project-specific private paths cannot be retrieved; a private GitHub repository does not make a Vercel site private.
- Verify critical routes and referenced assets on the final host, including redirects and the current custom domain if in scope. Check prototype notices and indexing configuration where intended.
- Exercise the primary journey on the final URL. Correlate the deployment with the tested commit/artifact; a newer GitHub commit may not be deployed.
- If automatic deployment is requested, verify repository/branch linkage and a corresponding deployment. Report manual deployment explicitly when integration remains unconnected.
- If a live intake backend is in scope and authorized, trace a clearly identified test submission to the intended receiving system and verify success/failure behavior. Otherwise report intake as prototype behavior.

## Collateral and handoff

- Render final exports, inspect clipping/readability and image quality, and verify actual contact/QR targets.
- Distinguish generated proof, client-approved identity, editable files, print exports, and conceptual ads.
- Check the final delivery folder/archive contents and links. Record any remaining owner action without promoting it to completion.
