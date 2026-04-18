import React from "react";
import OptimisticComments from "./OptimisticComments";

export default async domNode => {
  const heading = domNode.getAttribute("data-heading");

  return <OptimisticComments heading={heading} />;
};
