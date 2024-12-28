import eventBus from "@hrgui/neko-terebi-api-eda-client/eventEmitter";

// to get @tanstack/react-query to work
import "./polyfills/patchHeaders.ts";
import "abortcontroller-polyfill";
import ScrollPolyfill from "scroll-polyfill";

ScrollPolyfill({ force: true });

import { init as setupApiEdaClient } from "@hrgui/neko-terebi-mock-eda-client";
import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";
import "./index.css";

import { init as setupSpatialNavigation } from "@hrgui/spatial-navigation-core";
import { createAppRouter } from "../../packages/router/app-router/createRouter.tsx";
import { RouterProvider } from "@tanstack/react-router";
import App from "./App.tsx";

export function bootstrap(el: Container) {
  setupApiEdaClient(eventBus);
  setupSpatialNavigation({
    debug: import.meta.env.VITE_TEREBI_SPATIAL_NAV_DEBUG === "1",
    visualDebug: import.meta.env.VITE_TEREBI_SPATIAL_NAV_VISUAL_DEBUG === "1",
    useGetBoundingClientRect: true,
  });
  const router = createAppRouter();
  createRoot(el).render(
    <StrictMode>
      <App routerProvider={<RouterProvider router={router} />} />
    </StrictMode>
  );
}
