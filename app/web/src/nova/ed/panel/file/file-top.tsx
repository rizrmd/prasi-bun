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
              key={`${part}-${idx}`}
              className={breadClass(p)}
              onClick={() => breadClick(p, "/" + npath.join("/"))}
            >
              {part}
            </div>
          );
        })}
      </div>
      <div className={cx("border-t flex justify-between")}>
        <div className="flex p-1">
          <div className={topClass(p)} {...getRootProps()}>
            <input {...getInputProps()} />
            Upload
          </div>
        </div>
        <div
          className={
            "flex border-l items-center justify-center min-w-[30px] cursor-pointer hover:bg-blue-50"
          }
          onClick={() => {
            f.preview = !f.preview;
            p.render();
          }}
        >
          {!f.preview ? <PreviewLeft /> : <PreviewRight />}
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

const icon_size = 17;
const PreviewRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={icon_size}
    height={icon_size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="lucide lucide-panel-right-close"
    viewBox="0 0 24 24"
  >
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <path d="M15 3v18M8 9l3 3-3 3"></path>
  </svg>
);

const PreviewLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={icon_size}
    height={icon_size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="lucide lucide-panel-right-open"
    viewBox="0 0 24 24"
  >
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <path d="M9 3v18M16 15l-3-3 3-3"></path>
  </svg>
);
