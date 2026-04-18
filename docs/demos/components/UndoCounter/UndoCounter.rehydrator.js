import React from "react";
import UndoCounter from "./UndoCounter";

export default async domNode => {
  const title = domNode.getAttribute("data-title");
  const initialCount = parseInt(domNode.getAttribute("data-count"), 10);

  return <UndoCounter initialCount={initialCount} title={title} />;
};
