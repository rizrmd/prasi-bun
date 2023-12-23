import { NodeModel } from "@minoru/react-dnd-treeview";
import { useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, IMeta, PG, active } from "../../logic/ed-global";
import { fuzzy } from "../../../../utils/ui/fuzzy";

export const EdTreeSearch = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    sref: null as HTMLInputElement | null,
    focus: false,
    hover: false,
    cursor: null as number | null,
  });

  p.ui.tree.search_ref = local.sref;

  useEffect(() => {
    const input = local.sref;
    if (input) input.setSelectionRange(local.cursor, local.cursor);
  }, [local.sref, local.cursor, p.ui.tree.search]);

  return (
    <div
      className="flex flex-col items-stretch border-b"
      onMouseOver={() => {
        if (local.focus) {
          local.hover = true;
          local.render();
        }
      }}
      onMouseLeave={() => {
        local.hover = false;
        local.render();
      }}
    >
      <div className="flex items-stretch h-[24px] ">
        <input
          name="search-tree"
          ref={(ref) => {
            local.sref = ref;
          }}
          type="search"
          autoComplete="off"
          className={cx("flex-1 outline-none px-2 text-[13px] ")}
          placeholder="Search..."
          value={p.ui.tree.search}
          spellCheck={false}
          onInput={(e) => {
            local.cursor = e.currentTarget.selectionStart;
            p.ui.tree.search = e.currentTarget.value;
            p.render();
          }}
          onFocus={() => {
            local.focus = true;
            local.render();
          }}
          onBlur={() => {
            if (!local.hover && !p.ui.tree.search) {
              local.focus = false;
              local.render();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter") {
              const first = document.querySelector(
                ".tree-item:first-child"
              ) as HTMLInputElement;
              if (first) first.focus();
            }
          }}
        />
      </div>
      {(local.focus || local.hover || p.ui.tree.search) && (
        <div className="p-1 bg-white text-xs border-t flex space-x-1 justify-between">
          <div className="flex space-x-1">
            {Object.entries(p.ui.tree.search_mode).map(([name, active]) => {
              return (
                <div
                  className={cx(
                    "px-1 cursor-pointer rounded-sm border-blue-500 border",
                    active ? "bg-blue-500 text-white" : "hover:bg-blue-100"
                  )}
                  onClick={() => {
                    (p.ui.tree.search_mode as any)[name] = !active;
                    local.render();
                    local.sref?.focus();
                  }}
                  key={name}
                >
                  {name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const doTreeSearch = (p: PG) => {
  let tree: Record<string, { idx: number; node: NodeModel<IMeta> }> = {};

  if (p.ui.tree.search_mode.Name) {
    const found = fuzzy(p.page.tree, "text", p.ui.tree.search);

    let i = 0;
    for (const row of found) {
      if (row.data) {
        tree[row.id] = { idx: i++, node: { ...row, parent: "root" } };
      }
    }
  }

  const search = p.ui.tree.search.toLowerCase();
  let i = 0;

  let ptree = p.page.tree;
  if (active.comp_id && p.comp.list[active.comp_id]?.tree) {
    ptree = p.comp.list[active.comp_id].tree;
  }

  for (const row of ptree) {
    const item = row.data?.item;
    if (item) {
      const js = item.adv?.js;
      if (js) {
        if (p.ui.tree.search_mode.JS) {
          if ((js as string).toLowerCase().includes(search)) {
            tree[item.id] = { idx: i++, node: { ...row, parent: "root" } };
          }
        }
      }
      const css = item.adv?.css;
      if (css) {
        if (p.ui.tree.search_mode.CSS) {
          if (css.toString().toLowerCase().includes(search)) {
            tree[item.id] = { idx: i++, node: { ...row, parent: "root" } };
          }
        }
      }

      const html = item.adv?.html;
      if (html) {
        if (p.ui.tree.search_mode.HTML) {
          if (html.toString().toLowerCase().includes(search)) {
            tree[item.id] = { idx: i++, node: { ...row, parent: "root" } };
          }
        }
      }
    }
  }

  return Object.values(tree)
    .sort((a, b) => a.idx - b.idx)
    .map((e) => e.node);
};
