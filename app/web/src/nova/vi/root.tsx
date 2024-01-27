import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { ViGlobal } from "./render/global";
import { ViRender } from "./render/render";
import { ErrorBox } from "./utils/error-box";

export const ViRoot: FC<{}> = ({}) => {
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

  const is_layout = !!vi.layout?.entry;
  const entry = vi.layout?.entry ? vi.layout.entry : vi.entry;

  return (
    <div className="flex flex-1 flex-col relative">
      {entry.map((id) => {
        const meta = is_layout ? vi.layout?.meta[id] : vi.meta[id];
        console.log(is_layout, vi.layout, vi.meta, id);
        if (meta) {
          if (Element) {
            return (
              <ErrorBox key={meta.item.id}>
                <ViRender meta={meta} is_layout={is_layout} />
              </ErrorBox>
            );
          }
        }
        return null;
      })}
    </div>
  );
};
