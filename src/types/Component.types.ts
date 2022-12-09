export interface Component {
  type: ComponentType;
  id: string;
}

export enum ComponentType {
  H1 = "H1",
  P = "P",
}
