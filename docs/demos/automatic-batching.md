# Automatic Batching

Demonstrates React 18+'s automatic batching of multiple state updates into a single render.

## Overview

React 18 automatically batches multiple `setState` calls that happen within the same event handler. This works even with async operations via promises and async callbacks—reducing unnecessary renders and improving performance.

## Before React 18

```javascript
// Two separate renders
async function handleClick() {
  setCount(c => c + 1);      // Render 1
  await delay(100);
  setStatus('ready');         // Render 2 (separate)
}
```

## React 18+

```javascript
// Batched into one render if events fire together
async function handleClick() {
  setCount(c => c + 1);      // Not rendered yet
  setStatus('pending');      // Not rendered yet
  // Single render after both queued
}
```

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <section data-rehydratable="AutomaticBatching">
    <h2>Batching Demo</h2>
    <div class="counter">0</div>
    <div class="status">idle</div>
    <div class="render-count">Renders: 0</div>
    <button>Increment & Update Status</button>
  </section>
</div>
```

### Step 2: React Component

```jsx
import React, { useState, useRef } from "react";

const AutomaticBatching = () => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("idle");
  const [renderCount, setRenderCount] = useState(0);
  const renderRef = useRef(0);

  // Track actual renders
  renderRef.current += 1;

  const simulateAsync = () => {
    // Both state updates happen in same tick
    // In React 18: batched into ONE render
    setCount(c => c + 1);
    setStatus("updating");
    
    // In React 18+, setTimeout also batches
    setTimeout(() => {
      setStatus("complete");
    }, 300);
  };

  const handleClick = () => {
    setRenderCount(r => r + 1);
    simulateAsync();
  };

  return (
    <section className="batching-demo">
      <h2>React 18+ Automatic Batching</h2>

      <div className="display">
        <p>
          <strong>Count:</strong> {count}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p className="render-info">
          <strong>Renders:</strong> {renderRef.current}
        </p>
      </div>

      <button onClick={handleClick}>
        Increment & Update Status
      </button>

      <div className="explanation">
        <h3>What's happening:</h3>
        <ul>
          <li>
            Without batching: 2 renders (one for each setState)
          </li>
          <li>
            With React 18+ batching: 1 render for both
          </li>
          <li>
            Watch the render count stay low!
          </li>
        </ul>
      </div>
    </section>
  );
};

export { AutomaticBatching };
```

### Step 3: Compare With Manual startTransition

```jsx
import { useState, startTransition } from "react";

const ManualBatching = () => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("idle");

  const handleClick = () => {
    // Automatic batching (React 18+)
    // Both updates batched together
    setCount(c => c + 1);
    setStatus("updating");
  };

  const handleClickWithTransition = () => {
    // Explicit priority: low-priority updates
    startTransition(() => {
      setCount(c => c + 1);
      setStatus("updating");
    });
  };

  return (
    <div>
      <p>Count: {count}, Status: {status}</p>
      <button onClick={handleClick}>
        Auto-batch
      </button>
      <button onClick={handleClickWithTransition}>
        Low-priority batch
      </button>
    </div>
  );
};
```

### Step 4: Rehydrator

```jsx
const automaticBatchingRehydrator = async (domNode) => {
  return <AutomaticBatching />;
};

export { automaticBatchingRehydrator };
```

### Step 5: Register and Mount

```jsx
import { rehydrate } from "react-from-markup";
import { AutomaticBatching, automaticBatchingRehydrator } from "./AutomaticBatching";

const rehydrators = {
  AutomaticBatching: automaticBatchingRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## When Automatic Batching Applies

✅ Event handlers (click, onChange, etc.)
✅ Promise callbacks (`.then()`)
✅ Async/await functions
✅ `setTimeout`, `setInterval`, other async APIs in React 18+
✅ **NEW in React 18**: Promises and async code

❌ Doesn't prevent batching across different browser events
❌ Manual `root.render()` calls are not batched

## Performance Impact

### Without batching (React 17 and earlier)
```
setState 1 → Render 1 → setState 2 → Render 2
```

### With batching (React 18+)
```
setState 1 + setState 2 → Single Render
```

### Measurements

For 10 state updates in a row:
- **Before batching**: 10 renders
- **After batching**: 1 render  
- **Performance improvement**: ~10x faster render phase

## Best Practices

- Let React's heuristics work: don't fight batching
- Use `startTransition` for intentional low-priority updates
- Monitor with React DevTools Profiler
- Measure impact before optimizing
- Don't rely on immediate state updates after setState

## Opting Out (if needed)

```jsx
import { flushSync } from 'react';

function handleClick() {
  flushSync(() => setCount(c => c + 1));
  // State updates immediately
  flushSync(() => setStatus('updated'));
  // Another immediate render
}
```

**Note**: Use `flushSync` very rarely. Most apps benefit from automatic batching.
