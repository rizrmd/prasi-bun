import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { ViGlobal } from "./render/global";
import { ViRender } from "./render/render";
import { ErrorBox } from "./utils/error-box";
import { initExts } from "./exts/init";

export const ViRoot: FC<{}> = ({}) => {
  const vi = useGlobal(ViGlobal, "VI");
  const local = useLocal({ tick: Date.now() });

  vi.tick = local.tick;
  initExts(vi);

  if (vi.status !== "ready") {
    return (
      <div className="flex flex-1 flex-col relative">
        <Loading backdrop={false} />
      </div>
    );
  }

  const is_layout = !!vi.layout?.entry && vi.layout.entry.length > 0;
  let entry = vi.entry;
  if (is_layout && vi.layout?.entry) {
    entry = vi.layout?.entry;
  }

  return (
    <div className="flex flex-1 flex-col relative">
      {Array.isArray(entry) &&
        entry.map((id) => {
          const meta = is_layout ? vi.layout?.meta[id] : vi.meta[id];
          if (meta) {
            return (
              <ErrorBox key={meta.item.id}>
                <ViRender meta={meta} is_layout={is_layout} depth={0} />
              </ErrorBox>
            );
          }
          return null;
        })}
    </div>
  );
};
