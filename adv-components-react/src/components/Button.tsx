// import { ComponentPropsWithoutRef } from "react";

// type ButtonProps = {
//   el: "button";
// } & ComponentPropsWithoutRef<"button">;

// type AnchorProps = {
//   el: "link";
// } & ComponentPropsWithoutRef<"a">;

// const Button = (props: ButtonProps | AnchorProps) => {
//   if (props.el === "link") {
//     return <a {...props}></a>;
//   }
//   return <button {...props}></button>;
// };

// export default Button;

// Using Type Predicate

import { type ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: never;
};

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  href?: string;
};

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return "href" in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
  if (isAnchorProps(props)) {
    return <a className="button" {...props}></a>;
  }

  return <button className="button" {...props}></button>;
}
