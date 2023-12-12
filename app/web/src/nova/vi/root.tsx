import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { ViGlobal } from "./render/global";
import { ViRender } from "./render/render";
import { ErrorBox } from "./utils/error-box";

export const ViRoot: FC<{
  entry: string[];
}> = ({ entry }) => {
  const vi = useGlobal(ViGlobal, "VI");
  const local = useLocal({ tick: Date.now() });

  vi.tick = local.tick;

  if (vi.status !== "ready") {
    return (
      <div className="flex flex-1 flex-col relative">
        <Loading backdrop={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col relative">
      {entry.map((id) => {
        const meta = vi.meta[id];
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
