import { cloneElement } from "react";
import "./App.css";
import Builder from "./components/Builder";
import ComponentList from "./components/ComponentList";
import Heading from "./components/Heading";
import { ComponentTypes } from "./types/Component";
import { componentMapper } from "./utils/ComponentMapper";

function App() {
  return (
    <div className="App">
      <ComponentList />
      <Builder />

      {/* {componentMapper({
        type: COMPONENT.H1,
        properties: { content: "hello" },
      })} */}
      {/* {componentMapper({
        type: COMPONENT.P,
        properties: { content: "world" },
      })} */}
      {/* {cloneElement(Heading, { content: "abc" })} */}
    </div>
  );
}

export default App;
