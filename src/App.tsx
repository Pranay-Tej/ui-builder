import "./App.css";
import Builder from "@/components/Builder";
import ComponentList from "@/components/ComponentList";
import { EditorContextProvider } from "./context/EditorContext";
import Inspector from "./components/InspectorMapper";

function App() {
  return (
    <div className="App">
      <EditorContextProvider>
        <ComponentList />
        <Builder />
        <Inspector />
      </EditorContextProvider>
    </div>
  );
}

export default App;
