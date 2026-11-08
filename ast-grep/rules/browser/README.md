# Browser Rules

Load this directory to enable separate rules for TypeScript (`.ts`) and TSX (`.tsx`).

## [`browser-safe-no-node-imports`](browser-safe-no-node-imports.yml)

TSX rule; TypeScript counterpart: [`browser-safe-no-node-imports-ts`](browser-safe-no-node-imports-ts.yml).

Disallows `node:`, `fs`, `path`, `crypto`, `stream`, `buffer`, and `url` static imports, re-exports, and dynamic imports in browser code. CommonJS `require()` calls are not covered.

**Allowed:**

```tsx
const content = await file.text();
```

**Not allowed:**

```tsx
import { readFileSync } from 'node:fs';
```
