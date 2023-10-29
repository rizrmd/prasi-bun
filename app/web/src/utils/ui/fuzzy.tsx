import uFuzzy from "@leeoniya/ufuzzy";
const uf = new uFuzzy({});

export const fuzzy = <T extends object>(
  array: T[],
  field: keyof T,
  search: string
) => {
  const [idxs, info] = uf.search(
    array.map((e) => e[field]) as string[],
    search
  );

  if (idxs && info) {
    const result = [] as T[];
    let ri = 0;
    for (const idx of idxs) {
      const item = array[idx];
      const range = [...info.ranges[ri++]];
      const val = item[field] as string;

      let cur = range.shift();
      let openBold = false;
      let text = "";
      for (let i = 0; i < val.length; i++) {
        if (typeof cur === "number") {
          if (i === cur) {
            if (!openBold) {
              text += `<b>`;
              openBold = true;
            } else {
              text += `</b>`;
              openBold = false;
            }
            cur = range.shift();
          }
          text += val[i];
        } else {
          text += val[i];
        }
      }
      if (openBold) {
        text += `</b>`;
      }

      const el = (
        <div
          className={css`
            b {
              background: #4c71f6;
              color: white;
            }
          `}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
      result.push({ ...item, [field]: el });
    }
    return result;
  }
  return array;
};
