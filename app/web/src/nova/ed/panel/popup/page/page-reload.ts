import { NodeModel } from "@minoru/react-dnd-treeview";
import { PageItem } from "./page-tree";
import { PG } from "../../../logic/ed-global";

export const pagePicker = {
  tree: [] as NodeModel<PageItem>[],
  status: "ready" as "loading" | "ready",
  render: () => {},
};

export const reloadPagePicker = async (p: PG) => {
  pagePicker.status = "loading";
  pagePicker.render();

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

  pagePicker.status = "ready";
  pagePicker.render();
};
