# Base Rules

## [`no-runtime-freeze`](no-runtime-freeze.yml)

Enforces no `Object.freeze` calls.

**Allowed:**

```ts
const config = { enabled: true } as const;
```

**Not allowed:**

```ts
const config = Object.freeze({ enabled: true });
```

## [`no-runtime-freeze-tsx`](no-runtime-freeze-tsx.yml)

Enforces no `Object.freeze` calls.

**Allowed:**

```tsx
const config = { enabled: true } as const;
```

**Not allowed:**

```tsx
const config = Object.freeze({ enabled: true });
```

## [`no-precautionary-immutability`](no-precautionary-immutability.yml)

Disallows `readonly` properties and indexes and `.readonly()` calls starting with `z.`.

**Allowed:**

```ts
type Player = { id: string };
```

**Not allowed:**

```ts
type Player = { readonly id: string };
```

## [`no-precautionary-immutability-tsx`](no-precautionary-immutability-tsx.yml)

Disallows `readonly` properties and indexes and `.readonly()` calls starting with `z.`.

**Allowed:**

```tsx
type Player = { id: string };
```

**Not allowed:**

```tsx
type Player = { readonly id: string };
```

## [`multiline-arrow-expression-requires-block`](multiline-arrow-expression-requires-block.yml)

Requires braces and an explicit return for multiline arrow bodies.

**Allowed:**

```ts
const read = () => {
  return createValue({
    enabled: true,
    name: 'value',
  });
};
```

**Not allowed:**

```ts
const read = () =>
  createValue({
    enabled: true,
    name: 'value',
  });
```

## [`multiline-arrow-expression-requires-block-tsx`](multiline-arrow-expression-requires-block-tsx.yml)

Requires braces and an explicit return for multiline arrow bodies, including JSX.

**Allowed:**

```tsx
const StatusCard = () => {
  return (
    <section>
      <p>Ready</p>
    </section>
  );
};
```

**Not allowed:**

```tsx
const StatusCard = () => (
  <section>
    <p>Ready</p>
  </section>
);
```

## [`no-read-string-helper`](no-read-string-helper.yml)

Disallows `readString` helpers and calls.

**Allowed:**

```ts
const raw = record.name;
const name = typeof raw === 'string' ? raw : undefined;
```

**Not allowed:**

```ts
const name = readString(record, 'name');
```

## [`no-raw-string-errors`](no-raw-string-errors.yml)

Flags single-quoted strings used as errors.

**Allowed:**

```ts
throw new InvalidConfigError({ message: 'Missing config' });
```

**Not allowed:**

```ts
throw 'Missing config';
```

## [`no-response-builder-helpers`](no-response-builder-helpers.yml)

Disallows one-line `Response` wrapper functions.

**Allowed:**

```ts
const response = new Response(null, { status: 204 });
```

**Not allowed:**

```ts
const emptyResponse = (): Response => new Response(null, { status: 204 });
```

## [`no-trivial-type-predicate-helper`](no-trivial-type-predicate-helper.yml)

Disallows helpers such as `isString` that only wrap a native check.

**Allowed:**

```ts
if (typeof value === 'string') {
  consumeName(value);
}
```

**Not allowed:**

```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

## [`no-inline-parameter-object-types`](no-inline-parameter-object-types.yml)

Requires named types for object parameters.

**Allowed:**

```tsx
interface Options {
  enabled: boolean;
}
function createRuntime(options: Options) {
  return options.enabled;
}
```

**Not allowed:**

```tsx
function createRuntime(options: { enabled: boolean }) {
  return options.enabled;
}
```

## [`short-is-helper-candidates`](short-is-helper-candidates.yml)

Flags one-line `is...` and `has...` helpers for review.

**Allowed:**

```ts
if (droplet.y < bounds.height) {
  drawDroplet(droplet);
}
```

**Not allowed:**

```ts
function isVisible(droplet: RainDroplet, bounds: RainBounds) {
  return droplet.y < bounds.height;
}
```

## [`no-constructor-parameter-properties`](no-constructor-parameter-properties.yml)

Disallows constructor parameter properties.

**Allowed:**

```tsx
class Service {
  private readonly deps: Deps;
  constructor(deps: Deps) {
    this.deps = deps;
  }
}
```

**Not allowed:**

```tsx
class Service {
  constructor(private readonly deps: Deps) {}
}
```

## [`no-duplicate-imported-type-alias`](no-duplicate-imported-type-alias.yml)

Flags duplicate value and type imports of the same name in one statement.

**Allowed:**

```ts
import { Entity } from '@example/entities';
```

**Not allowed:**

```ts
import { Entity, type Entity as EntityType } from '@example/entities';
```

## [`no-error-factory-helpers`](no-error-factory-helpers.yml)

Flags helpers that only create or throw an error.

**Allowed:**

```ts
const failure = new ValidationFailure({ message });
```

**Not allowed:**

```ts
const makeValidationFailure = (message: string) => new ValidationFailure({ message });
```
