import { Fragment, useState } from "react";
import { Component, ComponentTypes } from "../types/Component";
import { componentMapper } from "../utils/ComponentMapper";

const Builder: React.FC = () => {
  //   const { content } = props;

  // const config = {
  //   components: [
  //     {
  //       type: ComponentTypes.H1,
  //       properties: {
  //         content: "Some Text",
  //       },
  //     },
  //     {
  //       type: ComponentTypes.H1,
  //       properties: {
  //         content: "Other Text",
  //       },
  //     },
  //     {
  //       type: ComponentTypes.P,
  //       properties: {
  //         content: "Data for paragraph",
  //       },
  //     },
  //     {
  //       type: ComponentTypes.P,
  //       properties: {
  //         content: "Some more content",
  //       },
  //     },
  //   ],
  // };
  const [componentList, setComponentList] = useState<Component[]>([]);

  return (
    <div
      style={{ border: "1px solid white", minHeight: "200px" }}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        console.log(data);
        setComponentList((prev) => [...prev, JSON.parse(data)]);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
    >
      {componentList.map((component, index) => (
        <Fragment key={index}>{componentMapper(component)}</Fragment>
      ))}
    </div>
  );
};

export default Builder;
