import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";

export const EdPane = ({
  type,
  min_size,
}: {
  type: "left" | "right";
  min_size: number;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <EdPaneResize
      minSize={min_size}
      size={p.ui.layout[type]}
      onResize={(size) => {
        p.ui.layout[type] = size;
        p.render();
      }}
      position={type}
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
  position: "left" | "right";
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
          className="fixed z-50 inset-0 cursor-ew-resize"
          onPointerOver={() => {
            local.inzone = true;
          }}
          onPointerMove={(e) => {
            local.result = Math.max(
              arg.minSize,
              local.size +
                (arg.position === "left"
                  ? e.clientX - local.sx
                  : local.sx - e.clientX)
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
            "w-[4px] absolute inset-0 -mx-[2px] cursor-ew-resize hover:bg-blue-800 transition-all duration-700",
            local.dragging && "z-40 bg-blue-800"
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
