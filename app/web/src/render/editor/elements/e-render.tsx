import { FC, ReactNode, useState } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../utils/css/gen";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { FNAdv, FNCompDef } from "../../../utils/types/meta-fn";
import { Loading } from "../../../utils/ui/loading";
import { EditorGlobal } from "../logic/global";
import { treePropEval } from "../logic/tree-prop";
import {
  JS_DEBUG,
  mergeScopeUpwards,
  treeScopeEval,
} from "../logic/tree-scope";
import { fillID } from "../tools/fill-id";
import { newMap } from "../tools/yjs-tools";
import { ComponentOver, ElProp, createElProp } from "./e-relprop";
import { ETextInternal } from "./e-text";
import { DefaultScript } from "../panel/script/monaco/monaco-el";
import { jscript } from "../../../utils/script/jscript";

export const ERender: FC<{
  id: string;
  children?: (childs: IContent[]) => ReactNode;
  fromProp?: boolean;
  _scopeIndex?: Record<string, any>;
}> = ({ id, children, _scopeIndex }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const [_, setRender] = useState({});
  const meta = p.treeMeta[id];

  if (!meta) {
    return null;
  }
  meta.render = () => setRender({});
  let item = meta.item;

  if (
    meta.parent_prop &&
    typeof item.adv?.js === "string" &&
    item.adv.js.startsWith("newElement")
  ) {
    const mitem = meta.mitem;

    if (mitem && item.type === "item") {
      (async () => {
        let childs: any[] = [];
        await Promise.all(
          mitem.parent.map(async (e, idx) => {
            if (e === mitem && item.adv?.js) {
              const json = e.toJSON() as IItem;
              const scope = mergeScopeUpwards(p, id, { _scopeIndex });
              let fn: any = null;
              const args = {
                ...window.exports,
                ...scope,
                render: (f: any) => {},
                newElement: (fx: any) => {
                  fn = fx;
                },
              };
              const rawfn = new Function(
                ...Object.keys(args),
                item.adv.jsBuilt || ""
              );
              rawfn(...Object.values(args));

              await Promise.all(
                json.childs.map(async (e) => {
                  const res = await fn(fillID(e));

                  if (Array.isArray(res)) {
                    for (const r of res) {
                      childs.push(newMap(fillID(r)));
                    }
                  } else {
                    childs.push(newMap(res));
                  }
                })
              );
            }
          })
        );
        mitem.doc?.transact(() => {
          mitem.parent.map(async (e, idx) => {
            if (e === mitem && item.adv?.js) {
              mitem.parent.delete(idx);
              mitem.parent.insert(idx, childs);
            }
          });
        });
      })();
      return <>Generating</>;
    }
  }

  if (meta.comp && meta.comp.mcomp) {
    const comp = meta.comp;
    const props = meta.comp.mcomp
      .get("component")
      ?.get("props")
      ?.toJSON() as Record<string, FNCompDef>;

    const cprops = Object.entries(props).sort((a, b) => {
      return a[1].idx - b[1].idx;
    });

    if (JS_DEBUG) {
      const args = [
        ("~".repeat(meta.depth || 0) + meta.item.name).padEnd(30, "_") +
          " " +
          meta.item.id,
      ].join(" ");

      if (meta.comp) {
        console.log("%c" + args, "color:red", "prop: ", comp.propval);
      }
    }

    comp.propval = treePropEval(p, meta, cprops);
  }

  let _children = null;

  if (children) {
    if (item.type === "text") _children = children([]);
    else {
      _children = children(
        item.childs.filter((c) => {
          if (c.hidden) {
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

  meta.elprop = createElProp(item, p);
  meta.className = produceCSS(item, {
    mode: p.mode,
    hover: p.item.sideHover ? false : p.item.hover === item.id,
    active: p.item.sideHover ? false : p.item.active === item.id,
  });

  const elprop = meta.elprop;
  const className = meta.className;
  const adv = item.adv;

  let componentOver = null;
  if (item.type === "item" && item.component?.id && item.component.props) {
    if (
      !Object.values(item.component.props).find(
        (e) => e.meta?.type === "content-element"
      )
    ) {
      if (!p.comps.doc[item.component.id]) {
        componentOver = (
          <Loading backdrop={false} note={item.component.id.substring(28)} />
        );
      } else if (item.id !== p.comp?.instance_id) {
        componentOver = <ComponentOver item={item} p={p} elprop={elprop} />;
      }
    }
    if (
      meta.comp &&
      (p.comp?.id === meta.comp.id ||
        p.comp?.last.find((e) => e.comp_id === meta.comp?.id))
    ) {
      componentOver = null;
    }
  }

  if (
    adv &&
    adv.js &&
    typeof adv.js === "string" &&
    adv.js.replace(/\W/gi, "") !== DefaultScript.js.replace(/\W/gi, "") &&
    !adv.jsBuilt &&
    meta.mitem
  ) {
    if (!jscript.build) {
      jscript.init(p.render);
      return null;
    }
    jscript
      .build(
        "item [" + meta.item.name + "]    -> .tsx",
        `return ${adv.js}`,
        undefined,
        true
      )
      .then((js) => {
        console.log(js);
        if (meta.mitem) {
          const adv = meta.mitem.get("adv");
          if (adv) adv.set("jsBuilt", js);
          if (item.adv) {
            item.adv.jsBuilt = js;
          }
          p.render();
        }
      });

    return null;
  }

  if (!(adv?.jsBuilt && adv?.js) && meta.comp) {
    return treeScopeEval(
      p,
      id,
      <>
        {_children}
        {componentOver}
      </>,
      `render(React.createElement("div",{...props},children));`,
      _scopeIndex
    );
  }

  if (adv) {
    if (adv.html) {
      const html = renderHTML(className, adv, elprop);
      if (html) return html;
    } else if (adv.jsBuilt && adv.js) {
      const el = treeScopeEval(
        p,
        id,
        <>
          {_children}
          {componentOver}
        </>,
        adv.jsBuilt,
        _scopeIndex
      );
      return el;
    }
  }

  if (item.type === "text") {
    return (
      <ETextInternal
        key={item.id}
        className={className}
        elprop={elprop}
        item={item}
        p={p}
        _children={item.html || item.text}
      />
    );
  }

  return (
    <div className={className} {...elprop}>
      {/* <pre className={"text-[9px] font-mono text-black"}>
        {item.id}-{item.name}
      </pre> */}
      {_children}
      {componentOver}
    </div>
  );
};

export const renderHTML = (className: string, adv: FNAdv, elprop: ElProp) => {
  if (adv.html) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: adv.html }}
        {...elprop}
      ></div>
    );
  }
  return null;
};
