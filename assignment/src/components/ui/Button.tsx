import { type ComponentPropsWithoutRef } from "react";
import { Link, type LinkProps } from "react-router-dom";

type BaseProps = {
  children: React.ReactNode;
  textOnly?: boolean;
};

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  BaseProps & {
    to?: never;
  };

type ButtonLinkProps = LinkProps &
  BaseProps & {
    to?: string;
  };

function isButtonLinkProps(
  props: ButtonProps | ButtonLinkProps
): props is ButtonLinkProps {
  return "to" in props;
}

const Button = (props: ButtonProps | ButtonLinkProps) => {
  if (isButtonLinkProps(props)) {
    const { children, textOnly, ...otherProps } = props;
    return (
      <Link
        {...props}
        className={`button ${textOnly ? "button--text-only" : ""}`}
      >
        {children}
      </Link>
    );
  }

  const { children, textOnly, ...otherProps } = props;
  return (
    <button
      {...otherProps}
      className={`button ${textOnly ? "button--text-only" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
