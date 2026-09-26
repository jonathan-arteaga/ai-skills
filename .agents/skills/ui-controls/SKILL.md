---
name: ui-controls
description: Choose application UI primitives including labels, badges, pills, chips, tags, headers vs headings, pick lists, selects, comboboxes, lists vs data tables, surfaces, and elevation. Use when designing or building product, admin, dashboard, settings, or form UI. Not for marketing page composition or motion polish.
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Choose the control before the pixels

Name the product UI primitive and the surface it sits on before drawing or generating interface. Wrong name produces the wrong component.

This skill is the primitives layer. It does not own identity, page composition, or polish.

## Start here

1. Name the job the user is doing on this surface in one sentence.
2. Pick the control from [references/naming.md](references/naming.md). If two names both fit, read the pair in [references/controls.md](references/controls.md) and keep one.
3. Pick the surface and elevation from [references/foundations.md](references/foundations.md). Background and depth are not components.
4. List only the controls this build actually needs. Five is a lot. Then implement with the platform skill.

Do not load every reference. Read the family in play.

## Default families

| Family | Default | Do not confuse with |
| --- | --- | --- |
| Status or metadata on an object | Badge | Form Label, Button, Filter chip |
| User-created category the user can remove | Tag / Chip | Badge |
| Name of an input | Label | Heading, Badge |
| Page or app chrome | Header | Heading |
| Section title | Heading | Header, Label |
| Pick one from a known list | Select | Combobox, Dropdown menu |
| Pick or type, list may be long or searchable | Combobox | Select, Search |
| Actions hidden behind a trigger | Dropdown menu | Select |
| Compare rows of the same object type | Table | List, Card grid |
| Scan or act on a collection | List | Table |
| Separate regions | Surface contrast or border | Shadow |
| Raise a temporary layer | Elevation / shadow | Extra border |

## Pairing

- Identity and Design DNA — `design-with-taste`
- Marketing or page composition — `design-pages`
- Surface, radius, shadow, icon, and motion values — `ui-craft`
- Accessibility, focus, forms — `ux-review`
- Document the system after it exists — `design-md`
- Implement — `web-react`, `mobile-screens`, or `apple-swiftui`

If those skills are missing, still name the control and surface here, then build.

## Boundaries

- Do not invent a new primitive when one in the naming map fits.
- Do not copy Component Gallery, 02UI, Polaris, or Material pages into this repo.
- Do not impose a component library, palette, or grid. Identity stays with `design-with-taste`.
- Do not turn a landing page into an admin table. Page shape stays with `design-pages`.
- Do not pick shadow values here. Foundations name the layer; `ui-craft` picks the recipe.

Need a cross-system example? Use [references/libraries.md](references/libraries.md) as a lookup, then come back.

## Report

Lead with the inventory, then build.

| Control | Job | Why this one | Not this |
| --- | --- | --- |
| Badge | Order payment state | System metadata on a row | Tag — merchant did not create it |

Then state the surface stack (canvas / panel / overlay) and the next skill that implements it.
