import { PG } from "./global";

export const liveSyncWS = async (p: PG) => {
  if (!p.liveSync.init) {
    p.liveSync.init = true;

    if (!p.liveSync.decompress) {
      const brotliPromise = (await import("brotli-dec-wasm")).default;
      p.liveSync.decompress = (await brotliPromise).decompress;
    }
    const decoder = new TextDecoder();
    const url = new URL(location.href);
    url.pathname = "/live";
    url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

    const ws = new WebSocket(url);
    p.liveSync.ws = ws;
    ws.onmessage = async (e) => {
      const decompress = p.liveSync.decompress;
      if (decompress) {
        const raw = e.data as Blob;
        const extracted = decompress(new Uint8Array(await raw.arrayBuffer()));
        const json = JSON.parse(decoder.decode(extracted));
        console.log(json);
      }
    };
  }
};
