import { Component, ComponentTypes } from "../types/Component";

const ComponentList: React.FC = () => {
  const componentList: Component[] = [
    {
      type: ComponentTypes.H1,
      properties: {
        content: "Heading",
      },
    },
    {
      type: ComponentTypes.P,
      properties: {
        content: "Text",
      },
    },
  ];

  return (
    <>
      <ul>
        {componentList.map((component) => (
          <li
            draggable
            style={{ cursor: "grab", padding: "0.5em" }}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", JSON.stringify(component));
            }}
          >
            {component.type}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ComponentList;
