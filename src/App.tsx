import Builder from "@/components/Builder";
import ComponentList from "@/components/ComponentList";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import Inspector from "./components/InspectorMapper";
import { EditorContextProvider } from "./context/EditorContext";

function App() {
  return (
    <div className="App">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <EditorContextProvider>
          <div
            style={{
              display: "grid",
              gap: "1em",
              gridTemplateColumns: "150px 1fr 300px",
            }}
          >
            <ComponentList />
            <Builder />
            <Inspector />
          </div>
        </EditorContextProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
