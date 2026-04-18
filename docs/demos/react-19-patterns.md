# React 19 Patterns

This guide groups the most practical modern patterns for markup-first applications.

## Recommended order

1. `useOptimistic`: [Optimistic Updates demo](/demos/)
Immediate feedback while async mutation is pending.

2. `useActionState`: [Action State Form demo](/demos/)
Form actions with pending, error, and success in one flow.

3. `useDeferredValue`: [Deferred Search demo](/demos/)
Keep input responsive while heavier rendering catches up.

4. Automatic batching (React 18+): [Automatic Batching demo](/demos/)
Multiple async state updates committed in one render pass.

## Related patterns

- Suspense plus lazy loading
- Error boundaries for widget isolation
- Shared state across separate roots with `useSyncExternalStore`
- Stable a11y IDs with `useId`

## Practical use in CMS pages

- Prefer small independent containers.
- Keep failure boundaries local.
- Use async-aware patterns for mutations and search.
- Use shared external stores only when cross-widget sync is required.
