import { NodeModel } from "@minoru/react-dnd-treeview";
import { PG } from "../../../logic/ed-global";
import { PageItem } from "./page-tree";

export const pagePickerRootItem = {
  id: "root",
  parent: "page-root",
  text: "pages",
  droppable: true,
  data: { id: "root", name: "pages", type: "folder" as "folder" | "page" },
};

export const pagePicker = {
  site_id: "",
  ref: null as any,
  tree: [] as NodeModel<PageItem>[],
  status: "ready" as "loading" | "ready",
  search: "",
  render: () => {},
  rename_id: "",
  new_parent_id: "",
};

export const reloadPagePicker = async (p: PG) => {
  pagePicker.status = "loading";

  const pages = await _db.page.findMany({
    where: {
      id_site: p.site.id,
      is_deleted: false,
    },
    select: {
      id: true,
      name: true,
      id_layout: true,
      is_default_layout: true,
      id_folder: true,
      url: true,
    },
  });

  const folders = await _db.page_folder.findMany({
    where: { id_site: p.site.id, is_deleted: false },
    select: { id: true, name: true, parent_id: true },
  });

  pagePicker.tree = [];
  const tree = pagePicker.tree;

  tree.push(pagePickerRootItem);

  for (const page of pages) {
    if (p.page.list[page.id]) {
      p.page.list[page.id].page.name = page.name;
      p.page.list[page.id].page.name = page.url;
    }

    if (p.page.cur.id === page.id) {
      p.page.cur.name = page.name;
      p.page.cur.url = page.url;
    }

    tree.push({
      id: page.id,
      parent: page.id_folder || "root",
      text: page.name,
      droppable: false,
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
      parent: folder.parent_id || "root",
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
