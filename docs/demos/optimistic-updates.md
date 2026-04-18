# Optimistic Updates

Demonstrates the `useOptimistic` hook with immediate UI feedback during async mutations.

## Overview

When users interact with your app, perceived performance matters more than actual performance. With optimistic updates, the UI immediately reflects the action while the server processes it. If something fails, roll back gracefully.

## Pattern

```javascript
const [optimisticComments, addOptimisticComment] = useOptimistic(
  comments,
  (state, newComment) => [...state, newComment]
);
```

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <section data-rehydratable="OptimisticComments" data-heading="Comments">
    <h2>Comments</h2>
    <form>
      <input placeholder="Write a comment" />
      <button type="submit">Post</button>
    </form>
    <ul>
      <li>First comment</li>
      <li>Second comment</li>
    </ul>
  </section>
</div>
```

### Step 2: React Component

```jsx
import React, { useOptimistic, useState } from "react";

const waitFor = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const saveComment = async (text) => {
  // Simulate server delay
  await waitFor(900);
  return {
    id: String(Date.now()),
    text,
    status: "saved"
  };
};

const OptimisticComments = ({ heading, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [draft, setDraft] = useState("");
  
  // useOptimistic shows the optimistic value while the async action is pending
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, text) => [
      ...currentComments,
      { 
        id: `optimistic-${Date.now()}`, 
        text, 
        status: "sending" 
      }
    ]
  );

  const submit = async (e) => {
    e.preventDefault();
    const text = draft.trim();
    
    if (!text) return;

    setDraft("");
    // Immediately update UI (optimistic)
    addOptimisticComment(text);

    // Meanwhile, save to server
    const saved = await saveComment(text);
    // Finalize after server confirms
    setComments((prev) => [...prev, saved]);
  };

  return (
    <section className="OptimisticComments">
      <h2>{heading}</h2>
      <form onSubmit={submit}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a comment"
        />
        <button type="submit">Post</button>
      </form>
      <ul>
        {optimisticComments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            {comment.status === "sending" && (
              <em style={{ marginLeft: "0.5rem" }}>(sending...)</em>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export { OptimisticComments };
```

### Step 3: Rehydrator

```jsx
const optimisticCommentsRehydrator = async (domNode) => {
  const heading = domNode.getAttribute("data-heading");
  
  return <OptimisticComments heading={heading} initialComments={[]} />;
};

export { optimisticCommentsRehydrator };
```

### Step 4: Register and Mount

```jsx
import { rehydrate } from "react-from-markup";
import { OptimisticComments, optimisticCommentsRehydrator } from "./OptimisticComments";

const rehydrators = {
  OptimisticComments: optimisticCommentsRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## Use Cases

- Comments/likes in social feeds
- Cart item additions/removals
- Todo item creation and updates
- Real-time collaboration features

## Best Practices

- Always show pending feedback visually
- Implement graceful error recovery
- Validate optimistically added data before commit
- Consider undo functionality for destructive operations
