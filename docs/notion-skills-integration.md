# Notion Skills and the reviewed GitHub library

Notion is the native skill-authoring and shared-access surface. This repository is the reviewed publication source. The integration reads a tagged Notion plugin group through the Skills API and proposes changes to the existing `.agents/skills` packages in a pull request. It does not create another skill repository or overwrite `main`.

## Configure the connection

Create a Notion connection with **Read content** capability and share only the intended native Skills database with it. Add its token directly to this repository's GitHub Actions secrets as `NOTION_API_TOKEN`. Set the repository variable `NOTION_PLUGIN_NAME` to the exact distribution tag/group, such as `ai-skills`. Keep workspace identifiers, tokens, and account inventories out of repository files.

The repository must allow GitHub Actions to create pull requests. The import job requests only `contents: write` and `pull-requests: write`; the other workflows retain their existing permissions. No separate long-lived GitHub token is required.

## Preview privately, then publish

For a private local preview, set the environment variables through your normal credential mechanism and run:

```sh
pnpm notion:preview
```

You can also preview a complete Skills API plugin archive without a token:

```sh
node tools/import-notion-skills.mjs --archive /private/path/plugin.tar.gz --dry-run
```

The preview reports the checked owned skills and changed repository paths, without printing instruction bodies, tokens, signed URLs, or workspace IDs.

After reviewing and approving the selected changes for public publication, run **Import approved Notion skills** from GitHub Actions on `main` and select the publication approval checkbox. The workflow downloads the complete group, validates it, applies it to the isolated checkout, runs the normal repository checks, and opens a pull request if content changed. Review and merge that PR explicitly. GitHub Actions creation of a PR does not necessarily trigger another workflow, so the import job itself runs `pnpm check` before publishing.

The workflow is manual-only. A recurring schedule is a separate choice after a real token-backed run and an update test have passed.

## Scope and preservation

- Only the existing **Owned** catalog entries are eligible. Private and external reference contents are never distributed.
- The export must contain exactly the approved skill set and every existing supporting file. Missing access, incomplete pagination, an ambiguous group, renamed skills, unsafe archives, and changed-during-download exports stop the import.
- New skills and new supporting-file paths require an explicit repository review before this automation can include them. It does not silently publish unknown attachments.
- Current Notion names, descriptions, instructions, and edits to approved supporting files are imported. Repository licenses, compatibility fields, allowed tools, attribution, and other portable metadata are retained. Notion page IDs and provenance attachments are not copied into the public packages.
- Formatting-only export differences do not rewrite reviewed instructions. Exact fenced-code contents remain significant.
- Nothing is pruned from the repository when a listing or download fails. All validation finishes before applying changes, and repository validation finishes before publishing a branch.
- An existing open Notion import PR stops another import until it is reviewed.

The API calls send `Notion-Version: 2026-03-11`, fully paginate `GET /v1/ai/plugins`, retrieve only the selected group, and download its signed archive URL without forwarding the API token.

References: [Notion Skills API](https://developers.notion.com/guides/agent-skills/overview) and [Notion's GitHub sync sample](https://github.com/makenotion/notion-skills-github-sync).
