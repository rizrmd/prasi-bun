import { FC, ReactNode, useState } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { FNAdv, FNCompDef, FNLinkTag } from "../../../utils/types/meta-fn";
import { responsiveVal } from "../../editor/tools/responsive-val";
import { ItemMeta, LiveGlobal, PG } from "../logic/global";
import { preload } from "../logic/route";
import { treePropEval } from "../logic/tree-prop";
import { treeScopeEval } from "../logic/tree-scope";
import { LTextInternal } from "./l-text";
import { createPortal } from "react-dom";

export const LRender: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
  fromProp?: boolean;
}> = ({ id, children, fromProp }) => {
  const p = useGlobal(LiveGlobal, "LIVE");
  const meta = p.treeMeta[id];

  if (meta) {
    if (meta.item.name.startsWith("::")) {
      if (meta.isLayout) {
        meta.className = produceCSS(meta.item, {
          mode: p.mode,
        });

        const className = meta.className;
        return <div id={meta.item.name} className={className} />;
      } else {
        const el = document.getElementById(meta.item.name);
        if (!el) return null;
        return createPortal(
          <LRenderInternal
            p={p}
            id={id}
            children={children}
            fromProp={fromProp}
            meta={meta}
          />,
          el
        );
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
    />
  );
};
export const LRenderInternal: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
  fromProp?: boolean;
  meta?: ItemMeta;
  p: PG;
}> = ({ id, children, meta, p }) => {
  const [_, render] = useState({});

  if (!meta) {
    return null;
  }

  meta.render = () => {
    render({});
  };
  let item = meta.item;

  if (item.hidden) {
    return null;
  }

  if (meta.comp?.id) {
    const comp = meta.comp;

    let props = {} as Record<string, FNCompDef>;
    let cprops = {} as [string, FNCompDef][];

    if (meta.comp.mcomp) {
      props = meta.comp.mcomp
        .get("component")
        ?.get("props")
        ?.toJSON() as Record<string, FNCompDef>;

      cprops = Object.entries(props).sort((a, b) => {
        return a[1].idx - b[1].idx;
      });
    } else {
      props = structuredClone(
        p.comps.all[meta.comp.id]?.content_tree.component?.props || {}
      );
      cprops = Object.entries(props);
    }

    comp.propval = treePropEval(p, meta, cprops);
  }

  let _children = null;

  if (children) {
    if (item.type === "text") _children = children([]);
    else {
      _children = children(item.childs || []);
    }
  }

  meta.className = produceCSS(item, {
    mode: p.mode,
  });

  const className = meta.className;
  const adv = item.adv;

  if (!(adv?.jsBuilt && adv?.js) && (meta.jsxParentId || meta.comp)) {
    return treeScopeEval(
      p,
      meta,
      _children,
      `render(React.createElement("div",{...props},children));`
    );
  }

  if (adv) {
    if (adv.html) {
      const html = renderHTML(className, adv);
      if (html) return html;
    } else if (adv.jsBuilt && adv.js) {
      const el = treeScopeEval(p, meta, _children, adv.jsBuilt);
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
      {/* <pre className={"text-[9px] font-mono text-black"}>
        {item.id}-{item.name}
        {item.name === "coba" && JSON.stringify(item.childs)}
      </pre> */}
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
