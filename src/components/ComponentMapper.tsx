import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { useEditorContext } from "@/context/EditorContext";
import { DeleteComponentByPk } from "@/graphql/components";
import { Component, ComponentType } from "@/types/Component.types";
import { graphqlClient } from "@/utils/graphqlClient";
import { Icon } from "@iconify/react";
import { ActionIcon } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cloneElement, FC, memo } from "react";
import ButtonComponent from "./ButtonComponent";

const map = new Map();
map.set(ComponentType.Heading, <Heading id="" />);
map.set(ComponentType.Paragraph, <Paragraph id="" />);
map.set(ComponentType.Button, <ButtonComponent id="" />);

const ComponentMapper: FC<Component> = (props) => {
  const { type, id } = props;
  const queryClient = useQueryClient();
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
    cancel,
  } = useEditorContext();
  //   const map = {
  //     COMPONENT.H1: <Heading />,
  //     COMPONENT.P: <Paragraph />
  //   };

  const deleteComponentByPkMutation = useMutation({
    mutationFn: (id: string) => {
      return graphqlClient.request(DeleteComponentByPk, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetComponents]);
    },
  });

  // if (component.type === COMPONENT.H1) {
  //   return cloneElement(<Heading {...component.properties} />);
  // }
  // if (component.type === COMPONENT.P) {
  //   return cloneElement(<Paragraph {...component.properties} />);
  // }
  //   console.log(cloneElement(map.get(component.type), component.properties));

  return (
    <div
      style={{
        cursor: "pointer",
        border: `${id === selectedComponentId ? "1px dotted black" : ""}`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedComponentId(id);
        setSelectedComponentType(type);
      }}
    >
      <ActionIcon
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (id === selectedComponentId) {
            cancel();
          }
          deleteComponentByPkMutation.mutate(id);
        }}
        loading={deleteComponentByPkMutation.isLoading}
      >
        <Icon icon="carbon:close" style={{ color: "hsl(0, 50%, 40%)" }} />
      </ActionIcon>

      {cloneElement(map.get(type), {
        id: id,
      })}
    </div>
  );
  // return cloneElement(map.get(component.type), component.properties);
};

export default memo(ComponentMapper);
