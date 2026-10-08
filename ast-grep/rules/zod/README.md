# Zod Rules

## [`zod-namespace-import`](zod-namespace-import.yml)

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

Enforces PascalCase or lower camel case for Zod schema names.

**Allowed:**

```ts
const UserInput = z.object({ name: z.string() });
```

**Not allowed:**

```ts
const USER_INPUT_SCHEMA = z.object({ name: z.string() }).strict();
```
