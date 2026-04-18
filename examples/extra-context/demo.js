import React, { useEffect } from "react";

const AdminDashboard = ({ user }) => (
  <section className="ContextCard ContextCard--admin" data-rehydratable="ContextAware">
    <h2>Admin Dashboard</h2>
    <p>Welcome, {user.name}. You have full access.</p>
    <ul>
      <li>Manage users</li>
      <li>View system metrics</li>
      <li>Configure platform settings</li>
    </ul>
  </section>
);

const BetaFeature = ({ user }) => (
  <section className="ContextCard ContextCard--beta" data-rehydratable="ContextAware">
    <h2>Beta Experience</h2>
    <p>Hi {user.name}, beta features are enabled for your account.</p>
    <p>Try: new search, custom filters, and preview widgets.</p>
  </section>
);

const StandardComponent = ({ user }) => (
  <section className="ContextCard ContextCard--standard" data-rehydratable="ContextAware">
    <h2>Standard Dashboard</h2>
    <p>Hello {user.name}, you are using the default experience.</p>
  </section>
);

const contextAwareRehydrator = async (domNode, rehydrateChildren, extra) => {
  const fallbackName = domNode.getAttribute("data-fallback-name") || "Guest";
  const user = extra.user || { name: fallbackName, role: "viewer" };

  if (user.role === "admin") {
    return <AdminDashboard user={user} />;
  }

  if (extra.features && extra.features.betaFeatures) {
    return <BetaFeature user={user} />;
  }

  return <StandardComponent user={user} />;
};

const ContextLegend = ({ user, features }) => (
  <section className="ContextLegend" data-rehydratable="ContextLegend">
    <h3>Context Inputs</h3>
    <p>
      <strong>user.role:</strong> {user.role}
    </p>
    <p>
      <strong>features.betaFeatures:</strong> {String(features.betaFeatures)}
    </p>
    <p>
      Active branch:
      {user.role === "admin"
        ? " admin"
        : features.betaFeatures
          ? " beta"
          : " standard"}
    </p>
  </section>
);

const contextLegendRehydrator = async (domNode, rehydrateChildren, extra) => {
  const user = extra.user || { name: "Guest", role: "viewer" };
  const features = extra.features || { betaFeatures: false };

  return <ContextLegend features={features} user={user} />;
};

const AnalyticsTracker = ({ enabled, config, user }) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const payload = {
      event: "extra_context_demo_loaded",
      env: config.environment,
      trackingId: config.trackingId,
      userRole: user.role
    };

    // Demo-only analytics simulation.
    // In production, replace with your analytics SDK call.
    console.log("[analytics]", payload);
  }, [config.environment, config.trackingId, enabled, user.role]);

  return (
    <section className="AnalyticsCard" data-rehydratable="AnalyticsTracker">
      <h3>Analytics</h3>
      <p>Status: {enabled ? "enabled" : "disabled"}</p>
      <p>Environment: {config.environment}</p>
      <p>Tracking ID: {config.trackingId}</p>
    </section>
  );
};

const analyticsTrackerRehydrator = async (domNode, rehydrateChildren, extra) => {
  const user = extra.user || { name: "Guest", role: "viewer" };
  const features = extra.features || { analytics: false };
  const config = extra.config || { environment: "development", trackingId: "demo-local" };

  return (
    <AnalyticsTracker
      config={config}
      enabled={Boolean(features.analytics)}
      user={user}
    />
  );
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="ContextCard"
      data-rehydratable="ContextAware"
      data-fallback-name="Guest"
    >
      <h2>Loading personalized dashboard...</h2>
      <p>This area changes based on options.extra values.</p>
    </section>

    <section class="ContextLegend" data-rehydratable="ContextLegend">
      <h3>Context Inputs</h3>
      <p>Waiting for rehydration context...</p>
    </section>

    <section class="AnalyticsCard" data-rehydratable="AnalyticsTracker">
      <h3>Analytics</h3>
      <p>Status: pending</p>
    </section>
  </div>
`;

export {
  AdminDashboard,
  BetaFeature,
  StandardComponent,
  ContextLegend,
  AnalyticsTracker,
  contextAwareRehydrator,
  contextLegendRehydrator,
  analyticsTrackerRehydrator
};
