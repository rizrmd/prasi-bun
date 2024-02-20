import { validate } from "uuid";
import { SAction } from "../actions";
import { docs } from "../entity/docs";
import { gunzipAsync } from "../entity/zlib";
import { SyncConnection } from "../type";
import { gzipAsync } from "utils/diff/diff";

const history = {} as Record<string, string>;

export const yjs_diff_local: SAction["yjs"]["diff_local"] = async function (
  this: SyncConnection,
  mode,
  id,
  bin
) {
  if (!docs[mode][id]) {
    console.log(`diff_local not found`, mode, id);
    return;
  }
  if (mode === "page" || mode === "comp") {
    const doc = docs[mode][id].doc as Y.Doc;
    const diff = await gunzipAsync(bin);
    const um = docs[mode][id].um;
    um.addTrackedOrigin(this.client_id);
    Y.applyUpdate(doc, diff, this.client_id);

    const root = doc.getMap("map").get("root") as any;
    if (root) {
      if (mode === "page") {
        if (validate(id) && id) {
          let mode = "create" as "create" | "update";
          const cur = Math.round(Date.now() / 5000) + "";
          if (history[id] && history[id] === cur) {
            mode = "update";
          }
          history[id] = cur;
          if (mode === "create") {
            await _db.page_history.create({
              data: {
                id_page: id,
                content_tree: await gzipAsync(JSON.stringify(root.toJSON())),
                ts: history[id],
              },
            });

            const res = await _db.page_history.findMany({
              where: {
                id_page: id,
              },
              select: {
                id: true,
                ts: true,
              },
              orderBy: {
                ts: "desc",
              },
            });
            const ids = [];
            for (let i = 0; i < res.length; i++) {
              if (i > 25) {
                ids.push(res[i].id);
              }
            }
            await _db.page_history.deleteMany({
              where: { id: { in: ids } },
            });
          } else {
            await _db.page_history.updateMany({
              data: {
                content_tree: await gzipAsync(JSON.stringify(root.toJSON())),
              },
              where: {
                id_page: id,
                ts: history[id],
              },
            });
          }

          await _db.page.update({
            where: { id },
            data: {
              content_tree: root.toJSON(),
            },
          });
        }
      } else if (mode === "comp") {
        await _db.component.update({
          where: { id },
          data: {
            content_tree: root.toJSON(),
          },
        });
      }
    }
  }
};
