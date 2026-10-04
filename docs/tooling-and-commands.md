# Tooling And Commands

This file owns command invocation semantics, validation selection, and command hygiene. Root manifest owns script availability. Tool configuration owns exact task composition. Closeout and skipped-validation reporting live in [`agent-operating-model.md`](agent-operating-model.md).

## Tooling Contract

- **Package manager** - Use `pnpm`; do not use `npm` or `yarn`.
- **Runtime** - Root [`package.json`](../package.json) `devEngines.runtime` and `devEngines.packageManager` are the sole authored authorities for exact contributor Node and pnpm versions. Its `type` owns module mode. Both declarations use `onFail: error`; [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) enforces `pmOnFail: error` and `runtimeOnFail: error`, rejecting mismatches instead of downloading replacement tools.
- **Dependency versions** - Root `package.json` owns dependency and peer dependency versions. [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) owns installation policy, not a shared dependency catalog.
- **Tooling additions** - Add the root script, config file, and lockfile changes together.
- **Lint and format** - Root [`oxlint.config.ts`](../oxlint.config.ts) and [`oxfmt.config.ts`](../oxfmt.config.ts) own lint/format behavior and extend the source presets. Both exclude the generated root `CHANGELOG.md` from repository checks without changing the shared presets. Other Markdown, including nested changelogs, remains subject to formatting checks unless separately excluded. Oxlint does not lint Markdown.
- **Build** - [`tsdown.config.ts`](../tsdown.config.ts) owns generated package outputs. [`tsconfig.json`](../tsconfig.json) owns source TypeScript checking and declaration settings; [`tsconfig.build.json`](../tsconfig.build.json) owns non-emitting checks of root tooling configurations. See [TypeScript coverage](typescript-and-formatting.md#formatting).
- **Tests** - There is no configured test script or Vitest runner.
- **Fresh package build** - Root `package.json` declares `prepack: pnpm build` so the packaging lifecycle builds `dist` from current source. This lifecycle guard does not add a test runner or a packing-validation requirement.

## Contributor Environment

[`devenv.nix`](../devenv.nix) reads `devEngines` and selects the Node and pnpm major package families from the locked Nix inputs. Missing package attributes fail evaluation without a fallback. Nix does not check selected package metadata against the exact declared versions. Applicable pnpm commands reject version mismatches at use time; raw Node and directly invoked tools are not guarded by a Nix version check. [`devenv.yaml`](../devenv.yaml) owns immutable input selections and requires CLI/module version compatibility; `devenv.lock` is generated input state. `pnpm-lock.yaml` may contain generated runtime or package-manager metadata, not another authored version authority.

The environment provides Node and standalone pnpm bound to that Node. Corepack and automatic pnpm installation are disabled. `devenv tasks run tools:install` explicitly runs frozen installation every time, including the manifest's `prepare` lifecycle. There is no installed-lock comparison that can skip dependency or hook readiness.

`pnpm-workspace.yaml` sets `verifyDepsBeforeRun: error`. With missing or stale dependencies, `pnpm exec` and `pnpm run` fail with `VERIFY_DEPS_BEFORE_RUN` before executing the child, rather than performing an implicit non-frozen install. Recover with explicit `devenv tasks run tools:install`; reconcile declaration/lock drift when that frozen task rejects it.

[`lefthook.yml`](../lefthook.yml) sets the inline override `lefthook: devenv shell lefthook` for generated Git hooks. It runs the installed Lefthook package inside the devenv shell without requiring direnv activation, including in Git GUI clients. `devenv` must be on the Git client's `PATH`, and repository dependencies must already be installed so the shell can resolve `lefthook`. Hooks do not install dependencies.

[`.envrc`](../.envrc) uses the official devenv direnv integration and watches `package.json`. Automatic directory-entry activation requires the contributor's host shell hook and explicit checkout approval. [Contributor onboarding](../CONTRIBUTING.md#local-development) owns setup, trust, unload, and the manual opt-out path. For noninteractive or manually activated work, use `devenv shell -- pnpm <script>` and `devenv tasks run tools:install`; direct commands alone do not disable a host hook.

## Command Semantics

- Use root scripts for repository-wide checks and workflows; inspect root `package.json` for the available names.
- Use `pnpm exec <tool> ...` for an installed package executable, with repository-relative paths from the root.
- Locate installed dependency source from the consuming package with `pnpm why <dependency>`; do not assume a dependency is linked at root `node_modules/<dependency>`.
- Pass explicit paths to fixers and formatters during bounded work. A pathless fixer or formatter is repository-wide.
- Establish prerequisites, recovery, and safety guidance before operational workflows; a package script name is not a substitute for them.

## Validation Selection

Select cumulatively. Start with the change-type row, then add coverage for every affected runtime or interface. Root instructions and manifest supply exact task names; this file owns how those tasks compose into validation.

- **Docs only** - Review Markdown, local links, list formatting, and affected canonical indexes. Run `pnpm fmt <changed-files>` when Markdown formatting changed in a way tooling owns, then `pnpm fmt:check`. Run `pnpm check` for repository closeout.
- **Small TypeScript change** - Run focused `pnpm lint <changed-file>`, `pnpm typecheck`, and focused behavior verification where an established execution path exists.
- **Cross-module TypeScript change** - Run targeted lint and `pnpm typecheck`; finish with `pnpm check` unless blocked or explicitly out of scope.
- **Broad refactor or migration** - Run targeted lint, typecheck, and relevant available behavior checks after each logical batch so regressions are identified before the branch becomes difficult to review.
- **Rule or preset behavior change** - Select the representative existing RuleTester cases or consumer invocation for the affected contract. Report an execution gap when no established test command covers it; do not invent a `pnpm test` command.
- **Packaging change** - Run `pnpm build` when entrypoints, output configuration, declarations, or built consumer imports change. Builds remain packaging checks rather than default static validation.

Add checks for each affected interface:

- **Package source or export surface** - Run typecheck and focused behavior checks. Add consumer checks when an export, import, shared type, or shared value changes.
- **Lint diagnostics and fixes** - Verify accepted input, rejected input, diagnostic identity, and fixes where applicable at the tool or RuleTester seam. Static typecheck alone does not prove diagnostic behavior.
- **Generated contract** - Regenerate from source and validate each affected consumer rather than checking only the producer.
- **Cross-boundary behavior** - Validate at each owning seam and include one end-to-end or real-interface check when the repository provides one. Do not treat typecheck as proof of runtime behavior. When no repository check covers a seam, report the missing seam, strongest available verification layer used, and owning package without inventing a command.
- **External or opt-in environment** - Checks requiring credentials, external services, retained data, deployment access, or destructive setup run only when authorized and configured. Report the reason and exact safe next action for an unrun check. Give the exact command when one is safe to state; otherwise state the missing prerequisites and recovery requirements.

Complete validation and report skipped checks through [`agent-operating-model.md`](agent-operating-model.md).

## Repository Task Usage

- `package.json` owns script composition. `pnpm typecheck` checks both TypeScript projects without emitting files. `pnpm check` runs typecheck, lint, and formatting checks; its lint stage builds package outputs before running Oxlint. It does not execute tests.
- [`../.github/workflows/validate.yml`](../.github/workflows/validate.yml) runs `pnpm check`; [`../.github/actions/setup-node-pnpm/action.yml`](../.github/actions/setup-node-pnpm/action.yml) installs Node, then pnpm, through SHA-pinned native actions. `actions/setup-node` reads `devEngines.runtime` through `node-version-file: package.json`; `pnpm/action-setup` reads `devEngines.packageManager` through `package_json_file: package.json`, without a version input. Non-standalone pnpm uses the configured Node. Both actions' built-in caches are disabled; the shared action owns optional pnpm store and metadata restoration. Setup always runs `pnpm install --frozen-lockfile`, including the manifest's `prepare` lifecycle and on dependency cache hits. CI commands run directly on the runner, retaining its OIDC environment for publication. Contributor devenv setup is unchanged.
- [`../.github/workflows/release.yml`](../.github/workflows/release.yml) is manual-only release configuration. For local edits, parse its JSON/YAML configuration and inspect the native action inputs, outputs, and publication gate at the owning files. These checks do not exercise live GitHub/npm state or prove trusted-publisher readiness. [GitHub workflow](github-workflow.md) owns prerequisites, manual stable releases, and maintainer recovery after partial failure; live dispatch and publishing require separate authorization.
- [`../lefthook.yml`](../lefthook.yml) owns pre-commit fixing and pre-push checks. Hook fixers can stage their output; running a check is not authorization to stage or commit.

Refresh these task descriptions when their executable owners change.

## Command Hygiene

- **Prefer targeted commands while diagnosing** - Faster feedback and clearer failures.
- **Run scoped fixers before manual repair** - For tool-owned findings, apply `pnpm lint:fix <files>`, then `pnpm fmt <files>`. Manually edit only findings that remain or require semantic judgment.
- **Use `pnpm fmt` when applying formatting** - Avoid a separate check when the intent is to fix formatting.
- **Keep formatter-owned changes** - Review formatting changes within the authorized scope; preserve unrelated work by passing explicit paths before running a formatter.
- **Do not default to builds** - Builds are packaging checks and can be slower or require extra environment.
- **Keep CI prerequisites targeted** - Run the narrow build that produces required generated artifacts instead of expanding CI setup without a consumer need.
- **Preserve meaningful command errors** - If a command fails, fix the cause rather than retrying broad commands without narrowing.

## More Docs

- **Closeout** - When reporting validation or skipped checks, read [`agent-operating-model.md`](agent-operating-model.md).
- **TypeScript** - When selecting formatting or lint mechanics, read [`typescript-and-formatting.md`](typescript-and-formatting.md).
- **Package** - When resolving task ownership, read [`architecture-and-packages.md`](architecture-and-packages.md).
