import {
  type FormEvent,
  type ComponentPropsWithoutRef,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

interface FormProps extends ComponentPropsWithoutRef<"form"> {
  onSave: (data: unknown) => void;
}

export type imperativeType = {
  clear: () => void;
};

const Form = forwardRef<imperativeType, FormProps>((props, ref) => {
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        clear: () => formRef.current?.reset(),
      };
    },
    []
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    props.onSave(data);
  }

  return (
    <form {...props} onSubmit={onSubmit} ref={formRef}>
      {props.children}
    </form>
  );
});

export default Form;
