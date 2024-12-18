import { createHashHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./createRouteTree";

export function createAppRouter() {
  const hashHistory = createHashHistory();
  return createRouter({ history: hashHistory, routeTree });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
