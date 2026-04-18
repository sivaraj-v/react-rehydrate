# Installation

Install React, ReactDOM, and the package:

```bash
yarn add react react-dom @sivaraj-v/react-rehydrate
```

Basic usage:

```js
import rehydrate from "@sivaraj-v/react-rehydrate";

rehydrate(document.getElementById("root"), {
  // rehydratableName: rehydratorFunction
});
```

If you are developing inside this monorepo:

```bash
yarn examples:dev
```

Then open the examples landing page and test routes from there.
