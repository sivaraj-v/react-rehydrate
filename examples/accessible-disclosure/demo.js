import React, { useId, useState } from "react";

const AccessibleDisclosure = ({ question, answer }) => {
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

const accessibleDisclosureRehydrator = async domNode => {
  const question = domNode.getAttribute("data-question");
  const answer = domNode.getAttribute("data-answer");

  return <AccessibleDisclosure answer={answer} question={question} />;
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="AccessibleDisclosure"
      data-rehydratable="AccessibleDisclosure"
      data-question="How is this connected for assistive technology?"
      data-answer="This disclosure uses React useId so the button and region stay correctly associated after rehydration."
    >
      <h2>How is this connected for assistive technology?</h2>
      <button aria-expanded="false">Show details</button>
      <div hidden>
        <p>This disclosure uses React useId so the button and region stay correctly associated after rehydration.</p>
      </div>
    </section>
  </div>
`;

export { AccessibleDisclosure, accessibleDisclosureRehydrator };