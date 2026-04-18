import React, { useState } from "react";
import PropTypes from "prop-types";

const IsolatedCounter = ({ initialCount, title }) => {
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

IsolatedCounter.propTypes = {
  initialCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default IsolatedCounter;