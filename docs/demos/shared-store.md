# Shared Store

Demonstrates state sharing across multiple React root instances using `useSyncExternalStore`.

## Overview

When a page has multiple independent React components in different DOM regions, they can share state through an external store. This is useful for theme selection, language preferences, or other global app state.

## Features

- Multiple independent React roots
- Synchronized external store
- Theme switching across components
- Reactive updates to all subscribers

## Complete Code Example

### Step 1: Create External Store

```jsx
// store.js
let store = {
  theme: localStorage.getItem("theme") || "light"
};

let listeners = [];

const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

const notify = () => {
  listeners.forEach(listener => listener());
};

const getStore = () => store;

const setTheme = (theme) => {
  store.theme = theme;
  localStorage.setItem("theme", theme);
  notify();
};

export { subscribe, getStore, setTheme };
```

### Step 2: Server Markup (Multiple Roots)

```html
<div data-react-from-markup-container>
  <!-- Theme selector -->
  <header data-rehydratable="ThemeSelector">
    <button>Toggle Theme</button>
  </header>

  <!-- Themed widgets -->
  <main>
    <section data-rehydratable="ThemedWidget" data-widget-id="1">
      <h2>Widget 1</h2>
    </section>
    <section data-rehydratable="ThemedWidget" data-widget-id="2">
      <h2>Widget 2</h2>
    </section>
  </main>
</div>
```

### Step 3: Reusable Hook

```jsx
// useTheme.js
import { useSyncExternalStore } from "react";
import { subscribe, getStore, setTheme } from "./store";

export const useTheme = () => {
  const store = useSyncExternalStore(
    subscribe,
    () => getStore().theme,
    () => "light" // Server-side fallback
  );
  
  return [store, setTheme];
};
```

### Step 4: Theme Selector Component

```jsx
import React from "react";
import { useTheme } from "./useTheme";

const ThemeSelector = () => {
  const [theme, setTheme] = useTheme();

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className={`header ${theme}`}>
      <button onClick={toggle}>
        Current theme: {theme}
      </button>
    </header>
  );
};

const themeSelectorRehydrator = async () => {
  return <ThemeSelector />;
};

export { ThemeSelector, themeSelectorRehydrator };
```

### Step 5: Themed Widget Component

```jsx
import React from "react";
import { useTheme } from "./useTheme";

const ThemedWidget = ({ widgetId }) => {
  const [theme] = useTheme();

  return (
    <article className={`widget ${theme}`}>
      <h2>Widget {widgetId}</h2>
      <p>Theme: {theme}</p>
      <div className="content">
        Widget reacts to theme changes
      </div>
    </article>
  );
};

const themedWidgetRehydrator = async (domNode) => {
  const widgetId = domNode.getAttribute("data-widget-id");
  return <ThemedWidget widgetId={widgetId} />;
};

export { ThemedWidget, themedWidgetRehydrator };
```

### Step 6: Register All Rehydrators

```jsx
import { rehydrate } from "react-from-markup";
import { themeSelectorRehydrator } from "./ThemeSelector";
import { themedWidgetRehydrator } from "./ThemedWidget";

const rehydrators = {
  ThemeSelector: themeSelectorRehydrator,
  ThemedWidget: themedWidgetRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

### Step 7: Styling (CSS)

```css
.header.light {
  background: white;
  color: black;
}

.header.dark {
  background: #333;
  color: white;
}

.widget.light {
  background: #f5f5f5;
  color: black;
  border: 1px solid #ddd;
}

.widget.dark {
  background: #222;
  color: white;
  border: 1px solid #444;
}
```

## When to Use

- Multiple independent widget islands
- Global settings (theme, language, user preferences)
- Cross-widget communication
- Progressive enhancement on legacy pages
- Micro-frontend architectures

## Best Practices

- Keep store subscription logic simple
- Use `useSyncExternalStore` with getSnapshot
- Provide clear unsubscribe mechanisms
- Store preferences in localStorage when appropriate
- Consider serialization format for scalability
- Test across multiple instances

## Advanced: Persistence with Hydration

```jsx
const loadStore = () => {
  const saved = localStorage.getItem("app-store");
  if (saved) {
    store = JSON.parse(saved);
  }
};

const saveStore = () => {
  localStorage.setItem("app-store", JSON.stringify(store));
};

const setTheme = (theme) => {
  store.theme = theme;
  saveStore();
  notify();
};

loadStore(); // On app startup
```
