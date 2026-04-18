import React, { useActionState } from "react";

const submitContact = async (prevState, formData) => {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();

  if (!name || !email) {
    return {
      error: "Name and email are required.",
      success: ""
    };
  }

  await new Promise(resolve => {
    setTimeout(resolve, 800);
  });

  return {
    error: "",
    success: `Thanks ${name}, confirmation sent to ${email}.`
  };
};

const ActionStateForm = ({ heading }) => {
  const [state, action, pending] = useActionState(submitContact, {
    error: "",
    success: ""
  });

  return (
    <section
      className="ActionStateForm"
      data-rehydratable="ActionStateForm"
      data-heading={heading}
    >
      <h2>{heading}</h2>
      <p>
        This form uses <code>useActionState</code> to handle pending, error, and
        success states in one place.
      </p>
      <form action={action}>
        <div>
          <label>
            Name
            <input name="name" type="text" />
          </label>
        </div>
        <div>
          <label>
            Email
            <input name="email" type="email" />
          </label>
        </div>
        <button disabled={pending} type="submit">
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>
      {state.error && <p role="alert">{state.error}</p>}
      {state.success && <p>{state.success}</p>}
    </section>
  );
};

const actionStateFormRehydrator = async domNode => {
  const heading = domNode.getAttribute("data-heading");
  return <ActionStateForm heading={heading} />;
};

export const markup = `
  <div data-react-from-markup-container>
    <section
      class="ActionStateForm"
      data-rehydratable="ActionStateForm"
      data-heading="Sign up updates"
    >
      <h2>Sign up updates</h2>
      <form>
        <div><label>Name<input name="name" type="text" /></label></div>
        <div><label>Email<input name="email" type="email" /></label></div>
        <button>Submit</button>
      </form>
    </section>
  </div>
`;

export { ActionStateForm, actionStateFormRehydrator };
