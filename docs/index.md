---
layout: doc
aside: false
---

<style>
:root {
  --vp-doc-max-width: 100% !important;
}
@media (min-width: 960px) {
  .VPDoc .container {
    margin: 0 !important;
    max-width: none !important;
  }
}
th, td {
  white-space: nowrap !important;
}
.vp-doc table {
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}
.vp-doc th {
  background-color: var(--vp-c-bg-soft);
  font-weight: 700;
  color: var(--vp-c-brand);
}
</style>

# React Rehydrate
**The Bridge to Modernity: Control High-Performance React 19 Components from your Static Layouts.**

`react-rehydrate` is a professional-grade architectural bridge designed for enterprise ecosystems (CMS, Legacy E-commerce, or Monolithic Portals). It enables you to inject modern React interactivity into any HTML-first environment without the risk of a full-stack migration.

## 🏝️ Island Architecture: Selective & Resumable Hydration

Modern engineering is moving away from Monolithic SPAs toward **Selective Hydration**. `react-rehydrate` provides an architectural framework to implement this pattern in any legacy system:

- **Static Shell Strategy**: Your server delivers 100% semantic HTML for instant indexing and SEO dominance.
- **Interactive Islands (Isomorphism)**: React roots "rehydrate" only high-value interactive zones.
- **Selective Hydration**: Only code present on the page is loaded and executed via dynamic imports.
- **Resource Priority**: Defer non-critical widgets while prioritizing LCP-critical interactivity.

---

### Enterprise Technical Comparison Matrix

| Technical Dimension | Legacy Monolith (jQuery/Server) | Modern SPA (Next/CRA/Vite) | React Rehydrate (Controlled Islands) |
| :--- | :--- | :--- | :--- |
| **SEO & Indexability** | ✅ Perfect | ⚠️ High SSR Overhead | ✅ Native / Instant |
| **SMM Previews (OG Tags)** | ✅ Perfect | ⚠️ Virtual / Meta Tags | ✅ Static-First Ready |
| **Hydration Strategy** | ❌ None | ⚠️ Full Body Re-render | ✅ Selective & Fragmented |
| **Core Web Vitals (CLS)** | ✅ High Stability | ❌ Frequent Hydration Shifts | ✅ Zero-CLS Stability |
| **Content Security Policy** | ❌ Large Attack Surface | ⚠️ Moderate | ✅ Sanitized Bridge Root |
| **Time to Interactive (TTI)** | ✅ Fast | ❌ Slow (Total JS Execution) | ✅ Optimized Selective Loading |
| **Memory Lifecycle** | ✅ Efficient | ⚠️ Risk of Memory Leaks | ✅ Disposable / GC-Ready Roots |
| **Development Experience** | ❌ Poor / Stale | ✅ Excellent | ✅ Full Vite / HMR Support |
| **Legacy JS Interop** | ✅ Native | ❌ High Conflict | ✅ Isolated Root Coexistence |
| **Micro-Frontend Autonomy** | ❌ Monolithic | ⚠️ Orchestrated | ✅ Drop-in Independent Roots |
| **Production Resilience** | ❌ No Safety Boundaries | ✅ High | ✅ Multi-root Error Isolation |
| **Discovery Performance** | ✅ Instant | ❌ High Overhead | ✅ O(n) Non-blocking Scan |
| **React 19 Native Actions** | ❌ Incompatible | ✅ Native | ✅ Full Modern Hook Support |

---

## ⚡ React Rehydrate vs. React Server Components (RSC)

| Dimension | React Server Components (RSC) | React Rehydrate |
| :--- | :--- | :--- |
| **Target Environment** | Greenfield / Modern Server | Brownfield / Legacy / Any CMS |
| **Server Requirement** | Node.js (High integration) | Any (PHP, Ruby, .NET, Static) |
| **Build Dependency** | High (Bundler-heavy) | Low (Bridge-only architecture) |
| **Hydration Pattern** | Streamed | Selective / Partially Resumable |
| **Legacy Interop** | ❌ High Friction | ✅ Excellence by Design |
| **HMR Latency** | Low | ✅ Near-Zero (Vite-powered) |

---

## 🏗️ Architectural Lifecycle & Middleware

`react-rehydrate` implements a strictly managed handover between the static DOM and React:

```mermaid
graph LR
    A[Static HTML] -->|Scan| B[Discovery Phase]
    B -->|Match| C[Rehydrators]
    C -->|Fetch| D[Dynamic Chunks]
    D -->|Mount| E[Controlled Island]
    E -->|Interact| F[Updated State]
```

### 1. The Rehydrator Transform Pattern
We explicitly decouple your components from the DOM. A **Rehydrator** is an asynchronous middleware layer that acts as a transform between human-readable markup and component props. This keeps your React library platform-agnostic.

### 2. Multi-Root Fault Tolerance
By using independent **React Roots**, we provide "domain isolation." A crash in a non-critical sidebar widget cannot brick your checkout flow or global navigation. This is essential for high-availability enterprise sites.

### 3. Sustainability & Efficiency
By executing less JavaScript and avoiding full page re-renders, `react-rehydrate` reduces CPU cycles and energy consumption. This is a step toward a high-performance, sustainability-focused frontend.

---

## 🚀 Why React Rehydrate vs. Other Libraries?

| High-Level Feature | Legacy `react-from-markup` | Frameworks (Astro/Qwik) | React Rehydrate |
| :--- | :--- | :--- | :--- |
| **React 18/19 Support** | ❌ Stale (V16) | ✅ Full | ✅ Cutting Edge (React 19) |
| **Migration Risk** | Low | ❌ High (Total rewrite) | ✅ Zero-Friction Drop-in |
| **Build System** | ✅ Any | ❌ Strict pipeline lock-in | ✅ Build System Agnostic |
| **Type Integrity** | ❌ 0% Typescript | ✅ High | ✅ Native TS 5.0+ Registry |
| **Nested Strategy** | ❌ None | ⚠️ Recursive difficulty | ✅ Native Recursive Support |
| **Resumability Support** | ❌ No | ✅ Selective | ✅ Partial (Post-Discovery) |

---

## 📖 Deep Dives

- [**Installation**](/installation) — Set up in under 5 minutes.
- [**Markup Containers**](/containers) — Architect your island boundaries.
- [**Rehydrator Interface**](/api/rehydrator) — Master the bridge logic.
- [**Performance Strategy**](/guides/performance) — Scaling for any volume.
- [**React 19 Demos**](/demos/index) — Engineering examples in action.
