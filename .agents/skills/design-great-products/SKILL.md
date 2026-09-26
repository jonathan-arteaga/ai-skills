---
name: design-great-products
description: "Judge whether a product, prototype, or AI feature is actually great. Use to cut scope, hide technology, or refuse a chatbot wrapper. Not for visual identity or writing the brief."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Design great products

Hold a product to one job done so well the technology disappears. Capability is not the bar.

If the brief is missing, use `frame-product-build` first. If the question is how it should look, use `design-with-taste`. This skill decides what survives.

## Start here

1. Name the user and the one job in one sentence.
2. Name what "done" feels like in under ten seconds.
3. Everything else waits.

Do not open with models, agents, frameworks, or screens.

## Workflow

1. **Write the job.** One user. One finished outcome. One feeling. If you cannot say it without "and", you do not have a job yet.
2. **Subtract.** List every extra surface, setting, model picker, agent, empty prompt, onboarding tip, and "it can also". Mark each `kill`, `later`, or `keep`. Default is `kill`. Read [references/tests.md](references/tests.md) and run the tests that apply.
3. **Choose the interface last.** Prefer finished work in a channel the user already has. An opinionated flow beats a toolbox. Chat is allowed only when the job is genuinely open-ended and the product still does the right thing with a lazy first message.
4. **Integrate what you control.** Model, tools, memory, permissions, UI, and copy are one product. Name the seams the user can feel. Hide or own them. Do not wrap someone else's chat box and call the wrapper the product.
5. **Inspect the unseen.** Errors, undo, latency, empty states, partial tool results, permissions, evals, and the first bad answer. If the happy path is the only designed path, the product is unfinished.
6. **Kill or restart.** If the current version still needs a prompt guide, an apology, or a "users will learn it" clause, it is not ready. Cut until the job is obvious, or restart from the job sentence.

## Decision rules

- Generation is cheap. Taste is choosing what not to ship.
- Ask what you undesigned. The best part is no part: extra agent, extra model, extra settings page.
- Users will ask for ChatGPT-for-X, more agents, or a sidebar. That is "better horses". Show the finished job.
- If the primary surface is an empty box plus a transcript, you designed the conversation, not the work. Chat can be an escape hatch. The product is the plan, the result, the log, and undo.
- A blank box is not simplicity. It never looks wrong because it never commits. Anticipation means arriving with work to accept or reject.
- If people need a manual, slash-command sheet, or "how to talk to the AI" page, the design failed.
- If users must overlook a compromise — lag, confident wrong answers, a crease in the workflow — it is not ready.
- Specific beats maximal. One loop done completely beats five demos.

## Pairing

- Missing audience, problem, or flows: `frame-product-build`.
- Testing whether an idea works at all: `frame-concept-build`.
- Visual identity: `design-with-taste`, then `design-pages` or the platform build skill.
- Why a flow feels heavy: `ux-heuristics`.
- Accessibility and semantics: `ux-review`.
- Surface polish after the product bar is met: `ui-craft`.
- Product UI primitives before build: `ui-controls`.

## Report

Lead with the job sentence. Then:

| Call | Item | Why |
| --- | --- | --- |
| Keep / Kill / Later | surface, feature, or seam | the job it serves or the test it fails |

Follow with:

- Interface call and why chat is or is not the product
- Unseen-quality gaps
- What to prototype next, as one working loop
- Next skill

Keep it to one page. Do not quote manifesto language in the report. Apply the tests.

## Example

A shop intake tool with a chatbot sidebar, three model pickers, and a settings tour. The job is: staff scan an ISBN and record condition plus price. Cut the sidebar and pickers. The first screen captures the book. Chat stays behind an overflow control for odd cases. Ready means an observed intake finishes without explanation.
