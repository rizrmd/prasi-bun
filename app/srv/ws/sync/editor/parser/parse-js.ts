import recast from "recast";
import babel from "recast/parsers/babel-ts";

export type ParsedScope = Exclude<ReturnType<typeof parseJs>, undefined>;

export const parseJs = (code?: string, show_error?: boolean) => {
  if (!code) return undefined;
  const local = { name: "", value: "", start: 0, end: 0 };
  const passprop: Record<
    string,
    { value: string; start: number; end: number }
  > = {};
  const result = {} as {
    local?: typeof local | undefined;
    passprop?: typeof passprop | undefined;
    props?: Record<string, { value: string; valueBuilt: string; fn?: any; visible?: boolean }>;
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
                  attr.value.expression.loc &&
                  Array.isArray(attr.value.expression.properties) &&
                  attr.value.expression.properties.length > 0
                ) {
                  const loc = attr.value.expression.loc as any;
                  const start = attr.value.expression.properties[0].loc
                    ?.start as any;
                  const end = attr.value.expression.properties[
                    attr.value.expression.properties.length - 1
                  ].loc?.end as any;

                  if (typeof start === "number" && typeof end === "number") {
                    local.value = code.substring(start, end);
                    local.start = start;
                    local.end = end;
                  }

                  if (typeof start === "object" && typeof end === "object") {
                    local.value = `{${code.substring(start.index, end.index)}}`;
                    local.start = loc.start.index;
                    local.end = loc.end.index;
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
                  start: 0,
                  end: 0,
                };
                if (attr.value) {
                  if (
                    attr.value.type === "JSXExpressionContainer" &&
                    attr.value.expression.loc
                  ) {
                    const loc = attr.value.expression.loc as any;
                    passprop[attr.name.name] = {
                      value: code.substring(loc.start.index, loc.end.index),
                      start: loc.start.index,
                      end: loc.end.index,
                    };
                  } else if (attr.value.loc) {
                    const loc = attr.value.loc as any;
                    passprop[attr.name.name] = {
                      value: code.substring(loc.start.index, loc.end.index),
                      start: loc.start.index,
                      end: loc.end.index,
                    };
                  }
                }
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
