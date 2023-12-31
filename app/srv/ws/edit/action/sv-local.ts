import {
  WS_MSG_SVDIFF_REMOTE,
  WS_MSG_SV_LOCAL,
} from "../../../../web/src/utils/types/ws";
import { eg } from "../edit-global";
import { getComp } from "./get-comp";
import { getPage } from "./get-page";
import { sendWS } from "../send";

export const svLocal = async (ws: any, msg: WS_MSG_SV_LOCAL) => {
  const changes = Uint8Array.from(
    (msg.sv_local || '').split(",").map((x) => parseInt(x, 10))
  );
  let doc = null as any;
  if (msg.mode === "page") {
    if (!eg.edit.page[msg.id]) {
      await getPage(ws, { type: "get_page", page_id: msg.id });
    }

    doc = eg.edit.page[msg.id].doc;
  } else if (msg.mode === "comp") {
    if (!eg.edit.comp[msg.id]) {
      await getComp(ws, { comp_id: msg.id, type: "get_comp" });
    }

    doc = eg.edit.comp[msg.id].doc;
  } else if (msg.mode === "site") {
    doc = eg.edit.site[msg.id].doc;
  }

  if (doc) {
    const diff_remote = Y.encodeStateAsUpdate(doc, changes);
    const sv_remote = Y.encodeStateVector(doc);
    const sendmsg: WS_MSG_SVDIFF_REMOTE = {
      diff_remote: diff_remote.toString(),
      sv_remote: sv_remote.toString(),
      id: msg.id,
      mode: msg.mode,
      type: "svd_remote",
    };
    sendWS(ws,JSON.stringify(sendmsg));
  }
};
