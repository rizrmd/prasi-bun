import mime from "mime";
import { apiContext } from "../server/api-ctx";
import { g } from "../utils/global";
import { getApiEntry } from "./_prasi";

export const _ = {
  url: "/_web/:id/**",
  async api(id: string, _: string) {
    const { req, res } = apiContext(this);

    const web = g.web[id];
    if (web) {
      const cache = web.cache;
      if (cache) {
        const parts = _.split("/");

        switch (parts[0]) {
          case "site": {
            res.setHeader("content-type", "application/json");
            if (req.query_parameters["prod"]) {
              return {
                site: cache.site,
                pages: cache.pages.map((e) => {
                  return {
                    id: e.id,
                    url: e.url,
                  };
                }),
                api: getApiEntry(),
              };
            } else {
              return cache.site;
            }
          }
          case "pages": {
            res.setHeader("content-type", "application/json");
            return cache.pages.map((e) => {
              return {
                id: e.id,
                url: e.url,
              };
            });
          }
          case "page": {
            res.setHeader("content-type", "application/json");
            return cache.pages.find((e) => e.id === parts[1]);
          }
          case "npm-site": {
            let path = parts.slice(1).join("/");
            res.setHeader("content-type", mime.getType(path) || "text/plain");

            if (path === "site.js") {
              path = "index.js";
            }
            return cache.npm.site[path];
          }
          case "npm-page": {
            const page_id = parts[1];
            if (cache.npm.pages[page_id]) {
              let path = parts.slice(2).join("/");
              res.setHeader("content-type", mime.getType(path) || "text/plain");

              if (path === "page.js") {
                path = "index.js";
              }
              return cache.npm.pages[page_id][path];
            }
            res.setHeader("content-type", "text/javascript");
          }
          case "comp": {
            res.setHeader("content-type", "application/json");
            return cache.comps.find((e) => e.id === parts[1]);
          }
        }
      }
    }
    return req.params;
  },
};
