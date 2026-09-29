# ai-skills

An active public library of 31 user-owned, portable agent skills. Each skill is a small folder of instructions for a repeatable job, and every skill installs the same way on every supported host. This repository is the reviewed source; installed copies are destinations, not separate editing sources.

## Contents

- [`.agents/skills/`](.agents/skills/): the distributable skills. Browse [the catalog](skill-catalog.json) for names, categories, and tags.
- [`origins/`](origins/): source links, pinned revisions, licenses, and changes for forks or adapted material.
- [`templates/skill/`](templates/skill/): a starter for new skills.
- [`tools/`](tools/) and [`tests/`](tests/): catalog validation, local installation previews, and focused regression checks.
- [`docs/installation-profiles.md`](docs/installation-profiles.md): installation destinations and rollback guidance.

The library does not distribute private writing profiles, customer material, credentials, vendor connectors, or host-managed system skills. Some skills depend on named hosts or tools; their exact names and commands are retained where needed for correct installation and use.

## Inspect and check

Requires Node.js 24 or newer and pnpm 11.17.0 for the repository tools. Reading an individual `SKILL.md` needs no install.

```sh
git clone https://github.com/jonathan-arteaga/ai-skills.git
cd ai-skills
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` runs the tests, validates catalog and skill packaging, and previews one installation profile without writing to a host. CI runs the same check on PRs and `main`.

Every host receives the same skills. Preview the install for each host you use:

```sh
node tools/manage-installations.mjs --profile codex --dry-run
node tools/manage-installations.mjs --profile cursor --dry-run
node tools/manage-installations.mjs --profile claude-code --dry-run
```

Review the [profile guide](docs/installation-profiles.md) before `--apply`. Its links and backups are local to your machine; a GitHub update does not automatically change installed skills or cloud account skills.

## Contribute

Create a lowercase kebab-case folder under `.agents/skills/` with a matching `name` in `SKILL.md`. Update `skill-catalog.json`; for a fork or copy, record its source, license, and adaptation in `origins/`. Run `pnpm check`, review the diff, and open a pull request. Keep skill instructions focused; put longer, selectively needed detail in linked `references/` files. See [AGENTS.md](AGENTS.md) for repository working rules.

The [design workflow map](docs/design-workflow-ownership.md) explains which skill leads each design task. [Compatibility notes](docs/tool-compatibility.md) describe host differences. Dated [evaluation results](docs/evaluations/flagship-skills/evaluation-results.md) and [design trial notes](docs/design-skill-evaluation.md) document specific past tests and their limits; they are not claims about every current host or model.

## License and attribution

The repository's original material is MIT licensed; see [LICENSE](LICENSE). Individual forks retain their required attribution and, where applicable, their own `LICENSE` files. Check a skill's frontmatter and `origins/` note before reusing it.
