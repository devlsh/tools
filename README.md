<p align="center">
  <h1 align="center">@devlsh/tools</h1>
  <p align="center">Personal shared tooling and configs.</p>
</p>

<br />

<p align="center">
  <a href="https://www.npmjs.com/package/@devlsh/tools" rel="nofollow">
    <img src="https://img.shields.io/npm/dm/%40devlsh%2Ftools?style=flat-square" alt="NPM Downloads" />
  </a>
  <a href="https://github.com/devlsh/tools/stargazers" rel="nofollow">
    <img src="https://img.shields.io/github/stars/devlsh/tools?style=flat-square" alt="GitHub Stars" />
  </a>
  <a href="https://github.com/devlsh/tools/actions/workflows/validate.yml" rel="nofollow">
    <img src="https://img.shields.io/github/actions/workflow/status/devlsh/tools/validate.yml?style=flat-square" alt="Build Status" />
  </a>
  <a href="https://github.com/devlsh/tools/blob/main/LICENSE" rel="nofollow">
    <img src="https://img.shields.io/github/license/devlsh/tools?style=flat-square" alt="Software License" />
  </a>
</p>

<br />

Shared tooling and configs I use across various projects. The idea is to build these around my personal coding style and then use that to force agents to conform to it.

- [`oxlint`](https://oxc.rs/docs/guide/usage/linter) preset.
  - **Very** restrictive - meant to be used with agents to keep them aligned and move towards good practises.
  - Inlcudes [`anti-slop`](https://github.com/dmmulroy/anti-slop) rules from [@dmmulroy](https://github.com/dmmulroy) - _most_ enabled by default, with exceptions where I enforce tighter rules outside of the ruleset. Also includes his Effect ruleset (must be enabled manually).
- [`oxfmt`](https://oxc.rs/docs/guide/usage/formatter) config.
  - Pretty standard - enables some more advanced sorting and preset ignores I use a lot.
- [`ast-grep`](https://ast-grep.github.io) rules.
  - Native shared rules with opt-in test and library groups. Helps cut down on more complex AI slop.

<br />

## Installation

```bash
$ npm install @devlsh/tools
```

## Usage

### `oxlint` preset

In `oxlint.config.ts`, extend the base preset:

```ts
import preset from '@devlsh/tools/oxlint';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [preset],
});
```

For Effect projects, use `@devlsh/tools/oxlint/effect` instead. It already extends the base preset; no need to add both presets.

For Vue 3 projects, this library includes strict rules for them too. Just enable the Vue plugin in `oxlint.config.ts`.

```ts
import preset from '@devlsh/tools/oxlint';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [preset],
  plugins: ['vue'],
});
```

### `oxfmt` preset

In `oxfmt.config.ts`, spread the formatting preset into your config:

```ts
import preset from '@devlsh/tools/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...preset,
});
```

### `ast-grep` rules

In `sgconfig.yml`, select the base group:

```yaml
ruleDirs:
  - node_modules/@devlsh/tools/ast-grep/rules/base
```

Beyond a set of [`base`](ast-grep/rules/base/README.md) rules, there are also library/environment-specific rules you can enable.

- [`tests`](ast-grep/rules/tests/README.md)
- [`react`](ast-grep/rules/react/README.md)
- [`zod`](ast-grep/rules/zod/README.md)
- [`browser`](ast-grep/rules/browser/README.md)
- [`vite`](ast-grep/rules/vite/README.md)

For example, to add `react` rules alongside the base:

```yaml
ruleDirs:
  - node_modules/@devlsh/tools/ast-grep/rules/base
  - node_modules/@devlsh/tools/ast-grep/rules/react
```

### `node`/`pnpm` setup GitHub Action

The repository provides a [composite setup action](github/setup/action.yml) for Node, pnpm, and installing dependencies. The action selects Node and pnpm versions to use from your `package.json` (like `devEngines`), also managing caching the various pnpm caches. After setting things up, it will also run `pnpm install --frozen-lockfile`.

```yaml
steps:
  - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
    with:
      persist-credentials: false
  - uses: devlsh/tools/github/setup@<full-40-character-commit-SHA>
    with:
      cache: true # (optional) Whether to manage pnpm store and metadata caches.
```

> Replace `<full-40-character-commit-SHA>` with a commit SHA from this repo.

## Contributing

Please feel free to contribute by [submitting an issue](https://github.com/devlsh/tools/issues) or [joining the discussions](https://github.com/devlsh/tools/discussions).

For local development, pull requests, and other contributions, see the [Contributing Guidelines](CONTRIBUTING.md).

## License

`@devlsh/tools` is free and open-source software licensed under the [MIT License](LICENSE).

---

> [devlsh.com](https://devlsh.com) &nbsp;&middot;&nbsp;
> GitHub: [@devlsh](https://github.com/devlsh) &nbsp;&middot;&nbsp;
> X: [@itsdevlsh](https://x.com/itsdevlsh)
