import { ComponentType } from "@/types/Component.types";

const ComponentList: React.FC = () => {
  const componentList: ComponentType[] = [ComponentType.H1, ComponentType.P];

  return (
    <>
      <ul>
        {componentList.map((componentType) => (
          <li
            key={componentType}
            draggable
            style={{ cursor: "grab", padding: "0.5em" }}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", componentType);
            }}
          >
            {componentType}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ComponentList;
