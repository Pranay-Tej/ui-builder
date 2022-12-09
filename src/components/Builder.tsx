import { Fragment, useState } from "react";
import { Component, ComponentType } from "@/types/Component.types";
import { ComponentMapper } from "@/components/ComponentMapper";

const Builder: React.FC = () => {
  const [componentList, setComponentList] = useState<Component[]>([]);

  return (
    <div
      style={{ border: "1px solid white", minHeight: "200px" }}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain") as ComponentType;
        console.log(data);
        setComponentList((prev) => [
          ...prev,
          { type: data, id: Math.random().toString() },
        ]);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
    >
      {componentList.map((component) => (
        <Fragment key={component.id}>{ComponentMapper(component)}</Fragment>
      ))}
    </div>
  );
};

export default Builder;
