import { ComponentPropsWithoutRef } from "react";

type inputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

const Input = ({ id, label, type, ...otherProps }: inputProps) => {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input type={type} {...otherProps} />
    </div>
  );
};

export default Input;
