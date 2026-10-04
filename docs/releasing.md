# Releasing

This runbook owns manual stable releases for `devlsh/tools` from `main` to npm's `latest` dist-tag. [release.yml](../.github/workflows/release.yml) owns executable dispatch, action inputs/outputs, permissions, and publication gates. [release.json](../release.json) owns Release Please's Node strategy and manifest configuration; [.manifest.json](../.manifest.json) owns release tracking state. Local files do not prove hosted settings, credentials, or successful publication.

## Authorization And Hosted Readiness

Live GitHub/npm inspection, hosted configuration changes, merges, release dispatch, publication, and repair require the applicable explicit authorization. A local workflow edit or ordinary PR request does not authorize them. Stop on unresolved prerequisites rather than testing publication speculatively.

Before dispatch:

1. Establish a public repository with accessible corresponding source, Discussions for public support, and `main` as hosted default branch. Hosted changes need separate authorization.
2. Put reviewed workflow/config/manifest changes on `main` through an approved maintainer flow. Uncommitted files do not initialize automation. Keep package version, changelog, and manifest consistent.
3. Verify npm trusted publishing with direct publish permission for the existing `@devlsh/tools` package, repository `devlsh/tools`, GitHub-hosted runners, and workflow filename `release.yml`, with no environment. Package trust cannot create a nonexistent package. Publication uses tokenless pnpm OIDC with provenance and has no token fallback. Verify hosted configuration and provenance acceptance live when authorized; static configuration is insufficient.
4. Permit Actions to create release PRs/releases and allow `autorelease: pending` and `autorelease: tagged` labels. Review branch protection, merge policy, required checks, and the applicable Actions policy/check path before merging. PRs created by the workflow GitHub token do not establish that hosted PR checks will run.
5. Confirm approved history contains release-relevant commits. Automation does not initialize empty history with automatic commits. Package/manifest versions do not prove npm publication.

For local environment setup, follow [CONTRIBUTING.md](../CONTRIBUTING.md#local-development). Apply [agent validation](development.md#validation-selection) and [closeout](development.md#closeout) for static checks and reporting. [setup-node-pnpm](../.github/actions/setup-node-pnpm/action.yml) owns native CI setup and action pins; [CI toolchain selection](development.md#tooling-and-coverage) follows the manifest's `devEngines`. Publication leaves dependency caching disabled by default but still installs frozen dependencies. CI commands run directly on the runner, retaining its OIDC environment for publication.

## Hosted Rulesets

[main.json](../.github/rulesets/main.json) and [release-tags.json](../.github/rulesets/release-tags.json) are manually imported ruleset definitions, not synchronized hosted settings. Their authored enforcement is disabled with no bypass actors. When authorized, import them through repository **Settings > Rules > Rulesets**, review settings, and explicitly activate them when ready. Reimport or edit hosted rulesets after file changes.

The main definition requires squash-only PRs, resolved threads, and the validation check without requiring approval; it prevents deletion, force pushes, and nonlinear history when active. Read the exact check context/source binding from the ruleset and [validate.yml](../.github/workflows/validate.yml); verify the binding after import and refresh it when the job name changes. The tag definition prevents updates/deletion for `v*` tags when active but leaves creation unrestricted for Release Please. Confirm actual hosted enforcement instead of inferring it from these files.

## Prepare And Publish

Both operations are manual `workflow_dispatch` on `main`. The workflow rejects other refs and operations before Release Please runs. Its shared concurrency group does not cancel running releases, but GitHub may replace a queued pending run. Serialization is not a durable queue; inspect outcomes rather than assuming every dispatch executed.

1. Dispatch `operation: prepare` on `main`. Release Please creates/refreshes the release PR with package version, changelog, and manifest changes, but creates no GitHub release. No relevant commits may mean no PR.
2. Review the PR against `main`, including version/changelog, and merge through the approved maintainer flow after [agent PR validation](development.md#pull-request-operations). The version change is already in the PR, not deferred until after merge.
3. Dispatch `operation: publish` on `main` after merging the reviewed stable release PR. Release Please creates GitHub releases for merged pending release PRs with PR creation disabled. There is no version input or custom candidate selection.
4. Inspect root-package `release_created`, `sha`, `tag_name`, and `version` outputs. npm publication runs only for `release_created == 'true'` and checks out the newly created release's immutable `sha`. Existing GitHub releases do not trigger npm publication.
5. The job installs frozen dependencies and publishes directly, without staging publication, using the following command from [release.yml](../.github/workflows/release.yml):

   ```sh
   pnpm publish --access public --tag latest --provenance --no-git-checks
   ```

   `--no-git-checks` allows detached immutable checkout. `pnpm publish` runs directly on the runner; its `prepack: pnpm build` lifecycle builds checked-out source. Installation retains `prepare` Lefthook setup. No GitHub API token or npm secret is passed to either lifecycle command; publication sets no user configuration. Only the publish job receives OIDC `id-token: write`.

6. Inspect the complete run and confirm the GitHub release/tag target plus npm version/`latest` state. Release Please labels change during GitHub release creation, before npm publication, and cannot prove npm completion. The workflow does not perform post-publication registry verification. Metadata and provenance configuration do not verify tarball contents.

Release completion requires outcome evidence from live GitHub/npm state, not only successful preparation or labels. Offline parsing/source inspection cannot prove runtime behavior, trusted-publisher readiness, hosted settings, or publication success.

## Partial Failures And Limits

- **GitHub release created, npm publication failed** - Inspect the failed run, merged release PR, actual release/tag target, and npm version/`latest` state before deciding whether publication or dist-tag repair is needed. Manual maintainer recovery is required. Do not blindly redispatch: new dispatches do not resume npm publication for existing releases. Rerunning a failed job does not replace npm-state inspection after an ambiguous failure.
- **Release/registry conflict** - Stop for maintainer investigation. Compare reviewed package/manifest version, immutable source SHA, GitHub tag/release, npm version, and provided npm `gitHead`. Never move a release tag to bypass a mismatch. Registry metadata alone does not establish artifact identity.
- **Unsupported automation** - Only stable `main` to `latest` releases are supported. There are no custom candidate/version/tag guards, registry preflight guards, publication retries, completion polling, or npm-completion label reconciliation. Automatic repair/retry is unsupported; maintainers own partial-failure recovery and explicitly authorized repair.

Refresh this protocol when workflow operations, gates, lifecycle behavior, trust requirements, or recovery semantics change. Exact action/core pins belong to executable owners rather than this runbook.
