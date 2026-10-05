# Development

This agent-only handbook owns package responsibilities, source/documentation authoring contracts, and [agent workflow](#agent-workflow). [AGENTS.md](../AGENTS.md) owns startup authority and audience boundaries; [CONTRIBUTING.md](../CONTRIBUTING.md) owns shared human contribution/setup procedures; [Releasing](releasing.md) owns publication.

## Package Responsibilities

`@devlsh/tools` is one ESM TypeScript lint/format package, not an application or deployment stack. Its public consumer contracts are:

- **[Base Oxlint preset](../src/oxlint/index.ts)** - Registers generic anti-slop rules.
- **[Opt-in Effect preset](../src/oxlint/effect.ts)** - Extends base with Effect-specific rules.
- **[Generic plugin](../src/oxlint/anti-slop/index.ts)** - Owns generic rules and nearby shared analysis.
- **[Effect plugin](../src/oxlint/anti-slop/effect/index.ts)** - Owns Effect-specific rules and nearby shared analysis.
- **[Oxfmt preset](../src/oxfmt/index.ts)** - Owns reusable formatting.

[package.json](../package.json) owns exact consumer paths, metadata, dependencies, scripts, export/import maps, and package contents; [tsdown.config.ts](../tsdown.config.ts) owns output. Edit source/build configuration, not ignored generated `dist/` modules/declarations; regenerate for affected consumers. `prepack` builds current source, neither runs tests nor requires an additional packing-validation gate. Refresh this projection when entrypoints or ownership change.

[README.md](../README.md) owns public examples and human onboarding. Refresh examples with public surfaces and preserve contribution, security, and support routes. Internal modules use canonical docs/instructions/manifests, not module-local READMEs or compatibility policy copies; public-package READMEs may document external usage/API. [LICENSE](../LICENSE) grants MIT; [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) retains vendored MIT notices/source attribution; [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) is separately CC BY-SA 4.0 licensed.

## Change Boundaries

Inspect instructions, manifests/maps, relevant source, tests, and docs. Make the smallest direct durable change, without broad migrations, speculative layers/helpers, or purity-only work. Public, persisted, or external contract changes require an explicit design decision; confirm external consumers before package-export removal. Narrow unclear/broad migrations or obtain a decision.

Change obstructive internal boundaries directly. Migrate callers, tests, fixtures, exports/maps, documented paths, instructions, and docs together, including public surfaces after approval. Old-path wrappers, deprecated re-exports, fallbacks, compatibility aliases, and old-call-site shims require persisted data, shipped behavior, external consumers, or explicit direction.

Update documented contracts through [Documentation Authority](#documentation-authority); link deeper owners rather than copying contracts. Contract-preserving cross-module work needs boundary-aware verification, not documentation churn. Map every changed boundary and failure path to implementation and [verification evidence](#validation-selection).

## Naming

Judge names at representative use sites. Start with one word for the role; remove added words unless they resolve visible same-kind ambiguity or caller/safety obligations. Count package, module, import, file/folder, owner/type/class/method, `this.deps`, receiver/member/property, and collection context, including for locals and exports. Prefer `Rule.meta`/`rule.meta` over `Rule.ruleMeta` and local import aliases for rare collisions; repeated qualifiers suggest misplaced ownership or boundaries.

- Preserve domain/tool vocabulary, including tool-defined `context`. Keep implementation names private; omit construction/origin/mechanism words such as `Lazy`, `InMemory`, `Durable`, or `Factory` unless obligations differ or the factory itself is passed around. Name actions for callers and factories for results, not their owner or mechanism.
- Prefer consumed roles such as `actor`, `clock`, `ids`, or `routeHost` to unrelated bags such as `context`, `services`, or `ports`. Avoid redundant `Shape`, `Data`, `Info`, `Object`, `Interface`, `Impl`; use `Manager`, `Handler`, `Processor`, `Controller`, `Service` only for established or genuinely service-shaped roles.
- Avoid abbreviation for brevity; conventional short names require obvious context. Use named `Deps`, `Options`, `CreateOptions` for private single-owner shapes; qualify exported/competing shapes.
- Name files by role, without parent/package/factory prefixes. Prefer child folders with `index.ts` and sibling role files over prefix-bound flat families.
- Reserve `SCREAMING_SNAKE_CASE` for primitive config/protocol/sentinel values, not objects, collections, regexes, schemas, functions, or domain data. Remove `_` prefixes once used.

## Helpers And Shared Values

Keep rule-specific logic local. Inline obvious one-liners unless they name a non-obvious domain concept or remove meaningful duplication. Inspect installed dependencies and the owning plugin's nearby `shared/` modules before introducing generic helpers, primitive types, shared errors, or workarounds. Reuse contracts and migrate callers/tests, or retain explicit local logic, without one-hop renaming wrappers or wrappers preserving old sentinels/messages/branches. Similar syntax does not imply shared concepts, failure modes, or ownership. Promote only broadly useful, stable cross-cutting contracts.

Enum-like exports are shared contracts, not constant bags: import the owner's value/type rather than redefining aliases. Narrow unions only for different local meaning. Preserve tool-defined rule/options/message identifiers; separate display labels from values. Rename across configuration, consumers, docs, and tests. Retire last-consumer contracts with dependent values/types, docs, fixtures, and tests.

## Imports And Public Surfaces

Resolve package paths through owner `exports`, and declared `#...` paths through importer `imports`, before reading/changing them. Keep clear relative imports; aliases/barrels must not hide ownership or avoid caller edits.

Export for actual consumers, with legitimate test seams and type-contract exceptions. Keep single-file types/helpers/constants local; avoid speculative convenience exports and prefer behavior tests over test-only exports. Remove unused exports and migrate documented paths under [Change Boundaries](#change-boundaries), not through rules/tests/wrappers/findings/refactors solely enforcing internal export purity.

## TypeScript Contracts

- **Runtime validation** - Validate unknown/external or erased boundaries and invariants types cannot express; preserve narrowed types inward. Trust internal types rather than checking states requiring their bypass.
- **Class fields** - Declare explicitly and assign in constructors, without parameter properties. Use `readonly` for declaration/construction-only assignments; omit for later mutation, including framework mutation.
- **Readonly contracts** - Outside class fields and `as const`, deny readonly syntax by default. Allow readonly arrays/tuples or `Readonly<T>` only for existing readonly callers without mutation, owner-retained shared references, readonly-tuple type computation, or external/generated/framework contracts. Fresh caller-owned results, ordinary locals/helpers, assignment history, and documentation alone do not qualify.
- **Const assertions** - Use `as const` for literal/discriminant/enum-like/configuration/tuple inference. It neither freezes runtime values nor needs an ownership exception.
- **Runtime freezing** - Deny by default. `Object.freeze()` needs a named shared-reference contract requiring observable mutation rejection, an executed freeze, and matching shallow/deep enforcement. Fresh copies, internal facades, policy constants, or schema outputs must not manufacture readonly types. New exceptions need canonical/scoped documentation and focused mutation-rejection coverage.
- **Arrow returns** - Use expression bodies for one-line returns, parenthesizing objects. Multiline expressions/multiple statements need block bodies with explicit returns; side-effect-only callbacks need blocks.
- **Member layout** - Oxfmt owns layout, including short inline `TSTypeLiteral`s. Stylistic lint makes `ObjectExpression`s/`TSInterfaceBody`s with two or more members multiline; multiline literals need consistent braces/members. Do not rewrap tool output.
- **Import syntax** - Static imports except tests/documented lazy boundaries; prefer inline type specifiers over top-level `import type` or qualified import types. Tooling owns ordering; [tsconfig.json](../tsconfig.json) owns relative extension rewriting, [tsdown.config.ts](../tsdown.config.ts) owns output extensions.
- **Object parameters** - Use named interfaces/types, not inline object signatures.
- **Falsy inputs** - Distinguish valid falsy inputs from omission by arity/call shape, not truthiness.
- **Inference** - Infer obvious primitives on initialized locals/properties and defaulted parameters, straightforward returns, and concrete declaration/method `void`. Keep annotations defining/widening/narrowing/protecting caller contracts, including unimplemented signatures. Keep intentional arrow/expression `void` preventing narrower contracts such as `never`.

## Comments And JSDoc

Coverage follows opacity/complexity, not visibility or declaration kind: obvious exports need none; hidden private/file-local contracts do. Inspect classes/abstract bases, builders, registries, adapters, overloads, generics, and runtime seams accordingly. Document unclear ownership, ordering/sequencing, side effects, invariants, lifecycle, errors, bounds/defaults, and caller obligations at originating declarations; export docs need a distinct consumer contract. Use short inline rationale for complex decisions, races/lifecycle, API quirks, casts, and cleanup.

Top-level primitive config/protocol/sentinel constants explain control, constraints, and prerequisites for lowering/removal/reuse. Replace magic trailing comments with named constants, enums, or protocol types. Avoid obvious narration/speculation; broad policy belongs in canonical docs/instructions/tests.

Preserve directive text/placement unless the tool proves changes safe. Triage `TODO`, `FIXME`, `HACK`, `NOTE`, `REVIEW`, `PERF`, `DEBUG`, `REMARK` against implementation, tests, issue state, history, and tool evidence, not age/label. Retain TODOs unless this change resolves them.

Use multiline `/** ... */` immediately above declarations, purpose/non-obvious behavior first. [The base preset](../src/oxlint/index.ts) owns tag checks; no renderer/API report or custom `definedTags` is configured, so `@usage` is invalid unless configuration changes. Use prose or `@example`. Tags add semantics:

- **`@param` / `@returns`** - Add information beyond signatures.
- **`@template`** - Explain unclear generic roles/constraints.
- **`@throws`** - Describe stable actionable errors with useful descriptions.
- **`@example`** - Use verified meaningful canonical calls, not type-shape repetition.
- **`{@link ...}`** - Link useful stable targets.

Verify examples/overloads, links, defaults, errors, and claims against implementation/types/tests/callers. Use existing checks, not new documentation tooling; edit source rather than generated declarations/output and report excluded-file [coverage gaps](#closeout).

## Documentation Authority

Keep durable facts in one canonical owner; link or refine compatible local scope using the owners above. Leave executable script/export/version/cache/action-pin inventories in manifests/configs/workflows. Necessary projections name source and refresh trigger. Document timeless current contracts, not dates, rollout/migration recaps, or sessions; history/issues are evidence, not authority.

Update canonical docs, examples, and onboarding routes together when behavior, boundaries, public surfaces, commands, validation semantics, or repeatable workflows change. Prose requests neither prove implementation nor waive handbooks. Unsupported/conflicting prose, weakened contracts, unsupported environment claims, or missing operational outcomes require preserving truth and reporting the needed owner/implementation/decision. Keep unrelated/out-of-scope work unchanged; offer compliant alternatives where possible.

For agent instructions, front-load activating conditions and route each branch to one owner; disclose branch-only detail behind concise pointers. State positive actions; reserve prohibitions for hard boundaries and pair them with required actions. Co-locate controlling source, action, caveats, exhaustive observable completion, and prerequisite/conflict/failure recovery for every branch. Commands/edits alone do not complete verification/recovery.

Limit root instructions to always-loaded authority/constraints/routes. Refresh scoped instructions/maps when ownership, surfaces, commands, or boundaries change. Use lists/maps/definition bullets, not handbook tables; default to ASCII unless content/existing text justifies otherwise. Tooling owns whitespace/import ordering. Keep handoffs/prototypes transient unless requested durable; put durable research in canonical owners and multi-session teaching outside the root. Installed workflows cannot replace ownership, authorization, [validation](#validation-selection), or [closeout](#closeout).

## Agent Workflow

Follow [CONTRIBUTING](../CONTRIBUTING.md) for participation/setup/checks/PRs within [root authorization](../AGENTS.md#authority-and-safety). Human procedures do not authorize agent mutations, staging, commits, pushes, hosted operations, release dispatch, or publication.

### Tracker Operations

For explicitly authorized issue creation/editing/labeling/comments/closure, resolve the exact hosted repository, not the package name. Follow [Questions And Reports](../CONTRIBUTING.md#questions-and-reports), including open/closed duplicate searches and observed behavior versus hypotheses; link duplicates or record none found. Record the user-visible problem and claim root cause only with evidence. Keep issues small/actionable, link PRs/canonical docs, centralize duplicates, and keep detailed design in canonical docs or implementing PRs. Close with a fixing PR or explicit reason. Preserve package/tool terms; report terminology gaps.

Before labeling, resolve current hosted availability and justify labels from tracker configuration and affected surface/proven cause. [Issue forms](../.github/ISSUE_TEMPLATE) and [configuration](../.github/ISSUE_TEMPLATE/config.yml) route intake without assigning labels.

### Environment And Dependencies

Follow [Local Development](../CONTRIBUTING.md#local-development), including trust/revoke/manual activation, and [Dependency Changes](../CONTRIBUTING.md#dependency-changes). [package.json](../package.json) `devEngines` solely authors exact Node/pnpm versions; it also owns module mode and dependency/peer versions. [pnpm-workspace.yaml](../pnpm-workspace.yaml) owns installation policy, not a package list/catalog. Keep related tooling scripts/config/lock changes together.

[devenv.nix](../devenv.nix) selects standalone pnpm and Node major families from locked Nix inputs, without missing-attribute fallback or exact-version verification. Applicable pnpm commands reject mismatches without downloading replacements; raw Node/direct tools lack a Nix exact-version guard. [devenv.yaml](../devenv.yaml) owns immutable inputs/CLI-module compatibility; generated Nix/pnpm locks are not additional authored version authorities. Corepack/automatic pnpm installation are disabled. Refresh projections when these owners change.

Absent `minimumReleaseAge` declarations do not prove eligibility. Stop when the policy owner/eligibility is unresolved; never add `minimumReleaseAgeExclude` or bypass constraints. Wait or choose an eligible version. Frozen installation runs every time, including `prepare` hook setup and cache hits. `verifyDepsBeforeRun: error` rejects missing/stale dependencies with `VERIFY_DEPS_BEFORE_RUN` before `pnpm exec`/`pnpm run` children execute. Recover through shared frozen installation; reconcile manifest/lock drift, not implicit/non-frozen installs.

[lefthook.yml](../lefthook.yml) runs generated hooks through `devenv shell lefthook`, including GUIs without direnv. Git's `PATH` needs devenv and preinstalled dependencies; hooks do not install them. Fixers may stage output; checks grant no staging/commit authority.

### Tooling And Coverage

Inspect manifest scripts/composition. Use root scripts for repository-wide work, root-relative paths with `pnpm exec <tool> ...`, and `pnpm why <dependency>` from the consumer rather than assuming root links. Bounded fixers require explicit paths; pathless means repository-wide. Apply `pnpm lint:fix <files>` then `pnpm fmt <files>`, inspect scoped changes, and repair remaining/semantic findings. Format directly when intended; narrow failures and fix causes instead of blind retries. Establish operational prerequisites/recovery; target CI setup to consumer artifacts.

[CONTRIBUTING checks](../CONTRIBUTING.md#checks) own shared command composition and test/coverage caveats. Typechecking emits nothing and checks both [src/plugin tests](../tsconfig.json) and [root tooling configs/imports](../tsconfig.build.json); the latter omits source declaration/output settings. Check does not execute tests: no test script/Vitest runner is configured. Existing RuleTester cases are typechecked, not executed. Lint builds package outputs first.

Inspect [oxlint](../oxlint.config.ts), [oxfmt](../oxfmt.config.ts), presets, and hooks for coverage. Plugin implementations/tests under `src/oxlint/anti-slop/**` are lint/format/hook-excluded but typechecked; root lint/format exclude generated `dist`. Oxfmt also excludes `.github`, `pnpm-lock.yaml`, and only the generated root changelog without changing shared presets; other Markdown/nested changelogs remain covered unless separately excluded. Oxlint does not lint Markdown. Refresh caveats when owners change.

[validate.yml](../.github/workflows/validate.yml) owns CI triggers/checks; [setup-node-pnpm](../.github/actions/setup-node-pnpm/action.yml) owns native manifest-driven Node/non-standalone pnpm selection, action inputs/pins, and optional cache mechanics. Frozen installation includes hook setup on cache hits; `node_modules` is not cached. CI runs `pnpm check` directly without Nix/devenv; local setup remains unchanged. Local workflows do not prove hosted protection/required checks. Refresh projections when executable owners change.

### Validation Selection

Select cumulatively by change type and every affected interface. Repository commands override generic workflows/Jest examples; do not invent scripts.

- **Docs** - Inspect Markdown, paths/anchors, lists, and routing. Run `pnpm fmt <changed-files>`, `pnpm fmt:check`, and `pnpm check`. No independent code review is required for docs-only work.
- **TypeScript** - Focused `pnpm lint <changed-file>`, `pnpm typecheck`, and established behavior checks. Cross-module changes finish with check unless blocked/explicitly outside scope; broad migrations/refactors verify each logical batch.
- **Rules/presets** - Select representative existing RuleTester cases or consumer invocations; report an execution gap without an established test command.
- **Packaging** - `pnpm build` for changed entrypoints, output configuration/declarations, or built consumer imports, not default static validation.
- **Source/exports** - Typecheck/behavior plus consumer checks for imports/exports/shared types/values.
- **Diagnostics/fixes** - Verify accepted/rejected inputs, diagnostic identity, and fixes at tool/RuleTester seams; types do not prove diagnostics.
- **Generated contracts** - Regenerate from source and verify every affected consumer, not only producer.
- **Cross-boundary behavior** - Verify each owning seam and available end-to-end/real interface; types do not prove runtime behavior.
- **Release configuration** - Parse changed JSON/YAML; inspect native action inputs/outputs/publication gates at owners. Follow [Releasing](releasing.md); offline checks cannot establish hosted state/OIDC readiness.
- **External/opt-in** - Credentials, services, retained data, deployment/destructive setup, and live checks require explicit authorization, configured access, and established prerequisites; stop if unresolved.

For difficult bugs, establish failing feedback; implement behavior changes in public-seam red-green slices. Review standards and originating specification before closeout. Installed diagnosis/TDD/code-review workflows support but do not replace obligations or authorize commits. Follow observability contracts without unowned logging.

### Pull Request Operations

Follow [shared PR requirements](../CONTRIBUTING.md#pull-requests) even where the [template](../.github/PULL_REQUEST_TEMPLATE.md) omits prompts. Audit against the actual PR base, not feature upstream. When creation/push is authorized, draft broad work after one end-to-end slice passes its targeted check and describe remaining slices so early CI isolates a small change window. Request final review/remove draft status only after applicable local/required CI checks pass, blocking findings resolve, and advisory dispositions are summarized. Documentation/onboarding updates follow [Documentation Authority](#documentation-authority). Release dispatch/publication require separate explicit authorization under Releasing.

### Closeout

Account for every outcome, changed file, runtime/interface, persisted/generated artifact, and documentation owner against implementation/verification evidence. Continue selected checks until passing or concretely blocked. Report exact current-session commands and observed exit status/outcome; otherwise `Not run`.

For each skipped/blocked check, report reason, missing prerequisites, and exact safe next action/recovery. For uncovered seams, name the seam, strongest evidence, and owning package without inventing commands. Completion requires every outcome accounted for and every applicable check passing or a reported blocker with safe recovery.
