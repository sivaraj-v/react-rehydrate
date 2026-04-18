import React, { useReducer } from "react";
import PropTypes from "prop-types";

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
        history: [...state.history, state.count]
      };
    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, state.count]
      };
    case "undo": {
      if (state.history.length === 0) return state;
      const previous = state.history[state.history.length - 1];
      return { count: previous, history: state.history.slice(0, -1) };
    }
    case "reset":
      return { count: action.payload, history: [] };
    default:
      return state;
  }
}

const UndoCounter = ({ initialCount, title }) => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: initialCount,
    history: []
  });

  return (
    <section
      className="UndoCounter"
      data-rehydratable="UndoCounter"
      data-title={title}
      data-count={initialCount}
    >
      <h2>{title}</h2>
      <p className="UndoCounter-value">{state.count}</p>
      <div className="UndoCounter-controls">
        <button onClick={() => dispatch({ type: "decrement" })}>
          &#x2212;
        </button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button
          disabled={state.history.length === 0}
          onClick={() => dispatch({ type: "undo" })}
        >
          Undo
        </button>
        <button
          onClick={() => dispatch({ type: "reset", payload: initialCount })}
        >
          Reset
        </button>
      </div>
      {state.history.length > 0 && (
        <p className="UndoCounter-history">
          History: {[...state.history, state.count].join(" \u2192 ")}
        </p>
      )}
    </section>
  );
};

UndoCounter.propTypes = {
  initialCount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default UndoCounter;
