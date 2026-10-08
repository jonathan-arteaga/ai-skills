# Stack tools

Run only what the repository can support. Prefer `npx`, `uvx`, or language
CLIs already present. If a command is missing, record it under coverage gaps
and continue. Do not install packages unless the user asks.

## Detect the stack

Look for `package.json`, `pnpm-lock.yaml`, `yarn.lock`, `tsconfig.json`,
`pyproject.toml`, `requirements.txt`, `Pipfile`, `go.mod`, `Cargo.toml`,
`Podfile`, `*.xcodeproj`, `Package.swift`, and workspace or monorepo manifests.
Apply every matching stack. Tag findings with the module they belong to.

## JavaScript and TypeScript

- Unused files, exports, and dependencies: `npx knip`
- Unused or missing packages if Knip cannot run: `npx depcheck`
- Circular imports: `npx madge --circular`
- Advisory scan: `npm audit` or the package manager equivalent
- Type drift: `npx tsc --noEmit` when a `tsconfig.json` exists

## Python

- Dead code: `vulture`
- Lint and unused imports: `ruff check`
- Cycles: `pydeps --show-cycles` or `uvx depcycle`
- Advisory scan: `pip-audit` or `uv pip audit`
- Type drift: `mypy` only when the project already uses it

## Rust

- Advisories: `cargo audit`
- Unused dependencies: `cargo udeps` or `cargo machete`
- Extra lint: `cargo clippy`

## Go

- Advisories: `govulncheck`
- Static checks: `go vet`, `staticcheck`, or `golangci-lint` if configured

## Apple / Swift

- Prefer the project's existing test and lint commands.
- Flag files over 500 lines, protocol surfaces that leak implementation, and
  modules with no matching test file. Do not invent Xcode-only metrics.

## Coverage and tests

Use the project's test runner if it is obvious (`pnpm test`, `npm test`,
`pytest`, `cargo test`, `go test`, `xcodebuild test`). If a coverage reporter
is already configured, run it. Otherwise estimate gaps from missing test files
and untested hot paths; label estimates as estimates.

## Parallelism

Run independent tool commands together. Keep raw tool output out of the final
report; fold confirmed items into cited findings.
