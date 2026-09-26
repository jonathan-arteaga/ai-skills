# Dependency risk

Cover three questions: is the dependency used, is it safe, and is it still the
right bet.

## Used

- Declared but never imported or executed.
- Imported but missing from the manifest.
- Duplicated packages or mixed major versions of the same library.
- Dev-only packages shipped as runtime dependencies, or the reverse.

## Safe

- Run the advisory scanner for the stack (`npm audit`, `pip-audit`,
  `cargo audit`, `govulncheck`). Cite the advisory id when the tool prints one.
- Flag unpinned or floating versions only when the project otherwise pins.
- Flag abandoned packages when the registry or git history shows no releases
  for years and a maintained alternative is already in the repo.
- Do not invent CVEs. If the scanner cannot run, say so.

## Right bet

- Overlapping libraries that do the same job (two HTTP clients, two date
  libraries, two test runners).
- Heavy dependencies used for one trivial helper.
- A standard-library or already-owned helper that replaces a package.

Prefer tightening the current manifest over adding a new abstraction layer.
Note license conflicts only when a LICENSE or manifest field makes them
visible. Do not scrape the network for license opinions.
