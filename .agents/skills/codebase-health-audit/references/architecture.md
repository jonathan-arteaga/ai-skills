# Architecture signals

Audit structure, not style. Prefer evidence from imports, git churn, tests,
and module size over generic clean-code advice.

## Vocabulary

Use these terms consistently:

- **Module**: a folder or file cluster with one job and a small public surface.
- **Interface**: what callers must know. The interface is the test surface.
- **Depth**: a lot of behavior behind a small interface.
- **Seam**: a place a test or adapter can stand without opening the module.
- **Adapter**: code that translates an outside system into the module's terms.
  One adapter is a hypothetical seam; two make the seam real.
- **Locality**: a change stays near the concept it belongs to.
- **Leverage**: one deepening pays for many later changes.

## Deletion test

Ask whether deleting a suspected shallow module would concentrate complexity
behind a smaller interface, or only move the same complexity to callers. A
"concentrates" answer is a deepening candidate. A "just moves" answer is not.

## What to flag

- Circular import clusters.
- Layer leaks: UI or handlers talking to storage, domain code importing
  framework types, shared utilities becoming a dumping ground.
- Hub modules with unusually high inbound or outbound imports.
- God files (about 500 lines or more) that mix unrelated jobs.
- Shallow modules whose public surface is almost as wide as the implementation.
- One concept split across several modules so a single change bounces around.
- Untested or hard-to-test seams on hot paths.
- Architecture diagrams or README claims that contradict the import graph.

Weight files that appear in both the largest-file list and the recent-churn
list. Ignore generated code, vendored third parties, and lockfiles.

## What not to do

- Do not propose a greenfield rewrite.
- Do not invent new layers to match a textbook architecture.
- Do not reopen an ADR unless the current friction is concrete and expensive.
- Do not design a new interface until the user picks a candidate.

## Optional candidate view

If the user wants a visual pass after the markdown report, write a temporary
HTML file outside the repo (`$TMPDIR/architecture-review-<timestamp>.html`)
with before and after sketches for at most five deepening candidates. Keep the
canonical record in `CODEBASE_HEALTH_AUDIT.md`.
