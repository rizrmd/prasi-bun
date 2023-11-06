import { FC, ReactNode, useEffect, useState } from "react";
import { deepClone, useGlobal, useLocal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { FNAdv, FNCompDef, FNLinkTag } from "../../../utils/types/meta-fn";
import { responsiveVal } from "../../editor/tools/responsive-val";
import { ItemMeta, LiveGlobal, PG } from "../logic/global";
import { preload } from "../logic/route";
import { treePropEval } from "../logic/tree-prop";
import { treeScopeEval } from "../logic/tree-scope";
import { LTextInternal } from "./l-text";

export const LRender: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
  fromProp?: boolean;
  _scopeIndex?: Record<string, any>;
}> = ({ id, children, fromProp, _scopeIndex }) => {
  const p = useGlobal(LiveGlobal, "LIVE");
  const meta = p.treeMeta[id];

  if (meta) {
    if (meta.item.name.startsWith("::")) {
      if (meta.isLayout) {
        meta.className = produceCSS(meta.item, {
          mode: p.mode,
        });

        return <PrasiPortal name={meta.item.name} />;
      } else {
        if (!p.portal[meta.item.name]) return null;
        p.portal[meta.item.name].el = (
          <LRenderInternal
            p={p}
            id={id}
            children={children}
            fromProp={fromProp}
            meta={meta}
            _scopeIndex={_scopeIndex}
          />
        );
        return null;
      }
    }
  }

  return (
    <LRenderInternal
      p={p}
      id={id}
      children={children}
      fromProp={fromProp}
      meta={meta}
      _scopeIndex={_scopeIndex}
    />
  );
};
export const LRenderInternal: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
  fromProp?: boolean;
  meta?: ItemMeta;
  _scopeIndex?: Record<string, any>;
  p: PG;
}> = ({ id, children, meta, p, _scopeIndex }) => {
  const [_, render] = useState({});

  useEffect(() => {
    if (meta) {
      meta.mounted = true;
      if (meta.pendingRender) {
        meta.pendingRender = false;
        render({});
      }
    }
  });

  if (!meta) {
    return null;
  }
  meta.render = () => {
    if (meta) {
      if (meta.mounted) {
        render({});
      } else {
        meta.pendingRender = true;
      }
    }
  };
  let item = meta.item;

  if (meta.comp?.id) {
    const comp = meta.comp;

    let props = {} as Record<string, FNCompDef>;
    let cprops = {} as [string, FNCompDef][];

    props = deepClone(
      p.comps.all[meta.comp.id]?.content_tree.component?.props || {}
    );
    cprops = Object.entries(props);

    comp.propval = treePropEval(p, id, cprops, _scopeIndex);
  }

  let _children = null;

  if (children) {
    if (item.type === "text") _children = children([]);
    else {
      _children = children(
        item.childs.filter((c) => {
          if (c.hidden === "all") {
            return false;
          }

          if (!p.treeMeta[c.id]) {
            if (p.treePending) p.treePending.then(meta.render);
            return false;
          }
          return true;
        }) || []
      );
    }
  }

  meta.className = produceCSS(item, {
    mode: p.mode,
  });

  const className = meta.className;
  const adv = item.adv;

  if (!(adv?.jsBuilt && adv?.js) && meta.comp) {
    return treeScopeEval(
      p,
      id,
      _children,
      `render(React.createElement("div",{...props},children));`,
      _scopeIndex
    );
  }

  if (adv) {
    if (adv.html) {
      const html = renderHTML(className, adv);
      if (html) return html;
    } else if (adv.jsBuilt && adv.js) {
      const el = treeScopeEval(p, id, _children, adv.jsBuilt, _scopeIndex);
      return el;
    }
  }
  const linktag = responsiveVal<FNLinkTag>(item, "linktag", p.mode, {});
  const isComponent = item.type === "item" && item.component?.id;

  if (linktag && linktag.link && !isComponent) {
    let href = linktag.link || "";
    if (href.startsWith("/")) {
      preload(p, href);
      if (
        (location.pathname.startsWith("/preview/") ||
          location.pathname.startsWith("/site/")) &&
        ["localhost", "127.0.0.1", "prasi.app"].includes(location.hostname)
      ) {
        const parts = location.pathname.split("/");
        if (parts.length >= 3) {
          href = `/${parts[1]}/${parts[2]}${href}`;
        }
      }
    }

    const props = {
      className: className,
      href: href,
      onClick: (e: any) => {
        e.preventDefault();
        if (href.startsWith("/")) {
          navigate(href);
        } else {
          location.href = href;
        }
      },
    };

    if (item.type === "text") {
      return (
        <a
          {...props}
          dangerouslySetInnerHTML={{ __html: item.html || item.text }}
        />
      );
    }
    return <a {...props}>{_children}</a>;
  }

  if (item.type === "text") {
    return (
      <LTextInternal
        key={item.id}
        className={className}
        item={item}
        p={p}
        _children={item.html || item.text}
      />
    );
  }

  return (
    <div className={className}>
      {/* {isComponent && (
        <pre className={"text-[9px] font-mono text-black"}>
          {item.id}-{item.name}
        </pre>
      )} */}
      {_children}
    </div>
  );
};

export const renderHTML = (className: string, adv: FNAdv) => {
  if (adv.html) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: adv.html }}
      ></div>
    );
  }
  return null;
};

const PrasiPortal = ({ name }: { name: string }) => {
  const p = useGlobal(LiveGlobal, "LIVE");
  const local = useLocal({});

  if (!p.portal[name]) {
    p.portal[name] = { render: local.render, el: null };
  } else {
    p.portal[name].render = local.render;
  }

  return p.portal[name].el;
};
