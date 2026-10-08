# Product UI slop

Use this list for app chrome, dashboards, settings, and forms. Do not apply the design-pages marketing slop-test here. One type family is valid in product UI when DESIGN.md chose it.

If DESIGN.md exists, its tokens win. This file only names defects the scale does not catch.

## Tells

- Off-scale space: 13, 15, 17, 18, or 22px. Snap to the locked scale.
- Placeholder used as the only label.
- Table or form wrapped in a card wrapped in a card.
- Default Inter plus Tailwind or shadcn blue unless DESIGN.md chose them.
- Marketing-hero padding on a settings or dashboard view.
- Missing focus-visible, active, or disabled on an interactive control.
- Grey text on a tinted surface.
- Border, shadow, and ring stacked on one surface.
- More than one primary button per region.
- Empty, loading, or error omitted on a surface that can enter those states.
- scale(0), ease-in on entrance, or transition: all.
- A new radius or type size invented for one component.

## After the first screen

Fix the top three tells before calling the build done. Route identity changes to design-with-taste. Route token edits to design-md.
