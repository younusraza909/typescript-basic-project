import { ComponentPropsWithoutRef } from "react";

// interface InputProps extends ComponentPropsWithoutRef<"input"> {
//   id: string;
//   label: string;
// }

type InputProps = {
  id: string;
  label: string;
} & ComponentPropsWithoutRef<"input">;

const Input = ({ id, label, ...props }: InputProps) => {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </p>
  );
};

export default Input;
