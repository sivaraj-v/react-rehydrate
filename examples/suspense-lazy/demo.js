import React, { Suspense, lazy } from "react";

const waitFor = delay =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

const LazyPanel = lazy(async () => {
  await waitFor(900);
  return import("./lazy-panel");
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

const suspenseGreetingRehydrator = async domNode => {
  const headline = domNode.getAttribute("data-headline");
  const message = domNode.getAttribute("data-message");

  return <SuspenseGreeting headline={headline} message={message} />;
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="SuspenseGreeting"
      data-rehydratable="SuspenseGreeting"
      data-headline="Analytics summary"
      data-message="The detailed KPI panel was loaded lazily after the container became interactive."
    >
      <p class="SuspenseGreeting-eyebrow">Loading interactive module...</p>
      <h2>Analytics summary</h2>
      <p>Preparing the client bundle for this panel.</p>
    </section>
  </div>
`;

export { SuspenseGreeting, suspenseGreetingRehydrator };