# Undo Counter

Demonstrates undo/redo pattern with state history management.

## Overview

Implements a simple counter with the ability to undo and redo changes. Shows how to manage state history effectively using `useReducer`.

## Features

- Increment/decrement counter
- Undo previous changes
- Redo changes
- History tracking

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <section
    data-rehydratable="UndoCounter"
    data-title="Step counter"
    data-count="0"
  >
    <h2>Step counter</h2>
    <p class="counter-value">0</p>
    <div class="controls">
      <button>−</button>
      <button>+</button>
      <button disabled>Undo</button>
      <button>Reset</button>
    </div>
  </section>
</div>
```

### Step 2: React Component with Reducer

```jsx
import React, { useReducer } from "react";

// Reducer handles all counter state transitions
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      // Save current count to history, then increment
      return { 
        count: state.count + 1, 
        history: [...state.history, state.count] 
      };
    case "decrement":
      // Save current count to history, then decrement
      return { 
        count: state.count - 1, 
        history: [...state.history, state.count] 
      };
    case "undo": {
      // Revert to last saved state
      if (state.history.length === 0) return state;
      const previous = state.history[state.history.length - 1];
      return { 
        count: previous, 
        history: state.history.slice(0, -1) 
      };
    }
    case "reset":
      // Go back to initial value, clear history
      return { 
        count: action.payload, 
        history: [] 
      };
    default:
      return state;
  }
}

const UndoCounter = ({ title, initialCount = 0 }) => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: initialCount,
    history: []
  });

  return (
    <section className="UndoCounter">
      <h2>{title}</h2>
      <p className="counter-value">{state.count}</p>
      <div className="controls">
        <button onClick={() => dispatch({ type: "decrement" })}>
          −
        </button>
        <button onClick={() => dispatch({ type: "increment" })}>
          +
        </button>
        <button
          disabled={state.history.length === 0}
          onClick={() => dispatch({ type: "undo" })}
        >
          Undo
        </button>
        <button 
          onClick={() => dispatch({ type: "reset", payload: initialCount })}
        >
          Reset
        </button>
      </div>
      {state.history.length > 0 && (
        <p className="history">
          History: {[...state.history, state.count].join(" → ")}
        </p>
      )}
    </section>
  );
};

export { UndoCounter };
```

### Step 3: Rehydrator

```jsx
const undoCounterRehydrator = async (domNode) => {
  const title = domNode.getAttribute("data-title");
  const initialCount = parseInt(domNode.getAttribute("data-count"), 10);

  return <UndoCounter title={title} initialCount={initialCount} />;
};

export { undoCounterRehydrator };
```

### Step 4: Register and Mount

```jsx
import { rehydrate } from "react-from-markup";
import { UndoCounter, undoCounterRehydrator } from "./UndoCounter";

const rehydrators = {
  UndoCounter: undoCounterRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## When to Use

- Financial/accounting applications
- Text editors with version control
- Game state manager
- Form submissions with step-back
- Any interaction requiring history

## Best Practices

- Keep history stack size reasonable (or use pagination)
- Use immutable updates for history
- Provide clear visual feedback for undo/redo
- Consider serialization for persistence
- Limit history depth to prevent memory issues

## Extending the Pattern

Add redo functionality:

```jsx
case "redo": {
  if (state.future.length === 0) return state;
  const next = state.future[0];
  return {
    count: next,
    history: [...state.history, state.count],
    future: state.future.slice(1)
  };
}
```
