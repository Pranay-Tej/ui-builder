import { ComponentType } from "@/types/Component.types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface ICartContext {
  selectedComponentId: string | undefined;
  selectedComponentType: string | undefined;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: ComponentType) => void;
}

const EditorContext = createContext({} as ICartContext);

export const EditorContextProvider: FC<PropsWithChildren> = (props) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>();
  const [selectedComponentType, setSelectedComponentType] =
    useState<ComponentType>();

  return (
    <EditorContext.Provider
      value={{
        selectedComponentId,
        selectedComponentType,
        setSelectedComponentId,
        setSelectedComponentType,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};
