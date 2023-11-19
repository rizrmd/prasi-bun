import { useGlobal } from "web-utils";
import { ViewGlobal } from "../logic/global";
import { ViewMeta } from "./meta/meta";

export const VEntry = () => {
  const v = useGlobal(ViewGlobal, "VIEW");

  return (
    <>
      {v.entry.map((section_id) => {
        return <ViewMeta id={section_id} key={section_id} />;
      })}
    </>
  );
};
