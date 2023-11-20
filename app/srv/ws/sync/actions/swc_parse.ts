import { IContent } from "../../../../web/src/utils/types/general";
import { SAction } from "../actions";
import { parseJs } from "../editor/parser/parse-js";
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
      const res = parseItem(item);
      console.log(res);
    }
  }

  let result = null as unknown as Awaited<ReturnType<SAction["swc"]["parse"]>>;
  return result; 
};

type ParseParent = Record<string, {}>;
export const parseItem = (item: IContent, _parents?: ParseParent) => {
  const parents = _parents || {};

  const js = item.adv?.js;
  if (typeof js === "string") {
    const res = parseJs(js);
    if (res) {
      parents[item.id] = res;
    }
  }

  if (item.type !== "text") {
    for (const c of item.childs) {
      parseItem(c, parents);
    }
  }

  return parents;
};
