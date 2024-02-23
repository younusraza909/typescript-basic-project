import Button from "./components/Button";
import Container from "./components/Container";
import Input from "./components/Input";

function App() {
  return (
    <>
      <h1>Let's get started!</h1>
      <Input id="name" label="Enter your name" type="text" />
      <Input id="email" label="Enter your email" type="email" />

      <Container as={Button}>Button</Container>
    </>
  );
}

export default App;
