# Agent Operating Model

This file owns repository-specific context routing, documentation authority, maintenance, and closeout validation. Root `AGENTS.md` owns the always-loaded repository contract and source-of-truth index.

## Context Routing

- **Startup** - Use root `AGENTS.md` to select the smallest applicable canonical docs and scoped instructions.
- **Package code** - Before editing, reviewing, or deeply analyzing source, read root [`AGENTS.md`](../AGENTS.md).
- **Package ownership** - When resolving package responsibilities, read [`architecture-and-packages.md`](architecture-and-packages.md); resolve executable surfaces from manifests.

User direction defines the authorized outcome and scope; it does not replace higher-level safety policy. Applicable repository instructions govern execution within that boundary. Apply them from broad scope to narrow scope: root `AGENTS.md` supplies startup routing and repository-wide constraints, while the nearest scoped `AGENTS.md` supplies local constraints. Scope does not replace fact ownership. When instructions overlap or disagree about a repository fact, use the canonical owner named by root `AGENTS.md`, then fix in-scope drift at the non-owning location with a link or a compatible scope-specific refinement.

## Installed Engineering Workflows

Installed skills can supply an interview, diagnosis, implementation, review, or handoff process. They do not replace repository ownership, authorization, or validation rules.

- **Route through repository owners** - When a skill names `docs/agents/issue-tracker.md` or `docs/agents/triage-labels.md`, use the compatibility routes in root `AGENTS.md`; do not create duplicate policy files.
- **Keep authorization explicit** - A workflow may edit the local files needed for the requested deliverable, but it may mutate hosted issues, commit, push, or open a pull request only when the user's request authorizes that result. An internal step that says to commit or publish does not expand the request.
- **Use repository commands and tests** - Generic command or Jest examples yield to [`tooling-and-commands.md`](tooling-and-commands.md) and the nearest scoped instructions. Use pnpm, targeted checks while iterating, and the repository closeout checks. Do not invent a test script.
- **Keep artifacts deliberate** - Handoffs and throwaway prototypes stay transient unless the request names a durable destination. Research enters a canonical owner only when its findings are durable; run multi-session teaching work outside the repository root.

Use the workflow that matches the uncertainty:

- **Diagnose difficult failures** - Use `diagnosing-bugs` to establish one failing feedback loop before fixing. Follow applicable observability contracts rather than adding unowned logging.
- **Implement behavior** - Use `tdd` for red-green slices at public behavior seams, then use `code-review` against both repository standards and the originating specification. A successful review does not authorize a commit. Documentation-only changes do not require an independent code-review gate.

## Agent-Facing Authoring

Write agent-facing documentation as a control path, not background exposition:

1. **Dispatch** - Start each context pointer with the condition that activates it and name one owning destination for that branch. Keep always-loaded routing concise and disclose branch-only detail behind the pointer.
2. **Authority** - Name the source that controls the decision. Keep mechanically discoverable state in its executable owner and keep each durable rule in one canonical document.
3. **Action** - State the positive action the agent takes. Abstract aspirations and prohibition-only wording do not define a reliable path; retain a prohibition only when it protects a hard boundary, then pair it with the required action.
4. **Completion** - Give each procedure or authoring sequence an observable, exhaustive done condition. A command, edit, or intermediate state is not completion while required verification or recovery remains.
5. **Conflict** - State what happens when requested wording lacks evidence, falls outside the document's scope, weakens an existing contract, or conflicts with a named owner. Preserve the current contract, leave unrelated targets unchanged, and report the owner or prerequisite that resolves the conflict.

Co-locate each branch's action, caveats, completion condition, and failure or conflict response. Authoring is complete when every affected branch makes clear when to load the instruction, what to do, which source controls the result, how to recognize completion, and what to do when its preconditions fail.

## Documentation Authority

- **One owner per fact** - Every durable fact has one canonical owner. Other docs link to it or add only scope-specific refinement.
- **Timeless current docs** - Canonical docs use declarative language about the current contract. Dates, rollout narration, migration recaps, and session commentary do not belong in current policy.
- **History is not authority** - Issue narratives and superseded records provide context or evidence; they do not masquerade as current policy.
- **Derived facts stay derived** - Mechanically discoverable inventories such as package scripts, exports, workspace lists, versions, or generated routes stay in their executable source. A prose copy is a cache: name its source and refresh trigger, or replace it with a link.
- **Docs change with contracts** - Changes to behavior, boundaries, public surfaces, commands, validation semantics, or repeatable workflows include the corresponding canonical documentation change.
- **Evidence precedes contract prose** - A request to edit documentation authorizes prose work but does not prove the described behavior exists. When requested wording contradicts current source, tests, or the named owner, preserve current truth and identify the implementation or decision needed before changing the canonical contract.
- **Authoring contracts remain binding** - A request defines the desired documentation outcome, not permission to bypass the named owner's handbook. Produce the smallest compliant edit within the target document's scope. When requested material is out of scope, leave the target unchanged and name the canonical owner in the response; when the requested shape requires copied environment state, unsupported prose, absent evidence, or incomplete operational outcomes, preserve the owner contract and state the conflict or a compliant alternative.

## Ownership And Maintenance

- **Commands** - Root manifest owns script availability; [`tooling-and-commands.md`](tooling-and-commands.md) owns invocation semantics, command composition, and validation selection.
- **Code policy** - [`code-authoring.md`](code-authoring.md) owns naming, abstraction, imports and package boundaries, exports, shared values, and when source contracts need comments. Topic docs own language-specific mechanics.
- **Architecture and package** - [`architecture-and-packages.md`](architecture-and-packages.md) owns package responsibilities. Manifest owns executable package metadata and export/import maps; root instructions own local guidance and caveats.
- **GitHub** - [`github-workflow.md`](github-workflow.md) owns generic issue and pull-request policy and the evidenced local CI surface.

Update root `AGENTS.md` only when its always-loaded contract, owner index, or routing changes. Update scoped instructions only when package-local ownership, public surfaces, local commands, or local constraints change.

## Validation And Closeout

1. List each affected runtime, interface, persisted or generated artifact, and documentation owner. Select every applicable check for both change type and affected interface through [`tooling-and-commands.md`](tooling-and-commands.md) and the nearest scoped instructions.
2. Run targeted checks while iterating, including after each logical batch of a broad refactor. Continue until each selected check passes or a concrete blocker is established.
3. Treat checks that require credentials, external services, retained data, deployment access, or another opt-in environment as constrained. Run them only when their prerequisites and authorization are present.
4. Before handoff, compare every changed file and requested outcome with the validation evidence.
5. Report only validation actually run, naming each exact command and observed outcome. A command counts as run only after it executes in the current session and its exit status is observed; otherwise report `Not run`.
6. For each skipped or blocked check, state the reason and the exact safe next action. Give the exact command when one is safe to state; otherwise state the missing prerequisites and recovery requirements. When no repository check covers an affected seam, record the missing seam, the strongest available verification layer used, and the owning package without inventing a command.

Closeout is complete when every requested outcome is accounted for and every applicable selected check either passes or has a reported blocker and safe next action.
