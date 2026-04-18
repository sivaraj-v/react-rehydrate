import React from "react";

const LazyPanel = ({ headline, message }) => (
  <>
    <p className="SuspenseGreeting-eyebrow">Interactive module loaded</p>
    <h2>{headline}</h2>
    <p>{message}</p>
  </>
);

export default LazyPanel;