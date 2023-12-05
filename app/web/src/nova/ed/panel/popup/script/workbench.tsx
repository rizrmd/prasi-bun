import { useGlobal } from "web-utils";
import { ScriptMonaco } from "./monaco";
import { EDGlobal, active } from "../../../logic/ed-global";

export const ScriptWorkbench = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div className="flex flex-1 items-stretch">
      <div className="flex flex-1 flex-col ">
        <div className="flex p-2 border-b space-x-2">
          {p.ui.popup.script.type === "prop" ? (
            <></>
          ) : (
            <>
              {[
                { type: "js", color: "#e9522c" },
                { type: "css", color: "#188228" },
                { type: "html", color: "#2c3e83" },
              ].map((e) => {
                return (
                  <div
                    key={e.type}
                    className={cx(
                      css`
                        color: ${e.color};
                        border: 1px solid ${e.color};
                      `,
                      "uppercase text-white text-[12px] cursor-pointer transition-all hover:opacity-100 w-[40px] text-center",
                      p.ui.popup.script.mode === e.type
                        ? css`
                            background: ${e.color};
                            color: white;
                          `
                        : "opacity-30"
                    )}
                    onClick={() => {
                      p.ui.popup.script.mode = e.type as any;
                      p.render();
                    }}
                  >
                    {e.type}
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="relative flex flex-1">
          <ScriptMonaco />
        </div>
      </div>
    </div>
  );
};
