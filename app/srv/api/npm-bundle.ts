import { apiContext } from "service-srv";
import { buildNpm } from "../util/build-npm";

export const _ = {
  url: "/npm-bundle/:mode/:id",
  async api(mode: "site" | "page", id: string) {
    const {} = apiContext(this);
    return await buildNpm({ id, mode });
  },
};
