import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import ESLintWebpackPlugin from "eslint-rspack-plugin";
import proxy from "./scripts/proxy";

const { parsed } = loadEnv({ prefixes: ["REACT_APP_"] });

const processEnv = Object.keys(parsed)
  .filter((env) => env.includes("REACT_APP_"))
  .reduce((acc, currentKey) => {
    acc[currentKey] = JSON.stringify(parsed[currentKey]);
    return acc;
  }, {});

const isProd = process.env.NODE_ENV !== "development";

export default defineConfig({
  html: {
    template: "./public/index.html",
  },
  output: {
    distPath: { root: parsed.BUILD_PATH || "./dist" },
  },
  source: {
    define: {
      "process.env": processEnv,
    },
    entry: {
      index: "./src/main.tsx",
    },
  },
  server: {
    port: Number(parsed.PORT),
    proxy: proxy(parsed),
  },
  tools: {
    rspack: {
      output: {
        publicPath: "auto",
      },
      plugins: [
        ...[
          isProd &&
            new RsdoctorRspackPlugin({
              // plugin options
            }),
        ],
      ],
    },
    bundlerChain(chain) {
      chain.plugin("eslint-rspack-plugin").use(ESLintWebpackPlugin, [
        {
          extensions: [".js", ".ts", ".jsx", "tsx", ".mjs", ".cjs"],
        },
      ]);
    },
  },
  plugins: [pluginReact(), pluginSvgr(), pluginTypeCheck()],
});
