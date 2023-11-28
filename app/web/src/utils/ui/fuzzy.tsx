import uFuzzy from "@leeoniya/ufuzzy";
import get from "lodash.get";
import set from "lodash.set";
const uf = new uFuzzy({});

export const fuzzy = <T extends object>(
  array: T[],
  field: keyof T | { pk: keyof T; search: (keyof T)[] },
  search: string
) => {
  if (typeof field === "string") {
    return fuzzySingle(array, field, search);
  }
  const result: Record<any, { row: any; idx: number }> = {};

  if (typeof field === "object") {
    for (const f of field.search) {
      const res = fuzzySingle(array, f, search);
      let idx = 0;
      for (const row of res) {
        idx++;
        const id = row[field.pk] as any;
        if (!result[id]) {
          result[id] = { idx, row };
        } else {
          set(result[id].row, f, get(row, f));
        }
      }
    }
  }
  const final: any = {};
  for (const i of Object.values(result)) {
    final[i.idx] = i.row;
  }
  return Object.values(final) as T[];
};

const fuzzySingle = <T extends object>(
  array: T[],
  field: keyof T,
  search: string
) => {
  const [idxs, info] = uf.search(
    [...array.map((e) => get(e, field) || "")] as string[],
    search
  );

  if (idxs && info) {
    const result = [] as T[];
    let ri = 0;
    for (const idx of idxs) {
      const item = array[idx];
      const range = [...info.ranges[ri++]];
      const val = get(item, field) as string;

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
      const newitem = { ...item };
      set(newitem, field, el);
      result.push(newitem);
    }
    return result;
  }
  return array;
};
