import React from "react";
import ActionStateForm from "./ActionStateForm";

export default async domNode => {
  const heading = domNode.getAttribute("data-heading");

  return <ActionStateForm heading={heading} />;
};
