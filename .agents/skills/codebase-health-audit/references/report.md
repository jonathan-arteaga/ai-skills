# Report format

Write `CODEBASE_HEALTH_AUDIT.md` at the repository root. Keep it specific to
this repo. Empty categories get "Nothing material", not filler.

## Sections

1. **Header** — date, mode, scope paths, stacks detected, tools run, tools
   skipped, previous audit if any.
2. **Executive summary** — at most ten bullets, impact first.
3. **Mental model** — one or two paragraphs of how the system is actually
   shaped. Flag contradictions with the README or ADRs.
4. **Findings** — table with `ID | Category | File:Line | Severity | Effort | Status | Description | Recommendation`.
   Categories: Architecture, Dead code, Dependencies, Tests, Consistency,
   Types, Observability, Security hygiene. Severity is Critical, High, Medium,
   or Low. Effort is S, M, or L. Status is `NEW`, `OPEN`, or `RESOLVED`.
5. **Top five** — if nothing else changes, change these. Include a short sketch
   of the scoped fix, not a rewrite.
6. **Quick wins** — Low effort and Medium or higher severity.
7. **Deepening candidates** — modules that passed the deletion test. Include
   current friction, why a smaller interface would help tests, and recommendation
   strength: Strong, Worth exploring, or Speculative.
8. **Looks bad but is fine** — required. List the calls you almost flagged and
   why they stay. An empty section means the audit was too shallow.
9. **Open questions** — debt versus intent.
10. **Coverage gaps** — tools that did not run, areas not read, estimates used.
11. **Next actions** — smallest authorized next step. Default is "review this
    report". Implementation needs an explicit ask.

## Ranking

Rank by blast radius on hot paths, then by confidence, then by effort. A
Critical finding needs a concrete failure mode (broken auth, data loss, unsafe
dependency, untested money path), not a style preference.

Target enough findings to be useful and few enough to act on. A surgical audit
may have under ten. A full audit should not bury the top five in dozens of
nitpicks.
