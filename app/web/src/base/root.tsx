import { createRouter } from "radix3";
import { FC, Suspense, lazy } from "react";
import { GlobalContext, useLocal } from "web-utils";
import { Loading } from "../utils/ui/loading";

export const Root: FC<{}> = ({}) => {
  const local = useLocal(
    {
      router: createRouter<any>({ strictTrailingSlash: true }),
      Page: null as any,
    },
    async () => {
      const pages = await import("./pages");
      for (const [_, v] of Object.entries(pages)) {
        local.router.insert(
          v.url,
          lazy(async () => {
            return { default: (await v.page()).default.component as any };
          })
        );
      }
      local.render();
    }
  );

  prasiContext.render = local.render;
  const Provider = GlobalContext.Provider as FC<{ value: any; children: any }>;

  const found = local.router.lookup(location.pathname);
  if (found) {
    local.Page = found;
  }

  if (!local.Page) {
    return <Loading />;
  }

  return (
    <Provider value={prasiContext}>
      <Suspense>
        <local.Page />
      </Suspense>
    </Provider>
  );
};
