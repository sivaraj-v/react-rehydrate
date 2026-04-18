# React Rehydrate

Declare your React components with static HTML.

`react-rehydrate` is a maintained continuation of the original `react-from-markup` approach, updated for current React versions.

## Why this library

- Many CMS and legacy stacks emit HTML more easily than JavaScript bootstrapping code.
- You can keep writing modern React components while still integrating with static templates.
- Markup is progressively upgraded into interactive React trees at runtime.

## How it works

The library scans for markup containers and converts their content into React elements. Rehydrators let you map `data-` attributes and nested markup to component props and children.

## Start here

1. [Installation](/installation)
2. [Markup Containers](/containers)
3. [rehydrate API](/api/rehydrate)
4. [React 19 Patterns demos](/demos/react-19-patterns)
