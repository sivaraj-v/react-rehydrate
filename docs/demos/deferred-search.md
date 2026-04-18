# Deferred Search

Demonstrates React 19's `useDeferredValue` hook for keeping input responsive during heavy rendering.

## Overview

When search results take time to render (filtering large lists, computing complex results), the input field can lag. With `useDeferredValue`, React de-prioritizes the expensive rendering pass so the input stays responsive.

## Pattern

```javascript
const deferredSearchTerm = useDeferredValue(searchTerm);
```

Then use `deferredSearchTerm` for expensive computations, while the input is bound to `searchTerm`.

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <div data-rehydratable="DeferredSearch">
    <h2>Search Posts</h2>
    <input type="search" placeholder="Search..." />
    <ul>
      <!-- Results rendered here -->
    </ul>
  </div>
</div>
```

### Step 2: React Component

```jsx
import React, { useDeferredValue, useState, useMemo } from "react";

// Generate mock data
const generatePosts = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Post ${i + 1}`,
    content: `Content for post ${i + 1}`,
    tags: ["react", "web", "javascript", "performance"]
  }));
};

const DeferredSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // deferredValue is updated at lower priority
  const deferredSearchTerm = useDeferredValue(searchTerm);
  
  // Heavy filtering happens with deferred value
  // If search term changes rapidly, this will show stale results
  // until React has time to process the update
  const allPosts = useMemo(() => generatePosts(1200), []);
  const filteredPosts = useMemo(() => {
    console.log("Filtering posts...");
    
    if (!deferredSearchTerm) return allPosts;
    
    return allPosts.filter(post =>
      post.title.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [deferredSearchTerm, allPosts]);

  const isStale = searchTerm !== deferredSearchTerm;

  return (
    <div className="deferred-search">
      <h2>Search Posts</h2>
      
      <input
        type="search"
        placeholder="Search 1200+ posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isStale && (
        <p className="stale-indicator">Searching...</p>
      )}

      <div className="results">
        <p>{filteredPosts.length} results</p>
        
        <ul>
          {filteredPosts.slice(0, 50).map(post => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>

        {filteredPosts.length > 50 && (
          <p className="more-results">
            ... and {filteredPosts.length - 50} more
          </p>
        )}
      </div>
    </div>
  );
};

export { DeferredSearch };
```

### Step 3: Rehydrator

```jsx
const deferredSearchRehydrator = async (domNode) => {
  return <DeferredSearch />;
};

export { deferredSearchRehydrator };
```

### Step 4: Register and Mount

```jsx
import { rehydrate } from "react-from-markup";
import { DeferredSearch, deferredSearchRehydrator } from "./DeferredSearch";

const rehydrators = {
  DeferredSearch: deferredSearchRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## Use Cases

- Real-time search over large datasets
- Autocomplete with complex rendering
- Live filtering with expensive DOM updates
- Any input with O(n) or worse rendering cost

## Relationship to startTransition

- `useDeferredValue`: For specific values
- `startTransition`: For related state updates

Use `useDeferredValue` when you want input responsiveness. Use `startTransition` when you want to batch multiple state updates.

## Best Practices

- Always show a loading or stale indicator during deferral
- Combine with suspense for async search
- Consider pagination for truly massive datasets (>10k items)
- Profile before optimizing: verify rendering is actually slow
- Test on slower devices to see real impact

## Performance Tips

```jsx
// Memoize expensive computations
const filteredPosts = useMemo(() => {
  return expensiveFilter(deferredSearchTerm);
}, [deferredSearchTerm]);

// Virtualize large lists
import { FixedSizeList } from 'react-window';
```
