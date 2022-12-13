export interface Component {
  type: ComponentType;
  id: string;
}

export enum ComponentType {
  Heading = "Heading",
  Paragraph = "Paragraph",
  Button = "Button",
}
