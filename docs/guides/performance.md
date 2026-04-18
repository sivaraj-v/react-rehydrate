# Performance Optimization

Keep rehydration fast by minimizing DOM work, limiting render depth, and avoiding expensive operations.

## Practical tips

- Prefer a single root container instead of many small roots.
- Pass shared data through `extra` instead of using many DOM attributes.
- Avoid expensive synchronous DOM reads during rehydration.
- Use memoized components for repeated widget trees.

## Example

```javascript
const rehydrateApp = () => {
  rehydrate({
    container: document.querySelector("[data-react-from-markup-container]"),
    rehydrators: { ... },
    options: {
      extra: { user, config }
    }
  });
};
```

## Avoid common performance traps

- Don’t build large component trees inside a single rehydrator if only a small part needs interactivity.
- Don’t use `JSON.parse()` repeatedly for the same node; parse once and reuse.
- Keep event handlers and state local to the smallest interactive component.
