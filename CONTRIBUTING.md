# Contributing

Read the [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## Questions And Reports

Use [GitHub Discussions](https://github.com/devlsh/tools/discussions) for questions and support, and [Issues](https://github.com/devlsh/tools/issues) for bugs and feature requests.

Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## Local Development

### Requirements

- [Nix](https://nix.dev/)
- [devenv](https://devenv.sh/)
- [direnv](https://direnv.net/) _(Optional)_

Nix handles ensuring Node/PNPM versions are properly managed and the correct versions whilst working on the repository.

### Workflow

1. Enter the cloned repo. If you're using `direnv`, allow the `.envrc` for the repository:

   ```sh
   direnv allow .
   ```

2. Install dependencies:

   ```sh
   devenv tasks run tools:install
   ```

3. Run typecheck, lint, and formatting checks before requesting review.

   ```sh
   pnpm check
   ```

## Pull Requests

Search existing issues and pull requests before proposing duplicate work. Explain the problem, rationale, and scope. Link related issues, describe API and documentation impact, and identify release impact, including breaking changes. Give reviewers the areas that need attention and report the checks you ran or could not run.

Target development at `main`. Use Conventional Commit titles/descriptions for release-relevant changes and explain breaking changes explicitly.

When public examples, package boundaries, or scripts change, update their canonical owners and affected onboarding links together.
