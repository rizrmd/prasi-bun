import { FC } from "react";
import { ViContext } from "./render/parts";
import { ViRender } from "./render/render";
import { useLocal } from "web-utils";
import { ErrorBox } from "./utils/error-box";

export const ViRoot: FC<{
  ctx: ViContext;
  entry: string[];
}> = ({ ctx, entry }) => {
  const local = useLocal({ tick: Date.now() });
  ctx.tick = local.tick;

  return (
    <div className="flex flex-1 flex-col relative">
      {entry.map((id) => {
        const meta = ctx.meta[id];
        if (meta) {
          if (Element) {
            return (
              <ErrorBox key={meta.item.id}>
                <ViRender ctx={ctx} meta={meta} />
              </ErrorBox>
            );
          }
        }
        return null;
      })}
    </div>
  );
};
