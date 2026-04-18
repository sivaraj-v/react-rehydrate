# Isolated Counter

Demonstrates multiple independent counter widgets on the same page.

## Overview

Shows how to have multiple React components that are isolated from each other, each with their own state and lifecycle. This is the foundation of island-based architectures.

## Features

- Multiple independent components
- Isolated state for each
- No cross-instance interference
- Proper memory cleanup

## Complete Code Example

### Step 1: Server Markup (Multiple Instances)

```html
<div data-react-from-markup-container>
  <div class="counter-group">
    <div 
      data-rehydratable="IsolatedCounter" 
      data-counter-id="widget-1"
      data-label="Cart Count"
      data-initial="0"
    >
      <h3>Cart Count</h3>
      <p>0</p>
      <button>−</button>
      <button>+</button>
    </div>

    <div 
      data-rehydratable="IsolatedCounter" 
      data-counter-id="widget-2"
      data-label="Rating"
      data-initial="5"
    >
      <h3>Rating</h3>
      <p>5</p>
      <button>−</button>
      <button>+</button>
    </div>

    <div 
      data-rehydratable="IsolatedCounter" 
      data-counter-id="widget-3"
      data-label="Quantity"
      data-initial="1"
    >
      <h3>Quantity</h3>
      <p>1</p>
      <button>−</button>
      <button>+</button>
    </div>
  </div>
</div>
```

### Step 2: React Component (Stateful)

```jsx
import React, { useState } from "react";

const IsolatedCounter = ({ 
  counterId, 
  label, 
  initialCount = 0,
  min = 0,
  max = 100 
}) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(c => (c < max ? c + 1 : c));
  };

  const decrement = () => {
    setCount(c => (c > min ? c - 1 : c));
  };

  return (
    <div className="counter-widget">
      <h3>{label}</h3>
      
      <div className="counter-display">
        <p className="value">{count}</p>
        <p className="id">ID: {counterId}</p>
      </div>

      <div className="controls">
        <button 
          onClick={decrement}
          disabled={count === min}
        >
          −
        </button>
        <button 
          onClick={increment}
          disabled={count === max}
        >
          +
        </button>
      </div>

      {count >= max && (
        <p className="status">Maximum reached</p>
      )}
      {count <= min && (
        <p className="status">Minimum reached</p>
      )}
    </div>
  );
};

export { IsolatedCounter };
```

### Step 3: Rehydrator for Each Instance

```jsx
const isolatedCounterRehydrator = async (domNode) => {
  // Each rehydrator call creates a new, independent instance
  const counterId = domNode.getAttribute("data-counter-id");
  const label = domNode.getAttribute("data-label");
  const initialCount = parseInt(
    domNode.getAttribute("data-initial") || "0", 
    10
  );

  return (
    <IsolatedCounter
      counterId={counterId}
      label={label}
      initialCount={initialCount}
    />
  );
};

export { isolatedCounterRehydrator };
```

### Step 4: Register and Mount

```jsx
import { rehydrate } from "react-from-markup";
import { IsolatedCounter, isolatedCounterRehydrator } from "./IsolatedCounter";

const rehydrators = {
  IsolatedCounter: isolatedCounterRehydrator
};

// Single rehydrate call automatically handles ALL matching nodes
rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## Key Insight

Each `data-rehydratable="IsolatedCounter"` node automatically triggers a **new, independent** component instance. The React library handles finding all matching nodes and rehydrating each with its own state and lifecycle.

## Use When

- Multiple widgets on a page
- Island/widget architecture
- Incremental migration to React
- Plugin-style components
- E-commerce: product cards, ratings, carts

## Styling

```css
.counter-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.counter-widget {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.value {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
}

.controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.controls button {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.2rem;
}

.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status {
  color: #999;
  font-size: 0.9rem;
}
```

## Best Practices

- Keep components self-contained
- Avoid accidental global state
- Proper scope management
- Clear component boundaries
- Use consistent naming (data-rehydratable attributes)

## Scaling to Many Instances

For pages with dozens/hundreds of widgets:

```jsx
// Keep renderables in a Map for performance
const renderables = new Map();

const isolatedCounterRehydrator = async (domNode) => {
  const counterId = domNode.getAttribute("data-counter-id");
  
  // Cache renderables if needed
  if (!renderables.has(counterId)) {
    renderables.set(counterId, {
      label: domNode.getAttribute("data-label"),
      initialCount: parseInt(domNode.getAttribute("data-initial"), 10)
    });
  }
  
  const config = renderables.get(counterId);
  return <IsolatedCounter {...config} />;
};
```
