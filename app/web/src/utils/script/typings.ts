import type { OnMount } from "@monaco-editor/react";
import { w } from "../types/general";
import { baseTypings } from "./types/base";
import { extractProp } from "./types/prop";
import { prismaExtendType } from "./prisma-extend";
export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];

const map = new WeakMap<any>();

export const monacoTypings = async (
  p: {
    site_dts: string;
    site: { api_url: string };
    script: { siteTypes: Record<string, string> };
  },
  monaco: Monaco,
  prop: { values: Record<string, any>; types: Record<string, string> }
) => {
  if (!map.has(prop.values)) {
    map.set(prop.values, true);
  } else {
    return;
  }

  const prasi_api = w.prasiApi[p.site.api_url];
  if (prasi_api) {
    if (prasi_api && prasi_api.prismaTypes) {
      const prisma = prasi_api.prismaTypes;

      if (prisma) {
        register(
          monaco,
          `\
declare module "ts:runtime/index" {
  ${prisma["runtime/index.d.ts"]}
}`,
          `ts:runtime/index.d.ts`
        );

        register(
          monaco,
          `\
declare module "ts:runtime/library" {
  ${prisma["runtime/library.d.ts"]}
}`,
          `ts:runtime/library.d.ts`
        );

        register(
          monaco,
          `\
declare module "ts:prisma" {
  ${prisma["prisma.d.ts"]
            .replace(
              `import * as runtime from './runtime/library.js';`,
              `import * as runtime from 'ts:runtime/library';`
            )
            .replace(
              `import * as runtime from './runtime/library';`,
              `import * as runtime from 'ts:runtime/library';`
            )}
}`,
          `ts:prisma.d.ts`
        );
      }
      const api_types = prasi_api.apiTypes;
      if (api_types) register(monaco, api_types, "ts:api.d.ts");
    }
  }

  monaco.languages.typescript.typescriptDefaults.setExtraLibs([
    {
      filePath: "react.d.ts",
      content: await loadText(
        "https://cdn.jsdelivr.net/npm/@types/react@18.2.0/index.d.ts"
      ),
    },
    {
      filePath: "jsx-runtime.d.ts",
      content: await loadText(
        "https://cdn.jsdelivr.net/npm/@types/react@18.2.0/jsx-runtime.d.ts"
      ),
    },
    {
      filePath: "site.d.ts",
      content: p.site_dts.replaceAll("export declare const", "declare const"),
    },
  ]);

  const propText = extractProp({
    values: prop.values,
    types: { ...prop.types, ...p.script.siteTypes },
  });

  const apiTypes = w.prasiApi[p.site.api_url]
    ? w.prasiApi[p.site.api_url].apiTypes
    : "";

  let apiPath = "app/gen/srv/api/srv";
  if (apiTypes && apiTypes.includes(`export * as srv from "gen/srv/api/srv"`)) {
    apiPath = "gen/srv/api/srv";
  }

  register(
    monaco,
    `\
import React from "react";
import {
  FC as ReactFC,
  ReactNode as RNode,
  ReactElement as RElement,
} from "react";
import prisma from 'ts:prisma';

${iftext(
      apiTypes,
      `\
import "./api"
import type * as SRVAPI from "${apiPath}";`
    )}

declare global {
  const db: prisma.PrismaClient & ${prismaExtendType};
  
  ${baseTypings}

  ${propText.join("\n")}

  ${iftext(
      apiTypes,
      `
  type Api = typeof SRVAPI;
  type ApiName = keyof Api;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };
  `
    )}
}

  `,
    "ts:global.d.ts"
  );
};

const loadText = async (url: string) => {
  try {
    const res = await fetch(url);
    return await res.text();
  } catch (e) {
    return "";
  }
};

export const iftext = (condition: any, text: string) => {
  if (condition) {
    return text;
  }
  return "";
};

export const register = (monaco: Monaco, source: string, uri: string) => {
  const model = monaco.editor.getModels().find((e) => {
    return e.uri.toString() === uri;
  });
  if (model) {
    model.setValue(source);
  } else {
    monaco.editor.createModel(source, "typescript", monaco.Uri.parse(uri));
  }
};
