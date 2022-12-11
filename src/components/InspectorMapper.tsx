import { useEditorContext } from "@/context/EditorContext";
import { ComponentType } from "@/types/Component.types";
import { cloneElement, FC, memo } from "react";
import HeadingInspector from "./HeadingInspector";
import ParagraphInspector from "./ParagraphInspector";

const map = new Map();
map.set(ComponentType.H1, <HeadingInspector />);
map.set(ComponentType.P, <ParagraphInspector />);

const InspectorMapper: FC = () => {
  const { selectedComponentType, selectedComponentId } = useEditorContext();
  return (
    <>
      {selectedComponentId &&
        selectedComponentType &&
        cloneElement(map.get(selectedComponentType))}
    </>
  );
};

export default memo(InspectorMapper);
