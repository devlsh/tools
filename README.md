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
  <a href="https://www.npmjs.com/package/@devlsh/tools" rel="nofollow">
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
- More soon.

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

### `oxfmt` preset

In `oxfmt.config.ts`, spread the formatting preset into your config:

```ts
import preset from '@devlsh/tools/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...preset,
});
```

## Contributing

Please feel free to contribute by [submitting an issue](https://github.com/devlsh/tools/issues) or [joining the discussions](https://github.com/devlsh/tools/discussions).

For local development, pull requests, and other contributions, see the [Contributing Guidelines](CONTRIBUTING.md).

## License

`@devlsh/tools` is free and open-source software licensed under the [MIT License](LICENSE).

---

> [devlsh.com](https://devlsh.com) &nbsp;&middot;&nbsp;
> GitHub: [@devlsh](https://github.com/devlsh) &nbsp;&middot;&nbsp;
> X: [@itsdevlsh](https://x.com/itsdevlsh)
