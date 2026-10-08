# Development

Follow [CONTRIBUTING.md](../CONTRIBUTING.md) for setup, dependency changes, checks, and pull requests. For release or recovery work, read [Releasing](releasing.md).

Before editing, inspect [package.json](../package.json), the affected implementation and tests, and their configuration. Follow the patterns in nearby code and the configured lint and formatting rules.

## Documentation

When public behavior or scope changes, update affected usage examples and rule references in the root and public group READMEs.

## Agent Workflow

Select checks from [CONTRIBUTING](../CONTRIBUTING.md#checks) and [package.json](../package.json) for every affected consumer. Include behavior checks for these cases:

- For Oxlint rule or preset changes, exercise relevant cases or consumer examples. Existing RuleTester files are typechecked, not executed by `pnpm check`; report an execution gap if no established invocation is available.
- For ast-grep directory or packaging changes, verify a packed, installed consumer with real files, including file scope, `ruleDirs` resolution, diagnostics, and fixes. Native fixtures do not cover installed consumer paths.

Scope automatic fixes and formatting to the authorized files. Report changed files, check results, and omitted or blocked checks with their reasons.

### Tracker Operations

For tracker work, resolve the exact hosted repository and follow [Questions And Reports](../CONTRIBUTING.md#questions-and-reports). Check current hosted labels before applying them.
