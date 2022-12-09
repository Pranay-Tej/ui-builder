import { cloneElement, memo } from "react";
import { Component } from "@/types/Component.types";
import { ComponentType } from "@/types/Component.types";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/constants/app.constants";
import request from "graphql-request";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { DeleteComponentByPk } from "@/graphql/components";

const map = new Map();
map.set(ComponentType.H1, <Heading id="" />);
map.set(ComponentType.P, <Paragraph id="" />);

const ComponentMapper: React.FC<Component> = (props) => {
  const { type, id } = props;
  const queryClient = useQueryClient();
  //   const map = {
  //     COMPONENT.H1: <Heading />,
  //     COMPONENT.P: <Paragraph />
  //   };

  const DeleteComponentByPkMutation = useMutation({
    mutationFn: (id: string) => {
      return request(BASE_URL, DeleteComponentByPk, { id });
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
  // const Comp = map.get(component.type);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          DeleteComponentByPkMutation.mutate(id);
        }}
      >
        ❌
      </button>

      {cloneElement(map.get(type), {
        id: id,
      })}
    </div>
  );
  // return cloneElement(map.get(component.type), component.properties);
};

export default memo(ComponentMapper);
