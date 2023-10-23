import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, EdMeta, PG } from "../../logic/ed-global";
import { NodeModel } from "@minoru/react-dnd-treeview";

import uFuzzy from "@leeoniya/ufuzzy";
import { useEffect, useState } from "react";
const uf = new uFuzzy({});

export const EdTreeSearch = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    sref: null as HTMLInputElement | null,
    focus: false,
    hover: false,
    cursor: null as number | null,
  });

  useEffect(() => {
    const input = local.sref;
    if (input) input.setSelectionRange(local.cursor, local.cursor);
  }, [local.sref, local.cursor, p.ui.tree.search]);

  return (
    <div className="flex items-stretch h-[24px] border-b">
      <input
        name="search"
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
      />
    </div>
  );
};

export const doTreeSearch = (p: PG) => {
  let tree: NodeModel<EdMeta>[] = [];
  const [idxs, info] = uf.search(
    p.page.tree.map((e) => e.text),
    p.ui.tree.search
  );
  if (idxs && info) {
    let i = 0;
    for (const idx of idxs) {
      const item = p.page.tree[idx];
      const range = info.ranges[i++];
      let text = "";

      let cur = range.shift();
      let open = true;
      for (let i = 0; i < item.text.length; i++) {
        if (typeof cur === "number") {
          if (i === cur) {
            if (open) {
              text += `<b>`;
              open = false;
            } else {
              text += `</b>`;
              open = true;
            }
            cur = range.shift();
          }
          text += item.text[i];
        } else {
          text += item.text[i];
        }
      }
      const el = (
        <div
          className={css`
            b {
              font-weight: bold;
              color: #df9100;
              text-decoration: underline;
            }
          `}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
      tree.push({
        ...item,
        parent: "root",
        data: item.data
          ? {
              ...item.data,
              el,
            }
          : undefined,
      });
    }
  }
  return tree;
};
