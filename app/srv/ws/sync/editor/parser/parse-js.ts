import recast from "recast";
import babel from "recast/parsers/babel-ts";

export type ParsedScope = Exclude<ReturnType<typeof parseJs>, undefined>;

export const parseJs = (code?: string) => {
  if (!code) return undefined;
  const local = { name: "", value: "", index: 0 };
  const passprop: Record<string, { value: string; index: number }> = {};
  const result = {} as {
    local?: typeof local | undefined;
    passprop?: typeof passprop | undefined;
    props?: Record<string, { value: string; fn?: any; visible?: boolean }>;
  };

  try {
    const ast = recast.parse(code, {
      parser: babel,
    });

    recast.visit(ast, {
      visitJSXOpeningElement({ node }) {
        if (node.name.type === "JSXIdentifier" && node.attributes) {
          if (node.name.name === "Local") {
            for (const attr of node.attributes) {
              if (
                attr.type === "JSXAttribute" &&
                attr.name.type === "JSXIdentifier"
              ) {
                if (
                  attr.name.name === "name" &&
                  attr.value?.type === "StringLiteral"
                ) {
                  local.name = attr.value.value;
                }

                if (
                  attr.name.name === "value" &&
                  attr.value &&
                  attr.value.type === "JSXExpressionContainer" &&
                  attr.value.expression.type === "ObjectExpression" &&
                  attr.value.expression.loc
                ) {
                  const loc = attr.value.expression.loc as any;
                  const start = attr.value.expression.properties[0].loc
                    ?.start as any;
                  const end = attr.value.expression.properties[
                    attr.value.expression.properties.length - 1
                  ].loc?.end as any;

                  if (
                    typeof start === "number" &&
                    typeof end === "number" &&
                    typeof loc.start.index === "number"
                  ) {
                    local.value = code.substring(start, end);
                    local.index = loc.start.index;
                  }

                  if (typeof start === "object" && typeof end === "object") {
                    local.value = `{${code.substring(start.index, end.index)}}`;
                    local.index = loc.start.index;
                  }
                }
              }
            }
          } else if (node.name.name === "PassProp") {
            for (const attr of node.attributes) {
              if (
                attr.type === "JSXAttribute" &&
                attr.name.type === "JSXIdentifier"
              ) {
                passprop[attr.name.name] = {
                  value: "0",
                  index: 0,
                };
                // if (attr.value) {
                //   if (
                //     attr.value.type === "JSXExpressionContainer" &&
                //     attr.value.expression.loc
                //   ) {
                //     const loc = attr.value.expression.loc as any;
                //     passprop[attr.name.name] = {
                //       value: code.substring(loc.start.index, loc.end.index),
                //       index: loc.start.index,
                //     };
                //   } else if (attr.value.loc) {
                //     const loc = attr.value.loc as any;
                //     passprop[attr.name.name] = {
                //       value: code.substring(loc.start.index, loc.end.index),
                //       index: loc.start.index,
                //     };
                //   }
                // }
              }
            }
          }
        }
        return true;
      },
    });

    if (local.name) {
      result.local = local;
    }
    if (Object.keys(passprop).length > 0) {
      result.passprop = passprop;
    }

    if (Object.keys(result).length > 0) {
      return result;
    }
  } catch (e) {
    // console.error(code, "\n", e);
  }
  return result;
};
