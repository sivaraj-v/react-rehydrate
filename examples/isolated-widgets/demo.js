import React, { useState } from "react";

const IsolatedCounter = ({ title, initialCount }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <section
      className="IsolatedCounter"
      data-rehydratable="IsolatedCounter"
      data-title={title}
      data-count={initialCount}
    >
      <h2>{title}</h2>
      <p>Local count: {count}</p>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </section>
  );
};

const isolatedCounterRehydrator = async domNode => {
  const title = domNode.getAttribute("data-title");
  const initialCount = parseInt(domNode.getAttribute("data-count"), 10);

  return <IsolatedCounter initialCount={initialCount} title={title} />;
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="IsolatedCounter"
      data-rehydratable="IsolatedCounter"
      data-title="Email queue"
      data-count="2"
    >
      <h2>Email queue</h2>
      <p>Local count: 2</p>
      <button>Increment</button>
      <button>Reset</button>
    </section>
  </div>
  <div data-react-from-markup-container>
    <section
      class="IsolatedCounter"
      data-rehydratable="IsolatedCounter"
      data-title="Orders awaiting review"
      data-count="7"
    >
      <h2>Orders awaiting review</h2>
      <p>Local count: 7</p>
      <button>Increment</button>
      <button>Reset</button>
    </section>
  </div>
  <div data-react-from-markup-container>
    <section
      class="IsolatedCounter"
      data-rehydratable="IsolatedCounter"
      data-title="Support escalations"
      data-count="1"
    >
      <h2>Support escalations</h2>
      <p>Local count: 1</p>
      <button>Increment</button>
      <button>Reset</button>
    </section>
  </div>
`;

export { IsolatedCounter, isolatedCounterRehydrator };