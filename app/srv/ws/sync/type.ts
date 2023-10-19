export enum DType {
  Site,
  Comp,
  Page,
}

export enum ServerAction {
  Load,
}

export type MSG_TO_SERVER = {
  action: ServerAction.Load;
  type: DType;
  id: string;
};

export enum ClientAction {
  Identify,
}
export type MSG_TO_CLIENT = {
  action: ClientAction.Identify;
  id: string;
};
