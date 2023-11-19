import { FC } from "react";
import { ViewMeta } from "./meta";

export const VSection: FC<{ id: string }> = ({ id }) => {
  return <ViewMeta id={id} />;
};
