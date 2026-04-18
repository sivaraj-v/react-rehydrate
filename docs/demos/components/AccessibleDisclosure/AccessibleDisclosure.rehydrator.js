import React from "react";
import AccessibleDisclosure from "./AccessibleDisclosure";

export default async domNode => {
  const question = domNode.getAttribute("data-question");
  const answer = domNode.getAttribute("data-answer");

  return <AccessibleDisclosure answer={answer} question={question} />;
};