import { ElectronAPI } from '@electron-toolkit/preload'

import fetch from 'node-fetch'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      fetch: typeof fetch
      fs: {
        readFileSync: typeof import('node:fs').readFileSync
      }
    }
  }
}
