import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";

const waitFor = delay =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

const LazyPanel = lazy(async () => {
  await waitFor(900);
  return import("./LazyPanel");
});

const SuspenseGreeting = ({ headline, message }) => (
  <section
    className="SuspenseGreeting"
    data-rehydratable="SuspenseGreeting"
    data-headline={headline}
    data-message={message}
  >
    <Suspense
      fallback={
        <>
          <p className="SuspenseGreeting-eyebrow">Loading interactive module...</p>
          <h2>{headline}</h2>
          <p>Preparing the client bundle for this panel.</p>
        </>
      }
    >
      <LazyPanel headline={headline} message={message} />
    </Suspense>
  </section>
);

SuspenseGreeting.propTypes = {
  headline: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default SuspenseGreeting;