import { useGlobal } from "web-utils";
import { ViewGlobal } from "../logic/global";
import { VSection } from "./section";

export const VEntry = () => {
  const v = useGlobal(ViewGlobal, "VIEW");

  return (
    <>
      {v.entry.map((section_id) => {
        return <VSection id={section_id} key={section_id} />;
      })}
    </>
  );
};
