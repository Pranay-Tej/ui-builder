import { useEditorContext } from "@/context/EditorContext";
import { ComponentType } from "@/types/Component.types";
import { cloneElement, FC, memo } from "react";
import HeadingInspector from "./HeadingInspector";
import ParagraphInspector from "./ParagraphInspector";

const map = new Map();
map.set(ComponentType.Heading, <HeadingInspector />);
map.set(ComponentType.Paragraph, <ParagraphInspector />);

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
