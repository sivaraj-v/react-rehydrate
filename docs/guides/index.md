# Guides

Learn practical patterns and advanced techniques for using react-rehydrate.

## Quick Code Example

Use this minimal setup to pass shared page context into all rehydrators:

```javascript
import { rehydrate } from "react-from-markup";

const helloUserRehydrator = async (domNode, rehydrateChildren, extra) => {
	return <h2>Hello, {extra.user.name}!</h2>;
};

rehydrate({
	container: document.querySelector('[data-react-from-markup-container]'),
	rehydrators: {
		HelloUser: helloUserRehydrator
	},
	options: {
		extra: {
			user: { name: "Alice" }
		}
	}
});
```

Server-side markup:

```html
<div data-react-from-markup-container>
	<h2 data-rehydratable="HelloUser">Hello, !</h2>
</div>
```

For full production patterns, go to the detailed guide below.

## Core Concepts

### [Passing Page Context with `extra`](./page-context.md)

Learn how to pass page-level data (user info, config, feature flags) to all your rehydrators at once. Includes real-world examples for user authentication, feature flags, and multi-language support.

**Topics covered:**
- What is the `extra` object?
- How to pass context to rehydrators
- User context example
- Feature flags and configuration
- Multiple context values
- TypeScript typing
- Best practices and performance tips

## Common Patterns

- [Nested Component Rehydration](./nested-components.md)
- [Error Handling Across Components](./error-handling.md)
- [Progressive Enhancement](./progressive-enhancement.md)

## Advanced Topics

- [Custom Rehydrator Utilities](./custom-utilities.md)
- [Performance Optimization](./performance.md)
- [Testing Rehydrated Components](./testing.md)
