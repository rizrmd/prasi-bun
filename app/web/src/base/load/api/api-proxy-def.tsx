import trim from "lodash.trim";
import { w } from "../../../utils/types/general";
import { fetchViaProxy } from "../proxy";

export const loadApiProxyDef = async (_url: string, with_types: boolean) => {
  const url = trim(_url, "/");

  const base = baseUrl(url);

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
    script.onerror = () => {
      done();
    };

    if (!document.querySelector(`script[src="${script.src}"]`)) {
      d.body.appendChild(script);
    } else {
      done();
    }
  });
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
