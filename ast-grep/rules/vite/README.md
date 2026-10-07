# Vite Rules

## [`no-inline-shader-source`](no-inline-shader-source.yml)

Requires separate shader files imported with `?raw`.

**Allowed:**

```ts
import vertexShader from './shaders/lighting.glsl?raw';
```

**Not allowed:**

```ts
import vertexShader from './lighting.glsl';
```
