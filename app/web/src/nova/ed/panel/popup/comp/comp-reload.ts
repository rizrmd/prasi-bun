import { NodeModel } from "@minoru/react-dnd-treeview";
import { IMeta, PG } from "../../../logic/ed-global";
import { CompItem } from "./comp-tree";

export const compPicker = {
  site_id: "",
  ref: null as any,
  preview_ref: null as any,
  tab: "all" as "all" | "trash",
  tree: [] as NodeModel<CompItem>[],
  trash: [] as NodeModel<CompItem>[],
  trash_id: "",
  status: "ready" as "loading" | "ready",
  active_id: "",
  render: () => { },
  search: "",
};

export const reloadCompPicker = async (p: PG) => {
  compPicker.status = "loading";
  if (!p.sync) return;

  compPicker.site_id = p.site.id;
  p.comp.group[p.site.id] = await p.sync.comp.group(p.site.id);

  const group = p.comp.group[p.site.id];

  compPicker.tree = [];
  compPicker.trash = [];
  const comp_ids: string[] = [];
  let trash_id = "";
  for (const [k, v] of Object.entries(group)) {
    const tree: NodeModel<CompItem>[] =
      v.name !== "__TRASH__" ? compPicker.tree : compPicker.trash;

    if (v.name === "__TRASH__") {
      trash_id = k;
      compPicker.trash_id = k;
    }
    tree.push({
      id: k,
      parent: "comp-root",
      text: v.name,
      data: { id: k, name: v.name, type: "folder" },
    });
    comp_ids.push(k);
  }

  const comps = await _db.component.findMany({
    where: { id_component_group: { in: comp_ids } },
    select: { id: true, id_component_group: true, name: true },
  });

  for (const comp of Object.values(comps)) {
    if (comp.id_component_group) {
      const tree: NodeModel<CompItem>[] =
        comp.id_component_group !== trash_id
          ? compPicker.tree
          : compPicker.trash;

      if (p.comp.list[comp.id]) {
        const tree = p.comp.list[comp.id].tree;
        if (tree) {
          const root = tree.find(
            (e) => e.parent === "root"
          ) as NodeModel<IMeta>;
          if (root) {
            if (root.data?.item.name && comp.name !== root.data?.item.name) {
              comp.name = root.data.item.name;
              _db.component.update({
                where: { id: comp.id },
                data: { name: comp.name },
              });
            }
          }
        }
      }

      tree.push({
        id: comp.id,
        parent: comp.id_component_group,
        text: comp.name,
        data: { id: comp.id, name: comp.name, type: "component" },
      });
    }
  }

  compPicker.status = "ready";
  compPicker.render();
};
