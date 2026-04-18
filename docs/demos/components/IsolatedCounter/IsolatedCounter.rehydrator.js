import React from "react";
import IsolatedCounter from "./IsolatedCounter";

export default async domNode => {
  const title = domNode.getAttribute("data-title");
  const initialCount = parseInt(domNode.getAttribute("data-count"), 10);

  return <IsolatedCounter initialCount={initialCount} title={title} />;
};
