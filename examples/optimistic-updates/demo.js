import React, { useOptimistic, useState } from "react";

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
        New comments appear instantly with <code>useOptimistic</code>, then settle
        when the simulated server save completes.
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

const optimisticCommentsRehydrator = async domNode => {
  const heading = domNode.getAttribute("data-heading");
  return <OptimisticComments heading={heading} />;
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="OptimisticComments"
      data-rehydratable="OptimisticComments"
      data-heading="Release feedback"
    >
      <h2>Release feedback</h2>
      <p>New comments appear instantly while server save completes.</p>
      <form>
        <input placeholder="Write a comment" />
        <button>Post</button>
      </form>
      <ul>
        <li>Initial server comment</li>
      </ul>
    </section>
  </div>
`;

export { OptimisticComments, optimisticCommentsRehydrator };
