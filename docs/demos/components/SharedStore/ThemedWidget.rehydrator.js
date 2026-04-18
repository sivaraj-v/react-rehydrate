import React from "react";
import { ThemedWidget } from "./SharedStore";

export default async domNode => {
  const heading = domNode.getAttribute("data-heading");

  return <ThemedWidget heading={heading} />;
};
