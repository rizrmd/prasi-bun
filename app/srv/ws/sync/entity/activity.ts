import { Room, RoomList } from "./room";

export const activity = {
  site: new RoomList<{ code: { name: string } }>(),
};
