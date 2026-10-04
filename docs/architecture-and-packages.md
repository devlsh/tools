# Architecture And Packages

`@devlsh/tools` is a single ESM TypeScript package. It provides reusable lint and formatting configuration and Oxlint plugins, not an application runtime or deployment stack.

This file owns package responsibilities and high-level boundaries. Root [`package.json`](../package.json) owns executable metadata, scripts, dependencies, and export maps. Root instructions own package-local guidance and caveats. Repo-wide authoring and boundary policy lives in [`code-authoring.md`](code-authoring.md).

## Package Map

- **[`src/oxlint/index.ts`](../src/oxlint/index.ts)** - Base Oxlint preset, including registration of the generic anti-slop plugin.
- **[`src/oxlint/effect.ts`](../src/oxlint/effect.ts)** - Oxlint preset extending the base with Effect-specific plugin rules.
- **[`src/oxlint/anti-slop/index.ts`](../src/oxlint/anti-slop/index.ts)** - Generic Oxlint plugin; rule implementations and shared analysis helpers live beside it.
- **[`src/oxlint/anti-slop/effect/index.ts`](../src/oxlint/anti-slop/effect/index.ts)** - Effect-specific Oxlint plugin with its own rules and shared analysis helpers.
- **[`src/oxfmt/index.ts`](../src/oxfmt/index.ts)** - Shared Oxfmt preset.

This map is a responsibility projection of `package.json` and [`tsdown.config.ts`](../tsdown.config.ts). Refresh it when entrypoints or their ownership change. The export map, rather than this list, owns the exact consumer paths.

## Ownership Sources

- **Package responsibilities** - This file owns package responsibilities and high-level boundaries.
- **Package routing** - Root [`AGENTS.md`](../AGENTS.md) keeps the startup routing projection from package metadata and scoped instruction files; this package map owns responsibilities rather than startup discovery.
- **Scoped guidance** - The nearest scoped `AGENTS.md`, or root `AGENTS.md` when no scoped file exists, owns package-local source routing, rules, command guidance, and consumer caveats.
- **Executable package truth** - Root `package.json` owns package metadata, dependencies, scripts, and executable import contracts through `exports`.
- **Detailed boundary policy** - [`code-authoring.md`](code-authoring.md) owns package-boundary, import-resolution, export-surface, abstraction, compatibility-shim, and internal-API rules.
- **Cross-boundary authoring** - [`code-authoring.md`](code-authoring.md#cross-boundary-changes) owns documentation and verification requirements for changed boundaries; this file only identifies package owners.

## Shared Utility Discovery

Before adding a generic helper, primitive type, shared error, or local workaround, inspect installed dependencies and nearby `shared/` modules under the owning plugin. Keep rule-specific behavior local; promote a helper only when it is genuinely cross-cutting and has a stable contract.

## README Policy

- **Root README** - Root [`README.md`](../README.md) owns human onboarding, public usage examples, and links into the handbook. Refresh its public-surface examples when the manifest export map or source entrypoints change.
- **No README sprawl** - Internal modules should use instructions, manifests, and handbook docs rather than module-local README files.
- **Public packages may have README files** - Add a package README only if a package is published publicly or needs external usage/API examples.
- **Do not use README files as compatibility layers** - Rules belong in canonical docs or scoped instructions, with links where needed.

## Generated Files

- **`dist/`** - Ignored output generated from `src/` by `tsdown.config.ts` through `pnpm build`. `package.json` exports point to generated `.mjs` and `.d.ts` files and its `files` list selects `dist` and [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md) for packaging. Edit source and build configuration rather than generated output; regenerate when affected consumers require it. Generated output is not committed.

## Legal And Community Documents

Root [`LICENSE`](../LICENSE) contains the MIT license text; `package.json` and the README specify the MIT grant. `THIRD_PARTY_NOTICES.md` retains the vendored MIT notices and source pointer. Root [`CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md) is separately licensed under CC BY-SA 4.0. The README routes contributors and users to the contribution, security, and support documents.

## More Docs

- **Agent workflow** - When changing instruction ownership or maintenance, read [`agent-operating-model.md`](agent-operating-model.md).
- **Code boundaries** - When changing imports, exports, or package boundaries, read [`code-authoring.md`](code-authoring.md).
- **Commands** - When selecting validation tooling, read [`tooling-and-commands.md`](tooling-and-commands.md).
- **TypeScript** - When changing import syntax or formatting, read [`typescript-and-formatting.md`](typescript-and-formatting.md).
