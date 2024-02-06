import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorGlobal } from "../../../../logic/global";

export type ExportMobileConfig = {
  appId: string;
  name: string;
  url: string;
  android: boolean;
  ios: boolean;
  icon: string;
  splash: string;
};

const setting = {
  status: "loading" as
    | "loading"
    | "ready"
    | "building-android"
    | "building-ios"
    | "saving",
  config: null as null | ExportMobileConfig,
};

export const ExportMobileSetting: FC<{
  onLoad: (config: ExportMobileConfig) => Promise<void>;
}> = () => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({}, async () => {
    setting.config = await _api.export_mobile(p.site.id, "config");
    local.render();
  });

  return (
    <div className="flex flex-col select-none cursor-default border-b">
      <div className="flex items-stretch justify-between">
        <div className="p-2 flex-1 flex justify-between">
          <div>Export Mobile</div>
        </div>
        <div className="flex items-stretch">
          <div className="flex items-center border-l p-1 px-2 space-x-1">
            <div
              className={cx(
                setting.config?.android ? "text-green-800" : "text-slate-500",
                setting.config?.android && "cursor-pointer"
              )}
              onClick={async () => {
                if (setting.config?.android && confirm("Remove Android?")) {
                  setting.status = "building-android";
                  local.render();
                  setting.config = await _api.export_mobile(
                    p.site.id,
                    "remove-android"
                  );
                  setting.status = "ready";
                  local.render();
                }
              }}
            >
              {setting.config?.android ? <Check /> : <Uncheck />}
            </div>
            <div>Android</div>
            {setting.status !== "building-android" ? (
              <div
                className="hover:opacity-50 bg-green-500 text-white px-2 text-sm cursor-pointer"
                onClick={async () => {
                  setting.status = "building-android";
                  local.render();
                  setting.config = await _api.export_mobile(
                    p.site.id,
                    "build-android"
                  );
                  setting.status = "ready";
                  local.render();
                }}
              >
                {!setting.config?.android ? "Add" : "Rebuild"}
              </div>
            ) : (
              <div>...</div>
            )}
          </div>
          <div className="flex border-l items-center p-1 pr-2 space-x-1 ">
            <div
              className={cx(
                setting.config?.ios ? "text-blue-800" : "text-slate-500",
                setting.config?.ios && "cursor-pointer"
              )}
              onClick={async () => {
                if (setting.config?.ios && confirm("Remove IOS?")) {
                  setting.status = "building-ios";
                  local.render();
                  setting.config = await _api.export_mobile(
                    p.site.id,
                    "remove-ios"
                  );
                  setting.status = "ready";
                  local.render();
                }
              }}
            >
              {setting.config?.ios ? <Check /> : <Uncheck />}
            </div>
            <div>IOS</div>
            {setting.status !== "building-ios" ? (
              <div
                className="hover:opacity-50 bg-blue-500 text-white px-2 text-sm cursor-pointer"
                onClick={async () => {
                  setting.status = "building-ios";
                  local.render();
                  setting.config = await _api.export_mobile(
                    p.site.id,
                    "build-ios"
                  );
                  setting.status = "ready";
                  local.render();
                }}
              >
                {!setting.config?.ios ? "Add" : "Rebuild"}
              </div>
            ) : (
              <div>...</div>
            )}
          </div>
        </div>
      </div>

      {setting.config && (
        <>
          <div className="flex flex-row justify-between">
            <div
              className={cx(
                "flex flex-col flex-1",
                css`
                  input {
                    outline: none;
                    padding: 2px 5px;
                  }
                `
              )}
            >
              <Input
                render={local.render}
                title={"App ID"}
                name={"appId"}
                placeholder="com.app.name"
                site_id={p.site.id}
              />
              <Input
                render={local.render}
                title={"App Name"}
                name={"name"}
                placeholder="Your App Name"
                site_id={p.site.id}
              />
              <Input
                render={local.render}
                title={"App URL"}
                name={"url"}
                placeholder="https://"
                site_id={p.site.id}
              />
            </div>
            <div className="flex items-center justify-center p-2 border-l border-t">
              {setting.status === "saving" ? (
                "Saving..."
              ) : (
                <div
                  onClick={async () => {
                    setting.status = "saving";
                    local.render();
                    await _api.export_mobile(
                      p.site.id,
                      "set-config",
                      setting.config
                    );

                    if (setting.config?.android) {
                      setting.status = "building-android";
                      local.render();
                      await _api.export_mobile(p.site.id, "build-android");
                    }

                    if (setting.config?.ios) {
                      setting.status = "building-ios";
                      local.render();
                      await _api.export_mobile(p.site.id, "build-ios");
                    }

                    setting.status = "ready";
                    local.render();
                  }}
                  className="border border-blue-500 text-blue-500 px-2 cursor-pointer"
                >
                  Save Setting
                </div>
              )}
            </div>
          </div>
          {(setting.config?.android || setting.config?.ios) && (
            <div className="flex items-center justify-end p-2 border-t">
              <div className="flex flex-1 items-center space-x-2">
                <Img
                  name="icon"
                  render={local.render}
                  site_id={p.site.id}
                  text="1024px × 1024px"
                />
                <Img
                  name="splash"
                  render={local.render}
                  site_id={p.site.id}
                  text="2732px × 2732px"
                />
              </div>

              <div className="bg-blue-500 text-white hover:opacity-50  px-2 text-sm cursor-pointer flex space-x-1 py-1 items-center">
                <span>Download Project</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                  }}
                ></span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Input = (opt: {
  render: () => void;
  title: string;
  name: keyof ExportMobileConfig;
  placeholder: string;
  site_id: string;
}) => {
  if (!setting.config) return null;

  return (
    <div className="flex items-stretch border-t">
      <div className="border-r flex items-center px-2 w-[100px]">
        {opt.title}
      </div>
      <input
        value={(setting.config[opt.name] || "") as any}
        onChange={(e) => {
          if (setting.config)
            (setting.config as any)[opt.name] = e.currentTarget.value;
          opt.render();
        }}
        spellCheck={false}
        className="focus:bg-blue-50 flex-1"
        placeholder={opt.placeholder}
      />
    </div>
  );
};

const Img = (opt: {
  name: string;
  text: string;
  render: () => void;
  site_id: string;
}) => {
  const src = (setting.config as any)[opt.name];
  return (
    <div className=" w-[100px] h-[100px] border flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        {src && <img className="absolute inset-0" src={src} />}
      </div>
      <div className="h-[40px] overflow-hidden relative text-blue-500 border-t hover:opacity-50">
        <div className="absolute pointer-events-none inset-0 cursor-pointer  flex items-center justify-center text-center flex-col">
          <div>Upload {opt.name}</div>
          <div className="text-xs">{opt.text}</div>
        </div>
        <input
          type="file"
          onChange={async (e) => {
            if (e.currentTarget.files) {
              const res = await _api._upload(e.currentTarget.files[0]);
              (setting.config as any)[opt.name] = res;
              setting.status = "saving";
              opt.render();
              await _api.export_mobile(
                opt.site_id,
                "set-config",
                setting.config
              );

              setting.status = "ready";
              opt.render();
            }
          }}
          className={cx(
            "opacity-0 cursor-pointer absolute inset-0",
            css`
              cursor: pointer !important;
              font-size: 0;
            `
          )}
        />
      </div>
    </div>
  );
};

const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.5.877a6.623 6.623 0 100 13.246A6.623 6.623 0 007.5.877zM1.827 7.5a5.673 5.673 0 1111.346 0 5.673 5.673 0 01-11.346 0zm8.332-1.962a.5.5 0 00-.818-.576L6.52 8.972 5.357 7.787a.5.5 0 00-.714.7L6.227 10.1a.5.5 0 00.765-.062l3.167-4.5z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const Uncheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346z"
      clipRule="evenodd"
    ></path>
  </svg>
);
