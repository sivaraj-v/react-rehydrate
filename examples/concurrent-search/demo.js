import React, { useState, useTransition } from "react";

const TECH_TOPICS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "GraphQL",
  "REST API",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "CI/CD pipelines",
  "Unit testing",
  "Performance profiling",
  "Security hardening",
  "Accessibility",
  "Internationalisation",
  "State management",
  "Client-side routing",
  "Server-side rendering",
  "Static site generation",
  "Edge functions",
  "WebSockets",
  "Service workers",
  "Progressive enhancement",
  "CSS modules",
  "Design systems",
  "Component libraries",
  "Monorepos",
  "Code splitting"
];

const SearchFilter = ({ heading }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(TECH_TOPICS);
  const [isPending, startTransition] = useTransition();

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      setResults(
        TECH_TOPICS.filter(topic =>
          topic.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
  };

  return (
    <section
      className="SearchFilter"
      data-rehydratable="SearchFilter"
      data-heading={heading}
    >
      <h2>{heading}</h2>
      <p>
        Input responds immediately via <code>useState</code>. Results update
        inside <code>startTransition</code> so they never block the input.
      </p>
      <input
        aria-label="Filter topics"
        onChange={handleChange}
        placeholder="Type to filter..."
        type="search"
        value={query}
      />
      {isPending && (
        <p className="SearchFilter-pending" aria-live="polite">
          Updating results...
        </p>
      )}
      <ul aria-label="Filtered results" aria-live="polite">
        {results.length > 0 ? (
          results.map(topic => <li key={topic}>{topic}</li>)
        ) : (
          <li>No results for &ldquo;{query}&rdquo;</li>
        )}
      </ul>
      <p className="SearchFilter-count">
        {results.length} of {TECH_TOPICS.length} topics
      </p>
    </section>
  );
};

const searchFilterRehydrator = async domNode => {
  const heading = domNode.getAttribute("data-heading");
  return <SearchFilter heading={heading} />;
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="SearchFilter"
      data-rehydratable="SearchFilter"
      data-heading="Technology topics"
    >
      <h2>Technology topics</h2>
      <input type="search" placeholder="Type to filter..." />
      <ul>
        <li>React</li><li>TypeScript</li><li>JavaScript</li>
      </ul>
    </section>
  </div>
`;

export { SearchFilter, searchFilterRehydrator };
