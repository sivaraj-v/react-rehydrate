import React from "react";
import SuspenseGreeting from "./SuspenseGreeting";

export default async domNode => {
  const headline = domNode.getAttribute("data-headline");
  const message = domNode.getAttribute("data-message");

  return <SuspenseGreeting headline={headline} message={message} />;
};