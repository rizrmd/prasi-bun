import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";

export const EdPane = ({ type }: { type: "left" | "right" }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <EdPaneResize
      minSize={200}
      size={p.ui.layout[type]}
      onResize={(size) => {
        p.ui.layout.left = size;
        p.render();
      }}
      onDone={(size) => {
        localStorage.setItem("prasi-layout-" + type, size.toString());
      }}
    />
  );
};

const EdPaneResize = (arg: {
  minSize: number;
  size: number;
  onResize: (size: number) => void;
  onDone: (size: number) => void;
}) => {
  const local = useLocal({
    default: arg.size,
    dragging: false,
    sx: 0,
    size: 0,
    result: 0,
    inzone: false,
  });

  const stopDrag = () => {
    local.dragging = false;
    local.render();
    arg.onDone(arg.size);
  };

  return (
    <>
      {local.dragging && (
        <div
          className="absolute inset-0 cursor-ew-resize"
          onPointerOver={() => {
            local.inzone = true;
          }}
          onPointerMove={(e) => {
            local.result = Math.max(
              arg.minSize,
              local.size + e.clientX - local.sx
            );
            arg.onResize(local.result);
          }}
          onPointerUp={stopDrag}
          onPointerDown={stopDrag}
        ></div>
      )}
      <div className={cx("relative")}>
        <div
          className={cx(
            "w-[4px] absolute inset-0 -mx-[2px] cursor-ew-resize hover:bg-blue-400 transition-all duration-700",
            local.dragging && "bg-blue-400"
          )}
          onDoubleClick={() => {
            arg.onResize(local.default);
          }}
          onPointerUp={stopDrag}
          onPointerLeave={() => {
            setTimeout(() => {
              if (!local.inzone) {
                stopDrag();
              }
            }, 300);
          }}
          onPointerDown={(e) => {
            window.removeEventListener("blur", stopDrag);
            window.addEventListener("blur", stopDrag);

            e.preventDefault();
            e.stopPropagation();
            local.dragging = true;
            local.sx = e.clientX;
            local.size = arg.size;
            local.result = arg.size;
            local.render();
          }}
        ></div>
      </div>
    </>
  );
};