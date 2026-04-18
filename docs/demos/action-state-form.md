# Action State Form

Demonstrates React 19's `useActionState` hook for form submission workflows.

## Overview

`useActionState` handles form submission with built-in support for pending state, errors, and success responses. It replaces the need for manual loading states and error handling.

## Pattern

```javascript
const [state, formAction, isPending] = useActionState(
  async (previousState, formData) => {
    // Validate and submit
    const result = await submitForm(formData);
    return result;
  },
  initialState
);
```

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <form data-rehydratable="ActionStateForm" data-heading="Sign up">
    <div>
      <label>Email:</label>
      <input type="email" name="email" required />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password" required />
    </div>
    <button type="submit">Submit</button>
  </form>
</div>
```

### Step 2: React Component

```jsx
import React, { useActionState } from "react";

// Server action that validates and submits
async function submitForm(formData) {
  // Simulate server processing (1 second)
  await new Promise(resolve => setTimeout(resolve, 1000));

  const email = formData.get("email");
  const password = formData.get("password");

  // Validate
  const errors = {};
  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  if (email && !email.includes("@")) errors.email = "Invalid email";
  if (password && password.length < 8) errors.password = "Min 8 characters";

  if (Object.keys(errors).length > 0) {
    return { 
      success: false, 
      errors,
      message: "Please fix the errors below"
    };
  }

  // Success
  return {
    success: true,
    message: "Account created successfully!",
    data: { email }
  };
}

const ActionStateForm = ({ heading }) => {
  const [state, formAction, isPending] = useActionState(
    submitForm,
    { success: false, errors: {}, message: "" }
  );

  return (
    <form action={formAction} className="action-form">
      <h2>{heading}</h2>

      {state.message && (
        <div className={state.success ? "success" : "error"}>
          {state.message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isPending}
        />
        {state.errors?.email && (
          <span className="error-text">{state.errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          disabled={isPending}
        />
        {state.errors?.password && (
          <span className="error-text">{state.errors.password}</span>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export { ActionStateForm, submitForm };
```

### Step 3: Rehydrator

```jsx
const actionStateFormRehydrator = async (domNode) => {
  const heading = domNode.getAttribute("data-heading");
  return <ActionStateForm heading={heading} />;
};

export { actionStateFormRehydrator };
```

### Step 4: Register and Mount

```jsx
import { rehydrate } from "react-from-markup";
import { ActionStateForm, actionStateFormRehydrator } from "./ActionStateForm";

const rehydrators = {
  ActionStateForm: actionStateFormRehydrator
};

rehydrate({
  container: document.querySelector('[data-react-from-markup-container]'),
  rehydrators
});
```

## Use Cases

- User registration and login forms
- Profile update forms
- Settings configuration
- Any form with server-side validation

## Benefits Over Manual State

- Simpler code: no separate pending state needed
- Automatic error capture
- Built-in form reset capability
- Progressive enhancement support
- Server-side logic stays server-side

## Best Practices

- Validate on both client and server
- Clear error messaging for each field
- Show loading indicator during submission
- Handle network timeouts gracefully
- Disable form while submitting to prevent double-submit
- Return helpful error messages for better UX
