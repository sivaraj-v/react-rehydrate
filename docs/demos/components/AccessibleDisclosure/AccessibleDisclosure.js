import React, { useId, useState } from "react";
import PropTypes from "prop-types";

const AccessibleDisclosure = ({ answer, question }) => {
  const buttonId = useId();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  return (
    <section
      className="AccessibleDisclosure"
      data-rehydratable="AccessibleDisclosure"
      data-question={question}
      data-answer={answer}
    >
      <h2>{question}</h2>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        id={buttonId}
        onClick={() => setOpen(isOpen => !isOpen)}
      >
        {open ? "Hide details" : "Show details"}
      </button>
      <div aria-labelledby={buttonId} hidden={!open} id={panelId} role="region">
        <p>{answer}</p>
      </div>
    </section>
  );
};

AccessibleDisclosure.propTypes = {
  answer: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired
};

export default AccessibleDisclosure;
