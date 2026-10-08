---
name: codebase-health-audit
description: "Audit a whole repository for architectural friction, dead code, dependency risk, and test coverage. Use when asked to audit a codebase, review architecture, find unused code, check dependency risk, measure test gaps, or run a health check. Do not use for a single-file review or a pull-request diff."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Audit codebase health

Produce an evidence-backed health audit of the current repository. Default to
read-only analysis. Do not edit product code, delete files, or rewrite modules
unless the user explicitly asks for implementation after the report.

## Choose a scope

Infer one mode from the request. If the user named a path, use that path.
Ask only when the choice would change the work.

| Mode | When | Bound |
| --- | --- | --- |
| Surgical | One subsystem, one pain, or a named path | One theme, one session |
| Systematic | Health check with time to review | One section at a time; cap each section at four ranked findings |
| Full | Whole-repo audit, unspecified scope | All sections; write a phased roadmap |

Do not silently shrink a full audit. If a tool or area is unavailable, record
the gap and continue.

## Workflow

1. Orient. Read the README, manifests, architecture notes, `CONTEXT.md`, and
   `docs/adr/` if they exist. Map entry points and top-level modules. Use git
   history to find hot files (recent churn) and cold files (large and stale).
   Detect the stack and which local tools can run. Read
   [references/tools.md](references/tools.md).
2. Run the mechanical pass for the detected stack: unused files and exports,
   unused or missing dependencies, circular imports, known advisories. Missing
   tools are coverage gaps, not findings.
3. Audit architecture. Look for circular imports, layer leaks, hub modules,
   god files, shallow modules, and untested seams. Apply the deletion test in
   [references/architecture.md](references/architecture.md). Weight recently
   changed areas first.
4. Audit dead code, dependency risk, and tests using
   [references/dead-code.md](references/dead-code.md),
   [references/dependencies.md](references/dependencies.md), and
   [references/tests.md](references/tests.md). Every concrete finding needs a
   `path:line` citation.
5. Write `CODEBASE_HEALTH_AUDIT.md` at the repo root using
   [references/report.md](references/report.md). If a previous audit exists,
   mark resolved findings `RESOLVED`, refresh stale ones, and tag new ones
   `NEW`.
6. Stop at the report unless implementation was already requested. Recommend
   scoped changes, not rewrites.

For repositories with more than about five top-level modules, split the audit
by module, then merge, dedupe, and rank in one report.

## Guardrails

- Do not treat coverage percentage as proof of behavior.
- Do not recommend deleting code unless usage searches and the mechanical pass
  agree, or the uncertainty is listed as an open question.
- Do not re-litigate a recorded ADR unless current friction makes the decision
  expensive. Mark that candidate as contradicting the ADR.
- If something looks messy but is load-bearing, put it in "Looks bad but is
  fine". That section is required.
- Do not invent CVE numbers, coverage percentages, or effort estimates that
  tools did not produce.

## Report

Lead with the three highest-leverage findings and the recommended next change.
Then point to `CODEBASE_HEALTH_AUDIT.md`. State the mode used, tools that ran,
tools that were skipped, and what remains unverified.
