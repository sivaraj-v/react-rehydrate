# Custom Rehydrator Utilities

Create shared helpers to simplify working with attributes, JSON payloads, and repeated rehydration patterns.

## Common utilities

```javascript
export const parseJsonAttr = (node, name, fallback = {}) => {
  try {
    return JSON.parse(node.getAttribute(name) || "null") || fallback;
  } catch {
    return fallback;
  }
};

export const boolAttr = (node, name) => node.getAttribute(name) === "true";

export const getStringAttr = (node, name, defaultValue = "") =>
  node.getAttribute(name) || defaultValue;
```

## Example rehydrator

```javascript
import { parseJsonAttr, boolAttr, getStringAttr } from "./utils";

const ProductCard = async (domNode) => {
  const product = parseJsonAttr(domNode, "data-product", {});
  const featured = boolAttr(domNode, "data-featured");
  const label = getStringAttr(domNode, "data-label", "Buy now");

  return (
    <div className={featured ? "product-card featured" : "product-card"}>
      <h2>{product.name}</h2>
      <button>{label}</button>
    </div>
  );
};
```

## Why utilities help

- They keep rehydrators concise.
- They centralize parsing and validation.
- They reduce duplicate attribute-handling code.
