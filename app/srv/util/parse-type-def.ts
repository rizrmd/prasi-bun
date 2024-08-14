import { parseFile } from "@swc/core";
import BaseVisitor from "./base-visitor";
import { Node, SimpleVisitors } from "./types";
import { simple as acornSimpleWalk } from "acorn-walk";

type SingleExport = {
  type: "all" | "named" | "default";
  kind: "const" | "type";
  val: string;
  as?: string;
  from?: string;
};

function simple<T = unknown>(
  ast: Node,
  visitors: SimpleVisitors<T>,
  baseVisitor = new BaseVisitor(),
  state?: T
) {
  try {
    // @ts-expect-error (acorn-walk ast nodes have start/end instead of span)
    acornSimpleWalk<T>(ast, visitors, baseVisitor, state);
  } catch (e) {
    console.log(e);
  }
}

export const parseTypeDef = async (path: string) => {
  const ast = await parseFile(path, { syntax: "typescript" });
  const exports = {} as Record<string, SingleExport[]>;

  simple(
    ast,
    {
      TsModuleDeclaration(t) {
        if (t.body) {
          exports[t.id.value] = [];
          if (Array.isArray(t.body.body)) {
            for (const body of t.body.body) {
              if (body.type === "ExportAllDeclaration") {
                exports[t.id.value].push({
                  type: "all",
                  kind: "const",
                  val: body.source.value,
                });
              } else if (body.type === "ExportDeclaration") {
                if (body.declaration.type === "FunctionDeclaration") {
                  exports[t.id.value].push({
                    type: "named",
                    kind: "const",
                    val: body.declaration.identifier.value,
                  });
                } else if (body.declaration.type === "VariableDeclaration") {
                  for (const dec of body.declaration.declarations) {
                    if (dec.type === "VariableDeclarator") {
                      if (dec.id.type === "Identifier") {
                        exports[t.id.value].push({
                          type: "named",
                          kind: "const",
                          val: dec.id.value,
                        });
                      }
                    }
                  }
                } else if (body.declaration.type === "TsTypeAliasDeclaration") {
                  if (body.declaration.id.type === "Identifier") {
                    exports[t.id.value].push({
                      type: "named",
                      kind: "type",
                      val: body.declaration.id.value,
                    });
                  }
                } else if (body.declaration.type === "TsInterfaceDeclaration") {
                  if (body.declaration.id.type === "Identifier") {
                    exports[t.id.value].push({
                      type: "named",
                      kind: "type",
                      val: body.declaration.id.value,
                    });
                  }
                } else {
                  // console.log(
                  //   "export-declaration",
                  //   Object.keys(body),
                  //   body.declaration.type
                  // );
                }
              } else if (body.type === "ExportNamedDeclaration") {
                let exported = false;

                if (body.source?.type === "StringLiteral") {
                  const ex = exports[body.source.value];
                  if (ex) {
                    for (const s of body.specifiers) {
                      if (s.type === "ExportSpecifier") {
                        if (s.exported && s.exported?.value) {
                          const found = ex.find(
                            (e) => e.val === s.exported?.value
                          );
                          if (found) {
                            exports[t.id.value].push(found);
                            exported = true;
                          } else {
                            exports[t.id.value].push({
                              kind: "const",
                              type: "named",
                              val: s.exported.value,
                            });
                            exported = true;
                          }
                        } else if (s.orig) {
                          const found = ex.find((e) => e.val === s.orig?.value);
                          if (found) {
                            exports[t.id.value].push(found);
                            exported = true;
                          }
                        }
                      }
                    }
                  } else if (body.specifiers) {
                    const kind = body.typeOnly ? "type" : "const";

                    for (const s of body.specifiers) {
                      if (s.type === "ExportSpecifier" && s.orig) {
                        exports[t.id.value].push({
                          kind,
                          type: "named",
                          val: s.orig.value,
                          as: s.exported?.value,
                          from: body.source?.value,
                        });
                        exported = true;
                      } else if (
                        s.type === "ExportNamespaceSpecifier" &&
                        s.name
                      ) {
                        exports[t.id.value].push({
                          kind,
                          type: "named",
                          val: s.name.value,
                        });
                        exported = true;
                      }
                    }
                  }
                  if (!exported) {
                    console.log("export-named-declaration", body);
                  }
                } else {
                  let exported = false;

                  for (const s of body.specifiers) {
                    if (s.type === "ExportSpecifier") {
                      if (s.exported) {
                        exports[t.id.value].push({
                          type: "named",
                          kind: "const",
                          val: s.exported.value,
                        });
                        exported = true;
                      } else if (s.orig) {
                        exports[t.id.value].push({
                          type: "named",
                          kind: "const",
                          val: s.orig.value,
                        });
                        exported = true;
                      }
                    }
                  }

                  if (!exported) {
                    console.log("export-named-declaration", Object.keys(body));
                  }
                }
              }
            }
          }
        }
      },
    },
    undefined
  );

  const result = {} as Record<string, "const" | "type">;

  const re_import_from_node: string[] = [];
  const traverse = (items: SingleExport[]) => {
    if (typeof items === "object") {
      for (const item of items) {
        if (item.from) {
          if (!exports[item.from]) {
            re_import_from_node.push(item.from);
          }
        }
        if (item.type === "all") {
          const found = exports[item.val];
          traverse(found);
        } else {
          if (item.as) {
            result[item.as] = item.kind;
          } else {
            result[item.val] = item.kind;
          }
        }
      }
    }
  };
  traverse(exports.index);

  return result;
};
