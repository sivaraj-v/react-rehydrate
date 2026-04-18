# Rehydrators

A rehydrator is the "bridge" between your static markup and your React components. It is a simple function that maps one DOM node to one React element.

```js
const myRehydrator = async (domNode, rehydrateChildren, extra) => {
  // Read props from the DOM
  const props = {
    title: domNode.dataset.title,
    count: parseInt(domNode.dataset.count, 10)
  };

  // Return the React element
  return <MyComponent {...props} />;
};
```

## Why this approach is better

Traditional "Micro-Frontend" or "Islands" architectures often require heavy lifting to share state or handle nested layouts. `react-rehydrate` provides:

- **Controlled Layout Architecture**: Your backend CMS or template engine controls the layout, while React controls the interactivity.
- **Granular Hydration**: You can hydrate individual components without re-rendering the whole page or even a large sub-tree.
- **Decoupled State**: Rehydrators allow you to decouple your React components from the DOM structure of your legacy app.
- **Component Reusability**: Use the same React components in your full SPA apps and your rehydrated legacy pages.

## Modern Engineering Workflow

1. **Design** your React components as pure "Controlled Components".
2. **Implement** Rehydrators to bridge the gap between static markup and React props.
3. **Deploy** your components into any HTML page by wrapping them in a [markup container](/containers).

## Next step

See [React 19 Patterns](/demos/react-19-patterns) for modern hooks and behavior examples in rehydrated components.
