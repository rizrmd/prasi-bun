import { parseFile } from "@swc/core";
import BaseVisitor from "./base-visitor";
import { Node, SimpleVisitors } from "./types";
import { simple as acornSimpleWalk } from "acorn-walk";

type SingleExport = {
  type: "all" | "named" | "default";
  kind: "const" | "type";
  val: string;
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
                }
              } else if (body.type === "ExportNamedDeclaration") {
                if (body.source?.type === "StringLiteral") {
                  const ex = exports[body.source.value];
                  if (ex) {
                    for (const s of body.specifiers) {
                      if (s.type === "ExportSpecifier") {
                        if (s.exported) {
                          const found = ex.find(
                            (e) => e.val === s.exported?.value
                          );
                          if (found) {
                            exports[t.id.value].push(found);
                          }
                        } else if (s.orig) {
                          const found = ex.find((e) => e.val === s.orig?.value);
                          if (found) {
                            exports[t.id.value].push(found);
                          }
                        }
                      }
                    }
                  }
                } else {
                  for (const s of body.specifiers) {
                    if (s.type === "ExportSpecifier") {
                      if (s.exported) {
                        exports[t.id.value].push({
                          type: "named",
                          kind: "const",
                          val: s.exported.value,
                        });
                      } else if (s.orig) {
                        exports[t.id.value].push({
                          type: "named",
                          kind: "const",
                          val: s.orig.value,
                        });
                      }
                    }
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
  const traverse = (items: SingleExport[]) => {
    if (typeof items === "object") {
      for (const item of items) {
        if (item.type === "all") {
          const found = exports[item.val];
          traverse(found);
        } else {
          result[item.val] = item.kind;
        }
      }
    }
  };
  traverse(exports.index);
  return result;
};
