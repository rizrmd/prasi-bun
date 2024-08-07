import { FC } from "react";
import { useGlobal } from "web-utils";
import { FMCompDef } from "../../../../../utils/types/meta-fn";
import { EDGlobal } from "../../../logic/ed-global";
import { EdPropLabel } from "./prop-label";
import { reset } from "./prop-reset";

export const EdPropInstanceCode: FC<{
  label?: string;
  name: string;
  mprop: FMCompDef;
  comp_id: string;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onEditCode: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ label, name, labelClick, onEditCode, comp_id, mprop }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div className="flex items-center min-h-[28px]"> 
      <EdPropLabel name={label || name} labelClick={labelClick} />
      <div className="flex-1 flex justify-end pr-1">
        <div
          className="m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px] select-none"
          onClick={onEditCode}
        >
          EDIT CODE
        </div>

        <div
          className={
            "my-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px] flex items-center"
          }
          onClick={() => {
            reset(p, comp_id, mprop, name);
          }}
          dangerouslySetInnerHTML={{
            __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
          }}
        ></div>
      </div>
    </div>
  );
};
