import { ReactNode, cloneElement } from "react";
import { Component } from "../types/Component";
import { ComponentTypes } from "../types/Component";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";

const map = new Map();
map.set(ComponentTypes.H1, <Heading />);
map.set(ComponentTypes.P, <Paragraph />);

export const componentMapper = (component: Component): ReactNode => {
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
  return cloneElement(map.get(component.type), component.properties);
};
