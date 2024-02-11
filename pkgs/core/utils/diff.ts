import { applyPatch, calcPatch } from "fast-myers-diff";
import { Packr } from "msgpackr";
import { gunzip, gzip } from "zlib";

const MAX_HISTORY = 10;

const packr = new Packr({});

type PATCH_RESULT<T> =
  | {
      mode: "new";
      ts: string;
      data: number[];
    }
  | {
      mode: "patch";
      ts: string;
      diff: any;
    };

export class Diff<T> {
  ts = "";
  mode: "client" | "server" = "server";

  private _data: number[] = [];
  private _history = {} as Record<string, number[]>;

  constructor() {}

  get data() {
    const _data = new Uint8Array(this._data);
    return new Promise<T>((done) => {
      if (typeof window === "undefined") {
        gunzipAsync(_data).then((result) => {
          done(packr.unpack(result));
        });
      }
    });
  }

  async update(data: T) {
    if (this.mode === "server") {
      this._data = (await gzipAsync(packr.pack(data))).toJSON().data;
      this.ts =
        (Date.now() + "").substring(5) + Math.round(performance.now() * 10000);
      this._history[this.ts] = this._data;

      let i = 0;
      for (const k of Object.keys(this._history).sort(
        (a, b) => parseInt(b) - parseInt(a)
      )) {
        if (i > MAX_HISTORY) {
          delete this._history[k];
        }

        i++;
      }
    }
  }

  getPatch(ts: "new" | string): PATCH_RESULT<T> {
    if (ts !== "new") {
      const old_data = this._history[ts];

      if (old_data) {
        const result_diff = [...calcPatch(old_data, this._data)];
        return { diff: result_diff, mode: "patch", ts: this.ts };
      }
    }

    return { data: this._data, mode: "new", ts: this.ts };
  }

  async applyPatch(patch: PATCH_RESULT<T>) {
    if (patch.mode === "new") {
      this.ts = patch.ts;
      if (patch.data) this._data = patch.data;
    } else {
      this.ts = patch.ts;
      const num_array = [];
      for (const num of applyPatch(this._data, patch.diff)) {
        if (Array.isArray(num)) {
          for (const n of num) {
            num_array.push(n);
          }
        } else {
          num_array.push(num);
        }
      }
      this._data = num_array;
    }
  }

  static async server<T>(str: T) {
    const diff = new Diff<T>();
    await diff.update(str);
    return diff;
  }

  static async client<T>(patch: PATCH_RESULT<T>) {
    const diff = new Diff<T>();
    diff.mode = "client";

    if (patch.mode === "new") {
      diff.ts = patch.ts;
      if (patch.data) diff._data = patch.data;
    }
    return diff;
  }
}

export const gzipAsync = (bin: Uint8Array | string) => {
  return new Promise<Buffer>((resolve, reject) => {
    gzip(bin, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export const gunzipAsync = (bin: Uint8Array) => {
  return new Promise<Buffer>((resolve, reject) => {
    gunzip(bin, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
