import { IContent } from "../../../../web/src/utils/types/general";
import { SAction } from "../actions";
import { parseJs } from "../editor/parser/parse-js";
import { SyncConnection } from "../type";

export const swc_parse: SAction["swc"]["parse"] = async function (
  this: SyncConnection,
  code
) {
  if (typeof code === "object") {
    const result: Record<string, ReturnType<typeof parseJs>> = {};
    for (const [k, v] of Object.entries(code)) {
      result[k] = parseJs(v);
    }
    return result;
  }
  
  return { _: parseJs(code) };
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
