# Session replay

Fail if a session-replay or session-recording tool can record a page, especially a form, before consent, or if inputs are not masked.

Name the vendor if present. Common scripts include Microsoft Clarity, Hotjar, FullStory, LogRocket, Smartlook, Mouseflow, PostHog session recording, and OpenReplay. Search the tag manager as well as the app source.

Recording form contents without prior consent is the risk these checks are aimed at, including California wiretap and CIPA-style claims. Do not call a masked recorder risk-free.

## Pass

Either:

- Session replay is off, and the snippet cannot load, or
- Recording starts only after a separate consent action, and inputs are masked by default.

Mask passwords, payment fields, messages, health details, and any free-text field that can hold them. A privacy-policy link is not consent.

## Fix

Prefer off. If the user wants replay, gate the script on consent and set the vendor mask-all-inputs option before the first record call. Do not add a new recorder while fixing this.
