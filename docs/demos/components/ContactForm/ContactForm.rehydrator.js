import React from "react";
import ContactForm from "./ContactForm";

export default async domNode => {
  const heading = domNode.getAttribute("data-heading");

  return <ContactForm heading={heading} />;
};
