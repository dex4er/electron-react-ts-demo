import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge } from "electron";

import fs from "node:fs";
import nodeFetch from "node-fetch";
import { temporaryFile } from "tempy";

// Simple wrapper for `node-fetch` to use in the renderer
async function fetch(url: string, options?: object): Promise<Response> {
  const response = await nodeFetch(url, options);
  return {
    text: () => response.text(),
  } as unknown as Response;
}

// Custom APIs for renderer
const api = {
  fetch,
  fs: {
    readFileSync: fs.readFileSync,
  },
  temporaryFile,
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
