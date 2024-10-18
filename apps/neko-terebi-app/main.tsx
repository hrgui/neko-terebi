// to get @tanstack/react-query to work
import "./polyfills/patchHeaders.ts";
import "abortcontroller-polyfill";

import { init } from "@hrgui/neko-terebi-api-eda-client";
import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createRouter } from "./router.tsx";

export function bootstrap(el: Container) {
  init();
  const router = createRouter();
  createRoot(el).render(
    <StrictMode>
      <App router={router} />
    </StrictMode>
  );
}
