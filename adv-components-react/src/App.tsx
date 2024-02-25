import { useRef } from "react";
import Button from "./components/Button";
import Container from "./components/Container";
import Form, { imperativeType } from "./components/Form";
import Input from "./components/Input";

type formInput = {
  name: string;
  email: string;
};

function App() {
  const formRef = useRef<imperativeType>(null);

  function onFormSave(data: any) {
    const formData = data as formInput;

    console.log(formData);
    formRef.current?.clear();
  }

  return (
    <Form onSave={onFormSave} ref={formRef}>
      <h1>Let's get started!</h1>
      <Input id="name" label="Enter your name" type="text" />
      <Input id="email" label="Enter your email" type="email" />
      <p>
        <Button>Submit</Button>
      </p>
    </Form>
  );
}

export default App;
