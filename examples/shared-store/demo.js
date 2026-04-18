import React, { useSyncExternalStore } from "react";

function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: updater => {
      state = typeof updater === "function" ? updater(state) : updater;
      listeners.forEach(l => l());
    },
    subscribe: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

// Module-level singleton: shared across all React roots in the same bundle.
const themeStore = createStore({ theme: "light" });

const useTheme = () =>
  useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getState,
    () => ({ theme: "light" }) // server snapshot for SSR/static contexts
  );

const ThemeSelector = ({ heading }) => {
  const { theme } = useTheme();

  return (
    <section
      className="ThemeSelector"
      data-rehydratable="ThemeSelector"
      data-heading={heading}
    >
      <h2>{heading}</h2>
      <p>
        This widget writes to a shared module-level store. The widget below
        reads from it even though they live in separate React roots.
      </p>
      <label htmlFor="theme-select">Choose theme:</label>{" "}
      <select
        id="theme-select"
        onChange={e => themeStore.setState({ theme: e.target.value })}
        value={theme}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="high-contrast">High contrast</option>
      </select>
      <p>
        Store value: <strong>{theme}</strong>
      </p>
    </section>
  );
};

const ThemedWidget = ({ heading }) => {
  const { theme } = useTheme();

  const themeStyles = {
    light: { background: "#fff", color: "#111", border: "1px solid #ddd" },
    dark: { background: "#1a1a2e", color: "#e0e0e0", border: "1px solid #444" },
    "high-contrast": {
      background: "#000",
      color: "#ff0",
      border: "2px solid #ff0"
    }
  };

  return (
    <section
      className="ThemedWidget"
      data-rehydratable="ThemedWidget"
      data-heading={heading}
      style={themeStyles[theme] || themeStyles.light}
    >
      <h2>{heading}</h2>
      <p>
        This widget is in a <strong>separate React root</strong> from the
        ThemeSelector above.
      </p>
      <p>
        It subscribes to the shared store via <code>useSyncExternalStore</code>{" "}
        (React 18+).
      </p>
      <p>
        Active theme: <strong>{theme}</strong>
      </p>
    </section>
  );
};

const themeSelectorRehydrator = async domNode => {
  const heading = domNode.getAttribute("data-heading");
  return <ThemeSelector heading={heading} />;
};

const themedWidgetRehydrator = async domNode => {
  const heading = domNode.getAttribute("data-heading");
  return <ThemedWidget heading={heading} />;
};

export {
  ThemeSelector,
  ThemedWidget,
  themeSelectorRehydrator,
  themedWidgetRehydrator
};
