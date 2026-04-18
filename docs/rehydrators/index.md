# Rehydrators

A rehydrator maps one DOM node to one React element.

```js
const myRehydrator = async (domNode, rehydrateChildren, extra) => {
  return <MyComponent />;
};
```

## Common patterns

- Read props from `data-` attributes.
- Use `rehydrateChildren` for nested structures.
- Use `extra` for page-level state (user identity, locale, feature flags).
- Return async imports for code splitting.

## Next step

See [React 19 Patterns](/demos/react-19-patterns) for modern hooks and behavior examples.
