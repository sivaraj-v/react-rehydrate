import React, { Component, useState } from "react";
import PropTypes from "prop-types";

class WidgetErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
    initialCount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  };

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
    const { children, initialCount, title } = this.props;

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

const ErrorBoundaryWidget = ({ initialCount, title }) => {
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

ErrorBoundaryWidget.propTypes = {
  initialCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export { WidgetErrorBoundary };
export default ErrorBoundaryWidget;