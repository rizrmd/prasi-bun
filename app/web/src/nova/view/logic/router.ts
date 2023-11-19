import { VG } from "./global";

export const preload = async (p: VG, pathname: string) => {
  //TODO
};

export const extractNavigate = (str: string) => {
  return [
    ...findBetween(str, `navigate(`, `)`),
    ...findBetween(str, `href = `, `;`),
  ];
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
