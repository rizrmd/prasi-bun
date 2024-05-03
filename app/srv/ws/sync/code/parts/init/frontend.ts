import { dir } from "dir";
import { code } from "../../code";
import { Parcel } from "@parcel/core";
import { removeAsync } from "fs-jetpack";
import { $ } from "bun";
let bundler = new Parcel({
  entries: "a.js",
  defaultConfig: "@parcel/config-default",
});

export const initFrontEnd = async (root: string, id_site: string) => {
  let existing = code.internal.frontend[id_site];

  if (!existing) {
    // const run = $``
  }

};
