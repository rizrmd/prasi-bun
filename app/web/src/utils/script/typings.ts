import type { OnMount } from "@monaco-editor/react";
import { w } from "../types/general";
import { baseTypings } from "./types/base";
import { extractProp } from "./types/prop";
export type MonacoEditor = Parameters<OnMount>[0];
type Monaco = Parameters<OnMount>[1];

const map = new WeakMap<any>();

export const registerSiteTypings = (
  monaco: Monaco,
  p: {
    site_dts: string;
    site_dts_entry: any;
  }
) => {
  if (p.site_dts) {
    register(monaco, p.site_dts, "ts:site.d.ts");

    const dts_text = Object.entries(p.site_dts_entry)
      .map(([name, type]) => {
        return `
  ${type} ${name} = _.${name};`;
      })
      .join("\n");

    register(
      monaco,
      `\
declare global {
  import * as _ from "index"
  ${dts_text}
}
export {}
    `,
      "ts:active_global.d.ts"
    );
  }
};

export const monacoTypings = async (
  p: {
    site_dts: string;
    prisma_ext: string;
    site_dts_entry: any;
    site: { api_url: string };
    site_exports: Record<string, any>;
    script: { siteTypes: Record<string, string> };
  },
  monaco: Monaco,
  prop: { values: Record<string, any>; types: Record<string, string> }
) => {
  registerSiteTypings(monaco, p);
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

        const prisma_text = `\
declare global {
  ${prisma["prisma.d.ts"]
    .replace(
      `import * as runtime from './runtime/library.js';`,
      `import * as runtime from 'ts:runtime/library';`
    )
    .replace(
      `import * as runtime from './runtime/library';`,
      `import * as runtime from 'ts:runtime/library';`
    )
    .replaceAll(`export type`, `type`)}
}
export {}`;
        register(monaco, prisma_text, `ts:prisma.d.ts`);

        register(
          monaco,
          `\
declare module "ts:prisma_ext" { 
  ${p.prisma_ext} 
}`,
          "ts:prisma_ext"
        );
      }
      const api_types = prasi_api.apiTypes;
      if (api_types) register(monaco, api_types, "ts:api.d.ts");
    }
  }

  monaco.languages.typescript.typescriptDefaults.setExtraLibs([
    {
      filePath: "csstype.d.ts",
      content: `declare module "csstype" {
${await loadText("https://cdn.jsdelivr.net/npm/csstype@3.1.3/index.d.ts")}
}`,
    },
    {
      filePath: "prop-types.d.ts",
      content: `declare module "prop-types" {
${await loadText(
  "https://cdn.jsdelivr.net/npm/@types/prop-types@15.7.12/index.d.ts"
)}
}`,
    },
    {
      filePath: "react.d.ts",
      content: `
${await loadText("https://cdn.jsdelivr.net/npm/@types/react@18.3.3/index.d.ts")}
`,
    },
    {
      filePath: "jsx-runtime.d.ts",
      content: `declare module "react/jsx-runtime" {
import * as React from "./";
export { Fragment } from "./";

export namespace JSX {
  type ElementType = React.JSX.ElementType;
}

/**
* Create a React element.
*
* You should not use this function directly. Use JSX and a transpiler instead.
*/
export function jsx(
  type: React.ElementType,
  props: unknown,
  key?: React.Key,
): React.ReactElement;

/**
* Create a React element.
*
* You should not use this function directly. Use JSX and a transpiler instead.
*/
export function jsxs(
  type: React.ElementType,
  props: unknown,
  key?: React.Key,
): React.ReactElement;
`,
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
import { PrismaExtend } from "ts:prisma_ext"

${iftext(
  apiTypes,
  `\
import "./api"
import type * as SRVAPI from "${apiPath}";`
)}


declare global {
  const db: PrismaClient & PrismaExtend;
  
  ${baseTypings}

  ${iftext(
    apiTypes,
    `
  type Api = typeof SRVAPI;
  type ApiName = keyof Api;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] } & { _raw: any };
  `
  )}
}

  `,
    "ts:prasi-global.d.ts"
  );

  register(monaco, propText.join("\n"), "ts:typings.d.ts");
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
