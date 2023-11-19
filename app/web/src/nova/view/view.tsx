import { FC } from "react";
import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { ViewGlobal } from "./logic/global";
import { VInit } from "./logic/init";
import { VLoad } from "./logic/types";
import { VSection } from "./render/section";
import { ISection } from "../../utils/types/section";

export const View: FC<{
  load: VLoad;
}> = ({ load }) => {
  const v = useGlobal(ViewGlobal, "VIEW");

  if (v.mode === "init") {
    VInit(v, load);
  }

  return (
    <div className="flex flex-1 flex-col relative">
      {v.mode !== "ready" ? (
        <Loading backdrop={false} />
      ) : (
        v.entry.map((section_id) => {
          const meta = v.meta[section_id];
          const section = meta.item as ISection;

          return (
            <VSection item={section} key={section_id}>
              Hello
            </VSection>
          );
        })
      )}
    </div>
  );
};
