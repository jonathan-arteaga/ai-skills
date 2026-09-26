# Design workflow ownership

Use one lead workflow per phase. Choose by the requested outcome, not a keyword alone. Load a supporting skill only for a concrete concern and combine repeated root causes in the final report. “Make this prettier” can require a short clarification when preservation versus redesign is unresolved; it should not wake the whole library.

Current task instructions and established product/platform decisions outrank generic recipes. A heuristic is not evidence of a defect. Preserve accessible, readable choices that serve the product, including compact density, editorial italics, single-family type, and wrapped labels.

Generation order for new visual work: design-with-taste → design-md (lock tokens) → ui-controls → platform build → ui-craft → visual-fundamentals-review. Do not draw pixels before DESIGN.md exists.

| Outcome | Lead | Boundary or handoff |
| --- | --- | --- |
| Decide the one product job and what to cut | design-great-products | Challenge unnecessary surfaces; frame-product-build specifies the chosen product. |
| Audience, problem, objects, key flows | frame-product-build | Frame the product; do not redesign existing navigation incidentally. |
| External visual references | design-reference-scout | Research principles; selected local-project synthesis belongs to design-style-synthesis. |
| Product identity and visual direction | design-with-taste | Establish identity; hand numeric lock to design-md before pages or implementation. |
| Create or lock DESIGN.md | design-md | Sole format owner. Repo and URL modes stay evidence-strict. Greenfield may write a Draft starter scale only when no governing source exists. No source migration or competing schema. |
| Create/redesign/study web pages | design-pages | Own composition and product fit. Product-UI work reads DESIGN.md first. Marketing slop-test stays optional and marketing-only. |
| Review existing visual fundamentals | visual-fundamentals-review | Read-only; implementation belongs to the selected platform workflow. |
| Cognitive load, choices, grouping, simplification | ux-heuristics | Explain flow friction; deep taxonomy/user research is not implied. |
| Web accessibility, focus, forms, semantics | ux-review | Product wording uses product-language; style defaults cannot override approved copy policy. |
| Interface wording and terminology | product-language | Preserve behavior and voice; Apple resource/platform checks use apple-review. |
| Choose product UI primitives and surfaces | ui-controls | Name the control before implementation. Product slop list and fallback scale live here; DESIGN.md values win. |
| Surface, icon, optical, and motion polish | ui-craft | Existing motion language outranks fallback numbers. |
| Consolidate tokens/components and migrate consumers | design-system-consolidator | Preserve justified variants; route verified documentation updates to design-md. |
| Apple product/platform audit | apple-review | Keep native checks; request focused supporting passes only where needed. |
| Implement UI | web-react / apple-swiftui / mobile-screens | Select by stack. Read DESIGN.md before UI files. If missing on new visual work, stop and run design-md greenfield. |
| Author-voice prose | write-in-authentic-voice | Draft, Edit, and Audit modes. Does not take over UI terminology. |
| Screenshot-grounded flow audit, when installed | Optional Product Design audit plugin | Vendor workflow, outside this repo. Without it, inspect the accessible flow and disclose evidence limits; portable skills do not require the plugin. |
| Alternative web taste workflow, when installed | Optional design-taste-frontend | An explicit alternative to design-pages, not a co-default. Do not modify installed extras or plugin caches to implement this routing. |

A build can finish with a fundamentals review, and a consolidation can finish with documentation. Supporting phases do not retroactively authorize additional edits. Keep a neutral audit read-only; use the relevant implementation workflow when correction is requested.

Copy [product-repo-design.mdc](product-repo-design.mdc) into a product repository so unnamed host turns still read DESIGN.md. Do not add that rule to this library’s AGENTS.md.

No new general router, motion pack, typography pack, or IA skill is required. Revisit deeper taxonomy and empirical user research when a product actually needs them. Do not equate a heuristic assessment with a user study.
