# Greenfield DESIGN.md template

Use only in greenfield mode: no governing tokens, no existing DESIGN.md, and the user is starting a product or prototype.

Copy this shape. Replace the four identity fields: product name, accent, font, density. Leave the scale intact unless the user names a different one.

Label the Overview as a Draft. Stop after writing the file. Implementation belongs to a new session.

```yaml
---
version: alpha
name: <product>
description: Draft token lock for <product>. Accent is punctuation, not chrome.
colors:
  background: "#FAFAFA"
  surface: "#FFFFFF"
  foreground: "#0A0A0A"
  muted: "#737373"
  border: "#E5E5E5"
  primary: "<accent from design-with-taste>"
  danger: "#DC2626"
  success: "#16A34A"
typography:
  sans:
    fontFamily: "<font from design-with-taste>"
  body:
    fontFamily: "<font from design-with-taste>"
    fontSize: 16px
    lineHeight: 24px
    fontWeight: 400
  heading:
    fontFamily: "<font from design-with-taste>"
    fontSize: 24px
    lineHeight: 30px
    fontWeight: 600
    letterSpacing: -0.02em
  caption:
    fontFamily: "<font from design-with-taste>"
    fontSize: 12px
    lineHeight: 16px
    fontWeight: 500
rounded:
  control: 6px
  card: 10px
  dialog: 14px
  pill: 999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  6: 24px
  8: 32px
  12: 48px
  16: 64px
---
```

## Overview

Draft lock. Product UI is compact and quiet unless the thesis says otherwise. Marketing pages may use larger section gaps only. One accent, used on the primary action, links, and focus.

## Do's and Don'ts

- Use only the spacing, type, radius, and color roles above.
- Do not invent 13px, 15px, 17px, 18px, or 22px.
- Do not put raw hex in components.
- Do not nest cards inside cards.
- Do not use a second accent on one screen.
- Do not stack a heavy shadow, thick border, and ring on the same surface.
- Do not use placeholder text as the only label.
- Do not animate from scale(0), use ease-in on entrance, or write transition: all.
- Do not mix marketing-hero padding into settings, dashboards, or app chrome.
