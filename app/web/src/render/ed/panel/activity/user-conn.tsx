import { useGlobal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";
import { useEffect } from "react";
import { Tooltip } from "../../../../utils/ui/tooltip";
import tinycolor from "tinycolor2";

export const EdUserConn = ({ client_ids }: { client_ids: string[] }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  useEffect(() => {
    client_ids.forEach((e) => {
      if (!p.clients[e]) {
        p.sync.client.info(client_ids).then((res) => {
          p.clients = { ...p.clients, ...res };
          p.render();
        });
      }
    });
  }, [client_ids]);

  return (
    <>
      {client_ids.map((e) => {
        const bg = tinycolor(stringToColour(e)).darken(20).desaturate(30).toString();
        const fg = "#ffffff";
        return (
          <Tooltip
            delay={0}
            className={cx(
              "flex items-center px-[3px] mx-[3px] rounded-sm cursor-default h-[20px] leading-3 hover:opacity-50",
              css`
                background: ${bg};
                color: ${fg};
              `
            )}
            key={e}
            content={<div>Connetion ID: {e.substring(19).toUpperCase()}</div>}
          >
            <div className="flex space-x-[2px] items-center">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
                }}
              ></div>
              <div>{p.clients[e]?.username}</div>
            </div>
          </Tooltip>
        );
      })}
    </>
  );
};

const stringToColour = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, "0");
  }
  return colour;
};
