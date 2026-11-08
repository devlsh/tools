# React Rules

Class-component rules are paired for TypeScript (`.ts`) and TSX (`.tsx`). `no-react-global` intentionally applies only to TSX.

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

TSX rule; TypeScript counterpart: [`no-react-class-components-ts`](no-react-class-components-ts.yml). The TypeScript counterpart also covers class components without JSX, such as those using `createElement`.

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
