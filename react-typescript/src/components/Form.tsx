interface formProps<T> {
  label: string;
  value: T;
  onChange: () => void;
}

const Form = <T extends string | number>({
  value,
  label,
  onChange,
}: formProps<T>) => {
  return (
    <form>
      <label>{label}</label>
      <br />
      <input type="text" value={value} />
      <br />
      <button onClick={onChange}>Submit</button>
    </form>
  );
};

export default Form;
