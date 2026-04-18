# Search Filter

Demonstrates real-time filtering of a list based on user input.

## Overview

Shows a responsive search interface that filters items in real-time as the user types. Includes performance optimization for large lists.

## Features

- Real-time search input
- Dynamic list filtering
- Performance optimization
- Result count display

## Complete Code Example

### Step 1: Component with Real-Time Filtering

```jsx
import React, { useState, useMemo } from "react";

const SearchFilter = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize filtered results to avoid recalculating on every render
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.description?.toLowerCase().includes(lowerSearch) ||
        item.category?.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, items]);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="search-filter">
      <div className="search-box">
        <input
          type="search"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search items"
        />
        {searchTerm && (
          <button onClick={handleClear} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>

      <div className="results-info">
        Found {filteredItems.length} of {items.length} items
      </div>

      {filteredItems.length > 0 ? (
        <ul className="results-list">
          {filteredItems.map((item) => (
            <li key={item.id} className="result-item">
              <div className="item-name">{item.name}</div>
              {item.description && (
                <div className="item-description">{item.description}</div>
              )}
              {item.category && (
                <span className="item-category">{item.category}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">
          No items match "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export { SearchFilter };
```

### Step 2: Server Markup

```html
<div data-react-from-markup-container>
  <div data-rehydratable="SearchFilter" data-item-count="24">
    <input type="search" placeholder="Search..." />
    <div class="results">
      <!-- Results rendered here -->
    </div>
  </div>
</div>
```

### Step 3: Rehydrator with Data

```jsx
const searchFilterRehydrator = async (domNode) => {
  // Fetch or import items data
  const items = [
    { 
      id: 1, 
      name: "React", 
      description: "A JavaScript library",
      category: "Framework"
    },
    { 
      id: 2, 
      name: "Vue", 
      description: "The progressive framework",
      category: "Framework"
    },
    // ... more items
  ];

  return <SearchFilter items={items} />;
};

export { searchFilterRehydrator };
```

### Step 4: Styling

```css
.search-filter {
  max-width: 600px;
}

.search-box {
  position: relative;
  margin-bottom: 1rem;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-box input:focus {
  outline: none;
  border-color: #1976d2;
}

.search-box button {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #999;
}

.search-box button:hover {
  color: #333;
}

.results-info {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
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

.item-name {
  font-weight: 600;
  color: #333;
}

.item-description {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}

.item-category {
  display: inline-block;
  background: #e8eaf6;
  color: #3f51b5;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.no-results {
  text-align: center;
  padding: 2rem 1rem;
  color: #999;
}
```

### Step 5: Advanced - Debounced API Search

```jsx
import React, { useState, useEffect } from "react";

const RemoteSearchFilter = ({ endpoint }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${endpoint}?q=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchTerm, endpoint]);

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div>Searching...</div>}
      {/* Display results */}
    </div>
  );
};
```

## Best Practices

- Debounce for remote searches (300-500ms delay)
- Show result count
- Highlight or indicate matches
- Handle empty states gracefully
- Consider pagination for large datasets (>1000 items)
- Use memoization to prevent unnecessary filtering
- Provide keyboard navigation
- Show loading state for remote searches
