import { useGlobal } from "web-utils";
import { EDGlobal, PG } from "../../logic/ed-global";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "./file-upload";

export const EdFileTop = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const f = p.ui.popup.file;
  const paths = f.path.split("/").filter((e) => e);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => uploadFile(p, files),
    noDrag: true,
  });

  return (
    <div className={cx("border-b flex flex-col items-stretch")}>
      <div className={cx("flex p-1")}>
        <div className={breadClass(p)} onClick={() => breadClick(p, "/")}>
          /
        </div>
        {paths.map((part, idx) => {
          const npath: string[] = [];
          for (let i = 0; i <= idx; i++) npath.push(paths[i]);
          return (
            <div
              key={part}
              className={breadClass(p)}
              onClick={() => breadClick(p, "/" + npath.join("/"))}
            >
              {part}
            </div>
          );
        })}
      </div>
      <div className={cx("p-1 border-t flex")}>
        <div className={topClass(p)} {...getRootProps()}>
          <input {...getInputProps()} />
          Upload
        </div>
      </div>
    </div>
  );
};

const breadClick = (p: PG, path: string) => {
  p.ui.popup.file.path = path;
  p.render();
};

const breadClass = (p: PG, className?: string) =>
  cx("border px-2 mr-1 rounded-sm cursor-pointer hover:bg-blue-50", className);

const topClass = (p: PG, className?: string) =>
  cx(
    "border px-2 mr-1 rounded-sm cursor-pointer hover:bg-blue-100 hover:text-blue-700 border-slate-600 hover:border-blue-600 ",
    className
  );
