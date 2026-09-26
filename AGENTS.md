# Working in ai-skills

This is the reviewed public source for the owned skills in `.agents/skills/`. It is an active library, not an installed host directory. Follow explicit user instructions for each task.

## Keep the source coherent

- Match each skill folder's lowercase kebab-case name to its `SKILL.md` frontmatter `name`.
- Keep the catalog, README, provenance, and actual files aligned. Add an `origins/<name>.md` note for copied or forked work; preserve upstream credit and licenses.
- Keep entry instructions short and route substantial optional detail to directly linked `references/` files. Add scripts only for behavior that benefits from deterministic execution.
- Do not add nested `AGENTS.md` files inside skill folders. Host-specific installation details belong in `docs/installation-profiles.md` and the installation tools.
- Keep employer or customer material, credentials, private profiles, machine-specific inventories, and host-managed skill contents out of this public repository.
- Preserve unrelated work. Use a focused branch and PR for substantive changes; write commits about the change.

## Verify what changed

Run commands from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm validate
pnpm test
pnpm check
```

`pnpm check` is the final local and CI gate for skill, catalog, template, tool, or test changes. Installation previews are dry-run first and must be reviewed before `--apply`; see `docs/installation-profiles.md`. Tests and source validation do not prove that a host discovered or ran a skill, so describe any live host check separately.

Keep `project.json`, the catalog, and public documentation accurate when purpose, scope, or evidence changes. Treat dated evaluation artifacts as evidence for their stated cases, not as current performance guarantees.
