# Show More

Demonstrates progressive content disclosure with a "Show More" button.

## Overview

Expands content progressively to keep initial page load lightweight and maintain focus. Common pattern for blog posts, comments, and lists.

## Features

- Progressive content expansion
- Toggle show/hide state
- Smooth transitions
- Load more functionality

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <article data-rehydratable="ShowMore" data-max-height="150">
    <h2>Article Title</h2>
    <p>First paragraph visible on load...</p>
    <p>Second paragraph also visible...</p>
    <p>More content hidden behind button...</p>
    <p>Even more hidden content...</p>
  </article>
</div>
```

### Step 2: React Component

```jsx
import React, { useState, useRef, useEffect } from "react";

const ShowMore = ({ maxHeight = 150, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Check if content height exceeds maxHeight
    if (contentRef.current) {
      const actualHeight = contentRef.current.scrollHeight;
      setShouldShowButton(actualHeight > maxHeight);
    }
  }, [maxHeight]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="show-more">
      <div
        ref={contentRef}
        className={`content ${isExpanded ? 'expanded' : 'collapsed'}`}
        style={{
          maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        }}
      >
        {children}
      </div>

      {shouldShowButton && (
        <button
          onClick={toggleExpand}
          className="show-more-button"
          aria-expanded={isExpanded}
        >
          {isExpanded ? '↑ Show Less' : '↓ Show More'}
        </button>
      )}
    </div>
  );
};

export { ShowMore };
```

### Step 3: With Content from Server

```jsx
import React, { useState } from "react";

const ShowMoreArticle = ({ articleId, preview, full }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const content = isExpanded ? full : preview;

  return (
    <article className="article">
      <div className="content">
        {content}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="show-more-button"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </article>
  );
};

export { ShowMoreArticle };
```

### Step 4: Rehydrator

```jsx
const showMoreRehydrator = async (domNode) => {
  const maxHeight = parseInt(
    domNode.getAttribute("data-max-height") || "150",
    10
  );

  return (
    <ShowMore maxHeight={maxHeight}>
      {/* Re-render existing children */}
      {[...domNode.childNodes].map((node, idx) => (
        <div key={idx} dangerouslySetInnerHTML={{ __html: node.innerHTML }} />
      ))}
    </ShowMore>
  );
};

export { showMoreRehydrator };
```

### Step 5: Styling

```css
.show-more {
  position: relative;
}

.content {
  position: relative;
}

.content.collapsed {
  mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
}

.show-more-button {
  display: block;
  width: 100%;
  padding: 1rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-top: none;
  cursor: pointer;
  font-weight: 600;
  color: #1976d2;
  transition: background 0.3s;
}

.show-more-button:hover {
  background: #eeeeee;
}
```

## Use When

- Long lists or articles
- Comments sections
- Lazy-loaded content
- Performance optimization
- Space-constrained layouts

## Best Practices

- Provide clear affordances
- Use smooth transitions
- Update button text state
- Respect user preferences
- Consider keyboard navigation

## Variants

### Smooth Gradient Fade

```jsx
<div
  style={{
    maxHeight: isExpanded ? 'none' : `${maxHeight}px`,
    overflow: 'hidden',
    maskImage: !isExpanded
      ? 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
      : 'none',
    transition: 'all 0.3s ease'
  }}
>
  {children}
</div>
```

### Load More Button (Pagination)

```jsx
const [pageSize, setPageSize] = useState(10);
const items = allItems.slice(0, pageSize);
const hasMore = pageSize < allItems.length;

return (
  <>
    {items.map(item => (...))}
    {hasMore && (
      <button onClick={() => setPageSize(p => p + 10)}>
        Load More
      </button>
    )}
  </>
);
```
