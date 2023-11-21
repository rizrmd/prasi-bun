import recast from "recast";
import babel from "recast/parsers/babel-ts";
export const parseJs = (code: string) => {
  const ast = recast.parse(code, {
    parser: babel,
  });

  const local = { name: "", value: "", index: 0 };
  const passprop: any = {};
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
                local.value = code.substring(loc.start.index, loc.end.index);
                local.index = loc.start.index;
              }
            }
          }
        } else if (node.name.name === "PassProp") {
          for (const attr of node.attributes) {
            if (
              attr.type === "JSXAttribute" &&
              attr.name.type === "JSXIdentifier"
            ) {
              if (
                attr.name.name === "value" &&
                attr.value &&
                attr.value.type === "JSXExpressionContainer" &&
                attr.value.expression.loc
              ) {
                const loc = attr.value.expression.loc as any;
                passprop[attr.name.name] = {
                  value: code.substring(loc.start.index, loc.end.index),
                  index: loc.start.index,
                };
              }
            }
          }
        }
      }
      return true;
    },
  });

  const result = {} as {
    local: typeof local | undefined;
    passprop: typeof passprop | undefined;
  };
  if (!local.name) {
    result.local = local;
  }
  if (Object.keys(passprop).length > 0) {
    result.passprop = passprop;
  }

  if (Object.keys(result).length > 0) {
    return result;
  }
};
