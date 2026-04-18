import React, { useOptimistic, useState } from "react";
import PropTypes from "prop-types";

const waitFor = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const saveComment = async text => {
  await waitFor(900);
  return {
    id: String(Date.now()),
    text,
    status: "saved"
  };
};

const OptimisticComments = ({ heading }) => {
  const [comments, setComments] = useState([
    { id: "1", text: "Initial server comment", status: "saved" }
  ]);
  const [draft, setDraft] = useState("");
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, text) => [
      ...currentComments,
      { id: `optimistic-${Date.now()}`, text, status: "sending" }
    ]
  );

  const submit = async e => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) {
      return;
    }

    setDraft("");
    addOptimisticComment(text);

    const saved = await saveComment(text);
    setComments(prev => [...prev, saved]);
  };

  return (
    <section
      className="OptimisticComments"
      data-rehydratable="OptimisticComments"
      data-heading={heading}
    >
      <h2>{heading}</h2>
      <p>
        New comments appear instantly with <code>useOptimistic</code>, then
        settle when the simulated server save completes.
      </p>
      <form onSubmit={submit}>
        <input
          aria-label="Comment"
          onChange={e => setDraft(e.target.value)}
          placeholder="Write a comment"
          value={draft}
        />
        <button type="submit">Post</button>
      </form>
      <ul>
        {optimisticComments.map(comment => (
          <li key={comment.id}>
            {comment.text}
            {comment.status === "sending" && (
              <em style={{ marginLeft: "0.5rem" }}>(sending...)</em>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

OptimisticComments.propTypes = {
  heading: PropTypes.string.isRequired
};

export default OptimisticComments;
