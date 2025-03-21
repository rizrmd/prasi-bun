import trim from "lodash.trim";

export const loadApiProxyDef = async (_url: string, with_types: boolean) => {
  const url = trim(_url, "/");

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

    const url_target = new URL(url);
    const url_cur = new URL(location.href);

    url_cur.hash = "";
    url_target.hash = "";
    let is_remote = "";
    if (url_target.host !== url_cur.host) {
      is_remote = "&remote=1";
    }

    url_cur.pathname = "";
    let cur_url = trim(url_cur.toString(), "/");
    if (with_types) {
      script.src = `${cur_url}/_prasi/load.js?url=${url}&v3&dev=1${is_remote}`;
    } else {
      script.src = `${cur_url}/_prasi/load.js?url=${url}&v3${is_remote}`;
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
