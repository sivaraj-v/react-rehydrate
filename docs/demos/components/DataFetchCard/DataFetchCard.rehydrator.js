import React from "react";
import DataFetchCard from "./DataFetchCard";

export default async domNode => {
  const productId = domNode.getAttribute("data-product-id");
  const fallbackTitle = domNode.getAttribute("data-fallback-title");

  return <DataFetchCard fallbackTitle={fallbackTitle} productId={productId} />;
};
