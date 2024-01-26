import { RadixRouter, createRouter } from "radix3";
import { SAction } from "../actions";
import { SyncConnection } from "../type";
import { gzipAsync } from "../entity/zlib";

const cache = {} as Record<
  string,
  { ts: number; router: RadixRouter<{ url: string; id: string }> }
>;

const encoder = new TextEncoder();
export const page_cache: SAction["page"]["cache"] = async function (
  this: SyncConnection,
  site_id,
  urls,
  exclude_page_id
) {
  let result = null as unknown as Awaited<ReturnType<SAction["page"]["cache"]>>;

  if (
    !cache[site_id] ||
    (cache[site_id] && Date.now() - cache[site_id].ts > 5000)
  ) {
    const pages = await db.page.findMany({
      where: { id_site: site_id, is_deleted: false },
      select: { id: true, url: true },
    });
    const router = createRouter<{ url: string; id: string }>();
    for (const page of pages) {
      router.insert(page.url, page);
    }
    cache[site_id] = {
      router,
      ts: Date.now(),
    };
  }

  const router = cache[site_id]?.router;
  if (router) {
    const result: Record<string, any> = {};
    for (const url of urls) {
      const found = router.lookup(url);
      if (found && !exclude_page_id.includes(found.id)) {
        const row = await db.page.findFirst({
          where: { id: found.id },
          select: { content_tree: true },
        });
        if (row) {
          result[found.id] = row.content_tree;
        }
      }
    }
    const gzip = await gzipAsync(encoder.encode(JSON.stringify(result)));
    return { gzip };
  }

  return null;
};
