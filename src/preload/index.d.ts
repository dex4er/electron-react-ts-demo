import type { ElectronAPI } from "@electron-toolkit/preload";

import type fetch from "node-fetch";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      fetch: typeof fetch;
      fs: {
        readFileSync: typeof import("node:fs").readFileSync;
      };
    };
  }
}
