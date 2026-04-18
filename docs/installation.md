# Installation

`react-rehydrate` is designed to be lightweight and easy to integrate into any project, whether you're using a modern bundler or a legacy stack.

## Package Manager

Install the core package and its peer dependencies (if not already present):

```shell
yarn add react react-dom @sivaraj-v/react-rehydrate
```

## TypeScript Support

The library is written in TypeScript and includes native type definitions. You don't need to install any separate `@types` packages for `@sivaraj-v/react-rehydrate`.

## React 19 Considerations

If you are using React 19, ensure your `peerDependencies` are met. the library fully supports React 19 features like `useActionState` and modern hydration patterns.

## Basic Integration

Once installed, initialize the rehydration process at your application's entry point (e.g., `main.js` or `index.js`):

```javascript
import rehydrate from "@sivaraj-v/react-rehydrate";
import { rehydrator as siteHeader } from "./components/SiteHeader";

// Extra state passed to all rehydrators (Enterprise Practice)
const options = {
  extra: {
    locale: document.documentElement.lang,
    user: window.__USER_DATA__
  }
};

rehydrate(
  document.getElementById("app-root"), 
  { SiteHeader: siteHeader },
  options
);
```

### Next Steps

- Define your [Markup Containers](/containers) to mark areas of the page for React to take over.
- Learn about the [Rehydrator Interface](/api/rehydrator) to bridge data from HTML to React.
