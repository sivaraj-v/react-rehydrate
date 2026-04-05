# react-rehydrate

> Declare your React components with static HTML

[![npm version](https://badge.fury.io/js/%40sivaraj-v%2Freact-rehydrate.svg)](https://badge.fury.io/js/%40sivaraj-v%2Freact-rehydrate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React is a powerful JavaScript library for building user interfaces, but integrating it into non-JavaScript environments can be challenging. Whether you're working with legacy systems, content management systems (CMS), or templating engines that don't natively support JavaScript, `react-rehydrate` bridges the gap.

It allows you to declare React components directly in your static HTML using simple data attributes, enabling progressive enhancement without rewriting your entire frontend architecture.

`react-rehydrate` is intended to make it possible to use React components on these legacy systems, _without changing the way you write your React components_. It provides tools to simplify the mapping from `data-` attributes into React props, and _can even handle React children_.

![React Rehydrate Infographics](./infographics.png)

## Installation

```bash
npm install @sivaraj-v/react-rehydrate @sivaraj-v/dom-element-to-react
```

or

```bash
yarn add @sivaraj-v/react-rehydrate @sivaraj-v/dom-element-to-react
```

## Quick Start

1. **Define your React component:**

```tsx
import React from 'react';

const HelloUser = ({ userName }) => (
  <h2>Hello, {userName}!</h2>
);

export default HelloUser;
```

2. **Create a rehydrator function:**

```tsx
const helloUserRehydrator = async (domNode, rehydrateChildren, extra) => {
  const userName = extra.userName; // Passed via options
  return <HelloUser userName={userName} />;
};
```

3. **Add markup to your HTML:**

```html
<div data-react-from-markup-container>
  <h2 data-rehydratable="HelloUser">Hello, !</h2>
</div>
```

4. **Rehydrate on page load:**

```tsx
import rehydrate from '@sivaraj-v/react-rehydrate';

const rehydrators = {
  HelloUser: helloUserRehydrator,
};

rehydrate(document.body, rehydrators, {
  extra: { userName: 'World' },
});
```

## API Reference

### `rehydrate(container, rehydrators, options)`

Rehydrates all elements with `data-react-from-markup-container` within the given container.

- `container`: The DOM element to search for containers in.
- `rehydrators`: An object mapping rehydrator names to functions.
- `options`: Configuration object with `extra` property for passing data to rehydrators.

### Rehydrator Function

A rehydrator function has the signature:

```tsx
async (domNode, rehydrateChildren, extra) => ReactElement
```

- `domNode`: The DOM element being rehydrated.
- `rehydrateChildren`: Function to rehydrate child elements.
- `extra`: Extra data passed from options.

### `rehydrateChildren(node, rehydrators, options)`

Rehydrates the children of a DOM node.

## Examples

See the [examples](./examples) directory for complete working examples:

- [Static](./examples/static) - Basic static rehydration
- [Hello User](./examples/hello-user) - Passing props via options
- [Show More](./examples/show-more) - Interactive component with children
- [Show More Text](./examples/show-more-text) - Reading data from attributes
- [Asynchronous](./examples/asynchronous) - Async rehydration

To run examples:

```bash
cd examples
yarn install
yarn dev
```

## Building

```bash
yarn install
yarn compile
```

## Testing

```bash
yarn test
```

## License

MIT

## Credits

Respecting the original work, `react-rehydrate` is a maintained fork of `react-from-markup` by Simon Andrews, updated for modern React versions.

> Note: The original `simon360/react-from-markup` repository is archived and no longer maintained. The author chose not to transfer maintenance, citing supply chain security concerns (see [PR #50](https://github.com/simon360/react-from-markup/pull/50) and [Microsoft's analysis of npm supply chain attacks](https://www.microsoft.com/en-us/security/blog/2026/04/01/mitigating-the-axios-npm-supply-chain-compromise/?msockid=3ebef91ccd7166bf3c9fef72ccf36720)), and I respect that prudent decision. Out of respect for the original author, I retain the `data-react-from-markup-container` attribute name without modification.