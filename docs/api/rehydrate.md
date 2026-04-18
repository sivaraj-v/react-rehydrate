# `rehydrate`

```ts
rehydrate(rootNode, rehydrators, options?)
```

## Parameters

- `rootNode`: DOM node to start scanning from.
- `rehydrators`: map of rehydratable names to async rehydrator functions.
- `options`:
  - `extra`: shared page-level values passed as third argument to each rehydrator.

## Rehydrator signature

```ts
(domNode, rehydrateChildren, extra) => Promise<ReactElement>
```

- `domNode`: source element with `data-rehydratable`.
- `rehydrateChildren`: helper for nested child conversion.
- `extra`: optional context object from `options.extra`.

## Example

```javascript
import { rehydrate } from "react-from-markup";
import rehydrators from "./rehydrators";

// Pass page-level context to all rehydrators
rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators,
  options: {
    extra: {
      user: { id: "123", name: "Alice" },
      config: { apiUrl: "https://api.example.com" }
    }
  }
});
```

All rehydrators now receive this data:

```javascript
const myRehydrator = async (domNode, rehydrateChildren, extra) => {
  // extra.user and extra.config are available
  return <MyComponent user={extra.user} apiUrl={extra.config.apiUrl} />;
};
```

## See Also

For detailed patterns and real-world examples, see [Passing Page Context with `extra`](/guides/page-context.md).
