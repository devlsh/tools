# Zod Rules

Each policy has separate TypeScript (`.ts`) and TSX (`.tsx`) rules. Load this directory to enable both grammars.

## [`zod-namespace-import`](zod-namespace-import.yml)

TypeScript rule; TSX counterpart: [`zod-namespace-import-tsx`](zod-namespace-import-tsx.yml).

Enforces namespace-only imports for `zod` so that it can be properly tree-shaken.

**Allowed:**

```ts
import * as z from 'zod';
```

**Not allowed:**

```ts
import { z } from 'zod';
```

## [`no-screaming-snake-zod-schema`](no-screaming-snake-zod-schema.yml)

TypeScript rule; TSX counterpart: [`no-screaming-snake-zod-schema-tsx`](no-screaming-snake-zod-schema-tsx.yml).

Enforces PascalCase or lower camel case for Zod schema names.

**Allowed:**

```ts
const UserInput = z.object({ name: z.string() });
```

**Not allowed:**

```ts
const USER_INPUT_SCHEMA = z.object({ name: z.string() }).strict();
```
