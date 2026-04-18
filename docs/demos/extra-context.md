# Extra Context (options.extra)

Demonstrates how to pass shared page context through `options.extra` and branch behavior inside rehydrators.

## What This Demo Covers

- Conditional component rendering based on `extra.user.role`
- Feature-flag branch with `extra.features.betaFeatures`
- Analytics behavior controlled by `extra.features.analytics`
- Shared config values via `extra.config`

## Live Variants in Examples App

- `extra-context`:
  - `user.role = "admin"`
  - `features.betaFeatures = true`
  - `features.analytics = true`
- `extra-context-beta`:
  - `user.role = "viewer"`
  - `features.betaFeatures = true`
  - `features.analytics = false`

## Branching Pattern

```javascript
const contextAwareRehydrator = async (domNode, rehydrateChildren, extra) => {
  const user = extra.user || { name: "Guest", role: "viewer" };

  if (user.role === "admin") {
    return <AdminDashboard user={user} />;
  }

  if (extra.features && extra.features.betaFeatures) {
    return <BetaFeature user={user} />;
  }

  return <StandardComponent user={user} />;
};
```

## Analytics Pattern

```javascript
const analyticsTrackerRehydrator = async (domNode, rehydrateChildren, extra) => {
  const user = extra.user || { name: "Guest", role: "viewer" };
  const features = extra.features || { analytics: false };
  const config = extra.config || {
    environment: "development",
    trackingId: "demo-local"
  };

  return (
    <AnalyticsTracker
      enabled={Boolean(features.analytics)}
      config={config}
      user={user}
    />
  );
};
```

## Where `extra` Is Passed

Set in registry:

```javascript
"extra-context": {
  options: {
    extra: {
      user: { name: "John Smith", role: "admin" },
      features: { betaFeatures: true, analytics: true },
      config: { environment: "staging", trackingId: "ga-demo-001" }
    }
  },
  rehydratorNames: ["ContextAware", "ContextLegend", "AnalyticsTracker"]
}
```

Forwarded into `rehydrate(...)` by the examples runner (`examples/main.js`), then received as the third argument in each rehydrator.

## Source Files

- `examples/extra-context/demo.js`
- `examples/extra-context/index.html`
- `examples/extra-context-beta/index.html`
- `examples/demo-registry.js`

## Tips

- Keep `extra` for page-level context (user, config, flags)
- Keep component UI state inside React state/hooks
- Use fallback values when `extra` might be missing
