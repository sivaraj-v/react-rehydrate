# Architecture & Infographics

Understanding the underlying mechanics of `react-rehydrate` is key to mastering its full potential. This page provides a visual and technical breakdown of our **Controlled Island Architecture**.

## The Rehydration Cycle

![React Rehydrate Infographics](/infographics.png)

### Core Components of the Flow

1. **Host Environment (The Shell)**:
   Your server-side application (CMS, Rails, PHP, etc.) generates the initial HTML. This is the "Source of Truth" for layout and initial state.

2. **Markup Discovery**:
   The `rehydrate` function performs a linear, non-blocking scan for elements with the `data-react-from-markup-container` attribute.

3. **Rehydrator Bridge**:
   For each rehydratable node, the library invokes your custom **Rehydrator**. This acts as a middleware that maps DOM attributes to React props.

4. **Concurrent Mounting**:
   React 18+ roots are created and mounted into the DOM regions. Each root is independent, providing fault tolerance and memory isolation.

## Technical Positioning

### Island Architecture
Unlike a Single Page Application (SPA), our architecture treats the page as a series of independent interactive "islands" floating in a sea of static HTML. This ensures that the page is usable even before the JavaScript has finished loading.

### Progressive Enhancement
If a script fails to load or an error occurs in one component, `react-rehydrate` ensures the rest of the page remains functional. This safety net is essential for enterprise-grade applications where stability is a priority.

### Why this matters for Architects
- **Performance**: Reduced Main Thread blocking compared to full-page hydration.
- **Scalability**: Multiple teams can own different islands.
- **Maintainability**: Clear separation between server-side layout and client-side behavior.
