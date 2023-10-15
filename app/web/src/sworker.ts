import { manifest, version } from "@parcel/service-worker";

async function install() {
  const cache = await caches.open(version);
  await cache.addAll(manifest);
}
addEventListener("install", (e) => (e as ExtendableEvent).waitUntil(install()));

async function activate() {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => key !== version && caches.delete(key)));
}
addEventListener("activate", (e) =>
  (e as ExtendableEvent).waitUntil(activate())
);

addEventListener("fetch", async (evt) => {
  const e = evt as FetchEvent;
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) {
        return r;
      }
      return await fetch(e.request);
    })()
  );
});
addEventListener("message", async (e) => {
  const type = e.data.type;
  const cache = await caches.open(version);

  switch (type) {
    case "add-cache":
      if (!(await cache.match(e.data.url))) {
        await cache.add(e.data.url);
      }
      break;
  }
});
