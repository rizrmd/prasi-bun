import trim from "lodash.trim";
import { w } from "../../../utils/types/general";
import { fetchViaProxy } from "../proxy";
import { compress } from "wasm-gzip";

export const loadApiProxyDef = async (_url: string, with_types: boolean) => {
  const url = trim(_url, "/");
  const raw = await fetchViaProxy(urlPath(url, "/_prasi/_"));
  let ver = "";
  if (raw && (raw as any).prasi) {
    ver = (raw as any).prasi;
  }
  const base = baseUrl(url);

  if (ver === "v2") {
    await new Promise<void>((done) => {
      const d = document;
      const script = d.createElement("script");
      script.onload = async () => {
        done();
      };

      if (!localStorage.getItem("api-ts-" + url)) {
        localStorage.setItem("api-ts-" + url, Date.now().toString());
      }

      const ts = localStorage.getItem("api-ts-" + url);

      if (with_types) {
        script.src = `${base}/_prasi/load.js?url=${url}&v3&dev=1&ts=${ts}`;
      } else {
        script.src = `${base}/_prasi/load.js?url=${url}&v3&ts=${ts}`;
      }

      if (!document.querySelector(`script[src="${script.src}"]`)) {
        d.body.appendChild(script);
      } else {
        done();
      }
    });
  } else {
    const apiEntry = await fetch(base + "/_prasi/api-entry");
    w.prasiApi[url] = {
      apiEntry: (await apiEntry.json()).srv,
    };

    if (with_types) {
      const apiTypes = await fetch(base + "/_prasi/api-types");
      w.prasiApi[url].apiTypes = await apiTypes.text();
      w.prasiApi[url].prismaTypes = {
        "prisma.d.ts": await loadText(`${base}/_prasi/prisma/index.d.ts`),
        "runtime/index.d.ts": await loadText(
          `${base}/_prasi/prisma/runtime/index.d.ts`
        ),
        "runtime/library.d.ts": await loadText(
          `${base}/_prasi/prisma/runtime/library.d.ts`
        ),
      };
    }
  }
};

const baseUrl = (url: string) => {
  const base = new URL(url);
  return `${base.protocol}//${base.host}`;
};

const urlPath = (url: string, pathname: string) => {
  const base = new URL(url);
  base.pathname = pathname;
  return base.toString();
};

const loadText = async (url: string, v2?: boolean) => {
  const res = await fetch(url);
  return await res.text();
};
