# Test Rules

## [`no-zero-delay-promise-timeout-waits`](no-zero-delay-promise-timeout-waits.yml)

Disallows `setTimeout(resolve, 0)` Promise waits in tests.

**Allowed:**

```ts
await commandCompleted;
```

**Not allowed:**

```ts
await new Promise<void>((resolve) => setTimeout(resolve, 0));
```

## [`no-fixed-promise-resolve-drains`](no-fixed-promise-resolve-drains.yml)

Disallows repeated `await Promise.resolve()` calls to wait for async work.

**Allowed:**

```ts
await deliveryCompleted;
expect(delivered).toBe(true);
```

**Not allowed:**

```ts
await Promise.resolve();
await Promise.resolve();
```

## [`no-set-immediate-promise-waits`](no-set-immediate-promise-waits.yml)

Disallows `setImmediate` Promise waits in tests. Allows tests with `event loop`, `setImmediate`, or `macrotask` in their name.

**Allowed:**

```ts
await deliveryCompleted;
```

**Not allowed:**

```ts
await new Promise<void>((resolve) => setImmediate(resolve));
```

## [`no-source-structure-tests`](no-source-structure-tests.yml)

Flags file reads and source parsing in tests.

**Allowed:**

```tsx
it('calculates the order total', () => {
  expect(calculateTotal([{ price: 5, quantity: 2 }])).toBe(10);
});
```

**Not allowed:**

```tsx
const source = readFileSync('src/index.ts', 'utf8');
expect(source).toContain('export');
```

## [`no-one-expect-helper-bodies`](no-one-expect-helper-bodies.yml)

Flags generic helpers that only wrap one `expect` assertion.

**Allowed:**

```ts
expect(value).toBe('ready');
```

**Not allowed:**

```ts
function expectValue(value: unknown) {
  expect(value).toBe('ready');
}
```
