import { IMeta, PG, active } from "../../../../logic/ed-global";
import { extractExportImport } from "./extract-exim";
import { defineScopeParent } from "./scope-parent";

export const defineScopeChildren = (
  p: PG,
  meta: IMeta,
  imports: Record<string, { usage_id: string; source_file: string }>
) => {
  const metas = active.comp_id
    ? p.comp.list[active.comp_id]?.meta
    : p.page.meta;

  const result = {} as Record<string, string>;
  let cur_id = meta.item.id;
  const childs = findChilds(metas, cur_id);
  for (const child of childs) {
    result[child.item.id] = `\
${Object.entries(imports)
  .map(([k, v]) => {
    return `import { ${k} } from "${v.source_file}";`;
  })
  .join("\n")}
    `;
  }
  return result;
};

const findChilds = (metas: Record<string, IMeta>, id: string) => {
  const childs = [] as IMeta[];
  for (const [k, v] of Object.entries(metas)) {
    if (v.parent?.id === id) {
      childs.push(metas[k]);
    }
  }
  return childs;
};
