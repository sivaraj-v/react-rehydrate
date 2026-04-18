# Suspense Lazy

Demonstrates lazy loading of components with React Suspense boundaries.

## Overview

Splits code into chunks and lazily loads components as needed. Reduces initial bundle size and improves app startup performance significantly.

## Features

- Code splitting
- Lazy component loading
- Suspense fallback UI
- Progressive loading

## Complete Code Example

### Step 1: Code Split a Component

```jsx
// Use React.lazy() to split the bundle
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));
const ChartComponent = lazy(() => import("./ChartComponent"));

// HeavyComponent and ChartComponent are only downloaded when needed
```

### Step 2: Use Suspense Boundary

```jsx
import React, { lazy, Suspense } from "react";

const HeavyComponent = lazy(() =>
  import("./HeavyComponent").then(module => ({
    default: module.HeavyComponent
  }))
);

const App = () => (
  <div>
    <h1>My App</h1>

    <Suspense fallback={<div>Loading component...</div>}>
      <HeavyComponent />
    </Suspense>
  </div>
);

export { App };
```

### Step 3: Rehydrator with Lazy Loading

```jsx
import { lazy, Suspense } from "react";

const HeavyWidget = lazy(() =>
  import("./HeavyWidget").then(m => ({
    default: m.HeavyWidget
  }))
);

const Fallback = () => (
  <div className="loading">
    <p>Loading widget...</p>
    <div className="spinner"></div>
  </div>
);

const suspenseLazyRehydrator = async (domNode) => {
  return (
    <Suspense fallback={<Fallback />}>
      <HeavyWidget />
    </Suspense>
  );
};

export { suspenseLazyRehydrator };
```

### Step 4: Advanced - Multiple Lazy Components with Skeleton UI

```jsx
import React, { lazy, Suspense } from "react";

const ProductCard = lazy(() => import("./ProductCard"));
const ReviewSection = lazy(() => import("./ReviewSection"));
const RelatedItems = lazy(() => import("./RelatedItems"));

const Skeleton = ({ width = "100%", height = "20px" }) => (
  <div
    style={{
      background: "#e0e0e0",
      width,
      height,
      borderRadius: "4px",
      marginBottom: "10px"
    }}
  />
);

const ProductSkeleton = () => (
  <div>
    <Skeleton height="30px" />
    <Skeleton height="200px" />
    <Skeleton width="80%" />
  </div>
);

const ProductPage = ({ productId }) => (
  <div className="product-page">
    <Suspense fallback={<ProductSkeleton />}>
      <ProductCard productId={productId} />
    </Suspense>

    <Suspense fallback={<Skeleton height="100px" />}>
      <ReviewSection productId={productId} />
    </Suspense>

    <Suspense fallback={<Skeleton height="150px" />}>
      <RelatedItems productId={productId} />
    </Suspense>
  </div>
);

export { ProductPage };
```

### Step 5: Performance Monitoring

```jsx
import { Suspense, lazy } from "react";

const HeavyComponent = lazy(async () => {
  const start = performance.now();
  const module = await import("./HeavyComponent");
  const duration = performance.now() - start;
  
  console.log(`HeavyComponent loaded in ${duration}ms`);
  
  return module;
});

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent />
  </Suspense>
);
```

## Use When

- Large applications
- Route-based code splitting
- Modal or off-screen content
- Plugin systems
- Performance optimization
- Third-party library integration

## Best Practices

- Provide meaningful Suspense fallback UI
- Monitor bundle sizes with tools
- Split at route boundaries (most common)
- Consider preloading popular routes
- Use dynamic import clearly
- Show skeleton screens instead of generic "Loading..."

## Bundle Size Analysis

```bash
# Measure impact of code splitting
npm install --save-dev webpack-bundle-analyzer

# In webpack config:
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
```

## Next.js Example

```jsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeavyComponent = dynamic(
  () => import('../components/HeavyComponent'),
  { 
    loading: () => <p>Loading...</p>,
    ssr: false // Don't render on server
  }
);

export default function Page() {
  return <HeavyComponent />;
}
```

## Browser Support

✅ Modern browsers (Chrome 60+, Firefox 67+, Safari 12+)
⚠️ IE: Requires polyfills for `dynamic()` and async iterators
