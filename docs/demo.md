# Verification

Run:

```bash
pnpm test
pnpm demo
```

Expected validation:

```text
Validated catalog scope for 33 entries.
Validated 30 skill(s).
```

The profile preview stays in dry-run mode and lists the four Codex-owned skills
without modifying any installed skill folder.

The test suite also creates an invalid synthetic skill in a temporary directory
and proves that missing frontmatter is reported.
