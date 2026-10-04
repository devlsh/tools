# TypeScript And Formatting

This file owns TypeScript syntax, import syntax, formatting mechanics, and comment/JSDoc syntax. Naming, abstractions, import resolution, package boundaries, export surfaces, shared values, compatibility, and when contracts need documentation live in [`code-authoring.md`](code-authoring.md).

## TypeScript Mechanics

- **Runtime validation** - Treat TypeScript as the default gate for trusted internal values. Validate at external or erased runtime boundaries, then preserve and trust the narrowed type. Do not runtime-check states that require bypassing the declared internal type; retain checks only for unknown/external values and invariants TypeScript cannot express.
- **Class fields** - Do not use TypeScript constructor parameter properties. Declare fields explicitly and assign inside the constructor. A field assigned only at its declaration or in the constructor and never reassigned afterward must be `readonly`; omit `readonly` from fields mutated after construction or by a framework runtime.
- **Readonly contracts** - Outside the class-field rule and `as const`, readonly syntax is deny-by-default. Use readonly arrays, readonly tuples, or `Readonly<T>` only when the declaration accepts an existing readonly caller without mutation, exposes an owner-retained shared reference, requires readonly tuple structure for type computation, or mirrors an external, generated, or framework contract. Do not use readonly types for fresh caller-owned results, ordinary local or helper values, assignment history, or documentation alone.
- **Const assertions** - Use `as const` when literal, discriminant, enum-like, configuration, or tuple inference requires it. A const assertion is a type-inference tool, not runtime freezing, and does not need a separate ownership exception.
- **Runtime freezing** - Runtime freezing is deny-by-default. Use `Object.freeze()` only when runtime mutation rejection is an observable part of a named shared-reference contract, the executed path performs the freeze, and the shallow or deep enforcement matches that contract. Do not freeze fresh copies, ordinary internal facades, policy constants, or schema outputs solely to manufacture readonly types. A new exception requires an owning canonical or scoped document plus focused mutation-rejection coverage.
- **Arrow returns** - Use a concise arrow expression body when the returned expression fits on one line. Wrap returned object literals in parentheses. Use a block body with an explicit return for multiline expressions, multiple statements, and side-effect-only callbacks.
- **Object and type member layout** - Oxfmt owns general layout and decides whether short `TSTypeLiteral`s remain inline. Stylistic lint requires `ObjectExpression`s and `TSInterfaceBody`s with at least two members to be multiline. It permits every member on one line when Oxfmt keeps a short `TSTypeLiteral` inline; when a type literal is multiline, it requires consistent brace and member placement. Do not manually rewrap tool output.
- **Dynamic imports** - Use static imports except in tests and documented lazy boundaries.
- **Type imports** - Prefer inline type import specifiers, such as `import { type Thing } from 'pkg'`, over top-level `import type` statements or qualified `import('pkg').Thing` type expressions.
- **Object parameter types** - Do not inline object interfaces or object type literals in function parameters. Define a named interface or type and use it in the signature.
- **Falsy values** - Overloads that accept valid falsy values must distinguish omitted arguments by arity or call shape, not truthiness.
- **Unused names** - `_` prefixes mean intentionally unused. Remove the prefix when the value becomes used.
- **Type inference** - Omit explicit types when an initialized local, property, or defaulted parameter has the same obvious primitive type TypeScript infers. Omit function return annotations for straightforward implementation details, and infer `void` for concrete function declarations and methods. For arrows and function expressions, retain explicit `void` when it intentionally prevents a narrower inferred contract such as `never`. Retain return annotations when they define, widen, narrow, or protect a caller-facing contract, including function signatures and type declarations without implementations.

## Imports And Re-Exports

[`code-authoring.md`](code-authoring.md) owns package-boundary resolution, relative-path policy, re-export surfaces, barrels, aliases, and compatibility. TypeScript imports use inline `type` specifiers as defined above; configured formatting owns import ordering. [`../tsconfig.json`](../tsconfig.json) owns rewriting relative TypeScript import extensions, and [`../tsdown.config.ts`](../tsdown.config.ts) owns generated module extensions.

## Formatting

- **Formatter** - Use root oxfmt through `pnpm fmt`.
- **Formatting check** - Use `pnpm fmt:check` or `pnpm check` when validating without changing files.
- **Linter** - Use root oxlint through `pnpm lint` or `pnpm lint:fix`.
- **Fix ordering** - Apply targeted Oxlint fixes, then Oxfmt. Review the diff and manually repair only findings that remain or require semantic judgment.
- **Whitespace and ordering** - Let tooling own whitespace and import ordering where configured.
- **Markdown** - Use readable lists for indexes/maps and definition bullets for long-form rules. Avoid markdown tables in top-level handbook docs.
- **ASCII** - Default to ASCII unless the file already uses non-ASCII or the content clearly justifies it.

[`../oxlint.config.ts`](../oxlint.config.ts) and [`../oxfmt.config.ts`](../oxfmt.config.ts) exclude `dist/**` and `src/oxlint/anti-slop/**`; Oxfmt also excludes `pnpm-lock.yaml`. Do not claim that `pnpm check` lints or formats excluded plugin implementation and test files. [`../tsconfig.json`](../tsconfig.json) includes all TypeScript under `src`, including upstream tests, for source checking. [`../tsconfig.build.json`](../tsconfig.build.json) independently extends the Node preset to check root `*.config.ts` files and their imports without emitting files. It permits relative `.ts` imports without inheriting source declaration or output settings. `pnpm typecheck` checks both projects; the existing `pnpm check` integration covers CI and pre-push checks through [their executable owners](tooling-and-commands.md#repository-task-usage). Refresh these coverage descriptions when the configurations change.

## Comments And JSDoc

[`code-authoring.md`](code-authoring.md) owns when a contract needs documentation. This file owns comment and JSDoc syntax, supported tags, directive and marker handling, and validation.

Follow [`code-authoring.md`](code-authoring.md) to decide whether and where documentation is needed. Keep comment scope narrow and express symbol contracts as JSDoc immediately above the declaration; use ordinary comments for local rationale.

Preserve tool directive text and placement exactly unless evidence from the owning tool proves a change is safe. Triage `TODO`, `FIXME`, `HACK`, `NOTE`, `REVIEW`, `PERF`, `DEBUG`, and `REMARK` comments using implementation, tests, issue state, history, and tool evidence rather than age or label alone. Keep TODOs unless the underlying work is resolved. Replace magic values with named constants, enum values, or protocol types instead of explaining them with trailing comments.

## JSDoc Shape

The base preset in [`../src/oxlint/index.ts`](../src/oxlint/index.ts) enables JSDoc tag checks. There is no configured documentation renderer or API report and no custom `definedTags`, so `@usage` is invalid unless configuration changes; express usage in prose or with `@example`.

- **Declaration form** - Use multi-line `/** ... */` JSDoc immediately above a declaration.
- **Summary** - State purpose and non-obvious behavior first.
- **`@param` and `@returns`** - Include these only for semantic information beyond the types and signature.
- **`@template`** - Describe a generic parameter when its role or constraint is not clear from the declaration.
- **`@throws`** - Document only stable, actionable error behavior and include a useful description.
- **`@example`** - Include a meaningful, verified canonical call pattern; avoid examples that merely repeat a type shape or misrepresent varying overloads.
- **`{@link ...}`** - Link only to a stable target that helps a reader understand or use the contract.

Verify examples, links, defaults, errors, and contract claims against implementation, types, tests, and call sites. Use existing checks; do not add documentation tooling for this policy.

Generated declarations and build output are not source. For comments in excluded files, select the relevant existing checks from [`tooling-and-commands.md`](tooling-and-commands.md) and report coverage gaps.

## More Docs

- **Code authoring** - When changing names, abstractions, boundaries, or exports, read [`code-authoring.md`](code-authoring.md).
- **Commands** - When selecting formatting or validation commands, read [`tooling-and-commands.md`](tooling-and-commands.md).
