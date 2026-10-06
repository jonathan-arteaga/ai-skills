# Self-hosted fonts

Fail if a page, stylesheet, or client bundle requests a font from a third-party host at runtime.

Search for `fonts.googleapis.com`, `fonts.gstatic.com`, `use.typekit.net`, `p.typekit.net`, Adobe Fonts, Font Awesome CDN stylesheets, and `@import` rules that point at a font host. Also check third-party widgets that inject a font link.

`next/font` and similar build-time loaders pass only if the built client does not fetch the font vendor at runtime. Verify the built HTML and network path, not only the source import.

## Pass

- Font files are served from the app origin or another host the operator controls.
- The license allows that hosting. Keep the license file with the font when the license requires it.
- No runtime request to a font CDN remains in the document, CSS, or a tag manager snippet.

## Fix

Download the licensed files, subset if the license allows, and serve `woff2` locally. Remove the vendor stylesheet link. Do not replace a licensed commercial font with a lookalike without a license.
