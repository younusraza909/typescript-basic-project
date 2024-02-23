import Button from "./components/Button";
import Input from "./components/Input";

function App() {
  return (
    <>
      <h1>Let's get started!</h1>
      <Input id="name" label="Enter your name" type="text" />
      <Input id="email" label="Enter your email" type="email" />
    </>
  );
}

export default App;
