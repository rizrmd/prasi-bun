import { IContent } from "../../../../web/src/utils/types/general";
import { SAction } from "../actions";
import { docs } from "../entity/docs";
import { SyncConnection } from "../type";

export const swc_parse: SAction["swc"]["parse"] = async function (
  this: SyncConnection,
  arg
) {
  if (arg.type === "page") {
    let ydoc = docs.page[arg.page_id];
    if (ydoc) {
      const item = ydoc.doc.getMap("map").get("root")?.toJSON() as IContent;
    }
  } 

  let result = null as unknown as Awaited<ReturnType<SAction["swc"]["parse"]>>;
  return result;
};
