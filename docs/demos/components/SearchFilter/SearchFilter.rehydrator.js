import React from "react";
import SearchFilter from "./SearchFilter";

export default async domNode => {
  const heading = domNode.getAttribute("data-heading");

  return <SearchFilter heading={heading} />;
};
