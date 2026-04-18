# Examples

This folder is a small Vite multi-page app for the documented demos.

Commands:

- `yarn examples:dev` from the repository root.
- `yarn examples:build` from the repository root.
- `yarn examples:preview` from the repository root.

Structure:

- `main.js`: shared browser entry that reads the current example page and runs `react-rehydrate`.
- `demo-registry.js`: combined rehydrator registry assembled from the demo source modules.

Run In Development:

- Open the Vite URL it prints, usually `http://localhost:5173/`.
- Demo routes:
- `/`
- `/optimistic-updates/`
- `/action-state-form/`
- `/deferred-search/`
- `/automatic-batching/`
- `/suspense-lazy/`
- `/error-boundary/`
- `/accessible-disclosure/`
- `/isolated-widgets/`
- `/data-fetch/`
- `/validated-form/`
- `/concurrent-search/`
- `/undo-counter/`
- `/shared-store/`
- `/static/`
- `/hello-user/`
- `/show-more-text/`
- `/show-more/`
- `/asynchronous/`

Build And Preview:

- `index.html`: landing page that links to each demo.
- `<demo>/index.html`: server-rendered markup for a specific demo.

Static Hosting:

- After `yarn examples:build`, serve `examples/dist`, not the source `examples` folder.
- `http-server` is valid only for `examples/dist`.
- Example:
- `cd examples/dist && http-server ./`

Important:

- Do not serve the source `examples` folder directly with `http-server`.
- The source pages depend on Vite module processing for JSX, TypeScript entry imports, and bundle rewriting.
- The built `dist` pages are the ones that point to the emitted `dist/assets/*.js` bundles.
- `<demo>/demo.js`: React components and rehydrators used by the bundle.

Included examples:

- `optimistic-updates`: optimistic posting flow powered by `useOptimistic`.
- `action-state-form`: form submit state managed by `useActionState`.
- `deferred-search`: expensive list rendering controlled with `useDeferredValue`.
- `automatic-batching`: async state updates committed together via automatic batching.
- `suspense-lazy`: a lazily loaded client panel rendered behind `React.Suspense`.
- `error-boundary`: a rehydrated widget wrapped in an error boundary fallback.
- `accessible-disclosure`: an accessible disclosure pattern powered by `useId`.
- `isolated-widgets`: multiple independent containers with isolated React state.
- `data-fetch`: server markup that upgrades to live data after rehydration.
- `validated-form`: a validated form with accessible error messaging.
- `concurrent-search`: a search UI that marks updates as non-urgent with `startTransition`.
- `undo-counter`: reducer-driven state transitions with undo history.
- `shared-store`: separate roots synchronized via `useSyncExternalStore`.
- `static`: plain static markup inside a rehydration container.
- `hello-user`: markup for a component that receives its final value from `options.extra`.
- `show-more-text`: a simple string prop stored in a `data-` attribute.
- `show-more`: nested markup rehydrated through `rehydrateChildren`.
- `asynchronous`: multiple independent containers that resolve at different times.
