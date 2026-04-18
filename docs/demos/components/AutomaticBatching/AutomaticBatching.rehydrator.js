import React from "react";
import AutomaticBatching from "./AutomaticBatching";

export default async domNode => {
  const heading = domNode.getAttribute("data-heading");

  return <AutomaticBatching heading={heading} />;
};
