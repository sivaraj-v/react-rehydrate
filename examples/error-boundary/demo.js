import React, { Component, useState } from "react";

class WidgetErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;
    const { title, initialCount, children } = this.props;

    if (hasError) {
      return (
        <section
          className="ErrorBoundaryWidget ErrorBoundaryWidget--fallback"
          data-rehydratable="ErrorBoundaryWidget"
          data-title={title}
          data-count={initialCount}
        >
          <h2>{title}</h2>
          <p>This widget failed during rendering, but the rest of the page stayed interactive.</p>
          <button onClick={this.reset}>Reset widget</button>
        </section>
      );
    }

    return children;
  }
}

const ErrorBoundaryWidget = ({ title, initialCount }) => {
  const [count, setCount] = useState(initialCount);
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Simulated widget failure");
  }

  return (
    <section
      className="ErrorBoundaryWidget"
      data-rehydratable="ErrorBoundaryWidget"
      data-title={title}
      data-count={initialCount}
    >
      <h2>{title}</h2>
      <p>Queued items: {count}</p>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        Add item
      </button>
      <button onClick={() => setShouldCrash(true)}>Simulate rendering failure</button>
    </section>
  );
};

const errorBoundaryWidgetRehydrator = async domNode => {
  const title = domNode.getAttribute("data-title");
  const initialCount = parseInt(domNode.getAttribute("data-count"), 10);

  return (
    <WidgetErrorBoundary title={title} initialCount={initialCount}>
      <ErrorBoundaryWidget title={title} initialCount={initialCount} />
    </WidgetErrorBoundary>
  );
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="ErrorBoundaryWidget"
      data-rehydratable="ErrorBoundaryWidget"
      data-title="Background jobs"
      data-count="3"
    >
      <h2>Background jobs</h2>
      <p>Queued items: 3</p>
      <button>Add item</button>
      <button>Simulate rendering failure</button>
    </section>
  </div>
`;

export { ErrorBoundaryWidget, errorBoundaryWidgetRehydrator, WidgetErrorBoundary };