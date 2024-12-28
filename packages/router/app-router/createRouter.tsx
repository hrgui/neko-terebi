import { createHashHistory, createRouter } from "@tanstack/react-router";
import { RouterContext, routeTree } from "./createRouteTree";

export function createAppRouter(context: RouterContext) {
  const hashHistory = createHashHistory();
  return createRouter({ history: hashHistory, routeTree, context });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
