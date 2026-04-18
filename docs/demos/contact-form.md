# Contact Form

Demonstrates form validation and error handling patterns.

## Overview

A practical contact form with client-side validation, error messages, and successful submission feedback. Shows how to structure complex form logic.

## Features

- Email and field validation
- Real-time error feedback
- Loading state during submission
- Success confirmation message
- Clear error recovery

## Complete Code Example

### Step 1: Server Markup

```html
<div data-react-from-markup-container>
  <form data-rehydratable="ContactForm" data-form-title="Get in Touch">
    <h2>Get in Touch</h2>
    <div>
      <label>Name:</label>
      <input type="text" name="name" />
    </div>
    <div>
      <label>Email:</label>
      <input type="email" name="email" />
    </div>
    <div>
      <label>Message:</label>
      <textarea name="message"></textarea>
    </div>
    <button type="submit">Send</button>
  </form>
</div>
```

### Step 2: Form Component with Validation

```jsx
import React, { useState } from "react";

// Basic validation functions
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateForm = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = "Name is required";
  ) else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!data.message?.trim()) {
    errors.message = "Message is required";
  } else if (data.message.length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};

const ContactForm = ({ formTitle = "Contact Us" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>{formTitle}</h2>

      {submitted && (
        <div className="success-message">
          ✓ Thank you! We'll get back to you soon.
        </div>
      )}

      {errors.submit && (
        <div className="error-message">
          ✕ {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" className="error-text">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="error-text">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
            rows="4"
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <span id="message-error" className="error-text">
              {errors.message}
            </span>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export { ContactForm, validateForm };
```

### Step 3: Rehydrator

```jsx
const contactFormRehydrator = async (domNode) => {
  const formTitle = domNode.getAttribute("data-form-title");
  return <ContactForm formTitle={formTitle} />;
};

export { contactFormRehydrator };
```

### Step 4: Styling

```css
.contact-form {
  max-width: 500px;
  margin: 2rem auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:disabled,
.form-group textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.error-text {
  display: block;
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.error-message,
.success-message {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ef5350;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #66bb6a;
}

button[type="submit"] {
  background: #1976d2;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button[type="submit"]:hover:not(:disabled) {
  background: #1565c0;
}

button[type="submit"]:disabled {
  background: #90caf9;
  cursor: not-allowed;
}
```

## Best Practices

- Validate on both client and server
- Show errors near the problematic fields
- Disable submit button during processing
- Provide clear success/error messages
- Reset form state after successful submission
- Use proper HTML5 attributes (type, required, etc.)
- Implement accessible error messages (aria-describedby)
