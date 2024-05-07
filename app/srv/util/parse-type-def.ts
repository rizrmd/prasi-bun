import { parseFile, TsModuleDeclaration } from "@swc/core";
import { visit } from "woodpile";

type SingleExport = {
  type: "all" | "named" | "default";
  kind: "const" | "type";
  val: string;
};
export const parseTypeDef = async (path: string) => {
  const ast = await parseFile(path, { syntax: "typescript" });

  const exports = {} as Record<string, SingleExport[]>;
  visit(ast, {
    visitWithPath: {
      visitDecl(node, path) {
        const t = node as TsModuleDeclaration;
        if (t.type === "TsModuleDeclaration") {
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
                        const id = dec.id as unknown as Map<string, any>;
                        if (id.get("type") === "Identifier") {
                          exports[t.id.value].push({
                            type: "named",
                            kind: "const",
                            val: id.get("value"),
                          });
                        }
                      }
                    }
                  } else if (
                    body.declaration.type === "TsTypeAliasDeclaration"
                  ) {
                    if (body.declaration.id.type === "Identifier") {
                      exports[t.id.value].push({
                        type: "named",
                        kind: "type",
                        val: body.declaration.id.value,
                      });
                    }
                  }
                } else if (body.type === "ExportNamedDeclaration") {
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
  });

  const result = {} as Record<string, "const" | "type">;
  const traverse = (items: SingleExport[]) => {
    for (const item of items) {
      if (item.type === "all") {
        const found = exports[item.val];
        traverse(found);
      } else {
        result[item.val] = item.kind;
      }
    }
  };
  traverse(exports.index);
  return result;
};
