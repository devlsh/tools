# Development

## Change Workflow

1. Read [CONTRIBUTING.md](../CONTRIBUTING.md) for setup, dependency approval, standard checks, snapshots, and PR procedure.
2. Identify each affected consumer using the source map below. Inspect its implementation, tests, configuration, and public usage before editing.
3. Apply the relevant validation requirements below, in addition to the standard checks. Scope automatic fixes and formatting to authorized files.
4. Report changed behavior, checks actually run and their results, and omitted or blocked checks with reasons. Distinguish local evidence from hosted or installed-consumer evidence.

## Source And Consumer Map

| Change                       | Source and contract to inspect                                                                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Presets or plugins           | [src/oxlint](../src/oxlint), [src/oxfmt](../src/oxfmt), and exports in [package.json](../package.json)                                                                                  |
| Build or package contents    | [tsdown.config.ts](../tsdown.config.ts), package exports/files/lifecycle scripts, and [README.md](../README.md) consumer examples                                                       |
| Native ast-grep rules        | [ast-grep/rules](../ast-grep/rules), [ast-grep/tests](../ast-grep/tests), and [sgconfig.yml](../sgconfig.yml)                                                                           |
| Shared setup action          | [github/setup/action.yml](../github/setup/action.yml), callers in [.github/workflows](../.github/workflows), and the [public action example](../README.md#nodepnpm-setup-github-action) |
| Upstream-derived plugin code | [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md); for vendored spacing code, also read [UPSTREAM.md](../src/oxlint/anti-slop/vendor/eslint-stylistic/UPSTREAM.md)                    |

- `dist` is generated. The plugin code under `src/oxlint/anti-slop` is maintained source, including upstream-derived code. Preserve attribution and recorded local adaptations; vendored style is not the convention for new code.
- Native YAML rules ship directly from `ast-grep/rules`. Their directory paths are consumer-facing, not build internals.
- The repository loads its source Oxlint preset, but that preset resolves its plugin through the package export in `dist`. Use the build-backed lint scripts after plugin edits; a direct Oxlint run can load stale output.

## Validation Requirements

Select focused checks from [package.json](../package.json) during development. Complete the [standard checks](../CONTRIBUTING.md#checks) before closeout. Add evidence for each affected consumer:

| Affected surface                  | Required evidence                                                                                                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oxlint rule or preset behavior    | Follow the Oxlint consumer-validation and imported-test policy in [CONTRIBUTING](../CONTRIBUTING.md#checks).                                                                        |
| Ast-grep rule behavior            | Follow the fixture and snapshot procedure in CONTRIBUTING. Also check relevant TypeScript/TSX companion rules and included/excluded file paths.                                     |
| Ast-grep directories or packaging | Pack and install into an isolated consumer with real files. Verify selected `ruleDirs`, file scope, diagnostics, and fixes. Native fixtures do not prove installed path resolution. |
| Module exports or build output    | Verify affected imports, plugin resolution, and declarations from a packed, installed consumer. Source-local checks do not prove the published module layout.                       |
| Shared action or workflow         | Check inputs, outputs, and caller compatibility. Package checks do not execute GitHub Actions; report hosted execution as unverified unless an authorized run covers the change.    |

The standard checks also have scope limits: `src/oxlint/anti-slop/**` is excluded from linting, formatting, and repository ast-grep scanning. It remains typechecked. The formatter excludes `.github`. A passing check is not evidence for those excluded surfaces.

## Documentation Ownership

- Keep always-loaded authorization, repository defaults, and task routes in [AGENTS.md](../AGENTS.md). Put branch-specific instructions in their task owner.
- Keep shared contributor procedures in CONTRIBUTING and release operations in [Releasing](releasing.md). Link to the owner instead of copying its procedure.
- Keep public behavior and examples in the root README and affected rule-group READMEs. Include the shared action's public example when its contract changes.
- When instructions change, update affected routes and remove obsolete guidance in the same change. Verify local paths and anchors, and compare documented commands and claims with their executable owners.
- Check incoming links from human documentation against the audience boundary in [AGENTS.md](../AGENTS.md#repository-defaults).

## Tracker Operations

- Resolve the exact hosted repository from [package.json](../package.json) and the requested object before acting.
- Follow [Questions And Reports](../CONTRIBUTING.md#questions-and-reports) for support, issue search, and private security reports.
- Read current hosted labels before applying them. Configuration files and old reports do not establish current hosted state.
