# codebase-health-audit

- Kind: original
- Author: Jonathan Arteaga
- License: MIT
- Source: authored for this library

Conceptual inspiration, with no upstream text copied:

- [ksimback/tech-debt-skill](https://github.com/ksimback/tech-debt-skill)
  for file-cited findings, stack-native tools, a living audit document, and a
  required "looks bad but is fine" section. License: MIT.
- [mattpocock/skills](https://github.com/mattpocock/skills) skill
  `improve-codebase-architecture` for the deletion test, deepening candidates,
  and treating the interface as the test surface.
- [ehmo/code-overhaul-skill](https://github.com/ehmo/code-overhaul-skill)
  for explicit surgical / systematic / full scope modes and sectioned review.

This skill is a distinct workflow. It writes `CODEBASE_HEALTH_AUDIT.md`, keeps
the default read-only, and combines architecture, dead code, dependency risk,
and tests in one pass. It does not copy those repositories' `SKILL.md` files,
HTML report templates, or host-specific tooling.
