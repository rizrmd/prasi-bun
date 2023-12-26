import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";
import { ErrorBox } from "../utils/error-box";
import { ViGlobal } from "./global";
import { viParts } from "./parts";
import { ViScript } from "./script";

export const ViRender: FC<{
  meta: IMeta;
  children?: ReactNode;
  passprop?: any;
}> = ({ meta, children, passprop }) => {
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
