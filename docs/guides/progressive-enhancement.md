# Progressive Enhancement

React Rehydrate is ideal for progressive enhancement: server-render your content, then activate interactivity only when JavaScript is available.

## What it means

- Users get HTML content even with JS disabled.
- Interactive widgets load after the page is usable.
- The same markup works both server- and client-side.

## Example

```html
<div data-react-from-markup-container>
  <button data-rehydratable="LikeButton" data-liked="false">
    Like
  </button>
</div>
```

```javascript
const LikeButton = async (domNode, rehydrateChildren, extra) => {
  const liked = domNode.getAttribute("data-liked") === "true";
  return <button className={liked ? "liked" : ""}>Like</button>;
};
```

## Best practices

- Use semantic HTML for non-JS fallback.
- Keep server markup readable.
- Only wrap interactive widgets in `data-rehydratable` when they need behavior.
- Avoid heavy client-only rendering for static sections.
