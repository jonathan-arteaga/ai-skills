---
name: design-shopping-list
description: "Give a non-designer a shopping list of 21st.dev sections and components to browse when starting a website or new design, then turn their pasted picks into a brief before building. Skip when the references are already chosen or the change is a small edit."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Design shopping list

Tell someone with a good eye but no design vocabulary what to go find on [21st.dev](https://21st.dev), collect what they pick, and turn the picks into one coherent brief before anything is built.

## Read the project first

Check the repo and the request for a `DESIGN.md`, the stack, tokens, existing components, and any brief. Work out the site type: landing page, SaaS, portfolio, local business, agency, e-commerce, dashboard, blog/docs, waitlist, or app screen.

- Ask at most two questions, and only when the site type or audience is unknown.
- If the project already has a design system, the list is about composition and feel inside it, not a new look.

## Build the shopping list

Load [site recipes](references/site-recipes.md) for the ordered sections of that site type, then [21st.dev categories](references/21st-categories.md) for each item's link, plain-English meaning, and what to notice.

Output one table in page order:

| # | What it is (plain English) | 21st.dev name | Link | Search terms | What to notice | Must / Nice |
| --- | --- | --- | --- | --- | --- | --- |

- Keep it to 8–12 items. Drop Nice items before cutting a Must.
- Give each item a one-line tip on what a good eye should compare. For a hero: headline size against the image, one button or two, animated or still.
- Add a separate **Whole-site feel (optional)** row of 2–3 items, such as Backgrounds, Texts (text animations), Borders, Gradients, or Cursors.
- Use the category link, not a single component, so the user browses the range.

## Paste-back template

Print this block for the user to copy, one entry per pick:

```text
Section: (e.g. Hero)
Link: (21st.dev component URL)
What I like, in my own words: (e.g. "the big bold headline and the soft glow behind it")
What I don't like: (optional)
Copy prompt / screenshot: (paste here, or leave blank if you gave the link)
```

Tell the user, in one line each:

- A link plus "what I like" is enough; it saves the free plan's small daily copy limit. Add a screenshot or the Copy prompt when the look is hard to put into words.
- Mixing picks from different authors is fine; the brief will make them match.
- Skipping a section is fine; say "you choose" and it will be designed to fit.

## Take in the picks

For each pick:

1. Read the pasted Copy prompt, view the screenshot, or fetch the component URL with `.md` appended. Record the source URL and which you used. The `.md` page gives the author, license, npm dependencies, and a live-preview link, but not the code; for a link-only pick, the look comes from the user's words and, if your tools can render it, the live preview.
2. Translate the user's words into design terms with the [design glossary](references/design-glossary.md), and show the translation so they learn the vocabulary: "soft glow behind it" is a radial gradient backdrop.
3. Note the author and license. If the license is unclear, label it unverified.
4. Note dependencies the pick brings, such as `motion`/`framer-motion`, `three`, or shadcn primitives, and check them against the project's stack.

Across all picks:

- Name conflicts: light vs. dark, type families, corner radius, shadow depth, density, and motion intensity. Propose one unified style and say which pick it favors.
- Treat each pick as a reference, not a paste-in. Adapt it to the project's tokens and components.
- Do not add a second component system to reproduce one detail. An existing shadcn project stays on shadcn.

## Brief, then build

Show the brief:

- **Page outline:** a table of section → chosen pick → keep → change.
- **Shared style:** color mode, type feel, corner radius, spacing density, motion level.
- **Dependencies:** packages to add, and any that fight the current stack.
- **Unverified licenses:** picks whose terms you could not confirm.
- **Open questions:** only the ones that change the build.

Wait for the user's go-ahead. Then follow the library's generation order:

1. No `DESIGN.md` on new visual work: run `design-md` greenfield first, using the shared style as input.
2. `design-pages` for composition, with the brief as its supplied direction.
3. `web-react`, or the stack's build skill, for implementation.

The brief stands in for `design-reference-scout`'s grounding block; do not run the scout as well.

## Boundaries

- Do not sign in, buy a plan, install the 21st CLI or MCP, or ask for an API key. Links and public pages are enough.
- Do not claim a component is free to ship without checking its license.
- Do not copy a component's code into the project verbatim when the brief says to adapt it.
- If a category link 404s or the sidebar has changed, re-read `https://21st.dev/community/components`, use what is live, and say the reference file is stale.

## Report

At the list stage, lead with the shopping list and the template. At the intake stage, lead with the brief. State which picks you fetched, which you read only from pasted text or a screenshot, and which licenses remain unverified.
