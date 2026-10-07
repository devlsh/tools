# React Rules

## [`no-react-global`](no-react-global.yml)

Disallows the `React` identifier. Use direct imports from `react`.

**Allowed:**

```tsx
import { type ReactNode } from 'react';
interface Props {
  children: ReactNode;
}
```

**Not allowed:**

```tsx
interface Props {
  children: React.ReactNode;
}
```

## [`no-react-class-components`](no-react-class-components.yml)

Requires function components instead of class components.

**Allowed:**

```tsx
function StatusCard() {
  return <section />;
}
```

**Not allowed:**

```tsx
class LegacyCard extends PureComponent {
  render() {
    return <section />;
  }
}
```
