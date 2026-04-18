# Accessible Disclosure

Demonstrates building accessible disclosure widgets (expandable sections) that follow ARIA guidelines.

## Overview

An expand/collapse pattern that properly manages focus, announces state changes, and integrates with keyboard navigation. Essential for accessibility compliance.

## Features

- Accessible expand/collapse
- ARIA attributes correctly applied
- Keyboard navigation support
- State announcement for screen readers

## Complete Code Example

### Step 1: Accessible Disclosure Component

```jsx
import React, { useState } from "react";

const AccessibleDisclosure = ({ title, children, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const buttonId = `disclosure-button-${Math.random()}`;
  const panelId = `disclosure-panel-${Math.random()}`;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="disclosure">
      <button
        id={buttonId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="disclosure-button"
      >
        <span className="disclosure-title">{title}</span>
        <span
          className="disclosure-icon"
          aria-hidden="true"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        >
          ▼
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="disclosure-panel"
      >
        <div className="disclosure-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export { AccessibleDisclosure };
```

### Step 2: Server Markup

```html
<div data-react-from-markup-container>
  <div data-rehydratable="AccessibleDisclosure" data-title="What is React?">
    <p>React is a JavaScript library for building user interfaces...</p>
  </div>
</div>
```

### Step 3: Rehydrator

```jsx
const accessibleDisclosureRehydrator = async (domNode) => {
  const title = domNode.getAttribute("data-title");
  
  // Get content from existing markup
  const content = [...domNode.childNodes]
    .map(node => node.outerHTML)
    .join('');

  return (
    <AccessibleDisclosure title={title}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </AccessibleDisclosure>
  );
};

export { accessibleDisclosureRehydrator };
```

### Step 4: Styling

```css
.disclosure {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.disclosure-button {
  width: 100%;
  text-align: left;
  padding: 1rem;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s;
}

.disclosure-button:hover {
  background: #eeeeee;
}

.disclosure-button:focus {
  outline: 2px solid #1976d2;
  outline-offset: -2px;
}

.disclosure-icon {
  display: inline-block;
  font-size: 0.75em;
  margin-left: 1rem;
  flex-shrink: 0;
}

.disclosure-panel[hidden] {
  display: none;
}

.disclosure-content {
  padding: 1rem;
  background: #fff;
}
```

### Step 5: Multiple Disclosures (FAQ Pattern)

```jsx
import React from "react";
import { AccessibleDisclosure } from "./AccessibleDisclosure";

const FAQ = ({ items }) => (
  <div className="faq">
    <h2>Frequently Asked Questions</h2>
    {items.map((item, idx) => (
      <AccessibleDisclosure key={idx} title={item.question}>
        <p>{item.answer}</p>
      </AccessibleDisclosure>
    ))}
  </div>
);

const faqRehydrator = async () => {
  const faqs = [
    { question: "What is React?", answer: "React is..." },
    { question: "How do I learn React?", answer: "You can..." },
    { question: "What are hooks?", answer: "Hooks are..." }
  ];

  return <FAQ items={faqs} />;
};

export { faqRehydrator };
```

## ARIA Guidelines

✅ Use `role="button"` (or `<button>` element)
✅ Implement `aria-expanded` state
✅ Manage `aria-controls` relationships
✅ Use `aria-labelledby` on content panel
✅ Provide keyboard support (Enter, Space)

## Keyboard Support

| Key | Action |
|-----|--------|
| Enter | Toggle expanded state |
| Space | Toggle expanded state |
| Tab | Move to next focusable element |

## Best Practices

- Always validate with screen readers
- Maintain focus order
- Provide clear visual indicators
- Test keyboard navigation
- Use semantic HTML (`<button>`)
- Announce state changes with `aria-expanded`
- Don't trap focus inside disclosure

## Screen Reader Testing

Test with:
- NVDA (Windows, free)
- JAWS (Windows, commercial)
- VoiceOver (macOS/iOS built-in)
- TalkBack (Android built-in)
