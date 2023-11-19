import { FC } from "react";
import { useGlobal } from "web-utils";
import { ViewGlobal } from "../logic/global";

export const ViewMeta: FC<{ id: string }> = ({ id }) => {
  const v = useGlobal(ViewGlobal, "VIEW");

  const meta = v.meta[id];
  const item = meta.item;
  return <div></div>;
};
