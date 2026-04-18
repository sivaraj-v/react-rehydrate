const path = require("path");
const react = require("@vitejs/plugin-react");
const { defineConfig, transformWithEsbuild } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        "accessible-disclosure": path.resolve(
          __dirname,
          "accessible-disclosure/index.html"
        ),
        "action-state-form": path.resolve(
          __dirname,
          "action-state-form/index.html"
        ),
        "concurrent-search": path.resolve(
          __dirname,
          "concurrent-search/index.html"
        ),
        "data-fetch": path.resolve(__dirname, "data-fetch/index.html"),
        "deferred-search": path.resolve(
          __dirname,
          "deferred-search/index.html"
        ),
        static: path.resolve(__dirname, "static/index.html"),
        "error-boundary": path.resolve(__dirname, "error-boundary/index.html"),
        "extra-context": path.resolve(__dirname, "extra-context/index.html"),
        "extra-context-beta": path.resolve(
          __dirname,
          "extra-context-beta/index.html"
        ),
        "hello-user": path.resolve(__dirname, "hello-user/index.html"),
        "isolated-widgets": path.resolve(
          __dirname,
          "isolated-widgets/index.html"
        ),
        "optimistic-updates": path.resolve(
          __dirname,
          "optimistic-updates/index.html"
        ),
        "show-more-text": path.resolve(__dirname, "show-more-text/index.html"),
        "show-more": path.resolve(__dirname, "show-more/index.html"),
        asynchronous: path.resolve(__dirname, "asynchronous/index.html"),
        "automatic-batching": path.resolve(
          __dirname,
          "automatic-batching/index.html"
        ),
        "shared-store": path.resolve(__dirname, "shared-store/index.html"),
        "suspense-lazy": path.resolve(__dirname, "suspense-lazy/index.html"),
        "undo-counter": path.resolve(__dirname, "undo-counter/index.html"),
        "validated-form": path.resolve(__dirname, "validated-form/index.html")
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  },
  plugins: [
    react(),
    {
      name: "examples-jsx-loader",
      async transform(code, id) {
        if (id.includes("/examples/") && id.endsWith(".js")) {
          return transformWithEsbuild(code, id, {
            jsx: "automatic",
            loader: "jsx"
          });
        }

        return null;
      }
    }
  ],
  resolve: {
    alias: {
      "@sivaraj-v/dom-element-to-react": path.resolve(
        __dirname,
        "../packages/dom-element-to-react/src/index.ts"
      )
    }
  }
});
