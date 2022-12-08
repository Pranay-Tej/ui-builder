export interface Component {
  type: ComponentTypes;
  properties: any;
}

export enum ComponentTypes {
  H1,
  P,
}
