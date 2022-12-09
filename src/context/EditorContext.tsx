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
  cancel: () => void;
}

const EditorContext = createContext({} as ICartContext);

export const EditorContextProvider: FC<PropsWithChildren> = (props) => {
  const [selectedComponentId, setSelectedComponentId] = useState<
    string | undefined
  >();
  const [selectedComponentType, setSelectedComponentType] = useState<
    ComponentType | undefined
  >();

  const cancel = () => {
    setSelectedComponentId(undefined);
    setSelectedComponentType(undefined);
  };

  return (
    <EditorContext.Provider
      value={{
        selectedComponentId,
        selectedComponentType,
        setSelectedComponentId,
        setSelectedComponentType,
        cancel,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};
