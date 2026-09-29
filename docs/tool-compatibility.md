# Tool compatibility

The canonical skills use the portable `SKILL.md` shape:

```text
skill-name/
├── SKILL.md
├── agents/
├── references/
├── scripts/
└── assets/
```

Required frontmatter:

```yaml
---
name: skill-name
description: What the skill does and when to use it.
---
```

The reviewed `.agents/skills/` folder is the editable source; each `SKILL.md`
is a portable distribution entrypoint. See [installation profiles](installation-profiles.md).
Optional metadata such as `agents/openai.yaml` may improve a specific tool's
interface without replacing the portable instructions.

The low-level `tools/sync-skills.mjs` command can copy canonical folders to these
user-level roots. It copies every skill, like the installer:

| target | destination |
| --- | --- |
| codex | `~/.agents/skills` |
| portable | `~/.agents/skills` |
| claude | `~/.claude/skills` |
| cursor | `~/.cursor/skills` |
| copilot | `~/.copilot/skills` |
| all | All four distinct roots above |

Tool-specific metadata can sit beside a portable skill when it adds value, but
tool-specific instructions should not be added to the portable frontmatter.

For normal Codex, Cursor, and Claude Code installation, use
`tools/manage-installations.mjs --profile <host> --dry-run` and review its
operations before applying. It manages links and backups. For a deliberate
low-level copy, preview `tools/sync-skills.mjs` with `--dry-run`; `--force`
replaces a destination folder and can clobber a symlink.


## Design skill ownership

The 31-skill portable inventory includes design-great-products, ui-controls,
visual-fundamentals-review, product-language, and design-system-consolidator.
Their frontmatter remains normally discoverable; no explicit-only policy or
new runtime dependency is introduced. Platform-specific visual guidance is
loaded selectively.

See [design workflow ownership](design-workflow-ownership.md) for one lead per phase. Product Design and design-taste-frontend are optional external capabilities, not repository dependencies. Leave plugin caches and installed extras unchanged. Documentation authoring remains design-md-only.

Structural validation is not behavioral or device verification. See [evaluation notes](design-skill-evaluation.md) for the tested inputs and limits. Before syncing, inspect the target preview and compare existing destinations; a default dry run may report an existing copy as skipped even when its contents differ. Cursor symlinks already pointing into this repo reflect merged distribution edits without a copy operation.

## Model and host guidance — checked 2026-09-12

Keep the portable instructions model-neutral. Use host configuration for effort,
tools, context limits, progress display, and permissions. Do not duplicate API
prompt templates or force a reasoning method into every skill.

- Astra benefits from concise descriptions, task-specific reference loading,
  proportionate verification, and clear completion/authorization boundaries.
  See [OpenAI's skill guidance](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).
- Fable 5.1 benefits from explicit completion criteria and scoped edits. Request
  useful progress updates in the host when needed; do not add a broad workflow
  to a simple task. See [Anthropic's prompting guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1).
- Preserve user-specified models. The local Cursor account listed Fable 5.1 and
  Grok 4.6, but rejected Astra and did not list Grok 4.7. User-approved trials
  therefore cover Astra in Codex, Fable in Claude Code/Cursor, and Grok 4.6 in
  Cursor. Availability is an observed account state, not a universal limitation.
- Every owned skill installs on every host. The validator warns on host-specific
  tokens such as `CODEX_HOME` or `~/.claude` with no per-skill exceptions.

`compatibility` is a supported optional field in the
[Agent Skills specification](https://agentskills.io/specification#compatibility-field).
The repository validates its parsed string value and 1–500-character bound.
Host-specific fields remain outside this library's portable frontmatter.
Claude's reserved-name and description restrictions are labeled host constraints.
Size and contents-list warnings are editorial guidance, not format errors.

Claude Code substitutes positional dollar tokens in skill bodies; literal
prices such as `\$4.99` use one escaping backslash. See the
[Claude Code skills reference](https://code.claude.com/docs/en/skills).

## Controlled evaluation

Use isolated project skill folders and fresh sessions. Check actual tool reads
to distinguish a loaded skill from a fallback answer. In the restricted native
Claude CLI trial setup, some initial runs skipped the local skill; those pairs
were rerun with explicit file paths. File-based trials measure the instructions,
not automatic host discovery. Keep user-level installation previews separate.

The CLI trial runner is opt-in and never runs in `pnpm check` or CI. See the
[dated evaluation results](evaluations/flagship-skills/evaluation-results.md) for model settings, evidence, and limits.


## Guided discovery

`think-with-me` uses portable instructions and permits automatic selection;
its Codex metadata explicitly enables implicit invocation. Actual selection
depends on the host and task. It helps clarify unsettled goals and consequential
choices, then leaves discovery when there is enough direction to proceed.
It does not require a particular connector, create a persistent session mode,
or replace global communication preferences. `frame-product-build` and
`frame-concept-build` are optional follow-on workflows, not dependencies.
