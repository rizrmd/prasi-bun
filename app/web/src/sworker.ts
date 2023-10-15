import { manifest, version } from "@parcel/service-worker";

const g = {
  cache: null as null | Cache,
};

async function install() {
  const cache = await caches.open(version);
  g.cache = cache;
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

// addEventListener("fetch", async (evt) => {
//   const e = evt as FetchEvent;

//   e.respondWith(
//     (async () => {
//       if (!g.cache) {
//         g.cache = await caches.open(version);
//       }
//       const cache = g.cache;
//       const r = await cache.match(e.request);
//       if (r) {
//         return r;
//       }
//       const url = e.request.url;
//       if (url.includes("_api_frm")) {
//         cache.add(e.request);
//       }

//       return await fetch(e.request);
//     })()
//   );
// });
// addEventListener("message", async (e) => {
//   const type = e.data.type;

//   if (!g.cache) {
//     g.cache = await caches.open(version);
//   }
//   const cache = g.cache;

//   switch (type) {
//     case "add-cache":
//       if (!(await cache.match(e.data.url))) {
//         await cache.add(e.data.url);
//       }
//       break;
//   }
// });
