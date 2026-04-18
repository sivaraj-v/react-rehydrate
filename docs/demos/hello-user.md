# Hello User

A simple greeting pattern demonstrating basic React rehydration.

## Overview

The simplest example: render server-side HTML markup and enhance it with React interactivity. Shows the core value of react-rehydrate.

## Features

- Server-rendered markup
- Client-side rehydration
- User interaction
- State management

## Code Example

### Step 1: Server-rendered HTML

Your backend generates this markup:

```html
<div data-react-from-markup-container>
  <h2 data-rehydratable="HelloUser">Hello, Alex!</h2>
</div>
```

### Step 2: React Component

Create the component that adds interactivity:

```jsx
import React, { useState } from "react";

const HelloUser = ({ userName: initialName }) => {
  const [userName, setUserName] = useState(initialName);

  return (
    <div>
      <h2>Hello, {userName}!</h2>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  );
};

export { HelloUser };
```

### Step 3: Create the Rehydrator

The rehydrator reads server attributes and returns the component:

```jsx
const helloUserRehydrator = async (domNode, rehydrateChildren, options) => {
  // Extract data from server-rendered attributes if needed
  return <HelloUser userName="User" />;
};

export { helloUserRehydrator };
```

### Step 4: Wire it up

In your browser entry point:

```jsx
import { rehydrate } from "react-from-markup";
import { HelloUser, helloUserRehydrator } from "./HelloUser";

const rehydrators = {
  HelloUser: helloUserRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## Use When

- Converting static HTML to interactive
- Enhancing server-rendered pages
- Progressive enhancement
- Multi-step server-side rendering

## Best Practices

- Keep initial HTML semantic
- Include fallback content
- Minimize hydration mismatch
- Use stable markup IDs

## Real Example: Using Page Context

In practice, user data comes from the server. You can pass it via the `extra` option:

```javascript
// Get user from server (embedded in HTML or window variable)
const user = window.__USER_DATA__ || { name: "Guest" };

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators: { HelloUser: helloUserRehydrator },
  options: {
    extra: { user } // Pass user to all rehydrators
  }
});
```

Then the rehydrator receives it:

```javascript
const helloUserRehydrator = async (domNode, rehydrateChildren, extra) => {
  return <HelloUser userName={extra.user.name} />;
};
```

For more detailed patterns, see [Passing Page Context with `extra`](/guides/page-context.md).
