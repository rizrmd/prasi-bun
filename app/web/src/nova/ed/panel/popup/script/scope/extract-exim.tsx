import { IMeta, PG } from "../../../../logic/ed-global";

export const extractExportImport = (p: PG, m: IMeta, imports: string[]) => {
  let _export = {};

  const def = m.scope.def;
  if (def) {
    if (def.local) {
      const local = extractLocal(p, m, def, imports);
      if (local) {
        for (const [k, v] of Object.entries(local)) {
          v.names.forEach((n) =>
            imports.push(`import { ${n} } from "./${k}";`)
          );
        }
      }
    }
  }

  return _export;
};

const extractLocal = (
  p: PG,
  m: IMeta,
  def: IMeta["scope"]["def"],
  imports: string[]
) => {
  if (def?.local) {
    let loc = {
      item_id: m.item.id,
      comp_id: m.parent?.comp_id,
      type: "item",
    };
    let filename = `ts:scope~${JSON.stringify(loc)}.d.ts`;
    return {
      [filename]: {
        names: [def.local.name],
        src: `\
${imports.join("\n")}
type _local = ${def.local.value};
export const ${def.local.name}: _local & { render: () =>void };
    `,
      },
    };
  }
};

const extractPassProp = (
  p: PG,
  m: IMeta,
  def: IMeta["scope"]["def"],
  imports: string[]
) => {
  if (def?.passprop) {
    let loc = {
      item_id: m.item.id,
      comp_id: m.parent?.comp_id,
      type: "item",
    };
    let filename = `ts:scope~${JSON.stringify(loc)}.d.ts`;

    const result = {
      names: [] as string[],
      src: "",
    };

    const exports: string[] = [];
    for (const [e, v] of Object.entries(def.passprop)) {
      if (e !== "idx" && e !== "key") {
        result.names.push(e);
        exports.push(`export const ${e} = ${v.value};`);
      }
    }
    result.src = `\
${imports.join("\n")}
${exports.join("\n")}
`;

    return { [filename]: result };
  }
};

const extractProps = (
  p: PG,
  m: IMeta,
  def: IMeta["scope"]["def"],
  imports: string[]
) => {
  if (def?.passprop) {
    let loc = {
      item_id: m.item.id,
      comp_id: m.parent?.comp_id,
      type: "item",
    };
    let filename = `ts:scope~${JSON.stringify(loc)}.d.ts`;

    const result = {
      names: [] as string[],
      src: "",
    };

    const exports: string[] = [];
    for (const [e, v] of Object.entries(def.passprop)) {
      if (e !== "idx" && e !== "key") {
        result.names.push(e);
        exports.push(`export const ${e} = ${v.value};`);
      }
    }
    
    result.src = `\
${imports.join("\n")}
${exports.join("\n")}
`;

    return { [filename]: result };
  }
};
