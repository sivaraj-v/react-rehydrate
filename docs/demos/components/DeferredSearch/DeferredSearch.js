import React, { useDeferredValue, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ITEMS = Array.from({ length: 1200 }, (_, i) => `Item ${i + 1}`);

const DeferredSearch = ({ heading }) => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) {
      return ITEMS.slice(0, 100);
    }
    return ITEMS.filter(item => item.toLowerCase().includes(q)).slice(0, 100);
  }, [deferredQuery]);

  const isStale = query !== deferredQuery;

  return (
    <section
      className="DeferredSearch"
      data-rehydratable="DeferredSearch"
      data-heading={heading}
    >
      <h2>{heading}</h2>
      <p>
        <code>useDeferredValue</code> keeps typing responsive while the heavy
        list rendering follows a deferred query.
      </p>
      <input
        aria-label="Search items"
        onChange={e => setQuery(e.target.value)}
        placeholder="Search 1200 items"
        type="search"
        value={query}
      />
      {isStale && <p aria-live="polite">Refreshing results...</p>}
      <ul>
        {filtered.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        Showing {filtered.length} items using query{" "}
        <strong>{deferredQuery || "(all)"}</strong>
      </p>
    </section>
  );
};

DeferredSearch.propTypes = {
  heading: PropTypes.string.isRequired
};

export default DeferredSearch;
