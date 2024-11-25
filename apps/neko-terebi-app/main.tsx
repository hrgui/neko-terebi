// to get @tanstack/react-query to work
import "./polyfills/patchHeaders.ts";
import "abortcontroller-polyfill";
import ScrollPolyfill from "scroll-polyfill";

ScrollPolyfill({ force: true });

import { init as setupApiEdaClient } from "../../packages/client/ApiClient/index.ts";
import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";
import "./index.css";

import { init as setupSpatialNavigation } from "@hrgui/spatial-navigation-core";
import { createAppRouter } from "@hrgui/neko-terebi-app-router/createRouter";
import { RouterProvider } from "@tanstack/react-router";
import App from "./App.tsx";

export function bootstrap(el: Container) {
  setupApiEdaClient();
  setupSpatialNavigation({
    debug: import.meta.env.VITE_TEREBI_SPATIAL_NAV_DEBUG === "1",
    visualDebug: import.meta.env.VITE_TEREBI_SPATIAL_NAV_VISUAL_DEBUG === "1",
  });
  const router = createAppRouter();
  createRoot(el).render(
    <StrictMode>
      <App routerProvider={<RouterProvider router={router} />} />
    </StrictMode>
  );
}
