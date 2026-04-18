# Demos

All interactive examples are available in the [Examples App on GitHub](https://github.com/sivaraj-v/react-rehydrate/tree/main/examples).

## Getting Started

1. **Beginners**: Start with [Hello User](./hello-user.md) and [Data Fetch](./data-fetch.md)
2. **React Essentials**: Then explore [Isolated Counter](./isolated-counter.md) and [Contact Form](./contact-form.md)  
3. **Advanced Patterns**: Progress to [Async](./asynchronous.md), [Error Boundary](./error-boundary.md), and [Shared Store](./shared-store.md)
4. **React 19+**: Dive into the [React 19 Patterns](./react-19-patterns.md) guide for modern features

## Running Locally

```bash
yarn examples:dev
```

Then visit `http://localhost:5173` to see all interactive demos running locally.

## All Demos

### React 19 Patterns
- [Optimistic Updates](./optimistic-updates.md) - Immediate feedback during async operations
- [Action State Form](./action-state-form.md) - Form submission with pending/error/success states
- [Deferred Search](./deferred-search.md) - Keep input responsive during heavy rendering
- [Automatic Batching](./automatic-batching.md) - Multiple state updates in one render

### Data & State
- [Data Fetch](./data-fetch.md) - Loading, error, and retry patterns
- [Contact Form](./contact-form.md) - Form validation and error handling
- [Concurrent Search](./concurrent-search.md) - Real-time search with concurrent rendering
- [Extra Context](./extra-context.md) - Pass user/config/flags through `options.extra`
- [Shared Store](./shared-store.md) - Cross-root state sharing with `useSyncExternalStore`
- [Undo Counter](./undo-counter.md) - State history with undo/redo

### UI Patterns
- [Accessible Disclosure](./accessible-disclosure.md) - Expandable sections with ARIA
- [Show More](./show-more.md) - Progressive content expansion
- [Show More Text](./show-more-text.md) - Text truncation and expansion
- [Search Filter](./search-filter.md) - Real-time list filtering

### Async & Loading
- [Asynchronous](./asynchronous.md) - Async initialization and cleanup
- [Error Boundary](./error-boundary.md) - Component isolation and error recovery
- [Suspense Lazy](./suspense-lazy.md) - Code splitting and lazy loading
- [Hello User](./hello-user.md) - Basic rehydration from server markup
- [Isolated Counter](./isolated-counter.md) - Multiple independent instances

---

Browse each demo to see the implementation pattern, best practices, and links to the live interactive examples.
