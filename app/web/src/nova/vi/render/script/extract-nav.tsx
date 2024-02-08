import { createStore } from "idb-keyval";
import { VG } from "../global";

const store = createStore(`prasi-cache`, `prasi-cache-store`);
export const nav = { timeout: null as any, store };

export const extractNavigate = (
  vi: { page: VG["page"]; on_nav_loaded?: VG["on_preload"] },
  str: string
) => {
  const found_nav = [
    ...findBetween(str, `navigate(`, `)`),
    ...findBetween(str, `href = `, `;`),
  ];

  const page_id = vi.page.cur.id;
  if (!vi.page.navs[page_id]) {
    vi.page.navs[page_id] = new Set();
  }

  for (const url of found_nav) {
    vi.page.navs[page_id].add(url);
  }

  clearTimeout(nav.timeout);
  nav.timeout = setTimeout(() => {
    if (vi.on_nav_loaded) {
      vi.on_nav_loaded({
        urls: Array.from(vi.page.navs[page_id]),
      });
    }
  }, 100);
};

const findBetween = (text: string, opener: string, closer: string) => {
  let i = 0;
  let last = 0;
  const founds: string[] = [];
  while (true) {
    const startIndex = text.indexOf(opener, i);
    last = i;
    if (startIndex >= 0) {
      const char = text[startIndex + opener.length];
      if (char === '"' || char === "'" || char === "`") {
        const end = text.indexOf(
          `${char}${closer}`,
          startIndex + opener.length + 1
        );
        const found = text.substring(startIndex + opener.length + 1, end);
        i = end + 2 + closer.length;
        founds.push(found);
      }
    }

    if (last === i) {
      break;
    }
  }
  return founds;
};
