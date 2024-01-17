import { IMeta, PG } from "../../../../logic/ed-global";

export const extractExport = (p: PG, m: IMeta) => {
  const result = {} as Record<
    string,
    {
      type: "local" | "passprop" | "prop" | "scope";
      id: string;
      start: number;
      end: number;
      val: string;
    }
  >;

  const script = m.item.script;

  if (script?.local) {
    result[script.local.name] = {
      type: "local",
      id: m.item.id,
      start: script.local.start,
      end: script.local.end,
      val: script.local.value,
    };
  }

  if (script?.passprop) {
    for (const [k, v] of Object.entries(script.passprop)) {
      if (k === "key") continue;
      result[k] = {
        type: "passprop",
        id: m.item.id,
        start: v.start,
        end: v.end,
        val: v.value,
      };
    }
  }

  if (script?.props) {
    for (const [k, v] of Object.entries(script.props)) {
      result[k] = {
        type: "prop",
        id: m.item.id,
        start: 0,
        end: 0,
        val: v.value,
      };
    }
  }

  const props = m.item.component?.props;
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      result[k] = {
        type: "prop",
        id: m.item.id,
        start: 0,
        end: 0,
        val: v.value,
      };
    }
  }

  return result;
};
