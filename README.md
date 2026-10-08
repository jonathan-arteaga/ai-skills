# ai-skills

An active public library of 31 user-owned, portable agent skills. Each skill is a small folder of instructions for a repeatable job, and every skill installs the same way on every supported host. This repository is the reviewed source; installed copies are destinations, not separate editing sources.

The native Notion Skills library is a shared access surface for these approved packages. Proposed edits made there must be reviewed in this repository before becoming a new published version. Refresh the Notion copies and host installations from the same reviewed revision. A separate Notion-to-GitHub repository is not required. The [Notion Skills integration](docs/notion-skills-integration.md) previews complete native exports and opens publication-approved changes as pull requests in this repository.

## Contents

- [`.agents/skills/`](.agents/skills/): the distributable skills. Browse [the catalog](skill-catalog.json) for names, categories, and tags.
- [`origins/`](origins/): source links, pinned revisions, licenses, and changes for forks or adapted material.
- [`templates/skill/`](templates/skill/): a starter for new skills.
- [`tools/`](tools/) and [`tests/`](tests/): catalog validation, local installation previews, and focused regression checks.
- [`docs/installation-profiles.md`](docs/installation-profiles.md): installation destinations and rollback guidance.
- Thin host manifests point directly to `.agents/skills/`. `pnpm plugins:build` produces a complete portable upload package in the ignored `.dist/` directory, preserving supporting files, licenses, and attribution without committing another copy of the skills.

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

## Plugin and Notion distribution

Run `pnpm plugins:build` after an approved source change. The upload package is generated from the owned catalog entries; private and external references are never copied. `pnpm plugins:check` verifies the host manifests and a temporary complete package. Update `plugin-release.json` and the host manifest versions when publishing a new plugin version.

This repository includes marketplace catalogs for Codex/ChatGPT desktop, Claude Code, and Cursor-compatible plugin surfaces. The plugin has a portable Agent Plugins manifest, plus Codex, Claude, and Cursor compatibility manifests. The same package can be uploaded to account skill/plugin surfaces that accept ZIP files; actual availability depends on the host and account.

Use one active installation source for each skill name. Local skill folders, installed plugins, and account uploads are distinct destinations. Check a fresh skill catalog and a harmless request in each host after installation.

Notion can serve skills directly through an authenticated Notion connection. The manual-only Import approved Notion skills workflow uses a read-only Notion token and the repository-scoped GitHub Actions token; see the integration guide. No recurring import schedule is enabled. Keep workspace IDs, Notion links, account inventories, private profiles, and credentials in private setup records rather than this public repository.

## Contribute

Create a lowercase kebab-case folder under `.agents/skills/` with a matching `name` in `SKILL.md`. Update `skill-catalog.json`; for a fork or copy, record its source, license, and adaptation in `origins/`. Run `pnpm check`, review the diff, and open a pull request. Keep skill instructions focused; put longer, selectively needed detail in linked `references/` files. See [AGENTS.md](AGENTS.md) for repository working rules.

The [design workflow map](docs/design-workflow-ownership.md) explains which skill leads each design task. [Compatibility notes](docs/tool-compatibility.md) describe host differences. Dated [evaluation results](docs/evaluations/flagship-skills/evaluation-results.md) and [design trial notes](docs/design-skill-evaluation.md) document specific past tests and their limits; they are not claims about every current host or model.

## License and attribution

The repository's original material is MIT licensed; see [LICENSE](LICENSE). Individual forks retain their required attribution and, where applicable, their own `LICENSE` files. Check a skill's frontmatter and `origins/` note before reusing it.
