import { NodeModel } from "@minoru/react-dnd-treeview";
import { PG } from "../../../logic/ed-global";
import { PageItem } from "./page-tree";

export const pagePicker = {
  site_id: "",
  ref: null as any,
  tree: [] as NodeModel<PageItem>[],
  status: "ready" as "loading" | "ready",
  render: () => {},
};

export const reloadPagePicker = async (p: PG) => {
  pagePicker.status = "loading";

  const pages = await db.page.findMany({
    where: { id_site: p.site.id, is_deleted: false },
    select: {
      id: true,
      name: true,
      id_layout: true,
      is_default_layout: true,
      id_folder: true,
      url: true,
    },
  });

  const folders = await db.page_folder.findMany({
    where: { id_site: p.site.id },
    select: { id: true, is_deleted: false, name: true, parent_id: true },
  });

  pagePicker.tree = [];
  const tree = pagePicker.tree;
  for (const page of pages) {
    tree.push({
      id: page.id,
      parent: page.id_folder || "page-root",
      text: page.name,
      data: {
        id: page.id,
        name: page.name,
        type: "page",
        url: page.url,
      },
    });
  }

  for (const folder of folders) {
    tree.push({
      id: folder.id,
      parent: folder.parent_id || "page-root",
      text: folder.name || "",
      droppable: true,
      data: {
        id: folder.id,
        name: folder.name || "",
        type: "folder",
      },
    });
  }

  pagePicker.status = "ready";
  pagePicker.render();
};
