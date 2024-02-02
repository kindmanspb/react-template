import { ComponentType, lazy } from "react";

export const lazily = <T extends object, U extends keyof T>(
  loader: (x?: string) => Promise<T>,
) =>
  new Proxy({} as unknown as T, {
    get: (target, componentName: string | symbol) => {
      if (typeof componentName === "string") {
        return lazy(() =>
          loader(componentName).then((x) => ({
            default: x[componentName as U] as unknown as ComponentType<unknown>,
          })),
        );
      }
    },
  });
