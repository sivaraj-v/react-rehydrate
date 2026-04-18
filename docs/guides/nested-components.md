# Nested Component Rehydration

Use nested rehydration when one server-rendered region contains child elements that themselves need to be rehydrated. React Rehydrate can preserve markup and hydrate inner regions recursively using `rehydrateChildren`.

## When to use it

- A parent widget contains several child widgets.
- Child markup is rendered server-side, then enhanced individually.
- You want to keep markup structure and only hydrate the interactive nodes.

## Example markup

```html
<div data-react-from-markup-container>
  <section data-rehydratable="Dashboard">
    <div data-rehydratable="UserProfile">Loading profile...</div>
    <div data-rehydratable="Notifications">Loading notifications...</div>
  </section>
</div>
```

## Rehydrators

```javascript
const Dashboard = async (domNode, rehydrateChildren, extra) => {
  return (
    <div className="dashboard">
      <h1>Welcome back, {extra.user.name}</h1>
      {await rehydrateChildren(domNode, extra.rehydrators, extra.options)}
    </div>
  );
};

const UserProfile = async (domNode, rehydrateChildren, extra) => (
  <div className="profile">Profile loaded for {extra.user.name}</div>
);

const Notifications = async (domNode, rehydrateChildren, extra) => (
  <div className="notifications">You have {extra.user.notifications} unread items.</div>
);
```

## Key pattern

Use `rehydrateChildren` inside a parent rehydrator so child nodes are processed by the same rehydrator registry. This keeps the nested DOM structure intact while enabling each named child widget to mount correctly.

## Best practices

- Keep parent rehydrators lightweight.
- Only call `rehydrateChildren` where nested markup should be enhanced.
- Pass shared data through `extra` instead of hardcoding values in nested rehydrators.
