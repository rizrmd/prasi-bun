import { fetchViaProxy } from "../../../../base/load/proxy";
import { PG } from "../../logic/ed-global";
import { reloadFileTree } from "./file-tree";

export const uploadFile = async (p: PG, files: File[]) => {
  const f = p.ui.popup.file;
  const promises: Promise<void>[] = [];

  f.upload.started = true;
  f.upload.progress = {};
  const pr = f.upload.progress;
  let folder_created = new Set<string>();
  for (const file of files) {
    let path = f.path;
    let filename = (file as any).path ? (file as any).path : file.name;

    if ((file as any).path) {
      const arr = (file as any).path.split("/") as string[];
      arr.pop();
      path = join(path, ...arr);
      const folder = arr.filter((e) => e).join("/");
      if (folder) {
        folder_created.add(folder);
      }
    }

    if (!pr[filename]) {
      pr[filename] = 0.1;
    }

    promises.push(
      p.script.api._raw(`/_upload?to=${path}`, file, (arg: any) => {
        pr[filename] = arg.progress;
        p.render();
      })
    );
  }

  await Promise.all(promises);
  alert(
    `\ 
Uploaded Finished:
 - ${files.length} files uploaded${
   folder_created.size > 0
     ? `\n ${[...folder_created]
         .map((e) => ` - Folder ${e} created.`)
         .join("\n")}`
     : ""
 }`
  );
  f.upload.progress = {};
  f.upload.started = false;
  p.render();
  reloadFileTree(p);
};

const join = (...arg: string[]) => {
  let arr: string[] = [];

  for (const s of arg) {
    s.split("/").forEach((e) => {
      arr.push(e);
    });
  }
  arr = arr.filter((e) => !!e.trim());

  return "/" + arg.join("/");
};
