# Contributing

Read the [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## Questions And Reports

Use [GitHub Discussions](https://github.com/devlsh/tools/discussions) for questions and support, and [Issues](https://github.com/devlsh/tools/issues) for bugs and feature requests. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

Search open and closed issues first. Add details to an existing report, or open a new one with reproduction steps, expected and actual behavior, and environment details.

## Local Development

Install [Nix](https://nix.dev/) and [devenv](https://devenv.sh/), then clone the repository.

From the repository root, install dependencies with the frozen lockfile and set up Git hooks:

```sh
devenv tasks run tools:install
```

Enter the development shell before running the pnpm commands below:

```sh
devenv shell
```

If you use [direnv](https://direnv.net/), run `direnv allow .` instead of entering the shell manually.

## Dependency Changes

Ask the maintainer to approve dependency versions before adding or updating them. Include the manifest, lockfile, and any related script or configuration changes in the same PR.

## Checks

Run typechecking, linting, ast-grep tests and scanning, and formatting checks:

```sh
pnpm check
```

Apply automatic lint, ast-grep, and formatting fixes when needed:

```sh
pnpm fix:all
```

Inspect the diff, fix remaining findings, and rerun `pnpm check` until it passes. For documentation changes, check local links and anchors too.

For ast-grep rule changes, add valid, invalid, and relevant nested cases in `ast-grep/tests`. After an intentional behavior change, update and format snapshots, then verify the tests and repository scan:

```sh
pnpm ast:test:update
pnpm fmt 'ast-grep/tests/__snapshots__/*.yml'
pnpm ast:test
pnpm ast:scan
```

Review every changed snapshot and rerun `pnpm check` before submitting.

For Oxlint rule changes, exercise relevant cases or consumer examples and describe the results in your PR. Existing RuleTester files are typechecked, not executed by `pnpm check`.

## Snapshot Automation

Maintainers can update snapshots through the [ast-grep workflow](.github/workflows/ast-rule-tests.yml):

1. Merge the reviewed rule or fixture changes into the default branch.
2. In Actions, select **ast rule tests**, choose the default branch, and click **Run workflow**.
3. Check that generation, formatting, tests, and scanning pass.
4. Review every snapshot in the resulting PR. If nothing changed, there is no PR.
5. Approve pending validation workflows if prompted, and wait for required checks to pass before merging.

## Pull Requests

Search existing issues and PRs first. Keep changes focused, and update affected tests and usage examples.

- Open a PR against `main` using the [PR template](.github/PULL_REQUEST_TEMPLATE.md). Use a Conventional Commit title for release-relevant changes.
- Explain the change, link related issues, and call out breaking changes or areas that need review.
- List checks run and their results. Explain omitted tests or blocked checks.
- Use a draft for unfinished work. Request final review after local and required CI checks pass and blocking findings are resolved.
- If you use AI, write the description in your own words and explain how you reviewed its code and decisions.
