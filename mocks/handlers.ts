import * as servicesHandlers from "./services";

export const handlers = Object.values(servicesHandlers).flat();
