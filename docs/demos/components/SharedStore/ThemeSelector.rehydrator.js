import React from "react";
import { ThemeSelector } from "./SharedStore";

export default async domNode => {
  const heading = domNode.getAttribute("data-heading");

  return <ThemeSelector heading={heading} />;
};
