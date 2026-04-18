import React, { useId, useState } from "react";
import PropTypes from "prop-types";

const validate = values => {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
};

const ContactForm = ({ heading }) => {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const messageErrorId = useId();

  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);
    if (errors[name] !== undefined) {
      const fresh = validate(updated);
      setErrors(prev => ({ ...prev, [name]: fresh[name] }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        className="ContactForm ContactForm--success"
        data-rehydratable="ContactForm"
        data-heading={heading}
      >
        <h2>{heading}</h2>
        <p>Thank you, {fields.name}. Your message has been received.</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFields({ name: "", email: "", message: "" });
            setErrors({});
          }}
        >
          Send another message
        </button>
      </section>
    );
  }

  return (
    <section
      className="ContactForm"
      data-rehydratable="ContactForm"
      data-heading={heading}
    >
      <h2>{heading}</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className="ContactForm-field">
          <label htmlFor={nameId}>Name</label>
          <input
            aria-describedby={errors.name ? nameErrorId : undefined}
            aria-invalid={!!errors.name}
            id={nameId}
            name="name"
            onChange={handleChange}
            type="text"
            value={fields.name}
          />
          {errors.name && (
            <p className="ContactForm-error" id={nameErrorId} role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="ContactForm-field">
          <label htmlFor={emailId}>Email</label>
          <input
            aria-describedby={errors.email ? emailErrorId : undefined}
            aria-invalid={!!errors.email}
            id={emailId}
            name="email"
            onChange={handleChange}
            type="email"
            value={fields.email}
          />
          {errors.email && (
            <p className="ContactForm-error" id={emailErrorId} role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div className="ContactForm-field">
          <label htmlFor={messageId}>Message</label>
          <textarea
            aria-describedby={errors.message ? messageErrorId : undefined}
            aria-invalid={!!errors.message}
            id={messageId}
            name="message"
            onChange={handleChange}
            rows={4}
            value={fields.message}
          />
          {errors.message && (
            <p className="ContactForm-error" id={messageErrorId} role="alert">
              {errors.message}
            </p>
          )}
        </div>
        <button type="submit">Send message</button>
      </form>
    </section>
  );
};

ContactForm.propTypes = {
  heading: PropTypes.string.isRequired
};

export default ContactForm;
