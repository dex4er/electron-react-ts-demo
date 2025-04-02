import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main/index.ts'),
        formats: ['es']
      },
      rollupOptions: {
        output: {
          format: 'es'
        }
      },
      sourcemap: true,
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/preload/index.ts'),
        formats: ['es']
      },
      rollupOptions: {
        output: {
          format: 'es'
        }
      },
      sourcemap: true,
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
