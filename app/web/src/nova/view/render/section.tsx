import { FC, ReactNode } from "react";
import { ISection } from "../../../utils/types/section";

export const VSection: FC<{ item: ISection; children: ReactNode }> = ({
  item,
  children,
}) => {
  console.log(item);
  return <div></div>;
};
