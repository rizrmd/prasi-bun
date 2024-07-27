import { transform } from "sucrase";

export const codeBuild = (codes: Record<string, string>) => {
  const result = {} as Record<string, string>;
  for (const [k, v] of Object.entries(codes)) {
    result[k] = transform(v, {
      transforms: ["typescript", "imports", "jsx"],
      preserveDynamicImport: true,
      disableESTransforms: true,
    }).code;

    const use_strict = `"use strict";`;
    if (result[k].startsWith(use_strict)) {
      result[k] = result[k].substring(use_strict.length).trim();
    }
  }
  return result;
};
