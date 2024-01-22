import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EdLeft } from "./ed-left";
import { EdMid } from "./ed-mid";
import { EdRight } from "./ed-right";
import { EDGlobal } from "./logic/ed-global";
import { edInit } from "./logic/ed-init";
import { edRoute } from "./logic/ed-route";
import { edUndoManager } from "./logic/ed-undo";
import { EdMain } from "./panel/main/main";
import { EdPane } from "./panel/main/pane-resize";
import { EdPopApi } from "./panel/popup/api/api-server";
import { EdPopCode } from "./panel/popup/code/code";
import { EdPopCompGroup } from "./panel/popup/comp/comp-group";
import { EdPopComp } from "./panel/popup/comp/comp-popup";
import { EdPopPage } from "./panel/popup/page/page-popup";
import { EdPopScript } from "./panel/popup/script/pop-script";
import { EdPopSite } from "./panel/popup/site/site-popup";

export const EdBase = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  edUndoManager(p);

  if (p.status === "init") {
    edInit(p);
  }

  edRoute(p);

  if (p.status === "load-site") {
    return <Loading note={`page-${p.status}`} />;
  }
  if (p.status === "site-not-found" || p.status === "page-not-found") {
    return (
      <div className="flex fixed inset-0 items-center justify-center">
        {p.status === "site-not-found" ? "Site not found" : "Page not found"}
      </div>
    );
  }

  return (
    <div className={cx("flex flex-col flex-1", style)}>
      <div className="flex justify-between"></div>
      <div className="flex flex-1 items-stretch">
        <EdLeft />
        <EdPane type="left" min_size={200} />
        <div className="flex flex-1 flex-col items-stretch">
          <EdMid />
          <div
            className={cx(
              "flex flex-1 items-stretch",
              p.mode === "mobile" ? mobileCSS : "bg-white"
            )}
          >
            <EdMain />
            <EdPane type="right" min_size={240} />
            <EdRight />
          </div>
        </div>
      </div>
      <>
        <EdPopCode />
        <EdPopScript />
        <EdPopSite />
        <EdPopApi />
        <EdPopPage />
        <EdPopCompGroup />
        <EdPopComp />
      </>
    </div>
  );
};

const style = css`
  .toolbar-box {
    display: flex;
    align-items: stretch;
    border-left: 1px solid #ececeb;
    border-right: 1px solid #ececeb;
    margin: 0px 0px 0px 5px;

    .label {
      display: flex;
      user-select: none;
      align-items: center;
      font-size: 10px;
      margin-top: 1px;
      color: #999;
      text-transform: uppercase;
    }

    .items {
      display: flex;
      align-items: stretch;
      margin-left: 5px;
      color: #555;
      border-left: 1px solid transparent;

      .item {
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        border-right: 1px solid transparent;
        padding: 5px;
        border-radius: 0px;

        &:hover {
          background: #ececeb;
        }

        &.disabled {
          color: #ccc;
          cursor: default;
        }
      }

      .item:last-child {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }
    }

    &.no-label {
      padding-left: 0px;
      margin-left: 0px;
      .items {
        margin-left: 0px;
      }
    }

    &:hover {
      border: 1px solid black;

      .items {
        color: #111;
        border-left: 1px solid #ececeb;
        .item {
          border-right: 1px solid #ececeb;
        }
      }
    }
  }
`;

export const mobileCSS = css`
  background-color: white;
  background-image: linear-gradient(45deg, #fafafa 25%, transparent 25%),
    linear-gradient(-45deg, #fafafa 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #fafafa 75%),
    linear-gradient(-45deg, transparent 75%, #fafafa 75%);

  background-size: 20px 20px;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0px;
`;
