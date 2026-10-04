# Code Authoring

This file owns repo-wide code authoring policy. Detailed TypeScript mechanics live in [`typescript-and-formatting.md`](typescript-and-formatting.md).

## Core Posture

- **Inspect first** - Read the relevant package manifest, exports/imports maps, scoped instructions, source, tests, and docs before changing code.
- **Smallest correct change** - Prefer the most direct durable fix over broad migrations, new layers, compatibility aliases, or speculative helpers.
- **No compatibility shims by default** - Do not add deprecated re-exports, old-path wrappers, fallback paths, or legacy aliases unless persisted data, shipped behavior, external consumers, or explicit user direction requires them.
- **Ask on external contracts** - If persisted data, public rollout behavior, or external API contracts might break, stop and ask for a design decision.

## Naming

Judge names at representative use sites, not in isolation. Start with one word for the role; add words only when the deletion test exposes real ambiguity: remove each word and ask what visible same-kind concept becomes confused.

- **Count surrounding context** - Module, import, file, folder, owner, class, method, and `this.deps` context are part of the name. Do not repeat words already supplied by that context.
- **Count member context** - For fields, properties, methods, schema members, and collection entries, the containing type/interface/class, receiver, property access, and collection context count as part of the name. Prefer role-only members such as `Rule.meta` and `rule.meta`; reject `Rule.ruleMeta` when the owner already supplies the domain.
- **Use the same concise standard everywhere** - Locals and exports both start short. Exports are read through package, module, and import context, so do not add defensive words for imaginary readers.
- **Name the role, not the origin** - Prefer what the value does for the caller over where it came from or how it is built. Omit provenance and construction words such as `Lazy`, `InMemory`, `Durable`, or `Factory` unless callers must handle different obligations or safety rules.
- **Qualify only for real conflicts** - Add a qualifier when two visible same-kind concepts would collide or the distinction is safety-critical. For members, qualify only when multiple same-kind members coexist at representative use sites or safety obligations require it. Use one precise qualifier, and prefer a local import alias for rare collisions instead of bloating the exported name.
- **Use canonical domain terms** - Follow established package and tool vocabulary rather than introducing synonyms for the same role.
- **Avoid vague bags** - Do not use `context`, `services`, or `ports` for unrelated dependencies when precise names such as `actor`, `clock`, `ids`, or `routeHost` fit. Preserve tool-defined names such as lint rule `context` when they identify the actual contract.
- **Avoid filler words** - Do not add redundant `Shape`, `Data`, `Info`, `Object`, `Interface`, or `Impl`, and avoid `Manager`, `Handler`, `Processor`, `Controller`, or `Service` unless established or clearly service-shaped.
- **Name actions from the caller perspective** - Avoid repeating the owning module or class in method names. Factories name their result, such as `createSession` or `session`, not the construction mechanism, unless the factory itself is the value being passed around.
- **Do not abbreviate for brevity alone** - Short names still need to be pronounceable and recognizable. Use short conventional names only where the local context makes them obvious.
- **Keep implementation names private** - Implementation detail names are fine inside their owning module, but exported and imported names should describe the consumed role rather than the private mechanism.
- **Avoid inline object parameter types** - Use named `Deps`, `Options`, or `CreateOptions` shapes for private single-owner parameter objects; qualify only when exported or competing shapes share scope.
- **Name files by role inside the folder** - Do not repeat parent folders, package scope, or factory mechanics. Prefer child folders with `index.ts` and sibling role files over prefix-bound flat files when a module family grows.
- **Use screaming snake sparingly** - `SCREAMING_SNAKE_CASE` is for primitive config, protocol, or sentinel values. Use normal names for objects, arrays, maps, regexes, schemas, functions, and domain data.
- **Remove unused prefixes when used** - `_` means intentionally unused; remove it when the value becomes used.
- **Treat accumulating qualifiers as a boundary smell** - If a name needs repeated qualifiers, reconsider module ownership, file placement, or type boundaries before adding more words.

Before finishing touched code, run the deletion test on each name, ask whether any word repeats available context, and keep only words that resolve real ambiguity or caller obligations.

## Abstraction And Helpers

Prefer direct local code until a deeper abstraction earns its name.

- **Inline obvious expressions** - Do not create helpers for one-line or obvious expressions unless the helper names a non-obvious domain concept or removes meaningful duplication.
- **Do not wrap dependencies one hop** - If a nearby dependency already has the operation, call it directly instead of adding a local renaming wrapper.
- **Check existing helpers first** - Before adding generic helpers, primitive types, wrappers, or shared errors, check installed dependencies, nearby plugin `shared/` modules, and [`architecture-and-packages.md`](architecture-and-packages.md).
- **Adopt or keep explicit logic** - If a shared helper contract differs, adopt its contract and update callers/tests, or keep explicit local logic. Do not wrap it to preserve old sentinel values, messages, or branches.
- **Do not merge unrelated concepts** - Similar-looking code should remain local when concepts, failure modes, or ownership differ.
- **Promote only stable cross-cutting helpers** - Share helpers only when they are broadly useful and have a stable contract.
- **Do not add shims for convenience** - Update callers, exports, tests, fixtures, and docs directly.

## Package Boundaries And Imports

Use `exports` and `imports` maps to resolve where code lives. This section owns import resolution and package-boundary policy; [`typescript-and-formatting.md`](typescript-and-formatting.md) owns TypeScript import syntax. `@devlsh/tools` export-map entrypoints are consumer-facing package contracts, not merely internal module boundaries.

- **Resolve package imports through maps** - For package imports, read the owning package `package.json` `exports` map before reading files or changing imports.
- **Resolve `#...` imports locally** - If a package declares subpath imports, resolve them through the importing package's `imports` map. Root `package.json` currently declares no such map.
- **Keep clear relative imports** - Do not replace local relative imports with aliases just to look organized.
- **Migrate documented surfaces deliberately** - When an import path is a documented or export-map surface, update package maps, instructions, docs, tests, and callers together.
- **Change internal boundaries when useful** - If an internal module boundary blocks clearer code, change the boundary, import path, or export shape directly.
- **Avoid purity-only work** - Do not add rules, tests, wrappers, review findings, or refactors whose only purpose is enforcing internal export purity.
- **Avoid alias/barrel hiding** - Do not add aliases or barrels to hide ownership or avoid call-site edits.

## Exports And Public Surface

Keep exported declarations and package surfaces as small as real consumers allow.

- **Do not export local details** - Keep types, helpers, and constants local when only one file uses them.
- **Export for real consumers** - Exports are allowed when another source file legitimately imports the declaration.
- **Treat entrypoints as public surfaces** - Package entrypoints, instructions, and `package.json` export maps expose consumed surfaces and must be migrated deliberately.
- **Avoid test-only exports** - Prefer testing through behavior; export only for legitimate test seams or type-contract surfaces.
- **Remove unused exports** - When the last consumer goes away, remove the export and update maps, docs, fixtures, and tests in the same change. Confirm external consumers before removing a package export.
- **Do not export for future flexibility** - Convenience barrels and speculative exports are not a reason to grow public surface.
- **Ask before breaking external contracts** - Public, persisted, or external contracts require an explicit design decision.

## Internal API Changes

Prefer the design that best shapes the long-term codebase over the lowest-effort patch.

- **Break internal APIs when right** - If an internal API blocks the clearest durable design, change it and migrate all callers, tests, fixtures, exports, and docs in the same change.
- **Bound migration scope** - If migration scope is unclear or too broad, narrow the scope or ask before starting churn.
- **Do not add layers to avoid edits** - Indirection that only preserves old call sites is a compatibility shim.
- **Update dependent artifacts** - Tests, fixtures, and docs should move to the new shape rather than preserving the old one.

## Cross-Boundary Changes

When a change alters a documented boundary, observable behavior, or tooling contract across modules or consumers, update the applicable canonical documentation. Link to deeper owners instead of copying their full contracts.

Cross-module implementation that preserves the documented contract requires boundary-aware verification, not documentation churn. Verification is complete when a reviewer can map every changed documented boundary and failure path to implementation and verification evidence.

## Enums And Shared Values

Enum-like exports are shared contracts, not convenient constant bags.

- **Import once** - Use enum-like exports from their owning module as both value and type. Do not redefine local aliases.
- **Avoid unnecessary local unions** - Define narrower unions only when they represent a genuinely different local meaning.
- **Use contract values** - Use tool-defined rule identifiers, options, and message identifiers rather than inventing alternative spellings.
- **Remove contracts completely** - When the last consumer is removed, delete the value, dependent types, docs, fixtures, and tests together.
- **Treat renames as migrations** - Check configuration, package consumers, docs, and tests before changing shared enum-like values.
- **Keep display copy separate** - Consumer-facing labels should not be enum values.

## Comments And JSDoc

Comment and JSDoc coverage follows contract opacity and complexity, not visibility or declaration kind. Apply the same standard to package-public, exported-internal, private, and file-local declarations: obvious exports do not need JSDoc merely because they are visible, while non-obvious private or file-local declarations do.

- **Document non-obvious contracts** - Explain ownership, ordering, side effects, invariants, lifecycle, error behavior, bounds, defaults, sequencing, or caller obligations when names and types do not make them clear.
- **Treat declaration kinds as review signals** - Classes, abstract bases, builders, registries, adapters, overloaded or generic APIs, and runtime seams deserve inspection because they often carry hidden contracts; none requires JSDoc by kind alone.
- **Document contracts at their origin** - Put documentation on the originating declaration unless an export boundary adds a distinct contract for its consumers.
- **Comment decision points** - Inside complex functions, use short inline comments for ordering dependencies, race/lifecycle hazards, external API quirks, cast boundaries, and cleanup sequencing.
- **Document constrained primitive constants** - Top-level primitive config, protocol, and sentinel constants should explain what the value controls, why the constraint exists, and what must change before lowering, removing, or reusing it.
- **Do not narrate obvious code** - Skip comments that restate parameter names, return types, assignments, or the next line.
- **Do not justify speculation** - Remove comments defending helpers or types by future flexibility.
- **Keep broad policy out of narrow code** - Put durable policy in `AGENTS.md`, scoped instructions, topic docs, or tests.
- **Keep existing TODOs unless resolved** - Do not delete TODO comments unless the same change addresses the work.
- **Replace magic trailing comments** - Prefer named constants, enum values, or protocol types.

[`typescript-and-formatting.md`](typescript-and-formatting.md) owns comment and JSDoc syntax, supported tags, directive and marker handling, and validation.

## Topic Docs

- **TypeScript** - When changing syntax, imports, formatting, or source comments, read [`typescript-and-formatting.md`](typescript-and-formatting.md).
- **Packages** - When resolving package ownership or utility placement, read [`architecture-and-packages.md`](architecture-and-packages.md).
- **Commands** - When selecting scripts or validation, read [`tooling-and-commands.md`](tooling-and-commands.md).
