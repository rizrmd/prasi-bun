import { transform } from "esbuild";
import { apiContext } from "service-srv";

export const _ = {
  url: "/code_build",
  async api(arg: Record<string, string>) {
    // const { req, res } = apiContext(this);

    const result = {} as Record<string, string>;
    await Promise.all(
      Object.entries(arg).map(async ([key, src]) => {
        const res = await transform(`return ${src}`, {
          jsx: "transform",
          format: "cjs",
          loader: "tsx",
        });

        result[key] = res.code.substring(6);
      })
    );
    return result;
  },
};
