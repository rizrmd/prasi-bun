import { ServerWebSocket } from "bun";
import { validate } from "uuid";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { WSData } from "../../../../../pkgs/core/server/create";
import { MPage } from "../../../../web/src/utils/types/general";
import {
  WS_MSG_GET_PAGE,
  WS_MSG_SET_PAGE,
  WS_MSG_SV_LOCAL,
} from "../../../../web/src/utils/types/ws";
import { eg } from "../edit-global";
import { loadPage } from "../tools/load-page";

export const getPage = async (
  ws: ServerWebSocket<WSData>,
  msg: WS_MSG_GET_PAGE
) => {
  const page_id = msg.page_id;
  if (!validate(page_id)) return;
  if (!eg.edit.page[page_id]) {
    const rawPage = await loadPage(page_id);

    if (rawPage) {
      const ydoc = new Y.Doc() as MPage;
      let root = ydoc.getMap("map");
      syncronize(root as any, rawPage);
      const ws = new Set<ServerWebSocket<WSData>>();
      const um = new Y.UndoManager(root, { ignoreRemoteMapChanges: true });
      const broadcast = () => {
        const sv_local = Y.encodeStateVector(ydoc as any).toString();
        const broadcast: WS_MSG_SV_LOCAL = {
          type: "sv_local",
          sv_local,
          mode: "page",
          id: page_id,
        };
        ws.forEach((w) => w.send(JSON.stringify(broadcast)));
      };
      um.on("stack-item-added", broadcast);
      um.on("stack-item-updated", broadcast);

      eg.edit.page[page_id] = {
        id: page_id,
        doc: ydoc,
        undoManager: um,
        ws,
      };
    }
  }

  const page = eg.edit.page[page_id];

  page.ws.add(ws);
  const sent: WS_MSG_SET_PAGE = {
    type: "set_page",
    changes: Y.encodeStateAsUpdate(page.doc as any).toString(),
  };
  ws.send(JSON.stringify(sent));
};
