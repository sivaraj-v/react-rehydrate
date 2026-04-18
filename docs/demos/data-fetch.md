# Data Fetch

Demonstrates data fetching patterns with loading and error states.

## Overview

Shows how to handle asynchronous data loading with proper loading indicators, error handling, and retry logic.

## Features

- Async data loading
- Loading state display
- Error handling with retry
- Progressive enhancement with markup

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <div data-rehydratable="DataFetchCard" data-card-id="user-123">
    <h3>Loading...</h3>
  </div>
</div>
```

### Step 2: React Component

```jsx
import React, { useEffect, useState } from "react";

const DataFetchCard = ({ cardId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call with delay
        const response = await fetch(`/api/card/${cardId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();

        // Don't update state if component unmounted
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup: prevent state update after unmount
    return () => {
      cancelled = true;
    };
  }, [cardId]);

  if (loading) {
    return <div className="card loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="card error">
        <h3>Failed to load</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return <div className="card">No data</div>;
  }

  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <div className="metadata">
        {data.tags && <span>Tags: {data.tags.join(", ")}</span>}
      </div>
    </div>
  );
};

export { DataFetchCard };
```

### Step 3: Rehydrator

```jsx
const dataFetchCardRehydrator = async (domNode) => {
  const cardId = domNode.getAttribute("data-card-id");
  return <DataFetchCard cardId={cardId} />;
};

export { dataFetchCardRehydrator };
```

### Step 4: Register and Mount

```jsx
import { rehydrate } from "react-from-markup";
import { DataFetchCard, dataFetchCardRehydrator } from "./DataFetchCard";

const rehydrators = {
  DataFetchCard: dataFetchCardRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## Best Practices

- Always show loading state during fetch
- Display clear error messages
- Provide retry mechanism
- Cache data when appropriate (use SWR or React Query)
- Handle network timeouts
- Prevent race conditions (use cancellation token)
- Clean up on unmount to prevent memory leaks

## Advanced: Using React Query

```jsx
import { useQuery } from "@tanstack/react-query";

const DataFetchCard = ({ cardId }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["card", cardId],
    queryFn: () => fetch(`/api/card/${cardId}`).then(r => r.json())
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message} <button onClick={() => refetch()}>Retry</button></div>;

  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
    </div>
  );
};
```
