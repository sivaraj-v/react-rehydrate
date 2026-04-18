import React from "react";
import ErrorBoundaryWidget, { WidgetErrorBoundary } from "./ErrorBoundaryWidget";

export default async domNode => {
  const title = domNode.getAttribute("data-title");
  const initialCount = parseInt(domNode.getAttribute("data-count"), 10);

  return (
    <WidgetErrorBoundary title={title} initialCount={initialCount}>
      <ErrorBoundaryWidget title={title} initialCount={initialCount} />
    </WidgetErrorBoundary>
  );
};