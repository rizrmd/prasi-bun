import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { style } from "@hyrious/esbuild-plugin-style";
import { npm_page, npm_site } from "dbgen";
import { dir } from "dir";
import { build } from "esbuild";
import { $ } from "execa";
import { dirAsync, writeAsync } from "fs-jetpack";
import { stat } from "fs/promises";
import { apiContext } from "service-srv";
import { g } from "utils/global";
import { validate } from "uuid";
import { glb } from "../global";
import { eg } from "../ws/edit/edit-global";
import { buildNpm } from "../util/build-npm";

export const _ = {
  url: "/npm-bundle/:mode/:id",
  async api(mode: "site" | "page", id: string) {
    const {} = apiContext(this);
    return await buildNpm({ id, mode });
  },
};
