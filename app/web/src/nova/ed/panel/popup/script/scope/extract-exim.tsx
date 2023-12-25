import { IMeta, PG } from "../../../../logic/ed-global";
import hash_sum from "hash-sum";

export const extractExportImport = (
  p: PG,
  m: IMeta,
  imports: Record<string, string>
) => {
  const def = m.scope.def;
  let result: {
    local?: ReturnType<typeof extractLocal>;
    passprop?: ReturnType<typeof extractPassProp>;
    props?: ReturnType<typeof extractProps>;
    content?: ReturnType<typeof extractContent>;
  } = {};

  if (def) {
    if (def.local) {
      result.local = extractLocal(p, m, def, imports);
    }
    if (def.passprop) {
      result.passprop = extractPassProp(p, m, def, imports);
    }
    if (def.props) {
      result.props = extractProps(p, m, def, imports);
    }
  }
  result.content = extractContent(p, m, result, "js");

  return result;
};

export const genImports = (imports: Record<string, string>) => {
  return Object.entries(imports)
    .map(([k, v]) => {
      return `import { ${k} } from "${v}";`;
    })
    .join("\n");
};

const extractContent = (
  p: PG,
  m: IMeta,
  res: {
    local?: ReturnType<typeof extractLocal>;
    passprop?: ReturnType<typeof extractPassProp>;
    props?: ReturnType<typeof extractProps>;
  },
  mode: "js"
) => {
  if (mode === "js") {
    const local = res.local?.[Object.keys(res.local)[0]];
    const passprop = Object.entries(res.passprop || {});
    const props = Object.entries(res.props || {});
    let loc = {
      item_id: m.item.id,
      comp_id: m.parent?.comp_id,
      type: "content",
    };
    const src = `
${commentize("loc", loc)}
${local ? `import { ${local.names.join(",")} } from "${local.filename}";` : ``}
${
  passprop.length > 0
    ? passprop.map(([k, v]) => {
        return `import { ${v.names.join(",")} } from "${v.filename}";`;
      })
    : ``
}
${
  props.length > 0
    ? props.map(([k, v]) => {
        return `import { ${v.names.join(",")} } from "${v.filename}";`;
      })
    : ``
}

export const _content = (
${commentize("value", null, m.item.adv?.js)}
)`;

    let filename = `ts:scope~content~${hash_sum(loc)}.tsx`;
    return { [filename]: { names: [], filename, src } };
  }
};

const extractLocal = (
  p: PG,
  m: IMeta,
  def: IMeta["scope"]["def"],
  imports: Record<string, string>
) => {
  if (def?.local) {
    let loc = {
      item_id: m.item.id,
      comp_id: m.parent?.comp_id,
      type: "local",
    };
    let filename = `ts:scope~${hash_sum(loc)}.d.ts`;
    return {
      [filename]: {
        names: [def.local.name],
        filename,
        src: `\
${commentize("loc", loc)}
${genImports(imports)}

const _local = ${commentize("value", null, def.local.value)};
export const ${def.local.name}: typeof _local & { render: ()=>void } = _local;
declare global {
  const ${commentize(
    "name",
    { old: def.local.name },
    def.local.name
  )}: typeof _local & { render: ()=>void };
}
`,
      },
    };
  }
};

const extractPassProp = (
  p: PG,
  m: IMeta,
  def: IMeta["scope"]["def"],
  imports: Record<string, string>
) => {
  if (def?.passprop) {
    let loc = {
      item_id: m.item.id,
      comp_id: m.parent?.comp_id,
      type: "passprop",
    };
    let filename = `ts:scope~${hash_sum(loc)}.d.ts`;

    const result = {
      filename,
      names: [] as string[],
      src: "",
    };

    const exports_global: string[] = [];
    const exports_const: string[] = [];
    for (const [name, v] of Object.entries(def.passprop)) {
      if (name !== "idx" && name !== "key") {
        result.names.push(name);
        exports_global.push(`const ${name} = ${v.value};`);
        exports_const.push(`export const ${name} = ${v.value}`);
      }
    }
    result.src = `\
${commentize("loc", loc)}
${genImports(imports)}
${exports_const.join("\n")}
declare global {
  ${exports_global.join("\n")}
}
`;

    return { [filename]: result };
  }
};

const extractProps = (
  p: PG,
  m: IMeta,
  def: IMeta["scope"]["def"],
  imports: Record<string, string>
) => {
  if (def?.props) {
    let loc = {
      item_id: m.item.id,
      comp_id: m.parent?.comp_id,
      type: "prop-instance",
    };
    let filename = `ts:scope~${hash_sum(loc)}.d.ts`;

    const result = {
      filename,
      names: [] as string[],
      src: "",
    };

    const exports_global: string[] = [];
    const exports_const: string[] = [];
    for (const [name, v] of Object.entries(def.props)) {
      if (name !== "idx" && name !== "key") {
        result.names.push(name);
        exports_global.push(`const ${name} = ${v.value};`);
        exports_const.push(`export const ${name} = ${v.value}`);
      }
    }
    result.src = `\
${commentize("loc", loc)}
${genImports(imports)}
${exports_const.join("\n")}
declare global {
  ${exports_global.join("\n")}
}
`;

    return { [filename]: result };
  }
};

const commentize = (name: string, arg: any, children?: string) => {
  let opening = arg
    ? `/*▸${name}${JSON.stringify(arg)
        .replace(/\//gi, "")
        .replace(/(\r\n|\n|\r)/gm, "")}`
    : `/*▸${name}`;

  if (!children) {
    return `${opening}${name}◂*/`;
  }
  return `\
${opening}*/${children}/*${name}◂*/`;
};
