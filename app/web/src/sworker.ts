import { manifest, version } from "@parcel/service-worker";
import { RadixRouter, createRouter } from "radix3";
const g = {
  router: null as null | RadixRouter<any>,
  broadcast(msg: any) {
    // @ts-ignore
    const c: Clients = self.clients;
    c.matchAll({ includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage(msg);
      });
    });
  },
};

async function install() {
  const cache = await caches.open(version);
  await cache.addAll(manifest);
  g.broadcast({ type: "installed" });
}
addEventListener("install", (e) => (e as ExtendableEvent).waitUntil(install()));

async function activate() {
  let shouldRefresh = false;
  const keys = await caches.keys();
  await Promise.all(
    keys.map(async (key) => {
      if (key !== version) {
        await caches.delete(key);
        shouldRefresh = true;
      }
    })
  );

  g.broadcast({ type: "activated", shouldRefresh });
}
addEventListener("activate", (e) =>
  (e as ExtendableEvent).waitUntil(activate())
);

addEventListener("fetch", async (evt) => {
  const e = evt as FetchEvent;

  const url = new URL(e.request.url);

  if (g.router) {
    const found = g.router.lookup(url.pathname);
    if (found) {
      return;
    }
  }

  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) {
        return r;
      }
      return fetch(e.request);
    })()
  );
});
g.broadcast({ type: "ready" });
addEventListener("message", async (e) => {
  const type = e.data.type;
  const cache = await caches.open(version);

  switch (type) {
    case "add-cache":
      if (!(await cache.match(e.data.url))) {
        await cache.add(e.data.url);
      }
      break;
    case "define-route":
      console.log("defining route", e.data.routes);
      g.router = createRouter({ strictTrailingSlash: false });
      for (const route of e.data.routes) {
        g.router.insert(route.url, route);
      }
      await activate();
      break;
  }
});
