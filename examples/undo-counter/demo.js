import React, { useReducer } from "react";

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1, history: [...state.history, state.count] };
    case "decrement":
      return { count: state.count - 1, history: [...state.history, state.count] };
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

const UndoCounter = ({ title, initialCount }) => {
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
        <button onClick={() => dispatch({ type: "decrement" })}>&#x2212;</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button
          disabled={state.history.length === 0}
          onClick={() => dispatch({ type: "undo" })}
        >
          Undo
        </button>
        <button onClick={() => dispatch({ type: "reset", payload: initialCount })}>
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

const undoCounterRehydrator = async domNode => {
  const title = domNode.getAttribute("data-title");
  const initialCount = parseInt(domNode.getAttribute("data-count"), 10);

  return <UndoCounter initialCount={initialCount} title={title} />;
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="UndoCounter"
      data-rehydratable="UndoCounter"
      data-title="Step counter"
      data-count="0"
    >
      <h2>Step counter</h2>
      <p class="UndoCounter-value">0</p>
      <div class="UndoCounter-controls">
        <button>&#x2212;</button>
        <button>+</button>
        <button disabled>Undo</button>
        <button>Reset</button>
      </div>
    </section>
  </div>
`;

export { UndoCounter, undoCounterRehydrator };
