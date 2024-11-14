// to get @tanstack/react-query to work
import "./polyfills/patchHeaders.ts";
import "abortcontroller-polyfill";

import { init as setupApiEdaClient } from "../../packages/client/ApiClient/index.ts";
import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { init as setupSpatialNavigation } from "@hrgui/spatial-navigation-core";
import { createHashRouter } from "react-router-dom";
import { createRouterConfig } from "@hrgui/neko-terebi-app-router";

export function bootstrap(el: Container) {
  setupApiEdaClient();
  setupSpatialNavigation({
    debug: import.meta.env.VITE_NEKO_SPATIAL_NAV_DEBUG === "1",
    visualDebug: import.meta.env.VITE_NEKO_SPATIAL_NAV_DEBUG === "1",
  });
  const router = createHashRouter(createRouterConfig());
  createRoot(el).render(
    <StrictMode>
      <App router={router} />
    </StrictMode>
  );
}
