import { RoomList } from "./room";

export const activity = {
  site: new RoomList<{
    site_js: string;
    page_id: string;
    item_id: string;
    item_action: "select" | "js" | "css" | "html";
  }>("site"),
};