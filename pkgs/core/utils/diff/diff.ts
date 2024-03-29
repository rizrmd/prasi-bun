import { Packr } from "msgpackr";
import { gunzip, gzip } from "zlib";
import { applyPatch, calcPatch } from "./lib/fast-myers-diff";

const MAX_HISTORY = 25; // max history item
const MAX_FMD_TIMEOUT = 100; // in ms

const packr = new Packr({});

type PATCH_RESULT =
  | {
      mode: "new";
      ts: string;
      data: number[];
    }  
  | {
      mode: "patch-fmd";
      ts: string;
      diff: any;
    }
  | {
      mode: "patch-fd";
      ts: string;
      diff: any;
    };

export class Diff<T> {
  ts = "";
  mode: "client" | "server" = "server";

  _data: number[] = [];
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

  getPatch(ts: "new" | string) {
    return new Promise<Uint8Array>((done) => {
      if (ts !== "new") {
        const old_data = this._history[ts];

        if (old_data) {
          const now = performance.now();
          const result_diff = [
            ...calcPatch(
              old_data,
              this._data,
              (key1, key2) => {
                return old_data[key1] === this._data[key2];
              },
              () => {
                return performance.now() - now > MAX_FMD_TIMEOUT;
              }
            ),
          ];

          if (performance.now() - now <= MAX_FMD_TIMEOUT) {
            console.log(Math.round(performance.now() - now) + "ms");
            done(
              new Uint8Array(
                packr.pack({ diff: result_diff, mode: "patch", ts: this.ts })
              )
            );
            return;
          }
        }
      }

      done(
        new Uint8Array(
          packr.pack({ data: this._data, mode: "new", ts: this.ts })
        )
      );
    });
  }

  async applyPatch(_patch: Uint8Array) {
    const patch = packr.unpack(_patch) as PATCH_RESULT;
    console.log(patch.mode, `size: ${hmn(_patch.length)}`);
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

  static async client<T>(patch: Uint8Array) {
    const diff = new Diff<T>();
    diff.mode = "client";
    diff.applyPatch(patch);
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

function hmn(bytes: number): string {
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = i === 0 ? bytes : (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
}
