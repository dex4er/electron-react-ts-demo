import type { ElectronAPI } from "@electron-toolkit/preload";

import type fs from "node:fs";
import type { DiContainer } from "@ogre-tools/injectable";
import type fetch from "node-fetch";
import type { FsApi } from "src/di/fs.token";
import type { temporaryFile } from "tempy";

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      fs: FsApi;
    };
  }
}
