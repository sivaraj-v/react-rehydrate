import React from "react";
import DeferredSearch from "./DeferredSearch";

export default async domNode => {
  const heading = domNode.getAttribute("data-heading");

  return <DeferredSearch heading={heading} />;
};
