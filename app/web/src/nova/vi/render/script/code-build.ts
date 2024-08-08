import type { transform } from "sucrase";

const imported = {
  transform: null as null | typeof transform,
};

export const codeBuild = async (
  codes: Record<string, string>,
  filePath?: string
) => {
  if (!imported.transform) {
    imported.transform = (await import("sucrase")).transform;
  }

  const result = {} as Record<string, string>;
  for (const [k, v] of Object.entries(codes)) {
    result[k] = imported.transform(v, {
      transforms: ["typescript", "imports", "jsx"],
      preserveDynamicImport: true,
      disableESTransforms: true,
      filePath: filePath,
    }).code;

    const removes = [`"use strict";`];
    for (const r of removes) {
      if (result[k].startsWith(r)) {
        result[k] = result[k].substring(r.length).trim();
      }
    }
  }
  return result;
};
