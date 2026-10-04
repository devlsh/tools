# Development

`@devlsh/tools` is a single ESM TypeScript package providing reusable lint/format configuration and Oxlint plugins, not an application runtime or deployment stack. This agent-only document owns package responsibilities, source/documentation authoring contracts, and [agent workflow](#agent-workflow). [CONTRIBUTING.md](../CONTRIBUTING.md) provides shared human contribution and setup procedures; [Releasing](releasing.md) owns publication.

## Package Responsibilities

- **[Base Oxlint preset](../src/oxlint/index.ts)** - Registers generic anti-slop rules and establishes shared lint policy.
- **[Effect preset](../src/oxlint/effect.ts)** - Extends the base with opt-in Effect-specific plugin rules.
- **[Generic plugin](../src/oxlint/anti-slop/index.ts)** - Owns generic rule implementations and nearby shared analysis helpers.
- **[Effect plugin](../src/oxlint/anti-slop/effect/index.ts)** - Owns Effect-specific rules and shared helpers.
- **[Oxfmt preset](../src/oxfmt/index.ts)** - Owns reusable formatting configuration.

This responsibility map projects [package.json](../package.json) and [tsdown.config.ts](../tsdown.config.ts); refresh it when entrypoints or ownership change. The manifest owns exact consumer paths, metadata, dependencies, scripts, and export/import maps. All export-map entrypoints, including both anti-slop plugins, are public consumer contracts.

`dist/` is ignored generated output. Edit `src/` and build configuration rather than generated files; regenerate when affected consumers require it. The manifest's export map points to generated modules/declarations and its `files` list owns package contents. Its `prepack` lifecycle builds from current source; this is not a test runner or an additional packing-validation requirement.

Root [README.md](../README.md) owns public usage examples and human contributor onboarding. Root [AGENTS.md](../AGENTS.md) owns agent handbook navigation and the audience boundary. Refresh examples when public surfaces change. Use canonical docs, instructions, and manifests for internal modules rather than module-local READMEs. A public package may have a README for external usage/API examples; READMEs are not compatibility layers or duplicate policy owners.

Root [LICENSE](../LICENSE) contains the MIT grant. [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) retains vendored MIT notices and a source pointer; [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) is separately CC BY-SA 4.0 licensed. Preserve the README's contribution, security, and support routes.

## Change Boundaries

Inspect manifests, export/import maps, instructions, relevant source, tests, and docs before changing code. Make the smallest direct durable change. Avoid broad migrations, speculative helpers, new layers, compatibility aliases, and purity-only work.

Do not add deprecated re-exports, old-path wrappers, fallback paths, or legacy aliases unless persisted data, shipped behavior, external consumers, or explicit direction requires them. Stop for an explicit design decision when persisted data, public rollout behavior, or external API contracts might break. Narrow or obtain a decision before a migration whose scope is unclear or too broad.

If an internal API or module boundary blocks the clearest long-term design, change it directly and migrate callers, tests, fixtures, exports, and docs together. Indirection solely preserving old call sites is a shim. Update artifacts to the new shape rather than preserving the old one.

When documented boundaries, observable behavior, or tooling contracts change across modules/consumers, update the canonical documentation and link deeper owners instead of copying contracts. Cross-module implementation preserving the contract requires boundary-aware verification, not documentation churn. A reviewer must be able to map every changed boundary and failure path to implementation and verification evidence. Select that evidence through [agent validation](#validation-selection).

## Naming

Judge names at representative use sites. Start with one word for the role; remove each added word and ask which visible same-kind concept becomes confused. Before finishing touched code, keep only words resolving real ambiguity or caller obligations.

- **Count surrounding context** - Module, import, file, folder, owner, class, method, and `this.deps` context already contribute meaning. Avoid repetition.
- **Count member context** - The containing type/interface/class, receiver, property access, and collection count too. Prefer `Rule.meta` and `rule.meta` over `Rule.ruleMeta`.
- **Keep locals and exports concise** - Package/module/import context applies to exports; imaginary readers do not justify defensive qualifiers.
- **Name consumed roles** - Omit origin/construction words such as `Lazy`, `InMemory`, `Durable`, or `Factory` unless callers face different obligations or safety rules. Keep implementation names private.
- **Qualify real conflicts** - Use one precise qualifier for colliding visible same-kind concepts or safety-critical distinctions. Prefer local import aliases for rare collisions. Repeated qualifiers signal an ownership, placement, or type-boundary problem.
- **Use domain terms** - Preserve package/tool vocabulary rather than cycling synonyms. Preserve tool-defined names such as lint rule `context`.
- **Avoid vague bags and filler** - Prefer `actor`, `clock`, `ids`, or `routeHost` to unrelated `context`, `services`, or `ports`. Avoid redundant `Shape`, `Data`, `Info`, `Object`, `Interface`, and `Impl`; use `Manager`, `Handler`, `Processor`, `Controller`, or `Service` only when established or genuinely service-shaped.
- **Name actions for callers** - Avoid repeating the owning module/class. Factories name results, such as `createSession` or `session`, rather than mechanisms unless the factory itself is passed around.
- **Keep names recognizable** - Do not abbreviate merely for brevity. Conventional short names need obvious local context.
- **Name parameter objects** - Use named `Deps`, `Options`, or `CreateOptions` for private single-owner shapes; qualify only for exported/competing shapes in scope.
- **Name files by role** - Avoid repeating parent folders, package scope, or factory mechanics. Prefer child folders with `index.ts` and sibling role files over prefix-bound flat families.
- **Reserve screaming snake** - `SCREAMING_SNAKE_CASE` is for primitive config, protocol, or sentinel values; use normal names for objects, arrays, maps, regexes, schemas, functions, and domain data.
- **Remove used underscore prefixes** - `_` means intentionally unused, not a permanent name decoration.

## Helpers And Shared Values

Prefer direct local code until a deeper abstraction earns its name. Inline obvious one-line expressions unless a helper names a non-obvious domain concept or removes meaningful duplication. Call dependency operations directly rather than adding one-hop renaming wrappers.

Before adding generic helpers, primitive types, shared errors, or workarounds, inspect installed dependencies and the owning plugin's nearby `shared/` modules. Adopt an existing contract and update callers/tests, or retain explicit local logic. Do not wrap a helper to preserve old sentinel values, messages, or branches. Similar-looking code stays local when concepts, failure modes, or ownership differ. Promote only broadly useful helpers with stable cross-cutting contracts; rule-specific behavior stays local.

Enum-like exports are shared contracts, not constant bags:

- Import the owner's export as both value and type; do not redefine aliases.
- Define narrower unions only for genuinely different local meaning.
- Use tool-defined rule identifiers, options, and message identifiers.
- Remove last-consumer contracts with dependent values/types, docs, fixtures, and tests.
- Treat renames as migrations across configuration, consumers, docs, and tests.
- Keep display labels separate from enum values.

## Imports And Public Surfaces

Resolve package imports through the owner's manifest `exports` before reading files or changing imports. Resolve `#...` through the importing package's `imports` map when declared. Keep clear relative imports; aliases are not an organizational improvement by themselves. Do not use aliases or barrels to hide ownership or avoid call-site edits.

Export declarations only for real consumers. Keep single-file types/helpers/constants local, avoid speculative convenience exports, and prefer behavior tests over test-only exports. Legitimate test seams and type-contract surfaces are exceptions. Remove unused exports and update maps, docs, fixtures, and tests together; confirm external consumers before removing a package export. Public, persisted, or external contracts require an explicit design decision.

Migrate documented import paths and export-map surfaces deliberately with maps, instructions, docs, tests, and callers. Internal boundaries may change when that makes code clearer; do not add rules, tests, wrappers, findings, or refactors solely to enforce internal export purity.

## TypeScript Contracts

- **Runtime validation** - Treat TypeScript as the default gate for trusted internal values. Validate at external or erased runtime boundaries, then preserve and trust the narrowed type. Do not runtime-check states requiring a bypass of internal types; retain validation for unknown/external data and invariants TypeScript cannot express.
- **Class fields** - Declare fields explicitly and assign in constructors rather than using constructor parameter properties. A field assigned only at declaration/construction and never reassigned must be `readonly`; omit it for later mutation, including framework runtime mutation.
- **Readonly contracts** - Outside class fields and `as const`, readonly syntax is deny-by-default. Readonly arrays/tuples or `Readonly<T>` are allowed only to accept an existing readonly caller without mutation, expose an owner-retained shared reference, require readonly tuples for type computation, or mirror an external/generated/framework contract. Do not use readonly for fresh caller-owned results, ordinary locals/helpers, assignment history, or documentation alone.
- **Const assertions** - Use `as const` for literal, discriminant, enum-like, configuration, or tuple inference. It is type inference, not runtime freezing, and needs no separate ownership exception.
- **Runtime freezing** - Freezing is deny-by-default. `Object.freeze()` requires observable mutation rejection in a named shared-reference contract, an executed freeze, and shallow/deep enforcement matching the contract. Do not freeze fresh copies, ordinary internal facades, policy constants, or schema outputs to manufacture readonly types. New exceptions need an owning canonical/scoped document and focused mutation-rejection coverage.
- **Arrow returns** - Use concise expression bodies for one-line returned expressions and parenthesize object literals. Use explicit returns in block bodies for multiline expressions or multiple statements; use blocks for side-effect-only callbacks.
- **Member layout** - Oxfmt owns general layout, including short inline `TSTypeLiteral`s. Stylistic lint requires multiline `ObjectExpression`s and `TSInterfaceBody`s with at least two members. Short type literals may stay on one line when Oxfmt keeps them there; multiline literals need consistent braces/members. Do not manually rewrap tool output.
- **Import syntax** - Use static imports except in tests or documented lazy boundaries. Prefer inline type specifiers such as `import { type Thing } from 'pkg'` over top-level `import type` or qualified `import('pkg').Thing`. Tooling owns ordering. [tsconfig.json](../tsconfig.json) owns relative extension rewriting; [tsdown.config.ts](../tsdown.config.ts) owns output extensions.
- **Object parameters** - Define named interfaces/types rather than inline object interfaces/literals in parameter signatures.
- **Falsy inputs** - Overloads accepting valid falsy values distinguish omission by arity or call shape, not truthiness.
- **Inference** - Omit redundant obvious primitive annotations on initialized locals, properties, and defaulted parameters. Infer straightforward implementation returns and `void` for concrete declarations/methods. Retain explicit `void` on arrows/expressions when it intentionally prevents a narrower contract such as `never`. Retain annotations defining, widening, narrowing, or protecting caller-facing contracts, including signatures/type declarations without implementations.

## Comments And JSDoc

Coverage follows contract opacity and complexity, not visibility or declaration kind. Obvious exports need no JSDoc merely for visibility; non-obvious private/file-local contracts do. Inspect classes, abstract bases, builders, registries, adapters, overloads, generics, and runtime seams for hidden contracts without requiring documentation by kind alone.

Document ownership, ordering, side effects, invariants, lifecycle, errors, bounds, defaults, sequencing, and caller obligations when names/types do not make them clear. Put symbol contracts at their originating declaration; add export-boundary docs only for a distinct consumer contract. Use ordinary short inline rationale at complex decision points for ordering, races/lifecycle, API quirks, casts, and cleanup.

Top-level primitive config/protocol/sentinel constants explain what they control, why constrained, and what must change before lowering, removing, or reusing them. Do not narrate obvious code or defend speculation. Keep broad policy in canonical docs, instructions, or tests. Replace magic trailing comments with named constants, enum values, or protocol types.

Preserve tool directive text/placement exactly unless the owning tool proves a change safe. Triage `TODO`, `FIXME`, `HACK`, `NOTE`, `REVIEW`, `PERF`, `DEBUG`, and `REMARK` against implementation, tests, issue state, history, and tool evidence, not age or label alone. Keep TODOs unless the same change resolves their work.

Use multi-line `/** ... */` JSDoc immediately above declarations, with purpose and non-obvious behavior first. [The base preset](../src/oxlint/index.ts) owns tag checks; there is no configured renderer/API report or custom `definedTags`, so `@usage` is invalid unless configuration changes. Use prose or `@example` instead.

- **`@param` / `@returns`** - Add semantic information beyond signature/types only.
- **`@template`** - Explain unclear generic roles or constraints.
- **`@throws`** - Describe only stable actionable error behavior with a useful description.
- **`@example`** - Use verified meaningful canonical calls, not type-shape repetition or misleading overload examples.
- **`{@link ...}`** - Link stable targets that help readers understand/use the contract.

Verify examples, links, defaults, errors, and claims against implementation, types, tests, and callers. Use existing checks rather than adding documentation tooling. Generated declarations/output are not source; report [coverage gaps](#closeout) for comments in excluded files.

## Documentation Authority

Keep each durable fact in one canonical owner. Other documents link or add compatible scope-specific refinements. Root [AGENTS.md](../AGENTS.md) owns startup authority/routes; this document owns package, authoring, and agent workflow policy; [CONTRIBUTING.md](../CONTRIBUTING.md) owns shared human contribution procedures; [Releasing](releasing.md) owns release protocol. Executable state stays in manifests, configs, and workflows rather than copied script/export/version/cache/action-pin inventories. A necessary prose projection names its source and refresh trigger.

Canonical docs describe the timeless current contract. Dates, rollout/migration recaps, and session commentary stay outside current policy. History and issues are evidence, not authority. Change docs alongside behavior, boundaries, public surfaces, commands, validation semantics, or repeatable workflows.

A prose request does not prove implementation exists or waive the owning handbook. If requested wording lacks evidence, conflicts with source/tests/owners, weakens a contract, copies unsupported environment state, or omits operational outcomes, preserve current truth and report the needed owner, implementation, or decision. Keep out-of-scope targets and unrelated work unchanged; give a compliant alternative where possible.

For agent-facing instructions:

1. Start pointers with the activating condition and name one owner per branch; disclose branch-only detail behind concise routing.
2. Name the controlling source. Keep mechanically discoverable state in executable owners and durable rules in one document.
3. State positive actions. Retain prohibitions for hard boundaries and pair them with required actions.
4. Give procedures observable exhaustive completion conditions. Edits/commands are not completion while verification or recovery remains.
5. Co-locate action, caveats, completion, and conflict/failure responses. Every affected branch must say when to load, what to do, which source controls, how to recognize completion, and what to do when prerequisites fail.

Update root instructions only for always-loaded authority, constraints, or routes. Refresh scoped instructions and responsibility maps when local ownership, surfaces, commands, or boundaries change. Use readable lists/maps and definition bullets rather than handbook tables. Default to ASCII unless existing text or content justifies otherwise; let tooling own whitespace and import ordering.

Keep handoffs and throwaway prototypes transient unless a durable destination is requested. Put research in a canonical owner only when durable; run multi-session teaching work outside the repository root. Installed workflows can guide uncertainty but cannot replace ownership, authorization, or [validation](#validation-selection) and [closeout](#closeout).

## Agent Workflow

This section applies to agents. Follow [CONTRIBUTING.md](../CONTRIBUTING.md) for shared participation, setup, checks, and PR requirements. Apply the additional controls below within the authorization boundary in [AGENTS.md](../AGENTS.md#authority-and-safety). Human contribution procedures do not authorize agent mutations, staging, commits, pushes, hosted operations, release dispatch, or publication.

### Tracker Operations

Before tracker operations, resolve the exact hosted repository rather than inferring it from the package name. Create, edit, label, comment on, or close issues only when explicitly authorized. Search open and closed issues first; link a duplicate or record that none was found. Record the user-visible problem, expected and actual behavior, reproduction notes, and relevant environment. Separate confirmed impact from implementation hypotheses; do not claim root cause without evidence.

Resolve current hosted label availability before labeling. Use labels only when tracker configuration and the affected surface or proven cause support them. [Issue forms](../.github/ISSUE_TEMPLATE) and their [configuration](../.github/ISSUE_TEMPLATE/config.yml) route community intake; they do not assign labels. Prefer small actionable issues, link related PRs and canonical docs, and centralize duplicate discussion. Keep detailed design in canonical docs or the implementing PR. Close issues with a fixing PR or an explicit reason. Use established package/tool vocabulary; report terminology gaps rather than inventing durable terms in tracker records.

### Environment And Dependencies

[package.json](../package.json) `devEngines.runtime` and `devEngines.packageManager` are the sole authored authorities for exact Node and pnpm versions; its `type` owns module mode. It also owns dependency and peer versions. [pnpm-workspace.yaml](../pnpm-workspace.yaml) owns installation policy, not a workspace package list or dependency catalog. Add tooling scripts, configuration, and lockfile changes together.

For local development, [devenv.nix](../devenv.nix) selects Node and standalone pnpm major package families from locked Nix inputs. Missing attributes fail without fallback. Nix does not verify package metadata against exact declared versions. Applicable pnpm commands reject version mismatches rather than downloading replacements; raw Node and directly invoked tools are not guarded by a Nix version check. [devenv.yaml](../devenv.yaml) owns immutable inputs and exact CLI/module compatibility. `devenv.lock` and generated pnpm lock metadata are not additional authored version authorities. Corepack and automatic pnpm installation are disabled in the local environment.

Before installing or updating, establish the applicable release-age policy owner and version eligibility. The authored manifest and workspace file do not currently declare `minimumReleaseAge`; do not invent a threshold or assume no constraint applies. Stop if the owner or eligibility is unresolved. Never add `minimumReleaseAgeExclude` or bypass an applicable release-age constraint. Wait for eligibility or choose an eligible version.

The frozen install task in [Local Development](../CONTRIBUTING.md#local-development) runs every time, including the manifest's `prepare` hook installation. `verifyDepsBeforeRun: error` makes `pnpm exec` and `pnpm run` fail with `VERIFY_DEPS_BEFORE_RUN` on absent or stale dependencies before the child executes. Recover through the shared frozen install procedure; reconcile manifest/lock drift rather than using an implicit or non-frozen install. [.envrc](../.envrc) watches `package.json`; follow the shared trust, revoke, and manual activation procedure.

[lefthook.yml](../lefthook.yml) runs generated hooks through `devenv shell lefthook`, including from Git GUIs without direnv activation. The Git client's `PATH` must contain devenv and dependencies must already be installed. Hooks do not install them. Hook fixers can stage output; running a check does not authorize staging or committing.

### Tooling And Coverage

Inspect [package.json](../package.json) for script names and composition. Use root scripts for repository-wide work and `pnpm exec <tool> ...` for installed executables, with repository-relative paths from the root. Use `pnpm why <dependency>` to locate dependencies from the consuming package instead of assuming a root `node_modules` link.

Pass explicit file paths to bounded fixers and formatters; pathless commands are repository-wide. For tool-owned findings, apply `pnpm lint:fix <files>`, then `pnpm fmt <files>`. Keep formatter-owned changes within scope, inspect the diff, and manually repair only remaining or semantic findings. Use `pnpm fmt` when intending to format, rather than first adding a redundant check. Narrow failures and fix their causes instead of blindly retrying broad commands. Establish prerequisites and recovery before operational scripts. Keep CI setup targeted to artifacts consumers actually need.

`pnpm typecheck` checks both TypeScript projects without emitting files. `pnpm check` runs typecheck, lint, and `fmt:check`; lint builds package outputs first. Check does not execute tests. There is no configured test script or Vitest runner. Existing Oxlint RuleTester `.test.ts` files are typechecked, not executed by check.

[tsconfig.json](../tsconfig.json) includes all TypeScript under `src`, including plugin tests. [tsconfig.build.json](../tsconfig.build.json) independently checks root tooling configurations and their imports without source declaration/output settings. [oxlint.config.ts](../oxlint.config.ts), [oxfmt.config.ts](../oxfmt.config.ts), and hooks exclude `src/oxlint/anti-slop/**`; root lint/format also exclude generated `dist`. Do not claim check lints or formats excluded plugin implementations or tests. Oxfmt also excludes `pnpm-lock.yaml` and `.github`; the generated root changelog is excluded without changing shared presets. Other Markdown, including nested changelogs, remains subject to formatting unless separately excluded. Oxlint does not lint Markdown. Refresh coverage caveats when their owners change.

[validate.yml](../.github/workflows/validate.yml) owns CI triggers and runs `pnpm check` directly on the runner. [setup-node-pnpm](../.github/actions/setup-node-pnpm/action.yml) installs Node, then non-standalone pnpm, through SHA-pinned native actions. `actions/setup-node` reads `devEngines.runtime` through `node-version-file: package.json`; `pnpm/action-setup` reads `devEngines.packageManager` through `package_json_file: package.json`, without a version input. pnpm uses the configured Node. Both actions' built-in caches are disabled. The shared action optionally restores pnpm store and metadata caches keyed by runner OS/architecture and hashes of `pnpm-lock.yaml`, `package.json`, and `pnpm-workspace.yaml`. Only successful pushes or manual validation on `main` save them, and only without an exact cache hit. Frozen installation always runs, including `prepare` hook setup and on cache hits; `node_modules` is not cached. CI uses no Nix/devenv setup; local contributor and hook setup are unchanged. Local workflow files do not prove hosted branch protection or required checks. Refresh this description when its executable owners change.

### Validation Selection

Select checks cumulatively: start with the change type, then add every affected interface. Generic workflow or Jest examples yield to repository commands; do not invent a test script.

- **Docs only** - Inspect Markdown, local links and anchors, lists, and affected routing. Run `pnpm fmt <changed-files>` for supported Markdown formatting, then `pnpm fmt:check` and `pnpm check` for closeout. Documentation-only work does not require independent code review.
- **Small TypeScript change** - Run focused `pnpm lint <changed-file>`, `pnpm typecheck`, and behavior verification where an established execution path exists.
- **Cross-module change** - Run targeted lint and typecheck; finish with check unless blocked or explicitly outside scope.
- **Broad refactor or migration** - Run targeted lint, typecheck, and available behavior checks after each logical batch.
- **Rule or preset behavior** - Select representative existing RuleTester cases or consumer invocations. Report an execution gap if no established test command covers them.
- **Packaging** - Run `pnpm build` when entrypoints, output configuration, declarations, or built consumer imports change. Builds are packaging checks, not default static validation.

Add interface-specific evidence:

- **Source or exports** - Typecheck and verify behavior; add consumer checks for exports, imports, shared types, and shared values.
- **Diagnostics and fixes** - Verify accepted/rejected input, diagnostic identity, and fixes at the tool or RuleTester seam. Typechecking does not prove diagnostics.
- **Generated contracts** - Regenerate from source and verify each affected consumer, not only the producer.
- **Cross-boundary behavior** - Verify each owning seam and include an end-to-end or real-interface check when the repository supplies one. Typechecking does not prove runtime behavior.
- **Release configuration** - Parse changed JSON/YAML and inspect native action inputs, outputs, and publication gates at their owners. Offline inspection does not prove hosted state or OIDC readiness. Live checks require explicit authorization, configured access, and established prerequisites; stop if any are unresolved. Follow [Releasing](releasing.md) for release operations.
- **External or opt-in checks** - Run checks involving credentials, services, retained data, deployment access, or destructive setup only with prerequisites and authorization.

For behavior changes, establish a failing feedback loop for difficult bugs and implement red-green slices at public behavior seams. Review the result against repository standards and the originating specification before closeout. Installed diagnosis, TDD, and code-review workflows may support this work; they do not replace these obligations or authorize commits. Follow applicable observability contracts rather than adding unowned logging.

### Pull Request Operations

Follow the shared [PR requirements](../CONTRIBUTING.md#pull-requests). These are contributor obligations, not a claim that every item is prompted by the [PR template](../.github/PULL_REQUEST_TEMPLATE.md). Compare changed-code audits against the actual PR base, not a feature branch upstream. When PR creation/push is authorized, open broad work as a draft after one end-to-end slice passes its targeted check; describe remaining slices so early CI isolates a small change window. Request final review and remove draft status only after applicable local and required CI checks pass, blocking findings are resolved, and advisory findings have summarized dispositions.

When public examples, package boundaries, scripts, or repeatable workflows change, update their canonical documentation owners and onboarding links together. Release dispatch and publication follow [Releasing](releasing.md) and require separate explicit authorization; ordinary PR authorization does not cover them.

### Closeout

Before handoff:

1. Account for every affected runtime, interface, persisted/generated artifact, and documentation owner. Continue selected checks until they pass or have a concrete blocker.
2. Compare every changed file and requested outcome with implementation and validation evidence.
3. Report only commands executed in the current session with observed exit status. Name each exact command and outcome; otherwise report `Not run`.
4. For skipped/blocked checks, give the reason and exact safe next action or missing prerequisites and recovery. If no check covers a seam, name the missing seam, strongest verification used, and owning package without inventing a command.

Closeout is complete only when every outcome is accounted for and every applicable check passes or has a reported blocker and safe next action.
