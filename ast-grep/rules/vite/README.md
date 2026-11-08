# Vite Rules

Load this directory to enable separate rules for TypeScript (`.ts`) and TSX (`.tsx`).

## [`no-inline-shader-source`](no-inline-shader-source.yml)

TypeScript rule; TSX counterpart: [`no-inline-shader-source-tsx`](no-inline-shader-source-tsx.yml).

Requires separate shader files imported with `?raw`.

**Allowed:**

```ts
import vertexShader from './shaders/lighting.glsl?raw';
```

**Not allowed:**

```ts
import vertexShader from './lighting.glsl';
```
