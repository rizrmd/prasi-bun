import { PG } from "../../../logic/ed-global";

export const dev = JSON.parse(localStorage.getItem("prasi-dev") || "{}") as {
  enabled: boolean;
  url: string;
};

export const apiUrl = function (p: PG): string {
  if (dev.enabled) {
    return dev.url;
  }
  return p.site.config.api_url;
};

export const checkAPI = (p: PG) => {
  const url = apiUrl(p);
  if (!url) return null;

  return { deployable: false, hasDB: false };
};
