(BigInt.prototype as any).toJSON = function (): string {
  return `BigInt::` + this.toString();
};
let w = (typeof window !== "undefined" ? window : null) as any;

export const fetchViaProxy = async (
  target_url: string,
  data?: any,
  _headers?: any
) => {
  const headers = { ..._headers };

  let body = null as any;
  let isFile = false;

  const files: File[] = [];
  if (Array.isArray(data)) {
    for (const item of data) {
      if (item instanceof File) {
        files.push(item);
        isFile = true;
      }
    }
  } else if (data instanceof File) {
    isFile = true;
    files.push(data);
  }
  if (!isFile) {
    body = JSON.stringify(data);
    headers["content-type"] = "aplication/json";
  } else {
    const fd = new FormData();
    for (const file of files) {
      fd.append(file.name, file);
    }
    body = fd;
    delete headers["content-type"];
    headers["enctype"] = `multipart/form-data;`;
  }

  const to_url = new URL(target_url);

  if (w !== null) {
    const cur_url = new URL(location.href);
    let final_url = "";

    if (to_url.host === cur_url.host) {
      final_url = to_url.toString();
    } else {
      final_url = `${cur_url.protocol}//${
        cur_url.host
      }/_proxy/${encodeURIComponent(to_url.toString())}`;
    }

    if (final_url) {
      const res = await fetch(
        final_url,
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
    }
  }
  return null;
};
