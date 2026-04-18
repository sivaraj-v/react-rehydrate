# Error Handling Across Components

Robust error handling makes sure a single failing rehydrator does not break the entire page.

## Strategy

- Wrap rehydrator logic in `try/catch`.
- Render a fallback UI when a component fails.
- Log the error for diagnostics.

## Example

```javascript
const SafeWidget = async (domNode, rehydrateChildren, extra) => {
  try {
    const data = JSON.parse(domNode.getAttribute("data-config"));
    return <Widget config={data} extra={extra} />;
  } catch (error) {
    console.error("Widget failed to render", error);
    return (
      <div className="widget-error">
        Something went wrong. Please refresh or try again later.
      </div>
    );
  }
};
```

## Fallback patterns

- Display simple static markup when JS fails.
- Keep the server-rendered fallback meaningful.
- Avoid throwing inside the top-level `rehydrate()` call.

## Testing failures

When testing, simulate missing attributes, malformed JSON, or service failures so you can verify fallback rendering and that the page still loads.
