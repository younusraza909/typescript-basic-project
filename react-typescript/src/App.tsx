import Box from "./components/Box";
import Form from "./components/Form";

function App() {
  return (
    <>
      <div>
        <Box heading={"Box Heading"}>Children Props</Box>
        <Form
          label="Typescript Generics"
          value="Typescript"
          onChange={() => {
            alert("Hello There ");
          }}
        />
      </div>
    </>
  );
}

export default App;
