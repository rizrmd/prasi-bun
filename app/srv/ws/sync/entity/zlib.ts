import { gzip, gunzip } from "zlib";

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
