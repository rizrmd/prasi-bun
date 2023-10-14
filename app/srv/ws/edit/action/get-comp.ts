import { ServerWebSocket } from "bun";
import { compress } from "lz-string";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { WSData } from "../../../../../pkgs/core/server/create";
import { SingleComp, eg } from "../edit-global";
import {
  WS_MSG_GET_COMP,
  WS_MSG_SET_COMP,
  WS_MSG_SV_LOCAL,
} from "../../../../web/src/utils/types/ws";

export const getComp = async (
  ws: ServerWebSocket<WSData>,
  msg: WS_MSG_GET_COMP
) => {
  const comp_id = msg.comp_id;

  if (!eg.edit.comp[comp_id]) {
    const rawComp = await db.component.findFirst({
      where: {
        id: comp_id,
      },
      select: {
        component_group: true,
        content_tree: true,
        id: true,
        id_component_group: true,
        name: true,
        props: true,
        type: true,
      },
    });

    if (!rawComp) {
      const sent: WS_MSG_SET_COMP = {
        type: "set_comp",
        comp_id: comp_id,
        changes: "",
      };
      ws.send(JSON.stringify(sent));
      return;
    }

    if (rawComp) {
      const ydoc = new Y.Doc() as SingleComp["doc"];
      const map = ydoc.getMap("map");
      syncronize(map as any, rawComp);

      const ws = new Set<ServerWebSocket<WSData>>();
      const um = new Y.UndoManager(map, { ignoreRemoteMapChanges: true });
      const broadcast = () => {
        const sv_local = compress(Y.encodeStateVector(ydoc as any).toString());
        const broadcast: WS_MSG_SV_LOCAL = {
          type: "sv_local",
          sv_local,
          mode: "comp",
          id: comp_id,
        };
        ws.forEach((w) => w.send(JSON.stringify(broadcast)));
      };
      um.on("stack-item-added", broadcast);
      um.on("stack-item-updated", broadcast);

      eg.edit.comp[comp_id] = {
        doc: ydoc,
        id: comp_id,
        undoManager: um,
        ws,
      };
    }
  }

  const comp = eg.edit.comp[comp_id];
  if (comp) {
    if (!comp.ws.has(ws)) comp.ws.add(ws);
    const sent: WS_MSG_SET_COMP = {
      type: "set_comp",
      comp_id: comp_id,
      changes: compress(Y.encodeStateAsUpdate(comp.doc as any).toString()),
    };
    ws.send(JSON.stringify(sent));
  }
};
