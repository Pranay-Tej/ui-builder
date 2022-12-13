import { Component, ComponentType } from "@/types/Component.types";
import ComponentMapper from "@/components/ComponentMapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import request from "graphql-request";
import { BASE_URL } from "@/constants/app.constants";
import {
  GetComponents,
  InsertButtonOne,
  InsertHeadingOne,
  InsertParagraphOne,
} from "@/graphql/components";
import { FC } from "react";

const Builder: FC = () => {
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
      return request(BASE_URL, InsertHeadingOne, {
        type: ComponentType.Heading,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetComponents]);
    },
  });

  const InsertParagraphMutation = useMutation({
    mutationFn: () => {
      return request(BASE_URL, InsertParagraphOne, {
        type: ComponentType.Paragraph,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetComponents]);
    },
  });

  const InsertButtonMutation = useMutation({
    mutationFn: () => {
      return request(BASE_URL, InsertButtonOne, {
        type: ComponentType.Button,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetComponents]);
    },
  });

  return (
    <div
      style={{
        border: "1px dotted black",
        minHeight: "200px",
        display: "grid",
        gap: "2em",
        padding: "1em",
      }}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("drag-data") as ComponentType;
        console.log(data);
        if (data === ComponentType.Heading) {
          insertHeadingMutation.mutate();
        }
        if (data === ComponentType.Paragraph) {
          InsertParagraphMutation.mutate();
        }
        if (data === ComponentType.Button) {
          InsertButtonMutation.mutate();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
    >
      {componentList &&
        componentList.map((component) => (
          <ComponentMapper key={component.id} {...component} />
        ))}
    </div>
  );
};

export default Builder;
