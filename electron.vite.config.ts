import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import modify from "rollup-plugin-modify";

function importViaDefaultExportPlugin() {
  const modules = ["@ogre-tools/injectable"];
  const modulesPattern = modules.join("|").replaceAll("/", "\\/");
  console.log(modulesPattern);
  const findRegexp = new RegExp(`import (\{.*\}) from "(${modulesPattern})"`);

  return modify({
    find: findRegexp,
    replace: (_match, members, module) => {
      const sanitizedModuleName = module.replace(/\W/g, "__");
      const moduleSymbol = `__default_import_${sanitizedModuleName}`;
      return `import ${moduleSymbol} from "${module}"; const ${members} = ${moduleSymbol};`;
    },
  });
}

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
          interop: "auto",
          preserveModules: true,
          format: "es",
        },
      },
      sourcemap: true,
    },
    plugins: [externalizeDepsPlugin(), importViaDefaultExportPlugin()],
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
