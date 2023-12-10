import { Fragment, ReactNode } from "react";

export const modifyChildScopeIndex = (
  child: ReactNode | ReactNode[],
  scopeIndex: Record<string, any>
) => {
  if (Array.isArray(child)) {
    const childs: any[] = [];
    for (const c of child) {
      childs.push(modifyChildScopeIndex(c, scopeIndex));
    }
    return childs;
  }

  if (typeof child === "object" && child) {
    const c = child as any;
    if (c.type === Fragment) {
      return (
        <Fragment key={c.key}>
          {modifyChildScopeIndex(c.props.children, scopeIndex)}
        </Fragment>
      );
    }
    return { ...child, props: { ...(child as any).props, scopeIndex } };
  }
  return child;
};
