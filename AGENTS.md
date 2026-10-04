# Tools Agent Root

`@devlsh/tools` is a single TypeScript package for shared Oxlint presets, Oxlint plugins, and an Oxfmt preset. This file is the canonical startup contract and docs index; detailed policy belongs in the linked owners.

## Startup Routing

- **Use this index** - Use the ownership map and scoped routing below to select the smallest applicable repo context.
- **Read routed context before source** - Before editing, reviewing, or deeply analyzing package code, explicitly read the smallest applicable current canonical docs.
- **Apply scope and ownership together** - User direction defines the authorized outcome and scope. Applicable repository instructions govern execution within that boundary: the nearest scoped `AGENTS.md` refines local work, and the canonical owner named below controls repository facts when root, scoped, and routed documents overlap.

## Source Of Truth Map

- **Agent workflow** - When selecting context or closing work, read [`docs/agent-operating-model.md`](docs/agent-operating-model.md).
- **Agent documentation** - When maintaining agent instructions, routing, or local Markdown links, read [`docs/agent-operating-model.md`](docs/agent-operating-model.md).
- **Code authoring** - When changing source boundaries, names, abstractions, exports, shared values, or comments, read [`docs/code-authoring.md`](docs/code-authoring.md).
- **GitHub** - When handling issues, triage, pull requests, or GitHub-facing docs, read [`docs/github-workflow.md`](docs/github-workflow.md). Use it when a skill names `docs/agents/issue-tracker.md` or `docs/agents/triage-labels.md`.
- **Packages** - When resolving package ownership or public surfaces, read [`docs/architecture-and-packages.md`](docs/architecture-and-packages.md).
- **Commands** - When selecting scripts or validation, read [`docs/tooling-and-commands.md`](docs/tooling-and-commands.md).
- **TypeScript** - When changing TypeScript syntax, imports, formatting, or source comments, read [`docs/typescript-and-formatting.md`](docs/typescript-and-formatting.md).

## Repo Contract

- **Package manager** - Use `pnpm`; do not use `npm` or `yarn`.
- **Runtime** - Root [`package.json`](package.json) `devEngines.runtime` and `devEngines.packageManager` are the sole authored authorities for exact contributor Node and pnpm versions. Its `type` owns ESM mode.
- **Package** - Source lives in `src/`; [`tsdown.config.ts`](tsdown.config.ts) owns build entrypoints and output generation into ignored `dist/`.
- **Dependencies** - Root `package.json` owns dependency versions; [`pnpm-workspace.yaml`](pnpm-workspace.yaml) owns installation policy and declares no package globs or catalog.
- **Release age** - Never use `minimumReleaseAgeExclude` or bypass the configured `minimumReleaseAge` for installations or dependency updates. Wait until a version is eligible or choose an eligible version.
- **Tooling additions** - Add the script, config, and lockfile changes together.
- **Tooling** - Root oxlint, oxfmt, and TypeScript own repository-wide static checks.

## Validation Defaults

- Select checks through [`docs/tooling-and-commands.md`](docs/tooling-and-commands.md) and follow closeout through [`docs/agent-operating-model.md`](docs/agent-operating-model.md).

## Canonical Docs

The Source Of Truth Map above is the canonical docs index. Load only the owners applicable to the current task.

## Scoped Instructions

This repository contains one package, `@devlsh/tools`, owned by root `AGENTS.md`. There are no child workspace instruction files. Refresh this routing when package metadata or scoped instruction files change; verify the complete set with `**/AGENTS.md`.

## Maintenance Checklist

- Update this index only for always-loaded contracts, routing, or ownership changes; put detail in the canonical owner.
- Update the nearest scoped `AGENTS.md` and package maps when package contracts, public surfaces, commands, or boundaries change.
