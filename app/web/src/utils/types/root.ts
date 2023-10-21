import { TypedArray, TypedDoc, TypedMap } from "yjs-types";
import { ISection } from "./section";

export type IRoot = {
  id: "root";
  type: "root";
  id_page: string;
  childs: ISection[];
};
export type MRoot = TypedMap<{
  id: "root";
  type: "root";
  childs: TypedArray<ISection>;
}>;

export type DPage = TypedDoc<{ map: TypedMap<{ id: string; root: MRoot }> }>;
