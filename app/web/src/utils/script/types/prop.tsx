import trim from "lodash.trim";
import { isValidElement } from "react";

export const extractProp = (prop: {
  values: Record<string, any>;
  types: Record<string, string>;
}) => {
  const propTypes: string[] = [];
  const props: Record<string, { val?: any; type?: string }> = {};

  if (prop) {
    if (prop.values) {
      for (const [k, v] of Object.entries(prop.values)) {
        if (!props[k]) {
          props[k] = {};
        }

        if (typeof v === "function") {
          if (isFunctionalComponent(v)) {
            props[k].type = "React.FC";
          } else if (isClassComponent(v)) {
            props[k].type = "React.Component";
          } else {
            props[k].type = "any";
          }
        } else if (v) {
          if (typeof v === "object" && v._jsx) {
            props[k].type = "React.ReactElement;";
          } else if (!!v.render && typeof v.$$typeof === "symbol") {
            props[k].type = "React.FC<Record<string,any> & {ref?:any}>";
          } else {
            props[k].val = v;
          }
        }
      }
    }
  }

  if (prop.types) {
    for (const [k, v] of Object.entries(prop.types)) {
      if (!props[k]) {
        props[k] = {};
      }
      props[k].type = v;
    }
  }

  for (const [k, v] of Object.entries(props)) {
    if (v.type) {
      if (k.startsWith("_raw")) {
        propTypes.push(v.type);
      } else {
        let const_or_type = "const";
        let str = v.type;
        if (v.type.startsWith("type:")) {
          str = v.type.substring("type:".length);
          const_or_type = "type";
        }
        propTypes.push(`${const_or_type} ${k}: ${trim(str, "; \n")};`);
      }
    } else if (v.val) {
      if (typeof v.val === "object" && isValidElement(v.val)) {
        propTypes.push(`const ${k}: ReactElement;`);
      } else {
        try {
          let val = v.val;

          if (typeof val === "object") {
            if (typeof val.render === "function") {
              val = { ...val, render: () => {} };
            }

            propTypes.push(`const ${k}: ${recurseTypes(val)};`);
          } else {
            propTypes.push(`const ${k}: string;`);
          }
        } catch (e) {}
      }
    }
  }

  return propTypes;
};

function recurseTypes(object: any) {
  const result: string[] = [];
  if (typeof object === "object") {
    if (object === null) return "null";
    if (Array.isArray(object)) {
      return `any[]`;
    }

    for (const [k, v] of Object.entries(object)) {
      result.push(
        `${k}: ${typeof v === "object" && v ? recurseTypes(v) : typeof v}`
      );
    }

    return `{
  ${result.join(";\n  ")}
}`;
  }
  return typeof object;
}

function isFunctionalComponent(Component: any) {
  return (
    typeof Component === "function" && // can be various things
    !(
      (
        Component.prototype && // native arrows don't have prototypes
        Component.prototype.isReactComponent
      ) // special property
    )
  );
}

function isClassComponent(Component: any) {
  return !!(
    typeof Component === "function" &&
    Component.prototype &&
    Component.prototype.isReactComponent
  );
}
