# Dead code

Dead code is unused files, unused exports, unused types, unused dependencies,
and commented-out blocks that still imply they might run. It is not a private
API that tests, CLIs, framework entry points, or generated clients still use.

## Prove unused before recommending delete

1. Start with the mechanical tool for the stack (`knip`, `vulture`, `udeps`).
2. Search for the symbol and file name across the repo, including tests,
   configs, scripts, and generated barrels.
3. Check dynamic access: string imports, reflection, DI containers, routes
   registered by convention, and feature flags.
4. Check git history. A file untouched for years and never imported is stronger
   evidence than a helper added last week.

Classify each candidate:

| Confidence | Meaning | Action |
| --- | --- | --- |
| High | Tool and search agree; no dynamic or convention-based use | Safe delete candidate |
| Medium | Tool says unused; search is incomplete or the file is public API | Review |
| Low | Tests, plugins, or runtime registration may still reach it | Open question |

Do not recommend deleting a public export from a library package unless the
user said the package has no outside callers.

## Related smells

- Duplicate logic across three or more sites.
- Abstractions that exist but have one caller and no test seam value.
- Feature-flagged code whose flag is permanently on or permanently off.

Record why a noisy unused-export warning was ignored in "Looks bad but is fine".
