import { createRouter } from "radix3";
import { FC, Suspense, lazy } from "react";
import { GlobalContext, useLocal } from "web-utils";
import { w } from "../utils/types/general";
import { Loading } from "../utils/ui/loading";
import * as pages from "./pages";


export const Root: FC<{}> = ({}) => {
  const local = useLocal(
    {
      router: createRouter<{ url: string; Page: FC<any> }>({
        strictTrailingSlash: true,
      }),
      Page: null as any,
    },
    async () => {
      for (const [_, v] of Object.entries(pages)) {
        local.router.insert(v.url, {
          url: v.url,
          Page: lazy(async () => {
            return { default: (await v.page()).default.component as any };
          }),
        });
      }
      local.render();
    }
  );

  prasiContext.render = local.render;

  const Provider = GlobalContext.Provider as FC<{ value: any; children: any }>;
  const found = local.router.lookup(location.pathname);

  if (found) {
    w.params = found.params;
    local.Page = found.Page;
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
