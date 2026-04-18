# Show More Text

Demonstrates text truncation with an expandable "Show More" link.

## Overview

Truncates long text passages and provides a "Show More" link to expand them. Useful for preview text, descriptions, and comments. Keeps the UI clean while allowing access to full content.

## Features

- Text truncation
- Toggle expansion
- Line counting
- Smooth transitions

## Complete Code Example

### Step 1: Component with Line-Based Truncation

```jsx
import React, { useState } from "react";

const ShowMoreText = ({ 
  text, 
  maxLines = 3,
  expandLabel = "Show More",
  collapseLabel = "Show Less"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split into lines and truncate
  const lines = text.split('\n');
  const isOverflow = lines.length > maxLines;
  const displayLines = isExpanded ? lines : lines.slice(0, maxLines);

  const displayText = displayLines.join('\n');

  return (
    <div className="show-more-text">
      <p className="text" style={{ whiteSpace: 'pre-wrap' }}>
        {displayText}
      </p>

      {isOverflow && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="toggle-button"
          aria-expanded={isExpanded}
        >
          {isExpanded ? collapseLabel : expandLabel}
        </button>
      )}
    </div>
  );
};

export { ShowMoreText };
```

### Step 2: Character-Based Truncation

```jsx
import React, { useState } from "react";

const ShowMoreCharacters = ({ 
  text, 
  maxLength = 200,
  expandLabel = "Show More",
  collapseLabel = "Show Less"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isOverflow = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div className="show-more-text">
      <p className="text">
        {displayText}
        {!isExpanded && isOverflow && '...'}
      </p>

      {isOverflow && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="toggle-button"
        >
          {isExpanded ? collapseLabel : expandLabel}
        </button>
      )}
    </div>
  );
};

export { ShowMoreCharacters };
```

### Step 3: Server Markup

```html
<div data-react-from-markup-container>
  <div data-rehydratable="ShowMoreText" data-max-lines="2">
    <p>
      This is a long description that might span multiple lines.
      It should be truncated initially but expandable by the user.
      The full content becomes visible only when needed.
    </p>
  </div>
</div>
```

### Step 4: Rehydrator

```jsx
const showMoreTextRehydrator = async (domNode) => {
  const maxLines = parseInt(
    domNode.getAttribute("data-max-lines") || "3",
    10
  );

  // Extract text from first paragraph or div
  const textElement = domNode.querySelector('p, div');
  const text = textElement?.textContent || "";

  return (
    <ShowMoreText
      text={text}
      maxLines={maxLines}
      expandLabel="More ↓"
      collapseLabel="Less ↑"
    />
  );
};

export { showMoreTextRehydrator };
```

### Step 5: Styling

```css
.show-more-text {
  line-height: 1.6;
}

.show-more-text .text {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.show-more-text .toggle-button {
  color: #1976d2;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  font-size: 1rem;
}

.show-more-text .toggle-button:hover {
  color: #1565c0;
}

.show-more-text .toggle-button:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
```

## Use When

- Preview snippets
- Comment threads
- Product descriptions
- Long form content
- Email previews
- Search result snippets

## Advanced - Fade Effect

```jsx
<div
  style={{
    display: '-webkit-box',
    WebkitLineClamp: isExpanded ? 'unset' : 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  }}
>
  {text}
</div>
```

## Best Practices

- Respect text boundaries (character or line count)
- Provide clear link text
- Show indication of more content
- Preserve formatting when expanding
- Consider readability on all devices
- Use `aria-expanded` for accessibility
