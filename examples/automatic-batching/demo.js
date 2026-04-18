import React, { useRef, useState } from "react";

const AutomaticBatching = ({ heading }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("idle");
  const [updatedAt, setUpdatedAt] = useState("never");

  const runAsyncUpdate = () => {
    setStatus("queued");

    setTimeout(() => {
      // React 18+ batches these async updates into a single render pass.
      setCount(current => current + 1);
      setStatus("completed");
      setUpdatedAt(new Date().toLocaleTimeString());
    }, 500);
  };

  return (
    <section
      className="AutomaticBatching"
      data-rehydratable="AutomaticBatching"
      data-heading={heading}
    >
      <h2>{heading}</h2>
      <p>
        Triggering one async task updates three pieces of state. With automatic
        batching (React 18+), these updates commit together.
      </p>
      <button onClick={runAsyncUpdate}>Run async update</button>
      <p>Count: {count}</p>
      <p>Status: {status}</p>
      <p>Last update: {updatedAt}</p>
      <p>Render count: {renderCount.current}</p>
    </section>
  );
};

const automaticBatchingRehydrator = async domNode => {
  const heading = domNode.getAttribute("data-heading");
  return <AutomaticBatching heading={heading} />;
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="AutomaticBatching"
      data-rehydratable="AutomaticBatching"
      data-heading="Automatic batching in async updates"
    >
      <h2>Automatic batching in async updates</h2>
      <button>Run async update</button>
      <p>Count: 0</p>
      <p>Status: idle</p>
      <p>Last update: never</p>
      <p>Render count: 1</p>
    </section>
  </div>
`;

export { AutomaticBatching, automaticBatchingRehydrator };
