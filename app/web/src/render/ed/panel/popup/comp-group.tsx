import { useGlobal } from "web-utils";
import { Menu, MenuItem } from "../../../../utils/ui/context-menu";
import { EDGlobal } from "../../logic/ed-global";
import { useEffect } from "react";
import { Loading } from "../../../../utils/ui/loading";

export const EdPopCompGroup = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  useEffect(() => {
    (async () => {
      if (p.ui.popup.comp_group) {
        if (!p.comp.group[p.site.id]) {
          p.comp.group[p.site.id] = await p.sync.comp.group(p.site.id);
        }
        p.render();
      }
    })();
  }, [p.ui.popup.comp_group]);

  if (!p.ui.popup.comp_group) return null;
  const pop = p.ui.popup.comp_group;
  const group = p.comp.group[p.site.id];
  return (
    <Menu
      mouseEvent={pop.mouse_event}
      onClose={() => {
        p.ui.popup.comp_group = null;
        p.render();
        if (pop.on_close) pop.on_close();
      }}
    >
      <MenuItem
        disabled
        label={
          !group ? (
            <div className="bg-white relative  w-[150px] h-[20px]">
              <div className="absolute inset-0 -mx-[10px] -my-[2px]">
                <Loading />
              </div>
            </div>
          ) : (
            <div className="text-slate-500">Choose Component Group:</div>
          )
        }
      />
      {Object.values(group || {})
        .filter((g) => g.name !== "__TRASH__")
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((g) => (
          <MenuItem
            onClick={() => {
              p.ui.popup.comp_group?.on_pick?.(g.id);
            }}
            label={<div className="pl-2">{g.name}</div>}
            key={g.id}
          />
        ))}
    </Menu>
  );
};
