import { EdNpmImport } from "./npm-import";

export const EdNpmPopup = () => {
  return (
    <div className="w-[900px] h-[400px] flex items-stretch -mx-[8px] -my-[3px]">
      <EdNpmImport mode="site" />
      <div className="border-r"></div>
      <EdNpmImport mode="page" />
    </div>
  );
};
