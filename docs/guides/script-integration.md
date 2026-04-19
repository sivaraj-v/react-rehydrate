# Script Integration: The "Drop-in" Strategy

One of the most powerful ways to use `react-rehydrate` is as a **Self-Hydrating Bundle**. This is ideal for CMS platforms (WordPress, Drupal, Adobe Experience Manager) or Portals where you cannot easily change the main application lifecycle but can include a `<script>` tag.

## 📦 The "Bundle & Forget" Pattern

In this pattern, you create a single entry point that registers all your components and automatically triggers rehydration when the DOM is ready.

### 1. Create your Entry Point (`rehydrate-bundle.js`)

```javascript
import rehydrate from "@sivaraj-v/react-rehydrate";
import { LiveAuction } from "./components/LiveAuction";
import { StockTicker } from "./components/StockTicker";

// A 'Global' rehydrator registry
const registry = {
  LiveAuction: (el) => <LiveAuction itemId={el.dataset.itemId} />,
  StockTicker: (el) => <StockTicker symbols={el.dataset.symbols.split(",")} />
};

const init = () => {
  // We scan the whole body, or a specific main container
  rehydrate(document.body, registry, {
    extra: { timestamp: Date.now() }
  });
};

// Auto-init on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
```

### 2. Include in your Template

Now, any developer on your team (even those who don't know React) can simply add the markup to their HTML:

```html
<!-- Include your Real-time Trading Bundle -->
<script src="/dist/trading-islands.js" defer></script>

<!-- The Interactive Island -->
<div data-react-from-markup-container>
  <h3>Real-time Bidding</h3>
  <div data-rehydratable="LiveAuction" data-item-id="8821"></div>
</div>
```

---

## 🛠️ Advantages for Web Creators

### 1. Decoupled Development
Your React developers can work in a modern repo with Vite/HMR. They ship a single `bundle.js` file. Your CMS/Backend developers just use the `data-rehydratable` attributes in their templates.

### 2. Multi-Team Orchestration
Different teams can ship their own self-hydrating bundles. Because `react-rehydrate` uses independent roots, Team A's "Cart" bundle and Team B's "Support Chat" bundle can coexist without ever knowing about each other.

### 3. Versioned Rollouts
You can include different versions of your bundle on different pages. Since the rehydration is "controlled" by the presence of the script and the markers, you have full control over the rollout.

---

## 🚀 Performance Trick: Selective Script Loading

If you have a complex component that is only used on one page, don't include it in your main bundle. Use **Dynamic Imports** in your Rehydrator:

```javascript
const registry = {
  ComplexChart: async (el) => {
    // Only downloads this component if 'ComplexChart' is found on the page!
    const { Chart } = await import("./components/Chart");
    return <Chart data={el.dataset.points} />;
  }
};
```

This way, your "Global Bundle" stays tiny, and the heavy React code only loads when it's actually needed.
