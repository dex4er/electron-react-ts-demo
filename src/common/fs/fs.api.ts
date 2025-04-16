import type fs from "node:fs";

export type FsApi = {
  readFileSync: typeof fs.readFileSync;
};
