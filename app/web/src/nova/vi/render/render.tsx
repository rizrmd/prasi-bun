import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";
import { ErrorBox } from "../utils/error-box";
import { ViGlobal } from "./global";
import { viParts } from "./parts";
import { ViScript } from "./script";

const MAX_RENDER_IN_SECOND = 70;
const render_stat: Record<string, { last_render: number; count: number }> = {};
export const ViRender: FC<{
  meta: IMeta;
  children?: ReactNode;
  passprop?: any;
}> = ({ meta, children, passprop }) => {
  if (!render_stat[meta.item.id]) {
    render_stat[meta.item.id] = {
      last_render: Math.floor(Date.now() / 1000),
      count: 1,
    };
  } else {
    if (
      render_stat[meta.item.id].last_render === Math.floor(Date.now() / 1000)
    ) {
      render_stat[meta.item.id].count++;
    } else {
      render_stat[meta.item.id] = {
        last_render: Math.floor(Date.now() / 1000),
        count: 1,
      };
    }
  }

  if (render_stat[meta.item.id]?.count > MAX_RENDER_IN_SECOND) {
    return (
      <div className="bg-orange-100 border border-orange-300 rounded-sm text-xs flex flex-col items-center">
        <div className="text-[10px] font-bold text-red-900 self-stretch px-1">
          WARNING: Render loop detected in [{meta.item.name}]
        </div>
        <p className="border-b border-orange-300 px-1 pb-1 min-w-[100px]">
          Rendered {render_stat[meta.item.id]?.count} times in less than 1
          second.
        </p>
      </div>
    );
  }

  if (!meta) return null;

  if (meta.item.hidden) return null;

  if (meta.item.adv?.js || meta.item.component?.id) {
    return (
      <ErrorBox meta={meta}>
        <ViScript meta={meta} passprop={passprop}>
          {children}
        </ViScript>
      </ErrorBox>
    );
  }

  return (
    <ErrorBox meta={meta}>
      <ViChild meta={meta} passprop={passprop}>
        {children}
      </ViChild>
    </ErrorBox>
  );
};

export const ViChild: FC<{
  meta: IMeta;
  children?: ReactNode;
  passprop?: any;
}> = ({ meta, children, passprop }) => {
  const vi = useGlobal(ViGlobal, "VI");
  const parts = viParts(vi, meta, passprop);
  if (vi.visit) vi.visit(meta, parts);

  return <div {...parts.props} />;
};
