# Testing Rehydrated Components

Good tests make sure your rehydrators work across markup shapes and keep the UI stable.

## Recommended approach

- Test rehydrator output as React components.
- Use `@testing-library/react` or snapshot tests.
- Validate that error states and fallback markup render correctly.

## Example with React Testing Library

```javascript
import { render, screen } from "@testing-library/react";
import { MyWidget } from "./MyWidget";

test("renders widget with title", () => {
  render(<MyWidget title="Hello" />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
```

## Rehydrator-focused testing

```javascript
test("MyRehydrator renders fallback on invalid JSON", async () => {
  const domNode = document.createElement("div");
  domNode.setAttribute("data-config", "not-json");

  const output = await MyRehydrator(domNode, () => null, {});
  expect(output).toMatchSnapshot();
});
```

## Useful assertions

- Component text and markup
- Presence of fallback UI
- `console.error` or logging behavior
- Correct use of shared `extra` data
