import { dirAsync } from "fs-jetpack";
import trim from "lodash.trim";
import { dirname } from "path";
import { apiContext } from "../../../pkgs/core/server/api/api-ctx";
import { g } from "utils/global";
import { baseTypings } from "../../web/src/utils/script/types/base";

export const _ = {
  url: "/code/:site_id/:action",
  async api(site_id: string, action: "list" | "reload-api") {
    const { req, res } = apiContext(this);

    if (action === "reload-api") {
      const site = await db.site.findFirst({
        select: { config: true },
        where: { id: site_id },
      });
      if (site && site.config) {
        const base = trim((site.config as any).api_url || "", "/");
        const apires = await fetch(`${base}/_prasi/load.json`);
        const json = (await apires.json()) as {
          apiEntry: {};
          apiTypes: string;
          prismaTypes: Record<string, string>;
        };
        let apiPath = "";
        if (typeof json.apiTypes === "string") {
          apiPath = "gen/srv/api/srv";
          await Bun.write(
            `${g.datadir}/site/code/${site_id}/api-types.d.ts`,
            json.apiTypes
          );
        }

        for (const [k, v] of Object.entries(json.prismaTypes)) {
          await dirAsync(dirname(`${g.datadir}/site/code/${site_id}/${k}`));
          await Bun.write(
            `${g.datadir}/site/code/${site_id}/${k}`,
            JSON.parse(v)
          );
        }

        await Bun.write(
          `${g.datadir}/site/code/${site_id}/global.d.ts`,
          `\
import React from "react";
import {
  FC as ReactFC,
  ReactNode as RNode,
  ReactElement as RElement,
} from "react";
import * as prisma from "./prisma";
${iftext(
  apiPath,
  `\
import "./api-types";
import type * as SRVAPI from "${apiPath}";
  `
)}

declare global {
  const db: prisma.PrismaClient;
  ${baseTypings}
  ${iftext(
    apiPath,
    `\
  type Api = typeof SRVAPI;
  type ApiName = keyof Api;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };
  `
  )}
}

`
        );

        return new Response("OK");
      }

      return new Response("NOT FOUND", { status: 404 });
    } else if (action === "list") {
      let list = await db.code.findMany({ where: { id_site: site_id } });

      if (!list.find((e) => e.name === "site")) {
        list.push(
          await db.code.create({
            data: {
              id_site: site_id,
              name: "site",
            },
          })
        );
      }

      if (!list.find((e) => e.name === "SSR")) {
        list.push(
          await db.code.create({
            data: {
              id_site: site_id,
              name: "SSR",
            },
          })
        );
      }

      return list.map((e) => ({ name: e.name, id: e.id }));
    }

    return "This is code.ts";
  },
};

export const iftext = (condition: any, text: string) => {
  if (condition) {
    return text;
  }
  return "";
};
