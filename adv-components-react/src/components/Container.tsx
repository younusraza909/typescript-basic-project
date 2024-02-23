import { ComponentPropsWithoutRef, type ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as: T;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

const Container = <C extends ElementType>({
  as,
  children,
}: ContainerProps<C>) => {
  const Component = as as ElementType;
  return <Component>{children}</Component>;
};

export default Container;
