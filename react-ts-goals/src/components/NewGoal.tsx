import { type FormEvent } from "react";

const NewGoal = () => {
  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    // now in order to get form values we have 3 options
    // 1) Data binding with state
    // 2) using formData with current Target
    // const formData = new FormData(event.currentTarget);
    //3) Using Ref
  }

  return (
    <form onSubmit={onSubmitForm}>
      <p>
        <label htmlFor="goal">Enter your goal</label>
        <input type="text" name="goal" id="goal" />
      </p>
      <p>
        <label htmlFor="summary">Give a short summary</label>
        <input type="text" name="summary" id="summary" />
      </p>
      <p>
        <button type="submit">Add Goal</button>
      </p>
    </form>
  );
};

export default NewGoal;
