# Browser Rules

## [`browser-safe-no-node-imports`](browser-safe-no-node-imports.yml)

Disallows `node:`, `fs`, `path`, `crypto`, `stream`, `buffer`, and `url` imports or re-exports in browser code.

**Allowed:**

```tsx
const content = await file.text();
```

**Not allowed:**

```tsx
import { readFileSync } from 'node:fs';
```
