(BigInt.prototype as any).toJSON = function (): string {
  return `BigInt::` + this.toString();
};
let w = window as any;

export const fetchViaProxy = async (
  url: string,
  data?: any,
  _headers?: any
) => {
  const headers = { ..._headers };

  let body = data;
  let isFile = false;

  const formatSingle = async (data: any) => {
    if (!(data instanceof w.FormData || data instanceof w.File)) {
      headers["content-type"] = "application/json";
    } else {
      if (data instanceof w.File) {
        isFile = true;
        let ab = await new Promise<ArrayBuffer | undefined>((resolve) => {
          const reader = new FileReader();
          reader.addEventListener("load", (e) => {
            resolve(e.target?.result as ArrayBuffer);
          });
          reader.readAsArrayBuffer(data);
        });
        if (ab) {
          data = new File([ab], data.name);
        }
      }
    }

    return data;
  };

  if (Array.isArray(data)) {
    body = await Promise.all(data.map((e) => formatSingle(e)));
  } else {
    body = await formatSingle(data);
  }
  if (!isFile) {
    body = JSON.stringify(body);
  }

  const cur = new URL(location.href);
  const base = new URL(url);
  if (cur.host === base.host) {
    const res = await fetch(
      base.pathname,
      data
        ? {
            method: "POST",
            body,
            headers,
          }
        : undefined
    );
    const raw = await res.text();
    try {
      return JSON.parse(raw);
    } catch (e) {
      return raw;
    }
  } else {
    if (
      data instanceof File ||
      (Array.isArray(data) && data[0] instanceof File)
    ) {
      if (data instanceof File) {
        const res = await fetch(url, {
          body: data,
          method: "POST",
          headers: _headers,
        });
        return await res.text();
      } else {
        const res = await fetch(url, {
          body: data[0],
          method: "POST",
          headers: _headers,
        });
        return await res.text();
      }
    } else {
      const res = await fetch(`${w.basehost ? w.basehost : ""}/_proxy`, {
        method: "POST",
        body: JSON.stringify([
          {
            url,
            body,
            headers,
          },
        ]),
        headers: { "content-type": "application/json" },
      });

      let text = "";
      try {
        text = await res.text();
        return JSON.parse(text);
      } catch (e) {
        let formatted_body = null;
        try {
          formatted_body = JSON.stringify(JSON.parse(body), null, 2);
        } catch (e) {}

        console.warn(
          `\n\n⚡ Failed to JSON.parse fetch result of ${url}:\n\n${JSON.stringify(
            text
          )} \n\nwith params:\n${formatted_body}`
        );
        return text;
      }
    }
  }
};
