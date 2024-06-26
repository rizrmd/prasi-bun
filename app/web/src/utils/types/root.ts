import { TypedArray, TypedDoc, TypedMap } from "yjs-types";
import { ISection } from "./section";
import { MItem } from "./item";
import * as Y from "yjs";
export type IRoot = {
  id: "root";
  type: "root";
  id_page?: string;
  childs: ISection[];
  component_ids?: string[];
};
export type MRoot = TypedMap<{
  id: "root";
  id_page?: string;
  type: "root";
  childs: TypedArray<ISection>;
  component_ids?: string[];
}>;

export type DPage = TypedDoc<{
  map: TypedMap<{ id: string; root: MRoot; ts?: number }>;
}>;

export type DComp = TypedDoc<{
  map: TypedMap<{ id: string; root: MItem; ts?: number }>;
}>;

export type DCode = TypedDoc<{
  map: TypedMap<{
    id: string;
    files: TypedMap<Record<string, string>>;
  }>;
}>;
