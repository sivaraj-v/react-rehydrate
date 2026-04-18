# Passing Page Context with `extra`

The `extra` object is a powerful feature that allows you to pass page-level data (like user info, feature flags, API endpoints, or themes) to all your rehydrators without hardcoding them into components.

## Overview

```javascript
rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators: { ... },
  options: {
    extra: { /* shared page data */ }
  }
});
```

All rehydrators receive this data as their third parameter:

```javascript
const myRehydrator = async (domNode, rehydrateChildren, extra) => {
  // extra is available here
  return <MyComponent data={extra} />;
};
```

## Complete Example 1: User Context

### Server Setup

Your backend generates this markup with server data:

```html
<!DOCTYPE html>
<html>
<body>
  <div data-react-from-markup-container>
    <!-- User greeting -->
    <header data-rehydratable="UserGreeting">
      <span>Welcome!</span>
    </header>

    <!-- User profile widget -->
    <div data-rehydratable="UserProfile">
      <p>Loading profile...</p>
    </div>

    <!-- Notification badge -->
    <div data-rehydratable="NotificationBadge">
      Notifications
    </div>
  </div>

  <script>
    // Server passes user context to client
    window.__USER_CONTEXT__ = {
      id: "user-123",
      name: "Alice Johnson",
      email: "alice@example.com",
      notifications: 5,
      premium: true
    };
  </script>
</body>
</html>
```

### React Components

```javascript
// Components that use the user context
const UserGreeting = ({ user }) => (
  <header>
    <h1>Welcome, {user.name}!</h1>
    {user.premium && <span className="badge">Premium Member</span>}
  </header>
);

const UserProfile = ({ user }) => (
  <div className="profile">
    <h2>{user.name}</h2>
    <p>Email: {user.email}</p>
    <p>ID: {user.id}</p>
  </div>
);

const NotificationBadge = ({ user }) => (
  <div className="badge-container">
    <span className="count">{user.notifications}</span>
    Notifications
  </div>
);

export { UserGreeting, UserProfile, NotificationBadge };
```

### Rehydrators (All Receive `extra`)

```javascript
// Each rehydrator receives the user from extra
const userGreetingRehydrator = async (domNode, rehydrateChildren, extra) => {
  return <UserGreeting user={extra.user} />;
};

const userProfileRehydrator = async (domNode, rehydrateChildren, extra) => {
  return <UserProfile user={extra.user} />;
};

const notificationBadgeRehydrator = async (domNode, rehydrateChildren, extra) => {
  return <NotificationBadge user={extra.user} />;
};

export {
  userGreetingRehydrator,
  userProfileRehydrator,
  notificationBadgeRehydrator
};
```

### Entry Point - Passing Context

```javascript
import { rehydrate } from "react-from-markup";
import {
  userGreetingRehydrator,
  userProfileRehydrator,
  notificationBadgeRehydrator
} from "./rehydrators";

// Get user data from server (embedded in HTML or from API)
const user = window.__USER_CONTEXT__ || {
  id: null,
  name: "Guest",
  email: null,
  notifications: 0,
  premium: false
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators: {
    UserGreeting: userGreetingRehydrator,
    UserProfile: userProfileRehydrator,
    NotificationBadge: notificationBadgeRehydrator
  },
  options: {
    // Pass user context to ALL rehydrators
    extra: { user }
  }
});
```

## Complete Example 2: Feature Flags & Configuration

### Server Setup

```html
<script>
  window.__APP_CONFIG__ = {
    environment: "production",
    apiUrl: "https://api.example.com",
    features: {
      darkMode: true,
      analytics: true,
      betaFeatures: false
    },
    locale: "en-US",
    cdn: "https://cdn.example.com"
  };
</script>
```

### Components Using Configuration

```javascript
const AnalyticsTracker = ({ config }) => {
  useEffect(() => {
    if (config.features.analytics) {
      // Initialize analytics
      console.log("Analytics enabled for:", config.environment);
    }
  }, [config]);

  return null; // Non-visual component
};

const DarkModeToggle = ({ config }) => {
  const isDarkModeAvailable = config.features.darkMode;

  if (!isDarkModeAvailable) {
    return null; // Feature not available
  }

  return (
    <button className="theme-toggle">
      Toggle Dark Mode
    </button>
  );
};

const ImageGallery = ({ config }) => {
  return (
    <div className="gallery">
      <img src={`${config.cdn}/images/photo-1.jpg`} alt="Photo 1" />
      <img src={`${config.cdn}/images/photo-2.jpg`} alt="Photo 2" />
    </div>
  );
};

export { AnalyticsTracker, DarkModeToggle, ImageGallery };
```

### Rehydrators with Configuration

```javascript
const analyticsTrackerRehydrator = async (
  domNode,
  rehydrateChildren,
  extra
) => {
  return <AnalyticsTracker config={extra.config} />;
};

const darkModeToggleRehydrator = async (
  domNode,
  rehydrateChildren,
  extra
) => {
  return <DarkModeToggle config={extra.config} />;
};

const imageGalleryRehydrator = async (
  domNode,
  rehydrateChildren,
  extra
) => {
  return <ImageGallery config={extra.config} />;
};

export {
  analyticsTrackerRehydrator,
  darkModeToggleRehydrator,
  imageGalleryRehydrator
};
```

### Entry Point with Configuration

```javascript
import { rehydrate } from "react-from-markup";
import {
  analyticsTrackerRehydrator,
  darkModeToggleRehydrator,
  imageGalleryRehydrator
} from "./rehydrators";

const config = window.__APP_CONFIG__;

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators: {
    AnalyticsTracker: analyticsTrackerRehydrator,
    DarkModeToggle: darkModeToggleRehydrator,
    ImageGallery: imageGalleryRehydrator
  },
  options: {
    // Pass configuration to all rehydrators
    extra: { config }
  }
});
```

## Complete Example 3: Multiple Context Values

### Passing Multiple Values

```javascript
rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators: { ... },
  options: {
    extra: {
      user: {
        id: "user-123",
        name: "Alice",
        role: "admin"
      },
      config: {
        apiUrl: "https://api.example.com",
        theme: "light"
      },
      translations: {
        en: { greeting: "Hello" },
        es: { greeting: "Hola" }
      },
      permissions: ["read", "write", "delete"]
    }
  }
});
```

### Using All Context Values

```javascript
const Dashboard = ({ user, config, translations, permissions }) => {
  const locale = config.locale || "en";
  const t = translations[locale];

  return (
    <div theme={config.theme}>
      <h1>{t.greeting}, {user.name}</h1>

      {user.role === "admin" && (
        <AdminPanel permissions={permissions} />
      )}

      <Settings apiUrl={config.apiUrl} />
    </div>
  );
};

const dashboardRehydrator = async (domNode, rehydrateChildren, extra) => {
  return (
    <Dashboard
      user={extra.user}
      config={extra.config}
      translations={extra.translations}
      permissions={extra.permissions}
    />
  );
};
```

## Real-World Patterns

### 1. Destructure in Rehydrator

```javascript
const myRehydrator = async (domNode, rehydrateChildren, extra) => {
  const { user, config } = extra;
  return <MyComponent user={user} config={config} />;
};
```

### 2. Pass Entire Extra Object

```javascript
const myRehydrator = async (domNode, rehydrateChildren, extra) => {
  return <MyComponent context={extra} />;
};
```

### 3. Combine with DOM Attributes

```javascript
// Rehydrator receives both DOM data and page context
const myRehydrator = async (domNode, rehydrateChildren, extra) => {
  const itemId = domNode.getAttribute("data-item-id");
  const { user, config } = extra;

  return (
    <ProductCard
      itemId={itemId}
      user={user}
      apiUrl={config.apiUrl}
    />
  );
};
```

### 4. Conditional Rendering Based on Context

```javascript
const myRehydrator = async (domNode, rehydrateChildren, extra) => {
  // Show different components based on context
  if (extra.user.role === "admin") {
    return <AdminDashboard user={extra.user} />;
  }

  if (extra.features?.betaFeatures) {
    return <BetaFeature user={extra.user} />;
  }

  return <StandardComponent user={extra.user} />;
};
```

## Best Practices

### ✅ Do's

- Keep `extra` focused on **page-level, read-only data**
- Pass user info, config, feature flags, permissions
- Destructure what you need: `const { user, config } = extra`
- Use TypeScript to type your `extra` object
- Provide sensible defaults if values might be missing

### ❌ Don'ts

- Don't use `extra` for component-specific state (use component state instead)
- Don't mutate properties in `extra` (it's global, affects all components)
- Don't pass too much data (keep page context lean)
- Don't access `extra` from child components if possible (prop drill instead)

## TypeScript Support

```typescript
interface PageContext {
  user: {
    id: string;
    name: string;
    role: "admin" | "user";
  };
  config: {
    apiUrl: string;
    theme: "light" | "dark";
  };
  features: {
    darkMode: boolean;
    analytics: boolean;
  };
}

const myRehydrator = async (
  domNode: HTMLElement,
  rehydrateChildren: Function,
  extra: PageContext
): Promise<React.ReactElement> => {
  return <MyComponent user={extra.user} />;
};
```

## Common Use Cases

| Use Case | Data to Pass |
|----------|-------------|
| Authentication | User ID, name, role, permissions |
| Theming | Theme name, colors, locale |
| Configuration | API endpoints, environment, feature flags |
| Analytics | Tracking ID, event namespace, session ID |
| Permissions | Available actions, feature access |
| Localization | Current locale, translation catalog |
| Context | Current page, tenant ID, workspace ID |

## Runnable Example In This Repository

You can run the concrete implementation from this repo's examples app:

- `extra-context` (admin + analytics enabled)
- `extra-context-beta` (viewer + beta enabled + analytics disabled)

Relevant files:

- `examples/extra-context/demo.js`
- `examples/extra-context/index.html`
- `examples/extra-context-beta/index.html`
- `examples/demo-registry.js`

## Performance Considerations

- `extra` is passed to **every rehydrator**
- Keep it small and focused (avoid large data structures)
- For large datasets, consider lazy-loading from API instead
- Rehydrators can still make independent API calls if needed

```javascript
// ✅ Good: Small context
extra: {
  user: { id: "123", name: "Alice" },
  features: { darkMode: true }
}

// ❌ Avoid: Large context with entire DOM
extra: {
  allUsers: [...1000 users...],
  allPosts: [...10000 posts...]
}
```
