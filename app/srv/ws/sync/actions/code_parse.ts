import { SAction } from "../actions";
import { parseJs } from "../editor/parser/parse-js";
import { SyncConnection } from "../type";

export const code_parse: SAction["code"]["parse"] = async function (
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
