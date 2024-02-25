import { ComponentPropsWithoutRef, forwardRef } from "react";

// interface InputProps extends ComponentPropsWithoutRef<"input"> {
//   id: string;
//   label: string;
// }

type InputProps = {
  id: string;
  label: string;
} & ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, ...props }, ref) => {
    return (
      <p>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} ref={ref} />
      </p>
    );
  }
);

export default Input;
