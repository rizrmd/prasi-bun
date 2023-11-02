import { RoomList } from "./room";

export const activity = {
  site: new RoomList<{
    code: {
      name: string;
    };
    page: { id: string };
    comp: { id: string };
    item: { id: string; js: boolean; css: boolean; html: boolean };
  }>("site"),
};
