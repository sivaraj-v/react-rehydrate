# Markup Containers

`react-rehydrate` follows an **Island Architecture**. It only touches the parts of the DOM you explicitly designate as "Markup Containers".

## Declaring a Container

A container is defined by adding the `data-react-from-markup-container` attribute to any HTML element.

```html
<div data-react-from-markup-container>
  <!-- React will scan inside this div for rehydratable components -->
  <p>This is a static paragraph.</p>
  
  <div data-rehydratable="Counter" data-start="0"></div>
</div>
```

## Engineering Practice: Multi-Root Strategy

Unlike traditional SPAs that take over the entire `<body>`, we recommend using multiple focused containers. This provides:

1. **Isolation**: A runtime error in one container won't crash components in another.
2. **SEO Dominance**: Keep your critical H1s and navigation links in the static shell, and use containers only for interactive widgets.
3. **Layout Stability (CLS)**: Pre-allocate space for your containers in CSS to prevent layout shifts during hydration.

## Nested Containers

Containers can be nested. If a React component inside one container renders more markup containing `data-react-from-markup-container` markers, you can trigger secondary hydration passes.

## Best Practices

- **Semantic HTML**: Use meaningful tags for your containers (`<header>`, `<main>`, `<section>`).
- **Data Attributes**: Keep your initial component state in `data-` attributes on the rehydratable nodes for instant access during hydration.
- **Selective Hydration**: Don't wrap your entire page in one container unless absolutely necessary. Be granular.
