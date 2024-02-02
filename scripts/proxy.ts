///<reference types="../types/global" />

import { RsbuildConfig } from "@rsbuild/core";

type ProxyFn = (
  env: Record<string, string> | NodeJS.ProcessEnv,
) => RsbuildConfig["server"]["proxy"];

const proxy: ProxyFn = (envVars) => {
  const API_URL = new URL(
    envVars.REACT_APP_API_PATH,
    envVars.API_ORIGIN || "http://localhost",
  );

  return {
    [envVars.REACT_APP_API_PATH]: {
      target: API_URL,
      changeOrigin: true,
      secure: false,
    },
  };
};

export default proxy;
