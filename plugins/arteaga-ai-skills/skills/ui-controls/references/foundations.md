# Surfaces and depth

Background and depth are foundations. They are not components. Name the layer, then let `ui-craft` pick values.

## Surface stack

| Layer | Job | Typical treatment |
| --- | --- | --- |
| Canvas | The page itself | Base background. No shadow. |
| Panel | Groups related work (card, section, sidebar) | Contrast against canvas, or a border. Shadow only if it floats. |
| Overlay | Temporary work on top (popover, menu, modal, sheet) | Raised. Dim or leave the canvas. Must be dismissible. |

Do not give every Panel a shadow. Flat products separate regions with background contrast or a hairline.

## Depth rules

- One light source. Shadows fall the same direction on a screen.
- Closer to the user means more attention. Modal above popover above panel above canvas.
- A pressed control loses elevation. A dragged row gains it.
- If a shadow exists only to fake a border, use a border. If a border exists only to fake depth, use a shadow.

Values live in `ui-craft` (`references/surfaces.md` when that skill is installed). Do not invent a second shadow scale here.

## Background

- One canvas color per theme.
- A second surface color groups work. A third is rare.
- Do not decorate the canvas to hide a weak layout.
- Text on a colored surface needs its own contrast. Grey body text on a tinted panel usually fails.

## Header backgrounds

A Header can share the canvas or sit on a distinct panel. Sticky Headers need a solid or frosted fill once content scrolls underneath. A transparent Header on a busy canvas loses the title.
