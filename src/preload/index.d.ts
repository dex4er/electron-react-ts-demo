import type { ElectronAPI } from "@electron-toolkit/preload";

import type fs from "node:fs";
import type fetch from "node-fetch";
import type { temporaryFile } from "tempy";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      fetch: typeof fetch;
      fs: {
        readFileSync: typeof fs.readFileSync;
      };
      temporaryFile: typeof temporaryFile;
    };
  }
}
