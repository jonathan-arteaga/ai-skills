# One library, the same skills on every host

GitHub reviews edits to the 31 owned portable skills and distributes those revisions.
The public `skill-catalog.json` also lists private and external references without
including their content. Category, tags, lifecycle, and
compatibility are maintained in this repository.

Native provider and system skills stay host-managed. Their contents and
inventory records, including disabled or cached bundles, do not belong in this
repository. Keep installation diagnostics local. The retired Arteaga household
skills are excluded from the catalog and these profiles.

## Profiles

Every host receives every owned skill. A profile name only chooses the destination:

| Profile | Destination |
| --- | --- |
| `codex` | `~/.agents/skills` (also retires catalog copies in `~/.codex/skills`) |
| `cursor` | `~/.cursor/skills` |
| `claude-code` | `~/.claude/skills`, including local desktop Code sessions |

- Cowork: upload the same owned skills. Actual account uploads and enabled state
  require separate verification; native Anthropic skills are managed by that host.
- Codex keeps its native productivity plugins and the private write-as-me supplement.
- Private writing and household content is not included in public packages.
- Appllama and design-taste-frontend remain optional external references. Their
  pre-existing files are backed up outside default skill discovery, not upgraded.

## Preview, apply, and verify

Run from the stable reviewed distribution checkout, not a temporary task checkout:

```sh
node tools/manage-installations.mjs --profile codex --dry-run --adopt-existing
node tools/manage-installations.mjs --profile codex --apply --adopt-existing
node tools/manage-installations.mjs --profile codex --verify
```

Use `cursor` or `claude-code` for those destinations. `--adopt-existing` is a
one-time reconciliation choice: it backs up existing catalog identities before
linking or retiring them. Review the preview first. Without it, unknown/modified
managed destinations stop the operation. Unrelated skill names are untouched.
Missing sources, dependencies, unsafe names, and changed-after-preview destinations
fail before installation. The source tree must have no tracked edits for apply.

Managed links point to the stable checkout. A local profile tracks its source
revision and file fingerprints in `~/.local/share/arteaga-skills/installations.json`.
Backups and rollback journals stay alongside that state, outside skill discovery.
Private supplements are recorded separately and are not handled by this public
installer. Do not copy provider caches into this repository.

```sh
node tools/manage-installations.mjs --rollback /path/to/reported/backup
```

Rollback must proceed newest first and refuses to overwrite newer destination
changes. It restores backed-up directories or links and the previous state.
Do not run the old all-skills copy workflow to establish a tailored profile.

## Plugin package

The repository's thin host manifests use `.agents/skills` directly. The generated `.dist/arteaga-ai-skills` folder contains a portable upload package from the same complete owned library and is ignored by Git. Rebuild it with `pnpm plugins:build` and verify packaging with `pnpm plugins:check`. Publish a new plugin version through `plugin-release.json` and the host manifests when the approved content changes.

For Codex/ChatGPT desktop, add this repository as a marketplace with `codex plugin marketplace add jonathan-arteaga/ai-skills`, then install `arteaga-ai-skills` from that source. For Claude Code, use `/plugin marketplace add jonathan-arteaga/ai-skills` and `/plugin install arteaga-ai-skills@arteaga-ai-skills`. Choose either the plugin or the existing local profile in each execution host so the same skills are not loaded twice.

For account uploads, ZIP the contents of `.dist/arteaga-ai-skills` so `plugin.json` and `skills/` are at the archive root. For a host that accepts individual skill ZIPs, package each folder under `.dist/arteaga-ai-skills/skills` separately. Preserve every supporting file. Register/update the existing library instead of creating another editing source.

Notion's native Skills database remains a separate shared-access surface. Proposed Notion edits become approved packages through a reviewed repository change; refresh native copies from the approved revision. Its current authenticated connection can provide direct retrieval without a new repository API token. A future automation is a separate, explicitly scoped choice.

## Cross-host discovery and accounts

Cursor can discover compatibility directories belonging to other tools. Verify
its actual catalog, not just `~/.cursor/skills`. Codex exclusions must cover any
changed source paths. Native host packages and system skills stay host-managed.

Claude Desktop's Customize > Skills lists account skills, not local Code skill
folders. Local Code sessions read `~/.claude/skills/` and can also load skills
enabled in the Claude account. Account sync in Claude Code requires a supported
signed-in version and can be turned off with `syncClaudeAiSkills: false`.
Choose one active source for a skill name to avoid duplicate discovery, then
verify availability in a fresh Code session and in Customize separately. See
[Claude Code desktop skills](https://code.claude.com/docs/en/desktop#use-skills)
and [Claude account skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

Cowork does not read the local `~/.claude/skills` folder. Its owned skill ZIPs are
built from the same reviewed source and uploaded through Customize > Skills.
Record account skill ID, revision, checksum, enabled state, and verification time
privately. Account uploads do not auto-update from GitHub. Claude Code uses
explicit local installation here; no account-sync assumption is required. Do not
duplicate account skills as both local and synced sources later.

GitHub pull requests review source changes before they reach `main`. They do not
apply changes to local hosts. Re-run the installer explicitly after a reviewed
source update; a second run with unchanged sources should have no operations.

## Verification boundaries

Filesystem equality and valid packages do not prove host discovery or tool access.
Use fresh catalogs and harmless sample requests. Record unavailable connectors and
unverified surfaces explicitly in the private migration report. Never expose private
voice profiles, client histories, machine-specific state, or credentials in GitHub.

Catalog metadata is reviewed in GitHub. Private and external
references cannot become distributed skill packages. The catalog test
rejects per-host skill lists, so a skill cannot silently reach only some hosts.
