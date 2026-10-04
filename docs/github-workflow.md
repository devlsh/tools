# GitHub Workflow

This file owns issue and pull-request policy, local validation configuration, and the manual release protocol for `devlsh/tools`. Local workflow files do not prove hosted settings, credentials, or a successful publication.

## Tracker Configuration

- **Repository** - Resolve the exact repository before every tracker operation; the package name alone does not establish its hosted identity.
- **Mutation boundary** - Create, edit, label, comment on, or close GitHub issues only when explicitly requested.
- **Community intake** - [Issue forms](../.github/ISSUE_TEMPLATE) route bugs and feature requests; their [configuration](../.github/ISSUE_TEMPLATE/config.yml) routes questions to Discussions and vulnerabilities to private reporting. The [PR template](../.github/PULL_REQUEST_TEMPLATE.md) captures rationale, API/docs and release impact, verification, and reviewer focus. Resolve hosted label availability before manual labeling; forms do not assign labels.
- **Branch** - Development and stable releases use `main`. Publications use npm's `latest` dist-tag.

## Issue Workflow

- **Search first** - Check existing open and closed issues. Continue when a duplicate is linked or the issue body records that no duplicate was found.
- **Capture observed behavior** - Record user-visible problem, expected behavior, actual behavior, reproduction notes, and relevant environment details.
- **Label from evidence** - Do not infer labels from guesses about implementation. Use labels only when current tracker configuration and the affected surface or proven root cause support them.
- **Link related work** - Link related PRs or canonical docs when they exist.
- **Separate impact from cause** - Keep implementation details separate from confirmed user impact unless root cause is proven.

## Pull Request Workflow

- **Open broad work as a draft early** - When opening a pull request is authorized, open or push a draft after one end-to-end slice passes its targeted check and the draft describes the remaining slices. Early CI then attributes findings to a small change window.
- **Keep the comparison base explicit** - Pull request validation must compare changed-code audits against the actual pull request base branch rather than a feature branch upstream.
- **Remove draft status only after final validation** - Request final review when every applicable local check and required CI check passes, blocking findings are resolved, and advisory findings are summarized with disposition.

## Triage Rules

- **Do not claim root cause without evidence** - False certainty sends implementers down the wrong path.
- **Prefer small actionable issues** - Smaller issues can be assigned, tested, and closed.
- **Link duplicates** - Keep discussion centralized instead of copying context.
- **Keep implementation detail concise** - Issues track work and outcomes; detailed design belongs in canonical docs or the implementing pull request.
- **Close with audit trail** - Reference the fixing PR or give an explicit reason.

## Validation Workflow

[`../.github/workflows/validate.yml`](../.github/workflows/validate.yml) runs `devenv --no-tui shell -- pnpm check` on pull requests, pushes to `main`, and manual dispatch. [`../.github/actions/setup-devenv/action.yml`](../.github/actions/setup-devenv/action.yml) owns shared CI setup; [tooling and commands](tooling-and-commands.md#repository-task-usage) owns toolchain and CLI compatibility semantics. Validation restores pnpm store and metadata caches, keyed by runner OS/architecture and the dependency and Nix environment inputs. Only successful pushes or manual validation on `main` save them. These caches are separate from the public read-only Nix/Cachix cache; `node_modules` is never cached and frozen installation always runs. The publish job disables dependency caching. Refresh this description when these files change. Local workflow configuration does not prove hosted branch protection or required-check settings.

## Manual Rulesets

[main.json](../.github/rulesets/main.json) and [release-tags.json](../.github/rulesets/release-tags.json) are maintained repository state for [manual GitHub ruleset import](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository). Both use disabled enforcement and no bypass actors. Import them in the repository's **Settings > Rules > Rulesets**, review the imported settings, and explicitly activate them when ready. File changes do not synchronize hosted settings; reimport or edit the hosted rulesets manually after changing the files.

The main ruleset targets `refs/heads/main`, requires squash-only pull requests with resolved review threads and the validation job's `🧪 check` context, and prevents deletion, force pushes, and nonlinear history when active. No approval is required. The check uses `integration_id: 15368` for GitHub Actions; verify the source binding after import. Refresh the context when [validate.yml](../.github/workflows/validate.yml) changes its job name. The tag ruleset targets `refs/tags/v*` and prevents deletion and updates when active. It leaves tag creation unrestricted so Release Please can create version tags.

## Release Prerequisites

Before dispatching [release.yml](../.github/workflows/release.yml), establish all of the following:

- Make the repository public so the corresponding source is accessible, enable Discussions for public support, and establish `main` as the hosted default branch. These hosted changes require separate authorization.
- Commit the reviewed workflow, [Release Please config](../release-please-config.json), and [.release-please-manifest.json](../.release-please-manifest.json) on `main` through an approved maintainer flow before dispatching. Uncommitted local files do not initialize hosted automation. Keep the package version, changelog, and manifest consistent.
- Configure npm trusted publishing for package `@devlsh/tools`, repository `devlsh/tools`, GitHub-hosted runners, and workflow filename `release.yml`. Enable the npm-side publishing prerequisites for the scoped public package before the first publication. The workflow uses pnpm OIDC with provenance; it contains no npm token, auth stub, or registry credential file.
- Permit Actions to create release PRs and GitHub releases, and allow the Release Please `autorelease: pending` and `autorelease: tagged` labels. Review branch protections, merge policy, and required checks separately. PRs created with the workflow's GitHub token do not themselves establish that hosted PR checks will run; verify the applicable Actions policy and required-check path before merging.
- Confirm that approved history contains release-relevant commits. The initial manifest value `1.0.0` is a synthetic baseline, not evidence of a published release. A first fix or feature can produce `1.0.1` or `1.1.0`. The workflow does not bootstrap an empty history with automatic commits.

## Manual Prepare And Publish

Both operations are manual `workflow_dispatch` only, on `main`. A different dispatch ref fails before release mutation. Runs share a concurrency group with cancellation disabled. GitHub concurrency can replace a queued pending run; serialization does not promise a durable queue. Inspect the run outcome rather than assuming every dispatch executed.

1. Dispatch `operation: prepare` on `main`. Release Please creates or refreshes the release PR, including its package version, changelog, and manifest updates. It does not create a GitHub release in this operation. With no relevant commits, preparation may produce no PR.
2. Review the release PR against `main`, including the proposed version and changelog, and merge it through the maintainer's approved flow. The version update is already in the release PR; it is not deferred until after merge.
3. Dispatch `operation: publish` on `main` after merging the reviewed stable release PR. Release Please creates GitHub releases for merged pending release PRs; PR creation is disabled. There is no version input or custom candidate selection.
4. The release job exposes the action's root-package `release_created`, `sha`, `tag_name`, and `version` outputs. The npm publish job runs only when `release_created == 'true'`. It checks out that newly created release's immutable `sha`, installs frozen dependencies, and publishes with `devenv --no-tui shell -- pnpm publish --access public --tag latest --provenance --no-git-checks`. `--no-git-checks` permits the detached immutable checkout. Existing GitHub releases do not trigger npm publication.
5. `pnpm publish` and its `prepack: pnpm build` lifecycle run inside the devenv shell to build from the checked-out source. Installation retains the existing `prepare` Lefthook hook setup. No GitHub API token is passed to either lifecycle command. Only the publish job receives OIDC `id-token: write`. Release Please manages release PR labels during GitHub release creation, before npm publication; those labels do not prove npm completion.
6. Inspect the run outcome and confirm the GitHub release tag and npm version/`latest` state. The workflow does not perform post-publication registry verification. Registry metadata and provenance configuration do not verify npm tarball contents.

[Release Please config](../release-please-config.json) uses Node release strategy. The action is pinned to v5.0.0's commit, which bundles core 17.6.0. It uses manifest mode without a `release-type` action input. Refresh these claims when the config or action pin changes.

## Recovery And Limits

- **Failed npm publication after GitHub release creation** - Manual maintainer recovery is required. Inspect the failed run, merged release PR, actual GitHub release/tag target, and npm version/`latest` state before deciding whether publication or dist-tag repair is needed. Do not blindly rerun the workflow: a new dispatch does not resume publication for an existing GitHub release. Rerunning a failed job is not a substitute for inspecting npm state after an ambiguous failure.
- **Release or registry conflicts** - Stop for maintainer investigation. Compare the reviewed package/manifest version, immutable source SHA, GitHub tag/release, npm version, and any provided npm `gitHead`. Never move a release tag to bypass a mismatch. Registry metadata alone cannot establish artifact identity.
- **Automation limits** - Only stable releases from `main` to `latest` are supported. There are no custom candidate, version, tag, or registry preflight guards, publication retries, completion polling, or npm-completion label reconciliation. Automatic repair and retry are unsupported; maintainers own partial-failure recovery and any explicit repair.

The release workflow's owning seam is live GitHub/npm state. Offline static checks, native config parsing, and source inspection do not prove runtime behavior, OIDC readiness, publication success, or hosted settings. Live execution requires separate authorization and all prerequisites above.

## Domain Docs For GitHub Work

- **Use established terms** - Use the package and tool vocabulary in issue titles, hypotheses, implementation proposals, and PR summaries.
- **Note vocabulary gaps** - If a needed concept is absent, mention the gap instead of inventing durable language in an issue.
- **Select checks** - When selecting validation or reporting skipped checks, read [`tooling-and-commands.md`](tooling-and-commands.md).
