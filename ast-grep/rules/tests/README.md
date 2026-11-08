# Test Rules

Each policy has separate TypeScript (`.ts`) and TSX (`.tsx`) rules with the same test-path restrictions. Load this directory to enable both grammars; ordinary application files are excluded.

## [`no-zero-delay-promise-timeout-waits`](no-zero-delay-promise-timeout-waits.yml)

TypeScript rule; TSX counterpart: [`no-zero-delay-promise-timeout-waits-tsx`](no-zero-delay-promise-timeout-waits-tsx.yml).

Disallows `setTimeout(resolve, 0)` Promise waits in tests.

The Promise-wait patterns currently require parenthesized callback parameters (`(resolve) => ...`); unparenthesized `resolve => ...` is not detected.

**Allowed:**

```ts
await commandCompleted;
```

**Not allowed:**

```ts
await new Promise<void>((resolve) => setTimeout(resolve, 0));
```

## [`no-fixed-promise-resolve-drains`](no-fixed-promise-resolve-drains.yml)

TypeScript rule; TSX counterpart: [`no-fixed-promise-resolve-drains-tsx`](no-fixed-promise-resolve-drains-tsx.yml).

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

TypeScript rule; TSX counterpart: [`no-set-immediate-promise-waits-tsx`](no-set-immediate-promise-waits-tsx.yml).

Disallows `setImmediate` Promise waits in tests. Allows tests with `event loop`, `setImmediate`, or `macrotask` in their name.

The Promise-wait patterns currently require parenthesized callback parameters (`(resolve) => ...`); unparenthesized `resolve => ...` is not detected.

**Allowed:**

```ts
await deliveryCompleted;
```

**Not allowed:**

```ts
await new Promise<void>((resolve) => setImmediate(resolve));
```

## [`no-source-structure-tests`](no-source-structure-tests.yml)

TSX rule; TypeScript counterpart: [`no-source-structure-tests-ts`](no-source-structure-tests-ts.yml).

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

TypeScript rule; TSX counterpart: [`no-one-expect-helper-bodies-tsx`](no-one-expect-helper-bodies-tsx.yml).

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
