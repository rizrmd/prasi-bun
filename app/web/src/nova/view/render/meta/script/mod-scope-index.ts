import { ReactNode } from "react";

export const modifyChildScopeIndex = (
  child: ReactNode | ReactNode[],
  _scopeIndex: Record<string, any>
) => {
  if (Array.isArray(child)) {
    const childs: any[] = [];
    for (const c of child) {
      childs.push(modifyChildScopeIndex(c, _scopeIndex));
    }
    return childs;
  }
  if (typeof child === "object" && child) {
    return { ...child, props: { ...(child as any).props, _scopeIndex } };
  }
  return child;
};
