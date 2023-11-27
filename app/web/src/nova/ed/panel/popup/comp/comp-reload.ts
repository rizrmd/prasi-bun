import { NodeModel } from "@minoru/react-dnd-treeview";
import { PG } from "../../../logic/ed-global";
import { CompItem } from "./comp-tree";

export const compPicker = {
  site_id: "",
  ref: null as any,
  tree: [] as NodeModel<CompItem>[],
  status: "ready" as "loading" | "ready",
  render: () => {},
};

export const reloadCompPicker = async (p: PG) => {
  compPicker.status = "loading";

  compPicker.status = "ready";
  compPicker.render();
};
