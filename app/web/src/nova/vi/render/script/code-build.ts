import { transform } from "sucrase";

export const codeBuild = (codes: Record<string, string>, filePath?: string) => {
  const result = {} as Record<string, string>;
  for (const [k, v] of Object.entries(codes)) {
    result[k] = transform(v, {
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
