import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve(__dirname, "src/main/index.ts"),
        formats: ["es"],
      },
      rollupOptions: {
        output: {
          format: "es",
        },
      },
      sourcemap: true,
    },
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    build: {
      lib: {
        entry: resolve(__dirname, "src/preload/index.ts"),
        formats: ["es"],
      },
      rollupOptions: {
        output: {
          format: "es",
        },
      },
      sourcemap: true,
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    plugins: [react()],
  },
});
