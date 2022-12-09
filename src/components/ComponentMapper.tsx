import { ReactNode, cloneElement } from "react";
import { Component } from "@/types/Component.types";
import { ComponentType } from "@/types/Component.types";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";

const map = new Map();
map.set(ComponentType.H1, <Heading id="" />);
map.set(ComponentType.P, <Paragraph id="" />);

export const ComponentMapper = (component: Component): ReactNode => {
  //   const map = {
  //     COMPONENT.H1: <Heading />,
  //     COMPONENT.P: <Paragraph />

  //   };
  // if (component.type === COMPONENT.H1) {
  //   return cloneElement(<Heading {...component.properties} />);
  // }
  // if (component.type === COMPONENT.P) {
  //   return cloneElement(<Paragraph {...component.properties} />);
  // }
  //   console.log(cloneElement(map.get(component.type), component.properties));
  // const Comp = map.get(component.type);
  return cloneElement(map.get(component.type), {
    id: component.id,
  });
  // return cloneElement(map.get(component.type), component.properties);
};
