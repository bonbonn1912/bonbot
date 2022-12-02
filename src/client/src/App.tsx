import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
  const [count, setCount] = useState(0);
  const testApi = (path: string) => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <button onClick={() =>testApi("/api")}>Test Api</button>
      <button onClick={() =>testApi("/api/nested")}>Test Nested</button>
    </div>
  );
}

export default App;
