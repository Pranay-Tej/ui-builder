import { Fragment } from "react";
import { Component, ComponentType } from "@/types/Component.types";
import { ComponentMapper } from "@/components/ComponentMapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import request from "graphql-request";
import { BASE_URL } from "@/constants/app.constants";
import {
  GetComponents,
  InsertHeadingOne,
  InsertParagraphOne,
} from "@/graphql/components";

const Builder: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: componentList } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetComponents],
    queryFn: async () => {
      const data = await request(BASE_URL, GetComponents);
      return data?.components as Component[];
    },
    onError: (err) => console.error(err),
  });

  const insertHeadingMutation = useMutation({
    mutationFn: () => {
      return request(BASE_URL, InsertHeadingOne);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetComponents]);
    },
  });

  const InsertParagraphMutation = useMutation({
    mutationFn: () => {
      return request(BASE_URL, InsertParagraphOne);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetComponents]);
    },
  });

  return (
    <div
      style={{ border: "1px solid white", minHeight: "200px" }}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain") as ComponentType;
        console.log(data);
        if (data === ComponentType.H1) {
          insertHeadingMutation.mutate();
        }
        if (data === ComponentType.P) {
          InsertParagraphMutation.mutate();
        }
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
