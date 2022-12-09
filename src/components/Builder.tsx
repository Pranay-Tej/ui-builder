import { Fragment } from "react";
import { Component, ComponentType } from "@/types/Component.types";
import { ComponentMapper } from "@/components/ComponentMapper";
import { useQuery } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import request from "graphql-request";
import { BASE_URL } from "@/constants/app.constants";
import { GetComponents } from "@/graphql/components";

const Builder: React.FC = () => {
  const { data: componentList } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetComponents],
    queryFn: async () => {
      const data = await request(BASE_URL, GetComponents);
      return data?.components as Component[];
    },
    onError: (err) => console.error(err),
  });

  return (
    <div
      style={{ border: "1px solid white", minHeight: "200px" }}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain") as ComponentType;
        console.log(data);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
    >
      {componentList &&
        componentList.map((component) => (
          <Fragment key={component.id}>{ComponentMapper(component)}</Fragment>
        ))}
    </div>
  );
};

export default Builder;
