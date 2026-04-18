# Concurrent Search

Demonstrates concurrent rendering for responsive search interfaces.

## Overview

Uses React's concurrent features to keep search input responsive while rendering results in the background. Builds on `useDeferredValue` and `startTransition` for advanced performance.

## Features

- Real-time search input
- Concurrent result rendering
- Cancellation of stale updates
- Responsive UI under load

## Complete Code Example

### Step 1: Basic Concurrent Search

```jsx
import React, { useState, useDeferredValue, useMemo } from "react";

const ConcurrentSearch = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // This expensive filtering happens with deferred priority
  const results = useMemo(() => {
    if (!deferredSearchTerm) return items;

    return items.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(deferredSearchTerm.toLowerCase()) ||
        item.content
          .toLowerCase()
          .includes(deferredSearchTerm.toLowerCase())
    );
  }, [deferredSearchTerm, items]);

  return (
    <div className="concurrent-search">
      <input
        type="search"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="results">
        <p>{results.length} results</p>
        {results.map((item) => (
          <div key={item.id} className="result-item">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ConcurrentSearch };
```

### Step 2: Advanced with startTransition

```jsx
import React, {
  useState,
  useDeferredValue,
  useMemo,
  startTransition
} from "react";

const AdvancedConcurrentSearch = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, setIsPending] = useState(false);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const results = useMemo(() => {
    if (!deferredSearchTerm) return items;

    // Simulate expensive filtering
    let filtered = items;
    for (let i = 0; i < 1000; i++) {
      filtered = filtered.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(deferredSearchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [deferredSearchTerm, items]);

  const handleSearchChange = (value) => {
    // Low-priority update
    startTransition(() => {
      setSearchTerm(value);
      setIsPending(true);
    });
  };

  // After deferred value updates, isPending becomes false
  React.useEffect(() => {
    if (deferredSearchTerm === searchTerm) {
      setIsPending(false);
    }
  }, [deferredSearchTerm, searchTerm]);

  return (
    <div className="concurrent-search">
      <div className="search-input-wrapper">
        <input
          type="search"
          placeholder="Search posts (try typing fast)..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {isPending && <span className="spinner">● ● ●</span>}
      </div>

      <div className={`results ${isPending ? 'stale' : ''}`}>
        <p>{results.length} results found</p>
        {results.map((item) => (
          <article key={item.id} className="result-item">
            <h3>{item.title}</h3>
            <p>{item.content.substring(0, 100)}...</p>
            <span className="date">{item.date}</span>
          </article>
        ))}
      </div>
    </div>
  );
};

export { AdvancedConcurrentSearch };
```

### Step 3: Server Markup

```html
<div data-react-from-markup-container>
  <div data-rehydratable="ConcurrentSearch" data-item-type="posts">
    <input type="search" placeholder="Search..." />
    <div class="results"></div>
  </div>
</div>
```

### Step 4: Rehydrator with Sample Data

```jsx
const generateMockItems = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Post ${i + 1}: React ${Math.random() > 0.5 ? 'Hooks' : 'Patterns'}`,
    content: `This is the content of post ${i + 1}. Lorem ipsum dolor sit amet.`,
    date: new Date(Date.now() - Math.random() * 1000000000)
      .toLocaleDateString()
  }));
};

const concurrentSearchRehydrator = async () => {
  const items = generateMockItems(200);
  return <ConcurrentSearch items={items} />;
};

export { concurrentSearchRehydrator };
```

### Step 5: Styling with Loading State

```css
.concurrent-search {
  max-width: 600px;
}

.search-input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-input-wrapper input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-input-wrapper .spinner {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #1976d2;
  animation: spin 1s infinite;
}

@keyframes spin {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.results {
  transition: opacity 0.3s;
}

.results.stale {
  opacity: 0.6;
}

.result-item {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  transition: background 0.2s;
}

.result-item:hover {
  background: #f9f9f9;
}

.result-item h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.result-item p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.875rem;
}

.result-item .date {
  font-size: 0.75rem;
  color: #999;
}
```

## Key Differences from Regular Search

| Aspect | Regular Search | Concurrent Search |
|--------|---|---|
| Input responsiveness | May lag if filtering is slow | Always responsive |
| Result updates | Immediate | Deferred/low priority |
| Stale results | Not shown | Can be shown while updating |
| Use case | < 100 items | 100+ items, heavy rendering |

## When to Use

- Large lists (200+ items)
- Complex filtering logic
- Need for maximum input responsiveness
- Real-time data with heavy rendering
- When `useDeferredValue` isn't enough

## Best Practices

- Always show pending indicator
- Display stale results with visual distinction
- Use `useMemo` for expensive calculations
- Profile before optimizing
- Test on slower devices
- Provide keyboard navigation

## Performance Comparison

Without concurrent features:
```
User types → Calculate → Render → Display (all blocking)
```

With concurrent features:
```
User types → Display immediately → Calculate → Render → Display (non-blocking)
```
