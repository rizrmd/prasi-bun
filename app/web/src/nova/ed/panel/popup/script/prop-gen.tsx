import { useGlobal } from "web-utils";
import { EDGlobal, IMeta, active } from "../../../logic/ed-global";
import { Button } from "../../../../../utils/ui/form/Button";
import { IItem } from "../../../../../utils/types/item";

export const EdPropGen = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  let item = null as unknown as IItem;

  let meta = null as unknown as IMeta;
  if (active.comp_id) {
    const comp = p.comp.list[active.comp_id];
    if (comp && comp.meta) {
      meta = comp.meta[active.item_id];
      item = comp.meta[active.item_id].item;
    }
  } else {
    meta = p.page.meta[active.item_id];
    item = p.page.meta[active.item_id].item;
  }

  if (item && item.component?.id && meta) {
    const props = item.component.props;
    const { prop_name } = p.ui.popup.script;
    const prop = props[prop_name];

    const gen = {
      fn: undefined as undefined | (() => string | Promise<string>),
      suggestions: undefined as
        | undefined
        | (() => Promise<string[]> | string[]),
    };

    if (prop && prop.gen && prop.genBuilt) {
      try {
        const arg: any = {};
        if (meta.item.script?.props) {
          for (const [k, v] of Object.entries(meta.item.script?.props)) {
            eval(`arg.${k} = ${v.value}`);
          }
        }

        const gen_fn = new Function(
          ...Object.keys(arg),
          `return ${prop.genBuilt}`
        );
        const res = gen_fn(...Object.values(arg));

        if (res) {
          if (typeof res === "function") {
            gen.fn = res;
          } else if (Array.isArray(res)) {
            gen.suggestions = res[0];
            gen.fn = res[1];
          }
        }

        if (!res) {
          return;
        }
      } catch (e) {
        return;
      }

      if (gen.fn) {
        return (
          <div className="flex border-r mr-2">
            <div
              className="flex items-center border-l px-2 cursor-pointer hover:text-white hover:bg-blue-700"
              onClick={async () => {
                if (gen.fn) {
                  const fn_result = gen.fn();
                  let src = "";
                  if (
                    typeof fn_result === "object" &&
                    fn_result instanceof Promise
                  ) {
                    src = await fn_result;
                  } else {
                    src = fn_result;
                  }
                  if (p.script.do_edit) p.script.do_edit(src);
                }
              }}
            >
              <div className="mr-1">Generate</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
                }}
              ></div>
            </div>
          </div>
        );
      }
    }
  }

  return null;
};
