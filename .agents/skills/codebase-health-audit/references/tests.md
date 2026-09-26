# Tests and coverage

A high coverage number is not enough. Check whether tests pin behavior on the
paths that change and the paths that can lose money, data, or trust.

## What to inspect

- Critical flows with no test file, or tests that never call the production
  function they name.
- Hot files (high churn or high fan-in) with no nearby tests.
- Skipped, `.only`, empty, or assertion-free tests.
- Tests that assert implementation details (private helpers, exact markup,
  mock call order) instead of observable behavior.
- Mocks that drifted from the real dependency.
- Missing negative cases: auth failure, invalid input, timeout, empty list.
- Test setup so slow or coupled that people will not run it.

## How to measure

If the repo has a coverage command, run it and quote the tool's numbers.
Otherwise:

1. List production modules on the hot path.
2. Map each to a test file, or mark `none`.
3. Read a sample of tests on money, auth, persistence, and public API paths.
4. Label any percentage you estimate as an estimate.

## Recommendations

Prefer adding a test at a seam before deepening or deleting the module behind
it. Do not recommend a coverage target that the project does not already use.
Do not generate a large suite of tests that only replay current implementation.
