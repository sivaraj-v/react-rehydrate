# Markup Containers

A markup container is any element marked with:

```html
data-react-from-markup-container
```

Only elements inside these containers are rehydrated.

Example:

```html
<div data-react-from-markup-container>
  <p>Static HTML that becomes a React node at runtime.</p>
</div>
```

## Why containers matter

- You can have multiple independent roots on one page.
- Containers can rehydrate in parallel.
- This is ideal for CMS pages composed from separate widgets.
