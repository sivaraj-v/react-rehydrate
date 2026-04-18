# Error Boundary

Demonstrates error boundary patterns for isolating component failures.

## Overview

Error boundaries catch rendering errors and prevent the entire app from breaking. This demo shows how to use error boundaries effectively.

## Features

- Error catching and isolation
- Fallback UI display
- Error logging
- Recovery options

## Complete Code Example

### Step 1: Error Boundary Component

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("Error caught:", error, errorInfo);
    
    // You could also log to an error reporting service
    // logErrorToService(error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  reset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>⚠️ Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
              <summary>Error details (development only)</summary>
              <p>{this.state.errorInfo?.componentStack}</p>
            </details>
          )}
          
          <button onClick={this.reset}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
```

### Step 2: Component That May Error

```jsx
import React from "react";

const BuggyWidget = ({ shouldError = false }) => {
  if (shouldError) {
    throw new Error("Widget encountered an error!");
  }

  return (
    <div className="widget">
      <h3>Stable Widget</h3>
      <p>No errors here!</p>
    </div>
  );
};

export { BuggyWidget };
```

### Step 3: Using Error Boundary

```jsx
import React, { useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { BuggyWidget } from "./BuggyWidget";

const ErrorBoundaryDemo = () => {
  const [shouldError, setShouldError] = useState(false);

  return (
    <div className="demo">
      <h2>Error Boundary Demo</h2>

      <button onClick={() => setShouldError(!shouldError)}>
        {shouldError ? "Fix Widget" : "Break Widget"}
      </button>

      {/* Error boundary isolates errors to just this widget */}
      <ErrorBoundary>
        <BuggyWidget shouldError={shouldError} />
      </ErrorBoundary>

      {/* Other content continues to work */}
      <div className="other-content">
        <p>This continues to work even if the widget above errors</p>
      </div>
    </div>
  );
};

export { ErrorBoundaryDemo };
```

### Step 4: Multiple Error Boundaries

```jsx
// Strategy: Wrap each major section with its own boundary

const Page = () => (
  <div>
    <header>
      <ErrorBoundary>
        <Navigation />
      </ErrorBoundary>
    </header>

    <main>
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <ProductGrid />
      </ErrorBoundary>

      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>
    </main>

    <footer>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </footer>
  </div>
);
```

### Step 5: Rehydrator

```jsx
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorBoundaryDemo } from "./ErrorBoundaryDemo";

const errorBoundaryWidgetRehydrator = async (domNode) => {
  return (
    <ErrorBoundary>
      <ErrorBoundaryDemo />
    </ErrorBoundary>
  );
};

export { errorBoundaryWidgetRehydrator };
```

## What Error Boundaries Catch

✅ Rendering errors
✅ Lifecycle method errors  
✅ Constructor errors
✅ Errors in child components

## What Error Boundaries Don't Catch

❌ Event handler errors (use try/catch)
❌ Async code errors (use try/catch)
❌ Server-side rendering
❌ Errors in the error boundary itself

## Event Handler Errors

```jsx
const handleClick = async () => {
  try {
    await riskyOperation();
  } catch (error) {
    // Handle error - error boundary won't catch this
    setError(error);
  }
};
```

## Best Practices

- Have granular error boundaries for each major section
- Provide meaningful error messages
- Include recovery options ("Try again" button)
- Log errors for debugging
- Show users a helpful fallback UI
- Don't show technical details to end users (only in dev mode)

## Error Reporting Service Integration

```jsx
componentDidCatch(error, errorInfo) {
  // Send to error tracking service
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureException(error, { contexts: { react: errorInfo } });
  }
}
```
