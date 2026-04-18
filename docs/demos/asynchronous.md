# Asynchronous

Demonstrates asynchronous component lifecycle with data loading and state management.

## Overview

Shows patterns for managing async operations in component lifecycle, including setup/teardown, cancellation, and dependency tracking. This is critical for preventing memory leaks and race conditions.

## Features

- Async initialization
- Proper cleanup
- Cancellation handling
- Dependency management

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <div data-rehydratable="AsyncWidget" data-user-id="123">
    <h2>Loading user...</h2>
  </div>
</div>
```

### Step 2: React Component with Cleanup

```jsx
import React, { useEffect, useState } from "react";

const AsyncWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Flag to track if component is still mounted
    let isMounted = true;
    
    // AbortController for cancellation
    const abortController = new AbortController();

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate async data fetching
        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Only update state if component is still mounted
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        // Ignore abort errors (cleanup)
        if (err.name === 'AbortError') {
          return;
        }

        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function runs on unmount or dependency change
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [userId]); // Re-run if userId changes

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export { AsyncWidget };
```

### Step 3: Advanced Pattern with Multiple Effects

```jsx
import React, { useEffect, useState } from "react";

const AdvancedAsyncWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect 1: Fetch user
  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        
        if (isMounted) {
          setUser(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Effect 2: Fetch posts (depends on user)
  useEffect(() => {
    if (!user) return; // Don't run if user not loaded

    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}/posts`);
        const data = await response.json();
        
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [user]); // Re-run when user changes

  // Effect 3: Analytics (optional)
  useEffect(() => {
    if (!user) return;

    // Track user view
    console.log(`Viewing user: ${user.id}`);

    // Cleanup: track when leaving
    return () => {
      console.log(`Left user: ${user.id}`);
    };
  }, [user]);

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>Posts: {posts.length}</p>
        </div>
      )}
    </div>
  );
};

export { AdvancedAsyncWidget };
```

### Step 4: Using AbortController for Better Cleanup

```jsx
const useAsync = (asyncFunction, initialValue = null) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const asyncWrapper = async () => {
      setStatus('pending');
      try {
        const response = await asyncFunction(abortController.signal);
        setData(response);
        setStatus('success');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error);
          setStatus('error');
        }
      }
    };

    asyncWrapper();

    return () => {
      abortController.abort();
    };
  }, [asyncFunction]);

  return { status, data, error };
};

// Usage
const MyComponent = () => {
  const { status, data, error } = useAsync(
    async (signal) => {
      const response = await fetch('/api/data', { signal });
      return response.json();
    }
  );

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;
  if (status === 'success') return <div>Data: {JSON.stringify(data)}</div>;
};
```

### Step 5: Rehydrator

```jsx
const asyncWidgetRehydrator = async (domNode) => {
  const userId = domNode.getAttribute("data-user-id");
  return <AsyncWidget userId={userId} />;
};

export { asyncWidgetRehydrator };
```

### Step 6: Register and Mount

```jsx
import { rehydrate } from "react-from-markup";
import { AsyncWidget, asyncWidgetRehydrator } from "./AsyncWidget";

const rehydrators = {
  AsyncWidget: asyncWidgetRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## Common Mistakes to Avoid

❌ **Missing cleanup**
```jsx
// WRONG: No cleanup, memory leak
useEffect(() => {
  fetch('/api/data').then(setData);
}, []);

// RIGHT: Includes cleanup
useEffect(() => {
  let isMounted = true;
  fetch('/api/data').then(data => {
    if (isMounted) setData(data);
  });
  return () => { isMounted = false; };
}, []);
```

❌ **Race conditions**
```jsx
// WRONG: Old responses might overwrite new ones
useEffect(() => {
  fetch(`/api/user/${userId}`).then(setUser);
}, [userId]);

// RIGHT: Abort previous request
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/user/${userId}`, { signal: controller.signal }).then(setUser);
  return () => controller.abort();
}, [userId]);
```

## Best Practices

- Always cleanup async operations on unmount
- Use AbortController for cancellation
- Track dependencies correctly  
- Handle race conditions
- Don't update state after unmount
- Use TypeScript for better type safety
- Consider using React Query or SWR for complex scenarios
