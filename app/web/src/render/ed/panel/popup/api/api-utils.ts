import { PG } from "../../../logic/ed-global";

export const dev = JSON.parse(localStorage.getItem("prasi-dev") || "{}") as {
  enabled: boolean;
  url: string;
  lastURL: { valid: boolean; url: string };
};

export const apiUrl = function (p: PG): string {
  if (dev.enabled) {
    return dev.url;
  }

  if (!dev.lastURL) {
    dev.lastURL = { valid: false, url: "" };
  }

  if (!dev.lastURL.valid || dev.lastURL.url !== p.site.config.api_url) {
    try {
      const url = new URL(p.site.config.api_url);
      if (url && url.hostname && url.protocol.startsWith("http")) {
        dev.lastURL.valid = true;
        return url.toString();
      }
      dev.lastURL.valid = false;
    } catch (e) {
      dev.lastURL.valid = false;
    }
  }

  if (dev.lastURL.valid) return p.site.config.api_url;

  return "";
};

export const checkAPI = (p: PG) => {
  const url = apiUrl(p);
  if (!url) return null;

  return { deployable: false, hasDB: false };
};
