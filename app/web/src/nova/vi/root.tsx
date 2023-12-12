import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { ViGlobal } from "./render/global";
import { ViRender } from "./render/render";
import { ErrorBox } from "./utils/error-box";

export const ViRoot: FC<{
  ctx: typeof ViGlobal;
  entry: string[];
}> = ({ ctx, entry }) => {
  const vi = useGlobal(ViGlobal, "VI");
  const local = useLocal({ tick: Date.now() });

  if (ctx.meta !== vi.meta) {
    vi.meta = ctx.meta;
  }
  ctx.tick = local.tick;

  return (
    <div className="flex flex-1 flex-col relative">
      {entry.map((id) => {
        const meta = ctx.meta[id];
        if (meta) {
          if (Element) {
            return (
              <ErrorBox key={meta.item.id}>
                <ViRender meta={meta} />
              </ErrorBox>
            );
          }
        }
        return null;
      })}
    </div>
  );
};
